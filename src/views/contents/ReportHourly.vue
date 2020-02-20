<template>
  <v-container
    id="contentsReportHourly"
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
            {{contentsName}}
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <v-col cols="8" class="pt-0">
              <h2 style="padding: 20px 10px;">
                [ {{this.$route.params.date}} ] {{contentsName}} 성과 분석
              </h2>
            </v-col>
            <v-col cols="4" class="pt-0">
            <v-row justify="end" align="center">
              <v-col cols="4">
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
                            label="Date"
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
              <v-btn
                      :disabled="!vModel.valid"
                      color="success"
                      default
                      @click="submitDate">
                검색
              </v-btn>
            </v-row>
            </v-col>
          </v-row>
          <p class="ml-5">항목을 클릭하시면 그래프로 확인하실 수 있습니다.</p>
          <base-material-tabs
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:80px">
            <v-tab
                    v-for="(tab, i) in config.lineCard"
                    :key="i"
                    :disabled="true"
                    style="height:80px;opacity: 1;">
              <h1 class="mb-0 font-weight-bold">
                  <template v-if="[1, 2].includes(i)">{{timeSet(tab.value)}}</template>
                  <template v-else-if="[4].includes(i)">{{numReplace(tab.value)}}%</template>
                  <template v-else-if="[5].includes(i)">{{numReplace(tab.value)}}원</template>
                  <template v-else>{{numReplace(tab.value)}}</template>
              </h1>
              <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
            </v-tab>
          </base-material-tabs>
          <v-row>
            <v-col cols="12" style="height:400px;">
              <fusioncharts
                :type='chartData.type'
                :width='chartData.width'
                :height='chartData.height'
                :dataFormat='chartData.dataFormat'
                :dataSource='chartData.dataSource'></fusioncharts>
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <v-col cols="2">
              <v-select
                      :items="config.orderbyOptions"
                      v-model="vModel.orderby"
                      label="정렬"
                      color="secondary"
                      @change="submitOrderby"/>
            </v-col>
            <v-btn color="warning" :disabled="vModel.list" @click="excelDownload()">
              엑셀 다운로드
            </v-btn>
          </v-row>
          <v-col v-if="resultMedia" cols="12" class="pa-0 ma-0" style="border-top:1px solid rgba(0, 0, 0, 0.12)">
            <v-data-table
                    class="resultMedia"
                    :headers="config.headersChart"
                    :items="resultMedia.list"
                    :items-per-page="5"
                    item-key="key"
                    no-data-text="컨텐츠가 없습니다."
                    hide-default-footer>
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-center" style="width:150px">{{ item.media }}</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.views) }}</td>
                        <td class="text-right" style="width:170px">{{ timeSet(item.content_seconds) }}</td>
                        <td class="text-right" style="width:170px">{{ timeSet(item.time) }}</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.clicks) }}</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.ads_revenue) }}원</td>
                    </tr>
                </template>
            </v-data-table>
          </v-col>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              [ {{this.$route.params.date}} ] 시간대별 성과 리포트
            </h2>
            <v-btn color="warning" :disabled="vModel.list" @click="excelDownload()">
              엑셀 다운로드
            </v-btn>
          </v-row>
          <v-col v-if="resultList" cols="12" class="pa-0 ma-0" style="border-top:1px solid rgba(0, 0, 0, 0.12)">
            <v-data-table
                    class="resultReport"
                    :headers="config.headersReport"
                    :items="resultList.list"
                    :items-per-page="resultList.list.length"
                    item-key="key"
                    no-data-text="컨텐츠가 없습니다."
                    hide-default-footer>
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-center" style="width:150px">{{ item.hourly }}</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.content_views) }}</td>
                        <td class="text-right" style="width:170px">{{ timeSet(item.content_seconds) }}</td>
                        <td class="text-right" style="width:170px">{{ timeSet(item.avg_content_seconds) }}</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.ads_clicks) }}</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.ads_revenue) }}원</td>
                        <td class="text-right" style="width:170px">{{ numReplace(item.click_revenue) }}원</td>
                    </tr>
                </template>
            </v-data-table>
          </v-col>
        </v-card-text>
      </base-material-card>
      </v-col>
    </v-row>
    <base-material-snackbar
      v-model="vModel.snackbar"
      :type="vModel.snackbarType"
      v-bind="{
        'top': true,
        'right': true
      }">
      <span style="display:block;width:300px;margin:0;">{{vModel.errorMessage}}</span>
    </base-material-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.getContents()
    this.reFresh()
  },
  data () {
    return {
      response: {
        contents: null,
        exposure: null,
        contentChart: null,
        contentMedia: null,
        contentList: null
      },
      vModel: {
        lineTap: 0,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        fresh: false,
        data: {
          title: '',
          name: '',
          type: '',
          category: '',
          created: ''
        },
        contentsToggle: null,
        valid: false,
        orderby: '',
        link: '',
        list: true,
      },
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
      config: {
        lineCard: [],
        orderbyOptions: [],
        headersChart: [
          { text: '매체명', value: 'media', align: 'center' },
          { text: '페이지 뷰', value: 'views', align: 'center' },
          { text: '체류 시간', value: 'content_seconds', align: 'center' },
          { text: '평균 체류 시간', value: 'time', align: 'center' },
          { text: '광고 클릭', value: 'clicks', align: 'center' },
          { text: 'CTR', value: 'ctr', align: 'center' },
          { text: '총 광고 매출', value: 'ads_revenue', align: 'center' },
        ],
        headersReport: [
          { text: '날짜', value: 'hourly', align: 'center' },
          { text: '페이지 뷰', value: 'page', align: 'center' },
          { text: '체류 시간', value: 'time', align: 'center' },
          { text: '평균 체류 시간', value: 'time2', align: 'center' },
          { text: '광고 클릭', value: 'click', align: 'center' },
          { text: 'CTR', value: 'ctr', align: 'center' },
          { text: 'RPM', value: 'rpm', align: 'center' },
          { text: '총 광고 매출', value: 'ad', align: 'center' },
          { text: '클릭당 단가', value: 'click2', align: 'center' },
        ],
        chartData: {
          type: 'stackedcolumn2dlinedy',
          width: '100%',
          height: '400',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              subcaption: '',
              yaxisname: '매출',
              syaxisname: '매출',
              plottooltext: '$seriesName : $dataValue',
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
              drawcrossline: '1',
              theme: 'fusion'
            },
            categories: [ { category: [] } ],
            dataset: [
              { seriesname: '', data: [] },
              {
                seriesname: '매출',
                parentyaxis: 'S',
                plottooltext: '$seriesName : $dataValue',
                renderas: 'line',
                data: []
              }
            ]
          }
        },
      },
      chartData: {}
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
    timeSet: function (val) {
      val = Number(val)
      let hour = parseInt(val / 3600) + ''
      let min = parseInt((val % 3600) / 60) + ''
      if (min.length === 1) {
        min = 0 + min
      }
      let sec = val % 60 + ''
      if (sec.length === 1) {
        sec = 0 + sec
      }
      return this.numReplace(hour) + '시간 ' + min + '분 ' + sec + '초'
    },
    submitDate () {
      let start = this.datePicker.start.date
      this.$router.push({ 'name': 'contentsReportHourly', params: { date: start }, query: { orderby: this.$route.query.orderby } })
      this.reFresh()
    },
    excelDownload () {
      let anchor = document.createElement('a')
      document.body.appendChild(anchor)
      let file = this.$store.state.baseURL + '/reports/content/hourly/excel/' + this.$route.params.contents_id + '?sdate=' + this.datePicker.start.date + '&edate=' + this.datePicker.start.date
      let headers = new Headers()
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('cdpUser')).accessToken)
      fetch(file, { headers })
        .then(response => response.blob())
        .then(blobby => {
          let objectUrl = window.URL.createObjectURL(blobby)
          anchor.href = objectUrl
          anchor.download = this.datePicker.start.date + '_ContentsReport_hourly.xlsx'
          anchor.click()
          window.URL.revokeObjectURL(objectUrl)
        })
    },
    reFresh () {
      let send = {
        sdate: this.$route.params.date,
        edate: this.$route.params.date,
      }
      this.datePicker.start.date = send.sdate
      if (this.$route.query.orderby) {
        this.vModel.orderby = this.$route.query.orderby
        send.orderby = this.vModel.orderby
      }
      this.getContentChart(send)
      this.getContentMedia(send)
      this.getContentList(send)
    },
    submitOrderby () {
      let send = {
        sdate: this.datePicker.start.date,
        edate: this.datePicker.start.date,
      }
      send.orderby = this.vModel.orderby
      this.$router.push({ 'name': 'contentsReportHourly', query: { date: send.sdate, orderby: send.orderby } })
      this.getContentMedia(send)
    },
    getContentChart (send) {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/reports/content/hourly/chart/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentChart = response.data.data
          this.config.lineCard = this.response.contentChart.data.lineCard
          let data1 = JSON.parse(JSON.stringify(this.config.chartData))
          data1.dataSource.chart.syaxisname = this.config.lineCard[0].title
          data1.dataSource.categories[0].category = this.response.contentChart.data.chart.label.reverse()
          data1.dataSource.dataset[0].data = this.response.contentChart.data.chart.revenue.reverse()
          data1.dataSource.dataset[0].seriesname = this.config.lineCard[5].title
          data1.dataSource.dataset[1].seriesname = this.config.lineCard[0].title
          data1.dataSource.dataset[1].data = this.response.contentChart.data.chart.view.reverse()
          this.chartData = data1
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    getContentMedia (send) {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/reports/content/media/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentMedia = response.data.data
          if (this.config.orderbyOptions.length === 0) {
            this.config.orderbyOptions = this.response.contentMedia.data.filter
            if (!this.vModel.orderby) {
              this.vModel.orderby = this.response.contentMedia.data.filter[0].value
            }
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
    getContentList (send) {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/reports/content/hourly/list/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentList = []
          this.response.contentList = response.data.data
          if (this.response.contentList.data.list.length > 0) {
            this.vModel.list = false
            this.response.contentList.data.list = this.response.contentList.data.list.reverse()
            this.response.contentList.data.total[0].hourly = '합계'
            this.response.contentList.data.list.unshift(this.response.contentList.data.total[0])
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
    exposure () {
      let text = '게재'
      if (this.vModel.contentsToggle) {
        text = '차단'
      }
      if (confirm('컨텐츠를 ' + text + ' 하시겠습니까?')) {
        let id = this.$route.params.contents_id
        this.xhttp({
          url: '/contents/' + id + '/exposure',
          method: 'put',
          data: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.exposure = response.data.data
            this.vModel.contentsToggle = this.response.exposure.contents.isOn
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
    getContents () {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/contents/' + id,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.contents = response.data.data.contents
          this.vModel.data.title = this.response.contents.title
          this.vModel.data.name = this.response.contents.partner.name
          this.vModel.data.type = this.response.contents.type
          this.vModel.data.category = this.response.contents.category
          this.vModel.data.created = this.response.contents.created.slice(0, 10)
          this.vModel.contentsToggle = this.response.contents.isOn
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
    contentsName () {
      if (this.response.contents) {
        return this.response.contents.title
      } else {
        return ''
      }
    },
    contentsToggleText () {
      if (this.response.contents) {
        if (this.vModel.contentsToggle) {
          return 'on'
        } else {
          return 'off'
        }
      } else {
        return ''
      }
    },
    resultChart () {
      if (this.response.contentChart) {
        return this.response.contentChart
      } else {
        return ''
      }
    },
    resultMedia () {
      if (this.response.contentMedia) {
        return this.response.contentMedia.data
      } else {
        return false
      }
    },
    resultList () {
      if (this.response.contentList) {
        return this.response.contentList.data
      } else {
        return false
      }
    }
  },
  watch: {
    datePicker: {
      handler (val) {
        if (val.start.date) {
          this.vModel.valid = true
        }
      },
      deep: true
    }
  }
}
</script>

<style>
  #contentsReportHourly .resultMedia tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
  #contentsReportHourly .resultReport tbody tr:first-child {
    contentsReportHourly: rgba(0, 0, 0, .05);
  }
</style>
