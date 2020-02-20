<template>
  <v-container
          id="contentsView"
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
              {{resultContentsName}}
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center" class="ma-0">
              <h2 style="padding: 20px 10px;">
                {{resultContentsName}} 상세 정보
              </h2>
              <v-btn color="warning"
                     @click="exposure">
                {{ contentsToggleText }}
              </v-btn>
            </v-row>
            <v-row justify="space-around" style="margin-bottom: 15px;">
              <v-col cols="8" class="d-inline-flex pa-0">
                <v-text-field
                        label="제목"
                        type="text"
                        color="secondary"
                        v-model="vModel.data.title"
                        disabled />
              </v-col>
              <v-col cols="3" class="d-inline-flex pa-0">
                <v-text-field
                        label="등록자"
                        type="text"
                        color="secondary"
                        v-model="vModel.data.partner.name"
                        disabled />
              </v-col>
              <v-col cols="8" class="d-inline-flex pa-0">
                <v-row justify="space-around" style="margin-bottom: 15px;" class="ma-0">
                  <v-col class="d-inline-flex pa-0 mr-2">
                    <v-text-field
                            label="컨텐츠 종류"
                            type="text"
                            color="secondary"
                            v-model="vModel.data.type"
                            disabled />
                  </v-col>
                  <v-col class="d-inline-flex pa-0 ml-2">
                    <v-text-field
                            label="카테고리"
                            type="text"
                            color="secondary"
                            v-model="vModel.data.category"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3" class="d-inline-flex pa-0">
                <v-text-field
                        label="등록일자"
                        type="text"
                        color="secondary"
                        v-model="vModel.data.created"
                        disabled />
              </v-col>
            </v-row>
            <v-divider class="mt-5 mb-5" />
            <v-row justify="space-between" align="center" class="ma-0">
              <h2 style="padding: 20px 10px;">
                {{resultContentsName}} 리포트
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
              <v-col cols="12" v-if="resultChart" style="height:420px;">
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
                    icons-and-text>
              <v-tab
                      v-for="(tab, i) in config.barCard"
                      :key="i"
                      :disabled="[3, 5].includes(i)"
                      @click="barTapClick(i)"
                      style="height:80px">
                <h1 class="mb-0 font-weight-bold">
                  <template v-if="[0, 1, 2].includes(i)">{{numReplace(tab.value)}}원</template>
                  <template v-else-if="[3].includes(i)">{{numReplace(tab.value)}}%</template>
                  <template v-else>{{numReplace(tab.value)}}</template>
                </h1>
                <h3 class="mb-3 font-weight-bold">{{tab.title}}</h3>
              </v-tab>
            </base-material-tabs>
            <v-divider class="mt-5 mb-5" />
            <v-row justify="space-between" align="center" class="ma-0">
              <h2 style="padding: 20px 10px;">
                날짜별 리포트
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
                    <td class="text-right" style="width:170px">{{ numReplace(item.ads_revenue) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.ads_view) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.ads_click) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                    <td class="text-right" style="width:170px">{{ timeSet(item.video_seconds) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.vctr) }}%</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
                    <td class="text-right" style="width:175px">{{ numReplace(item.cpc) }}원</td>
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
                    <td class="text-right" style="width:170px">{{ numReplace(item.ads_revenue) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.ads_view) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.ads_click) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.ctr) }}%</td>
                    <td class="text-right" style="width:170px">{{ timeSet(item.video_seconds) }}</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.vctr) }}%</td>
                    <td class="text-right" style="width:170px">{{ numReplace(item.rpm) }}원</td>
                    <td class="text-right" style="width:175px">{{ numReplace(item.cpc) }}원</td>
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
    this.getContents()
    this.reFresh()
  },
  data () {
    return {
      response: {
        contents: null,
        exposure: null,
        contentChart: null,
        contentList: null,
      },
      vModel: {
        lineTap: 0,
        barTap: 0,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        fresh: false,
        data: {
          title: '',
          partner: { name: '' },
          category: '',
          created: ''
        },
        contentsToggle: null,
        valid: false,
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
        lineCard: [],
        barCard: [],
        headersReport: [
          { text: '날짜', value: 'date', align: 'center' },
          { text: '소진 광고비', value: 'ads_revenue', align: 'center' },
          { text: '노출', value: 'ads_view', align: 'center' },
          { text: '클릭', value: 'ads_click', align: 'center' },
          { text: 'CTR', value: 'ctr', align: 'center' },
          { text: '비디오 재생시간', value: 'video_seconds', align: 'center' },
          { text: 'vCTR', value: 'vctr', align: 'center' },
          { text: 'RPM', value: 'rpm', align: 'center' },
          { text: 'CPC', value: 'cpc', align: 'center' },
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
          },
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
        this.$router.push({ 'name': 'partnersContents', query: { start: start, end: end } })
        this.reFresh()
      }
    },
    excelDownload () {
      let anchor = document.createElement('a')
      document.body.appendChild(anchor)
      let file = this.$store.state.baseURL + '/reports/content/daily/cp-excel/' + this.$route.params.contents_id + '?sdate=' + this.datePicker.start.date + '&edate=' + this.datePicker.end.date
      let headers = new Headers()
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('cdpUser')).accessToken)
      fetch(file, { headers })
        .then(response => response.blob())
        .then(blobby => {
          let objectUrl = window.URL.createObjectURL(blobby)
          anchor.href = objectUrl
          anchor.download = this.datePicker.start.date + '_' + this.datePicker.end.date + '_ContentsReport_daily.xlsx'
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
      this.response.contentChart = null
      this.response.contentList = null
      this.getContentChart(send)
      this.getContentList(send)
    },
    barTapClick (v) {
      this.chartData.dataSource.dataset[0].seriesname = this.config.barCard[v].title
      this.chartData.dataSource.chart.yaxisname = this.config.barCard[v].title
      if (v === 4) {
        v = 3
      }
      this.chartData.dataSource.dataset[0].data = this.response.contentChart.data.data1[v]
    },
    lineTapClick (v) {
      this.chartData.dataSource.dataset[1].seriesname = this.config.lineCard[v].title
      this.chartData.dataSource.chart.syaxisname = this.config.lineCard[v].title
      this.chartData.dataSource.dataset[1].data = this.response.contentChart.data.data2[v]
    },
    getContentChart (send) {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/reports/content/daily/cp-chart/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentChart = response.data.data
          this.config.lineCard = this.response.contentChart.data.lineCard2
          this.config.barCard = this.response.contentChart.data.lineCard1
          if (this.response.contentChart.data.data1[0].length > 0) {
            for (let v in this.response.contentChart.data.data1) {
              this.response.contentChart.data.data1[v] = this.response.contentChart.data.data1[v].reverse()
            }
            for (let v in this.response.contentChart.data.data2) {
              this.response.contentChart.data.data2[v] = this.response.contentChart.data.data2[v].reverse()
            }
            let data = JSON.parse(JSON.stringify(this.config.chartData))
            data.dataSource.chart.yaxisname = this.config.barCard[0].title
            data.dataSource.chart.syaxisname = this.config.lineCard[0].title
            data.dataSource.categories[0].category = this.response.contentChart.data.label.reverse()
            data.dataSource.dataset[0].seriesname = this.config.barCard[0].title
            data.dataSource.dataset[0].data = this.response.contentChart.data.data1[0]
            data.dataSource.dataset[1].seriesname = this.config.lineCard[0].title
            data.dataSource.dataset[1].data = this.response.contentChart.data.data2[0]
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
    getContentList (send) {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/reports/content/daily/cp-list/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentList = response.data.data
          if (this.response.contentList.data.list.length > 0) {
            this.vModel.list = false
            this.response.contentList.data.list = this.response.contentList.data.list.reverse()
          }
          this.response.contentList.data.total[0].daily = '합계'
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    tableRowClick (v) {
      this.$router.push({ name: 'partnersContentsHourly', params: { partners_id: this.$route.params.partners_id, contents_id: this.$route.params.contents_id, date: v.daily } })
    },
    exposure () {
      let text = '게재'
      if (this.vModel.contentsToggle) {
        text = '차단'
      }
      if (confirm('컨텐츠를 ' + text + ' 하시겠습니까?')) {
        let id = this.$route.params.contents_id
        this.xhttp({
          url: '/contents/' + id + '/exposure',
          method: 'put',
          data: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.exposure = response.data.data
            this.vModel.contentsToggle = this.response.exposure.contents.isOn
          }
        }).catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            this.$router.push({ 'name': 'UserLogin' })
          } else {
            this.snack('warning', '관리자에게 문의 바랍니다.')
          }
        })
      }
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
          this.vModel.data = this.response.contents
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    }
  },
  computed: {
    resultContentsName () {
      if (this.response.contents) {
        return this.response.contents.title
      } else {
        return ''
      }
    },
    contentsToggleText () {
      if (this.response.contents) {
        if (this.vModel.contentsToggle) {
          return 'on'
        } else {
          return 'off'
        }
      } else {
        return ''
      }
    },
    resultReport () {
      if (this.response.reportTable) {
        return this.response.reportTable
      } else {
        return false
      }
    },
    resultChart () {
      if (this.response.contentChart) {
        return this.response.contentChart
      } else {
        return ''
      }
    },
    resultList () {
      if (this.response.contentList) {
        return this.response.contentList.data
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
  #contentsView .resultReport tbody tr:first-child {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
