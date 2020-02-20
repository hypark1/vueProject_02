<template>
  <v-container
    id="serviceAdsHourly"
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
            [ {{ $route.params.date }} ] 광고 트래픽 리포트
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              광고 트래픽 리포트
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
                  v-model="vModel.lineTap1"
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:80px">
            <v-tab
                    v-for="(tab, i) in config.lineCard"
                    :key="i"
                    @click="lineTapClick(i)"
                    style="height:80px">
              <h1 class="mb-0 font-weight-bold">
                {{numReplace(tab.value)}}
                <template v-if="[2, 3].includes(i)">%</template>
                <template v-else-if="[4, 5].includes(i)">원</template>
              </h1>
              <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
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
              [ {{ $route.params.date }} ] 시간대별 광고 트래픽 리포트
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
        adsChart: null,
        adsList: null
      },
      vModel: {
        lineTap1: 0,
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
          type: 'line',
          width: '100%',
          height: '400',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              yaxisname: '',
              anchorradius: '5',
              plottooltext: '$dataValue',
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
              sformatnumberscale: '1',
              theme: 'fusion',
              anchorbgcolor: '#72D7B2',
              palettecolors: '#72D7B2'
            },
            data: []
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
      this.$router.push({ 'name': 'serviceAdsHourly', params: { date: start } })
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
          anchor.download = this.datePicker.start.date + '_AdsReport_hourly.xlsx'
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
      this.response.adsChart = null
      this.response.adsList = null
      this.getAdsChart(send)
      this.getAdsList(send)
    },
    lineTapClick (v) {
      this.chartData.dataSource.chart.syaxisname = this.config.lineCard[v].title
      this.chartData.dataSource.data = this.response.adsChart.data.chart[v]
    },
    getAdsChart (send) {
      this.xhttp({
        url: '/reports/ads/hourly/chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.adsChart = response.data.data
          for (let v in this.response.adsChart.data.chart) {
            this.response.adsChart.data.chart[v] = this.response.adsChart.data.chart[v].reverse()
          }
          this.config.lineCard = []
          this.chartData = []
          this.config.lineCard = this.response.adsChart.data.lineCard
          let data = JSON.parse(JSON.stringify(this.config.chartData))
          data.dataSource.chart.syaxisname = this.config.lineCard[0].title
          data.dataSource.data = this.response.adsChart.data.chart[0]
          this.chartData = data
          this.vModel.lineTap1 = 0
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    getAdsList (send) {
      this.xhttp({
        url: '/reports/ads/hourly/list',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.adsList = response.data.data
          this.vModel.list = false
          this.response.adsList.data.list = this.response.adsList.data.list.reverse()
          this.response.adsList.data.total[0].hourly = '합계'
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
      if (this.response.adsChart) {
        return this.response.adsChart
      } else {
        return ''
      }
    },
    resultList () {
      if (this.response.adsList) {
        return this.response.adsList.data
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
