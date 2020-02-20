<template>
  <v-container
    id="partnerOverview"
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
            서비스 Overview
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              서비스 매출 리포트
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
          <p class="ml-5">항목을 클릭하시면 그래프로 확인하실 수 있습니다.</p>
          <base-material-tabs
                  v-model="vModel.lineTap"
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:100px">
            <v-tab
                    v-for="(tab, i) in config.lineCard"
                    :key="i"
                    @click="lineTapClick(i)"
                    style="height:100px">
              <h1 class="mb-1 font-weight-bold">{{numReplace(tab.cp_revenue)}}원</h1>
              <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
            </v-tab>
          </base-material-tabs>
          <v-row>
            <v-col cols="12" style="height:420px;" v-if="resultChart">
              <template v-if="vModel.lineTap === 0">
                <fusioncharts
                        :type='chartData1.type'
                        :width='chartData1.width'
                        :height='chartData1.height'
                        :dataFormat='chartData1.dataFormat'
                        :dataSource='chartData1.dataSource'
                ></fusioncharts>
              </template>
              <template v-else>
                <fusioncharts
                        :type='chartData2.type'
                        :width='chartData2.width'
                        :height='chartData2.height'
                        :dataFormat='chartData2.dataFormat'
                        :dataSource='chartData2.dataSource'
                ></fusioncharts>
              </template>
            </v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="6" v-if="resultChart">
              <fusioncharts
                      :type='chartData3.type'
                      :width='chartData3.width'
                      :height='chartData3.height'
                      :dataFormat='chartData3.dataFormat'
                      :dataSource='chartData3.dataSource'
              ></fusioncharts>
            </v-col>
            <v-col v-if="resultChart" cols="6" class="pa-0 ma-0" style="max-height:480px;overflow-y:auto;border-top:1px solid rgba(0, 0, 0, 0.12)">
              <v-data-table
                      :headers="config.headersReport"
                      :items="resultChart.data.table"
                      :items-per-page="resultChart.data.table.length"
                      item-key="category"
                      no-data-text="카테고리가 없습니다."
                      hide-default-footer>
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center">{{item.category}}</td>
                    <td class="text-right">{{ numReplace(item.cp_revenue) }}원</td>
                    <td class="text-right">{{ numReplace(item.content_view) }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
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
        revenueChart: null
      },
      vModel: {
        valid: true,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
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
          { text: '구분', value: 'category', align: 'center' },
          { text: '매출', value: 'cp_revenue', align: 'center' },
          { text: '컨텐츠 뷰', value: 'content_view', align: 'center' },
        ],
        lineCard: [],
        chartData1: {
          type: 'stackedcolumn2d',
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
            ]
          }
        },
        chartData2: {
          type: 'stackedcolumn2d',
          width: '100%',
          height: '400',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              subcaption: '',
              yaxisname: '',
              syaxisname: '',
              plottooltext: '$seriesName : $dataValue',
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
              drawcrossline: '1',
              theme: 'fusion'
            },
            categories: [ { category: [] } ],
            dataset: [
              { seriesname: '', data: [] }
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
      chartData2: {},
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
    submitDate () {
      let start = this.datePicker.start.date
      let end = this.datePicker.end.date
      let startNum = Number(start.replace(/-/gi, ''))
      let endNum = Number(end.replace(/-/gi, ''))
      if (startNum > endNum) {
        this.snack('warning', '시작일을 종료일보다 앞날짜로 선택하세요.')
      } else {
        this.$router.push({ 'name': 'reportOverview', query: { start: start, end: end } })
        this.reFresh()
      }
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
      this.response.revenueChart = null
      this.config.lineCard = []
      this.chartData1 = []
      this.chartData2 = []
      this.chartData3 = []
      this.getMediaChart(send)
    },
    lineTapClick (v) {
      if (v > 0) {
        this.chartData2.dataSource.dataset[0].seriesname = this.config.lineCard[v].title
        this.chartData2.dataSource.chart.yaxisname = this.config.lineCard[v].title
        this.chartData2.dataSource.dataset[0].data = this.response.revenueChart.data.chart.revenue[v]
      }
    },
    getMediaChart (send) {
      this.xhttp({
        url: '/reports/dashboard/daily/partner',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.revenueChart = response.data.data
          this.config.lineCard = this.response.revenueChart.data.lineCard
          if (this.response.revenueChart.data.chart.label) {
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
              data1.dataSource.dataset[i].seriesname = this.response.revenueChart.data.lineCard[i + 1].title
              data1.dataSource.dataset[i].data = this.response.revenueChart.data.chart.revenue[i + 1]
            }
            this.chartData1 = data1
            let data2 = JSON.parse(JSON.stringify(this.config.chartData2))
            data2.dataSource.chart.yaxisname = this.config.lineCard[1].title
            data2.dataSource.categories[0].category = this.response.revenueChart.data.chart.label
            data2.dataSource.dataset[0].data = this.response.revenueChart.data.chart.revenue[0]
            data2.dataSource.dataset[0].seriesname = this.config.lineCard[1].title
            this.chartData2 = data2
            let data3 = JSON.parse(JSON.stringify(this.config.chartData3))
            data3.dataSource.data = this.response.revenueChart.data.chart.pie
            this.chartData3 = data3
          }
          this.vModel.lineTap = 0
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
  },
  watch: {
  }
}
</script>

<style>
  #partnerOverview table tbody tr:first-child { background: #ddd; }
</style>
