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
import admin from './adminIndex.vue'
import partner from './partnerIndex.vue'
import media from './mediaIndex.vue'

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
