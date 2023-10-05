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

    <div class="flex justify-center p-10 px-auto absolute top-[120px] opacity-0">
      <ul role="list" class="flex flex-wrap justify-start gap-10 h-fit w-fit">
        <div v-for="(play, i) in games[id]" :key="`${play.Game}hidden`" class="flip-card bg-white xs:w-96 w-[300px] h-[240px] xs:h-[263px]" @click="setFlip(play, $event)" @mousemove="flipIt(play, $event)" @mouseenter="flipIt(play, $event)" @mouseleave="flipBack(play, $event)">
          <div :class="play.flipClass" class="shadow flip-card-inner rounded-xl">
            <!-- Card Front -->
            <div class="flip-card-front" ref="captureFront">
              <div class="absolute bottom-2 left-1/4 xs:left-[30%] underline text-xs text-cyan-900">espnanalytics.com/decision</div>
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
              <dl class="px-6 py-4 -my-3 overflow-hidden text-xs xs:text-sm leading-6 bg-white divide-y divide-gray-100 rounded-b-xl">
                <div class="flex justify-between py-2 xs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xs:hidden">W%</dt>
                  <dt class="text-gray-500 hidden xs:block">Win %</dt>
                  <dd class="flex gap-2 xs:gap-4">
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
            <div class="bg-white flip-card-back-fake rounded-xl" ref="captureBack">
              <div class="absolute bottom-2 left-1/4 xs:left-[30%] underline text-xs text-cyan-900">espnanalytics.com/decision</div>
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
    
    <div class="flex justify-center p-10 px-auto">
      <ul role="list" class="flex flex-wrap justify-start gap-10 h-fit w-fit">
        <div v-for="(play, i) in games[id]" :key="play.Game" class="flip-card bg-white xs:w-96 w-[300px] h-[240px] xs:h-[263px]" @click="setFlip(play, $event)" @mousemove="flipIt(play, $event)" @mouseenter="flipIt(play, $event)" @mouseleave="flipBack(play, $event)">
          <div :class="play.flipClass" class="shadow flip-card-inner rounded-xl">
            <!-- Card Front -->
            <div class="flip-card-front">
              <div class="relative flex items-center p-6 border-b bg-gray-50 gap-x-4 border-gray-900/5 rounded-t-xl">
                <CursorArrowRaysIcon class="absolute w-4 h-4 text-gray-900 top-1 left-1 animate-pulse sm:hidden" />
                <ArrowUpOnSquareIcon class="absolute w-4 h-4 text-gray-900 top-0 right-0 cursor-pointer mx-4 my-10" @click="expCard(true, i)"/>
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
              <dl class="px-6 py-4 -my-3 overflow-hidden text-xs xs:text-sm leading-6 bg-white divide-y divide-gray-100 rounded-b-xl">
                <div class="flex justify-between py-2 xs:py-3 gap-x-4">
                  <dt class="text-gray-500 block xs:hidden">W%</dt>
                  <dt class="text-gray-500 hidden xs:block">Win %</dt>
                  <dd class="flex gap-2 xs:gap-4">
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
              <ArrowUpOnSquareIcon class="absolute w-4 h-4 text-gray-900 top-0 right-0 cursor-pointer mx-4 my-10" @click="expCard(false, i)"/>
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
                  <InformationCircleIcon class="absolute left-20 top-3.5 w-5 h-5" @click="setToolTip(play)" @mouseenter="flipTool(play)" @mouseleave="flipToolBack(play)"/>
                  <dt class="text-gray-500">Break-even</dt>
                  <div :class="play.toolClass" class="absolute left-[6.5rem] top-1 text-center inline-flex items-center rounded-full bg-espncyan-50 text-espncyan-900 ring-1 ring-inset ring-espncyan-200/10 text-xs w-[9.5rem] py-1 px-1.5">The minimum first down chance that favors Go</div>
                  <dd class="flex items-start gap-x-2">
                    <div :class="getColor(play.breakEvenGo, play.firstdnprob)">{{ play.breakEvenGo + '%' }}</div>
                  </dd>
                </div>
                <div class="relative flex justify-between py-3 gap-x-4 mr-8" v-else>
                  <InformationCircleIcon class="absolute left-20 top-3.5 w-5 h-5" @click="setToolTip(play)" @mouseenter="flipTool(play)" @mouseleave="flipToolBack(play)"/>
                  <dt class="text-gray-500">Break-even</dt>
                  <div :class="play.toolClass" class="absolute left-[6.5rem] top-1 text-center inline-flex items-center rounded-full bg-espncyan-50 text-espncyan-900 ring-1 ring-inset ring-espncyan-200/10 text-xs w-[9.5rem] py-1 px-1.5">The minimum first down chance that favors Go</div>
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
showToolTip.value = 'hidden'
onMounted(async () => {
  games.value = await store.games
  scores.value = await store.scores
  
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
  if (window.innerWidth < 640) {
    if (play.toolClass == 'block') play.toolClass = 'hidden'
    else play.toolClass = 'block'
  }
}
const flipTool = (play) => {
  if (window.innerWidth >= 640) play.toolClass = 'block'
}
const flipToolBack = (play) => {
  if (window.innerWidth >= 640) play.toolClass = 'hidden'
}
const setFlip = (play, e) => {
  if (window.innerWidth < 640) {
    if (e.srcElement.outerText) {
      if (e.layerX < 336 || e.layerY > 96) {
        if (play.flipClass) play.flipClass = ''
        else {
          play.flipClass = 'flip-card-hover'
          play.toolClass = 'hidden'
        }
      }
    }
  }
}
const flipIt = (play, e) => {
  if(e.srcElement.outerText) {
    if (e.layerX < 336 || e.layerY > 96) {
      if (window.innerWidth >= 640) {
        play.flipClass = 'flip-card-hover'
        play.toolClass = 'hidden'
      }
    }
  }
}
const flipBack = (play, e) => {
  if (window.innerWidth >= 640) play.flipClass = ''
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
  } else {
    domtoimage.toBlob(el.value[i])
      .then(function (blob) {
        navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(() => {
          alert('Image copied successfully')
        }).catch(() => {
          alert('Something went wrong!')
        })
      })
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