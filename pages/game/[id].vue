<template>
  
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