<template>
  <div class="mt-8">
    <v-navigation-drawer permanent expand app class="gradient-background">
      <v-divider></v-divider>
      <v-list nav v-for="(item, i) in items" :key="i">
        <v-list-item
          :key="item.title"
          class="list-item-shadow"
          link
          :to="item.to"
          v-if="!item.nested"
          @click="checkMenu(item)"
        >
          <v-list-item-icon class="mr-3">
            <v-icon class="colorW">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="colorW">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-group v-else no-action :prepend-icon="item.icon">
          <template #activator>
            <v-list-item-title class="colorW">{{
              item.title
            }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item2, index) in item.subitems"
            :key="index"
            link
            :to="item2.to"
          >
            <v-list-item-icon>
              <v-icon class="ml-n10 colorW">{{ item2.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-n10">{{
              item2.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      selectedItem: '',
      items: [
        {
          title: 'รายงานภาพรวม',
          icon: 'mdi-view-dashboard',
          to: 'dashboardAdmin',
          nested: false,
        },
        {
          title: 'รายการที่สั่งซื้อ',
          icon: 'mdi-cart',
          to: 'orderCustomer',
          nested: false,
        },
        {
          title: 'จัดการสินค้า',
          icon: 'mdi-cart',
          to: 'manageProduct',
          nested: false,
        },
        {
          title: 'รายการสินค้าที่ขาย',
          icon: 'mdi-cart',
          to: 'listOrder',
          nested: false,
        },

        { title: 'ออกจากระบบ', icon: 'mdi-logout' },
      ],

      version: '',
    }
  },
  created() {
    this.version = this.$version
  },
  methods: {
    // ...mapMutations({
    //   SET_USER: 'Drawer/SET_USER_DEAIL',
    // }),
    checkMenu(item) {
      if (item.title == 'ออกจากระบบ') {
        this.$swal({
          title: 'ออกจากระบบ',
          text: `กรุณากดปุ่ม "ยีนยัน" เพื่อออกจากระบบ`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.value) {
            localStorage.clear()
            this.$router.push({ path: '/' })
          }
        })
      }
    },
  },
}
</script>
<style scoped>
.gradient-background {
  background: linear-gradient(74deg, #333333, #dd1818, #f59f9f);
  background-size: 180% 180%;
}

.colorW {
  color: white !important;
}
</style>