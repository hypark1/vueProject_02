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
          </v-row>
          <v-row
                  class="text-no-wrap"
                  align="center">
            <v-col cols="6" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="2" class="text-right grey--text">
                  매체명
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.kor_name"
                          disabled />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="2" class="text-right grey--text">
                  호스트명
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
                  미디어 번호
                </v-col>
                <v-col>
                  <v-text-field
                          type="number"
                          color="secondary"
                          v-model="vModel.data.site3_no"
                          disabled />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="2" class="text-right grey--text">
                  정산율
                </v-col>
                <v-col>
                  <v-text-field
                          type="number"
                          color="secondary"
                          v-model="vModel.data.commission"
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
          <h2 style="padding: 20px 10px;">
            차단된 카테고리
          </h2>
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
                    no-data-text="카테고리가 없습니다."
                    hide-default-footer>
            </v-data-table>
          </div>
          <v-row justify="center" class="mt-5">
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
                    @click="mediaEdit">
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
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.getMedia()
  },
  data () {
    return {
      response: {
        media: null,
        edit: null,
        adult: [],
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
      },
      acceptCategoriesData: [],
      config: {
        acceptCategories: [],
      }
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
    beforePage () {
      this.$router.go(-1)
    },
    mediaEdit () {
      this.$router.push({ 'name': 'mediaEdit', params: { media_id: this.$route.params.media_id } })
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
      let categoryArr = []
      for (let i = 0; i < this.response.category.length; i++) {
        let category = {}
        category.header = [this.response.category[i]]
        category.header[0].value = 'name'
        category.header[0].text = category.header[0].name
        let selections = this.response.category[i].children
        let result
        for (let j = 0; j < this.acceptCategoriesData.length; j++) {
          let a = this.acceptCategoriesData[j]
          result = selections.filter(function ($value) {
            return $value.id === a.id
          })
          if (result.length > 0) {
            categoryArr[i] = result
          }
        }
        if (!categoryArr[i]) {
          categoryArr[i] = []
        }
        category.selections = categoryArr[i]
        this.config.acceptCategories.push(category)
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
      this.categorySet()
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
    mediaName () {
      if (this.response.media) {
        return this.response.media.kor_name
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
