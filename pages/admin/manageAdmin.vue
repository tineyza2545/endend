<template>
  <div class="">
    <Navbar2 v-if="ROLE === 'SUPERADMIN'"></Navbar2>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="">
          <h2 class="">จัดการผู้ดูแลระบบ (Admin)</h2>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            label="ค้นหารายชื่อ Admin"
            dense
            outlined
            hide-details
            class=""
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-btn color="primary" @click="openDialog">เพิ่มรายการ</v-btn>
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
            <template #[`item.actions`]="{ item }">
              <div align="center">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
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

    <v-dialog justify="center" width="500px" v-model="dialog" persistent>
      <v-card width="500px">
        <v-card-title> เพิ่มผู้ดูแล </v-card-title>
        <v-card-text>
          <v-form ref="form2">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อผู้ดูแล"
                  v-model="ADMINNAME"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  v-model="PASSWORD"
                  outlined
                  label="รหัสผ่าน"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="[(v) => (v && v.length >= 6) || 'กรุณากรอกรหัสผ่าน']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-btn @click="cancel">ยกเลิก</v-btn>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn @click="saveUserAdmin" color="primary">บันทึก</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Navbar2 from '../../components/navbarSuper.vue'
export default {
  components: {
    Navbar2,
  },
  data() {
    return {
      ROLE: null,
      headers: [
        { text: 'ลำดับ', value: 'index', align: 'left', width: '100px' },
        {
          text: 'ชื่อผู้ใช้',
          value: 'USERNAME',
          align: 'left',
          width: '150px',
        },
        // {
        //   text: 'รหัสผ่าน',
        //   value: 'PASSWORD',
        //   align: 'left',
        //   width: '150px',
        // },
        // { text: 'ชื่อ', value: 'FIRSTNAME', align: 'left', width: '150px' },
        // { text: 'นามสกุล', value: 'LASTNAME', align: 'left', width: '150px' },
        // {
        //   text: 'อีเมล',
        //   value: 'EMAIL',
        //   align: 'left',
        //   width: '150px',
        // },
        // {
        //   text: 'เบอร์โทร',
        //   value: 'TEL',
        //   align: 'left',
        //   width: '150px',
        // },
        {
          text: 'ตำแหน่ง',
          value: 'ROLE',
          align: 'left',
          width: '150px',
        },

        { text: 'จัดการ', value: 'actions', align: 'center', width: '150px' },
      ],
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,
      allAdmin: [],
      search: null,
      dialog: false,
      ADMINNAME: null,
      showPassword: false,
      PASSWORD: null,
    }
  },
  created() {
    this.checkUser()
  },
  async mounted() {
    this.allAdmin = await this.listAdmin()
  },
  computed: {
    ...mapGetters({
      USER_ROLE: 'admin/GET_USER',
    }),
    itemsWithIndex() {
      return this.allAdmin.map((items, index) => ({
        ...items,
        index: index + 1,
      }))
    },
  },
  methods: {
    ...mapActions({
      listAdmin: 'users/listAdmin',
      addAdmin: 'admin/addAdmin',
      deleteAdmin: 'admin/deleteAdmin',
    }),
    ...mapMutations({
      LOADER: 'users/SET_LOADER',
    }),
    checkUser() {
      this.ROLE = this.USER_ROLE.name
    },
    openDialog() {
      this.dialog = true
    },
    async listAllAdmin() {
      this.allAdmin = await this.listAdmin()
    },
    saveUserAdmin() {
      if (!this.$refs.form2.validate()) {
        this.$swal({
          icon: 'warning',
          title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        })
      } else {
        this.LOADER(true)
        this.addAdmin({
          USERNAME: this.ADMINNAME,
          PASSWORD: this.PASSWORD,
        }).then(async () => {
          this.LOADER(false)
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          })
          this.listAllAdmin()
          this.dialog = false
          this.ADMINNAME = null,
          this.PASSWORD = null
        })
      }
    },
    cancel() {
      this.dialog = false
    },

    deleteData(item) {
      // console.log(item)
      this.$swal({
        title: 'ต้องการลบ Admin คนนี้หรือไม่?',
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
          await this.deleteAdmin({
            ID: item.ID,
          })
            .then(() => {
              this.listAllAdmin()
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
  },
}
</script>

<style>
</style>