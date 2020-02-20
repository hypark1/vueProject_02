<template>
  <v-container
          id="collections"
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
             컨텐츠 배열 관리
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between" align="center">
              <v-row justify="end" align="center" v-if="this.$route.name !== 'collections'">
                  <v-col cols="2" class="pa-0 mr-5">
                      <v-select
                              :items="config.mediaOptions"
                              v-model="vModel.media"
                              label="매체"
                              color="secondary"
                              @change="changeMedia()"/>
                  </v-col>
              </v-row>
            </v-row>
          <template v-if="resultContents">
              <v-row justify="space-around">
                  <v-col cols="5" class="pb-0">
                      <v-row class="mb-0" justify="space-between">
                          <v-col cols="5" class="pt-0 mr-5">
                              <form @submit.prevent="submitKeyword">
                                  <v-text-field
                                          v-model="keyword"
                                          append-icon="mdi-magnify"
                                          class="ml-auto pt-0"
                                          label="Search"
                                          color="secondary"
                                          style="margin-top:-6px"
                                          hide-details
                                          single-line />
                              </form>
                          </v-col>
                      </v-row>
                  </v-col>
                  <v-col cols="1" class="pb-0">
                  </v-col>
                  <v-col cols="6" class="pb-0">
                      <template v-if="resultCollections.length > 0 && resultContents">
                          <v-row class="mb-3">
                              <v-btn @click="upStep" small><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
                              <v-btn @click="downStep" small><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
                          </v-row>
                      </template>
                  </v-col>
              </v-row>
              <v-row justify="space-around">
                  <v-col cols="5">
                      <div style="max-height:540px;overflow-y: auto;border: 1px solid rgba(0, 0, 0, 0.12);" v-on:scroll="infiniteHandler">
                      <div ref="contentCols">
                    <v-data-table
                          v-model="vModel.listSelected1"
                          :headers="config.headers1"
                          :items="resultContents"
                          :items-per-page="resultContents.length"
                          item-key="num"
                          no-data-text="리스트가 없습니다."
                          @click:row="tableRowClick"
                          show-select
                          hide-default-footer>
                      <template v-slot:item.title="{ item }">
                        <p class="text-left ma-0">{{ item.title }}</p>
                      </template>
                        <template v-slot:item.category="{ item }">
                            <p style="width:70px;">{{ item.category }}</p>
                        </template>
                        <template v-slot:item.created="{ item }">
                            <p style="width:80px;">{{ item.created.slice(0, 10) }}</p>
                        </template>
                      <template v-slot:item.partner.name="{ item }">
                          <p style="width:65px;">{{ item.partner.name }}</p>
                      </template>
                    </v-data-table>
                  </div>
                      </div>
                  </v-col>
                  <v-col cols="1" class="text-center">
                      <v-btn
                              style="position: relative; top: 50%; margin-top: -20px !important;"
                              class="ma-1"
                              color="warning"
                              @click="collectionClick"
                              :disabled="this.vModel.listSelected1.length === 0"
                              fab
                              small>
                          <v-icon center>
                              mdi-arrow-right-bold
                          </v-icon>
                      </v-btn>
                  </v-col>
                  <v-col cols="6">
                      <template v-if="resultCollections.length > 0 && resultContents">
                          <v-row style="max-height:540px;overflow-y: auto;border: 1px solid rgba(0, 0, 0, 0.12);">
                              <v-col cols="12">
                                  <v-data-table
                                          v-model="vModel.listSelected2"
                                          :headers="config.headers2"
                                          :items="resultCollections"
                                          :items-per-page="resultCollections.length"
                                          item-key="num"
                                          no-data-text="리스트가 없습니다."
                                          @click:row="tableRowClick2"
                                          show-select
                                          hide-default-footer>
                                      <template v-slot:item.no="{ item }">
                                          {{ item.num + 1 }}
                                      </template>
                                      <template v-slot:item.title="{ item }">
                                          <p class="text-left ma-0">{{ item.title }}</p>
                                      </template>
                                      <template v-slot:item.category="{ item }">
                                          <p style="width:70px;">{{ item.category }}</p>
                                      </template>
                                      <template v-slot:item.created="{ item }">
                                          <p style="width:80px;">{{ item.created.slice(0, 10) }}</p>
                                      </template>
                                      <template v-slot:item.partner.name="{ item }">
                                          <p style="width:65px;">{{ item.partner.name }}</p>
                                      </template>
                                      <template v-slot:item.delete="{ item }">
                                          <v-btn small @click="listClose(item.key)"><v-icon>mdi-delete</v-icon></v-btn>
                                      </template>
                                  </v-data-table>
                              </v-col>
                          </v-row>
                          <v-row justify="center">
                              <v-btn
                                      class="mt-5"
                                      color="success"
                                      @click="submitSelected('save')">
                                  저장
                              </v-btn>
                              <v-btn
                                      class="mt-5"
                                      color="default"
                                      @click="cancelSelected">
                                  취소
                              </v-btn>
                          </v-row>
                      </template>
                      <template v-else>
                          <p>지정된 컨텐츠가 없습니다.</p>
                      </template>
                  </v-col>
            </v-row>
          </template>
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
    this.mediaList()
  },
  data () {
    return {
      page: 1,
      response: {
        contents: null,
        media: null,
        contentsList: null,
        collections: null,
        lastPage: 2
      },
      keyword: null,
      vModel: {
        listSelected1: [],
        listSelected2: [],
        resultListSelected: null,
        resultListChk: [],
        collections: [],
        media: ''
      },
      config: {
        mediaOptions: [],
        headers1: [
          { text: '제목', value: 'title', align: 'center' },
          { text: '카테고리', value: 'category', align: 'center' },
          { text: '등록일', value: 'created', align: 'center' },
          { text: '등록자', value: 'partner.name', align: 'center' },
          //  text: '본문', value: 'page', align: 'center' },
        ],
        headers2: [
          // { text: '', value: 'drag', align: 'center' },
          { text: 'No', value: 'no', align: 'center' },
          { text: '제목', value: 'title', align: 'center' },
          { text: '카테고리', value: 'category', align: 'center' },
          { text: '등록일', value: 'created', align: 'center' },
          { text: '등록자', value: 'partner.name', align: 'center' },
          { text: '제외', value: 'delete', align: 'center' },
        ]
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
    infiniteHandler (value) {
      let height = this.$refs.contentCols.clientHeight - 550
      let currentScrollPosition = value.srcElement.scrollTop
      if (height < currentScrollPosition && this.page < this.response.lastPage) {
        this.page++
        this.contentsList()
      }
    },
    tableRowClick (val) {
      let arr = this.vModel.listSelected1.filter(function ($value) {
        return $value.key === val.key
      })
      if (arr.length > 0) {
        let result = this.vModel.listSelected1.filter(function ($value) {
          return $value.key !== val.key
        })
        this.vModel.listSelected1 = result
      } else {
        this.vModel.listSelected1.push(val)
      }
    },
    tableRowClick2 (val) {
      let arr = this.vModel.listSelected2.filter(function ($value) {
        return $value.key === val.key
      })
      if (arr.length > 0) {
        let result = this.vModel.listSelected2.filter(function ($value) {
          return $value.key !== val.key
        })
        this.vModel.listSelected2 = result
      } else {
        this.vModel.listSelected2.push(val)
      }
    },
    upStep () {
      // 전체 값
      let arr = this.vModel.collections
      // 체크된 값
      let data = this.vModel.listSelected2
      this.vModel.listSelected2 = []
      // 체크된 값들의 번째 빼내기
      let indexArr = data.map(function ($value) {
        return $value.num
      })
      if (indexArr[0] > 0) {
        // 제일 처음 값이 0번째가 아닐 때
        // 해당 번째 값을 null로
        for (let i = 0; i < indexArr.length + 1; i++) {
          arr[indexArr[i]] = null
        }
        // 체크되지 않은 값들만 담기
        arr = arr.filter(n => n)
        // 체크한 값들이 빠져나간 곳의 뒤의 값들을 따로 담기
        let a = arr.splice(indexArr[0], arr.length - 1)
        // 체크한 값들 중 제일 먼저 있었던 자리보다 1개 앞에 값들 넣기
        let num = -1
        for (let i = 0; i < indexArr.length; i++) {
          arr.splice(indexArr[0] + num, 0, data[i])
          this.vModel.listSelected2.push(data[i])
          this.vModel.listSelected2[i].num = indexArr[0] + num
          num++
        }
        // 뒤의 값들을 배열 뒤에 붙이기
        arr = arr.concat(a)
        // 다시 순서값 부여
        for (let i = 0; i < arr.length; i++) {
          arr[i].num = i
        }
        this.vModel.collections = arr
      } else {
        this.vModel.listSelected2 = data
      }
    },
    downStep () {
      // 전체 값
      let arr = this.vModel.collections
      // 체크된 값
      let data = this.vModel.listSelected2
      this.vModel.listSelected2 = []
      // 체크된 값들의 번째 빼내기
      let indexArr = data.map(function ($value) {
        return $value.num
      })
      if (indexArr[indexArr.length - 1] < arr.length - 1) {
        // 제일 처음 값이 0번째가 아닐 때
        // 해당 번째 값을 null로
        for (let i = 0; i < indexArr.length + 1; i++) {
          arr[indexArr[i]] = null
        }
        // 체크한 값 뒤의 값들을 따로 담기
        let a = arr.splice(indexArr[indexArr.length - 1] + 2, this.vModel.collections.length - 1)
        // 체크되지 않은 값들만 담기
        arr = arr.filter(n => n)
        // 체크되지 않은 값들 수
        let length = arr.length
        // 체크되지 않은 값들 뒤에 체크했던 값 붙이기
        arr = arr.concat(data)
        // 체크값 v-model 재설정
        for (let i = 0; i < indexArr.length; i++) {
          this.vModel.listSelected2.push(data[i])
          this.vModel.listSelected2[i].num = length
          length++
        }
        // 배열에 체크 뒤에 있던 값 붙이기
        arr = arr.concat(a)
        // 다시 순서값 부여
        for (let i = 0; i < arr.length; i++) {
          arr[i].num = i
        }
        this.vModel.collections = arr
      } else {
        this.vModel.listSelected2 = data
      }
    },
    submitSelected (val) {
      let data = this.vModel.collections
      let key = data.map(function ($value) {
        return { key: $value.key }
      })
      let send = {
        contents: key
      }
      let url = '/collections/default'
      let method = 'put'
      if (this.vModel.media) {
        url = '/collections/' + this.vModel.media
        method = 'post'
      }
      this.xhttp({
        url: url,
        method: method,
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.vModel.listSelected2 = []
          if (val === 'close') {
            this.snack('success', '제외 완료되었습니다.')
            this.vModel.listSelected2 = []
            this.contentsList('refresh')
            this.collectionsList()
          } else {
            this.snack('success', '저장 완료되었습니다.')
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
    cancelSelected () {
      this.vModel.listSelected2 = []
      this.contentsList('refresh')
      this.collectionsList()
    },
    changeMedia () {
      this.keyword = ''
      this.$router.push({ name: 'feedCollections', query: { media: this.vModel.media } })
      this.contentsList('refresh')
      this.collectionsList()
    },
    collectionClick () {
      let chk = this.vModel.listSelected1
      for (let j = 0; j < chk.length; j++) {
        this.response.contents.contents = this.response.contents.contents.filter(function ($value) {
          return $value.key !== chk[j].key
        })
      }
      let num = this.vModel.collections.length
      for (let i = 0; i < chk.length; i++) {
        chk[i].num = num + i
      }
      this.vModel.collections = this.vModel.collections.concat(chk)
      this.vModel.listSelected1 = []
    },
    submitKeyword () {
      let send = {}
      if (this.keyword) {
        send.keyword = this.keyword
      }
      if (this.$route.name === 'collections') {
        this.$router.push({ name: 'collections', query: send })
      } else {
        if (this.vModel.media) {
          send.media = this.vModel.media
        }
        this.$router.push({ name: 'feedCollections', query: send })
      }
      this.contentsList('refresh')
    },
    numReplace (val) {
      let num = val + ''
      const result = num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return result
    },
    listClose (val) {
      this.vModel.collections = this.vModel.collections.filter(function ($value) {
        return $value.key !== val
      })
      this.submitSelected('close')
    },
    contentsList (val) {
      this.response.contents = null
      let send = {
        per: 20,
        page: this.page,
        orderby: 'created',
        direction: 'asc',
        on: 'all',
        collection: null
      }
      if (this.$route.query.media) {
        this.vModel.media = this.$route.query.media
        send.collection = this.$route.query.media
      }
      if (this.$route.query.keyword) {
        this.keyword = this.$route.query.keyword
        send.keyword = this.$route.query.keyword
        send.where = 'title'
      }
      if (this.$route.name === 'collections') {
        this.vModel.media = this.response.media[0].key
        send.collection = this.response.media[0].key
      }
      this.xhttp({
        url: '/contents',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.contents = response.data.data
          this.response.lastPage = this.response.contents.meta.lastPage
          for (let i = 0; i < this.response.contents.contents.length; i++) {
            this.response.contents.contents[i].num = i + (this.page * 100)
          }
          if (val === 'refresh') {
            this.response.contentsList = this.response.contents.contents
          } else {
            this.response.contentsList = this.response.contentsList.concat(this.response.contents.contents)
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
          this.config.mediaOptions.unshift({ value: '', text: '전체' })
          this.contentsList('refresh')
          this.collectionsList()
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    collectionsList () {
      this.response.collections = null
      this.vModel.collections = []
      let url = '/collections/default'
      if (this.$route.query.media) {
        this.vModel.media = this.$route.query.media
        url = '/collections/' + this.$route.query.media
      }
      if (this.$route.name === 'collections') {
        this.vModel.media = this.response.media[0].key
        url = '/collections/' + this.response.media[0].key
      }
      this.xhttp({
        url: url,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.collections = response.data.data
          if (this.response.collections.collection) {
            for (let i = 0; i < this.response.collections.collection.contents.length; i++) {
              this.response.collections.collection.contents[i].num = i
            }
            this.vModel.collections = this.response.collections.collection.contents
          }
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
    resultContents () {
      if (this.response.contentsList) {
        return this.response.contentsList
      } else {
        return false
      }
    },
    resultCollections () {
      if (this.vModel.collections.length > 0) {
        return this.vModel.collections
      } else {
        return false
      }
    },
    resultCollections2 () {
      if (this.vModel.resultListSelected) {
        return this.vModel.resultListSelected
      } else {
        return false
      }
    }
  },
  watch: {
    keyword: function (val) {
      if (val === '') {
        this.submitKeyword()
      }
    }
  }
}
</script>
