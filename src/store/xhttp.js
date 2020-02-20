import axios from 'axios'

export default {
  actions: {
    xhttp ({ commit }, payload) {
      const httpRequest = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        url: null,
        method: null,
        data: null,
        params: null,
        baseURL: process.env.NODE_ENV === 'development' ? 'http://api.aiinfeed.com' : 'http://api.aiinfeed.com',
        responseType: 'json',
        responseEncoding: 'utf8'
      }
      let session = JSON.parse(localStorage.getItem('cdpUser'))
      if (session) {
        httpRequest.headers.Authorization = 'Bearer ' + session.accessToken
      }
      httpRequest.url = (payload.url ? payload.url : null)
      httpRequest.method = (payload.method ? payload.method : null)
      httpRequest.data = (payload.data ? payload.data : null)
      httpRequest.params = (payload.params ? payload.params : null)
      httpRequest.headers = (payload.headers ? payload.headers : httpRequest.headers)
      httpRequest.commit = commit
      const resp = axios(httpRequest)

      return resp
    }
  }
}
