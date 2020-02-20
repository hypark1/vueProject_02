<template>
  <v-container
    id="contentsRegister"
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
            컨텐츠 {{resultType}}
          </h1>
        </template>
        <v-card-text>
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
                              컨텐츠 종류
                          </v-col>
                          <v-col v-if="resultType !== '수정'">
                              <v-select
                                      :items="config.category1"
                                      v-model="vModel.data.type"
                                      label="선택"
                                      color="secondary"
                                      @change="changeType"
                                      :rules="config.typeRules"
                                      required />
                          </v-col>
                          <v-col v-else>
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
                          <v-col v-if="resultType !== '수정'">
                              <v-select
                                      :items="config.category2"
                                      v-model="vModel.data.category"
                                      label="선택"
                                      color="secondary"
                                      :rules="config.categoryRules"
                                      :disabled="!vModel.data.type"
                                      required />
                          </v-col>
                          <v-col v-else>
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
                                      label="글쓴이"
                                      type="text"
                                      color="secondary"
                                      v-model="vModel.data.writer"
                                      :rules="config.writerRules"
                                      required />
                          </v-col>
                      </v-row>
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-0" v-if="vModel.data.type !== 'Video'">
                      <v-row
                              align="center">
                          <v-col cols="2" class="text-right grey--text">
                              썸네일
                          </v-col>
                          <v-col v-if="!vModel.data.thumbnail_url || response.routeName === 'contentsRegister'">
                                  <v-file-input v-model="thumbnail_url" label="파일 첨부"></v-file-input>
                          </v-col>
                          <template v-else>
                              <v-col cols="9">
                              <v-text-field
                                      label="파일 첨부"
                                      type="text"
                                      color="secondary"
                                      v-model="vModel.data.thumbnail_url"
                                      disabled/>
                              </v-col>
                              <div @click="thumbnailClose()" style="cursor: pointer;">X</div>
                          </template>
                      </v-row>
                  </v-col>
              </v-row>
              <v-row
                      class="text-no-wrap"
                      align="center" v-if="vModel.data.type !== 'Video'">
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
                                      v-model="vModel.data.title"
                                      :rules="config.titleRules"
                                      required/>
                          </v-col>
                      </v-row>
                  </v-col>
              </v-row>
              <v-row
                      class="text-no-wrap"
                      align="center" v-if="vModel.data.type !== 'Video'">
                  <v-col cols="12" class="pt-0 pb-0">
                      <v-row
                              align="center">
                          <v-col cols="1" class="text-right grey--text">
                              요약 내용
                          </v-col>
                          <v-col>
                              <v-textarea
                                      label="요약 내용"
                                      color="secondary"
                                      auto-grow
                                      rows="1"
                                      row-height="5"
                                      no-resize
                                      v-model="vModel.data.sub_title"
                                      :rules="config.subTitleRules"
                                      required />
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
                                      label="URL 주소"
                                      type="text"
                                      color="secondary"
                                      v-model="vModel.data.contents"
                                      :rules="config.urlRules"
                                      required/>
                          </v-col>
                      </v-row>
                  </v-col>
              </v-row>
            <v-row justify="space-around" v-if="vModel.data.type !== 'Video'">
              <v-col cols="12">
                  <vue-editor id="editor"
                              v-model="vModel.data.contents"
                              :editorToolbar="customToolbar"
                              useCustomImageHandler
                              @image-added="handleImageAdded"></vue-editor>
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
                      :disabled="!vModel.valid"
                      color="success"
                      @click="submitRegister(resultType)">
                {{resultType}}
              </v-btn>
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
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  created () {
    this.refresh()
  },
  data () {
    return {
      customToolbar: [
        [{ 'font': [] }],
        [{ 'header': [ false, 1, 2, 3, 4, 5, 6, ] }],
        // [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        [{ 'header': 1 }, { 'header': 2 }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        // ['link', 'image', 'video', 'formula'],
        [{ 'direction': 'rtl' }],
        // ['clean'],
      ],
      response: {
        routeName: this.$route.name,
        category: null,
        category2: {},
        category3: null,
        contents: null,
        partner: null,
        register: null,
        edit: null,
        thumbnailVal: true,
        image: [],
      },
      vModel: {
        valid: true,
        lineTap: 0,
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        fresh: false,
        created: this.$moment(new Date()).format('YYYY-MM-DD'),
        contents: null,
        data: {
          title: null,
          sub_title: null,
          writer: null,
          type: null,
          category: null,
          contents: null,
          partner: null,
          thumbnail_url: null,
        },
      },
      thumbnail_url: null,
      config: {
        category1: [],
        category2: [],
        category3: [],
        partner: [],
        titleRules: [ v => !!v || '제목을 입력하세요.' ],
        subTitleRules: [ v => !!v || '요약 내용을 입력하세요.' ],
        writerRules: [ v => !!v || '글쓴이를 입력하세요.' ],
        typeRules: [ v => !!v || '컨텐츠 종류를 선택하세요.' ],
        categoryRules: [ v => !!v || '카테고리를 선택하세요.' ],
        partnerRules: [ v => !!v || 'CP를 선택하세요.' ],
        urlRules: [ v => !!v || 'url을 입력하세요.' ],
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
    refresh () {
      this.getCategories()
      this.getPartners()
    },
    changeType (val) {
      this.vModel.data.category = null
      this.config.category2 = this.response.category2[val]
    },
    thumbnailClose () {
      this.vModel.data.thumbnail_url = null
      this.response.thumbnailVal = true
    },
    tagChange (val) {
      let text = this.vModel.data.contents
      let div = document.createElement('div')
      div.innerHTML = text
      let img = div.querySelectorAll('img')
      let h5 = div.querySelectorAll('h5')
      let arr = []
      for (let j = 0; j < h5.length; j++) {
        let a2 = h5[j].getAttribute('class')
        if (a2.indexOf('figcaption') !== -1) {
          let text2 = h5[j].innerText
          arr.push(text2)
          h5[j].remove()
        }
      }
      for (let i = 0; i < img.length; i++) {
        if (img[i].parentNode.getAttribute('href')) {
          let a = img[i].parentNode.parentNode.outerHTML
          let aaa = a.replace(/(<p)(.+?)(<\s?\/\s?p>)/, '<figure$2</figure>')
          div.querySelectorAll('img')[i].parentNode.parentNode.outerHTML = aaa
          let b = div.querySelectorAll('img')[i].parentNode.parentNode.innerHTML
          b += '<figcaption>' + arr[i] + '</figcaption>'
          div.querySelectorAll('img')[i].parentNode.parentNode.innerHTML = b
        } else {
          let a = img[i].parentNode.outerHTML
          let aaa = a.replace(/(<p)(.+?)(<\s?\/\s?p>)/, '<figure$2</figure>')
          div.querySelectorAll('img')[i].parentNode.outerHTML = aaa
          let b = div.querySelectorAll('img')[i].parentNode.innerHTML
          b += '<figcaption>' + arr[i] + '</figcaption>'
          div.querySelectorAll('img')[i].parentNode.innerHTML = b
        }
      }
      this.vModel.contents = div.innerHTML
      this.ContentsValidate(val)
    },
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      let formData = new FormData()
      formData.append('upload', file)
      this.xhttp({
        url: '/contents/file-upload',
        method: 'post',
        data: formData
      }).then((response) => {
        if (response.status === 200) {
          let src = response.data.link
          Editor.insertEmbed(cursorLocation, 'image', src)
          let div = document.createElement('div')
          div.innerHTML = document.querySelector('.ql-editor').innerHTML
          let img = div.querySelectorAll('img')
          for (let i = 0; i < img.length; i++) {
            if (img[i].src === 'http:' + src) {
              let dd = div.querySelectorAll('img')[i].parentNode.innerHTML
              dd += '<h5 class="figcaption">Image Caption</h5>'
              div.querySelectorAll('img')[i].parentNode.innerHTML = dd
              document.querySelector('.ql-editor').innerHTML = div.querySelectorAll('img')[i].parentNode.parentNode.innerHTML
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
    getCategories () {
      this.xhttp({
        url: '/categories',
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.category = response.data.data.categories
          this.config.category1 = this.response.category.map(function ($value) {
            return { value: $value.name, text: $value.name }
          })
          this.config.category1 = this.config.category1.filter(function ($value) {
            return $value.value !== 'Toon'
          })
          for (let i in this.response.category) {
            this.response.category2[this.response.category[i].name] = this.response.category[i].children.map(function ($value) {
              return { value: $value.id, text: $value.name }
            })
          }
          if (this.response.routeName === 'contentsEdit') {
            this.getContents()
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
    ConvertHtml (str) {
      str = str.replace(/&amp;/g, '&')
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      str = str.replace(/&quot;/g, '"')
      str = str.replace(/&#039;/g, "'")
      str = str.replace(/&#39;/g, "'")
      return str
    },
    getContents () {
      this.xhttp({
        url: '/contents/' + this.$route.params.contents_id + '/edit',
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.contents = response.data.data.contents
          this.vModel.data = this.response.contents
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
          if (this.vModel.data.thumbnail_url) {
            this.response.thumbnailVal = false
          }
          let text = this.response.contents.contents
          let div = document.createElement('div')
          div.innerHTML = text
          let img = div.querySelectorAll('img')
          for (let i = 0; i < img.length; i++) {
            if (img[i].parentNode.getAttribute('href')) {
              let a = img[i].parentNode.parentNode.outerHTML
              let aaa = a.replace(/(<figure)(.+?)(<\s?\/\s?figure>)/, '<p$2</p>')
              div.querySelectorAll('img')[i].parentNode.parentNode.outerHTML = aaa
            } else {
              let a = img[i].parentNode.outerHTML
              let aaa = a.replace(/(<figure)(.+?)(<\s?\/\s?figure>)/, '<p$2</p>')
              div.querySelectorAll('img')[i].parentNode.outerHTML = aaa
            }
          }
          let h5 = div.querySelectorAll('figcaption')
          for (let i = 0; i < h5.length; i++) {
            div.querySelectorAll('figcaption')[0].outerHTML = div.querySelectorAll('figcaption')[0].outerHTML.replace(/(<figcaption)(.+?)(<\s?\/\s?figcaption>)/, '<h5 class="figcaption"$2</h5>')
          }
          this.vModel.data.contents = div.innerHTML
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    getPartners () {
      let send = {
        orderby: 'created',
        direction: 'desc'
      }
      this.xhttp({
        url: '/partners',
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.partner = response.data.data.partners[0].key
          /* this.config.partner = this.response.partner.partners.map(function ($value) {
            return { value: $value.key, text: $value.name }
          }) */
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    submitRegister (val) {
      if (this.$refs.form.validate()) {
        if (this.vModel.data.thumbnail_url) {
          let message = '등록 하시겠습니까?'
          if (val === '수정') {
            message = '수정 하시겠습니까?'
          }
          if (confirm(message)) {
            this.tagChange(val)
          }
        } else {
          this.snack('warning', '썸네일을 등록하세요.')
        }
      }
    },
    ContentsValidate (val) {
      if (this.vModel.data.type === 'Video') {
        if (val === '등록') {
          this.putContents()
        } else {
          this.contentsEdit()
        }
      } else {
        if (this.vModel.data.contents) {
          if (val === '등록') {
            this.putContents()
          } else {
            this.contentsEdit()
          }
        } else {
          this.snack('warning', '내용을 입력하세요.')
        }
      }
    },
    putContents () {
      let send = this.vModel.data
      send.contents = this.vModel.contents
      this.xhttp({
        url: '/contents/' + this.response.partner + '/create',
        method: 'post',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.register = response.data.data
          this.snack('success', '컨텐츠 등록이 완료되었습니다.')
          this.$router.push({ name: 'contentsList' })
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    contentsEdit () {
      let send = this.vModel.data
      send.partner = this.response.partner
      send.contents = this.vModel.contents
      this.xhttp({
        url: 'contents/' + this.response.partner + '/update/' + this.$route.params.contents_id,
        method: 'put',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.edit = response.data.data
          this.snack('success', '수정 완료되었습니다.')
          this.beforePage()
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    thumbnailFile () {
      let formData = new FormData()
      formData.append('upload', this.thumbnail_url)
      this.xhttp({
        url: '/contents/file-upload',
        method: 'post',
        data: formData
      }).then((response) => {
        if (response.status === 200) {
          this.vModel.data.thumbnail_url = response.data.link
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
    resultType () {
      if (this.response.routeName === 'contentsEdit') {
        return '수정'
      } else {
        return '등록'
      }
    }
  },
  watch: {
    thumbnail_url: function (val) {
      if (val) {
        this.thumbnailFile()
      }
    }
  }
}
</script>

<style lang="scss">
    .v-application p {
        margin-bottom: 10px;
    }
    #editor{
       min-height:400px
     }
</style>
