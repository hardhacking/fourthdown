<template>
  <div class="relative min-h-screen bg-gray-100 ">
    <div class="flex items-center justify-center w-full p-5">
      <img src="../assets/logo.png" class="h-20" alt="">
    </div>
    <ul role="list" class="flex flex-wrap justify-center gap-10 p-10 pt-5">
      <!-- <li class="flex flex-col max-w-md text-center bg-white rounded-lg shadow w-[400px] hover:shadow-lg">
        <div class="flex flex-col flex-1 p-8">
          <img class="flex-shrink-0 w-32 h-32 mx-auto rounded-full" src="https://otvrrtktmxfupzauisqb.supabase.co/storage/v1/object/public/espn/logos/nfl.png" alt="" />
          <h3 class="mt-6 text-sm font-medium text-gray-900">All Games</h3>
          <dl class="flex flex-col justify-between flex-grow mt-1">
            <dt class="sr-only">Title</dt>
            <dd class="text-sm text-gray-500">See everything at once</dd>
            <dt class="sr-only">Role</dt>
          </dl>
        </div>
        <div class="p-4">
          <button type="button" @click="navigateTo('/game')"
            class="inline-flex items-center gap-x-2 rounded-md bg-espn-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            See all 4th Downs
            <ChartBarIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </li> -->
      <li v-for="(game, index) in games" :key="index" class="flex flex-col max-w-md text-center bg-white rounded-lg shadow w-[400px] hover:shadow-lg">
        <div class="flex flex-col flex-1 p-8">
          <div class="flex items-center w-full justify-center">
            <img class="h-28 md:h-32 object-fit" :src="game[0].firstTeamLogo" alt="" />
            <div class="px-2">at</div>
            <img class="h-28 md:h-32 object-fit" :src="game[0].secondTeamLogo" alt="" />
          </div>
          <h3 class="mt-6 text-sm font-medium text-gray-900">{{ game[0].Game }}</h3>
          <dl class="flex flex-col justify-between flex-grow mt-1">
            <dt class="sr-only">Title</dt>
            <dd class="text-sm text-gray-500">{{ getDate(game[0].SCHEDULE_ID) }}</dd>
            <!-- <dd class="mt-3">
              <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-full bg-green-50 ring-1 ring-inset ring-green-600/20">{{ person.role }}</span>
            </dd> -->
          </dl>
        </div>
        <div class="p-4">
          <NuxtLink type="button" :to="'/game/' + index"
            class="inline-flex items-center gap-x-2 rounded-md bg-espn-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            See 4th Downs
            <ChartBarIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useGameStore } from '../stores/GameStore'

const store = useGameStore()
const games = ref([])
const scores = ref(null)
onMounted(async () => {
  games.value = await store.games
  scores.value = await store.scores
})

// Computerd
const getDate = (str) => {
  // Extract the date part (first 8 characters)
  const datePart = str.substring(0, 8);
  // Convert it to a Date object
  const date = new Date(Date.UTC(
    datePart.substring(0, 4),
    datePart.substring(4, 6) - 1, // Subtract 1 from month to adjust for 0-based indexing
    datePart.substring(6, 8),
    12, // Noon (12:00:00) in UTC
    0,  // Minutes
    0   // Seconds
  ));
  // Format it as a nice date string
  const niceDateString = date.toDateString();
  return niceDateString;
}

// const setGame = (game) => {
//   store.setGame(game)
//   navigateTo('/game?id=1')
// }
</script>