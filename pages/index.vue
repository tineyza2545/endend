<template>
  <div class="overflow-hidden">
    <v-app-bar
      class=""
      color="#EF3B36"
      absolute
      dark
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

        <v-col
          cols="6"
          md="8"
          lg="8"
          class="d-none d-md-flex d-lg-flex pr-0 justify-end align-center"
        >
          <v-row class="justify-end">
            <v-col cols="2" class="text-center bg-hover">
              <a class="text-color">หน้าหลัก</a></v-col
            >

            <v-col cols="2" class="text-center bg-hover">
              <a class="text-color" @click="goShopPage">สั่งซื้อ</a></v-col
            >
          </v-row>
        </v-col>
        <v-col
          cols="2"
          class="d-none d-md-flex d-lg-flex pr-0 justify-center align-center"
        >
          <v-btn @click="goLogin">เข้าสู่ระบบ</v-btn></v-col
        >
        <v-col
          cols="6"
          lg="2"
          class="d-flex d-md-none d-lg-none justify-end align-center"
        >
          <v-app-bar-nav-icon
            dark
            v-if="smallScreen"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      height="100dvh"
    >
      <div style="height: auto">
        <v-row>
          <v-col cols="12" class="mt-15 pb-0">
            <v-carousel
              cycle
              height="500"
              hide-delimiter-background
              hide-delimiters
              show-arrows-on-hover
              class="text-dd"
            >
              <v-carousel-item
                v-for="(item, i) in slides"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
                <div
                  class="carousel-text mt-15 pt-15"
                  :style="{ fontSize: textSize }"
                >
                  <!-- You can customize this text as per your requirement -->
                  <div>{{ item.title }}</div>
                  <p>{{ item.description }}</p>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="12" class="text-center">
            <h2>ราคาหมูวันนี้</h2>
          </v-col>
          <v-col cols="12">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  lg="3"
                  v-for="(item, index) in productData"
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
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" class="display-1 text-center"
            >สินค้าที่ขายดี 3 อันดับ</v-col
          >
          <v-col
            cols="4"
            v-for="(item, index) in sumP"
            :key="index"
            class="mx-auto"
          >
            <v-container>
              <v-card width="300px" rounded="xl">
                <v-card-title>รายการ {{ item.NAME }} </v-card-title>
                <v-card-text>จำนวน {{ item.ALLTOTALPRODUCT }} แพค</v-card-text>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: 'หน้าหลัก', icon: 'mdi-home' },
        { title: 'ราคาหมูวันนี้', icon: 'mdi-shopping' },
        { title: 'สั่งซื้อ', icon: 'mdi-cart', link: '/shopPage' },
      ],
      slides: [
        {
          src: require('~/assets/wooden-board.jpg'),
          title: 'เนื้อหมูสดใหม่รับประกันคุณภาพ',
          description: 'สั่งซื้อสินค้าพร้อมส่งทุกวัน',
        },
        {
          src: require('~/assets/porkC1.jpg'),
          title: 'เนื้อหมูสดใหม่รับประกันคุณภาพ',
          description: 'สั่งซื้อสินค้าพร้อมส่งทุกวัน',
        },
      ],
      productData: [],
      pigData: null,
      sumP: [],
    }
  },
  mounted() {
    this.apiPig()
    this.apiSumP()
  },
  methods: {
    ...mapActions({
      listpig: 'users/listProducts',
      sumLimit: 'users/sumLimit',
    }),
    goShopPage() {
      this.$router.push({ path: '/shopPage' })
    },
    goLogin() {
      this.$router.push({ path: '/loginPage' })
    },
    async apiPig() {
      this.productData = await this.listpig()
      // console.log(this.productData)
    },
    async apiSumP() {
      this.sumP = await this.sumLimit()
      console.log(this.sumP)
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
  },
}
</script>

<style scoped>
.text-color {
  text-align: center;
  color: white !important;
  font-weight: 700 !important;
}
.bg-hover:hover {
  height: 55px !important;
  /* width: 150px !important; */
  background-color: rgb(83, 83, 83, 0.7);
  transition-duration: 1s !important;
  border-radius: 20px !important;
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
ใ .text-line {
  text-decoration: line-through !important;
}
</style>