<template>
  <v-container
    id="partnersView"
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
            {{ partnersName }} 정보
          </h1>
        </template>
        <v-card-text>
          <template v-if="response.routeName === 'partnersView'">
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    CP명
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.name"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    이메일
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="email"
                            color="secondary"
                            v-model="vModel.data.user.email"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    이름
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.user.name"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    대표자명
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.ceo"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    주소
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.address"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    사업자등록번호
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.businessNo"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    전화번호
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.managerPhone"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    담당자명
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.managerName"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    담당자 이메일
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="email"
                            color="secondary"
                            v-model="vModel.data.company.managerEmail"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    은행명
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.bankName"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    계좌번호
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="number"
                            color="secondary"
                            v-model="vModel.data.company.bankAccount"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    은행명
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="text"
                            color="secondary"
                            v-model="vModel.data.company.bankName"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="2" class="text-right grey--text">
                    세금계산서<br>발행 이메일
                  </v-col>
                  <v-col>
                    <v-text-field
                            type="email"
                            color="secondary"
                            v-model="vModel.data.company.taxEmail"
                            disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" style="margin-top:15px;">
              <v-btn
                      color="default"
                      default
                      rounded
                      @click="beforePage">
                취소
              </v-btn>
              <v-btn
                      color="secondary"
                      default
                      rounded
                      @click="partnersEdit">
                수정
              </v-btn>
            </v-row>
          <v-divider class="mt-5 mb-5" />
          </template>
          <template v-else>
            <v-row>
              <v-col cols="2" class="pb-0">
                <v-select
                        :items="config.partner"
                        v-model="vModel.partner"
                        label="CP 선택"
                        color="secondary"
                        :rules="config.partnerRules"
                        @change="changePartner()"
                        required />
              </v-col>
            </v-row>
          </template>
          <v-row justify="space-between" align="center" class="mb-3" v-if="this.response.routeName === 'partnersView'">
            <h2 style="padding: 20px 10px;">
              {{ partnersName }} 컨텐츠 리스트
            </h2>
          </v-row>
          <v-row v-else>
            <h2 style="padding: 20px 10px;">
              {{ partnersName }} 컨텐츠
            </h2>
          </v-row>
          <v-row justify="space-between">
            <template v-for="val in config.contentsCard">
              <v-card outlined style="width:16%;margin-top:0;" :key="val.title">
                <v-card-title class="justify-center font-weight-regular pa-2" style="color:#fff;background:#4CAF50">
                  {{val.title}}
                </v-card-title>
                <v-card-title class="justify-center font-weight-bold pa-3">
                  {{numReplace(val.value)}}
                </v-card-title>
              </v-card>
            </template>
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
        routeName: this.$route.name,
        partners: null,
        edit: null,
      },
      keyword: null,
      contentSelectedData: [],
      vModel: {
        page: 1,
        valid: true,
        partner: '',
        data: {
          mode: 'default',
          name: '',
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
          }
        },
        submitStatus: null,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        emailChk: false,
        userEdit: false,
        filter: 'all',
        contentSelected: [],
        contentSelectedIsOn: false,
        contentSelectedBtn: [ true, true ],
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
        mediaNameRules: [ v => !!v || 'CP명을 입력하세요.' ],
        managerNameRules: [ v => !!v || '담당자명를 입력하세요.' ],
        managerPhoneRules: [ v => !!v || '전화번호를 입력하세요.',
          v => v.length > 9 || '전화번호를 10자 이상 입력하세요.' ],
        managerEmailRules: [ v => !!v || '담당자 이메일을 입력하세요.',
          v => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력하세요.' ],
        ceoRules: [ v => !!v || '대표자명을 입력하세요.' ],
        addressRules: [ v => !!v || '주소를 입력하세요.' ],
        businessNoRules: [ v => !!v || '사업자 등록 번호를 입력하세요.' ],
        taxEmailRules: [ v => !!v || '세금계산서를 발행 받을 이메일을 입력하세요.',
          v => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력하세요.' ],
        bankNameRules: [ v => !!v || '은행명 입력하세요.' ],
        bankAccountRules: [ v => !!v || '계좌번호를 숫자만 입력하세요.',
          v => v.length > 9 || '계좌번호를 10자 이상 입력하세요.' ],
        urlRules: [ v => !!v || 'URL을 입력하세요.' ],
        scriptRules: [ v => !!v || 'Script를 입력하세요.' ],
        partnerRules: [ v => !!v || 'CP를 선택하세요.' ],
        headers: [
          { text: '상태', value: 'isOn', align: 'center' },
          { text: '제목', value: 'title', align: 'center' },
          { text: '카테고리', value: 'category', align: 'center' },
          { text: '타입', value: 'type', align: 'center' },
          { text: '작성일시', value: 'created', align: 'center' },
        ],
        contentsCard: [],
      },
    }
  },
  methods: {
    ...mapActions(['xhttp']),
    snack (type, val) {
      this.vModel.errorMessage = val
      this.vModel.snackbarType = type
      this.vModel.snackbar = true
    },
    beforePage () {
      this.$router.go(-1)
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
    reFresh () {
      this.getPartners()
    },
    partnersEdit () {
      this.$router.push({ name: 'partnersEdit', params: { partners_id: this.$route.params.partners_id } })
    },
    getPartners () {
      let id = this.$route.params.partners_id
      this.xhttp({
        url: '/partners/' + id,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.partners = response.data.data.partner
          this.vModel.data = this.response.partners
          this.vModel.data.user.password = ''
          this.vModel.data.user.passwordConfirmation = ''
          if (!this.vModel.data.company) {
            this.vModel.data.company = {
              ceo: '',
              address: '',
              businessNo: '',
              taxEmail: '',
              managerName: '',
              managerPhone: '',
              managerEmail: '',
              bankName: '',
              bankAccount: '',
            }
          }
          let contentsCounts = this.response.partners.contentsCounts
          this.config.contentsCard = [
            { title: '전체', value: this.numReplace(contentsCounts.totalCount) },
            { title: '뉴스', value: this.numReplace(contentsCounts.newsCount) },
            { title: '동영상', value: this.numReplace(contentsCounts.videoCount) },
            { title: '웹툰', value: this.numReplace(contentsCounts.toonCount) },
            { title: '포스트', value: this.numReplace(contentsCounts.postCount) },
            { title: '커뮤니티', value: this.numReplace(contentsCounts.ssulCount) },
          ]
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
    partnersName () {
      if (this.response.partners) {
        return this.response.partners.name
      } else {
        return ''
      }
    },
    resultContents () {
      if (this.response.contents) {
        return this.response.contents
      } else {
        return false
      }
    },
  },
  watch: {
    keyword: function (val) {
      if (val === '') {
        this.submitKeyword()
      }
    },
    contentSelectedData: function (val) {
      if (val) {
        this.contentSelectedFn(val)
      }
    }
  }
}
</script>
