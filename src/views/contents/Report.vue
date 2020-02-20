<template>
  <v-container
    id="contentsReport"
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
                컨텐츠 리포트
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
              <v-col cols="4">
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
            </v-col>
          </v-row>
            <template v-if="resultReport">
            <v-row>
                <v-col cols="2">
                    <v-card outlined class="pa-3 mt-0">
                        <v-card-text class="justify-center font-weight-regular text-center">
                            <h3>컨텐츠 뷰</h3><br>
                            <h1>{{numReplace(resultReport.card.total_views)}}</h1>
                        </v-card-text>
                    </v-card>
                    <v-card outlined class="pa-3">
                        <v-card-text class="justify-center font-weight-regular text-center">
                            <h3>뷰당 단가</h3><br>
                            <h1>{{toFixed(resultReport.card.total_content_revenue, resultReport.card.total_views)}}원</h1>
                        </v-card-text>
                    </v-card>
                    <v-card outlined class="pa-3">
                        <v-card-text class="justify-center font-weight-regular text-center">
                            <h3>수익</h3><br>
                            <h1>{{numReplace(resultReport.card.total_content_revenue)}}원</h1>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="10" ref="chart1">
                    <fusioncharts
                            :type='chartData.type'
                            :width='chartData.width'
                            :height='chartData.height'
                            :dataFormat='chartData.dataFormat'
                            :dataSource='chartData.dataSource'
                    ></fusioncharts>
                </v-col>
            </v-row>
            <v-divider class="mt-5 mb-5" />
            <v-row justify="space-between" align="center" class="ma-0">
                <h2 style="padding: 20px 10px;">
                    일별 정산 리포트
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
                            <td class="text-center" style="width:250px">{{item.daily}}</td>
                            <td class="text-center">{{ numReplace(item.views) }}</td>
                            <td class="text-center">{{ toFixed(item.content_revenue, item.views) }}원</td>
                            <td class="text-center">{{ numReplace(item.content_revenue) }}원</td>
                            <td class="text-center">{{ numReplace(item.media_revenue) }}원</td>
                            <td class="text-center">{{ numReplace(item.content_revenue) }}원</td>
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
        contents: null,
        contentChart: null,
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        valid: false,
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
          { text: '날짜', value: 'daily', align: 'center' },
          { text: '컨텐츠 뷰', value: 'views', align: 'center' },
          { text: '뷰당 단가', value: 'counter', align: 'center' },
          { text: 'AIINFEED 수익', value: 'revenue', align: 'center' },
          { text: '매체 수익', value: 'media_revenue', align: 'center' },
          { text: 'cp 수익', value: 'content_revenue', align: 'center' },
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
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
              drawcrossline: '1',
              yaxisname: '수익 (원)',
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
                seriesname: '페이지 뷰',
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
      let num = val + ''
      num = num.split('.')
      let result = num[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      if (num[1]) {
        result += '.' + num[1]
      }
      return result
    },
    toFixed (x, y) {
      if (x === '0' || x === 0 || y === '0' || y === 0) {
        return 0
      } else {
        let val = x / y
        return val.toFixed(2)
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
    beforePage () {
      this.$router.go(-1)
    },
    submitDate () {
      let start = this.datePicker.start.date
      let end = this.datePicker.end.date
      let startNum = Number(start.replace(/-/gi, ''))
      let endNum = Number(end.replace(/-/gi, ''))
      if (startNum > endNum) {
        this.snack('warning', '시작일을 종료일보다 앞날짜로 선택하세요.')
      } else {
        this.$router.replace({ 'name': 'contentsReport', query: { start: start, end: end, orderby: this.$route.query.orderby } })
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
      if (this.$route.query.orderby) {
        this.vModel.orderby = this.$route.query.orderby
        send.orderby = this.vModel.orderby
      }
      this.chartData = {}
      this.response.contentChart = null
      this.getContents()
      this.getContentChart(send)
    },
    getContentChart (send) {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/reports/contents/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentChart = response.data.data
          if (this.response.contentChart.list.length > 0) {
            for (let v in this.response.contentChart.chart.data) {
              this.response.contentChart.chart.data[v] = this.response.contentChart.chart.data[v]
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData))
            data.dataSource.categories[0].category = this.response.contentChart.label
            let label = ['수익', '컨텐츠 뷰']
            data.dataSource.chart.syaxisname = label[1]
            data.dataSource.dataset[0].seriesname = label[0]
            data.dataSource.dataset[0].data = this.response.contentChart.chart.data[1]
            data.dataSource.dataset[1].seriesname = label[1]
            data.dataSource.dataset[1].data = this.response.contentChart.chart.data[0]
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
    getContents () {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/contents/' + id,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.contents = response.data.data.contents
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
    contentsName () {
      if (this.response.contents) {
        return this.response.contents.title
      } else {
        return ''
      }
    },
    resultReport () {
      if (this.response.contentChart) {
        return this.response.contentChart
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
