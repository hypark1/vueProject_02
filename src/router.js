import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'UserLogin',
          path: '/',
          component: () => import('@/views/user/Login'),
        },
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboards'),
        },
        {
          name: 'collections',
          path: '/collections',
          component: () => import('@/views/feed/Collections'),
        },
        {
          path: 'ads',
          component: () => import('@/views/ads'),
          redirect: '/ads/list',
          children: [
            { name: 'adsList', path: 'list', component: () => import('@/views/ads/list') },
            { name: 'adsRegister', path: 'register', component: () => import('@/views/ads/list') },
          ]
        },
        {
          path: 'feed',
          component: () => import('@/views/feed'),
          redirect: '/feed/collections',
          children: [
            { name: 'feedCollections', path: 'collections', component: () => import('@/views/feed/Collections') },
            { name: 'feedOutAds', path: 'adso', component: () => import('@/views/feed/OutAds') },
            { name: 'feedOutAdsRegister', path: 'adso/:media_id', component: () => import('@/views/feed/OutAdsRegister') },
            { name: 'feedInAds', path: 'adsi', component: () => import('@/views/feed/InAds') },
            { name: 'feedInAdsView', path: 'adsi/:media_id/:article_id', component: () => import('@/views/feed/InAdsRegister') },
            { name: 'feedInAdsRegister', path: 'adsi/:media_id', component: () => import('@/views/feed/InAdsRegister') },
            { name: 'feedAdin', path: 'adin', component: () => import('@/views/feed/Adin') },
            { name: 'feedAdinRegister', path: 'adin/:media_id', component: () => import('@/views/feed/AdinRegister') },
            { name: 'feedVideo', path: 'video', component: () => import('@/views/feed/Video') },
          ]
        },
        {
          path: 'report',
          component: () => import('@/views/service'),
          redirect: '/report/ads',
          children: [
            { name: 'reportAds', path: 'ads', component: () => import('@/views/report/reportAds') },
            { name: 'reportAdsHourly', path: 'ads/:date', component: () => import('@/views/report/reportAdsHourly') },
            { name: 'reportContents', path: 'contents', component: () => import('@/views/report/reportContents') },
          ]
        },
        /* {
          path: 'report',
          component: () => import('@/views/service'),
          redirect: '/report/overview',
          children: [
            { name: 'reportOverview', path: 'overview', component: () => import('@/views/service/reportOverview') },
            { name: 'reportDaily', path: 'daily', component: () => import('@/views/service/reportDaily') },
            { name: 'reportHourly', path: 'hourly', component: () => import('@/views/service/reportHourly') },
          ]
        }, */
        {
          path: 'revenue',
          component: () => import('@/views/revenue'),
          redirect: '/revenue/overview',
          children: [
            { name: 'revenueOverview', path: 'overview', component: () => import('@/views/revenue/Overview') },
            { name: 'revenueDaily', path: 'daily', component: () => import('@/views/revenue/Daily') },
            { name: 'revenueHourly', path: 'hourly', component: () => import('@/views/revenue/Hourly') },
          ]
        },
        {
          path: 'service',
          component: () => import('@/views/service'),
          redirect: '/service/overview',
          children: [
            { name: 'serviceOverview', path: 'overview', component: () => import('@/views/service/Overview') },
            { name: 'serviceMedia', path: 'media', component: () => import('@/views/service/Media') },
            { name: 'serviceMediaHourly', path: 'media/:date', component: () => import('@/views/service/mediaReport') },
            { name: 'serviceAds', path: 'ads', component: () => import('@/views/service/Ads') },
            { name: 'serviceAdsHourly', path: 'ads/:date', component: () => import('@/views/service/AdsHourly') },
            { name: 'serviceCategory', path: 'category', component: () => import('@/views/service/Category') },
            { name: 'serviceCategoryHourly', path: 'category/:date', component: () => import('@/views/service/CategoryHourly') },
            { name: 'serviceContents', path: 'contents', component: () => import('@/views/service/Contents') },
          ]
        },
        {
          path: 'contents',
          component: () => import('@/views/contents'),
          redirect: '/contents/list',
          children: [
            { name: 'contentsOverview', path: 'overview', component: () => import('@/views/partners/View') },
            { name: 'contentsRegister', path: 'register', component: () => import('@/views/contents/Register') },
            { name: 'contentsList', path: 'list', component: () => import('@/views/contents/List') },
            { name: 'contentsView', path: 'list/:contents_id', component: () => import('@/views/contents/View') },
            { name: 'contentsEdit', path: 'list/:contents_id/edit', component: () => import('@/views/contents/Register') },
            { name: 'contentsReport', path: 'list/:contents_id/report', component: () => import('@/views/contents/Report') },
            { name: 'contentsReportHourly', path: 'list/:contents_id/report/:date', component: () => import('@/views/contents/ReportHourly') },
            { name: 'contentsBlackList', path: 'black', component: () => import('@/views/contents/Black') },
            { name: 'contentsBlackView', path: 'black/:partners_id/:contents_id', component: () => import('@/views/contents/BlackView') },
          ]
        },
        {
          path: 'media',
          component: () => import('@/views/media'),
          redirect: '/media/list',
          children: [
            { name: 'mediaList', path: 'list', component: () => import('@/views/media/List') },
            { name: 'mediaView', path: 'list/:media_id', component: () => import('@/views/media/View') },
            { name: 'mediaEdit', path: 'list/:media_id/edit', component: () => import('@/views/media/Register') },
            { name: 'mediaRegister', path: 'register', component: () => import('@/views/media/Register') },
          ]
        },
        {
          path: 'partners',
          component: () => import('@/views/partners'),
          redirect: '/partners/list',
          children: [
            { name: 'partnersList', path: 'list', component: () => import('@/views/partners/List') },
            { name: 'partnersView', path: 'list/:partners_id', component: () => import('@/views/partners/View') },
            { name: 'partnersEdit', path: 'list/:partners_id/edit', component: () => import('@/views/partners/Register') },
            { name: 'partnersContents', path: 'list/:partners_id/:contents_id', component: () => import('@/views/partners/Contents') },
            { name: 'partnersContentsHourly', path: 'list/:partners_id/:contents_id/:date', component: () => import('@/views/partners/ContentsHourly') },
            { name: 'partnersRegister', path: 'register', component: () => import('@/views/partners/Register') },
          ]
        },
        // Dashboard
        {
          name: 'Dashboards',
          path: 'Dashboards',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'RTL',
          path: 'pages/rtl',
          component: () => import('@/views/dashboard/pages/Rtl'),
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Timeline',
          path: 'pages/timeline',
          component: () => import('@/views/dashboard/pages/Timeline'),
        },
        // Components
        {
          name: 'Buttons',
          path: 'components/buttons',
          component: () => import('@/views/dashboard/component/Buttons'),
        },
        {
          name: 'Grid System',
          path: 'components/grid-system',
          component: () => import('@/views/dashboard/component/Grid'),
        },
        {
          name: 'Tabs',
          path: 'components/tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Forms
        {
          name: 'Regular Forms',
          path: 'forms/regular',
          component: () => import('@/views/dashboard/forms/RegularForms'),
        },
        {
          name: 'Extended Forms',
          path: 'forms/extended',
          component: () => import('@/views/dashboard/forms/ExtendedForms'),
        },
        {
          name: 'Validation Forms',
          path: 'forms/validation',
          component: () => import('@/views/dashboard/forms/ValidationForms'),
        },
        {
          name: 'Wizard',
          path: 'forms/wizard',
          component: () => import('@/views/dashboard/forms/Wizard'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Extended Tables',
          path: 'tables/extended-tables',
          component: () => import('@/views/dashboard/tables/ExtendedTables'),
        },
        {
          name: 'Data Tabels',
          path: 'tables/data-tables',
          component: () => import('@/views/dashboard/tables/DataTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        {
          name: 'Full Screen Map',
          path: 'maps/full-screen-map',
          component: () => import('@/views/dashboard/maps/FullScreenMap'),
        },
        // Root level
        {
          name: 'Widgets',
          path: 'widgets',
          component: () => import('@/views/dashboard/Widgets'),
        },
        {
          name: 'Charts',
          path: 'charts',
          component: () => import('@/views/dashboard/Charts'),
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('@/views/dashboard/Calendar'),
        },
      ],
    },
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Pricing',
          path: 'pricing',
          component: () => import('@/views/pages/Pricing'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
