<template>
  <div>
    <template v-if="[this.role].includes('partner')">
      <partner></partner>
    </template>
  </div>
</template>

<script>
import partner from './partnerOverview.vue'

export default {
  components: {
    partner
  },
  data () {
    return {
      role: JSON.parse(localStorage.getItem('cdpUser')).role
    }
  }
}
</script>
