<template>
  <v-container
          id="feedVideo"
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
              동영상 관리
            </h1>
          </template>
          <v-card-text>
            <v-row justify="space-between">
              <v-col cols="12">
                <v-data-table
                        :headers="config.headers"
                        :items="resultList"
                        :items-per-page="resultList.length"
                        item-key="key"
                        no-data-text="컨텐츠가 없습니다."
                        hide-default-footer>
                  <template v-slot:item="{ item, index }">
                    <tr>
                      <td style="text-align: center;width:60px;">{{ index + 1 }}</td>
                      <td style="text-align: center;width:120px;">
                        <p class="ma-0 d-inline-block">{{ item.id }}</p>
                        <v-icon style="cursor:pointer;margin-left:5px;" @click="listClick(item)">mdi-link-variant</v-icon>
                      </td>
                      <td style="text-align: center;width:180px;">{{ item.domain }}</td>
                      <td>{{ item.url }}</td>
                      <td style="text-align: center;width:130px;">{{ item.created_at }}</td>
                    </tr>
                  </template>
                </v-data-table>
                <v-pagination
                        v-model="vModel.page"
                        :length="1"
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
  },
  data () {
    return {
      response: {
        list: [
          {
            id: '243,093',
            url: 'https://player.vimeo.com/external/383223652.hd.mp4?s=fc88a34c7323c8c7db0e17b3f37e137c2bc76c7b&profile_id=174&oauth2_token_id=1235942757',
            domain: 'researchnews.co.kr',
            created_at: '20-01-01 18:46',
          },
          {
            id: '243,093',
            url: 'https://player.vimeo.com/external/383223652.hd.mp4?s=fc88a34c7323c8c7db0e17b3f37e137c2bc76c7b&profile_id=174&oauth2_token_id=1235942757',
            domain: 'researchnews.co.kr',
            created_at: '20-01-01 18:46',
          },
          {
            id: '243,093',
            url: 'https://player.vimeo.com/external/383223652.hd.mp4?s=fc88a34c7323c8c7db0e17b3f37e137c2bc76c7b&profile_id=174&oauth2_token_id=1235942757',
            domain: 'researchnews.co.kr',
            created_at: '20-01-01 18:46',
          },
          {
            id: '243,093',
            url: 'https://player.vimeo.com/external/383223652.hd.mp4?s=fc88a34c7323c8c7db0e17b3f37e137c2bc76c7b&profile_id=174&oauth2_token_id=1235942757',
            domain: 'researchnews.co.kr',
            created_at: '20-01-01 18:46',
          },
        ],
      },
      vModel: {
        snackbar: false,
        snackbarType: 'warning',
        errorMessage: null,
        page: 1,
      },
      config: {
        headers: [
          { text: 'No', value: 'no', align: 'center' },
          { text: 'ID', value: 'id', align: 'center' },
          { text: '도메인', value: 'domain', align: 'center' },
          { text: 'video url', value: 'url', align: 'center' },
          { text: '등록일', value: 'created_at', align: 'center' },
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
    listClick (val) {
      console.log(val)
    },
    paginationClick (page) {
      this.vModel.page = page
      let send = {
        page: page
      }
      this.$router.replace({ name: 'feedVideo', query: send })
    },
  },
  computed: {
    resultList () {
      if (this.response.list) {
        return this.response.list
      } else {
        return false
      }
    },
  },
}
</script>

<style>
  #feedVideo table tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
