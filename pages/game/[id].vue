<template>
  <Head>
      <Title>{{ (games[id] ? games[id][0].Game : '') }} Live 4th Downs - ESPN Analytics</Title>
      <Meta property="og:title" :content="(games[id] ? games[id][0].Game : '') + ' Live 4th Downs - ESPN Analytics'"/>
      <Meta property="og:site_name" :content="(games[id] ? games[id][0].Game : '') + ' Live 4th Downs - ESPN Analytics'" />
      <Meta property="og:url" content="https://www.espnanalytics.com/decision" />
      <Meta name="twitter:url" content="https://www.espnanalytics.com/decision" />
      <Meta name="twitter:title" :content="(games[id] ? games[id][0].Game : '') + ' Live 4th Downs - ESPN Analytics'"/>
      <Meta name="title" :content="(games[id] ? games[id][0].Game : '') + ' Live 4th Downs - ESPN Analytics'"/>
  </Head>
  <div class="min-h-screen bg-espngray-100 pt-12">
    <Header></Header>
    <div class="relative flex items-center justify-center w-full p-5 pt-12">
      <button type="button" @click="navigateTo('/decision')" class="hidden xxs:flex gap-2 items-center absolute lg:top-12 lg:left-10 top-12 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <ArrowLeftIcon class="w-4 h-4" />
        Back
      </button>
      <button type="button" @click="navigateTo('/decision')" class="xxs:hidden flex gap-2 items-center absolute lg:top-12 lg:left-10 top-12 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <ArrowLeftIcon class="w-4 h-4" />
      </button>
      <!-- <img src="../../assets/logo.png" @click="navigateTo('/')" class="h-12 xxs:h-20 cursor-pointer" alt=""> -->
    </div>

    <div class="flex justify-center p-10 px-0 xxs:px-auto absolute top-[120px] opacity-0">
      <ul role="list" class="flex flex-wrap justify-start gap-10 h-fit w-fit">
        <div v-for="(play, i) in games[id]" :key="`${play.Game}hidden`" class="flip-card bg-white xxs:w-96 w-[300px] h-[240px] xxs:h-[263px]" @click="setFlip(play, $event)" @mousemove="flipIt(play, $event)" @mouseenter="flipIt(play, $event)" @mouseleave="flipBack(play, $event)">
          <div :class="play.flipClass" class="shadow flip-card-inner rounded-xl">
            <!-- Card Front -->
            <div class="flip-card-front" ref="captureFront">
              <div class="absolute bottom-2 left-1/4 xxs:left-[30%] underline text-xs text-cyan-900">espnanalytics.com/decision</div>
              <div class="relative flex items-center p-6 border-b bg-gray-50 gap-x-4 border-gray-900/5 rounded-t-xl">                
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
              <dl class="px-6 py-4 -my-3 overflow-hidden text-xs xxs:text-sm leading-6 bg-white divide-y divide-gray-100 rounded-b-xl">
                <div class="flex justify-between py-2 xxs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xxs:hidden">W%</dt>
                  <dt class="text-gray-500 hidden xxs:block">Win %</dt>
                  <dd class="flex gap-2 xxs:gap-4">
                    <div class="flex items-center gap-1" v-if="play.winProbPunt && play.ydline > 30">
                      <div class="badge-red">P</div>
                      <div class="text-gray-600">{{ play.winProbPunt + "%" }}</div>
                    </div>
                    <div class="flex items-center gap-1" v-if="play.winProbFG && play.ydline <= 55">
                      <div class="badge-blue">FG</div>
                      <div class="text-gray-600">{{ play.winProbFG + "%" }}</div>
                    </div>
                    <div class="flex items-center gap-1" v-if="play.winProbGo">
                      <div class="badge-green">Go</div>
                      <div class="text-gray-600">{{ play.winProbGo + "%" }}</div>
                    </div>
                  </dd>
                </div>
                <div class="flex justify-between py-2 xxs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xxs:hidden">Rec</dt>
                  <dt class="text-gray-500 hidden xxs:block">Recommendation</dt>
                  <dd class="flex gap-2 text-gray-700">
                    <div class="text-green-500">{{ getAbsoluteValue(play.goKickDelta) }}</div>
                    <div :class="getBadge(play.Rec)">{{ translateText(play.Rec) }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-2 xxs:py-3 gap-x-4">
                  <dt class="flex gap-1 text-gray-500">Decision</dt>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getBadge(play.play)">{{ translateText(play.play) }}</div>
                  </dd>
                </div>
              </dl>
            </div>
            <!-- Card Back -->
            <div class="bg-white flip-card-back-fake rounded-xl" ref="captureBack">
              <div class="absolute bottom-2 left-1/4 xxs:left-[30%] underline text-xs text-cyan-900">espnanalytics.com/decision</div>
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
                <div class="flex justify-between py-3 gap-x-4 h-24 overflow-y-hidden" v-if="play.ydline <= 55">
                  <dt class="text-gray-500">{{ play.text + getPlayWP(play.UNQPLY_GROUP, play.team) }}</dt>
                </div>
                <div class="flex justify-between py-3 gap-x-4 h-36 overflow-y-hidden" v-else>
                  <dt class="text-gray-500">{{ play.text + getPlayWP(play.UNQPLY_GROUP, play.team) }}</dt>
                </div>
              </dl>
            </div>
          </div>
        </div>

      </ul>
    </div>
    
    <div class="flex justify-center p-10 px-auto">
      <ul role="list" class="flex flex-wrap justify-start gap-10 h-fit w-fit">
        <div v-for="(play, i) in games[id]" :key="play.Game" class="flip-card bg-white xxs:w-96 w-[300px] h-[240px] xxs:h-[263px]" @click="setFlip(play, $event)" @mousemove="flipIt(play, $event)" @mouseenter="flipIt(play, $event)" @mouseleave="flipBack(play, $event)">
          <div :class="play.flipClass" class="shadow flip-card-inner rounded-xl">
            <!-- Card Front -->
            <div class="flip-card-front">
              <div class="relative flex items-center p-6 border-b bg-gray-50 gap-x-4 border-gray-900/5 rounded-t-xl">
                <CursorArrowRaysIcon class="absolute w-4 h-4 text-gray-900 top-1 left-1 animate-pulse sm:hidden" />
                <ArrowUpOnSquareIcon class="block lg:hidden absolute w-5 h-5 text-gray-900 top-0 right-0 cursor-pointer mx-4 my-10" @click="expCard(true, i)"/>
                <svg class="hidden lg:block absolute w-4 h-4 text-gray-900 top-0 right-0 cursor-pointer mx-4 my-10" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" @click="expCard(true, i)"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>
                <img :src="getTeamLogo(play.team)" alt="logo" class="flex-none object-cover w-12 h-12 bg-white rounded-lg ring-1 ring-gray-900/10" />
                <div>
                  <div class="text-sm font-medium leading-6 text-gray-900" v-if="play.QUARTER_STATUS < 5">{{ 'Q' + play.QUARTER_STATUS + ' - ' + play.CLOCK_TIME }}</div>
                  <div class="text-sm font-medium leading-6 text-gray-900" v-else-if="play.QUARTER_STATUS > 5">{{ play.QUARTER_STATUS - 4 + 'OT - ' + play.CLOCK_TIME }}</div>
                  <div class="text-sm font-medium leading-6 text-gray-900" v-else>{{ 'OT - ' + play.CLOCK_TIME }}</div>
                  <div class="text-sm text-gray-700">{{ getScoreText(play.scorediff) }}</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto text-right pr-8">
                  <div class="text-sm font-medium">4th & {{ play.STARTPLAY_DISTANCE }}</div>
                  <div class="text-sm text-gray-700">{{ play.STARTPLAY_YARDSTOEZ }}</div>
                </div>
              </div>
              <dl class="px-6 py-4 -my-3 overflow-hidden text-xs xxs:text-sm leading-6 bg-white divide-y divide-gray-100 rounded-b-xl">
                <div class="flex justify-between py-2 xxs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xxs:hidden">W%</dt>
                  <dt class="text-gray-500 hidden xxs:block">Win %</dt>
                  <dd class="flex gap-2 xxs:gap-4">
                    <div class="flex items-center gap-1" v-if="play.winProbPunt && play.ydline > 30">
                      <div class="badge-red">P</div>
                      <div class="text-gray-600">{{ play.winProbPunt + "%" }}</div>
                    </div>
                    <div class="flex items-center gap-1" v-if="play.winProbFG && play.ydline <= 55">
                      <div class="badge-blue">FG</div>
                      <div class="text-gray-600">{{ play.winProbFG + "%" }}</div>
                    </div>
                    <div class="flex items-center gap-1" v-if="play.winProbGo">
                      <div class="badge-green">Go</div>
                      <div class="text-gray-600">{{ play.winProbGo + "%" }}</div>
                    </div>
                  </dd>
                </div>
                <div class="flex justify-between py-2 xxs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xxs:hidden">Rec</dt>
                  <dt class="text-gray-500 hidden xxs:block">Recommendation</dt>
                  <dd class="flex gap-2 text-gray-700">
                    <div class="text-green-500">{{ getAbsoluteValue(play.goKickDelta) }}</div>
                    <div :class="getBadge(play.Rec)">{{ translateText(play.Rec) }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-2 xxs:py-3 gap-x-4">
                  <dt class="flex gap-1 text-gray-500">Decision</dt>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getBadge(play.play)">{{ translateText(play.play) }}</div>
                  </dd>
                </div>
              </dl>
            </div>
            <!-- Card Back -->
            <div class="bg-white flip-card-back rounded-xl">
              <ArrowUpOnSquareIcon class="block lg:hidden absolute w-5 h-5 text-gray-900 top-0 right-0 cursor-pointer mx-4 my-10" @click="expCard(false, i)"/>
              <svg class="hidden lg:block absolute w-4 h-4 text-gray-900 top-0 right-0 cursor-pointer mx-4 my-10" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" @click="expCard(false, i)"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>
              <dl class="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-gray-100">
                <div class="flex justify-between py-3 gap-x-4 mr-8" v-if="play.ydline <= 55">
                  <dt class="text-gray-500">Field Goal Chance</dt>
                  <dd class="flex items-start gap-x-2">
                    <div>{{ play.fgprob + '%' }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4 mr-8">
                  <dt class="text-gray-500">First Down Chance</dt>
                  <dd class="flex items-start gap-x-2">
                    <div>{{ play.firstdnprob + '%' }}</div>
                  </dd>
                </div>
                <div class="relative flex justify-between py-3 gap-x-4 pr-8" v-if="play.ydline <= 55">
                  <InformationCircleIcon class="absolute left-[4.75rem] top-3.5 w-5 h-5" @click="setToolTip(play)" @mouseenter="flipTool(play)" @mouseleave="flipToolBack(play)"/>
                  <dt class="text-gray-500">Break-even</dt>
                  <div :class="play.toolClass" class="absolute left-[6.25rem] top-1 text-center inline-flex items-center rounded-full bg-espncyan-50 text-espncyan-900 ring-1 ring-inset ring-espncyan-200/10 text-xs w-[9.5rem] py-1 px-1.5">The minimum first down chance that favors Go</div>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getColor(play.breakEvenGo, play.firstdnprob)">{{ play.breakEvenGo + '%' }}</div>
                  </dd>
                </div>
                <div class="relative flex justify-between py-3 gap-x-4 mr-8" v-else>
                  <InformationCircleIcon class="absolute left-[4.75rem] top-3.5 w-5 h-5" @click="setToolTip(play)" @mouseenter="flipTool(play)" @mouseleave="flipToolBack(play)"/>
                  <dt class="text-gray-500">Break-even</dt>
                  <div :class="play.toolClass" class="absolute left-[6.25rem] top-1 text-center inline-flex items-center rounded-full bg-espncyan-50 text-espncyan-900 ring-1 ring-inset ring-espncyan-200/10 text-xs w-[9.5rem] py-1 px-1.5">The minimum first down chance that favors Go</div>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getColor(play.breakEvenGo, play.firstdnprob)">{{ play.breakEvenGo + '%' }}</div>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4 h-24 overflow-y-auto" v-if="play.ydline <= 55">
                  <dt class="text-gray-500">{{ play.text + getPlayWP(play.UNQPLY_GROUP, play.team) }}</dt>
                </div>
                <div class="flex justify-between py-3 gap-x-4 h-36 overflow-y-auto" v-else>
                  <dt class="text-gray-500">{{ play.text + getPlayWP(play.UNQPLY_GROUP, play.team) }}</dt>
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
import { CursorArrowRaysIcon, ArrowLeftIcon, ArrowUpOnSquareIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import domtoimage from 'dom-to-image'
const route = useRoute()
const id = ref(route.params.id)

import { useGameStore } from '../stores/GameStore'
const store = useGameStore()
const games = ref([])
const scores = ref(null)
const captureFront = ref([])
const captureBack = ref([])
const showToolTip = ref(null)
const playsArr = ref([])
showToolTip.value = 'hidden'
onMounted(async () => {
  games.value = await store.games
  scores.value = await store.scores
  
  const initRes = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=' + games.value[id.value][0].EVENT_ID)
  playsArr.value = initRes.winprobability
  // games.value[id.value] = games.value[id.value].filter(f => {
  //   return !(translateText(f.play) == 'Punt' && f.ydline <= 30) && !(translateText(f.play) == 'Field Goal' && f.ydline > 55)
  // })
  // console.log(games.value)
})

const getTeamLogo = (str) => {
  if (str == 'NYG') return new URL('../../assets/nfl_logo/nyg.png', import.meta.url)
  if (str == 'SF') return new URL('../../assets/nfl_logo/sf.png', import.meta.url)
  if (str == 'IND') return new URL('../../assets/nfl_logo/ind.png', import.meta.url)
  if (str == 'BLT' || str == 'BAL') return new URL('../../assets/nfl_logo/bal.png', import.meta.url)
  if (str == 'TEN') return new URL('../../assets/nfl_logo/ten.png', import.meta.url)
  if (str == 'CLV' || str == 'CLE') return new URL('../../assets/nfl_logo/cle.png', import.meta.url)
  if (str == 'ATL') return new URL('../../assets/nfl_logo/atl.png', import.meta.url)
  if (str == 'DET') return new URL('../../assets/nfl_logo/det.png', import.meta.url)
  if (str == 'NO') return new URL('../../assets/nfl_logo/no.png', import.meta.url)
  if (str == 'GB') return new URL('../../assets/nfl_logo/gb.png', import.meta.url)
  if (str == 'HST' || str == 'HOU') return new URL('../../assets/nfl_logo/hou.png', import.meta.url)
  if (str == 'JAX') return new URL('../../assets/nfl_logo/jax.png', import.meta.url)
  if (str == 'DEN') return new URL('../../assets/nfl_logo/den.png', import.meta.url)
  if (str == 'MIA') return new URL('../../assets/nfl_logo/mia.png', import.meta.url)
  if (str == 'LAC') return new URL('../../assets/nfl_logo/lac.png', import.meta.url)
  if (str == 'MIN') return new URL('../../assets/nfl_logo/min.png', import.meta.url)
  if (str == 'NE') return new URL('../../assets/nfl_logo/ne.png', import.meta.url)
  if (str == 'NYJ') return new URL('../../assets/nfl_logo/nyj.png', import.meta.url)
  if (str == 'BUF') return new URL('../../assets/nfl_logo/buf.png', import.meta.url)
  if (str == 'WSH' || str == 'WAS') return new URL('../../assets/nfl_logo/wsh.png', import.meta.url)
  if (str == 'ARZ' || str == 'AR' || str == 'ARI') return new URL('../../assets/nfl_logo/ari.png', import.meta.url)
  if (str == 'CAR' || str == 'CAL' || str == 'CR') return new URL('../../assets/nfl_logo/car.png', import.meta.url)
  if (str == 'CHI') return new URL('../../assets/nfl_logo/chi.png', import.meta.url)
  if (str == 'CIN') return new URL('../../assets/nfl_logo/cin.png', import.meta.url)
  if (str == 'DAL') return new URL('../../assets/nfl_logo/dal.png', import.meta.url)
  if (str == 'KA' || str == 'KAN' || str == 'KC') return new URL('../../assets/nfl_logo/kc.png', import.meta.url)
  if (str == 'LAS' || str == 'LV' || str == 'LAV') return new URL('../../assets/nfl_logo/lv.png', import.meta.url)
  if (str == 'LOS' || str == 'LSA' || str == 'LAR' || str == 'LA') return new URL('../../assets/nfl_logo/lar.png', import.meta.url)
  if (str == 'PIT' || str == 'PT') return new URL('../../assets/nfl_logo/pit.png', import.meta.url)
  if (str == 'SEA' || str == 'SET' || str == 'SAT') return new URL('../../assets/nfl_logo/sea.png', import.meta.url)
  if (str == 'TAM' || str == 'TAB' || str == 'TB' || str == 'TA') return new URL('../../assets/nfl_logo/tb.png', import.meta.url)
  if (str == 'PHI' || str == 'PHL' || str == 'PIL') return new URL('../../assets/nfl_logo/phi.png', import.meta.url)
}

const getTeamAbbr = (str) => {
  if (str == 'BLT' || str == 'BAL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/bal.png'
  if (str == 'CLV' || str == 'CLE') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cle.png'
  if (str == 'HST' || str == 'HOU') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/hou.png'
  if (str == 'WSH' || str == 'WAS') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/wsh.png'
  if (str == 'ARZ' || str == 'AR' || str == 'ARI') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ari.png'
  if (str == 'CAR' || str == 'CAL' || str == 'CR') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/car.png'
  if (str == 'KA' || str == 'KAN' || str == 'KC') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/kc.png'
  if (str == 'LAS' || str == 'LV' || str == 'LAV') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lv.png'
  if (str == 'LOS' || str == 'LSA' || str == 'LAR' || str == 'LA') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lar.png'
  if (str == 'PIT' || str == 'PT') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/pit.png'
  if (str == 'SEA' || str == 'SET' || str == 'SAT') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/sea.png'
  if (str == 'TAM' || str == 'TAB' || str == 'TB' || str == 'TA') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/tb.png'
  if (str == 'PHI' || str == 'PHL' || str == 'PIL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/phi.png'
  else return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/' + str.toLowerCase() + '.png'
}

const translateText = (str) => {
  if (str == 'P') return 'Punt'
  if (str == 'FG') return 'Field Goal'
  else return 'Go'
}
const getBadge = (str) => {
  if (str == 'P') return 'badge-red'
  if (str == 'FG') return 'badge-blue'
  else return 'badge-green'
}
const getAbsoluteValue = (str) => {
  str = str.toString()
  if (str.charAt(0) === '-') return "( +" + str.slice(1) + "% )"
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
const setToolTip = (play) => {
  if (window.innerWidth < 1024) {
    if (play.toolClass == 'block') play.toolClass = 'hidden'
    else play.toolClass = 'block'
  }
}
const getPlayWP = (playId, tm) => {
  let playWP = playsArr.value.reduce((closest, current) => {
    const currentDiff = Math.abs(Number(current.playId.slice(9)) - playId);
    const closestDiff = Math.abs(Number(closest.playId.slice(9)) - playId);
    return currentDiff < closestDiff ? current : closest;
  });
  
  if (games.value[id.value].filter(f => f.UNQPLY_GROUP == playId)[0].firstTeamLogo == getTeamAbbr(tm)) {
    return " WP: " + Math.round((1 - playWP.homeWinPercentage) * 100 * 10) / 10 + "%"
  } else {
    return " WP: " + Math.round(playWP.homeWinPercentage * 100 * 10) / 10 + "%"
  }
}
const flipTool = (play) => {
  if (window.innerWidth >= 1024) play.toolClass = 'block'
}
const flipToolBack = (play) => {
  if (window.innerWidth >= 1024) play.toolClass = 'hidden'
}
const setFlip = (play, e) => {
  if (window.innerWidth < 1024) {
    // console.log(e.layerX)
    // console.log(e.layerY)
    if (e.srcElement.outerText) {
      if (e.layerX < 336 || e.layerY > 96) {
        // console.log(play.flipClass)
        if (play.flipClass) play.flipClass = ''
        else {
          play.flipClass = 'flip-card-hover'
          play.toolClass = 'hidden'
        }
        // console.log(play.flipClass)
      }
    }
  }
}
const flipIt = (play, e) => {
  if(e.srcElement.outerText) {
    if (e.layerX < 336 || e.layerY > 96) {
      if (window.innerWidth >= 1024) {
        play.flipClass = 'flip-card-hover'
        play.toolClass = 'hidden'
      }
    }
  }
}
const flipBack = (play, e) => {
  if (window.innerWidth >= 1024) {
    play.flipClass = ''
  }
}

const expCard = async (front, i) => {
  let el = null
  // let elOther = null
  if (front) {
    el = captureFront
    // elOther = captureBack
  } else {
    el = captureBack
    // elOther = captureFront
  }
  if (window.innerWidth < 1024) {
    if (navigator.share) {
      domtoimage.toBlob(el.value[i]).then(function (blob) {
        const filesArray = [
          new File(
            [blob],
            'decision.png', 
            {
              type: blob.type, 
              lastModified: new Date().getTime()
            }
          )
        ]
        const shareData = {
          title: '4th Down Analysis',
          text: 'Check out ESPN\'s analysis of this 4th Down decision on espnanalytics.com/decision',
          url: '', 
          files: filesArray,
          dialogTitle: 'Share 4th Down Analysis'
        }
        navigator.share(shareData)
      })
    } else if (navigator.clipboard.write) {
      domtoimage.toBlob(el.value[i])
        .then(function (blob) {
          navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(() => {
            alert('Image copied successfully')
          }).catch(() => {
            alert('Something went wrong!')
          })
        })
    } else if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText('https://espnanalytics.com/game/' + id.value).then(() => {
        alert('Link copied successfully')
      }).catch(() => {
        alert('Something went wrong!')
      })
    } else {
      alert('Sharing permissions off')
    }
  } else if (navigator.clipboard.write) {
    // console.log(navigator.clipboard.write)
    domtoimage.toBlob(el.value[i])
      .then(function (blob) {
        navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(() => {
          alert('Image copied successfully')
        }).catch(() => {
          if (navigator.share) {
            const filesArray = [
              new File(
                [blob],
                'decision.png', 
                {
                  type: blob.type, 
                  lastModified: new Date().getTime()
                }
              )
            ]
            const shareData = {
              title: '4th Down Analysis',
              text: 'Check out ESPN\'s analysis of this 4th Down decision on espnanalytics.com/decision',
              url: '', 
              files: filesArray,
              dialogTitle: 'Share 4th Down Analysis'
            }
            navigator.share(shareData)
          } else if (navigator.clipboard.writeText) {
            navigator.clipboard.writeText('https://espnanalytics.com/game/' + id.value).then(() => {
              alert('Link copied successfully')
            }).catch(() => {
              alert('Something went wrong!')
            })
          } else {
            alert('Something went wrong!')
          }
        })
      })
  } else if (navigator.share) {
    domtoimage.toBlob(el.value[i]).then(function (blob) {
      const filesArray = [
        new File(
          [blob],
          'decision.png', 
          {
            type: blob.type, 
            lastModified: new Date().getTime()
          }
        )
      ]
      const shareData = {
        title: '4th Down Analysis',
        text: 'Check out ESPN\'s analysis of this 4th Down decision!',
        url: '', 
        files: filesArray,
        dialogTitle: 'Share 4th Down Analysis'
      }
      navigator.share(shareData)
    })
  } else if (navigator.clipboard.writeText) {
    navigator.clipboard.writeText('https://espnanalytics.com/game/' + id.value).then(() => {
      alert('Link copied successfully')
    }).catch(() => {
      alert('Something went wrong!')
    })
  } else {
    alert('Sharing permissions off')
  }
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
.flip-card-back, 
.flip-card-back-fake {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* .flip-card-front { */
  /* background-color: #bbb; */
  /* color: black; */
/* } */

.flip-card-back {
  /* background-color: #2980b9; */
  /* color: white; */
  transform: rotateY(180deg);
}
</style>