import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Game from '@/components/Game'
import Highscore from '@/components/Highscore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/highscore',
      name: 'Highscore',
      component: Highscore
    }
  ]
})
