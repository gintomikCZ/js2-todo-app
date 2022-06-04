import axios from 'axios'

axios.defaults.baseURL = 'https://sdaapi.glabazna.eu'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'json'

const checkUrl = (url) => {
  return url.substr(0, 1) === '/' ? url : '/' + url
}


export default {

  // načítá záznam(y)
  // get(players) - načte záznamy všech hráčů
  // get(players/1) - načte 1 záznam hráče s id 1
  get (path) {
    return axios({
      method: 'get',
      url: checkUrl(path),
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },

  // import db from './utils/db.js'
  // db.get('projects').then((data) => {
  //   console.log(data)
  // })
  // načtu všechny záznamy z tabulky 'projects'

  // import db from './utils/db.js'
  // db.get('projects/5').then((record) => {
  //   console.log(record)
  // })
  // načtu jeden záznam s id 5


  // ukládá nový záznam
  post (path, body) {
    return axios({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },
  // chceme uložit nový záznam do tabulky 'projects'
  // import db from './utils.js'
  // db.post('projects', {
  //  project: 'název projektu',
  //  description: 'nějaký text',
  //  start: '2022-01-01',
  //  ends: '2022-02-01',
  // }).then(() => {
  //    console.log('nový záznam byl uložen')
  //  })


  // edituje existující záznam
  // id se může psát do url, stejně tak do body
  put (path, body) {
    return axios({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },
  // chceme editovat záznam z tabulky 'projects' s id 5
  // import db from './utils.js'
  // db.put('projects', {
  //  id: 5,
  //  project: 'jiný název projektu',
  //  description: 'jiný text',
  // }).then(() => {
  //    console.log('záznam byl editován')
  //  })



  // maže záznam s daným id
  // id může být v url nebo v body
  delete (path, body) {
    return axios({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  }

  // chceme vymazat záznam z tabulky 'projects' s id 5
  // import db from './utils.js'
  // db.delete('projects', {
  //  id: 5
  // }).then(() => {
  //    console.log('záznam byl smazán')
  // })


}