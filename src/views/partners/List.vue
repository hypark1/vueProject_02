<template>
  <v-container
    id="partnersList"
    fluid
    tag="section">
    <v-row
            align="center"
            justify="center">
      <v-col cols="12">
        <base-material-card
                color="green">
          <template v-slot:heading>
            <h1 class="display-2 font-weight-regular">
              CP 리스트
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center">
              <v-col cols="2">
                <!--<v-select
                        :items="config.orderbyOptions"
                        v-model="vModel.orderby"
                        label="정렬"
                        color="secondary"
                        @change="submitKeyword"/>-->
              </v-col>
              <v-col cols="2">
                <form @submit.prevent="submitKeyword">
                  <v-text-field
                        v-model="keyword"
                        append-icon="mdi-magnify"
                        class="ml-auto pt-0"
                        label="Search"
                        color="secondary"
                        hide-details
                        single-line />
                </form>
              </v-col>
            </v-row>

            <v-divider class="mt-3" />
            <template v-if="resultPartners">
              <v-data-table
                      :headers="config.headers"
                      :items="resultPartners.partners"
                      :items-per-page="Number(resultPartners.meta.perPage)"
                      item-key="key"
                      no-data-text="CP가 없습니다."
                      @click:row="tableRowClick"
                      hide-default-footer>
                <template v-slot:item="{ item, index }">
                  <tr @click="tableRowClick(item)">
                    <td class="text-center" style="width:200px;">{{index +1}}</td>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center" style="width:500px;">
                      <template v-if="item.user">
                        {{item.user.name}}
                      </template>
                      <template v-else>-</template>
                    </td>
                    <td class="text-center" style="width:500px;">
                      <template v-if="item.user">
                        {{item.user.email}}
                      </template>
                      <template v-else>-</template>
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <v-pagination
                      v-model="vModel.page"
                      :length="resultPartners.meta.lastPage"
                      @input="paginationClick"
                      :total-visible="10"
                      circle
                      class="justify-center mt-5"
                      next-icon="mdi-menu-right"
                      prev-icon="mdi-menu-left"/>
            </template>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.reFresh()
  },
  data () {
    return {
      response: {
        list: null
      },
      keyword: null,
      vModel: {
        per: 20,
        page: 1,
        orderby: 'created',
        direction: 'desc',
        where: 'name'
      },
      config: {
        orderbyOptions: [
          { value: 'created', text: '누적 매출' },
          { value: 'name', text: '월평균 매출' },
          { value: 'commission', text: '평균 이익율' },
          { value: 'name1', text: '월평균 페이지 뷰' },
          { value: 'commission1', text: 'CTR' },
          { value: 'created1', text: 'RPM' }
        ],
        headers: [
          { text: 'No', value: 'no', align: 'center' },
          { text: 'CP명', value: 'name', align: 'center' },
          { text: '이름', value: 'user.name', align: 'center' },
          { text: '계정', value: 'user.email', align: 'center' },
        ]
      }
    }
  },
  methods: {
    ...mapActions(['xhttp']),
    snack (type, val) {
      this.vModel.errorMessage = val
      this.vModel.snackbarType = type
      this.vModel.snackbar = true
    },
    numReplace (val) {
      let num = val + ''
      num = num.split('.')
      let result = num[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      if (num[1]) {
        result += '.' + num[1]
      }
      return result
    },
    reFresh () {
      let send = {
        page: 1,
        orderby: 'created'
      }
      if (this.$route.query.page) {
        send.page = this.$route.query.page
        this.vModel.page = Number(this.$route.query.page)
      }
      if (this.$route.query.orderby) {
        send.orderby = this.$route.query.orderby
        this.vModel.orderby = this.$route.query.orderby
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
        this.keyword = this.$route.query.keyword
      }
      this.$router.replace({ name: 'partnersList', query: send })
      this.partnersList()
    },
    tableRowClick (v) {
      this.$router.push({ name: 'partnersView', params: { partners_id: v.key } })
    },
    paginationClick (page) {
      this.vModel.page = page
      let send = {
        page: page,
        orderby: this.$route.query.orderby
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
      }
      this.$router.replace({ name: 'partnersList', query: send })
      this.partnersList()
    },
    submitKeyword () {
      let send = {
        page: 1,
        orderby: this.vModel.orderby
      }
      if (this.keyword) {
        send.keyword = this.keyword
      }
      this.$router.push({ name: 'partnersList', query: send })
      this.vModel.page = 1
      this.partnersList()
    },
    partnersList () {
      let send = {
        per: this.vModel.per,
        page: this.$route.query.page,
        orderby: this.$route.query.orderby,
        direction: this.vModel.direction
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
        send.where = this.vModel.where
      }
      this.xhttp({
        url: '/partners',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.list = response.data.data
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    }
  },
  computed: {
    resultPartners () {
      if (this.response.list) {
        return this.response.list
      } else {
        return false
      }
    }
  },
  watch: {
    keyword: function (val) {
      if (val === '') {
        this.submitKeyword()
      }
    }
  }
}
</script>
