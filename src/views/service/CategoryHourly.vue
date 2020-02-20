<template>
  <v-container
    id="serviceCategoryHourly"
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
            [ {{ $route.params.date }} ] 카테고리 리포트
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              카테고리 리포트
            </h2>
            <v-row justify="end" align="center">
              <v-col cols="2">
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
          </v-row>
          <p class="ml-5">항목을 클릭하시면 그래프로 확인하실 수 있습니다.</p>
          <base-material-tabs
                  v-model="vModel.lineTap"
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:130px">
            <v-tab
                    v-for="(tab, i) in config.lineCard"
                    :key="i"
                    :disabled="i===0"
                    @click="lineTapClick(i)"
                    style="height:130px;opacity: 1;">
              <template v-if="i===0">
                <h1 class="mb-0 font-weight-bold">매출이익 {{numReplace(tab.profit)}}원</h1>
                <h3 class="mb-1 font-weight-regular">매체비 {{numReplace(tab.media)}}원</h3>
                <h3 class="mb-1 font-weight-regular">매출 {{numReplace(tab.revenue)}}원</h3>
                <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
              </template>
              <template v-else>
                <h1 class="mb-0 font-weight-bold">CTR {{numReplace(tab.ctr)}}%</h1>
                <h3 class="mb-1 font-weight-regular">클릭 {{numReplace(tab.click)}}</h3>
                <h3 class="mb-1 font-weight-regular">노출 {{numReplace(tab.view)}}</h3>
                <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
              </template>
            </v-tab>
          </base-material-tabs>
          <v-row>
            <v-col cols="12" v-if="resultChart">
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
            <h2 style="padding: 20px 10px;">
              [ {{ $route.params.date }} ] 날짜별 카테고리 리포트
            </h2>
            <v-btn color="warning" :disabled="vModel.list" @click="excelDownload()">
              엑셀 다운로드
            </v-btn>
          </v-row>
          <v-col v-if="resultList" cols="12" class="pa-0 ma-0" style="border-top:1px solid rgba(0, 0, 0, 0.12)">
          <v-data-table
                  class="tableTotal"
                  :headers="config.headersReport"
                  :items="resultList.total"
                  :items-per-page="resultList.total.length"
                  item-key="key"
                  no-data-text="리스트가 없습니다."
                  hide-default-footer>
            <template v-slot:item="{ item }">
              <tr style="background: #ddd;">
                <td class="text-center" style="width:150px">{{item.hourly}}</td>
                <td class="text-right" style="width:170px">{{ numReplace(item.ads_revenue) }}</td>
                <td class="text-right" style="width:170px">{{ numReplace(item.ads_views) }}</td>
                <td class="text-right" style="width:170px">{{ numReplace(item.ads_clicks) }}</td>
                <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                <td class="text-right" style="width:170px">{{ timeSet(item.video_seconds) }}</td>
                <td class="text-right" style="width:170px">{{ numReplace(item.vctr) }}%</td>
                <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
                <td class="text-right" style="width:190px;padding-right:25px;">{{ numReplace(item.click_revenue) }}원</td>
              </tr>
            </template>
          </v-data-table>
          </v-col>
          <v-col v-if="resultList" cols="12" class="pa-0 ma-0" style="max-height:480px;overflow-y:auto;border-bottom:1px solid rgba(0, 0, 0, 0.12)">
            <v-data-table
                    :headers="config.headersReport"
                    :items="resultList.list"
                    :items-per-page="resultList.list.length"
                    item-key="key"
                    no-data-text="리스트가 없습니다."
                    hide-default-header
                    hide-default-footer>
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center" style="width:150px">{{item.hourly}}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_revenue) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_views) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_clicks) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                  <td class="text-right" style="width:170px">{{ timeSet(item.video_seconds) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.vctr) }}%</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
                  <td class="text-right" style="width:175px">{{ numReplace(item.click_revenue) }}원</td>
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
    this.reFresh()
  },
  data () {
    return {
      response: {
        categoryChart: null,
        categoryList: null
      },
      vModel: {
        lineTap: 1,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
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
        headersReport: [
          { text: '시간', value: 'hourly', align: 'center' },
          { text: '소진 광고비', value: 'ads_revenue', align: 'center' },
          { text: '노출', value: 'ads_views', align: 'center' },
          { text: '클릭', value: 'ads_clicks', align: 'center' },
          { text: 'CTR', value: 'ctr', align: 'center' },
          { text: '동영상광고 재생시간', value: 'video_seconds', align: 'center' },
          { text: 'vCTR', value: 'vctr', align: 'center' },
          { text: 'RPM', value: 'rpm', align: 'center' },
          { text: '클릭당 단가', value: 'click_revenue', align: 'center' },
        ],
        lineCard: [],
        chartData: {
          type: 'msline',
          width: '100%',
          height: '400',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              yaxisname: '',
              subcaption: '',
              showhovereffect: '1',
              formatnumberscale: '0',
              sformatnumberscale: '1',
              numbersuffix: '',
              drawcrossline: '1',
              plottooltext: '$seriesName : $dataValue',
              theme: 'fusion'
            },
            categories: [ { category: [] } ],
            dataset: [
              {
                seriesname: '',
                data: []
              },
              {
                seriesname: '',
                data: []
              },
            ]
          }
        }
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
      this.$router.push({ 'name': 'serviceCategoryHourly', params: { date: start } })
      this.reFresh()
    },
    excelDownload () {
      let anchor = document.createElement('a')
      document.body.appendChild(anchor)
      let file = this.$store.state.baseURL + '/reports/ads/hourly/revenue-excel?sdate=' + this.datePicker.start.date + '&edate=' + this.datePicker.start.date
      let headers = new Headers()
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('cdpUser')).accessToken)
      fetch(file, { headers })
        .then(response => response.blob())
        .then(blobby => {
          let objectUrl = window.URL.createObjectURL(blobby)
          anchor.href = objectUrl
          anchor.download = this.datePicker.start.date + '_CategoryReport_hourly.xlsx'
          anchor.click()
          window.URL.revokeObjectURL(objectUrl)
        })
    },
    reFresh () {
      this.datePicker.start.date = this.$route.params.date
      let send = {
        sdate: this.datePicker.start.date,
        edate: this.datePicker.start.date
      }
      this.response.categoryChart = null
      this.response.categoryList = null
      this.getCategoryChart(send)
      this.getCategoryList(send)
    },
    lineTapClick (v) {
      this.chartData.dataSource.dataset[0].data = this.response.categoryChart.data.chart.view[v - 1]
      this.chartData.dataSource.dataset[1].data = this.response.categoryChart.data.chart.click[v - 1]
    },
    getCategoryChart (send) {
      this.xhttp({
        url: '/reports/content/hourly/chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.categoryChart = response.data.data
          for (let v in this.response.categoryChart.data.chart.view) {
            if (this.response.categoryChart.data.chart.view[v] !== null) {
              this.response.categoryChart.data.chart.view[v] = this.response.categoryChart.data.chart.view[v].reverse()
              this.response.categoryChart.data.chart.click[v] = this.response.categoryChart.data.chart.click[v].reverse()
            }
          }
          this.config.lineCard = []
          this.chartData = []
          this.config.lineCard = this.response.categoryChart.data.lineCard
          this.config.lineCard.unshift(this.response.categoryChart.data.profitCard[0])
          let data = JSON.parse(JSON.stringify(this.config.chartData))
          data.dataSource.categories[0].category = this.response.categoryChart.data.chart.label.reverse()
          data.dataSource.chart.syaxisname = this.config.lineCard[0].title
          data.dataSource.dataset[0].seriesname = '노출'
          data.dataSource.dataset[0].data = this.response.categoryChart.data.chart.view[0]
          data.dataSource.dataset[1].seriesname = '클릭'
          data.dataSource.dataset[1].data = this.response.categoryChart.data.chart.click[0]
          this.chartData = data
          this.vModel.lineTap = 1
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    getCategoryList (send) {
      this.xhttp({
        url: '/reports/ads/hourly/list',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.categoryList = response.data.data
          this.vModel.list = false
          this.response.categoryList.data.list = this.response.categoryList.data.list.reverse()
          this.response.categoryList.data.total[0].hourly = '합계'
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
  },
  computed: {
    resultChart () {
      if (this.response.categoryChart) {
        return this.response.categoryChart
      } else {
        return ''
      }
    },
    resultList () {
      if (this.response.categoryList) {
        return this.response.categoryList.data
      } else {
        return ''
      }
    },
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
