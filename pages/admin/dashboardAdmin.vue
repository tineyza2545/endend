<template>
  <div class="">
    <Navbar2 v-if="ROLE === 'SUPERADMIN'"></Navbar2>
    <Navbar v-else-if="ROLE === 'ADMIN'"></Navbar>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="display-1 font-weight-bold"> Dashboard </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-card>
            <v-card-title>ยอดขายวันนี้</v-card-title>
            <v-card-text class="title">{{ amount }} บาท</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-card>
            <v-card-title>ต้นทุนทั้งหมด</v-card-title>
            <v-card-text class="title">{{ priceB }} บาท</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12" lg="12">
          <v-card>
            <v-card-title>รายการที่ขายดี</v-card-title>
            <v-card-text> <ChartBar /> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Navbar from '../../components/navbarAdmin.vue'
import Navbar2 from '../../components/navbarSuper.vue'
import ChartBar from '../../components/chartBar.vue'
export default {
  components: {
    Navbar,
    Navbar2,
    ChartBar,
  },
  data() {
    return {
      ROLE: [],
      allAmount: null,
      amount: null,
      allPiceB: null,
      priceB: null,
    }
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
      allAmountSell: 'users/allAmountSell',
      sumpriceb: 'admin/sumpriceb',
    }),
    ...mapMutations({
      LOADER: 'users/SET_LOADER',
    }),
    checkUser() {
      this.ROLE = this.USER_ROLE.name
    },
    async amountallsell() {
      this.LOADER(true)
      this.allAmount = await this.allAmountSell()
      this.allPiceB = await this.sumpriceb()
      this.amount = this.allAmount[0].summary
      this.priceB = this.allPiceB[0].PB
      this.LOADER(false)
    },
  },
  mounted() {
    this.amountallsell()
  },
}
</script>

<style>
</style>