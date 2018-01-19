import { Howl } from 'howler'

const correct = new Howl({
  src: ['../../static/sounds/correct.mp3', '../../static/sounds/correct.ogg'],
  volume: 0.5
})

const wrong = new Howl({
  src: ['../../static/sounds/wrong.mp3', '../../static/sounds/wrong.ogg'],
  volume: 0.5
})

const state = {
  sound: true
}

const getters = {
  sound: state => state.sound
}
