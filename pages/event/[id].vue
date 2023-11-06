<template>
    <div class="min-h-screen bg-gray-100 ">
        <div class="relative flex items-center justify-center w-full px-5 pt-5 pb-3">
            <button type="button" @click="navigateTo('/stoplight')" class="hidden xxs:flex gap-2 items-center absolute lg:top-10 lg:left-10 top-5 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <ArrowLeftIcon class="w-4 h-4" />
                Back
            </button>
            <button type="button" @click="navigateTo('/stoplight')" class="xxs:hidden flex gap-2 items-center absolute lg:top-10 lg:left-10 top-5 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <ArrowLeftIcon class="w-4 h-4" />
            </button>
            <img src="../../assets/logo.png" @click="navigateTo('/')" class="h-12 xxs:h-20 cursor-pointer" alt="">
        </div>
        <div class="mycontainer w-full"> 
            <div class="stoplight-cont" v-if="colArray.title1">
                <div id = "outer" class="play-info-container">
                    <h2 class="text-espngray-900 text-xl font-medium" id="title"><strong v-if="colArray.away != ''">{{ Math.round(colArray.away) }}</strong> {{ colArray.title1 }} <strong v-if="colArray.away != ''">{{ Math.round(colArray.home) }}</strong></h2>
                    <h2 class="text-espngray-900 text-xl font-medium" id="title">{{ colArray.title2 }}</h2>
                </div>
                <div class="stop-light" id="stop-light">
                    <div class="bulb bg-stoplight-red">
                        <span><div id="red-cont" class="red-cont">
                            <h1 class="bulb-text w-40 overflow-x-auto" id="red-text">{{ colArray.red }}</h1>
                        </div></span>
                    </div>
                    <div class="bulb bg-stoplight-yellow">
                        <span><div id="y-cont" class="y-cont">
                            <h1 class="bulb-text w-40 overflow-x-auto" id="yellow-text">{{ colArray.yellow }}</h1>
                        </div></span>
                    </div>
                    <div class="bulb bg-stoplight-green">
                        <span><div id="g-cont" class="g-cont">
                            <h1 class="bulb-text w-40 overflow-x-auto" id="green-text">{{ colArray.green }}</h1>
                        </div></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { createClient } from '@supabase/supabase-js'
import { cfbGameStore } from '../stores/CfbStore'
const route = useRoute()
const id = ref(route.params.id)



