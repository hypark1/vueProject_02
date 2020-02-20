<template>
  <v-container
          id="outAds"
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
             피드사이 광고 관리 (외부)
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center">
              <v-col cols="2">
                <v-select
                        :items="config.mediaOptions"
                        v-model="vModel.media"
                        label="매체를 선택해주세요."
                        color="secondary"
                        @change="mediaChange()" />
              </v-col>
              <v-btn :disabled="!vModel.media"
                     color="warning"
                     @click="adsCreate">
                등록
              </v-btn>
            </v-row>
            <v-row justify="space-between">
              <template v-if="resultList">
              <template v-if="resultList.length > 0">
              <v-col cols="6">
                <draggable
                        class="list-group pl-0"
                        tag="ul"
                        v-model="response.list.data"
                        v-bind="config.dragOptions"
                        @start="drag = true"
                        @end="drag = false">
                  <transition-group type="transition">
                    <li class="list-group-item mb-2 pa-3"
                        style="list-style: none;background:#fff;border:1px solid #ddd;border-radius: 5px;cursor: move;"
                        v-for="(item) in response.list.data"
                        :key="item.key"
                        @click="listClick(item.key)">
                      {{item.title}}
                      <v-icon style="cursor:pointer;position:relative;z-index:5;" @click="listClose(item.key)">mdi-close-circle</v-icon>
                      <v-icon style="float:right;cursor:pointer;">mdi-chevron-right</v-icon>
                    </li>
                  </transition-group>
                </draggable>
                <div class="text-center mt-5">
                  <v-btn color="warning"
                         @click="listEdit">
                    순서 저장
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="6">
                <v-form
                        v-model="vModel.valid"
                        ref="form">
                  <v-text-field
                          label="제목"
                          type="text"
                          color="secondary"
                          v-model="vModel.title"
                          :rules="config.titleRules"
                          required />
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
                </v-form>
                <div class="text-center" v-if="resultList">
                  <v-btn :disabled="!vModel.valid"
                         color="warning"
                         v-if="resultList.length > 0"
                         @click="adsEdit()">
                    수정
                  </v-btn>
                  <v-btn :disabled="!vModel.valid"
                         color="warning"
                         v-if="resultList.length === 0"
                         @click="adsCreate()">
                    등록
                  </v-btn>
                </div>
              </v-col>
              </template>
                <v-col v-else>
                  <p>리스트가 없습니다.</p>
                </v-col>
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
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  created () {
    this.mediaList()
    this.adsList()
  },
  data () {
    return {
      response: {
        media: null,
        create: null,
        edit: null,
        listEdit: null,
        listDelete: null,
        list: [],
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        listOpen: null,
        valid: true,
        title: '',
        code: '',
      },
      config: {
        dragOptions: {
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        },
        mediaOptions: [],
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
    listClick (val) {
      let list = this.response.list.data.filter(function ($value) {
        return $value.key === val
      })
      this.vModel.listOpen = val
      this.vModel.title = list[0].title
      this.vModel.code = list[0].code
    },
    listClose (val) {
      if (this.response.list.data.length > 1) {
        let list = this.response.list.data.filter(function ($value) {
          return $value.key !== val
        })
        this.response.list.data = list
      }
      this.xhttp({
        url: '/' + this.vModel.media + '/outside/' + val,
        method: 'delete',
        data: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.listDelete = response.data.data
          this.adsList()
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    listEdit () {
      let data = this.response.list.data
      let key = data.map(function ($value) {
        return { key: $value.key }
      })
      let send = {
        outside: key
      }
      this.xhttp({
        url: '/' + this.vModel.media + '/outside-rank',
        method: 'put',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.listEdit = response.data.data
          this.snack('success', '순서 수정 완료되었습니다.')
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    adsEdit () {
      if (this.$refs.form.validate()) {
        if (confirm('수정 하시겠습니까?')) {
          let send = {
            title: this.vModel.title,
            code: this.vModel.code
          }
          this.xhttp({
            url: '/' + this.vModel.media + '/outside/' + this.vModel.listOpen,
            method: 'put',
            data: send
          }).then((response) => {
            if (response.status === 200) {
              this.response.listEdit = response.data.data
              this.snack('success', '수정 완료되었습니다.')
              this.adsList()
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
    adsCreate () {
      this.$router.push({ 'name': 'feedOutAdsRegister', params: { media_id: this.vModel.media } })
    },
    mediaChange () {
      this.vModel.title = ''
      this.vModel.code = ''
      this.response.list = null
      if (this.vModel.media) {
        this.$router.push({ 'name': 'feedOutAds', query: { media: this.vModel.media } })
        this.adsList()
      }
    },
    mediaList () {
      let send = {
        orderby: 'created',
        direction: 'desc'
      }
      this.xhttp({
        url: '/media',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.media = response.data.data.media
          this.config.mediaOptions = this.response.media.map(function ($value) {
            return { value: $value.key, text: $value.name }
          })
          this.config.mediaOptions.unshift({ value: '', text: '매체 선택' })
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    adsList () {
      if (this.$route.query.media) {
        this.vModel.media = this.$route.query.media
        this.xhttp({
          url: '/' + this.vModel.media + '/outside',
          method: 'get',
          params: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.list = response.data.data
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
  },
  computed: {
    resultList () {
      if (this.response.list) {
        return this.response.list.data
      } else {
        return false
      }
    },
  },
}
</script>

<style>
  #outAds .flip-list-move {
    transition: transform 0.5s;
  }
  #outAds .no-move {
    transition: transform 0s;
  }
  #outAds .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
</style>
