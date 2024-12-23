import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {

  const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTeamLogo = (str) => {
    if (str == 'NYG') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png'
    if (str == 'SF') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/sf.png'
    if (str == 'IND') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ind.png'
    if (str == 'BLT' || str == 'BAL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/bal.png'
    if (str == 'TEN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ten.png'
    if (str == 'CLV' || str == 'CLE') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cle.png'
    if (str == 'ATL') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/atl.png'
    if (str == 'DET') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/det.png'
    if (str == 'NO') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/no.png'
    if (str == 'GB') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/gb.png'
    if (str == 'HST' || str == 'HOU') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/hou.png'
    if (str == 'JAX') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/jax.png'
    if (str == 'DEN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/den.png'
    if (str == 'MIA') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/mia.png'
    if (str == 'LAC') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lac.png'
    if (str == 'MIN') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/min.png'
    if (str == 'NE') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ne.png'
    if (str == 'NYJ') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyj.png'
    if (str == 'BUF') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/buf.png'
    if (str == 'WSH' || str == 'WAS') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/wsh.png'
    // else if (str == 'WAS') return 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/wsh.png'
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

  const teamNameSwitch = (str) => {
    str = str.replace('ARZ', 'ARI')
    if (!str.includes('LAC')) {
      str = str.replace('LA', 'LAR')
    }
    str = str.replace('HST', 'HOU')
    str = str.replace('BLT', 'BAL')
    str = str.replace('CLV', 'CLE')
    return str
  }

  var gamesArray = ref([])
  const games = computed(async () => {
    if (gamesArray > 0) return gamesArray 
    else {
      const plays = await $fetch('https://espnanalyticsdata.s3.amazonaws.com/live_4th_down_data_current.json')
      plays.reverse();
      const groupByGame = {};

      plays.forEach(play => {
        
        play.Game = teamNameSwitch(play.Game)
        play.team = teamNameSwitch(play.team)
        play.CLOCK_TIME = formatTime(play.CLOCK_TIME)
        if (play.winProbPunt) play.winProbPunt = (100 * play.winProbPunt.toFixed(3)).toFixed(1);
        if (play.winProbFG) play.winProbFG = (100 * play.winProbFG.toFixed(3)).toFixed(1);
        if (play.winProbGo) play.winProbGo = (100 * play.winProbGo.toFixed(3)).toFixed(1);
        if (play.firstdnprob) play.firstdnprob = (100 * play.firstdnprob.toFixed(3)).toFixed(1);
        if (play.fgprob) play.fgprob = (100 * play.fgprob.toFixed(3)).toFixed(1);
        if (play.breakEvenGo) play.breakEvenGo = (100 * play.breakEvenGo.toFixed(3)).toFixed(1);
        if (play.goKickDelta) play.goKickDelta = (100 * play.goKickDelta.toFixed(3)).toFixed(1);

        const teams = play.Game.split(" at ").map(team => team.trim());

        if (play.STARTPLAY_YARDSTOEZ != 50) {
          if (play.STARTPLAY_YARDSTOEZ > 50) {
            play.STARTPLAY_YARDSTOEZ = play.team + ' ' + (100 - play.STARTPLAY_YARDSTOEZ)
          } else {
            play.STARTPLAY_YARDSTOEZ = teams.filter(f => f != play.team) + ' ' + play.STARTPLAY_YARDSTOEZ
          }
        }

        play.firstTeamLogo = getTeamLogo(teams[0])
        play.secondTeamLogo = getTeamLogo(teams[1])

        if (play.play.toLowerCase().includes("punt")) play.play = "P";
        else if (play.play.toLowerCase().includes("field")) play.play = "FG";
        else if (play.play.toLowerCase().includes("pass")) play.play = "Go (Pass)";
        else if (play.play.toLowerCase().includes("rush")) play.play = "Go (Rush)";
        else if (play.play.toLowerCase().includes("sack")) play.play = "Go (Pass)";        

        // Check if the game is already a key in groupedArrays
        if (groupByGame[play.Game]) {
          // If the key exists, push the object to the existing sub-array
          groupByGame[play.Game].push(play);
        } else {
          // If the key doesn't exist, create a new sub-array with the object
          groupByGame[play.Game] = [play];
        }
      });
      gamesArray = Object.values(groupByGame);
      return gamesArray
    }
  })

  var selectedGame = ref([])
  function setGame(g)  {
    selectedGame.value = g
    localStorage.setItem('selectedGame', g);
  }
  const getGame = computed(async () => {
    // console.log(JSON.parse(localStorage.getItem('selectedGame')))
    return JSON.parse(localStorage.getItem('selectedGame'))
  })
  // const getGame = computed(async () => {

  // })

  var scoresArray = ref([])
  const scores = computed(async () => {
    if (scoresArray > 0) return scoresArray
    else {
      const scoresResponse = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
      scoresArray = scoresResponse
      return scoresArray
    }
  })

  return { games, gamesArray, scores, scoresArray, setGame, getGame }
})