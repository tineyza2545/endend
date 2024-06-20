<template>
  <div class="">
    <Navbar2 v-if="ROLE === 'SUPERADMIN'"></Navbar2>
    <Navbar v-else-if="ROLE === 'ADMIN'"></Navbar>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="display-1 font-weight-bold">
          รายการสินค้าที่ขายทั้งหมด
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="itemsWithIndex"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            mobile-breakpoint="0"
            @page-count="pageCount = $event"
          >
            <template #[`item.create_date`]="{ item }">
              เวลา {{ item.create_date | capitalize }}
            </template></v-data-table
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Navbar from '../../components/navbarAdmin.vue'
import Navbar2 from '../../components/navbarSuper.vue'
import moment from 'moment'

export default {
  components: {
    Navbar,
    Navbar2,
  },
  data() {
    return {
      ROLE: [],
      headers: [
        { text: 'ลำดับ', value: 'index', align: 'left', width: '100px' },
        {
          text: 'รหัสบิล',
          value: 'BILL_ID',
          align: 'left',
          width: '150px',
        },

        {
          text: 'ชื่อลูกค้า',
          value: 'CUSTOMER',
          align: 'left',
          width: '150px',
        },
        {
          text: 'เบอร์โทรศัพท์',
          value: 'TEL',
          align: 'left',
          width: '150px',
        },
        {
          text: 'รายการที่ซื้อ',
          value: 'NameWithTotal',
          align: 'left',
          width: '200px',
        },
        {
          text: 'ราคาทั้งหมด',
          value: 'TotalPrice',
          align: 'center ',
          width: '200px',
        },
        {
          text: 'วันที่ทำรายการ',
          value: 'create_date',
          align: 'left',
          width: '200px',
        },

        // { text: 'จัดการ', value: 'actions', align: 'center', width: '150px' },
      ],
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,
      allData: [],
      search: null,
      date: null,
    }
  },
  created() {
    this.checkUser()
  },
  computed: {
    ...mapGetters({
      USER_ROLE: 'admin/GET_USER',
    }),
    itemsWithIndex() {
      return this.allData.map((items, index) => ({
        ...items,
        index: index + 1,
      }))
    },
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
  methods: {
    ...mapActions({
      selectBillConfirm: 'admin/selectBillConfirm',
    }),
    ...mapMutations({
      LOADER: 'users/SET_LOADER',
    }),
    checkUser() {
      this.ROLE = this.USER_ROLE.name
    },
  },
  async mounted() {
    this.allData = await this.selectBillConfirm()
    // console.log(this.allData)
  },
}
</script>

<style>
</style>