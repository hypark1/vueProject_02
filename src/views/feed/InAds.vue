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
             아티클 광고
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
                     @click="createAds">
                신규 등록
              </v-btn>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="12">
                <v-data-table
                        :headers="config.headers"
                        :items="resultList"
                        :items-per-page="resultList.length"
                        item-key="key"
                        no-data-text="리스트가 없습니다."
                        hide-default-footer>
                  <template v-slot:body="{ items }">
                    <draggable v-model="response.list.data" tag="tbody"
                               v-bind="config.dragOptions"
                               @start="drag = true"
                               @end="drag = false">
                      <tr v-for="(item,index) in response.list.data" :key="item.key" style="cursor: move;background: #fff;">
                        <td style="text-align: center;width:100px;">{{ index + 1 }}</td>
                        <td style="text-align: center;width:150px;">
                          <template v-if="item.ads_type === 'link'">
                            네이티브 광고
                          </template>
                          <template v-else>
                            네이티브 아티클 광고
                          </template>
                        </td>
                        <td style="text-align:center;width:140px;">
                          <template v-if="item.thumbnail_url">
                            <img style="max-width:100px;max-height:60px;" :src="item.thumbnail_url" />
                          </template>
                          <template v-else>-</template>
                        </td>
                        <td style="text-align: left" @click="tableRowClick(item)" class="tableTitle"><p class="ma-0">{{ item.title }}</p></td>
                        <td style="text-align: center;width:130px;">{{ item.writer }}</td>
                        <td style="text-align: center;width:130px;">{{ item.created_at.slice(0,10) }}</td>
                        <td style="text-align: center;width:130px;">
                          <v-btn small @click="listClose(item.key)"><v-icon>mdi-delete</v-icon></v-btn>
                        </td>
                      </tr>
                    </draggable>
                  </template>
                </v-data-table>
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
    this.mediaList()
    this.adsList()
  },
  data () {
    return {
      response: {
        media: null,
        list: { data: [] },
        listEdit: null,
        listDelete: null,
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        valid: true,
        listSelected: null,
        media: 'default',
      },
      config: {
        mediaOptions: [],
        dragOptions: {
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        },
        headers: [
          { text: 'No', value: 'no', align: 'center' },
          { text: '분류', value: 'ads_type', align: 'center' },
          { text: '썸네일', value: 'thumbnail_url', align: 'center' },
          { text: '제목', value: 'title', align: 'center' },
          { text: '작성자', value: 'writer', align: 'center' },
          { text: '작성일', value: 'created_at', align: 'center' },
          { text: '삭제', value: 'hidden', align: 'center' },
        ],
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
      this.$router.push({ 'name': 'feedInAdsRegister', params: { media_id: this.vModel.media } })
    },
    mediaChange () {
      this.response.list = { data: [] }
      if (this.vModel.media) {
        this.$router.push({ 'name': 'feedInAds', query: { media: this.vModel.media } })
        this.adsList()
      }
    },
    tableRowClick (item) {
      this.$router.push({ 'name': 'feedInAdsView', params: { media_id: this.vModel.media, article_id: item.key } })
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
          this.config.mediaOptions.unshift({ value: 'default', text: '기본 매체' })
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
      }
      this.xhttp({
        url: '/' + this.vModel.media + '/article',
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
          article: key
        }
        this.xhttp({
          url: '/' + this.vModel.media + '/article-rank',
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
          url: '/article/' + val,
          method: 'delete',
          data: null
        }).then((response) => {
          if (response.status === 200) {
            this.response.listDelete = response.data.data
            this.snack('success', '삭제 완료되었습니다.')
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
