<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down"
      v-text="title"
    />

    <v-spacer />
    <v-icon>mdi-account</v-icon>
    <span style="color:#444;" class="ml-1">{{session.name}}</span>
      <v-btn
          class="ml-4"
          small
          color="secondary"
          @click="submitLogOut">
          logout
      </v-btn>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DashboardCoreAppBar',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    notifications: [
      'Mike John Responded to your email',
      'You have 5 new tasks',
      `You're now friends with Andrew`,
      'Another Notification',
      'Another one',
    ],
    session: JSON.parse(localStorage.getItem('cdpUser')),
    routeTitle: {
      'Dashboard': '대시보드',
      'adsList': '광고 관리',
      'reportAds': '정산 보고서',
      'reportAdsHourly': '정산 보고서',
      'reportContents': '서비스 보고서',
      'contentsList': '컨텐츠 관리',
      'contentsView': '컨텐츠 관리',
      'contentsReport': '컨텐츠 리포트',
      'contentsReportHourly': '일별 컨텐츠 리포트',
      'contentsRegister': '컨텐츠 등록',
      'contentsEdit': '컨텐츠 수정',
      'contentsBlackList': '블랙리스트',
      'contentsBlackView': '블랙리스트',
      'mediaList': '매체 관리',
      'mediaView': '매체 관리',
      'mediaRegister': '매체 등록',
      'partnersList': 'CP 관리',
      'partnersView': 'CP 관리',
      'partnersRegister': 'CP 등록'
    }
  }),

  computed: {
    ...mapState(['drawer']),
    title () {
      return this.routeTitle[this.$route.name]
    }
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
    ...mapActions(['login', 'logout']),
    submitLogOut () {
      if (confirm('로그아웃 하시겠습니까?')) {
        this.logout()
        this.$router.push({ 'name': 'UserLogin' })
      }
    }
  }
}
</script>
