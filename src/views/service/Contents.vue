<template>
  <v-container
    id="serviceContents"
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
            컨텐츠 리포트
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              컨텐츠 현황 리포트
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
                      @click="submitDate('date')">
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
                    @click="lineTapClick(i)"
                    style="height:130px">
              <h1 class="mb-0 font-weight-bold">매출 {{numReplace(tab.ads_revenue)}}원</h1>
              <h3 class="mb-1 font-weight-regular">페이지 뷰 {{numReplace(tab.content_view)}}</h3>
              <h3 class="mb-1 font-weight-regular">누적 등록 {{numReplace(tab.content_count)}}</h3>
              <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
            </v-tab>
          </base-material-tabs>
          <v-row>
            <v-col cols="12" style="height:400px;" v-if="resultChart">
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
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <v-row justify="start" align="center">
              <h2 style="padding: 20px 10px;">
                컨텐츠 순위
              </h2>
              <v-col cols="2" class="ml-5">
              <v-select
                      :items="config.selectOptions"
                      v-model="vModel.select"
                      color="secondary"
                      @change="submitDate('list')"/>
              </v-col>
            </v-row>
            <v-btn color="warning"
                   @click="pageContentsList">
              전체 목록
            </v-btn>
          </v-row>
          <v-col v-if="resultList" cols="12" class="pa-0 ma-0" style="border-top:1px solid rgba(0, 0, 0, 0.12)">
            <v-data-table
                    :headers="config.headersReport"
                    :items="resultList"
                    :items-per-page="resultList.length"
                    item-key="key"
                    no-data-text="리스트가 없습니다."
                    hide-default-header
                    hide-default-footer>
              <template v-slot:header="{ props: { headers } }">
                <thead>
                <tr>
                  <th class="text-center" style="width:80px;">{{headers[0].text}}</th>
                  <th class="text-center">{{headers[1].text}}</th>
                  <th class="text-center" style="width:170px">{{headers[2].text}}</th>
                  <th class="text-center" style="width:170px">{{headers[3].text}}</th>
                  <th class="text-center" style="width:170px">{{headers[4].text}}</th>
                  <th class="text-center" style="width:170px">{{headers[5].text}}</th>
                  <th class="text-center" style="width:170px">{{headers[6].text}}</th>
                </tr>
                </thead>
              </template>
              <template v-slot:item="{ item }">
                <tr></tr>
              </template>
            </v-data-table>
          </v-col>
          <v-col v-if="resultList.length > 0" cols="12" class="pa-0 ma-0" style="max-height:480px;overflow-y:auto;border-bottom:1px solid rgba(0, 0, 0, 0.12)">
            <v-data-table
                    :headers="config.headersReport"
                    :items="resultList"
                    :items-per-page="resultList.length"
                    item-key="key"
                    no-data-text=""
                    hide-default-header
                    hide-default-footer>
              <template v-slot:item="{ item, index }">
                <tr>
                  <td class="text-center" style="width:80px">{{index + 1}}</td>
                  <td class="text-left">{{item.title}}</td>
                  <td class="text-center" style="width:170px">{{item.cp}}</td>
                  <td class="text-right" style="width:170px">{{numReplace(item.view)}}</td>
                  <td class="text-right" style="width:170px">{{timeSet(item.avg_time)}}</td>
                  <td class="text-right" style="width:170px">{{numReplace(item.rpm)}}원</td>
                  <td class="text-center" style="width:170px">
                    <template v-if="item.created_at">
                        {{item.created_at.slice(0, 10)}}
                    </template>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
          <v-row justify="end" class="mt-5">
            <v-btn
                    color="secondary"
                    :disabled="resultMoreBtn"
                    @click="tableDataMore">
              더보기
            </v-btn>
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
    this.reFresh('date')
  },
  data () {
    return {
      response: {
        contentChart: null,
        contentList: null,
        totalList: []
      },
      vModel: {
        lineTap: 0,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        page: 1,
        select: ''
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
        selectOptions: [],
        headersReport: [
          { text: 'No', value: 'no', align: 'center' },
          { text: '제목', value: 'title', align: 'center' },
          { text: 'CP명', value: 'cp', align: 'center' },
          { text: '페이지 뷰', value: 'view', align: 'center' },
          { text: '평균 체류시간', value: 'avg_time', align: 'center' },
          { text: 'RPM', value: 'rpm', align: 'center' },
          { text: '등록일자', value: 'created_at', align: 'center' }
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
        chartData2: {
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
              { seriesname: '', data: [] },
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
      chartData1: {},
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
    pageContentsList () {
      this.$router.push({ 'name': 'contentsList' })
    },
    tableDataMore () {
      if (this.$route.query.start) {
        this.datePicker.start.date = this.$route.query.start
        this.datePicker.end.date = this.$route.query.end
      } else {
        this.datePicker.start.date = this.$moment(new Date()).add(-6, 'days').format('YYYY-MM-DD')
        this.datePicker.end.date = this.$moment(new Date()).format('YYYY-MM-DD')
      }
      this.vModel.page++
      let send = {
        sdate: this.datePicker.start.date,
        edate: this.datePicker.end.date,
        orderby: this.vModel.select,
        page: this.vModel.page
      }
      this.getContentList(send)
    },
    submitDate (val) {
      let start = this.datePicker.start.date
      let end = this.datePicker.end.date
      let startNum = Number(start.replace(/-/gi, ''))
      let endNum = Number(end.replace(/-/gi, ''))
      if (startNum > endNum) {
        this.snack('warning', '시작일을 종료일보다 앞날짜로 선택하세요.')
      } else {
        this.$router.push({ 'name': 'serviceContents', query: { start: start, end: end, orderby: this.vModel.select } })
        if (val === 'date') {
          this.reFresh('date')
        } else {
          this.reFresh('list')
        }
      }
    },
    reFresh (val) {
      if (this.$route.query.start) {
        this.datePicker.start.date = this.$route.query.start
        this.datePicker.end.date = this.$route.query.end
      } else {
        this.datePicker.start.date = this.$moment(new Date()).add(-6, 'days').format('YYYY-MM-DD')
        this.datePicker.end.date = this.$moment(new Date()).format('YYYY-MM-DD')
      }
      if (this.$route.query.orderby) {
        this.vModel.select = this.$route.query.orderby
      }
      let send = {
        sdate: this.datePicker.start.date,
        edate: this.datePicker.end.date,
        orderby: this.$route.query.orderby,
      }
      this.response.contentChart = null
      this.response.contentList = null
      this.chartData1 = []
      this.chartData2 = []
      this.getContentChart(send)
      this.getContentList(send, val)
    },
    lineTapClick (v) {
      if (v > 0) {
        this.chartData2.dataSource.dataset[0].seriesname = this.config.lineCard[v].title
        this.chartData2.dataSource.chart.yaxisname = this.config.lineCard[v].title
        this.chartData2.dataSource.dataset[0].data = this.response.contentChart.data.chart.revenue[v - 1]
        this.chartData2.dataSource.dataset[1].data = this.response.contentChart.data.chart.view[v]
      }
    },
    getContentChart (send) {
      this.xhttp({
        url: '/reports/content/category/chart',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentChart = response.data.data
          this.config.lineCard = this.response.contentChart.data.lineCard
          if (this.response.contentChart.data.chart.label.length > 1) {
            for (let v in this.response.contentChart.data.chart.revenue) {
              this.response.contentChart.data.chart.revenue[v] = this.response.contentChart.data.chart.revenue[v].reverse()
            }
            for (let v in this.response.contentChart.data.chart.view) {
              this.response.contentChart.data.chart.view[v] = this.response.contentChart.data.chart.view[v].reverse()
            }
            let data1 = JSON.parse(JSON.stringify(this.config.chartData1))
            data1.dataSource.categories[0].category = this.response.contentChart.data.chart.label.reverse()
            data1.dataSource.chart.yaxisname = '전체'
            data1.dataSource.chart.syaxisname = '페이지 뷰'
            for (let i = 0; i < 5; i++) {
              data1.dataSource.dataset[i].seriesname = this.response.contentChart.data.lineCard[i + 1].title
              data1.dataSource.dataset[i].data = this.response.contentChart.data.chart.revenue[i]
            }
            data1.dataSource.dataset[5].seriesname = '페이지 뷰'
            data1.dataSource.dataset[5].data = this.response.contentChart.data.chart.view[0]
            this.chartData1 = data1
            let data2 = JSON.parse(JSON.stringify(this.config.chartData2))
            data2.dataSource.chart.yaxisname = this.config.lineCard[1].title
            data2.dataSource.categories[0].category = this.response.contentChart.data.chart.label
            data2.dataSource.dataset[0].data = this.response.contentChart.data.chart.revenue[0]
            data2.dataSource.dataset[0].seriesname = this.config.lineCard[1].title
            data2.dataSource.dataset[1].data = this.response.contentChart.data.chart.view[1]
            this.chartData2 = data2
            this.vModel.lineTap = 0
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
    getContentList (send, val) {
      this.xhttp({
        url: '/reports/content/ranking/list',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentList = response.data.data
          if (this.config.selectOptions.length === 0) {
            this.config.selectOptions = this.response.contentList.data.filter
            if (!this.$route.query.orderby) {
              this.vModel.select = this.response.contentList.data.filter[0].value
            }
          }
          if (val) {
            this.response.totalList = []
          }
          if (this.response.contentList.data.list) {
            this.response.totalList = this.response.totalList.concat(this.response.contentList.data.list)
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
    resultChart () {
      if (this.response.contentChart) {
        return this.response.contentChart
      } else {
        return ''
      }
    },
    resultList () {
      if (this.response.totalList.length > 0) {
        return this.response.totalList
      } else {
        return []
      }
    },
    resultMoreBtn () {
      if (this.response.contentList) {
        return this.vModel.page === this.response.contentList.data.page.lastPage
      } else {
        return false
      }
    }
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
