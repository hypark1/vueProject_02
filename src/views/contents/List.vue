<template>
  <v-container
    id="contentsList"
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
              컨텐츠 리스트
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center" class="ma-0">
              <div>
                <v-btn
                        :disabled="vModel.contentSelectedBtn[0]"
                        class="ma-1"
                        color="warning"
                        @click="contentExposure(true)"
                        small>
                  ON
                </v-btn>
                <v-btn
                        :disabled="vModel.contentSelectedBtn[1]"
                        class="ma-1"
                        color="warning"
                        @click="contentExposure(false)"
                        small >
                  OFF
                </v-btn>
              </div>
              <v-col cols="4" class="pa-0">
                  <v-row>
                  <v-col cols="3">
                      <v-select
                              :items="config.selectOptions"
                              v-model="vModel.select"
                              label="노출"
                              color="secondary"
                              @change="submitKeyword"/>
                  </v-col>
                  <v-col cols="6" style="margin-top: 13px;">
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
                  <v-col cols="3">
                <v-select
                        :items="config.perOptions"
                        v-model="vModel.per"
                        color="secondary"
                        @change="submitKeyword"/>
                  </v-col>
                  </v-row>
              </v-col>
            </v-row>
            <v-divider class="mt-3" />
            <template v-if="resultContents">
            <v-data-table
                    v-model="contentSelectedData"
                    :headers="config.headers"
                    :items="resultContents.contents"
                    :items-per-page="Number(resultContents.meta.perPage)"
                    item-key="key"
                    no-data-text="컨텐츠가 없습니다."
                    hide-default-footer
                    show-select>
              <template v-slot:item.title="{ item }">
                <p class="text-left ma-0 listTitle"
                   @click="tableRowClick(item)">{{ ConvertHtml(item.title) }}</p>
              </template>
                <template v-slot:item.isOn="{ item }">
                    <template v-if="item.isOn">ON</template>
                    <template v-else>OFF</template>
                </template>
              <template v-slot:item.created="{ item }">
                {{ item.created.slice(0, 10) }}
              </template>
                <template v-slot:item.btn="{ item }">
                    <v-btn
                            v-if="!item.published_at"
                            small
                            color="warning"
                            @click="putPublish(item)">
                        송출하기
                    </v-btn>
                    <template v-else>
                        송출 완료
                    </template>
                </template>
            </v-data-table>
            <v-pagination
                    v-model="vModel.page"
                    :length="resultContents.meta.lastPage"
                    :total-visible="10"
                    @input="paginationClick"
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
        role: JSON.parse(localStorage.getItem('cdpUser')).role,
        exposure: null,
        publish: null,
        list: null,
      },
      keyword: null,
      contentSelectedData: [],
      vModel: {
        select: 'all',
        per: 20,
        page: 1,
        orderby: 'created',
        direction: 'desc',
        where: null,
        contentSelected: [],
        contentSelectedIsOn: false,
        contentSelectedBtn: [ true, true ]
      },
      config: {
        selectOptions: [
          { value: 'all', text: '전체' },
          { value: 'on', text: 'ON' },
          { value: 'off', text: 'OFF' }
        ],
        perOptions: [20, 50, 100, 200],
        headers: [
          { text: '상태', value: 'isOn', align: 'center' },
          { text: '종류', value: 'type', align: 'center' },
          { text: '카테고리', value: 'category', align: 'center' },
          { text: '제목', value: 'title', align: 'center' },
          { text: 'CP명', value: 'partner.name', align: 'center' },
          { text: '등록일', value: 'created', align: 'center' },
          { text: '신고건수', value: 'assucationCount', align: 'center' },
          { text: '송출', value: 'btn', align: 'center' },
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
    reFresh () {
      let send = {
        page: 1,
        per: 20,
        on: 'all'
      }
      if (this.$route.query.page) {
        send.page = this.$route.query.page
        this.vModel.page = Number(this.$route.query.page)
      }
      if (this.$route.query.per) {
        send.per = this.$route.query.per
        this.vModel.per = Number(this.$route.query.per)
      }
      if (this.$route.query.on) {
        send.on = this.$route.query.on
        this.vModel.select = this.$route.query.on
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
        this.keyword = this.$route.query.keyword
      }
      this.$router.replace({ name: 'contentsList', query: send })
      this.contentsList()
    },
    ConvertHtml (str) {
      str = str.replace(/&amp;/g, '&')
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      str = str.replace(/&quot;/g, '"')
      str = str.replace(/&#039;/g, "'")
      str = str.replace(/&#39;/g, "'")
      return str
    },
    tableRowClick (val) {
      this.$router.push({ name: 'contentsView', params: { contents_id: val.key } })
    },
    paginationClick (page) {
      this.contentSelectedData = []
      this.vModel.page = page
      let send = {
        page: page,
        per: this.vModel.per,
        on: this.vModel.select
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
      }
      this.$router.replace({ name: 'contentsList', query: send })
      this.contentsList()
    },
    submitKeyword () {
      let send = {
        page: 1,
        per: this.vModel.per,
        on: this.vModel.select
      }
      if (this.keyword) {
        send.keyword = this.keyword
      }
      this.$router.push({ name: 'contentsList', query: send })
      this.vModel.page = 1
      this.contentsList()
    },
    numReplace (val) {
      let num = val + ''
      const result = num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return result
    },
    contentExposure (val) {
      let text
      if (val) {
        // on
        text = '게재'
      } else {
        // off
        text = '차단'
      }
      if (confirm('컨텐츠를 ' + text + ' 하시겠습니까?')) {
        let data = this.contentSelectedData.map(function ($value) {
          return $value.key
        })
        for (let idx in data) {
          this.exposure(data[idx], idx)
        }
      }
    },
    putPublish (val) {
      this.xhttp({
        url: '/contents/' + val.key + '/publish',
        method: 'put',
        data: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.publish = response.data.data
          this.reFresh()
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    contentSelectedFn (val) {
      if (val.length === 1 && !this.vModel.contentSelectedIsOn) {
        // 하나만
        if (val[0].isOn) {
          // 첫번째 클릭한게 on
          this.vModel.contentSelectedBtn = [true, false]
        } else {
          // 첫번째 클릭한게 off
          this.vModel.contentSelectedBtn = [false, true]
        }
        this.vModel.contentSelectedIsOn = true
      } if (val.length === 0) {
        this.vModel.contentSelectedBtn = [true, true]
        this.vModel.contentSelectedIsOn = false
      } else if (val.length > 1) {
        // 첫번째 클릭한 값
        let bool = this.vModel.contentSelectedBtn[0]
        if (bool) {
          // 첫번째 클릭한 값 on
          let a = val[val.length - 1].isOn
          if (!a) {
            this.contentSelectedData = val.filter(function ($value) {
              return $value.isOn === true
            })
          }
        } else {
          // 첫번째 클릭한 값 off
          let a = val[val.length - 1].isOn
          if (a) {
            this.contentSelectedData = val.filter(function ($value) {
              return $value.isOn === false
            })
          }
        }
      }
    },
    exposure (id, idx) {
      this.xhttp({
        url: '/contents/' + id + '/exposure',
        method: 'put',
        data: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.exposure = response.data.data
          let num = this.contentSelectedData[idx].num
          this.response.list.contents[num].isOn = this.response.exposure.contents.isOn
          if (this.contentSelectedData.length - 1 === num) {
            this.contentSelectedData = []
            this.response.list = null
            this.contentsList()
          }
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    collectionsBtn () {
      this.$router.push({ name: 'feedCollections' })
    },
    contentsList () {
      this.response.list = null
      let send = {
        per: this.$route.query.per,
        page: this.$route.query.page,
        orderby: this.vModel.orderby,
        direction: this.vModel.direction,
        on: this.$route.query.on
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
        send.where = 'title'
      }
      this.xhttp({
        url: '/contents',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.list = response.data.data
          for (let i = 0; i < this.response.list.contents.length; i++) {
            this.response.list.contents[i].num = i
          }
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
    resultContents () {
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
    },
    contentSelectedData: function (val) {
      if (val) {
        this.contentSelectedFn(val)
      }
    }
  }
}
</script>

<style>
    #contentsList .listTitle:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
