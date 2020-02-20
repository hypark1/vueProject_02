<template>
  <v-container
    id="contentsView"
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
            {{contentsName}}
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <v-col class="pl-0">
              <h2 style="padding: 20px 10px;" class="d-inline-block">
                {{contentsName}} 상세 정보
              </h2>
              <v-btn :color="this.vModel.contentsToggle ? 'warning' : 'default'"
                     @click="exposure">
                {{ contentsToggleText }}
              </v-btn>
            </v-col>
            <v-btn color="success"
                   @click="contentReport">
              컨텐츠 리포트
            </v-btn>
            <v-btn color="primary"
                   @click="contentDelete">
              삭제
            </v-btn>
          </v-row>
          <v-row
                  class="text-no-wrap"
                  align="center">
            <v-col cols="6" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="2" class="text-right grey--text">
                  컨텐츠 종류
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.type"
                          disabled/>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="2" class="text-right grey--text">
                  카테고리
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.category"
                          disabled/>
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
                  글쓴이
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.writer"
                          disabled/>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="2" class="text-right grey--text">
                  등록일자
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.created"
                          disabled/>
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
                  제목
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.title"
                          disabled/>
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
                  요약 내용
                </v-col>
                <v-col>
                  <v-textarea
                          color="secondary"
                          auto-grow
                          rows="1"
                          row-height="5"
                          no-resize
                          v-model="vModel.data.sub_title"
                          disabled />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
                  class="text-no-wrap"
                  align="center" v-if="vModel.data.type === 'Video'">
            <v-col cols="12" class="pt-0 pb-0">
              <v-row
                      align="center">
                <v-col cols="1" class="text-right grey--text">
                  URL
                </v-col>
                <v-col>
                  <v-text-field
                          type="text"
                          color="secondary"
                          v-model="vModel.data.contents"
                          disabled />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
                  class="text-no-wrap" v-if="vModel.data.thumbnail_url">
            <v-col cols="12" class="pt-0 pb-0">
              <v-row>
                <v-col cols="1" class="text-right grey--text">
                  썸네일 이미지
                </v-col>
                <v-col>
                  <img :src="vModel.data.thumbnail_url" style="max-width:250px;max-height:250px;display: inline-block;border:1px solid #ddd;"/>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5" v-if="vModel.data.type !== 'Video'" />
          <v-row v-if="vModel.data.type !== 'Video'">
            <v-col>
              <v-btn color="secondary"
                     @click="mobileOpen()">
                모바일 미리보기
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="pa-3 pt-0" v-if="vModel.data.type !== 'Video'">
            <v-col cols="12" style="border:1px solid #ddd;max-height:500px;overflow-y: auto;overflow-x:hidden;" class="pa-5">
              <div class="contents_view" v-html="vModel.data.contents" />
            </v-col>
          </v-row>
          <v-row justify="center"
                 class="mt-5">
            <v-btn
                    color="default"
                    @click="beforePage()">
              취소
            </v-btn>
            <v-btn
                    color="success"
                    @click="contentEdit()">
              수정
            </v-btn>
          </v-row>
        </v-card-text>
      </base-material-card>
      </v-col>
    </v-row>
    <div class="mobile-back" v-if="vModel.mobileToggle">
      <div class="mobile-wrap">
        <div class="mobile-style">
          <div class="mobile-com">
            <div class="mobile-close" @click="mobileClose">
              <v-icon color="#fff" style="margin-top:9px;">
                mdi-close
              </v-icon></div>
            <div class="webfeed-container">
              <div class="webfeed-header">
                Feed Example
              </div>
              <v-divider class="mt-3 mb-3" />
              <div class="webfeed-block">
                <!--<v-row justify="space-around">
                  <div class="webfeed-list">
                    <div class="webfeed-thumbnail"><img :src="vModel.data.thumbnail_url" /></div>
                    <div class="webfeed-title">{{vModel.data.title}}</div>
                  </div>
                  <div class="webfeed-list">
                    <div class="webfeed-thumbnail"><img :src="vModel.data.thumbnail_url" /></div>
                    <div class="webfeed-title">{{vModel.data.title}}</div>
                  </div>
                </v-row>-->
                <div class="webfeed-box">
                  <div class="webfeed-box-title">
                    {{vModel.data.title}}
                  </div>
                  <div class="webfeed-mid" v-html="vModel.data.contents">
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    this.getContents()
    this.getCategories()
  },
  data () {
    return {
      response: {
        contents: null,
        category: null,
        category2: {},
        contentsEdit: null,
        contentsDelete: null,
        exposure: null,
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        fresh: false,
        data: {},
        contentsToggle: null,
        valid: false,
        mobileToggle: false,
      },
      config: {
        category1: [],
        category2: [],
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
    contentEdit () {
      this.$router.push({ 'name': 'contentsEdit', params: { contents_id: this.$route.params.contents_id } })
    },
    contentReport () {
      this.$router.push({ 'name': 'contentsReport', params: { contents_id: this.$route.params.contents_id } })
    },
    mobileOpen () {
      this.vModel.mobileToggle = true
    },
    mobileClose () {
      this.vModel.mobileToggle = false
    },
    ConvertHtml (str) {
      str = str.replace(/&amp;/g, '&')
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      str = str.replace(/&quot;/g, '"')
      str = str.replace(/&#039;/g, "'")
      str = str.replace(/&#39;/g, "'")
      return str
    },
    getCategories () {
      this.xhttp({
        url: '/categories',
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.category = response.data.data.categories
          this.config.category1 = this.response.category.map(function ($value) {
            return { value: $value.alias, text: $value.name }
          })
          this.config.category1 = this.config.category1.filter(function ($value) {
            return $value.value !== 'Toon'
          })
          for (let i in this.response.category) {
            this.response.category2[this.response.category[i].name] = this.response.category[i].children.map(function ($value) {
              return { value: $value.id, text: $value.name }
            })
          }
          this.getContentsEdit()
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    contentDelete () {
      if (confirm('컨텐츠를 삭제하시겠습니까?')) {
        this.xhttp({
          url: '/contents/' + this.$route.params.contents_id,
          method: 'delete',
          data: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.contentsDelete = response.data.data
            this.$router.push({ 'name': 'contentsList' })
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
    exposure () {
      let text = '게재'
      if (this.vModel.contentsToggle) {
        text = '차단'
      }
      if (confirm('컨텐츠를 ' + text + ' 하시겠습니까?')) {
        let id = this.$route.params.contents_id
        this.xhttp({
          url: '/contents/' + id + '/exposure',
          method: 'put',
          data: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.exposure = response.data.data
            this.vModel.contentsToggle = this.response.exposure.contents.isOn
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
    getContents () {
      let id = this.$route.params.contents_id
      this.xhttp({
        url: '/contents/' + id,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.contents = response.data.data.contents
          this.vModel.contentsToggle = this.response.contents.isOn
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    getContentsEdit () {
      this.xhttp({
        url: '/contents/' + this.$route.params.contents_id + '/edit',
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.contentsEdit = response.data.data.contents
          this.vModel.data = this.response.contentsEdit
          this.vModel.data.partner = this.response.contentsEdit.partner.name
          this.vModel.data.title = this.ConvertHtml(this.vModel.data.title)
          if (this.vModel.data.sub_title) {
            this.vModel.data.sub_title = this.ConvertHtml(this.vModel.data.sub_title)
          }
          this.vModel.data.created = this.vModel.data.created.slice(0, 10)
          this.config.category2 = this.response.category2[this.vModel.data.type]
          let num = this.vModel.data.category
          let result = this.config.category2.filter(function ($value) {
            return $value.value === num
          })
          this.vModel.data.category = result[0].text
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
    contentsName () {
      if (this.response.contents) {
        return this.ConvertHtml(this.response.contents.title)
      } else {
        return ''
      }
    },
    contentsToggleText () {
      if (this.response.contents) {
        if (this.vModel.contentsToggle) {
          return 'on'
        } else {
          return 'off'
        }
      } else {
        return ''
      }
    },
  },
  watch: {
  }
}
</script>

<style lang="scss">
  .mobile-back {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0, 0, 0, 0.3);z-index:9;
  }
  .mobile-wrap {
    position:absolute;
    top:50%;
    margin-top:-363px;
    left:50%;
    margin-left:-203px;
    width:406px;
    height:726px;
  }
  .mobile-style {
    position: relative;
    width: 406px;
    height: 726px;
    padding: 70px 14px 50px;
    border: 1px solid #ccc;
    margin: 0 auto;
    background: #eaeaea;
    border-radius: 40px;
    -webkit-box-shadow: inset 0 0 20px 3px rgba(0,0,0,.1), 0 0 20px 1px rgba(0,0,0,.1);
    box-shadow: inset 0 0 20px 3px rgba(0,0,0,.1), 0 0 20px 1px rgba(0,0,0,.1);
  }
  .contents_view p {
    margin-bottom: 10px !important;
    color: #000 !important;
    font-size: 17px;
  }
  .contents_view img {
    max-width: 100%;
  }
  #contentsView a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
  }
  .mobile-com {
    width: 100%;
    height: 100%;
    background: rgba(242, 242, 242, 1) !important;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 1px;
    -webkit-box-shadow: 0 0 3px 1px rgba(0,0,0,.1);
    box-shadow: 0 0 3px 1px rgba(0,0,0,.1);
    p {
      margin-bottom: 10px !important;
      color: #000 !important;
      font-size: 17px;
    }
    img {
      width: 100%;
    }
    .image {
      margin-bottom: 10px !important;
    }
    .webfeed-container {
      padding: 4%;
      .webfeed-header {
        color: #555;
        font-weight: bold;
      }
      .webfeed-block {
        .webfeed-list {
          width: 45%;
          display: inline-block;
          border-radius: 3px !important;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2) !important;
          border: solid 1px var(--white) !important;
          background-color: #ffffff !important;
          .webfeed-thumbnail {
            position: relative !important;
            width: 100% !important;
            height: 116px !important;
            border-radius: 2px !important;
            overflow: hidden !important;
            img {
              width:100%;
              height:100%;
            }
          }
          .webfeed-title {
            height: 55px !important;
            font-family: NotoSansKR !important;
            font-size: 15px !important;
            font-weight: 500 !important;
            font-stretch: normal !important;
            font-style: normal !important;
            line-height: 1.27 !important;
            letter-spacing: -0.75px !important;
            color: #000 !important;
            margin: 7px 5px 7px 5px !important;
            overflow: hidden !important;
          }
        }
        .webfeed-box {
          padding:10px;
          margin-top:10px;
          border-radius: 3px !important;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2) !important;
          border: solid 1px var(--white) !important;
          background-color: #ffffff !important;
          .webfeed-box-title {
            width: 100% !important;
            position: relative !important;
            padding: 5px 0 20px 0 !important;
            font-family: NotoSansKR !important;
            font-size: 22px !important;
            font-weight: bold !important;
            font-stretch: normal !important;
            font-style: normal !important;
            line-height: 1.27 !important;
            letter-spacing: -1.5px !important;
            color: #000 !important;
          }
        }
        .webfeed-img {

        }
      }
    }
  }
  .mobile-close {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 69px;
    right: -41px;
    background: rgba(0, 0, 0, 0.47);
    text-align: center;
    cursor:pointer;
  }
</style>
