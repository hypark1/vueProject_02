<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <span class="logo-mini"></span>
          <span class="logo-normal ml-4"> AIINFEED </span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in items">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapState,
} from 'vuex'

export default {
  name: 'DashboardCoreDrawer',

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  created () {
    this.roleChk()
  },

  data: () => ({
    title: '',
    items: null,
    media: [
      {
        icon: 'mdi-home',
        title: '대시보드',
        to: '/dashboard',
      },
      {
        group: '/report',
        icon: 'mdi-chart-bar',
        title: '보고서',
        children: [
          {
            title: '정산 보고서',
            to: 'ads'
          },
        ]
      },
    ],
    partner: [
      {
        icon: 'mdi-home',
        title: '대시보드',
        to: '/dashboard',
      },
      {
        group: '/contents',
        icon: 'mdi-cube-outline',
        title: '컨텐츠',
        children: [
          {
            title: '컨텐츠 관리',
            to: 'list',
          },
          {
            title: '컨텐츠 등록',
            to: 'register',
          },
        ]
      },
      {
        group: '/report',
        icon: 'mdi-chart-bar',
        title: '보고서',
        children: [
          {
            title: '정산 보고서',
            to: 'ads'
          },
        ]
      },
    ],
    admin: [
      {
        icon: 'mdi-home',
        title: '대시보드',
        to: '/dashboard',
      },
      {
        group: '/report',
        icon: 'mdi-chart-bar',
        title: '보고서',
        children: [
          {
            title: '정산 보고서',
            to: 'ads'
          },
          {
            title: '서비스 보고서',
            to: 'contents'
          },
        ]
      },
      {
        icon: 'mdi-atom',
        title: '광고 관리',
        to: '/ads',
      },
      {
        group: '/contents',
        icon: 'mdi-cube-outline',
        title: '컨텐츠',
        children: [
          {
            title: '컨텐츠 관리',
            to: 'list',
          },
          {
            title: '컨텐츠 등록',
            to: 'register',
          },
          {
            title: '블랙리스트',
            to: 'black',
          }
        ]
      },
      {
        group: '/media',
        icon: 'mdi-spa',
        title: '매체',
        children: [
          {
            title: '매체 관리',
            to: 'list',
          },
          {
            title: '매체 등록',
            to: 'register',
          }
        ]
      },
      {
        group: '/partners',
        icon: 'mdi-hexagon-multiple',
        title: 'CP',
        children: [
          {
            title: 'CP 관리',
            to: 'list',
          },
          {
            title: 'CP 등록',
            to: 'register',
          }
        ]
      },
      /*
      {
        icon: 'mdi-view-dashboard',
        title: 'dashboard',
        to: '/Dashboards',
      },
      {
        group: '/pages',
        icon: 'mdi-image',
        title: 'pages',
        children: [
          {
            title: 'pricing',
            to: 'pricing',
          },
          {
            title: 'rtl',
            to: 'rtl',
          },
          {
            title: 'timeline',
            to: 'timeline',
          },
          {
            title: 'login',
            to: 'login',
          },
          {
            title: 'register',
            to: 'pricing',
          },
          {
            title: 'lock',
            to: 'lock',
          },
          {
            title: 'user',
            to: 'user',
          },
          {
            title: 'error',
            to: '404',
          },
        ],
      },
      {
        group: '/components',
        icon: 'mdi-view-comfy',
        title: 'components',
        children: [
          {
            title: 'multi',
            group: '',
            children: [
              {
                title: 'example',
                href: '#',
              },
            ],
          },
          {
            title: 'buttons',
            to: 'buttons',
          },
          {
            title: 'grid',
            to: 'grid-system',
          },
          {
            title: 'tabs',
            to: 'tabs',
          },
          {
            title: 'notifications',
            to: 'notifications',
          },
          {
            title: 'icons',
            to: 'icons',
          },
          {
            title: 'typography',
            to: 'typography',
          },
        ],
      },
      {
        group: '/forms',
        icon: 'mdi-clipboard-outline',
        title: 'forms',
        children: [
          {
            title: 'rforms',
            to: 'regular',
          },
          {
            title: 'eforms',
            to: 'extended',
          },
          {
            title: 'vforms',
            to: 'validation',
          },
          {
            title: 'wizard',
            to: 'wizard',
          },
        ],
      },
      {
        group: '/tables',
        icon: 'mdi-grid',
        title: 'tables',
        children: [
          {
            title: 'rtables',
            to: 'regular-tables',
          },
          {
            title: 'etables',
            to: 'extended-tables',
          },
          {
            title: 'dtables',
            to: 'data-tables',
          },
        ],
      },
      {
        group: '/maps',
        icon: 'mdi-map-marker',
        title: 'maps',
        children: [
          {
            title: 'google',
            to: 'google-maps',
          },
          {
            title: 'fullscreen',
            to: 'full-screen-map',
          },
        ],
      },
      {
        icon: 'mdi-widgets',
        title: 'widgets',
        to: '/widgets',
      },
      {
        icon: 'mdi-chart-timeline-variant',
        title: 'charts',
        to: '/charts',
      },
      {
        icon: 'mdi-calendar-range',
        title: 'calendar',
        to: '/calendar',
      }, */
    ],
  }),

  computed: {
    ...mapState(['barColor', 'barImage']),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
    resultItems () {
      if (this.items) {
        return this.items.map(this.mapItem)
      } else {
        return false
      }
    },
    profile () {
      return {
        avatar: true,
        group: '',
        title: this.$t('avatar'),
        children: [
          {
            href: '',
            title: this.$t('my-profile'),
          },
          {
            to: '',
            title: this.$t('edit-profile'),
          },
          {
            to: '',
            title: this.$t('settings'),
          },
        ],
      }
    },
  },

  watch: {
    '$vuetify.breakpoint.smAndDown' (val) {
      this.$emit('update:expandOnHover', !val)
    },
  },

  methods: {
    mapItem (item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      }
    },
    roleChk () {
      let role = JSON.parse(localStorage.getItem('cdpUser')).role
      if ([role].includes('admin')) {
        this.items = this.admin
        this.title = 'ADMIN'
      } else if ([role].includes('partner')) {
        this.items = this.partner
        this.title = 'CP'
      } else if ([role].includes('media')) {
        this.items = this.media
        this.title = 'Media'
      }
    }
  },
}
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
