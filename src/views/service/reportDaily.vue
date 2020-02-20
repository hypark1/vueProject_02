<template>
  <div>
    <template v-if="[this.role].includes('partner')">
      <partner></partner>
    </template>
    <template v-else-if="[this.role].includes('media')">
      <media></media>
    </template>
  </div>
</template>

<script>
import partner from './partnerDaily.vue'
import media from './mediaDaily.vue'

export default {
  components: {
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
