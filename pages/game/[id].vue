<template>
  <div class="min-h-screen bg-gray-100 ">
    <div class="relative flex items-center justify-center w-full p-5">
      <button type="button" @click="navigateTo('/decision')" class="hidden xs:flex gap-2 items-center absolute lg:top-10 lg:left-10 top-5 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <ArrowLeftIcon class="w-4 h-4" />
        Back
      </button>
      <button type="button" @click="navigateTo('/decision')" class="xs:hidden flex gap-2 items-center absolute lg:top-10 lg:left-10 top-5 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <ArrowLeftIcon class="w-4 h-4" />
      </button>
      <img src="../../assets/logo.png" class="h-12 xs:h-20" alt="">
    </div>
    <div class="flex justify-center p-10 px-auto">
      <ul role="list" class="flex flex-wrap justify-start gap-10 h-fit w-fit">
        <div v-for="play in games[id]" :key="play.Game" class="flip-card bg-white xs:w-96 w-[300px] h-[240px] xs:h-[263px]" @click="setFlip(play)" @mouseenter="flipIt(play)" @mouseleave="flipBack(play)">
          <div :class="play.flipClass" class="shadow flip-card-inner rounded-xl">
            <!-- Card Front -->
            <div class="flip-card-front">
              <div class="relative flex items-center p-6 border-b bg-gray-50 gap-x-4 border-gray-900/5 rounded-t-xl">
                <CursorArrowRaysIcon class="absolute w-4 h-4 text-gray-900 top-1 right-1 animate-pulse lg:hidden" />
                <img :src="getTeamLogo(play.team)" alt="logo" class="flex-none object-cover w-12 h-12 bg-white rounded-lg ring-1 ring-gray-900/10" />
                <div>
                  <div class="text-sm font-medium leading-6 text-gray-900" v-if="play.QUARTER_STATUS < 5">{{ 'Q' + play.QUARTER_STATUS + ' - ' + play.CLOCK_TIME }}</div>
                  <div class="text-sm font-medium leading-6 text-gray-900" v-else-if="play.QUARTER_STATUS > 5">{{ play.QUARTER_STATUS - 4 + 'OT - ' + play.CLOCK_TIME }}</div>
                  <div class="text-sm font-medium leading-6 text-gray-900" v-else>{{ 'OT - ' + play.CLOCK_TIME }}</div>
                  <div class="text-sm text-gray-700">{{ getScoreText(play.scorediff) }}</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto text-right">
                  <div class="text-sm font-medium">4th & {{ play.STARTPLAY_DISTANCE }}</div>
                  <div class="text-sm text-gray-700">{{ play.STARTPLAY_YARDSTOEZ }}</div>
                </div>
              </div>
              <dl class="px-6 py-4 -my-3 overflow-hidden text-xs xs:text-sm leading-6 bg-white divide-y divide-gray-100 rounded-b-xl">
                <div class="flex justify-between py-2 xs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xs:hidden">W%</dt>
                  <dt class="text-gray-500 hidden xs:block">Win %</dt>
                  <dd class="flex gap-2 xs:gap-4">
                    <div class="flex items-center gap-1" v-if="play.winProbPunt && play.ydline > 30">
                      <div class="badge-yellow">P</div>
                      <div class="text-gray-600">{{ play.winProbPunt + "%" }}</div>
                    </div>
                    <div class="flex items-center gap-1" v-if="play.winProbFG && play.ydline <= 55">
                      <div class="badge-purple">FG</div>
                      <div class="text-gray-600">{{ play.winProbFG + "%" }}</div>
                    </div>
                    <div class="flex items-center gap-1" v-if="play.winProbGo">
                      <div class="badge-green">Go</div>
                      <div class="text-gray-600">{{ play.winProbGo + "%" }}</div>
                    </div>
                  </dd>
                </div>
                <div class="flex justify-between py-2 xs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xs:hidden">Rec</dt>
                  <dt class="text-gray-500 hidden xs:block">Recomendation</dt>
                  <dd class="flex gap-2 text-gray-700">
                    <div class="text-green-500">{{ getAbsoluteValue(play.goKickDelta) }}</div>
                    <div :class="getBadge(play.Rec)">{{ translateText(play.Rec) }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-2 xs:py-3 gap-x-4">
                  <dt class="flex gap-1 text-gray-500">Decision</dt>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getBadge(play.play)">{{ translateText(play.play) }}</div>
                  </dd>
                </div>
              </dl>
            </div>
            <!-- Card Back -->
            <div class="bg-white flip-card-back rounded-xl">
              <dl class="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-gray-100">
                <div class="flex justify-between py-3 gap-x-4" v-if="play.ydline <= 55">
                  <dt class="text-gray-500">Field Goal Chance</dt>
                  <dd class="flex items-start gap-x-2">
                    <div>{{ play.fgprob + '%' }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4">
                  <dt class="text-gray-500">First Down Chance</dt>
                  <dd class="flex items-start gap-x-2">
                    <div>{{ play.firstdnprob + '%' }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4">
                  <dt class="text-gray-500">Break-even</dt>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getColor(play.breakEvenGo, play.firstdnprob)">{{ play.breakEvenGo + '%' }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4 h-24 overflow-y-scroll" v-if="play.ydline <= 55">
                  <dt class="text-gray-500">{{ play.text }}</dt>
                </div>
                <div class="flex justify-between py-3 gap-x-4 h-36 overflow-y-scroll" v-else>
                  <dt class="text-gray-500">{{ play.text }}</dt>
                </div>
              </dl>
            </div>
          </div>
        </div>

      </ul>
    </div>
  </div>
</template>

<script setup>
import { CursorArrowRaysIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
const route = useRoute()
const id = ref(route.params.id)

import { useGameStore } from '../stores/GameStore'
const store = useGameStore()
const games = ref([])
const scores = ref(null)
onMounted(async () => {
  games.value = await store.games
  scores.value = await store.scores
  
  games.value[id.value] = games.value[id.value].filter(f => {
    return !(translateText(f.play) == 'Punt' && f.ydline <= 30) && !(translateText(f.play) == 'Field Goal' && f.ydline > 55)
  })
  // console.log(store.scores)
})

const getTeamLogo = (str) => {
  // console.log(str)
  if (str == 'NYG') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png'
  if (str == 'SF') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/sf.png'
  if (str == 'IND') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ind.png'
  if (str == 'BLT') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/bal.png'
  if (str == 'TEN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ten.png'
  if (str == 'CLV') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cle.png'
  if (str == 'ATL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/atl.png'
  if (str == 'DET') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/det.png'
  if (str == 'NO') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/no.png'
  if (str == 'GB') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/gb.png'
  if (str == 'HST') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/hou.png'
  if (str == 'JAX') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/jax.png'
  if (str == 'DEN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/den.png'
  if (str == 'MIA') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/mia.png'
  if (str == 'LAC') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lac.png'
  if (str == 'MIN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/min.png'
  if (str == 'NE') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ne.png'
  if (str == 'NYJ') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyj.png'
  if (str == 'BUF') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/buf.png'
  if (str == 'WSH' || str == 'WAS') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/wsh.png'
  // Guesses
  if (str == 'ARZ' || str == 'AR' || str == 'ARI') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ari.png'
  if (str == 'CAR' || str == 'CAL' || str == 'CR') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/car.png'
  if (str == 'CHI') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/chi.png'
  if (str == 'CIN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cin.png'
  if (str == 'DAL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/dal.png'
  if (str == 'KA' || str == 'KAN' || str == 'KC') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/kc.png'
  if (str == 'LAS' || str == 'LV' || str == 'LAV') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lv.png'
  if (str == 'LOS' || str == 'LSA' || str == 'LAR' || str == 'LA') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lar.png'
  if (str == 'PIT' || str == 'PT') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/pit.png'
  if (str == 'SEA' || str == 'SET' || str == 'SAT') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/sea.png'
  if (str == 'TAM' || str == 'TAB' || str == 'TB' || str == 'TA') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/tam.png'
  if (str == 'PHI' || str == 'PHL' || str == 'PIL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/phi.png'
}

const translateText = (str) => {
  if (str == 'P') return 'Punt'
  if (str == 'FG') return 'Field Goal'
  else return 'Go'
}
const getBadge = (str) => {
  if (str == 'P') return 'badge-yellow'
  if (str == 'FG') return 'badge-purple'
  else return 'badge-green'
}
const getAbsoluteValue = (str) => {
  str = str.toString()
  if (str.charAt(0) === '-') return "( +" + str.slice(1) + "% )";
  else return "( +" + str + "% )"
}
const getScoreText = (score) => {
  if (score == 0) return 'Tied'
  else if (score < 0) return 'Down ' + score.toString().slice(1)
  else return 'Up ' + score
}
const getColor = (beProb, fdProb) => {
  if(beProb < fdProb) return 'text-green-600'
  else return 'text-red-600'
}
const setFlip = (play) => {
  if (window.innerWidth < 640) {
    if (play.flipClass) play.flipClass = ''
    else play.flipClass = 'flip-card-hover'
  }
}
const flipIt = (play) => {
  if (window.innerWidth >= 640) play.flipClass = 'flip-card-hover'
}
const flipBack = (play) => {
  if (window.innerWidth >= 640) play.flipClass = ''
}
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  /* width: 300px;
  height: 300px; */
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
}
/* lg:hover:rotate-y-180  */
/* .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
} */

.flip-card-hover {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  /* background-color: #bbb; */
  /* color: black; */
}

.flip-card-back {
  /* background-color: #2980b9; */
  /* color: white; */
  transform: rotateY(180deg);
}
</style>