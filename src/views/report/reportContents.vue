<template>
  <v-container
          id='reportContents'
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
              [ {{ datePicker.start.date }} - {{ datePicker.end.date }} ] 서비스 보고서
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center">
              <h2 style="padding: 20px 10px;">
                컨텐츠 뷰 리포트
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
            <template v-if="resultReport">
              <v-row justify="space-between">
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
              <v-divider class="mt-5 mb-5"></v-divider>
              <h2 style="padding: 20px 10px;">
                피드 뷰 리포트
              </h2>
              <v-row justify="space-between">
                <v-col cols="12" ref="chart1">
                  <fusioncharts
                          :type='chartData2.type'
                          :width='chartData2.width'
                          :height='chartData2.height'
                          :dataFormat='chartData2.dataFormat'
                          :dataSource='chartData2.dataSource'
                  ></fusioncharts>
                </v-col>
              </v-row>
              <v-divider class="mt-5 mb-5"></v-divider>
              <v-row>
                <v-col cols="12" class="pa-0 ma-0">
                  <v-data-table
                          :headers="config.headersReport"
                          :items="resultReport.list"
                          :items-per-page="resultReport.list.length"
                          item-key="key"
                          no-data-text="리스트가 없습니다."
                          hide-default-footer>
                    <template v-slot:item="{ item }">
                      <tr>
                        <td class="text-center" style="width:350px">
                          <template v-if="item.name === 'total'">합계</template>
                          <template v-else>{{item.name}}</template>
                        </td>
                        <td class="text-center">{{ numReplace(item.content_views) }}</td>
                        <td class="text-center">{{ numReplace(item.feed_views) }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
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
          { text: '매체명', value: 'name', align: 'center' },
          { text: '컨텐츠 뷰', value: 'content_view', align: 'center' },
          { text: '피드 뷰', value: 'feed_view', align: 'center' },
        ],
        lineCard: [],
        serviceCard: [],
        adsCard: [],
        contentCard: [],
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
              yaxisname: '컨텐츠 뷰',
              plottooltext: '$seriesName : $dataValue',
              theme: 'fusion'
            },
            categories: [
              {
                category: []
              }
            ],
            dataset: []
          }
        },
      },
      chartData: {},
      chartData2: {}
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
      let end = this.datePicker.end.date
      let startNum = Number(start.replace(/-/gi, ''))
      let endNum = Number(end.replace(/-/gi, ''))
      if (startNum > endNum) {
        this.snack('warning', '시작일을 종료일보다 앞날짜로 선택하세요.')
      } else {
        this.$router.push({ 'name': 'reportContents', query: { start: start, end: end } })
        this.reFresh()
      }
    },
    reFresh () {
      let role = JSON.parse(localStorage.getItem('cdpUser')).role
      if ([role].includes('admin')) {
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
        this.response.report = null
        this.chartData = {}
        this.chartData2 = {}
        this.getReport(send)
      } else {
        this.$router.push({ name: 'UserLogin' })
      }
    },
    getReport (send) {
      this.xhttp({
        url: '/reports/media',
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
            let label = this.response.report.chartText
            for (let i = 0; i < label.length; i++) {
              data.dataSource.dataset.push({ seriesname: '', data: [] })
              data.dataSource.dataset[i].seriesname = label[i]
              data.dataSource.dataset[i].data = this.response.report.chart.data[i]
            }
            this.chartData = data
            let data2 = JSON.parse(JSON.stringify(this.config.chartData1))
            data2.dataSource.categories[0].category = this.response.report.label
            data2.dataSource.chart.yaxisname = '피드 뷰'
            for (let i = 0; i < label.length; i++) {
              data2.dataSource.dataset.push({ seriesname: '', data: [] })
              data2.dataSource.dataset[i].seriesname = label[i]
              data2.dataSource.dataset[i].data = this.response.report.chart2.data[i]
            }
            this.chartData2 = data2
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
  #reportContents table tbody tr:first-child {
    background: #ddd;
  }
</style>