const store = cfbGameStore()
const events = ref([])
const event = ref({})
const refreshInterval = ref(null)
const refreshTimer = ref(null)
let colArray = ref({})
onMounted(async () => {
  function stopRefresh() {
    clearInterval(refreshInterval.value)
    alert('Timed out, please reload page.')
  }
  refreshTimer.value = setTimeout(stopRefresh, 600000)

  let temp = await store.events
  events.value = temp.events
  event.value = events.value[id.value]

  const supabase = createClient('https://oeaoxcbbfdmnrrujkmwj.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lYW94Y2JiZmRtbnJydWprbXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwNDAyMTYsImV4cCI6MjAxMTYxNjIxNn0.hStQulqxb14rENfHdpTsuBkkWLwkiDiVU8Uj8fCeTGc')
  let fullResponse = await supabase.functions.invoke('cfb-gonogo', {body: {id: event.value.id}})
  let response = fullResponse.data

  if (event.value.status.type.state == 'post') {
    colArray.value = {
      'green': '-',
      'yellow': '-',
      'red': '-',
      'down': '', 
      'distance': '',
      'ydline': '',
      'title1': event.value.shortName,
      'title2': 'Final',
      'home': response.homeScore,
      'away': response.awayScore
    }
  } else if (event.value.status.type.state == 'pre') {
    colArray.value = {
      'green': '',
      'yellow': '',
      'red': '',
      'down': '', 
      'distance': '',
      'ydline': '',
      'title1': event.value.shortName,
      'title2': 'Upcoming',
      'home': '', 
      'away': ''
    }
  } else {
    if (response.playId) {
      if (response.green) {
        let home = ''
        let away = ''
        let ydline = ''
        const gameString = event.value.shortName
        const regex = /(\w+)\s@\s(\w+)/
        const result = regex.exec(gameString)
        if (result !== null) {
          const [_, team1, team2] = result
          const teams = [{ team: team1 }, { team: team2 }]
          home = teams[1].team
          away = teams[0].team
        }
        if (response.yardsToEndzone == response.ballSpot) {
          if (response.yardsToEndzone > 50) {
            ydline = away + ' ' + (100 - response.yardsToEndzone)
          } else {
            ydline = home + ' ' + response.yardsToEndzone
          }
        } else {
          if (response.yardsToEndzone > 50) {
            ydline = home + ' ' + (100 - response.yardsToEndzone)
          } else {
            ydline = away + ' ' + response.yardsToEndzone
          }
        }
        if (response.down == "-1") {
          // let prevPlay = JSON.parse(localStorage.getItem('lastPlay_' + event.value.id))
          // if (!prevPlay) {
            colArray.value = {
              'green': '',
              'yellow': '',
              'red': '',
              'title1': event.value.shortName,
              'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
              'home': response.homeScore,
              'away': response.awayScore
            }
          // } else {
          //   if (response.yardsToEndzone == 0) {
          //     ydline = prevPlay.ydline
          //   }
          //   response.down = prevPlay.down
          //   response.distance = prevPlay.distance
          //   colArray.value = {
          //     'green': response.green,
          //     'yellow': response.yellow,
          //     'red': response.red,
          //     'down': response.down,
          //     'distance': response.distance,
          //     'ydline': ydline,
          //     'title1': event.value.shortName,
          //     'title2': response.down + ((response.down == "1") ? 'st' : ((response.down == "2") ? 'nd' : ((response.down == "3") ? 'rd' : 'th'))) + ' & ' + response.distance + ' at ' + ydline + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
          //     'home': response.homeScore,
          //     'away': response.awayScore
          //   }
          //   localStorage.setItem('lastPlay_' + event.value.id, JSON.stringify(colArray.value))
          // }
        } else {
          if (response.yardsToEndzone == 0) {
            // let prevPlay = JSON.parse(localStorage.getItem('lastPlay_' + event.value.id))
            // if (prevPlay) {
            //   ydline = prevPlay.ydline
            // }
            colArray.value = {
              'green': '',
              'yellow': '',
              'red': '',
              'title1': event.value.shortName,
              'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
              'home': response.homeScore,
              'away': response.awayScore
            }
          } else {
            colArray.value = {
              'green': response.green,
              'yellow': response.yellow,
              'red': response.red,
              'down': response.down,
              'distance': response.distance,
              'ydline': ydline,
              'title1': event.value.shortName,
              'title2': response.down + ((response.down == "1") ? 'st' : ((response.down == "2") ? 'nd' : ((response.down == "3") ? 'rd' : 'th'))) + ' & ' + response.distance + ' at ' + ydline + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
              'home': response.homeScore,
              'away': response.awayScore
            }
          }
          // localStorage.setItem('lastPlay_' + event.value.id, JSON.stringify(colArray.value))
        }
      } else {
          // colArray.value = JSON.parse(localStorage.getItem('lastPlay_' + event.value.id))
          // if (!colArray.value) {
            colArray.value = {
              'green': '',
              'yellow': '',
              'red': '',
              'down': '', 
              'distance': '',
              'ydline': '',
              'title1': event.value.shortName,
              'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
              'home': response.homeScore,
              'away': response.awayScore
            }
          // }
      }
    } else {
      colArray.value = {
        'green': '',
        'yellow': '',
        'red': '',
        'down': '', 
        'distance': '',
        'ydline': '',
        'title1': event.value.shortName,
        'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
        'home': response.homeScore,
        'away': response.awayScore
      }
    }

    async function refreshing() {
      let temp = await store.events
      events.value = temp.events
      event.value = events.value[id.value]
      if (event.value.status.type.state == 'post') {
        colArray.value = {
          'green': '-',
          'yellow': '-',
          'red': '-',
          'down': '', 
          'distance': '',
          'ydline': '',
          'title1': event.value.shortName,
          'title2': 'Final',
          'home': response.homeScore,
          'away': response.awayScore
        }
        clearInterval(refreshInterval.value)
        clearTimeout(refreshTimer.value)
      } else {
        let fullResponse = await supabase.functions.invoke('cfb-gonogo', {body: {id: event.value.id}})
        let response = fullResponse.data

        if (response.playId) {
          if (response.green) {
            let home = ''
            let away = ''
            let ydline = ''
            const gameString = event.value.shortName
            const regex = /(\w+)\s@\s(\w+)/
            const result = regex.exec(gameString)
            if (result !== null) {
              const [_, team1, team2] = result
              const teams = [{ team: team1 }, { team: team2 }]
              home = teams[1].team
              away = teams[0].team
            }
            if (response.yardsToEndzone == response.ballSpot) {
              if (response.yardsToEndzone > 50) {
                ydline = away + ' ' + (100 - response.yardsToEndzone)
              } else {
                ydline = home + ' ' + response.yardsToEndzone
              }
            } else {
              if (response.yardsToEndzone > 50) {
                ydline = home + ' ' + (100 - response.yardsToEndzone)
              } else {
                ydline = away + ' ' + response.yardsToEndzone
              }
            }
            if (response.down == "-1") {
                colArray.value = {
                  'green': '',
                  'yellow': '',
                  'red': '',
                  'title1': event.value.shortName,
                  'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
                  'home': response.homeScore,
                  'away': response.awayScore
                }
            } else {
              if (response.yardsToEndzone == 0) {
                colArray.value = {
                  'green': '',
                  'yellow': '',
                  'red': '',
                  'title1': event.value.shortName,
                  'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
                  'home': response.homeScore,
                  'away': response.awayScore
                }
              } else {
                colArray.value = {
                  'green': response.green,
                  'yellow': response.yellow,
                  'red': response.red,
                  'down': response.down,
                  'distance': response.distance,
                  'ydline': ydline,
                  'title1': event.value.shortName,
                  'title2': response.down + ((response.down == "1") ? 'st' : ((response.down == "2") ? 'nd' : ((response.down == "3") ? 'rd' : 'th'))) + ' & ' + response.distance + ' at ' + ydline + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
                  'home': response.homeScore,
                  'away': response.awayScore
                }
              }
            }
          } else {
                colArray.value = {
                  'green': '',
                  'yellow': '',
                  'red': '',
                  'down': '', 
                  'distance': '',
                  'ydline': '',
                  'title1': event.value.shortName,
                  'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
                  'home': response.homeScore,
                  'away': response.awayScore
                }
          }
        } else {
          colArray.value = {
            'green': '',
            'yellow': '',
            'red': '',
            'down': '', 
            'distance': '',
            'ydline': '',
            'title1': event.value.shortName,
            'title2': 'Waiting for Next Set of Downs' + ' (' + ((event.value.status.period < 2) ? '1Q)' : ((event.value.status.period < 5) ? event.value.status.period + 'Q)' : event.value.status.period - 4 + 'OT)')),
            'home': response.homeScore,
            'away': response.awayScore
          }
        }
      }
    }
    refreshInterval.value = setInterval(() => refreshing(), 3000);
  } 
})

