<template>
  <v-container
          fill-height
          fluid
          grid-list-xl>
    <v-layout
            justify-center
            wrap>
      <v-flex
              xs10
              md4>
        <material-card
                title="SignUp"
                titleFont="bold"
                text="회원가입">
          <v-form v-model="vModel.valid" ref="form">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field
                          label="E-mail"
                          type="email"
                          class="purple-input"
                          v-model="vModel.data.email"
                          :rules="config.emailRules"
                          required/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                          label="Password"
                          type="password"
                          class="purple-input"
                          v-model="vModel.data.password"
                          :rules="config.passwordRules"
                          required/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                          label="Password Confirm"
                          type="password"
                          class="purple-input"
                          v-model="vModel.data.passwordConfirm"
                          :rules="config.passwordConfirmRules"
                          required/>
                </v-flex>
              </v-layout>
              <v-layout justify-space-between>
                <v-btn
                        class="mx-0"
                        color="info"
                        @click="beforePage">
                  취소
                </v-btn>
                <v-btn
                        :disabled="!vModel.valid"
                        class="mx-0 font-weight-light"
                        color="success"
                        @click="submitSignUp">
                  가입 완료
                </v-btn>
              </v-layout>
            </v-container>
          </v-form>
          <v-snackbar
                    color="error"
                    top="top"
                    v-model="vModel.snackbar"
                    dark>
            <v-icon dark right>mdi-cancel</v-icon>
            <div class="ml-2">{{vModel.errorMessage}}</div>
              <v-icon
                    size="16"
                    @click="vModel.snackbar = false">
                    mdi-close-circle
              </v-icon>
            </v-snackbar>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      response: {
        login: null
      },
      vModel: {
        valid: true,
        data: {
          email: '',
          password: '',
          passwordConfirm: ''
        },
        submitStatus: null,
        snackbar: false,
        errorMessage: null
      },
      config: {
        emailRules: [
          v => !!v || 'E-mail 을 입력하세요.',
          v => /.+@.+\..+/.test(v) || 'E-mail 주소를 입력하세요.'
        ],
        passwordRules: [
          v => !!v || 'Password 을 입력하세요.'
        ],
        passwordConfirmRules: [
          v => !!v || 'Password Confirm 을 입력하세요.',
          v => this.vModel.data.password === v || 'Password 와 같은 값을 입력하세요.'
        ]
      }
    }
  },
  methods: {
    ...mapActions(['xhttp']),
    submitSignUp () {
      if (this.$refs.form.validate()) {
        let send = this.vModel.data
        this.xhttp({
          url: '/auth/login',
          method: 'post',
          data: send
        }).then((response) => {
          if (response.status === 200) {
            this.response.login = response.data.data
            let item = {
              name: this.response.login.user.name,
              role: this.response.login.user.role
            }
            localStorage.setItem('cdpUser', JSON.stringify(item))
            this.$router.push('/Dashboard')
          }
        }).catch((error) => {
          console.log(JSON.parse(JSON.stringify(error)))
          this.snack('Email, Password 를 확인하세요.')
        })
      }
    },
    snack (val) {
      this.vModel.errorMessage = val
      this.vModel.snackbar = true
    },
    beforePage () {
      this.$router.go(-1)
    }
  }
}
</script>
