<template>
  <v-container
    id="serviceOverview"
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
              서비스 트래픽 리포트
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
                  v-model="vModel.lineTap1"
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:80px">
            <v-tab
                    v-for="(tab, i) in config.lineCard1"
                    :key="i"
                    @click="lineTapClick1(i)"
                    style="height:80px">
              <h1 class="mb-0 font-weight-bold">
                <template v-if="[3, 4].includes(i)">
                  {{timeSet(tab.value)}}
                </template>
                <template v-else>
                  {{numReplace(tab.value)}}
                </template>
              </h1>
              <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
            </v-tab>
          </base-material-tabs>
          <v-row>
            <v-col cols="12" v-if="resultMedia">
              <fusioncharts
                :type='chartData1.type'
                :width='chartData1.width'
                :height='chartData1.height'
                :dataFormat='chartData1.dataFormat'
                :dataSource='chartData1.dataSource'></fusioncharts>
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              광고 트래픽 리포트
            </h2>
          </v-row>
          <p class="ml-5">항목을 클릭하시면 그래프로 확인하실 수 있습니다.</p>
          <base-material-tabs
                  v-model="vModel.lineTap2"
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:80px">
            <v-tab
                    v-for="(tab, i) in config.lineCard2"
                    :key="i"
                    @click="lineTapClick2(i)"
                    style="height:80px">
              <h1 class="mb-0 font-weight-bold">
                {{numReplace(tab.value)}}
                <template v-if="[2, 3].includes(i)">%</template>
                <template v-if="[4, 5].includes(i)">원</template>
              </h1>
              <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
            </v-tab>
          </base-material-tabs>
          <v-row>
            <v-col cols="12" v-if="resultAds">
              <fusioncharts
                      :type='chartData2.type'
                      :width='chartData2.width'
                      :height='chartData2.height'
                      :dataFormat='chartData2.dataFormat'
                      :dataSource='chartData2.dataSource'></fusioncharts>
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              카테고리 리포트
            </h2>
          </v-row>
          <p class="ml-5">항목을 클릭하시면 그래프로 확인하실 수 있습니다.</p>
          <base-material-tabs
                  v-model="vModel.lineTap3"
                  background-color="transparent"
                  fixed-tabs
                  color="warning"
                  icons-and-text
                  style="height:130px">
            <v-tab
                    v-for="(tab, i) in config.lineCard3"
                    :key="i"
                    :disabled="i===0"
                    @click="lineTapClick3(i)"
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
            <v-col cols="12" v-if="resultCategory">
              <fusioncharts
                      :type='chartData3.type'
                      :width='chartData3.width'
                      :height='chartData3.height'
                      :dataFormat='chartData3.dataFormat'
                      :dataSource='chartData3.dataSource'></fusioncharts>
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
        mediaChart: null,
        adsChart: null,
        categoryChart: null,
      },
      vModel: {
        lineTap1: 0,
        lineTap2: 0,
        lineTap3: 1,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
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
        lineCard1: [],
        lineCard2: [],
        lineCard3: [],
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
        },
        chartData2: {
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
      let end = this.datePicker.end.date
      let startNum = Number(start.replace(/-/gi, ''))
      let endNum = Number(end.replace(/-/gi, ''))
      if (startNum > endNum) {
        this.snack('warning', '시작일을 종료일보다 앞날짜로 선택하세요.')
      } else {
        this.$router.push({ 'name': 'serviceOverview', query: { start: start, end: end } })
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
        edate: this.datePicker.end.date
      }
      this.chartData1 = []
      this.chartData2 = []
      this.chartData3 = []
      this.response.mediaChart = null
      this.response.adsChart = null
      this.response.categoryChart = null
      this.getMediaChart(send)
      this.getAdsChart(send)
      this.getCategoryChart(send)
    },
    getMediaChart (send) {
      this.xhttp({
        url: '/reports/media/daily/chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.mediaChart = response.data.data
          this.config.lineCard1 = this.response.mediaChart.data.lineCard
          if (this.response.mediaChart.data.chart[0].length > 0) {
            for (let v in this.response.mediaChart.data.chart) {
              this.response.mediaChart.data.chart[v] = this.response.mediaChart.data.chart[v].reverse()
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData))
            data.dataSource.chart.syaxisname = this.config.lineCard1[0].title
            data.dataSource.data = this.response.mediaChart.data.chart[0]
            this.chartData1 = data
            this.vModel.lineTap1 = 0
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
    getAdsChart (send) {
      this.xhttp({
        url: '/reports/ads/daily/chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.adsChart = response.data.data
          this.config.lineCard2 = this.response.adsChart.data.lineCard
          if (this.response.adsChart.data.chart[0].length > 0) {
            for (let v in this.response.adsChart.data.chart) {
              this.response.adsChart.data.chart[v] = this.response.adsChart.data.chart[v].reverse()
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData))
            data.dataSource.chart.syaxisname = this.config.lineCard2[0].title
            data.dataSource.data = this.response.adsChart.data.chart[0]
            this.chartData2 = data
            this.vModel.lineTap2 = 0
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
    getCategoryChart (send) {
      this.xhttp({
        url: '/reports/content/daily/chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.categoryChart = response.data.data
          this.config.lineCard3 = this.response.categoryChart.data.lineCard
          this.config.lineCard3.unshift(this.response.categoryChart.data.profitCard[0])
          if (this.response.categoryChart.data.chart.view[0] !== null) {
            for (let v in this.response.categoryChart.data.chart.view) {
              if (this.response.categoryChart.data.chart.view[v] !== null) {
                this.response.categoryChart.data.chart.view[v] = this.response.categoryChart.data.chart.view[v].reverse()
                this.response.categoryChart.data.chart.click[v] = this.response.categoryChart.data.chart.click[v].reverse()
              }
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData2))
            data.dataSource.categories[0].category = this.response.categoryChart.data.chart.label.reverse()
            data.dataSource.chart.syaxisname = this.config.lineCard3[0].title
            data.dataSource.dataset[0].seriesname = '노출'
            data.dataSource.dataset[0].data = this.response.categoryChart.data.chart.view[0]
            data.dataSource.dataset[1].seriesname = '클릭'
            data.dataSource.dataset[1].data = this.response.categoryChart.data.chart.click[0]
            this.chartData3 = data
            this.vModel.lineTap3 = 0
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
    lineTapClick1 (v) {
      this.chartData1.dataSource.chart.syaxisname = this.config.lineCard1[v].title
      this.chartData1.dataSource.data = this.response.mediaChart.data.chart[v]
    },
    lineTapClick2 (v) {
      this.chartData2.dataSource.chart.syaxisname = this.config.lineCard2[v].title
      this.chartData2.dataSource.data = this.response.adsChart.data.chart[v]
    },
    lineTapClick3 (v) {
      this.chartData3.dataSource.dataset[0].data = this.response.categoryChart.data.chart.view[v - 1]
      this.chartData3.dataSource.dataset[1].data = this.response.categoryChart.data.chart.click[v - 1]
    },
  },
  computed: {
    resultMedia () {
      if (this.response.mediaChart) {
        return this.response.mediaChart
      } else {
        return ''
      }
    },
    resultAds () {
      if (this.response.adsChart) {
        return this.response.adsChart
      } else {
        return ''
      }
    },
    resultCategory () {
      if (this.response.categoryChart) {
        return this.response.categoryChart
      } else {
        return ''
      }
    },
  },
  watch: {
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
