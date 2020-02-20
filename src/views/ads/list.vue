<template>
  <v-container
          id="inAds"
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
             광고 관리
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center" class="ml-1">
              <v-col cols="4">
                <v-row>
                  <v-col cols="6">
                  <v-select
                          :items="config.mediaOptions"
                          v-model="vModel.media"
                          label="매체를 선택하세요."
                          color="secondary"
                          @change="selectChange()" />
                  </v-col>
                  <v-col cols="6">
                  <v-select
                          :items="config.typeOptions"
                          v-model="vModel.adsType"
                          label="광고 타입을 선택하세요."
                          color="secondary"
                          @change="selectChange()" />
                  </v-col>
                </v-row>
              </v-col>
              <v-btn :disabled="!vModel.media || !vModel.adsType"
                     color="warning"
                     @click="createAds">
                신규 등록
              </v-btn>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <v-data-table
                        :headers="config.headers"
                        :items="resultList"
                        :items-per-page="resultList.length"
                        item-key="key"
                        no-data-text="리스트가 없습니다."
                        @click:row="listClick"
                        hide-default-footer>
                  <template v-slot:body="{ items }">
                    <draggable v-model="response.list.data" tag="tbody"
                               v-bind="config.dragOptions"
                               @start="drag = true"
                               @end="drag = false">
                      <tr @click="listClick(item.key)" v-for="(item,index) in response.list.data" :key="item.key" style="cursor: move;background: #fff;">
                        <td style="text-align: center;">{{ index + 1 }}</td>
                        <td style="text-align: center;">{{item.title}}</td>
                        <td style="text-align: center;width:130px;">
                          <v-btn small @click="listClose(item.key)"><v-icon>mdi-delete</v-icon></v-btn>
                        </td>
                        <td style="text-align: center;">
                          <v-btn color="success" small><v-icon>mdi-chevron-right</v-icon></v-btn>
                        </td>
                      </tr>
                    </draggable>
                  </template>
                </v-data-table>
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
                          :disabled="!vModel.type"
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
                          :disabled="!vModel.type"
                          required />
                </v-form>
                <div class="text-center" v-if="resultList">
                  <template v-if="vModel.type === 'edit' && resultList.length > 0">
                    <v-btn :disabled="!vModel.valid"
                           color="success"
                           @click="adsEdit()">
                      수정
                    </v-btn>
                  </template>
                  <template v-else-if="vModel.type === 'create'">
                    <v-btn :disabled="!vModel.valid"
                           color="success"
                           @click="adsCreate()">
                      등록
                    </v-btn>
                  </template>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-btn :disabled="!response.list.data.length > 0"
                     color="secondary"
                     @click="listEdit">
                순서 저장
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
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  created () {
    this.refresh()
  },
  data () {
    return {
      response: {
        adsType: null,
        media: null,
        list: { data: [] },
        listEdit: null,
        listDelete: null,
        create: null,
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        valid: true,
        listSelected: null,
        media: null,
        adsType: null,
        title: '',
        code: '',
        listOpen: '',
        type: null
      },
      config: {
        typeOptions: [],
        mediaOptions: [],
        dragOptions: {
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        },
        headers: [
          { text: 'No', value: 'no', align: 'center' },
          { text: '제목', value: 'title', align: 'center' },
          { text: '삭제', value: 'hidden', align: 'center' },
          { text: '수정', value: 'edit', align: 'center' },
        ],
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
    createAds () {
      this.vModel.type = 'create'
      this.vModel.title = null
      this.vModel.code = null
    },
    selectChange () {
      this.response.list = { data: [] }
      if (this.vModel.media && this.vModel.adsType) {
        this.$router.replace({ 'name': 'adsList', query: { media: this.vModel.media, type: this.vModel.adsType } })
        this.adsList()
      }
    },
    listClick (val) {
      let list = this.response.list.data.filter(function ($value) {
        return $value.key === val
      })
      this.vModel.listOpen = val
      this.vModel.title = list[0].title
      this.vModel.code = list[0].code
      this.vModel.type = 'edit'
    },
    refresh () {
      this.mediaList()
      this.adsType()
      if (this.$route.query.media) {
        this.vModel.media = this.$route.query.media
        this.vModel.adsType = Number(this.$route.query.type)
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
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    adsType () {
      this.xhttp({
        url: '/ads/type',
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.adsType = response.data.data
          this.config.typeOptions = this.response.adsType.map(function ($value) {
            return { value: $value.id, text: $value.name }
          })
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
      this.xhttp({
        url: '/' + this.vModel.media + '/ads/' + this.vModel.adsType,
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
    },
    listEdit () {
      if (this.response.list.data.length > 0) {
        let data = this.response.list.data
        let key = data.map(function ($value) {
          return { key: $value.key }
        })
        let send = {
          ads: key
        }
        this.xhttp({
          url: '/' + this.vModel.media + '/ads/rank',
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
      }
    },
    listClose (val) {
      if (confirm('삭제 하시겠습니까?')) {
        this.xhttp({
          url: this.vModel.media + '/ads/' + val,
          method: 'delete',
          data: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.listDelete = response.data.data
            this.snack('success', '삭제 완료되었습니다.')
            this.vModel.title = null
            this.vModel.code = null
            this.vModel.type = null
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
    },
    adsEdit () {
      if (this.$refs.form.validate()) {
        if (confirm('수정 하시겠습니까?')) {
          let send = {
            title: this.vModel.title,
            code: this.vModel.code,
            type: this.vModel.adsType
          }
          this.xhttp({
            url: '/' + this.vModel.media + '/ads/' + this.vModel.listOpen,
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
      if (this.$refs.form.validate()) {
        if (confirm('등록 하시겠습니까?')) {
          let send = {
            title: this.vModel.title,
            code: this.vModel.code,
            type: this.vModel.adsType
          }
          this.xhttp({
            url: '/' + this.vModel.media + '/ads',
            method: 'post',
            data: send
          }).then((response) => {
            if (response.status === 200) {
              this.response.create = response.data.data
              this.snack('success', '등록 완료되었습니다.')
              this.vModel.title = ''
              this.vModel.code = ''
              this.vModel.type = null
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
  textarea { resize: none; min-height: 100px;}
  #inAds .flip-list-move {
    transition: transform 0.5s;
  }
  #inAds .no-move {
    transition: transform 0s;
  }
  #inAds .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  #inAds table .tableTitle p {
    cursor: pointer;
  }
  #inAds table .tableTitle p:hover {
    text-decoration: underline;
  }
</style>
