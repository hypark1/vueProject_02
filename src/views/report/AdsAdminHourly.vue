<template>
  <v-container
          id='reportAdsHourly'
          fluid
          tag='section'>
    <v-row
            align='center'
            justify='center'>
      <v-col cols='12'>
        <base-material-card
                color='green'>
          <template v-slot:heading>
            <h1 class='display-2 font-weight-regular'>
              [ {{ datePicker.start.date }} ] 정산 보고서
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center">
              <h2 style="padding: 20px 10px;">
                매출 현황 및 추이
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
            <template v-if="resultReport">
              <v-row>
                <v-col cols="12" ref="chart1">
                  <fusioncharts
                          :type='chartData.type'
                          :width='chartData.width'
                          :height='chartData.height'
                          :dataFormat='chartData.dataFormat'
                          :dataSource='chartData.dataSource'
                  ></fusioncharts>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-card outlined class="pa-3">
                    <v-card-text class="justify-center font-weight-regular text-center">
                      <h3>컨텐츠 뷰</h3><br>
                      <h1>{{numReplace(resultReport.card.total_views)}}원</h1>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3">
                  <v-card outlined class="pa-3">
                    <v-card-text class="justify-center font-weight-regular text-center">
                      <h3>AIINFEED 수익</h3><br>
                      <h1>{{numReplace(resultReport.card.total_revenue)}}원</h1>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3">
                  <v-card outlined class="pa-3">
                    <v-card-text class="justify-center font-weight-regular text-center">
                      <h3>매체 수익</h3><br>
                      <h1>{{numReplace(resultReport.card.total_media_revenue)}}원</h1>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3">
                  <v-card outlined class="pa-3">
                    <v-card-text class="justify-center font-weight-regular text-center">
                      <h3>CP 수익</h3><br>
                      <h1>{{numReplace(resultReport.card.total_content_revenue)}}원</h1>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider class="mt-5 mb-5" />
              <v-row justify="space-between" align="center" class="ma-0">
                <h2 style="padding: 20px 10px;">
                  시간별 정산 리포트
                </h2>
              </v-row>
              <v-col v-if="resultReport" cols="12" class="pa-0 ma-0">
                <v-data-table
                        :headers="config.headersReport"
                        :items="resultReport.list"
                        :items-per-page="resultReport.list.length"
                        item-key="key"
                        no-data-text="리스트가 없습니다."
                        hide-default-footer>
                  <template v-slot:item="{ item }">
                    <tr>
                      <td class="text-center">{{item.hourly}}</td>
                      <td class="text-center" style="width:320px">{{ numReplace(item.views) }}</td>
                      <td class="text-center" style="width:320px">{{ numReplace(item.revenue) }}원</td>
                      <td class="text-center" style="width:320px">{{ numReplace(item.media_revenue) }}원</td>
                      <td class="text-center" style="width:320px">{{ numReplace(item.content_revenue) }}원</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </template>
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
        report: null,
      },
      vModel: {
        valid: false,
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
        headersReport: [
          { text: '시간', value: 'hourly', align: 'center' },
          { text: '컨텐츠 뷰', value: 'views', align: 'center' },
          { text: 'AIINFEED 수익', value: 'revenue', align: 'center' },
          { text: '매체 수익', value: 'media_revenue', align: 'center' },
          { text: 'CP 수익', value: 'content_revenue', align: 'center' },
        ],
        lineCard: [],
        serviceCard: [],
        adsCard: [],
        contentCard: [],
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
            categories: [
              {
                category: []
              }
            ],
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
                seriesname: '컨텐츠 뷰',
                parentyaxis: 'S',
                plottooltext: '$seriesName : $dataValue',
                renderas: 'Line',
                data: []
              },
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
    submitDate (val) {
      let start = this.datePicker.start.date
      this.$router.push({ 'name': 'reportAdsHourly', params: { date: start } })
      this.reFresh()
    },
    reFresh () {
      this.datePicker.start.date = this.$route.params.date
      this.datePicker.end.date = this.$route.params.date
      let send = {
        sdate: this.datePicker.start.date,
        edate: this.datePicker.end.date
      }
      this.response.report = null
      this.config.lineCard = []
      this.chartData = []
      this.getReport(send)
    },
    getReport (send) {
      this.xhttp({
        url: '/reports/ads/hourly/admin',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.report = response.data.data
          if (this.response.report.list.length > 0) {
            for (let v in this.response.report.chart.data) {
              this.response.report.chart.data[v] = this.response.report.chart.data[v]
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData1))
            data.dataSource.categories[0].category = this.response.report.label
            let label = ['AIINFEED 수익', '매체 수익', 'CP 수익']
            data.dataSource.chart.syaxisname = '컨텐츠 뷰'
            for (let i = 0; i < 3; i++) {
              data.dataSource.dataset[i].seriesname = label[i]
              data.dataSource.dataset[i].data = this.response.report.chart.data[i + 1]
            }
            data.dataSource.dataset[3].seriesname = '컨텐츠 뷰'
            data.dataSource.dataset[3].data = this.response.report.chart.data[0]
            this.chartData = data
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
  },
  computed: {
    resultReport () {
      if (this.response.report) {
        return this.response.report
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
