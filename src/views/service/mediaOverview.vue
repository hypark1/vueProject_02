<template>
  <v-container
          id="mediaOverview"
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
                      style="height:80px">
                <h1 class="mb-0 font-weight-bold">
                  <template v-if="[2, 3].includes(i)">{{numReplace(tab.value)}}%</template>
                  <template v-else-if="[4, 5].includes(i)">{{numReplace(tab.value)}}원</template>
                  <template v-else>{{numReplace(tab.value)}}</template>
                </h1>
                <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
              </v-tab>
            </base-material-tabs>
            <v-row>
              <v-col cols="12" style="height:420px;" v-if="resultChart">
                <fusioncharts
                        :type='chartData.type'
                        :width='chartData.width'
                        :height='chartData.height'
                        :dataFormat='chartData.dataFormat'
                        :dataSource='chartData.dataSource'
                ></fusioncharts>
              </v-col>
            </v-row>
            <base-material-tabs
                    v-model="vModel.barTap"
                    background-color="transparent"
                    fixed-tabs
                    color="warning"
                    icons-and-text style="height:80px">
              <v-tab
                      v-for="(tab, i) in config.barCard"
                      :key="i"
                      :disabled="[3, 5].includes(i)"
                      @click="barTapClick(i)"
                      style="height:80px;">
                <h1 class="mb-0 font-weight-bold">
                  <template v-if="[0, 1, 2].includes(i)">{{numReplace(tab.value)}}원</template>
                  <template v-else-if="[3].includes(i)">{{numReplace(tab.value)}}%</template>
                  <template v-else>{{numReplace(tab.value)}}</template>
                </h1>
                <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
              </v-tab>
            </base-material-tabs>
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
    this.getMedia()
    this.reFresh()
  },
  data () {
    return {
      response: {
        media: null,
        mediaChart: null
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        reportTap: 0,
        lineTap: 0,
        barTap: 0,
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
        barCard: [],
        chartData: {
          type: 'stackedcolumn2dlinedy',
          width: '100%',
          height: '400',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: '',
              subcaption: '',
              yaxisname: '',
              syaxisname: '페이지 뷰',
              plottooltext: '$seriesName : $dataValue',
              showhovereffect: '1',
              setadaptiveymin: '1',
              formatnumberscale: '0',
              drawcrossline: '1',
              theme: 'fusion'
            },
            categories: [ { category: [] } ],
            dataset: [
              { seriesname: '매출', data: [] },
              {
                seriesname: '페이지 뷰',
                parentyaxis: 'S',
                plottooltext: '$seriesName : $dataValue',
                renderas: 'line',
                data: []
              }
            ]
          }
        }
      },
      chartData: {},
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
        this.$router.push({ 'name': 'mediaView', query: { start: start, end: end } })
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
      this.getMediaChart(send)
    },
    barTapClick (v) {
      this.chartData.dataSource.dataset[0].seriesname = this.config.barCard[v].title
      this.chartData.dataSource.chart.yaxisname = this.config.barCard[v].title
      if (v === 4) {
        v = 3
      }
      this.chartData.dataSource.dataset[0].data = this.response.mediaChart.data.data1[v]
    },
    lineTapClick (v) {
      this.chartData.dataSource.dataset[1].seriesname = this.config.lineCard[v].title
      this.chartData.dataSource.chart.syaxisname = this.config.lineCard[v].title
      this.chartData.dataSource.dataset[1].data = this.response.mediaChart.data.data2[v]
    },
    getMediaChart (send) {
      let id = this.$route.params.media_id
      this.xhttp({
        url: '/reports/media/service/chart/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.mediaChart = response.data.data
          this.config.lineCard = this.response.mediaChart.data.lineCard2
          this.config.barCard = this.response.mediaChart.data.lineCard1
          if (this.response.mediaChart.data.data1[0].length > 0) {
            for (let v in this.response.mediaChart.data.data1) {
              this.response.mediaChart.data.data1[v] = this.response.mediaChart.data.data1[v].reverse()
            }
            for (let v in this.response.mediaChart.data.data2) {
              this.response.mediaChart.data.data2[v] = this.response.mediaChart.data.data2[v].reverse()
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData))
            data.dataSource.chart.yaxisname = this.config.barCard[0].title
            data.dataSource.chart.syaxisname = this.config.lineCard[0].title
            data.dataSource.categories[0].category = this.response.mediaChart.data.label.reverse()
            data.dataSource.dataset[0].seriesname = this.config.barCard[0].title
            data.dataSource.dataset[0].data = this.response.mediaChart.data.data1[0]
            data.dataSource.dataset[1].seriesname = this.config.lineCard[0].title
            data.dataSource.dataset[1].data = this.response.mediaChart.data.data2[0]
            this.chartData = data
            this.vModel.lineTap = 0
            this.vModel.barTap = 0
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
    beforePage () {
      this.$router.go(-1)
    },
    getMedia () {
      let id = this.$route.params.media_id
      this.xhttp({
        url: '/media/' + id,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.media = response.data.data.media
          this.vModel.data = this.response.media
          this.vModel.data.mode = 'default'
          this.vModel.data.user.password = ''
          this.vModel.data.user.passwordConfirmation = ''
          this.getCategories()
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
      if (this.response.mediaChart) {
        return this.response.mediaChart
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
  #mediaOverview table tbody tr:first-child { background: #ddd; }
</style>
