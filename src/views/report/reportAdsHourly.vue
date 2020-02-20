<template>
  <div>
    <template v-if="[this.role].includes('admin')">
      <admin></admin>
    </template>
    <template v-else-if="[this.role].includes('partner')">
      <partner></partner>
    </template>
  </div>
</template>

<script>
import admin from './AdsAdminHourly.vue'
import partner from './AdsPartnerHourly.vue'

export default {
  components: {
    admin,
    partner
  },
  data () {
    return {
      role: JSON.parse(localStorage.getItem('cdpUser')).role
    }
  }
}
</script>
