<template>
  <v-container
          id="register"
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
              CP 등록
            </h1>
            <div class="subtitle-1 font-weight-regular">
              CP를 등록하세요.
            </div>
          </template>
          <v-card-text>
            <h2 style="padding: 20px 10px;">
              CP 정보 등록
            </h2>
            <v-form
                    v-model="vModel.valid"
                    ref="form">
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
                              label="CP명"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.name"
                              :rules="config.mediaNameRules"
                              :disabled="$route.name === 'partnersEdit'"
                              required />
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
                      이름
                    </v-col>
                    <v-col>
                      <v-text-field
                              label="이름"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.user.name"
                              :rules="config.nameRules"
                              :disabled="$route.name === 'partnersEdit'"
                              required />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" class="pt-0 pb-0">
                  <v-row
                          align="center">
                    <v-col cols="2" class="text-right grey--text">
                      이메일
                    </v-col>
                    <v-col>
                      <v-text-field
                              label="이메일"
                              type="email"
                              color="secondary"
                              ref="email"
                              v-model="vModel.data.user.email"
                              :rules="config.emailRules"
                              :disabled="$route.name === 'partnersEdit'"
                              @blur="emailCheck"
                              required />
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
                      비밀번호
                    </v-col>
                    <v-col>
                      <v-text-field
                              label="비밀번호"
                              type="password"
                              color="secondary"
                              v-model="vModel.data.user.password" />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" class="pt-0 pb-0">
                  <v-row
                          align="center">
                    <v-col cols="2" class="text-right grey--text">
                      비밀번호 확인
                    </v-col>
                    <v-col>
                      <v-text-field
                              label="비밀번호 확인"
                              type="password"
                              color="secondary"
                              v-model="vModel.data.user.passwordConfirmation" />
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
                      대표자
                    </v-col>
                    <v-col>
                      <v-text-field
                              label="대표자"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.company.ceo"
                              :rules="config.ceoRules"
                              required />
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
                              label="주소"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.company.address"
                              :rules="config.addressRules"
                              required />
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
                              label="사업자 등록번호"
                              type="text"
                              v-mask="businessNoMask"
                              color="secondary"
                              v-model="vModel.data.company.businessNo"
                              :rules="config.businessNoRules"
                              required />
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
                              label="전화번호"
                              type="text"
                              v-mask="managerPhoneMask"
                              color="secondary"
                              v-model="vModel.data.company.managerPhone"
                              :rules="config.managerPhoneRules"
                              required />
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
                              label="담당자명"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.company.managerName"
                              :rules="config.managerNameRules"
                              required />
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
                              label="담당자 이메일"
                              type="email"
                              color="secondary"
                              v-model="vModel.data.company.managerEmail"
                              :rules="config.managerEmailRules"
                              required />
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
                              label="은행명"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.company.bankName"
                              :rules="config.bankNameRules"
                              required />
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
                              label="계좌번호"
                              type="number"
                              color="secondary"
                              v-model="vModel.data.company.bankAccount"
                              :rules="config.bankAccountRules"
                              required />
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
                      세금계산서<br>발행 이메일
                    </v-col>
                    <v-col>
                      <v-text-field
                              label="세금계산서 발행 이메일"
                              type="email"
                              color="secondary"
                              v-model="vModel.data.company.taxEmail"
                              :rules="config.taxEmailRules"
                              required />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row justify="center" class="mt-5">
                <template v-if="this.$route.name === 'partnersRegister'">
                  <v-btn
                          :disabled="!vModel.valid"
                          class="mt-5"
                          color="success"
                          @click="submitRegister">
                    등록
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                          class="mt-5"
                          color="default"
                          @click="beforePage">
                    취소
                  </v-btn>
                  <v-btn
                        :disabled="!vModel.valid"
                        class="mt-5"
                        color="success"
                        @click="submitRegister">
                    수정
                  </v-btn>
                </template>
              </v-row>
            </v-form>
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
    this.refresh()
  },
  data () {
    return {
      response: {
        partners: null,
        register: null,
      },
      vModel: {
        valid: true,
        data: {
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
        errorMessage: null
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
        scriptRules: [ v => !!v || 'Script를 입력하세요.' ]
      }
    }
  },
  methods: {
    ...mapActions(['xhttp']),
    refresh () {
      let name = this.$route.name
      if (name === 'partnersEdit') {
        this.getPartners()
      }
    },
    beforePage () {
      this.$router.go(-1)
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
          this.vModel.data.mode = 'default'
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
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    submitRegister () {
      if (this.$refs.form.validate()) {
        let send = this.vModel.data
        this.xhttp({
          url: '/partners',
          method: 'post',
          data: send
        }).then((response) => {
          if (response.status === 201) {
            this.response.register = response.data.data
            this.snack('success', 'CP 등록이 완료되었습니다.')
            this.$router.push({ name: 'partnersList' })
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
    userEdit () {
      if (this.$refs.form.validate()) {
        let password = this.vModel.data.user.password
        if (password) {
          if (password.length > 6) {
            let passwordConfirm = this.vModel.data.user.passwordConfirmation
            if (passwordConfirm) {
              if (password === passwordConfirm) {
                this.putUser()
              } else {
                this.snack('warning', '입력한 비밀번호와 같은 값을 입력하세요.')
              }
            } else {
              this.snack('warning', '비밀번호 확인을 입력하세요.')
            }
          } else {
            this.snack('warning', '비밀번호 6자 이상 입력하세요.')
          }
        } else {
          this.putUser()
        }
      }
    },
    putUser () {
      let id = this.$route.params.partners_id
      let send = this.vModel.data
      this.xhttp({
        url: '/partners/' + id,
        method: 'put',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.edit = response.data.data
          this.snack('success', 'CP 정보 수정 완료되었습니다.')
          this.getPartners()
          this.vModel.userEdit = false
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    snack (type, val) {
      this.vModel.errorMessage = val
      this.vModel.snackbarType = type
      this.vModel.snackbar = true
    },
    emailCheck () {
      let v = this.vModel.data.user.email
      // 이메일 형식일때
      if (/.+@.+\..+/.test(v)) {
        this.postEmailValidate()
      }
    },
    postEmailValidate () {
      let send = {
        class: 'Partner\\PartnerStoreRequest',
        user: {
          email: this.vModel.data.user.email
        }
      }
      this.xhttp({
        url: '/validation',
        method: 'post',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.validation = response.data
          if (!this.response.validation.success) {
            if (this.response.validation.errors['user.email']) {
              this.snack('warning', '이미 사용중인 이메일 입니다.')
              this.$refs.email.focus()
            }
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
    }
  }
}
</script>
