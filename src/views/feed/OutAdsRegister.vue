<template>
  <v-container
          id="outAdsRegister"
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
              피드사이 광고 등록 (외부)
            </h1>
          </template>
          <v-card-text>
            <v-form
                    v-model="vModel.valid"
                    ref="form">
            <v-row
                    class="text-no-wrap"
                    align="center">
              <v-col cols="12" class="pt-0 pb-0">
                <v-row
                        align="center">
                  <v-col cols="1" class="text-right grey--text">
                    제목
                  </v-col>
                  <v-col>
                    <v-text-field
                            label="제목"
                            type="text"
                            color="secondary"
                            v-model="vModel.title"
                            :rules="config.titleRules"
                            required />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
              <v-row
                      class="text-no-wrap"
                      align="center">
                <v-col cols="12" class="pt-0 pb-0">
                  <v-row
                          align="center">
                    <v-col cols="1" class="text-right grey--text">
                      코드
                    </v-col>
                    <v-col>
                      <v-textarea
                              label="코드"
                              color="secondary"
                              auto-grow
                              rows="1"
                              row-height="5"
                              no-resize
                              v-model="vModel.code"
                              :rules="config.codeRules"
                              required />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <v-row justify="center">
                <v-btn color="default"
                       @click="beforePage()">
                  취소
                </v-btn>
                <v-btn :disabled="!vModel.valid"
                       color="warning"
                       @click="adsCreate()">
                  등록
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
  },
  data () {
    return {
      response: {
        media: null,
        create: null,
        edit: null,
        listEdit: null,
        list: [],
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        valid: true,
        title: '',
        code: '',
      },
      config: {
        titleRules: [ v => !!v || '제목을 입력하세요.' ],
        codeRules: [ v => !!v || '코드를 입력하세요.' ],
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
    beforePage () {
      this.$router.go(-1)
    },
    adsCreate () {
      if (this.$refs.form.validate()) {
        if (confirm('등록 하시겠습니까?')) {
          let send = {
            title: this.vModel.title,
            code: this.vModel.code
          }
          this.xhttp({
            url: '/' + this.$route.params.media_id + '/outside',
            method: 'post',
            data: send
          }).then((response) => {
            if (response.status === 200) {
              this.response.create = response.data.data
              this.snack('success', '등록 완료되었습니다.')
              this.$router.push({ 'name': 'feedOutAds', query: { 'media': this.$route.params.media_id } })
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
  },
  computed: {
  },
}
</script>
