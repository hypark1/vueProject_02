<template>
  <v-app>
    <dashboard-core-app-bar
      v-if="!(['UserLogin'].includes($route.name))"
      v-model="expandOnHover" />

    <dashboard-core-drawer
      v-if="!(['UserLogin'].includes($route.name))"
      :expand-on-hover.sync="expandOnHover" />

    <dashboard-core-view />

    <!--<dashboard-core-settings
      v-if="!(['UserLogin'].includes($route.name))"
      v-model="expandOnHover" />-->
  </v-app>
</template>

<script>
export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar: () => import('./components/core/AppBar'),
    DashboardCoreDrawer: () => import('./components/core/Drawer'),
    /* DashboardCoreSettings: () => import('./components/core/Settings'), */
    DashboardCoreView: () => import('./components/core/View'),
  },

  data: () => ({
    expandOnHover: false,
  }),
}
</script>
