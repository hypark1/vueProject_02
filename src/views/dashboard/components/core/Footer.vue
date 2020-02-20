<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
          md="auto"
        >
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            <span class="mr-5 ml-3">AIINFEED</span>
            <span class="ml-5">Copyright &copy; {{ date }}. All rights reserved.</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'DashboardCoreFooter',
  data () {
    return {
      date: this.$moment(new Date()).format('YYYY')
    }
  }
}
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      color: #3c4858
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
