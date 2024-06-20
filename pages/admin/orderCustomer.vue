<template>
  <div class="">
    <Navbar2 v-if="ROLE === 'SUPERADMIN'"></Navbar2>
    <Navbar v-else-if="ROLE === 'ADMIN'"></Navbar>
    <v-container fluid>
      <v-row>
        <v-col cols="12">รายการบิลที่ลูกค้าสั่ง</v-col>
        <v-col cols="12">
          <v-card
            v-for="(item, index) in billData"
            :key="index"
            class="my-3"
            :id="'card-' + index"
          >
            <v-card-title> บิลของคุณ {{ item.CUSTOMER }} </v-card-title>
            <v-card-subtitle>
              เวลา {{ item.create_date | capitalize }}</v-card-subtitle
            >
            <v-card-text>
              <v-row>
                <v-col cols="6" class="title pb-0"> <b>รายการ</b> </v-col>
                <v-col cols="12">
                  <span
                    v-html="item.NameWithTotal.split(',').join('<br>')"
                  ></span>
                </v-col>
                <v-col cols="6">
                  <b>ยอดรวม</b>
                </v-col>
                <v-col cols="6" class="text-right">
                  <b>{{ item.TotalPrice }} บาท</b>
                </v-col>
                <v-col cols="6" class="text-right"> </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn @click="confirmOrder(item)" color="success">
                    ยืนยันรายการ
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Navbar from '../../components/navbarAdmin.vue'
import Navbar2 from '../../components/navbarSuper.vue'
export default {
  components: {
    Navbar,
    Navbar2,
  },
  data() {
    return {
      ROLE: [],
      billData: [],
      date: null,
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      var newdate = moment(value).format('DD/MM/')
      var newyear = moment(value).format('YYYY')
      var n_newyear = parseInt(newyear) + 543
      var time = moment(value).format('HH:mm:ss')
      return `${time} ${newdate}${n_newyear}`
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  created() {
    this.checkUser()
  },
  computed: {
    ...mapGetters({
      USER_ROLE: 'admin/GET_USER',
    }),
  },
  methods: {
    ...mapActions({
      allBill: 'users/allBill',
      udBill: 'admin/udBill',
      printPdf: 'admin/getDataPrint',
    }),
    ...mapMutations({
      LOADER: 'users/SET_LOADER',
    }),
    formatDate(val) {
      let d = ''
      if (val === '' || val === null) {
        d = null
      } else {
        const [year, month, day] = val.split('-')
        d = `${day}/${month}/${parseInt(year) + 543}`
      }
      return d
    },
    checkUser() {
      this.ROLE = this.USER_ROLE.name
    },
    confirmOrder(item) {
      const billID = item.BILL_ID
      this.$swal({
        title: 'ยืนยันคำสั่งซื้อนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.LOADER(true)
          await this.printPdf({ data: item }).then(async (res) => {
            const { file } = res

            if ((res.statusCode = 'ok')) {
              const binaryString = window.atob(file)
              const bytes = new Uint8Array(binaryString.length)
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
              }

              const pdfBlob = new Blob([bytes], { type: 'application/pdf' })
              const pdfUrl = window.URL.createObjectURL(pdfBlob)

              const downloadLink = document.createElement('a')
              downloadLink.href = pdfUrl
              downloadLink.download = 'billing-report.pdf'
              document.body.appendChild(downloadLink)
              downloadLink.click()

              setTimeout(() => {
                window.URL.revokeObjectURL(pdfUrl)
                document.body.removeChild(downloadLink)
              }, 100)
        
              // const blob = new Blob([bytes], { type: 'application/pdf' })
              // const url = window.URL.createObjectURL(blob)
              // const link = document.createElement('a')
              // link.href = url
              // link.download = 'billing-report.pdf'
              // link.click()
              // window.URL.revokeObjectURL(url)
            } else {
              console.error('error')
            }
          })
          await this.udBill({
            BILL_ID: billID,
          })

          this.$swal({
            title: 'รายการสำเร็จ',
            icon: 'success',
            showCancelButton: false,
            timer: 2000,
          })
          this.billData = await this.allBill()

          this.LOADER(false)
        } else {
          console.log('error')
        }
      })
    },
  },
  async mounted() {
    this.billData = await this.allBill()
    // console.log(this.billData)
  },
}
</script>

<style>
</style>