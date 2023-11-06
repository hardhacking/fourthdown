<template>
    <div class="relative min-h-screen bg-gray-100 ">
      <div class="flex items-center justify-center w-full p-5">
        <img src="../assets/logo.png" @click="navigateTo('/')" class="h-20 cursor-pointer" alt="">
      </div>
      <ul role="list" class="flex flex-wrap justify-center gap-10 p-10 pt-5">
        <li v-for="(event, index) in events" :key="index" class="flex flex-col max-w-md text-center bg-white rounded-lg shadow w-[300px] hover:shadow-lg">
          <div class="flex flex-col flex-1 p-6">
            <div class="flex items-center w-full justify-center">
              <img class="h-16 object-fit" :src="event.competitions[0].competitors[1].team.logo" alt="" />
              <div class="px-2">at</div>
              <img class="h-16 object-fit" :src="event.competitions[0].competitors[0].team.logo" alt="" />
            </div>
            <h3 class="mt-4 text-md font-medium text-gray-900">{{ event.shortName }}</h3>
            <dl class="flex flex-col justify-between flex-grow mt-1">
              <dt class="sr-only">Title</dt>
              <dd class="text-sm text-gray-500">{{ getDate(event.date) }}</dd>
            </dl>
          </div>
          <div class="pb-6 pt-1">
            <NuxtLink type="button" :to="'/event/' + index"
              class="inline-flex items-center gap-x-2 rounded-md bg-espncyan-200 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-espncyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espncyan-200">
              4th Down Stoplight
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mt-2 -mx-4" viewBox="0 0 32 40" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M22.625,4.741c0,-0.859 -0.341,-1.684 -0.949,-2.292c-0.608,-0.608 -1.433,-0.949 -2.292,-0.949c-2.018,0 -4.75,0 -6.768,0c-0.859,0 -1.684,0.341 -2.292,0.949c-0.608,0.608 -0.949,1.433 -0.949,2.292c0,5.358 0,17.16 0,22.518c-0,0.859 0.341,1.684 0.949,2.292c0.608,0.608 1.433,0.949 2.292,0.949c2.018,-0 4.75,-0 6.768,-0c0.859,-0 1.684,-0.341 2.292,-0.949c0.608,-0.608 0.949,-1.433 0.949,-2.292l-0,-22.518Zm-6.625,16.009c-1.966,-0 -3.562,1.596 -3.562,3.562c-0,1.967 1.596,3.563 3.562,3.563c1.966,-0 3.562,-1.596 3.562,-3.563c0,-1.966 -1.596,-3.562 -3.562,-3.562Zm0,-8.312c-1.966,-0 -3.562,1.596 -3.562,3.562c-0,1.966 1.596,3.562 3.562,3.562c1.966,0 3.562,-1.596 3.562,-3.562c0,-1.966 -1.596,-3.562 -3.562,-3.562Zm0,-8.313c-1.966,0 -3.562,1.596 -3.562,3.563c-0,1.966 1.596,3.562 3.562,3.562c1.966,0 3.562,-1.596 3.562,-3.562c0,-1.967 -1.596,-3.563 -3.562,-3.563Z"/></svg>
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
</template>

<script setup>
import { cfbGameStore } from '../stores/CfbStore'

const store = cfbGameStore()
const events = ref([])
onMounted(async () => {
    let temp = await store.events
    events.value = temp.events
    // console.log(events.value)
})

const getDate = (str) => {
    var utcDate = new Date(str);

    var nyTimeZone = 'America/New_York';
    var nyDate = new Intl.DateTimeFormat('en-US', { timeZone: nyTimeZone }).format(utcDate);
    
    const niceDateString = nyDate
    return niceDateString;
}
</script>