onBeforeUnmount(() => {
  // console.log('destroyed')
  clearInterval(refreshInterval.value)
  clearTimeout(refreshTimer.value)
})
</script>

<style scoped>
* {
	margin: 0 auto 0 auto;
	text-align: center;
}

html {
	overflow-y: scroll;
}

.stoplight-cont {
  margin: auto;
  /*border: 2px solid green;*/
  padding: 0px;
}

.mycontainer {
  display: flex;
  padding: 0px 0px 20px 0px;
  /*border: solid blue 2px;*/
}

.logo {
  margin: 20px 0px 10px 0px;
}

.stop-light {
  height: 550px;
  width: 230px;
  background-color: #333;
  border: solid #333 1px;
  border-radius: 40px;
}

.play-info-container {
  /* height: 27.5px; */
  /* width: 250px; */
  /*border: solid red 1px;*/
  padding: 0px;
}

.play-info-container2 {
  height: 17.5px;
  width: 250px;
  /*border: solid blue 1px; */
  padding: 0px 0px 5px 2.5px;
}

.bulb {
  height: 170px;
  width: 170px;
  border-radius: 50%;
  vertical-align: center;
  line-height: 170px;
  margin-top: 10px;
}

span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#g-cont, #y-cont {
  /* height: 60px; */
}

h1 {
  font-size: 55px;
}

h3 {
  font-size: 36px;
}

p {
  font-size: 25px;
  color: #1B242C;
}

.p-cont {
  height: 25px;
  width: 150px;
}
</style>