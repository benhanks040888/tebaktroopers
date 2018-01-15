import axios from 'axios'

export default {
  get (url, callback) {
    axios.get(url)
      .then(response => {
        callback(response)
      })
      .catch(e => {
        callback(e)
      })
  }
}
