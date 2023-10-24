<template>
    <div class="min-h-screen bg-gray-100 ">
        <div class="relative flex items-center justify-center w-full px-5 pt-5 pb-3">
            <button type="button" @click="navigateTo('/stoplight')" class="hidden xs:flex gap-2 items-center absolute lg:top-10 lg:left-10 top-5 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <ArrowLeftIcon class="w-4 h-4" />
                Back
            </button>
            <button type="button" @click="navigateTo('/stoplight')" class="xs:hidden flex gap-2 items-center absolute lg:top-10 lg:left-10 top-5 left-5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <ArrowLeftIcon class="w-4 h-4" />
            </button>
            <img src="../../assets/logo.png" @click="navigateTo('/')" class="h-12 xs:h-20 cursor-pointer" alt="">
        </div>
        <div class="container"> 
            <div class="stoplight-cont">
                <div id = "outer" class="play-info-container">
                    <h2 class="text-espngray-900 text-xl font-medium" id="title">1d: MIN 22 at 00:24 4Q</h2>
                </div>
                <div class="stop-light" id="stop-light">
                    <div class="bulb bg-stoplight-red">
                        <span><div id="red-cont" class="red-cont">
                            <h1 class="bulb-text" id="red-text">P</h1>
                        </div></span>
                    </div>
                    <div class="bulb bg-stoplight-yellow">
                        <span><div id="y-cont" class="y-cont">
                            <h1 class="bulb-text" id="yellow-text">-</h1>
                        </div></span>
                    </div>
                    <div class="bulb bg-stoplight-green">
                        <span><div id="g-cont" class="g-cont">
                            <h1 class="bulb-text" id="green-text">-</h1>
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
let colArray = ref({})
onMounted(async () => {
    let temp = await store.events
    events.value = temp.events
    console.log(events.value)

    const supabase = createClient('https://oeaoxcbbfdmnrrujkmwj.supabase.co', 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lYW94Y2JiZmRtbnJydWprbXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwNDAyMTYsImV4cCI6MjAxMTYxNjIxNn0.hStQulqxb14rENfHdpTsuBkkWLwkiDiVU8Uj8fCeTGc')
    let response = await supabase.functions.invoke('cfb-gonogo', {body: {id: events.value[id.value].id}})
    console.log(response)

    if (response.playId) {
        if (response.green) {
            colArray.value = {
                'green': response.green,
                'yellow': response.yellow,
                'red': response.red,
                'title': response
            }

            localStorage.setItem('lastPlay_' + id.value, colArray.value);
        } else {
            colArray.value = JSON.parse(localStorage.getItem('lastPlay_' + id.value))
        }
    } else {
        red.value = ''
        yellow.value = ''
        green.value = ''
        title.value = response.displayValue
    }
    
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

.container {
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
  height: 27.5px;
  width: 250px;
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
  height: 60px;
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

@media only screen and (max-width: 600px) {
  .stoplight-cont {
    margin: auto;
  }
  .play-info-container {
    margin-top: 10px;
  }
  .play-info-container2 {
    margin-top: 0px;
  }
}
</style>