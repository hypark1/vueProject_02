<template>
  <div>
    <template v-if="[this.role].includes('admin')">
      <admin></admin>
    </template>
    <template v-else-if="[this.role].includes('partner')">
      <partner></partner>
    </template>
    <template v-else-if="[this.role].includes('media')">
      <media></media>
    </template>
  </div>
</template>

<script>
import admin from './AdsAdmin.vue'
import partner from './AdsPartner.vue'
import media from './AdsMedia.vue'

export default {
  components: {
    admin,
    partner,
    media
  },
  data () {
    return {
      role: JSON.parse(localStorage.getItem('cdpUser')).role
    }
  }
}
</script>
