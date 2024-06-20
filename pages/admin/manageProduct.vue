<template>
  <div class="">
    <Navbar2 v-if="ROLE === 'SUPERADMIN'"></Navbar2>
    <Navbar v-else-if="ROLE === 'ADMIN'"></Navbar>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="">
          <h2 class="">จัดการสินค้า</h2>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            label="ค้นหารายการสินค้า"
            dense
            outlined
            hide-details
            class=""
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-btn color="primary" @click="addProduct">เพิ่มรายการ</v-btn>
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
            <template #[`item.FILELINK`]="{ item }">
              <v-img width="150" height="100px" :src="item.FILELINK"> </v-img>
            </template>
            <template #[`item.PROMOTION`]="{ item }">
              {{ item.PROMOTION | ApproveStatus }}
            </template>
            <template #[`item.TOTAL`]="{ item }">
              <div :class="{ 'bg-red': item.TOTAL < 5 }">
                {{ item.TOTAL }}
              </div>
            </template>
            <template #[`item.actions`]="{ item }">
              <div align="center">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item @click="editData(item)">
                      <v-list-item-title>แก้ไขข้อมูล</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteData(item)">
                      <v-list-item-title>ลบข้อมูล</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </template></v-data-table
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8" md="4">
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="550px" persistent>
      <v-card class="">
        <v-card-title class="่d-flex justify-center"
          >เพิ่มรายการสินค้า</v-card-title
        >
        <v-form ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="รายการ"
                  v-model="productName"
                  outlined
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อสินค้า']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  label="ราคาต้นทุน"
                  v-model="priceB"
                  outlined
                  :rules="[(v) => !!v || 'กรุณากรอกราคาสินค้า']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  label="ราคาขาย"
                  v-model="price"
                  outlined
                  :rules="[(v) => !!v || 'กรุณากรอกราคาสินค้า']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  label="จำนวนแพ็ค"
                  v-model="total"
                  outlined
                  :rules="[(v) => !!v || 'กรุณาจำนวนแพ็คสินค้า']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="รายละเอียด"
                  v-model="detail"
                  outlined
                  :rules="[(v) => !!v || 'กรุณากรอกรายละเอียดสินค้า']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  label="สถานะโปรโมชั่น"
                  v-model="promoStatus"
                  :items="PROMOSELECT"
                  item-text="text"
                  item-value="value"
                  outlined
                  :rules="[
                    (v) =>
                      (v !== null && v !== undefined && v !== '') ||
                      'กรุณาเลือกสถานะโปรโมชั่น',
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  label="ราคาโปรโมชั่น"
                  v-model="promoPrice"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  outlined
                  label="รูปภาพ"
                  v-model="file"
                  @change="onFileChange"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="mx-2">
            <v-btn @click="cancel" color="grey" class="mb-3">ย้อนกลับ</v-btn>
            <v-spacer />
            <v-btn @click="saveProduct" color="primary" class="mb-3"
              >บันทึกข้อมูล</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="550px" persistent>
      <v-card>
        <v-card-title>แก้ไขรายการ</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="รายการ"
                v-model="productName"
                outlined
                :rules="[(v) => !!v || 'กรุณากรอกชื่อสินค้า']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                label="ราคา"
                v-model="price"
                outlined
                :rules="[(v) => !!v || 'กรุณากรอกราคาสินค้า']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                label="จำนวนแพ็ค"
                v-model="total"
                outlined
                :rules="[(v) => !!v || 'กรุณากรอกราคาสินค้า']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="รายละเอียด"
                v-model="detail"
                outlined
                :rules="[(v) => !!v || 'กรุณากรอกรายละเอียดสินค้า']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                label="สถานะโปรโมชั่น"
                v-model="promoStatus"
                :items="PROMOSELECT"
                item-text="text"
                item-value="value"
                outlined
                :rules="[
                  (v) =>
                    (v !== null && v !== undefined && v !== '') ||
                    'กรุณาเลือกสถานะโปรโมชั่น',
                ]"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                label="ราคาโปรโมชั่น"
                v-model="promoPrice"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="">
              <h4 class="mb-5">รููปภาพ</h4>
              <v-row class="border">
                <v-col cols="12" class="d-flex justify-center pa-0">
                  <v-img
                    :src="this.downloadURL"
                    max-width="200px"
                    height="100px"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="row" row>
                <v-radio label="ไม่แก้ไขรูปภาพ" value="1"></v-radio>
                <v-radio
                  label="แก้ไขรูปภาพ"
                  value="2"
                ></v-radio> </v-radio-group
            ></v-col>

            <v-col cols="12" class="mt-5" v-if="row === '2'">
              <v-file-input
                outlined
                label="รูปภาพ"
                v-model="file"
                @change="onFileChange"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn @click="cancel" color="grey" class="mb-3">ย้อนกลับ</v-btn>
          <v-spacer />
          <v-btn
            @click="saveEdit"
            color="primary"
            class="mb-3"
            :disabled="disblebutton"
            >บันทึกข้อมูล</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Navbar from '../../components/navbarAdmin.vue'
