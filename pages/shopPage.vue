<template>
  <div class="overflow-hidden">
    <v-app-bar
      class=""
      color="#EF3B36"
      absolute
      shrink-on-scroll
      :min-height="82"
      :src="require('~/assets/storepork.jpg')"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          :min-height="82"
          v-bind="props"
          gradient="to top right, rgba(239, 59, 54,.5), rgba(250,250,250,.8)"
        ></v-img>
      </template>

      <v-row no-gutter>
        <v-col cols="6" md="2" lg="2" class="pl-0">
          <v-toolbar-title class="pa-0">
            <v-img
              class="mt-1"
              :src="require('~/assets/logo.png')"
              height="70px"
              width="150px"
            /> </v-toolbar-title
        ></v-col>

        <v-spacer></v-spacer>

        <v-col cols="3" class="d-flex justify-end align-center pst mr-5">
          <v-btn @click.stop="dialogBill = !dialogBill" color="red">
            <v-badge
              :content="cartData.length"
              :value="cartData.length"
              color="red"
              overlap
              class=""
            >
              <v-icon large> mdi-cart-outline </v-icon>
            </v-badge></v-btn
          >
        </v-col>
        <v-card
          width="370px"
          class="zindex"
          v-if="dialogBill ? true : false"
          rounded="xl"
          elevation="15"
        >
          <v-card-title>
            <v-row>
              <v-col cols="3" class="body-2">รายการ</v-col>
              <v-col cols="3" class="body-2">จำนวน</v-col>
              <v-col cols="2" class="body-2">ราคา</v-col>
              <v-col cols="2" class="body-2">รวม</v-col>
              <v-col cols="2" class="body-2">ลบ</v-col>
            </v-row>
          </v-card-title>
          <v-card-text v-for="(item, index) in cartData" :key="index">
            <v-row>
              <v-col cols="3"> {{ item.NAME }} </v-col>
              <v-col cols="3"> {{ item.TOTAL }} </v-col>
              <v-col cols="2"> {{ item.PRICE }} </v-col>
              <v-col cols="2"> {{ item.SUMMARY }} </v-col>
              <v-col cols="2" class="d-flex justify-center pt-1">
                <v-btn @click="deleteItem(item, index)" class="pa-0 mr-3"
                  >ลบ</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="3">ยอดรวม</v-col>
              <v-col cols="3"></v-col>
              <v-col cols="2"></v-col>
              <v-col cols="2">{{ totalSummary }}</v-col>
              <v-col cols="2"> </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-btn @click="checkSlip" v-if="totalSummary > 0"
                  >ชำระเงิน</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-col
          cols="1"
          lg="2"
          class="d-flex d-md-none d-lg-none justify-end align-center"
        >
          <v-app-bar-nav-icon
            dark
            v-if="smallScreen && cartData.length === 0"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto bg"
      height="100dvh"
    >
      <div style="height: auto">
        <v-container fluid class="mt-15">
          <v-row class="">
            <v-col cols="4" class="mt-15 pb-0">
              <v-btn @click="gotoHome">กลับสู่หน้าหลัก </v-btn>
            </v-col>
            <v-col cols="4" class="mt-15 pb-0 text-center">
              <h1 class="text-color">รายการสินค้า</h1>
            </v-col>
            <v-col cols="4" class="mt-15 pb-0"> </v-col>

            <v-col cols="12">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  lg="3"
                  v-for="(item, index) in allProduct"
                  :key="index"
                >
                  <v-card rounded="xl" elevation="10" class="px-5">
                    <v-card-title class="justify-center">
                      {{ item.NAME }}
                    </v-card-title>
                    <v-card-text class="pa-2">
                      <v-row>
                        <v-col cols="12" class="">
                          <v-img
                            :src="item.FILELINK"
                            width="200px"
                            height="100px"
                            class="mx-auto rounded-xl"
                          />
                        </v-col>
                        <v-col cols="5" class="" v-if="item.PROMOTION === 0">
                          <h4>ราคา {{ item.PRICE }} บาท</h4>
                        </v-col>
                        <v-col cols="5" class="" v-else>
                          <h4 class="text-line">ราคา {{ item.PRICE }} บาท</h4>
                        </v-col>
                        <v-col
                          cols="7"
                          class="text-right"
                          v-if="item.PROMOTION === 1"
                        >
                          <h4>Promotion {{ item.PROMOTION_PRICE }} บาท</h4>
                        </v-col>
                        <v-col cols="7" class="" v-else> </v-col>
                        <v-col cols="6"><h4>จำนวน</h4></v-col>
                        <v-col cols="6" class="text-end"
                          ><h4 class="pr-3">{{ item.TOTAL }} แพค</h4></v-col
                        >

                        <v-col cols="12" class="pt-1">
                          <v-text-field
                            v-model="total[index]"
                            rounded
                            dense
                            type="number"
                            outlined
                            :min="0"
                            :rules="[
                              (v) =>
                                v <= item.TOTAL ||
                                'ใส่จำนวนสินค้าไม่เกินที่มีอยู่',
                            ]"
                            :step="1"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" class="text-center">
                          <v-btn rounded @click="addCart(item, index)" block>
                            <v-icon></v-icon>
                            เพิ่มลงตะกร้า
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-sheet>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="require('~/assets/logo.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Tiney Pork Shop</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialogPayment" width="400px" justify="center">
      <v-card width="400px">
        <v-card-title class="justify-center">
          ข้อมูลผู้สั่งสินค้า
        </v-card-title>
        <v-card-text>
          <v-form ref="formpayment">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  dense
                  label="ชื่อผู้สั่งสินค้า"
                  v-model="CUSTOMERNAME"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อ']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  dense
                  label="เบอร์โทรศัพท์ที่ติดต่อได้"
                  v-model="tel"
                  :rules="[
                    (v) =>
                      (v && v.length === 10 && /^[0-9]{10}$/.test(v)) ||
                      'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" class="">
                จำนวนเงินที่ต้องจ่าย <br />
                {{ totalSummary }}
              </v-col>
              <v-col cols="12" md="12">
                <v-file-input
                  outlined
                  dense
                  label="แนบสลิป"
                  @change="checkTrans"
                ></v-file-input>
                <p>{{ remainingTime }}</p>
              </v-col>
              <v-col cols="6">
                <v-btn @click="paymentClose">ยกเลิกการจ่ายเงิน</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn @click="payment" :disabled="!buttonConfirm"
                  >ยืนยันการจ่ายเงิน</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dialogBill: false,
      dialogPayment: false,
      drawer: null,
      items: [
        { title: 'หน้าหลัก', icon: 'mdi-home', link: '/' },
        // { title: 'โปรโมชั่น', icon: 'mdi-sale' },
        // { title: 'ราคาหมูวันนี้', icon: 'mdi-shopping' },
        { title: 'สั่งซื้อ', icon: 'mdi-cart', link: '/shopPage' },
      ],
      headers: [
        {
          text: 'รายการ',
          value: 'NAME',
          align: 'left',
        },
        {
          text: 'จำนวน',
          value: 'TOTAL',
          align: 'left',
        },
        {
          text: 'ราคา',
          value: 'TOTAL',
          align: 'left',
        },
        {
          text: 'จำนวน x ราคา',
          value: 'SUMMARY',
          align: 'left',
        },
      ],
      messages: null,
      cartData: [],
      allProduct: [],
      total: [],
      CUSTOMERNAME: null,
      tel: null,
      file: null,
      statusSlip: false,
      buttonConfirm: false,
      amoutCart: null,
      slipData: null,
      time: null,
      remainingTime: null,
    }
  },

  created() {},
  mounted() {
    this.callAllProduct()
  },
  methods: {
    ...mapActions({
      listProduct: 'users/listProducts',
      minusProduct: 'users/minusProduct',
      plusProduct: 'users/plusProduct',
      slipCheck: 'users/slipCheck',
      confirmPayment: 'users/confirmPayment',
    }),
    goShopPage() {
      if (this.cartData.length > 0) {
        this.$swal({
          icon: 'warning',
          title: 'กรุณาชำระสินค้าในตะกร้า',
        })
      } else {
        this.$router.push({ path: '/shopPage' })
      }
    },
    goLogin() {
      this.$router.push({ path: '/loginPage' })
    },
    gotoHome() {
      if (this.cartData.length > 0) {
        this.$swal({
          icon: 'warning',
          title: 'กรุณาชำระสินค้าในตะกร้า',
        })
      } else {
        this.$router.push({ path: '/' })
      }
    },
    async callAllProduct() {
      this.allProduct = await this.listProduct()
    },
    async deleteItem(item, index) {
      // console.log(item, index)
      this.cartData.splice(index, 1)
      await this.plusProduct({
        TOTAL: parseInt(item.TOTAL),
        ID: item.ID,
      }).then(() => {
        this.callAllProduct()
      })
    },

    async addCart(item, index) {
      // console.log(item)
      if (
        this.total[index] === null ||
        this.total[index] === undefined ||
        this.total[index] === ''
      ) {
        this.$swal({
          icon: 'warning',
          title: 'ใส่จำนวนสินค้า',
        })
      } else if (this.total[index] % 1 !== 0) {
        this.$swal({
          icon: 'warning',
          title: 'ใส่จำนวนเต็มเท่านั้น',
        })
      } else if (this.total[index] > item.TOTAL) {
        this.$swal({
          icon: 'warning',
          title: 'ใส่จำนวนสินค้าใหม่',
          text: 'จำนวนที่เลือกมากกว่าสินค้าที่มี',
        })
      } else if (item.PROMOTION === 1) {
        await this.minusProduct({
          TOTAL: parseInt(this.total[index]),
          ID: item.ID,
        })
        this.cartData.push({
          INDEX: index,
          NAME: item.NAME,
          ID: item.ID,
          DETAIL: item.DETAIL,
          PRICE: item.PROMOTION_PRICE,
          TOTAL: this.total[index],
          SUMMARY: item.PROMOTION_PRICE * this.total[index],
        })
        this.callAllProduct()
      } else {
        await this.minusProduct({
          TOTAL: parseInt(this.total[index]),
          ID: item.ID,
        })
        this.cartData.push({
          INDEX: index,
          NAME: item.NAME,
          ID: item.ID,
          DETAIL: item.DETAIL,
          PRICE: parseInt(item.PRICE),
          TOTAL: parseInt(this.total[index]),
          SUMMARY: item.PRICE * this.total[index],
        })
        this.callAllProduct()
      }

      // console.log(this.cartData)
      this.total[index] = null
    },
    openBill() {
      // console.log(this.dialogBill)
    },
    async onFileChange(event) {
      this.file = event
    },
    async checkSlip() {
      this.dialogPayment = true
      this.time = Date.now() + 45000 // 10 วินาที (10 * 1000 มิลลิวินาที)
      setInterval(() => {
        this.updateTime()
      }, 1000)
    },
    async checkTrans(event) {
      this.file = event
      // console.log(this.file)
      // console.log(this.amoutCart, 'dd')
      const data = new FormData()
      data.append('files', this.file)

      await this.slipCheck(data).then((res) => {
        // console.log(res)
        this.slipData = res
        this.statusSlip = res.success
        if (
          this.statusSlip === true &&
          this.slipData.data.amount === this.amoutCart
        ) {
          this.buttonConfirm = true
        } else if (this.slipData.code === 1011) {
          this.$swal({
            icon: 'warning',
            text: 'QR Code หมดอายุ หรือ ไม่มีรายการอยู่จริง',
          })
        } else if (this.slipData.code === 1005) {
          this.$swal({
            icon: 'warning',
            text: 'ไฟล์ไม่ใช่ไฟล์ภาพ กรุณาอัพโหลดไฟล์เฉพาะนามสกุล .jpg .jpeg หรือ .png',
          })
        } else if (this.slipData.code === 1006) {
          this.$swal({
            icon: 'warning',
            text: 'รูปภาพไม่ถูกต้อง',
          })
        } else if (this.slipData.code === 1007) {
          this.$swal({
            icon: 'warning',
            text: 'รูปภาพไม่มี QR Code',
          })
        } else if (this.slipData.code === 1008) {
          this.$swal({
            icon: 'warning',
            text: 'QR ดังกล่าวไม่ใช่ QR สำหรับการตรวจสอบการชำระเงิน',
          })
        } else if (this.slipData.code === 1009) {
          this.$swal({
            icon: 'warning',
            text: 'ขออภัยในความไม่สะดวก ขณะนี้ข้อมูลธนาคารเกิดขัดข้องชั่วคราว โปรดตรวจใหม่อีกครั้งใน 15 นาทีถัดไป',
          })
        } else if (this.slipData.code === 1012) {
          this.$swal({
            icon: 'warning',
            text: `สลิปซ้ำ สลิปนี้เคยส่งเข้ามาในระบบเมื่อ ${this.slipData.timestamp}`,
          })
        } else if (this.slipData.code === 1013) {
          this.$swal({
            icon: 'warning',
            text: `ยอดที่ส่งมาไม่ตรงกับยอดสลิป`,
          })
        } else if (this.slipData.code === 1014) {
          this.$swal({
            icon: 'warning',
            text: `บัญชีผู้รับไม่ตรงกับบัญชีหลักของร้าน`,
          })
        } else if (
          this.statusSlip === true &&
          this.slipData.data.amount !== this.amoutCart
        ) {
          this.$swal({
            icon: 'warning',
            text: `ยอดเงินที่โอนไม่ตรงกับยอดสินค้าในระบบ`,
          })
        } else {
          this.$swal({
            icon: 'warning',
            text: 'QR Code หมดอายุ หรือ ไม่มีรายการอยู่จริง',
          })
        }
      })
    },
    async updateTime() {
      const now = Date.now()
      const remainingTime = this.time - now

      if (remainingTime <= 0) {
        // หมดเวลา
        for (let i = 0; i < this.cartData.length; i++) {
          const element = this.cartData[i]
          this.cartData.splice(element.index, 1)
          await this.plusProduct({
            TOTAL: parseInt(element.TOTAL),
            ID: element.ID,
          }).then(() => {
            if (this.cartData.length == 0) {
              this.$swal({
                position: 'center',
                icon: 'warning',
                title: 'ไม่ได้ทำรายการตามเวลาที่กำหนด',
                showConfirmButton: false,
                timer: 5000,
              })
              this.$router.replace({ path: '/' })
            } 
          })
        }
      } else {
        // แสดงเวลาที่เหลือบนหน้าจอ
        const minutes = Math.floor(remainingTime / 60000)
        const seconds = Math.floor((remainingTime % 60000) / 1000)
        this.remainingTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
      }
    },

    paymentClose() {  
      try {
        this.dialogPayment = false
      } catch (error) {
        this.$router.push({ path: '/shopPage' })
      }
    },
    payment() {
      if (!this.$refs.formpayment.validate()) {
        this.$swal({
          icon: 'warning',
          title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        })
      } else {
        this.confirmPayment({
          cartData: this.cartData,
          CUSTOMER: this.CUSTOMERNAME,
          TEL: this.tel,
          BILL_ID: this.slipData.data.transRef,
          ALLCOST: this.amoutCart,
        }).then((res) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            title:
              'ยืนยันการสั่งซื้อสำเร็จ กรุณารอพนักงานโทรกลับเมื่อเตรียมของเสร็จ',
          })
          this.dialogPayment = false
          this.tel = null
          this.CUSTOMERNAME = null
          this.$router.push({ path: '/' })
        })
      }
    },
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    textSize() {
      let fonSize = 0
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          fonSize = 20
          break
        case 'sm':
          fonSize = 30
          break
        case 'md':
          fonSize = 40
          break
        case 'lg':
          fonSize = 60
          break
        case 'xl':
          padding = 60
          break
      }
      return `${fonSize}px`
    },
    totalSummary() {
      // Loop through cartData and sum up item.SUMMARY values
      return (this.amoutCart = this.cartData.reduce(
        (total, item) => total + item.SUMMARY,
        0
      ))
    },
  },
}
</script>

<style scoped>
.text-color {
  text-align: center;
  color: white !important;
  font-weight: 700 !important;
}
.carousel-text {
  position: absolute;
  top: 60%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: white; /* Adjust text color as needed */
  z-index: 100; /* Ensure text appears above the image */
  font-size: 30px;
}
.text-line {
  text-decoration: line-through;
}
.bg {
  background: linear-gradient(111deg, #200122, #6f0000);
  background-size: 120% 120%;
}

.pst {
  z-index: 10000 !important;
  position: relative !important;
}
.zindex {
  margin-right: 17px !important;
  top: 48% !important;
  right: 0 !important;
  position: absolute !important;
  z-index: 99999 !important;
}
</style>