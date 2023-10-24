import { defineStore } from 'pinia'

export const cfbGameStore = defineStore('event', () => {

    var eventArray = ref([])
    const events = computed(async () => {
        if (eventArray > 0) return eventArray
        else {
        const eventResponse = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80')
        eventArray = eventResponse
        return eventArray
        }
    })

    return { eventArray, events }
})