import axios from 'axios'

export default {
  getQuestions (callback) {
    axios.get('static/people.json')
      .then(response => {
        callback(null, response)
      })
      .catch(e => {
        callback(e)
      })
  },

  getHighScores (callback) {
    let url = 'api/scores'
    axios.get(url)
      .then(response => {
        callback(null, response)
      })
      .catch(e => {
        callback(e)
      })
  },

  saveHighScore ({ user, score }, callback) {
    let url = 'api/scores'
    axios.post(url, {
      name: user,
      score
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        callback(null, response)
      })
      .catch(e => {
        callback(e)
      })
  },

  shuffle (array) {
    let newArr = array.slice()

    for (var i = newArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = newArr[j]
      newArr[j] = newArr[i]
      newArr[i] = temp
    }

    return newArr
  },

  generateIDs (array) {
    array.forEach((val, index) => {
      array[index].id = index
    })

    return array
  },

  getAnswerOptions (questions, totalQuestions, currentQuestionId) {
    let options = []
    options.push(currentQuestionId)

    while (options.length < 4) {
      let randomNumber = Math.floor(Math.random() * totalQuestions)
      if (!options.includes(randomNumber)) {
        options.push(randomNumber)
      }
    }

    options = this.shuffle(options)

    return [
      questions[options[0]],
      questions[options[1]],
      questions[options[2]],
      questions[options[3]]
    ]
  }
}
