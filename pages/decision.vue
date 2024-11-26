<template>
  <Head>
    <Title>Live NFL 4th Down Decision Analysis - ESPN Analytics</Title>
    <Meta property="og:title" content="Live NFL 4th Down Decision Analysis - ESPN Analytics"/>
    <Meta property="og:site_name" content="Live NFL 4th Down Decision Analysis - ESPN Analytics" />
    <Meta property="og:url" content="https://www.espnanalytics.com/decision" />
    <Meta name="twitter:url" content="https://www.espnanalytics.com/decision" />
    <Meta name="twitter:title" content="Live NFL 4th Down Decision Analysis - ESPN Analytics"/>
    <Meta name="title" content="Live NFL 4th Down Decision Analysis - ESPN Analytics"/>
  </Head>
      <Header></Header>
    <div class="relative min-h-screen bg-espngray-100 ">
      <!-- <div class="flex items-center justify-center w-full p-5">
        <img src="../assets/logo.png" @click="navigateTo('/')" class="h-20 cursor-pointer" alt="">
      </div> -->
      <div class="flex flex-wrap justify-center gap-10 p-10 pt-28 font-medium text-3xl text-espnblack text-center">Decision Analysis page is undergoing backend update. Be back soon!</div>
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