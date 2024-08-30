import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {

  var weeksArray = ref([])
  const weeksTable = computed(async () => {
    if (weeksArray > 0) return weeksArray
    else {
      const weeksResponse = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&limit=1000')
      weeksArray = weeksResponse
      return weeksArray
    }
  })

  return { weeksTable, weeksArray }
})