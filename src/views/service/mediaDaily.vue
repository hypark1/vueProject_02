<template>
  <v-container
    id="revenueDaily"
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
            [ {{datePicker.start.date}} - {{datePicker.end.date}} ] 매출 리포트
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              매출 추이
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
              <v-col cols="2">
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
          <v-row v-if="resultChart">
            <v-col cols="2">
              <v-card outlined class="mt-0 pa-3">
                <v-card-title class="font-weight-bold pt-4 pb-2">
                  총 페이지뷰 {{ numReplace(resultChart.data.viewCard[0].total_view) }}
                </v-card-title>
                <v-card-text class="font-weight-regular pb-4">
                  일평균 페이지뷰 {{ numReplace(resultChart.data.viewCard[0].days_view) }}
                </v-card-text>
              </v-card>
              <v-card outlined class="mt-0 pa-3">
                <v-card-title class="font-weight-bold pt-4 pb-2">
                  총 매출 {{ numReplace(resultChart.data.revenueCard[0].total_revenue) }}
                </v-card-title>
                <v-card-text class="font-weight-regular pb-4">
                  일평균 매출 {{ numReplace(resultChart.data.revenueCard[0].days_revenue) }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6" style="height:420px;">
                <fusioncharts
                        :type='chartData1.type'
                        :width='chartData1.width'
                        :height='chartData1.height'
                        :dataFormat='chartData1.dataFormat'
                        :dataSource='chartData1.dataSource'
                ></fusioncharts>
            </v-col>
            <v-col cols="4">
              <fusioncharts
                      :type='chartData3.type'
                      :width='chartData3.width'
                      :height='chartData3.height'
                      :dataFormat='chartData3.dataFormat'
                      :dataSource='chartData3.dataSource'
              ></fusioncharts>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="pa-4">
            <template v-for="val in config.lineCard">
              <v-card outlined style="width:19%" class="mt-0 pa-3" :key="val.title">
                <template v-if="val.title">
                <v-card-text class="font-weight-regular pb-0">
                  {{val.title}}
                </v-card-text>
                <v-card-title class="font-weight-bold pb-2">
                  {{numReplace(val.ads_revenue)}}원
                </v-card-title>
                </template>
                <template v-else>
                  <v-card-title class="font-weight-bold pb-0" style="padding:16px;">
                    총 매출 {{numReplace(val.total_revenue)}}원
                  </v-card-title>
                  <v-card-text class="font-weight-regular pb-2" style="padding-top:7px;">
                    일평균 매출 {{numReplace(val.days_revenue)}}원
                  </v-card-text>
                </template>
              </v-card>
            </template>
          </v-row>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              일별 매출 리포트
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
                  <td class="text-center" style="width:150px">{{item.daily}}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.media_revenue) }}원</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.content_view) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_view) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_click) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
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
                    @click:row="tableRowClick"
                    hide-default-header
                    hide-default-footer>
              <template v-slot:item="{ item }">
                <tr @click="tableRowClick(item)">
                  <td class="text-center" style="width:150px">{{item.daily}}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.media_revenue) }}원</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.content_view) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_view) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ads_click) }}</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                  <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
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
        revenueChart: null,
        revenueList: null
      },
      vModel: {
        valid: true,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        link: '',
        list: true,
        reportTap: 0,
        lineTap: 0,
        barTap: 0,
      },
      acceptCategoriesData: [],
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
          { text: '날짜', value: 'daily', align: 'center' },
          { text: '매출', value: 'media_revenue', align: 'center' },
          { text: '페이지 뷰', value: 'content_view', align: 'center' },
          { text: '노출', value: 'view', align: 'center' },
          { text: '클릭', value: 'click', align: 'center' },
          { text: 'CTR', value: 'ctr', align: 'center' },
          { text: 'RPM', value: 'rpm', align: 'center' },
        ],
        lineCard: [],
        chartData1: {
          type: 'stackedcolumn2dlinedy',
          width: '100%',
          height: '400',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              subcaption: '',
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
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
              {
                seriesname: '',
                data: []
              },
              {
                seriesname: '',
                data: []
              },
              {
                seriesname: '',
                data: []
              },
              {
                seriesname: '페이지 뷰',
                parentyaxis: 'S',
                plottooltext: '$seriesName : $dataValue',
                renderas: 'Line',
                data: []
              },
            ]
          }
        },
        chartData3: {
          type: 'pie2d',
          width: '100%',
          height: '350',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              subcaption: '',
              yaxisname: '',
              syaxisname: '',
              plottooltext: '$label : $dataValue',
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
              drawcrossline: '1',
              showlegend: '1',
              showpercentvalues: '1',
              legendposition: 'bottom',
              usedataplotcolorforlabels: '1',
              theme: 'fusion'
            },
            data: []
          }
        }
      },
      chartData1: {},
      chartData3: {},
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
      if (val === null) {
        return 0
      } else {
        let num = val + ''
        num = num.split('.')
        let result = num[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        if (num[1]) {
          result += '.' + num[1]
        }
        return result
      }
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
    tableRowClick (v) {
      this.$router.push({ name: 'reportHourly', query: { date: v.daily } })
    },
    submitDate () {
      let start = this.datePicker.start.date
      let end = this.datePicker.end.date
      let startNum = Number(start.replace(/-/gi, ''))
      let endNum = Number(end.replace(/-/gi, ''))
      if (startNum > endNum) {
        this.snack('warning', '시작일을 종료일보다 앞날짜로 선택하세요.')
      } else {
        this.$router.push({ 'name': 'reportDaily', query: { start: start, end: end } })
        this.reFresh()
      }
    },
    excelDownload () {
      let anchor = document.createElement('a')
      document.body.appendChild(anchor)
      let file = this.$store.state.baseURL + '/reports/media/daily/revenue-excel?sdate=' + this.datePicker.start.date + '&edate=' + this.datePicker.end.date
      let headers = new Headers()
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('cdpUser')).accessToken)
      fetch(file, { headers })
        .then(response => response.blob())
        .then(blobby => {
          let objectUrl = window.URL.createObjectURL(blobby)
          anchor.href = objectUrl
          anchor.download = this.datePicker.start.date + '_' + this.datePicker.end.date + '_RevenueReport_daily.xlsx'
          anchor.click()
          window.URL.revokeObjectURL(objectUrl)
        })
    },
    reFresh () {
      if (this.$route.query.start) {
        this.datePicker.start.date = this.$route.query.start
        this.datePicker.end.date = this.$route.query.end
      } else {
        this.datePicker.start.date = this.$moment(new Date()).add(-6, 'days').format('YYYY-MM-DD')
        this.datePicker.end.date = this.$moment(new Date()).format('YYYY-MM-DD')
      }
      let send = {
        sdate: this.datePicker.start.date,
        edate: this.datePicker.end.date,
      }
      this.vModel.list = true
      this.vModel.link = ''
      this.response.revenueChart = null
      this.response.revenueList = null
      this.config.lineCard = []
      this.chartData1 = []
      this.chartData3 = []
      this.getRevenueChart(send)
      this.getRevenueList(send)
    },
    getRevenueChart (send) {
      this.xhttp({
        url: '/reports/media/daily/revenue-chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.revenueChart = response.data.data
          this.config.lineCard = this.response.revenueChart.data.lineCard
          if (this.response.revenueChart.data.chart.label.length > 0) {
            for (let v in this.response.revenueChart.data.chart.revenue) {
              this.response.revenueChart.data.chart.revenue[v] = this.response.revenueChart.data.chart.revenue[v].reverse()
            }
            for (let v in this.response.revenueChart.data.chart.view) {
              this.response.revenueChart.data.chart.view[v] = this.response.revenueChart.data.chart.view[v].reverse()
            }
            let data1 = JSON.parse(JSON.stringify(this.config.chartData1))
            data1.dataSource.categories[0].category = this.response.revenueChart.data.chart.label.reverse()
            data1.dataSource.chart.yaxisname = '전체'
            data1.dataSource.chart.syaxisname = '페이지 뷰'
            for (let i = 0; i < 5; i++) {
              data1.dataSource.dataset[i].seriesname = this.response.revenueChart.data.lineCard[i].title
              data1.dataSource.dataset[i].data = this.response.revenueChart.data.chart.revenue[i + 1]
            }
            data1.dataSource.dataset[5].seriesname = '페이지 뷰'
            data1.dataSource.dataset[5].data = this.response.revenueChart.data.chart.view[0]
            this.chartData1 = data1
            let data3 = JSON.parse(JSON.stringify(this.config.chartData3))
            data3.dataSource.data = this.response.revenueChart.data.chart.pie
            this.chartData3 = data3
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
    getRevenueList (send) {
      this.xhttp({
        url: '/reports/media/daily/revenue-list',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.revenueList = response.data.data
          if (this.response.revenueList.data.list.length > 0) {
            this.vModel.list = false
            this.response.revenueList.data.list = this.response.revenueList.data.list.reverse()
          }
          this.response.revenueList.data.total[0].daily = '합계'
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
      if (this.response.revenueChart) {
        return this.response.revenueChart
      } else {
        return ''
      }
    },
    resultList () {
      if (this.response.revenueList) {
        return this.response.revenueList.data
      } else {
        return ''
      }
    },
  },
  watch: {
  }
}
</script>
