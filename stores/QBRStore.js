import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {

  // const draft = [
  //   {"rd":1,"pick":1,"player":"Will Howard","id":4429955,"team":"Andre"},
  //   {"rd":1,"pick":2,"player":"Jaxson Dart","id":4689114,"team":"Lauren"},{"rd":1,"pick":3,"player":"Dillon Gabriel","id":4427238,"team":"Sharon"},{"rd":1,"pick":4,"player":"Noah Fifita","id":4801717,"team":"Matt"},{"rd":1,"pick":5,"player":"Carson Beck","id":4430841,"team":"Chris"},{"rd":1,"pick":6,"player":"Jalen Milroe","id":4432734,"team":"Mitchell"},{"rd":1,"pick":7,"player":"Jalon Daniels","id":4596472,"team":"Nitz"},{"rd":1,"pick":8,"player":"Shedeur Sanders","id":4432762,"team":"Jeff"},{"rd":1,"pick":9,"player":"Jackson Arnold","id":4870607,"team":"Brett"},{"rd":1,"pick":10,"player":"Cameron Rising","id":4362075,"team":"Seth"},{"rd":1,"pick":11,"player":"Miller Moss","id":4431580,"team":"Dean"},{"rd":2,"pick":12,"player":"DJ Uiagalelei","id":4429020,"team":"Dean"},{"rd":2,"pick":13,"player":"Kaidon Salter","id":4432803,"team":"Seth"},{"rd":2,"pick":14,"player":"Byrum Brown","id":4880272,"team":"Brett"},{"rd":2,"pick":15,"player":"Brady Cook","id":4429435,"team":"Jeff"},{"rd":2,"pick":16,"player":"Cam Ward","id":4688380,"team":"Nitz"},{"rd":2,"pick":17,"player":"Nico Iamaleava","id":4870799,"team":"Mitchell"},{"rd":2,"pick":18,"player":"Quinn Ewers","id":4889929,"team":"Chris"},{"rd":2,"pick":19,"player":"Seth Henigan","id":4606194,"team":"Matt"},{"rd":2,"pick":20,"player":"Avery Johnson","id":4870857,"team":"Sharon"},{"rd":2,"pick":21,"player":"Kyle McCord","id":4433971,"team":"Lauren"},{"rd":2,"pick":22,"player":"Riley Leonard","id":4683423,"team":"Andre"},{"rd":3,"pick":23,"player":"Drew Allar","id":4714771,"team":"Andre"},{"rd":3,"pick":24,"player":"Garrett Greene","id":4429847,"team":"Lauren"},{"rd":3,"pick":25,"player":"Garrett Nussmeier","id":4567747,"team":"Sharon"},{"rd":3,"pick":26,"player":"Josh Hoover","id":4685401,"team":"Matt"},{"rd":3,"pick":27,"player":"Cade Klubnik","id":4685413,"team":"Chris"},{"rd":3,"pick":28,"player":"Conner Weigman","id":4685574,"team":"Mitchell"},{"rd":3,"pick":29,"player":"Alan Bowman","id":4362159,"team":"Nitz"},{"rd":3,"pick":30,"player":"Brayden Schager","id":4709977,"team":"Jeff"},{"rd":3,"pick":31,"player":"KJ Jefferson","id":4567149,"team":"Brett"},{"rd":3,"pick":32,"player":"Haynes King","id":4428993,"team":"Seth"},{"rd":3,"pick":33,"player":"Kyron Drones","id":4678010,"team":"Dean"},{"rd":4,"pick":34,"player":"Dylan Raiola","id":5079572,"team":"Dean"},{"rd":4,"pick":35,"player":"Preston Stone","id":4432767,"team":"Seth"},{"rd":4,"pick":36,"player":"Jordan McCloud","id":4360890,"team":"Brett"},{"rd":4,"pick":37,"player":"Dequan Finn","id":4427191,"team":"Jeff"},{"rd":4,"pick":38,"player":"Grayson McCall","id":4427936,"team":"Nitz"},{"rd":4,"pick":39,"player":"Thomas Castellanos","id":4773919,"team":"Mitchell"},{"rd":4,"pick":40,"player":"Rocco Becht","id":4801299,"team":"Chris"},{"rd":4,"pick":41,"player":"Tyler Shough","id":4360689,"team":"Matt"},{"rd":4,"pick":42,"player":"Taylen Green","id":4431325,"team":"Sharon"},{"rd":4,"pick":43,"player":"Donovan Smith","id":4690977,"team":"Lauren"},{"rd":4,"pick":44,"player":"Devon Dampier","id":5105849,"team":"Andre"},{"rd":5,"pick":45,"player":"Chandler Morris","id":4692530,"team":"Andre"},{"rd":5,"pick":46,"player":"Kurtis Rourke","id":4430431,"team":"Lauren"},{"rd":5,"pick":47,"player":"Tyler Van Dyke","id":4685186,"team":"Sharon"},{"rd":5,"pick":48,"player":"TJ Finley","id":4431948,"team":"Matt"},{"rd":5,"pick":49,"player":"Graham Mertz","id":4426335,"team":"Chris"},{"rd":5,"pick":50,"player":"Anthony Colandrea","id":5044387,"team":"Mitchell"},{"rd":5,"pick":51,"player":"Payton Thorne","id":4430590,"team":"Nitz"},{"rd":5,"pick":52,"player":"Zeon Chriss","id":4870518,"team":"Jeff"},{"rd":5,"pick":53,"player":"LaNorris Sellers","id":4875127,"team":"Brett"},{"rd":5,"pick":54,"player":"Joey Aguilar","id":5151948,"team":"Seth"},{"rd":5,"pick":55,"player":"Mikey Keene","id":4597499,"team":"Dean"},{"rd":6,"pick":56,"player":"Hudson Card","id":4429032,"team":"Dean"},{"rd":6,"pick":57,"player":"Brett Gabbert","id":4427243,"team":"Seth"},{"rd":6,"pick":58,"player":"Will Rogers","id":102597,"team":"Brett"},{"rd":6,"pick":59,"player":"Chandler Rogers","id":4570554,"team":"Jeff"},{"rd":6,"pick":60,"player":"Ethan Garbers","id":4429068,"team":"Nitz"},{"rd":6,"pick":61,"player":"Max Johnson","id":4685740,"team":"Mitchell"},{"rd":6,"pick":62,"player":"Maddux Madsen","id":4870513,"team":"Chris"},{"rd":6,"pick":63,"player":"Diego Pavia","id":5084180,"team":"Matt"},{"rd":6,"pick":64,"player":"Jacob Zeno","id":4426417,"team":"Sharon"},{"rd":6,"pick":65,"player":"Brock Vandagriff","id":4432782,"team":"Lauren"},{"rd":6,"pick":66,"player":"Ben Finley","id":4431091,"team":"Andre"},{"rd":7,"pick":67,"player":"Behren Morton","id":4431465,"team":"Andre"},{"rd":7,"pick":68,"player":"Sam Leavitt","id":5078810,"team":"Lauren"},{"rd":7,"pick":69,"player":"Ryan Hilinski","id":4426657,"team":"Sharon"},{"rd":7,"pick":70,"player":"Evan Svoboda","id":5082633,"team":"Matt"},{"rd":7,"pick":71,"player":"Jaylen Raynor","id":5080403,"team":"Chris"},{"rd":7,"pick":72,"player":"Alex Orji","id":4685495,"team":"Mitchell"},{"rd":7,"pick":73,"player":"Arch Manning","id":4870906,"team":"Nitz"},{"rd":7,"pick":74,"player":"John Mateer","id":4915980,"team":"Jeff"},{"rd":7,"pick":75,"player":"Nicholas Vattiato","id":4682518,"team":"Brett"},{"rd":7,"pick":76,"player":"Matthew Sluka","id":4695904,"team":"Seth"},
  //   {"rd":7,"pick":77,"player":"DJ Lagway","id":5079555,"team":"Dean"}
  // ] 

  var weeksArray1 = ref([])
  const weeksTable1 = computed(async () => {
    if (weeksArray1 > 0) return weeksArray1
    else {
      const weeksResponse1 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=1&limit=1000&isqualified=false')
      weeksArray1 = weeksResponse1
      return weeksArray1
    }
  })
  var weeksArray2 = ref([])
  const weeksTable2 = computed(async () => {
    if (weeksArray2 > 0) return weeksArray2
    else {
      const weeksResponse2 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=2&limit=1000&isqualified=false')
      weeksArray2 = weeksResponse2
      return weeksArray2
    }
  })
  var weeksArray3 = ref([])
  const weeksTable3 = computed(async () => {
    if (weeksArray3 > 0) return weeksArray3
    else {
      const weeksResponse3 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=3&limit=1000&isqualified=false')
      weeksArray3 = weeksResponse3
      return weeksArray3
    }
  })
  var weeksArray4 = ref([])
  const weeksTable4 = computed(async () => {
    if (weeksArray4 > 0) return weeksArray4
    else {
      const weeksResponse4 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=4&limit=1000&isqualified=false')
      weeksArray4 = weeksResponse4
      return weeksArray4
    }
  })
  var weeksArray5 = ref([])
  const weeksTable5 = computed(async () => {
    if (weeksArray5 > 0) return weeksArray5
    else {
      const weeksResponse5 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=5&limit=1000&isqualified=false')
      weeksArray5 = weeksResponse5
      return weeksArray5
    }
  })
  
  var weeksArray6 = ref([])
  const weeksTable6 = computed(async () => {
    if (weeksArray6 > 0) return weeksArray6
    else {
      const weeksResponse6 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=6&limit=1000&isqualified=false')
      weeksArray6 = weeksResponse6
      return weeksArray6
    }
  })

  var weeksArray7 = ref([])
  const weeksTable7 = computed(async () => {
    if (weeksArray7 > 0) return weeksArray7
    else {
      const weeksResponse7 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=7&limit=1000&isqualified=false')
      weeksArray7 = weeksResponse7
      return weeksArray7
    }
  })

  var weeksArray8 = ref([])
  const weeksTable8 = computed(async () => {
    if (weeksArray8 > 0) return weeksArray8
    else {
      const weeksResponse8 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=8&limit=1000&isqualified=false')
      weeksArray8 = weeksResponse8
      return weeksArray8
    }
  })

  var weeksArray9 = ref([])
  const weeksTable9 = computed(async () => {
    if (weeksArray9 > 0) return weeksArray9
    else {
      const weeksResponse9 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=9&limit=1000&isqualified=false')
      weeksArray9 = weeksResponse9
      return weeksArray9
    }
  })

  var weeksArray10 = ref([])
  const weeksTable10 = computed(async () => {
    if (weeksArray10 > 0) return weeksArray10
    else {
      const weeksResponse10 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=10&limit=1000&isqualified=false')
      weeksArray10 = weeksResponse10
      return weeksArray10
    }
  })

  var weeksArray11 = ref([])
  const weeksTable11 = computed(async () => {
    if (weeksArray11 > 0) return weeksArray11
    else {
      const weeksResponse11 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=11&limit=1000&isqualified=false')
      weeksArray11 = weeksResponse11
      return weeksArray11
    }
  })

  var weeksArray12 = ref([])
  const weeksTable12 = computed(async () => {
    if (weeksArray12 > 0) return weeksArray12
    else {
      const weeksResponse12 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=12&limit=1000&isqualified=false')
      weeksArray12 = weeksResponse12
      return weeksArray12
    }
  })

  var weeksArray13 = ref([])
  const weeksTable13 = computed(async () => {
    if (weeksArray13 > 0) return weeksArray13
    else {
      const weeksResponse13 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=13&limit=1000&isqualified=false')
      weeksArray13 = weeksResponse13
      return weeksArray13
    }
  })

  var weeksArray14 = ref([])
  const weeksTable14 = computed(async () => {
    if (weeksArray14 > 0) return weeksArray14
    else {
      const weeksResponse14 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=14&limit=1000&isqualified=false')
      weeksArray14 = weeksResponse14
      return weeksArray14
    }
  })

  var weeksArray15 = ref([])
  const weeksTable15 = computed(async () => {
    if (weeksArray15 > 0) return weeksArray15
    else {
      const weeksResponse15 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=15&limit=1000&isqualified=false')
      weeksArray15 = weeksResponse15
      return weeksArray15
    }
  })

  var weeksArray16 = ref([])
  const weeksTable16 = computed(async () => {
    if (weeksArray16 > 0) return weeksArray16
    else {
      const weeksResponse16 = await $fetch('https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=16&limit=1000&isqualified=false')
      weeksArray16 = weeksResponse16
      return weeksArray16
    }
  })

 


  // https://site.web.api.espn.com/apis/fitt/v3/sports/football/college-football/qbr?qbrType=weeks&season=2024&week=1&limit=1000

  // var scoresArray1 = ref([])
  // const boxScores1 = computed(async () => {
  //   if (scoresArray1 > 0) return scoresArray1
  //   else {
  //     const scoresResponse1 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=1&dates=2024&tz=America%2FNew_York')
  //     scoresArray1 = scoresResponse1
  //     return scoresArray1
  //   }
  // })
  // var scoresArray2 = ref([])
  // const boxScores2 = computed(async () => {
  //   if (scoresArray2 > 0) return scoresArray2
  //   else {
  //     const scoresResponse2 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=2&dates=2024&tz=America%2FNew_York')
  //     scoresArray2 = scoresResponse2
  //     return scoresArray2
  //   }
  // })
  // var scoresArray3 = ref([])
  // const boxScores3 = computed(async () => {
  //   if (scoresArray3 > 0) return scoresArray3
  //   else {
  //     const scoresResponse3 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=3&dates=2024&tz=America%2FNew_York')
  //     scoresArray3 = scoresResponse3
  //     return scoresArray3
  //   }
  // })
  // var scoresArray4 = ref([])
  // const boxScores4 = computed(async () => {
  //   if (scoresArray4 > 0) return scoresArray4
  //   else {
  //     const scoresResponse4 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=4&dates=2024&tz=America%2FNew_York')
  //     scoresArray4 = scoresResponse4
  //     return scoresArray4
  //   }
  // })
  // var scoresArray5 = ref([])
  // const boxScores5 = computed(async () => {
  //   if (scoresArray5 > 0) return scoresArray5
  //   else {
  //     const scoresResponse5 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=5&dates=2024&tz=America%2FNew_York')
  //     scoresArray5 = scoresResponse5
  //     return scoresArray5
  //   }
  // })
  // var scoresArray6 = ref([])
  // const boxScores6 = computed(async () => {
  //   if (scoresArray6 > 0) return scoresArray6
  //   else {
  //     const scoresResponse6 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=6&dates=2024&tz=America%2FNew_York')
  //     scoresArray6 = scoresResponse6
  //     return scoresArray6
  //   }
  // })
  // var scoresArray7 = ref([])
  // const boxScores7 = computed(async () => {
  //   if (scoresArray7 > 0) return scoresArray7
  //   else {
  //     const scoresResponse7 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=7&dates=2024&tz=America%2FNew_York')
  //     scoresArray7 = scoresResponse7
  //     return scoresArray7
  //   }
  // })
  // var scoresArray8 = ref([])
  // const boxScores8 = computed(async () => {
  //   if (scoresArray8 > 0) return scoresArray8
  //   else {
  //     const scoresResponse8 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=8&dates=2024&tz=America%2FNew_York')
  //     scoresArray8 = scoresResponse8
  //     return scoresArray8
  //   }
  // })
  // var scoresArray9 = ref([])
  // const boxScores9 = computed(async () => {
  //   if (scoresArray9 > 0) return scoresArray9
  //   else {
  //     const scoresResponse9 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=9&dates=2024&tz=America%2FNew_York')
  //     scoresArray9 = scoresResponse9
  //     return scoresArray9
  //   }
  // })
  // var scoresArray10 = ref([])
  // const boxScores10 = computed(async () => {
  //   if (scoresArray10 > 0) return scoresArray10
  //   else {
  //     const scoresResponse10 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=10&dates=2024&tz=America%2FNew_York')
  //     scoresArray10 = scoresResponse10
  //     return scoresArray10
  //   }
  // })
  // var scoresArray11 = ref([])
  // const boxScores11 = computed(async () => {
  //   if (scoresArray11 > 0) return scoresArray11
  //   else {
  //     const scoresResponse11 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=11&dates=2024&tz=America%2FNew_York')
  //     scoresArray11 = scoresResponse11
  //     return scoresArray11
  //   }
  // })
  // var scoresArray12 = ref([])
  // const boxScores12 = computed(async () => {
  //   if (scoresArray12 > 0) return scoresArray12
  //   else {
  //     const scoresResponse12 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=12&dates=2024&tz=America%2FNew_York')
  //     scoresArray12 = scoresResponse12
  //     return scoresArray12
  //   }
  // })
  // var scoresArray13 = ref([])
  // const boxScores13 = computed(async () => {
  //   if (scoresArray13 > 0) return scoresArray13
  //   else {
  //     const scoresResponse13 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=13&dates=2024&tz=America%2FNew_York')
  //     scoresArray13 = scoresResponse13
  //     return scoresArray13
  //   }
  // })
  // var scoresArray14 = ref([])
  // const boxScores14 = computed(async () => {
  //   if (scoresArray14 > 0) return scoresArray14
  //   else {
  //     const scoresResponse14 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=14&dates=2024&tz=America%2FNew_York')
  //     scoresArray14 = scoresResponse14
  //     return scoresArray14
  //   }
  // })
  // var scoresArray15 = ref([])
  // const boxScores15 = computed(async () => {
  //   if (scoresArray15 > 0) return scoresArray15
  //   else {
  //     const scoresResponse15 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=15&dates=2024&tz=America%2FNew_York')
  //     scoresArray15 = scoresResponse15
  //     return scoresArray15
  //   }
  // })
  // var scoresArray16 = ref([])
  // const boxScores16 = computed(async () => {
  //   if (scoresArray16 > 0) return scoresArray16
  //   else {
  //     const scoresResponse16 = await $fetch('https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&groups=80&week=16&dates=2024&tz=America%2FNew_York')
  //     scoresArray16 = scoresResponse16
  //     return scoresArray16
  //   }
  // })

  return { weeksTable1, weeksArray1, //scoresArray1, boxScores1, 
    weeksTable2, weeksArray2, //scoresArray2, boxScores2, 
    weeksTable3, weeksArray3, //scoresArray3, boxScores3, 
    weeksTable4, weeksArray4, //scoresArray4, boxScores4, 
    weeksTable5, weeksArray5, //scoresArray5, boxScores5, 
    weeksTable6, weeksArray6, //scoresArray6, boxScores6, 
    weeksTable7, weeksArray7, //scoresArray7, boxScores7,
    weeksTable8, weeksArray8, //scoresArray8, boxScores8,
    weeksTable9, weeksArray9, //scoresArray9, boxScores9,
    weeksTable10, weeksArray10, //scoresArray10, boxScores10,
    weeksTable11, weeksArray11, //scoresArray11, boxScores11,
    weeksTable12, weeksArray12, //scoresArray12, boxScores12,
    weeksTable13, weeksArray13, //scoresArray13, boxScores13,
    weeksTable14, weeksArray14, //scoresArray14, boxScores14,
    weeksTable15, weeksArray15, //scoresArray15, boxScores15,
    weeksTable16, weeksArray16, //scoresArray16, boxScores16
   }
})