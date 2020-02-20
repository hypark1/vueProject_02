<template>
  <v-container
          id="InAdsRegister"
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
             아티클 광고 등록
            </h1>
          </template>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col>
                <v-form v-model="vModel.valid"
                        ref="form">
                  <v-row
                          class="text-no-wrap"
                          align="center">
                    <v-col cols="12" class="pt-0 pb-0">
                      <v-row
                              align="center">
                        <v-col cols="1" class="text-right grey--text">
                          CPC 단가
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                                  label="CPC 단가"
                                  type="text"
                                  color="secondary"
                                  v-model="unit_price"
                                  :rules="config.unitRules"
                                  ref="unit"
                                  @blur="numberCheck('unit', unit_price)"
                                  required />
                        </v-col>
                        원
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
                          예산
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                                  label="예산"
                                  type="text"
                                  color="secondary"
                                  v-model="budget"
                                  :rules="config.budgetRules"
                                  ref="budget"
                                  @blur="numberCheck('budget', budget)"
                                  required />
                        </v-col>
                        원 (현재 총지출: {{ numReplace(vModel.use_price) }}원)
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
                          1일 예산
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                                  label="1일 예산"
                                  type="text"
                                  color="secondary"
                                  v-model="daily_budget"
                                  :rules="config.dailyRules"
                                  ref="daily"
                                  @blur="numberCheck('daily', daily_budget)"
                                  required />
                        </v-col>
                        원 (현재 1일 총지출: {{ numReplace(vModel.daily_use_price) }}원)
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
                          구분
                        </v-col>
                        <v-col cols="4">
                          <v-select
                                  :items="config.typeOptions"
                                  v-model="vModel.data.ads_type"
                                  style="height:56px;"
                                  label="선택"
                                  color="secondary"
                                  :rules="config.typeRules"
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
                          제목
                        </v-col>
                        <v-col>
                          <v-text-field
                                  label="제목"
                                  type="text"
                                  color="secondary"
                                  v-model="vModel.data.title"
                                  :rules="config.titleRules"
                                  required />
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
                          align="center">
                    <v-col cols="12" class="pt-0 pb-0">
                      <v-row
                              align="center">
                        <v-col cols="1" class="text-right grey--text">
                          URL
                        </v-col>
                        <v-col cols="2">
                          <v-select
                                  :items="config.urlOptions"
                                  v-model="vModel.data.link_type"
                                  label="선택"
                                  color="secondary"
                                  :rules="config.urlTypeRules"
                                  required />
                        </v-col>
                        <v-col>
                          <v-text-field
                                  label="URL 주소"
                                  type="text"
                                  color="secondary"
                                  v-model="vModel.data.url"
                                  :rules="config.urlRules"
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
                          썸네일
                        </v-col>
                        <v-col v-if="!vModel.data.thumbnail_url || response.routeName === 'feedInAdsRegister'">
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
                    <v-col cols="6" class="pt-0 pb-0">
                      <v-row
                              align="center">
                        <v-col cols="2" class="text-right grey--text">
                          랜딩 페이지
                        </v-col>
                        <v-col v-if="!vModel.data.landing_file || response.landingVal">
                          <v-file-input v-model="landing_file" label="랜딩 페이지 파일 첨부"></v-file-input>
                        </v-col>
                        <template v-else>
                          <v-col cols="9">
                            <v-text-field
                                    label="랜딩 페이지 파일 첨부"
                                    type="text"
                                    color="secondary"
                                    v-model="vModel.data.landing_file"
                                    disabled/>
                          </v-col>
                          <div @click="landingFileClose()" style="cursor: pointer;">X</div>
                        </template>
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
                          태그
                        </v-col>
                        <v-col>
                          <v-text-field
                                  label="태그"
                                  hint=", 로 구분해 주세요."
                                  type="text"
                                  color="secondary"
                                  v-model="vModel.data.tags"
                                  :rules="config.tagRules"
                                  required />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row
                          class="text-no-wrap"
                          align="center">
                    <v-col cols="6" class="pt-0 pb-0">
                      <v-row align="center">
                        <v-col cols="2" class="text-right grey--text">
                          게재 기간
                        </v-col>
                        <v-col>
                          <v-row align="center">
                            <v-col cols="4">
                              <v-menu
                                      ref="menu1"
                                      v-model="datePicker.start.menu"
                                      :close-on-content-click="false"
                                      :return-value.sync="datePicker.start.date"
                                      transition="scale-transition"
                                      min-width="290px"
                                      offset-y >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                          v-model="datePicker.start.date"
                                          color="secondary"
                                          label="Start date"
                                          prepend-icon="mdi-calendar-outline"
                                          readonly
                                          v-on="on" />
                                </template>

                                <v-date-picker
                                        v-model="datePicker.start.date"
                                        color="secondary"
                                        landscape
                                        scrollable >
                                  <v-spacer />
                                  <v-btn
                                          color="secondary"
                                          @click="datePicker.start.menu = false" >
                                    Cancel
                                  </v-btn>

                                  <v-btn
                                          color="secondary"
                                          @click="$refs.menu1.save(datePicker.start.date)" >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <span>-</span>
                            <v-col cols="4">
                              <v-menu
                                      ref="menu2"
                                      v-model="datePicker.end.menu"
                                      :close-on-content-click="false"
                                      :return-value.sync="datePicker.end.date"
                                      transition="scale-transition"
                                      min-width="290px"
                                      offset-y >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                          v-model="datePicker.end.date"
                                          color="secondary"
                                          label="End date"
                                          prepend-icon="mdi-calendar-outline"
                                          readonly
                                          v-on="on" />
                                </template>

                                <v-date-picker
                                        v-model="datePicker.end.date"
                                        color="secondary"
                                        landscape
                                        scrollable >
                                  <v-spacer />
                                  <v-btn
                                          color="secondary"
                                          @click="datePicker.end.menu = false" >
                                    Cancel
                                  </v-btn>

                                  <v-btn
                                          color="secondary"
                                          @click="$refs.menu2.save(datePicker.end.date)" >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <vue-editor id="editor"
                                  v-model="vModel.data.contents"
                                  :editorToolbar="customToolbar"
                                  useCustomImageHandler
                                  @image-added="handleImageAdded"></vue-editor>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn color="default"
                     @click="beforePage()">
                취소
              </v-btn>
              <template v-if="this.response.routeName === 'feedInAdsView'">
                <v-btn :disabled="!vModel.valid"
                       color="warning"
                       @click="adsRegister('edit')">
                  수정
                </v-btn>
              </template>
              <template v-if="this.response.routeName === 'feedInAdsRegister'">
                <v-btn :disabled="!vModel.valid"
                       color="warning"
                       @click="adsRegister('create')">
                  등록
                </v-btn>
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
        view: null,
        landingVal: true,
        thumbnailVal: true,
        adsEdit: null,
        adsCreate: null,
        image: [],
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        valid: true,
        contents: null,
        data: {
          writer: JSON.parse(localStorage.getItem('cdpUser')).name,
          unit_price: null,
          budget: null,
          daily_budget: null,
          ads_type: null,
          title: null,
          sub_title: null,
          link_type: null,
          url: null,
          contents: '',
          tags: null,
          landing_file: null,
          thumbnail_url: null,
        }
      },
      use_price: 0,
      daily_use_price: 0,
      unit_price: null,
      budget: null,
      daily_budget: null,
      thumbnail_url: null,
      landing_file: null,
      datePicker: {
        start: {
          date: '',
          menu: false
        },
        end: {
          date: '',
          menu: false
        }
      },
      config: {
        typeOptions: [
          { value: 'outlink', text: '네이티브 광고' },
          { value: 'native', text: '네이티브 아티클 광고' },
        ],
        urlOptions: [
          { value: '_self', text: 'inlink' },
          { value: '_blank', text: 'outlink' },
        ],
        unitRules: [v => !!v || 'CPC 단가를 입력하세요.'],
        budgetRules: [ v => !!v || '예산을 입력하세요.' ],
        dailyRules: [ v => !!v || '1일 예산을 입력하세요.' ],
        typeRules: [ v => !!v || '구분을 선택하세요.' ],
        titleRules: [ v => !!v || '제목을 입력하세요.' ],
        urlRules: [ v => !!v || 'url을 입력하세요.' ],
        urlTypeRules: [ v => !!v || 'url 설정을 선택하세요.' ],
        textRules: [ v => !!v || '요약 내용을 입력하세요.' ],
        tagRules: [ v => !!v || '태그를 ,로 구분하여 입력하세요.' ],
        landingRules: [ v => !!v || '랜딩 페이지를 선택하세요.' ],
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
    refresh () {
      if (this.response.routeName === 'feedInAdsView') {
        this.adsView()
      }
    },
    beforePage () {
      this.$router.go(-1)
    },
    landingFileClose () {
      this.vModel.data.landing_file = null
      this.response.landingVal = true
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
          if (arr.length > 0) {
            b += '<figcaption>' + arr[i] + '</figcaption>'
          }
          div.querySelectorAll('img')[i].parentNode.parentNode.innerHTML = b
        } else {
          let a = img[i].parentNode.outerHTML
          let aaa = a.replace(/(<p)(.+?)(<\s?\/\s?p>)/, '<figure$2</figure>')
          div.querySelectorAll('img')[i].parentNode.outerHTML = aaa
          let b = div.querySelectorAll('img')[i].parentNode.innerHTML
          if (arr.length > 0) {
            b += '<figcaption>' + arr[i] + '</figcaption>'
          }
          div.querySelectorAll('img')[i].parentNode.innerHTML = b
        }
      }
      this.vModel.contents = div.innerHTML
      if (val === 'create') {
        this.putArticle()
      } else {
        this.adsEdit()
      }
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
    numReplace (val) {
      let num = val + ''
      num = num.split('.')
      let result = num[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      if (num[1]) {
        result += '.' + num[1]
      }
      return result
    },
    numberCheck (type, val) {
      let point = Number(val.replace(/,/g, ''))
      if (isNaN(point)) {
        // 문자포함
        this.snack('warning', '숫자만 입력하세요.')
        if (type === 'unit') {
          this.$refs.unit.focus()
        } else if (type === 'budget') {
          this.$refs.budget.focus()
        } else if (type === 'daily') {
          this.$refs.daily.focus()
        }
      }
    },
    adsView () {
      this.xhttp({
        url: '/article/' + this.$route.params.article_id,
        method: 'get',
        params: null
      }).then((response) => {
        if (response.status === 200) {
          this.response.view = response.data.data
          this.vModel.data = this.response.view.data[0]
          if (this.vModel.data.landing_file) {
            this.response.landingVal = false
          }
          if (this.vModel.data.thumbnail_url) {
            this.response.thumbnailVal = false
          }
          if (this.vModel.data.unit_price) {
            this.unit_price = this.vModel.data.unit_price
            this.budget = this.vModel.data.budget
            this.daily_budget = this.vModel.data.daily_budget
          }
          if (this.vModel.data.start_date) {
            this.datePicker.start.date = this.$moment(this.vModel.data.start_date.slice(0, 10)).format('YYYY-MM-DD')
          }
          if (this.vModel.data.end_date) {
            this.datePicker.end.date = this.$moment(this.vModel.data.end_date.slice(0, 10)).format('YYYY-MM-DD')
          }
          if (this.vModel.data.use_price) {
            this.vModel.use_price = this.vModel.data.use_price
          }
          if (this.vModel.data.daily_use_price) {
            this.vModel.daily_use_price = this.vModel.data.daily_use_price
          }
          let text = this.response.view.data[0].contents
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
    adsEdit () {
      let send = this.vModel.data
      send.contents = this.vModel.contents
      this.xhttp({
        url: '/article/' + this.$route.params.article_id,
        method: 'put',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.adsEdit = response.data.data
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
    adsRegister (val) {
      if (this.$refs.form.validate()) {
        let message = '등록 하시겠습니까?'
        if (val === 'edit') {
          message = '수정 하시겠습니까?'
        }
        if (confirm(message)) {
          this.tagChange(val)
        }
      }
    },
    landingFile () {
      let formData = new FormData()
      formData.append('upload', this.landing_file)
      this.xhttp({
        url: '/article/file/upload',
        method: 'post',
        data: formData
      }).then((response) => {
        if (response.status === 200) {
          this.vModel.data.landing_file = response.data.data
        }
      }).catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ 'name': 'UserLogin' })
        } else {
          this.snack('warning', '관리자에게 문의 바랍니다.')
        }
      })
    },
    putArticle () {
      let send = this.vModel.data
      send.contents = this.vModel.contents
      this.xhttp({
        url: '/' + this.$route.params.media_id + '/article',
        method: 'post',
        data: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.adsCreate = response.data.data
          this.snack('success', '등록 완료되었습니다.')
          this.$router.push({ 'name': 'feedInAds', query: { media: this.$route.params.media_id } })
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
  watch: {
    landing_file: function (val) {
      this.landingFile()
    },
    datePicker: {
      handler (val) {
        if (val.start.date) {
          this.vModel.data.start_date = val.start.date
        }
        if (val.end.date) {
          this.vModel.data.end_date = val.end.date
        }
      },
      deep: true
    },
    unit_price: function (val) {
      if (val) {
        let point = Number(val.replace(/,/g, ''))
        if (isNaN(point) === false) {
          // 숫자
          const result = val.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.unit_price = result
          this.vModel.data.unit_price = point
        } else {
          // 문자포함
          this.snack('warning', '숫자만 입력하세요.')
        }
      }
    },
    budget: function (val) {
      if (val) {
        let point = Number(val.replace(/,/g, ''))
        if (isNaN(point) === false) {
          // 숫자
          const result = val.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.budget = result
          this.vModel.data.budget = point
        } else {
          // 문자포함
          this.snack('warning', '숫자만 입력하세요.')
        }
      }
    },
    daily_budget: function (val) {
      if (val) {
        let point = Number(val.replace(/,/g, ''))
        if (isNaN(point) === false) {
          // 숫자
          const result = val.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.daily_budget = result
          this.vModel.data.daily_budget = point
        } else {
          // 문자포함
          this.snack('warning', '숫자만 입력하세요.')
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .ck-editor__editable_inline {
    height: 584px !important;
    min-height: auto;

    & > p {
      margin: 0;
      font-size: 1em;
      line-height: 1.6em;
      padding-top: 0.2em;
    }
  }
  .ck.ck-dropdown .ck-dropdown__arrow {
    z-index: auto;
  }
  #editor{
    min-height:400px
  }
</style>