import Navbar2 from '../../components/navbarSuper.vue'
import { db } from '../../plugins/firebaseInit'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
export default {
  components: {
    Navbar,
    Navbar2,
  },
  data() {
    return {
      row: null,
      headers: [
        { text: 'ลำดับ', value: 'index', align: 'left', width: '100px' },
        { text: 'รายการ', value: 'NAME', align: 'left', width: '150px' },
        {
          text: 'รูปภาพ',
          value: 'FILELINK',
          align: 'center',
          width: '200px',
        },
        { text: 'รายละเอียด', value: 'DETAIL', align: 'left', width: '150px' },
        { text: 'ราคาต้นทุน', value: 'PRICEB', align: 'left', width: '150px' },
        { text: 'ราคาขาย', value: 'PRICE', align: 'left', width: '80px' },
        {
          text: 'จำนวนคงเหลือ',
          value: 'TOTAL',
          align: 'center',
          width: '150px',
        },
        {
          text: 'สถานะโปรโมชั่น',
          value: 'PROMOTION',
          align: 'left',
          width: '150px',
        },
        {
          text: 'ราคาโปรโมชั่น',
          value: 'PROMOTION_PRICE',
          align: 'left',
          width: '150px',
        },

        { text: 'จัดการ', value: 'actions', align: 'center', width: '150px' },
      ],
      PROMOSELECT: [
        {
          text: 'ปิด',
          value: 0,
        },
        {
          text: 'เปิด',
          value: 1,
        },
      ],

      ROLE: [],
      promoPrice: null,
      promoStatus: null,
      total: null,
      price: null,
      priceB: null,
      search: null,
      productData: [],
      promotion: '',
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,
      dialog: false,
      productName: null,
      detail: null,
      file: null,
      storageRefG: null,
      editDialog: false,
      refID: null,
      downloadURL: null,
      fileName: null,
      ID: null,
      disblebutton: false,
    }
  },
  filters: {
    ApproveStatus(value) {
      if (value === 0) {
        return 'ไม่มีโปรโมชั่น'
      } else {
        return 'โปรโมชั่น'
      }
    },
  },

  computed: {
    itemsWithIndex() {
      return this.productData.map((items, index) => ({
        ...items,
        index: index + 1,
      }))
    },
    ...mapGetters({
      USER_ROLE: 'admin/GET_USER',
    }),
  },

  created() {
    this.checkUser()
  },
  mounted() {
    this.LOADER(true)
    this.listProduct()
    this.$checkAuth()
    this.SET_LOGIN(true)
    this.LOADER(false)
  },
  methods: {
    ...mapMutations({
      SET_LOGIN: 'users/SET_LOGIN',
      LOADER: 'users/SET_LOADER',
    }),
    ...mapActions({
      insertProduct: 'admin/addProduct',
      allProduct: 'admin/listProducts',
      updateProduct: 'admin/updateProduct',
      deleteProduct: 'admin/deleteProduct',
    }),
    checkUser() {
      this.ROLE = this.USER_ROLE.name
    },
    addProduct() {
      this.dialog = true
    },
    editData(item) {
      // console.log(item)
      this.disblebutton = false
      this.editDialog = true
      this.ID = item.ID
      this.productName = item.NAME
      this.price = item.PRICE
      this.priceB = item.PRICEB
      this.total = item.TOTAL
      this.detail = item.DETAIL
      this.promoStatus = item.PROMOTION
      this.promoPrice = item.PROMOTION_PRICE
      this.downloadURL = item.FILELINK
      this.fileName = item.FILENAME
    },

    deleteData(item) {
      // console.log(item)
      this.$swal({
        title: 'ต้องการลบข้อมูลสินค้านี้หรือไม่?',
        text: 'เมื่อลบไปแล้วไม่สามารถเรียกข้อมูลเดิมได้อีก',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.LOADER(true)
          await this.deleteProduct({
            ID: item.ID,
          })
            .then(() => {
              this.listProduct()
              this.$swal({
                title: 'ลบข้อมูลสำเร็จ',
                icon: 'success',
                showCancelButton: false,
              })
              this.LOADER(false)
            })

            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
    cancel() {
      this.editDialog = false
      this.dialog = false
      this.productName = null
      this.price = 0
      this.priceB = 0
      this.total = 0
      this.detail = ''
      this.promoStatus = 0
      this.promoPrice = 0
      this.file = null
      this.fileName = null
    },
    async listProduct() {
      this.productData = await this.allProduct()
      const littleProducts = this.productData.filter((item) => item.TOTAL < 5) // กรองสินค้าที่เหลือน้อยกว่า 5 หน่วย
      if (littleProducts.length > 0) {
        // ตรวจสอบว่ามีสินค้าที่เหลือน้อยหรือไม่
        this.$swal({
          position: 'center',
          icon: 'warning',
          title: 'สินค้าเหลือน้อย',
          text: `มี ${littleProducts.length} รายการสินค้าที่เหลือน้อย`,
          showConfirmButton: false,
        })
      }
    },
    async saveProduct() {
      try {
        if (!this.$refs.form.validate()) {
          this.$swal({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          })
        } else {
          this.LOADER(true)
          this.insertProduct({
            NAME: this.productName,
            DETAIL: this.detail,
            PRICE: parseFloat(this.price),
            TOTAL: parseFloat(this.total),
            FILELINK: this.downloadURL,
            FILENAME: this.fileName,
            PROMOTION: this.promoStatus,
            PROMOTION_PRICE: parseFloat(this.promoPrice),
            PRICEB: parseFloat(this.priceB),
          }).then((res) => {
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'บันทึกสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            })
            this.LOADER(false)
            this.dialog = false
            this.productName = null
            this.price = 0
            this.priceB = 0
            this.total = 0
            this.detail = ''
            this.promoStatus = 0
            this.promoPrice = 0
            this.file = null
            this.fileName = null
            this.listProduct()
          })
        }
      } catch (error) {}
    },
    saveEdit() {
      this.$swal({
        title: 'ต้องการแก้ไขรายการนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.LOADER(true)
          await this.updateProduct({
            ID: this.ID,
            NAME: this.productName,
            DETAIL: this.detail,
            PRICE: parseFloat(this.price),
            TOTAL: parseFloat(this.total),
            FILENAME: this.fileName,
            FILELINK: this.downloadURL,
            PROMOTION: this.promoStatus,
            PROMOTION_PRICE: parseFloat(this.promoPrice),
            PRICEB: parseFloat(this.priceB),
          })
          await this.listProduct()

          this.$swal({
            title: 'แก้ไขรายการสำเร็จ',
            icon: 'success',
            showCancelButton: false,
          })
          this.editDialog = false
          this.row = null

          this.LOADER(false)
        } else {
          console.log('error')
        }
      })
    },
    async onFileChange(event) {
      this.file = event

      const storage = getStorage()
      const file = this.file // อ้างอิงไฟล์จาก input
      this.fileName = `${file.name}` // ตั้งชื่อไฟล์ใหม่

      const storageRef = ref(storage, `${this.fileName}`) // ระบุตำแหน่งเก็บใน Firebase Storage
      this.storageRefG = storageRef

      this.LOADER(true)
      this.disblebutton = true
      const upload = await uploadBytes(this.storageRefG, file).then(
        (snapshot) => {
          this.disblebutton = false
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'สามารถใช้รูปภาพนี้ได้',
            showConfirmButton: false,
            timer: 1500,
          })
          this.LOADER(false)
          this.listProduct()
        }
      )
      this.downloadURL = await getDownloadURL(this.storageRefG)
    },
  },
}
</script>

<style scoped>
.border {
  border: solid 0.5px #000000;
}
.bg-red {
  background-color: red !important;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
}
</style>