<template>
  <div class="" id="bg-image">
    <v-container class="text-center" fluid>
      <v-row no-gutters>
        <v-col cols="4" class="d-flex justify-start">
          <v-btn @click="goHome" color="warning"
            ><v-icon>mdi-home</v-icon> กลับสู่หน้าหลัก</v-btn
          >
        </v-col>
        <v-col cols="4"> <h1 class="mb-0 display">เข้าสู่ระบบ</h1></v-col>
        <v-col cols="4"></v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <v-form ref="form2">
            <v-card
              max-width="400"
              class="mx-auto mt-10"
              rounded="lg"
              elevation="10"
            >
              <v-card-title class="d-flex justify-center font-weight-black">
              </v-card-title>
              <v-card-text class="pb-0">
                <v-text-field
                  v-model="USERNAME"
                  outlined
                  label="ชื่อผู้ใช้"
                  prepend-icon="mdi-account-circle"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                ></v-text-field>

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
              </v-card-text>
              <v-card-actions>
                <v-btn @click="goToLogin" class="mx-auto mb-3" color="warning"
                  >เข้าสู่ระบบ</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      USERNAME: null,
      PASSWORD: null,
      userRole: null,
      showPassword: false,
    }
  },
  methods: {
    ...mapMutations({
      SET_USER: 'admin/SET_USER',
      LOADER: 'users/SET_LOADER',
    }),
    ...mapActions({
      login: 'users/login',
    }),
    goToLogin() {
      try {
        if (!this.$refs.form2.validate()) {
          this.$swal({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          })
        } else {
          this.LOADER(true)
          this.login({
            USERNAME: this.USERNAME,
            PASSWORD: this.PASSWORD,
          })
            .then((res) => {
              this.SET_USER(res)
              if (res.name === 'SUPERADMIN') {
                localStorage.setItem('token', res.token)
                this.$swal({
                  position: 'center',
                  icon: 'success',
                  title: 'เข้าสู่ระบบสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500,
                })
                this.$router.push({ path: '/admin/dashboardAdmin' })
                this.LOADER(false)
              } else if (res.name === 'ADMIN') {
                localStorage.setItem('token', res.token)
                this.$swal({
                  position: 'center',
                  icon: 'success',
                  title: 'เข้าสู่ระบบสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500,
                })
                this.$router.push({ path: '/admin/dashboardAdmin' })
                this.LOADER(false)
              } else if (res.name === 'USER') {
                localStorage.setItem('token', res.token)
                this.$swal({
                  position: 'center',
                  icon: 'success',
                  title: 'เข้าสู่ระบบสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500,
                })
                this.$router.push({ path: '/users/homeuser' })
                this.LOADER(false)
              } else {
                this.LOADER(false)
                this.$swal({
                  icon: 'warning',
                  title: 'ไม่พบข้อมูลผู้ใช้',
                  text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                })
                this.$refs.form2.reset()
                this.$router.push({ path: '/loginPage' })
              }
            })
            .catch(() => {
              this.LOADER(false)
              this.$swal({
                icon: 'warning',
                title: 'ไม่พบข้อมูลผู้ใช้',
                text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
              })
              this.$refs.form2.reset()
              this.$router.push({ path: '/loginPage' })
            })
        }
      } catch (error) {
        this.LOADER(false)
        this.$swal({
          icon: 'warning',
          title: 'ไม่พบข้อมูลผู้ใช้',
          text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        })
        this.$router.push({ path: '/login' })
      }
    },
    goHome() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style scoped>
.display {
  color: white !important;
  font-size: 30px !important;
}
#bg-image {
  /* background-size: cover !important; ปรับขนาดรูปให้เต็มพื้นที่ */
  /* background-position: center !important; จัดตำแหน่งภาพให้อยู่ตรงกลาง */
  height: 100%;
  background: linear-gradient(80deg, #333333, #dd1818, #f59f9f);
  background-size: 180% 180%;
}
</style>