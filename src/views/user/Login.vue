<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section">
    <v-row justify="center">
      <base-material-card
        color="success"
        light
        max-width="100%"
        width="400"
        class="px-5 py-3"
      >
        <template v-slot:heading>
        <div class="text-center">
          <h1 class="display-2 font-weight-bold mb-2">
            Login
          </h1>
        </div>
      </template>
        <v-card-text class="text-center">
          <v-form
                  v-model="vModel.valid"
                  ref="form"
                  @submit.prevent="submitLogin">
            <v-text-field
              class="ml-4"
              ref="email"
              label="E-mail"
              type="email"
              color="secondary"
              prepend-icon="mdi-email"
              v-model="vModel.email"
              :rules="config.emailRules"
              required
            />
            <v-text-field
              class="ml-4"
              label="Password"
              type="password"
              color="secondary"
              prepend-icon="mdi-lock-outline"
              v-model="vModel.password"
              :rules="config.passwordRules"
              required
            />
            <v-btn
                    type="submit"
                    :disabled="!vModel.valid"
                    class="mt-5"
                    color="success">
              로그인
            </v-btn>
          </v-form>
        </v-card-text>
      </base-material-card>
    </v-row>
    <base-material-snackbar
      v-model="vModel.snackbar"
      :type="vModel.snackbarType"
      v-bind="{
        'top': true,
        'right': true
      }">
      <p style="width:300px;margin:0;">{{vModel.errorMessage}}</p>
    </base-material-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.logout()
  },
  mounted () {
    this.$refs.email.focus()
  },
  data () {
    return {
      response: {
        login: null
      },
      vModel: {
        valid: true,
        email: '',
        password: '',
        submitStatus: null,
        snackbar: false,
        snackbarType: '',
        errorMessage: null
      },
      config: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required'
        ]
      }
    }
  },
  methods: {
    ...mapActions(['xhttp', 'login', 'logout']),
    submitLogin () {
      if (this.$refs.form.validate()) {
        let send = {
          email: this.vModel.email,
          password: this.vModel.password
        }
        this.xhttp({
          url: '/auth/login',
          method: 'post',
          data: send
        }).then((response) => {
          if (response.status === 200) {
            this.response.login = response.data.data
            let item = {
              name: this.response.login.user.name,
              role: this.response.login.user.role,
              accessToken: this.response.login.authInfo.accessToken
            }
            this.login(item)
            this.$router.push({ name: 'Dashboard' })
          }
        }).catch((error) => {
          console.log(error)
          this.snack('warning', 'Email, Password 를 확인하세요.')
        })
      }
    },
    snack (type, val) {
      this.vModel.errorMessage = val
      this.vModel.snackbarType = type
      this.vModel.snackbar = true
    },
    findPassword () {
      this.$router.push({ 'name': 'FindPassword' })
    },
    SignUp () {
      this.$router.push({ 'name': 'SignUp' })
    }
  }
}
</script>
