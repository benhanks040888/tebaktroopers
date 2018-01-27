import axios from 'axios'
// import qs from 'qs'

export default {
  getQuestions (callback) {
    axios.get('static/troopers.json')
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

  saveHighScore ({ user, score, wrongAnswer }, callback) {
    let url = 'api/scores'
    axios.post(url, {
      name: user,
      score,
      wrong_answer: wrongAnswer
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

  getAnswerOptions (questions, totalQuestions, currentQuestion) {
    let options = []
    options.push({
      id: currentQuestion.id,
      name: currentQuestion.name
    })

    if (currentQuestion.dummies) {
      currentQuestion.dummies.map(option => {
        options.push({
          id: -1,
          name: option
        })
      })
    }

    let questionsByGender = questions.filter(e => e.gender === currentQuestion.gender)

    while (options.length < 4) {
      let randomNumber = Math.floor(Math.random() * questionsByGender.length)

      if (options.filter(e => e.id === randomNumber).length === 0) {
        let q = questionsByGender[randomNumber]
        options.push({
          id: q.id,
          name: q.name
        })
      }
    }

    // console.log(options)

    options = this.shuffle(options)

    return [
      options[0],
      options[1],
      options[2],
      options[3]
    ]
  }
}
