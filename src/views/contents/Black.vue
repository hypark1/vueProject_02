<template>
  <v-container
    id="blackList"
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
              블랙 리스트
            </h1>
          </template>
          <v-card-text>
            <!--<v-row justify="space-between" align="center" class="ma-0">
              <v-row justify="start" class="ma-0">
                <v-col cols="3">
                  <v-select
                          :items="config.selectOptions"
                          v-model="vModel.select"
                          label="노출"
                          color="secondary"
                          @change="submitKeyword"/>
                </v-col>
                <v-col cols="4" style="margin-top: 13px;">
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

              <v-row justify="end" align="center">
                <v-col cols="3">
                  <v-menu
                          ref="menu1"
                          v-model="datePicker.start.menu"
                          :close-on-content-click="false"
                          :return-value.sync="datePicker.start.date"
                          transition="scale-transition"
                          min-width="290px"
                          offset-y >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                              v-model="datePicker.start.date"
                              color="secondary"
                              label="Start date"
                              prepend-icon="mdi-calendar-outline"
                              readonly
                              v-on="on" />
                    </template>

                    <v-date-picker
                            v-model="datePicker.start.date"
                            color="secondary"
                            landscape
                            scrollable >
                      <v-spacer />
                      <v-btn
                              color="secondary"
                              @click="datePicker.start.menu = false" >
                        Cancel
                      </v-btn>

                      <v-btn
                              color="secondary"
                              @click="$refs.menu1.save(datePicker.start.date)" >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <span>-</span>
                <v-col cols="3">
                  <v-menu
                          ref="menu2"
                          v-model="datePicker.end.menu"
                          :close-on-content-click="false"
                          :return-value.sync="datePicker.end.date"
                          transition="scale-transition"
                          min-width="290px"
                          offset-y >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                              v-model="datePicker.end.date"
                              color="secondary"
                              label="End date"
                              prepend-icon="mdi-calendar-outline"
                              readonly
                              v-on="on" />
                    </template>

                    <v-date-picker
                            v-model="datePicker.end.date"
                            color="secondary"
                            landscape
                            scrollable >
                      <v-spacer />
                      <v-btn
                              color="secondary"
                              @click="datePicker.end.menu = false" >
                        Cancel
                      </v-btn>

                      <v-btn
                              color="secondary"
                              @click="$refs.menu2.save(datePicker.end.date)" >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-btn
                        :disabled="!vModel.valid"
                        color="success"
                        default
                        @click="submitDate">
                  검색
                </v-btn>
              </v-row>
            </v-row>
              <v-divider class="mt-5 mb-5" />-->
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
            </v-row>
            <v-divider class="mt-3" />
            <template v-if="resultList">
            <v-data-table
                    v-model="contentSelectedData"
                    :headers="config.headers"
                    :items="resultList.accusations"
                    :items-per-page="Number(resultList.meta.perPage)"
                    item-key="key"
                    no-data-text="리스트가 없습니다."
                    @click:row="tableRowClick"
                    hide-default-footer
                    show-select>
              <template v-slot:item.message="{ item }">
                <span class="listNew v-btn warning" v-if="listNewBtn(item.date)">NEW</span>
                {{ item.message }}
              </template>
              <template v-slot:item.isOn="{ item }">
                <template v-if="item.isOn">ON</template>
                <template v-else>OFF</template>
              </template>
              <template v-slot:item.date="{ item }">
                {{ item.date.slice(0, 10) }}
              </template>
              <template v-slot:item.page="{ item }">
                <v-btn small>바로가기</v-btn>
              </template>
            </v-data-table>
            <v-pagination
                    v-model="vModel.page"
                    :length="resultList.meta.lastPage"
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
        list: null
      },
      keyword: null,
      contentSelectedData: [],
      datePicker: {
        start: {
          date: '',
          menu: false
        },
        end: {
          date: '',
          menu: false
        }
      },
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
        headers: [
          { text: '상태', value: 'isOn', align: 'center' },
          { text: '신고일', value: 'date', align: 'center' },
          { text: '신고 구분', value: 'type', align: 'center' },
          { text: '상세 내용', value: 'message', align: 'center' },
          // { text: '본문', value: 'page', align: 'center' }
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
      }
      if (this.$route.query.page) {
        send.page = this.$route.query.page
        this.vModel.page = Number(this.$route.query.page)
      }
      if (this.$route.query.per) {
        send.per = this.$route.query.per
        this.vModel.per = Number(this.$route.query.per)
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
        this.keyword = this.$route.query.keyword
      }
      this.$router.replace({ name: 'contentsBlackList', query: send })
      this.BlackList()
    },
    tableRowClick (v) {
      this.$router.push({ name: 'contentsBlackView', params: { partners_id: v.partner.key, contents_id: v.contents.key } })
    },
    paginationClick (page) {
      this.vModel.page = page
      let send = {
        page: page,
        per: this.vModel.per
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
      }
      this.$router.replace({ name: 'contentsBlackList', query: send })
      this.BlackList()
    },
    submitKeyword () {
      let send = {
        page: 1,
        per: this.vModel.per
      }
      if (this.keyword) {
        send.keyword = this.keyword
      }
      this.$router.push({ name: 'contentsBlackList', query: send })
      this.vModel.page = 1
      this.BlackList()
    },
    numReplace (val) {
      let num = val + ''
      const result = num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return result
    },
    submitDate () {
      //
    },
    listNewBtn (val) {
      let today = this.$moment(new Date()).format('YYYY-MM-DD')
      return today === val.slice(0, 10)
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
          return $value.contents.key
        })
        for (let idx in data) {
          this.exposure(data[idx], idx)
        }
      }
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
          this.response.list.accusations[num].isOn = this.response.exposure.contents.isOn
          if (this.contentSelectedData.length - 1 === num) {
            this.contentSelectedData = []
            this.response.list = null
            this.BlackList()
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
    BlackList () {
      let send = {
        per: this.$route.query.per,
        page: this.$route.query.page,
        orderby: this.vModel.orderby,
        direction: this.vModel.direction,
      }
      if (this.$route.query.keyword) {
        send.keyword = this.$route.query.keyword
        send.where = 'title'
      }
      this.xhttp({
        url: '/accusations',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.list = response.data.data
          for (let i = 0; i < this.response.list.accusations.length; i++) {
            this.response.list.accusations[i].num = i
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
    resultList () {
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
    },
    datePicker: {
      handler (val) {
        if (val.start.date && val.end.date) {
          this.vModel.valid = true
        }
      },
      deep: true
    }
  }
}
</script>

<style>
  #blackList table tr td:nth-child(5) { width: 500px;text-align: left !important; }
  #blackList table tr td:nth-child(5) p {
    width: 100%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    height: 1.4em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; }
  #blackList .listNew {
    font-size: 10px;
    padding: 0 5px;
    margin-right: 3px !important;
  }
</style>
