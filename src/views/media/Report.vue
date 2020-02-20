<template>
  <v-container
    id="mediaView"
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
            {{mediaName}}
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center">
            <h2 style="padding: 20px 10px;">
              매체 정보
            </h2>

            <v-btn
                    color="secondary"
                    default
                    rounded
                    @click="vModel.userEdit = true">
              수정
            </v-btn>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="매체명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.name"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="정산율"
                      type="number"
                      color="secondary"
                      v-model="vModel.data.commission"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0 ">
              <v-text-field
                      label="이메일"
                      type="email"
                      color="secondary"
                      v-model="vModel.data.user.email"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="이름"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.user.name"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="대표자명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.ceo"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="주소"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.address"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="사업자 등록 번호"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.businessNo"
                      disabled />
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="담당자명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.managerName"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="담당자 이메일"
                      type="email"
                      color="secondary"
                      v-model="vModel.data.company.managerEmail"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="전화번호"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.managerPhone"
                      disabled />
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="세금계산서 발행 이메일"
                      type="email"
                      color="secondary"
                      v-model="vModel.data.company.taxEmail"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="은행명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.bankName"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="계좌번호"
                      type="number"
                      color="secondary"
                      v-model="vModel.data.company.bankAccount"
                      disabled />
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              서비스 리포트
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
          <v-divider class="mt-5 mb-5" />
          <h2 style="padding: 20px 10px;">
            카테고리 관리
          </h2>
          <v-row class="ma-0">
            <v-checkbox class="adultChk" label="성인용 컨텐츠 전체 차단" v-model="vModel.adultChk" @change="adultClick"></v-checkbox>
          </v-row>
            <div
                    class="d-inline-flex"
                    style="width:18%;margin-right:2%;"
                    v-for="val in config.acceptCategories"
                    :key="val.header.id">
              <v-data-table
                      style="width:100%"
                      :headers="val.header"
                      :items="val.selections"
                      :items-per-page="Number(val.selections.length)"
                      hide-default-footer
                      show-select
                      v-model="acceptCategoriesData">
              </v-data-table>
            </div>
            <v-row justify="center" class="mt-5">
              <v-btn
                      color="warning"
                      default
                      rounded
                      @click="beforePage">
                취소
              </v-btn>
              <v-btn
                      color="success"
                      default
                      rounded
                      @click="userEdit('category')">
                수정
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
    <v-dialog
          v-model="vModel.userEdit"
          max-width="1200"
  >
    <v-card class="text-center">
      <v-card-title class="font-weight-regular">
        매체 정보 수정
        <v-spacer />
        <v-icon
                aria-label="Close"
                @click="editCancel">
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text>
        <v-form
                v-model="vModel.valid"
                ref="form">
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="매체명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.name"
                      :rules="config.mediaNameRules"
                      :disabled="true"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="정산율"
                      type="number"
                      color="secondary"
                      v-model="vModel.data.commission"
                      :rules="config.commissionRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="이름"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.user.name"
                      :rules="config.nameRules"
                      required />
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0 ">
              <v-text-field
                      label="이메일"
                      type="email"
                      color="secondary"
                      ref="email"
                      :disabled="true"
                      v-model="vModel.data.user.email"
                      :rules="config.emailRules"
                      @blur="emailCheck"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="비밀번호"
                      type="password"
                      color="secondary"
                      v-model="vModel.data.user.password"
                      :rules="config.passwordRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="비밀번호 확인"
                      type="password"
                      color="secondary"
                      v-model="vModel.data.user.passwordConfirmation"
                      :rules="config.passwordConfirmationRules"
                      required />
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="대표자명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.ceo"
                      :rules="config.ceoRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="주소"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.address"
                      :rules="config.addressRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="사업자 등록 번호"
                      type="text"
                      v-mask="businessNoMask"
                      color="secondary"
                      v-model="vModel.data.company.businessNo"
                      :rules="config.businessNoRules"
                      required />
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="담당자명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.managerName"
                      :rules="config.managerNameRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="담당자 이메일"
                      type="email"
                      color="secondary"
                      v-model="vModel.data.company.managerEmail"
                      :rules="config.managerEmailRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="전화번호"
                      type="text"
                      v-mask="managerPhoneMask"
                      color="secondary"
                      v-model="vModel.data.company.managerPhone"
                      :rules="config.managerPhoneRules"
                      required />
            </v-col>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="세금계산서 발행 이메일"
                      type="email"
                      color="secondary"
                      v-model="vModel.data.company.taxEmail"
                      :rules="config.taxEmailRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="은행명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.company.bankName"
                      :rules="config.bankNameRules"
                      required />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="계좌번호"
                      type="number"
                      color="secondary"
                      v-model="vModel.data.company.bankAccount"
                      :rules="config.bankAccountRules"
                      required />
            </v-col>
          </v-row>
          <v-col cols="12" class="d-inline-flex pa-0">
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col
                      cols="1"
                      class="text-right grey--text">
                <span class="font-weight-regular">댓글 설정</span>
              </v-col>
              <v-col>
                <v-radio-group
                        row
                        v-model="vModel.data.allowComment">
                  <v-radio
                          label="허용"
                          :value="true"/>
                  <v-radio
                          label="차단"
                          :value="false"/>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
          <v-row justify="center" class="mt-5">
            <v-btn
                    color="warning"
                    default
                    rounded
                    @click="editCancel">
              취소
            </v-btn>
            <v-btn
                    :disabled="!vModel.valid"
                    color="success"
                    default
                    rounded
                    @click="userEdit()">
              수정
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
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
        edit: null,
        adult: [],
        mediaChart: null
      },
      vModel: {
        valid: true,
        data: {
          mode: 'default',
          name: '',
          allowComment: true,
          commission: null,
          user: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          },
          company: {
            ceo: '',
            address: '',
            businessNo: '',
            taxEmail: '',
            managerName: '',
            managerPhone: '',
            managerEmail: '',
            bankName: '',
            bankAccount: '',
          },
        },
        acceptCategories: [],
        submitStatus: null,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        emailChk: false,
        adultChk: false,
        reportTap: 0,
        userEdit: false,
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
        nameRules: [ v => !!v || '이름을 입력하세요.' ],
        emailRules: [
          v => !!v || '이메일을 입력하세요.',
          v => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력하세요.'
        ],
        passwordRules: [ v => !!v || '비밀번호를 입력하세요.',
          v => v.length > 5 || '비밀번호를 6자 이상 입력하세요.' ],
        passwordConfirmationRules: [
          v => !!v || '비밀번호를 재입력하세요.',
          v => this.vModel.data.user.password === v || '입력한 비밀번호와 같은 값을 입력하세요.' ],
        mediaNameRules: [ v => !!v || '매체명을 입력하세요.' ],
        managerNameRules: [ v => !!v || '담당자명를 입력하세요.' ],
        managerPhoneRules: [ v => !!v || '전화번호를 입력하세요.',
          v => v.length > 9 || '전화번호를 10자 이상 입력하세요.' ],
        managerEmailRules: [ v => !!v || '담당자 이메일을 입력하세요.',
          v => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력하세요.' ],
        ceoRules: [ v => !!v || '대표자명을 입력하세요.' ],
        addressRules: [ v => !!v || '주소를 입력하세요.' ],
        commissionRules: [ v => !!v || '정산율을 입력하세요.',
          v => Number(v) < 101 || '정산율은 100을 초과할 수 없습니다.' ],
        businessNoRules: [ v => !!v || '사업자 등록 번호를 입력하세요.' ],
        taxEmailRules: [ v => !!v || '세금계산서를 발행 받을 이메일을 입력하세요.',
          v => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력하세요.' ],
        bankNameRules: [ v => !!v || '은행명 입력하세요.' ],
        bankAccountRules: [ v => !!v || '계좌번호를 숫자만 입력하세요.',
          v => v.length > 9 || '계좌번호를 10자 이상 입력하세요.' ],
        urlRules: [ v => !!v || 'URL을 입력하세요.' ],
        scriptRules: [ v => !!v || 'Script를 입력하세요.' ],
        acceptCategories: [],
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
    emailCheck () {
      let v = this.vModel.data.user.email
      // 이메일 형식일때
      if (/.+@.+\..+/.test(v)) {
        // this.snack('warning', '이미 사용중인 이메일 입니다.')
        // this.$refs.email.focus()
      }
      this.vModel.emailChk = true
    },
    editCancel () {
      this.getMedia()
      this.vModel.userEdit = false
    },
    beforePage () {
      this.$router.go(-1)
    },
    adultClick (v) {
      if (v) {
        for (let i = 0; i < this.response.adult.length; i++) {
          this.acceptCategoriesData.push(this.response.adult[i])
        }
      } else {
        let adult = this.acceptCategoriesData.filter(function (n) {
          return n.isAdult !== true
        })
        this.acceptCategoriesData = adult
      }
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
    getCategories () {
      this.xhttp({
        url: '/categories',
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.category = response.data.data.categories
          this.categorySet()
          this.adultSet()
          this.categoryChecked()
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    categorySet () {
      this.config.acceptCategories = []
      for (let i = 0; i < this.response.category.length; i++) {
        let category = {}
        category.header = [this.response.category[i]]
        category.header[0].value = 'name'
        category.header[0].text = category.header[0].name
        category.selections = this.response.category[i].children
        this.config.acceptCategories.push(category)
      }
    },
    adultSet () {
      this.response.adult = []
      for (let i = 0; i < this.response.category.length; i++) {
        let adult = this.response.category[i].children.filter(function (n) {
          return n.isAdult === true
        })
        for (let j = 0; j < adult.length; j++) {
          this.response.adult.push(adult[j])
        }
      }
    },
    categoryChecked () {
      let arr = this.response.media.acceptCategoryes
      let result = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.response.category.length; j++) {
          let adult = this.response.category[j].children.filter(function (n) {
            return n.id === arr[i]
          })
          if (adult.length > 0) {
            result.push(adult[0])
          }
        }
      }
      this.acceptCategoriesData = result
    },
    userEdit (val) {
      let id = this.$route.params.media_id
      if (!val) {
        if (this.$refs.form.validate()) {
          let send = this.vModel.data
          send.commission = Number(send.commission)
          this.xhttp({
            url: '/media/' + id,
            method: 'put',
            data: send
          }).then((response) => {
            if (response.status === 200) {
              this.response.edit = response.data.data
              this.vModel.userEdit = false
              this.snack('success', '매체 정보 수정 완료되었습니다.')
              this.getMedia()
            }
          }).catch((error) => {
            if (error.message === 'Request failed with status code 401') {
              this.$router.push({ 'name': 'UserLogin' })
            } else {
              this.snack('warning', '관리자에게 문의 바랍니다.')
            }
          })
        }
      } else {
        let send = {
          mode: 'acceptCategories',
          acceptCategories: this.vModel.acceptCategories
        }
        this.xhttp({
          url: '/media/' + id,
          method: 'put',
          data: send
        }).then((response) => {
          if (response.status === 200) {
            this.response.edit = response.data.data
            this.snack('success', '카테고리 수정 완료되었습니다.')
            this.getMedia()
          }
        }).catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            this.$router.push({ 'name': 'UserLogin' })
          } else {
            this.snack('warning', '관리자에게 문의 바랍니다.')
          }
        })
      }
    }
  },
  computed: {
    managerPhoneMask () {
      let numberLength = this.vModel.data.company.managerPhone
      if (numberLength === 9) {
        return '####-####'
      } else if (numberLength === 11) {
        return '##-###-####'
      } else if (numberLength === 12) {
        return '###-###-####'
      } else {
        return '###-####-####'
      }
    },
    businessNoMask () {
      return '###-##-######'
    },
    mediaName () {
      if (this.response.media) {
        return this.response.media.name
      } else {
        return ''
      }
    },
    resultChart () {
      if (this.response.mediaChart) {
        return this.response.mediaChart
      } else {
        return ''
      }
    },
  },
  watch: {
    acceptCategoriesData: function (val) {
      if (val) {
        this.vModel.acceptCategories = val.map(function ($value) {
          return $value.id
        })
      }
    }
  }
}
</script>

<style>
  #mediaView .v-data-table__wrapper {
    border: 1px solid rgba(0, 0, 0, 0.12)
  }

  #mediaView .v-data-table-header {
    background: #ddd
  }
</style>
