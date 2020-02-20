<template>
  <v-container
    id="BlackView"
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
            {{resultBlackName}}
          </h1>
        </template>
        <v-card-text>
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              기본 정보
            </h2>
            <v-btn color="warning" @click="pageBlackList">
              목록
            </v-btn>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="8" class="d-inline-flex pa-0">
              <v-text-field
                      label="제목"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.title"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="등록자"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.partner.name"
                      disabled />
            </v-col>
            <v-col cols="8" class="d-inline-flex pa-0">
              <v-row justify="space-around" style="margin-bottom: 15px;" class="ma-0">
                  <v-col class="d-inline-flex pa-0 mr-2">
                      <v-text-field
                              label="컨텐츠 종류"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.type"
                              disabled />
                  </v-col>
                  <v-col class="d-inline-flex pa-0 ml-2">
                      <v-text-field
                              label="카테고리"
                              type="text"
                              color="secondary"
                              v-model="vModel.data.category"
                              disabled />
                  </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="등록일자"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.created"
                      disabled />
            </v-col>
            <v-col cols="8" class="d-inline-flex pa-0">
              <v-row justify="space-around" style="margin-bottom: 15px;" class="ma-0">
                <v-col class="d-inline-flex pa-0 mr-2">
                  <v-text-field
                          label="차단 일시"
                          type="text"
                          color="secondary"
                          v-model="vModel.data.offDate"
                          disabled />
                </v-col>
                <v-col class="d-inline-flex pa-0 ml-2">
                  <v-text-field
                          label="총 신고 건수"
                          type="text"
                          color="secondary"
                          v-model="vModel.data.assucationCount"
                          disabled />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-row align="center" style="margin-bottom: 15px;" class="ma-0">
                <span class="mr-5">상태</span>
                <v-btn color="warning"
                     @click="exposure">
                {{ contentsToggleText }}
              </v-btn>
              </v-row>
            </v-col>
          </v-row>
            <v-row>
                <v-col cols="12" v-if="resultContents">
                    <v-data-table
                            :headers="config.headers1"
                            :items="resultContents"
                            :items-per-page="resultContents.length"
                            item-key="id"
                            no-data-text="신고 내역이 없습니다."
                            hide-default-footer>
                        <template v-slot:item="{ item, index }">
                            <tr>
                                <td class="text-center" style="width:200px">{{ index + 1 }}</td>
                                <td class="text-center" style="width:250px">{{ item.created_at.slice(0, 10) }}</td>
                                <td class="text-center" style="width:250px">{{ item.type.name }}</td>
                                <td class="text-left">{{ item.message }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
          <v-divider class="mt-5 mb-5" />
          <v-row justify="space-between" align="center" class="ma-0">
            <h2 style="padding: 20px 10px;">
              CP 정보
            </h2>
          </v-row>
          <v-row justify="space-around" style="margin-bottom: 15px;">
            <v-col cols="8" class="d-inline-flex pa-0">
              <v-text-field
                      label="CP명"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.partner.name"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="담당자"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.partner.company.managerName"
                      disabled />
            </v-col>
            <v-col cols="8" class="d-inline-flex pa-0">
              <v-row justify="space-around" style="margin-bottom: 15px;" class="ma-0">
                <v-col class="d-inline-flex pa-0 mr-2">
                  <v-text-field
                          label="대표자"
                          type="text"
                          color="secondary"
                          v-model="vModel.data.partner.company.ceo"
                          disabled />
                </v-col>
                <v-col class="d-inline-flex pa-0 ml-2">
                  <v-text-field
                          label="사업자 등록 번호"
                          type="text"
                          color="secondary"
                          v-model="vModel.data.partner.company.businessNo"
                          disabled />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="전화번호"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.partner.company.managerPhone"
                      disabled />
            </v-col>
            <v-col cols="8" class="d-inline-flex pa-0">
              <v-text-field
                      label="주소"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.partner.company.address"
                      disabled />
            </v-col>
            <v-col cols="3" class="d-inline-flex pa-0">
              <v-text-field
                      label="이메일 주소"
                      type="text"
                      color="secondary"
                      v-model="vModel.data.partner.company.managerEmail"
                      disabled />
            </v-col>
            <!--<v-col cols="12">
              <v-data-table
                      :headers="config.headers2"
                      :items="config.table2"
                      :items-per-page="1"
                      item-key="key"
                      hide-default-footer>
                <template v-slot:item.title="{ item }">
                  <p class="text-left ma-0">{{ item.title }}</p>
                </template>
              </v-data-table>
            </v-col>-->
          </v-row>
            <v-row>
                <v-col cols="12" v-if="resultPartners">
                    <v-data-table
                            :headers="config.headers3"
                            :items="resultPartners.accusations"
                            :items-per-page="20"
                            item-key="id"
                            no-data-text="신고 내역이 없습니다."
                            hide-default-footer>
                        <template v-slot:item="{ item, index }">
                            <tr>
                                <td class="text-center" style="width:200px">{{index + 1}}</td>
                                <td class="text-center" style="width:250px">{{ item.date.slice(0, 10) }}</td>
                                <td class="text-center" style="width:250px">{{ item.type }}</td>
                                <td class="text-left">{{ item.message }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                    <v-pagination
                            v-model="vModel.page"
                            :length="resultPartners.meta.lastPage"
                            :total-visible="10"
                            @input="paginationClick"
                            circle
                            class="justify-center mt-5"
                            next-icon="mdi-menu-right"
                            prev-icon="mdi-menu-left"/>
                </v-col>
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
    this.refresh()
  },
  data () {
    return {
      response: {
        black: null,
        partners: null,
        contents: null,
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        fresh: false,
        per: 20,
        page: 1,
        data: {
          title: '',
          partner: {
            name: '',
            company: {
              address: '',
              businessNo: '',
              ceo: '',
              managerEmail: '',
              managerName: '',
              managerPhone: '',
            }
          },
          type: '',
          category: '',
          created: '',
          offDate: '',
          offNum: 0
        },
        contentsToggle: null,
        orderby: 'page'
      },
      config: {
        headers1: [
          { text: 'No', value: 'id', align: 'center' },
          { text: '신고일', value: 'created_at', align: 'center' },
          { text: '신고 구분', value: 'accusation_type_id', align: 'center' },
          { text: '상세 내용', value: 'message', align: 'center' },
        ],
        headers2: [
          { text: '전체 컨텐츠', value: 'all', align: 'center' },
          { text: '신고', value: 'no', align: 'center' },
          { text: '뉴스', value: 'news', align: 'center' },
          { text: '동영상', value: 'video', align: 'center' },
          { text: '포스트', value: 'post', align: 'center' },
          { text: '웹툰', value: 'webtoon', align: 'center' },
          { text: '커뮤니티', value: 'community', align: 'center' }
        ],
        headers3: [
          { text: 'No', value: 'id', align: 'center' },
          { text: '신고일', value: 'created_at', align: 'center' },
          { text: '신고 구분', value: 'accusation_type_id', align: 'center' },
          { text: '상세 내용', value: 'message', align: 'center' },
          // { text: '본문', value: 'abc', align: 'center' },
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
    numReplace (val) {
      let num = val + ''
      const result = num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return result
    },
    paginationClick (page) {
      this.vModel.page = page
      let send = {
        page: page
      }
      this.$router.replace({ name: 'contentsBlackView', query: send })
      this.getPartners()
    },
    pageBlackList () {
      this.$router.push({ 'name': 'contentsBlackList' })
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
    refresh () {
      let send = {
        page: 1
      }
      if (this.$route.query.page) {
        send.page = this.$route.query.page
        this.vModel.page = Number(this.$route.query.page)
      }
      this.$router.replace({ name: 'contentsBlackView', query: send })
      this.getContents()
      this.getPartners()
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
          this.vModel.data = this.response.contents
          this.vModel.data.created = this.vModel.data.created.slice(0, 10)
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
      let id = this.$route.params.partners_id
      let send = {
        orderby: 'created',
        direction: 'desc',
        per: 20,
        page: this.vModel.page
      }
      this.xhttp({
        url: '/accusations/' + id,
        method: 'get',
        params: send
      }).then((response) => {
        if (response.status === 200) {
          this.response.partners = response.data.data
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
    resultBlackName () {
      if (this.response.contents) {
        return this.response.contents.title
      } else {
        return ''
      }
    },
    resultContents () {
      if (this.response.contents) {
        return this.response.contents.assucation
      } else {
        return ''
      }
    },
    resultPartners () {
      if (this.response.partners) {
        return this.response.partners
      } else {
        return ''
      }
    },
    contentsToggleText () {
      // if (this.response.contents) {
      if (this.vModel.contentsToggle) {
        return 'on'
      } else {
        return 'off'
      }
      /* } else {
        return ''
      } */
    },
  },
}
</script>
