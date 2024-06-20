<template>
  <v-overlay
    style="z-index:99999"
    :value="GET_LOADER"
  >
    <v-progress-circular
      indeterminate
      size="35"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loader',
  computed: {
    ...mapGetters({
      GET_LOADER: 'users/GET_LOADER'
    })
  }
}
</script>
