<template>
  <div class="relative min-h-screen bg-gray-100 ">
    <div class="flex items-center justify-start w-full p-5 bg-slate-500">
      <img src="../assets/logo.png" class="h-20" alt="">
    </div>
    <div class="flex justify-center text-center">
      <div class="text-xl py-2">
        <h2 class="">espnanalytics.com has moved.</h2>
        <h2 class="">We'll redirect you shortly.</h2>
        <h2 class="">Please save the new website</h2>
        <h2 class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><a class="" href="http://internal.espnanalytics.com">internal.espnanalytics.com</a></h2>
        <h2 class="">to your bookmarks. Thank you!</h2>
        <h2 class="">- ESPN Analytics</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
onMounted(async () => {
  redirect(5000);
})

const sleeper = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const redirect = async (ms) => {
  await sleeper(ms);
  var newUrl = "http://internal.espnanalytics.com";
  window.location.replace(newUrl);
}
</script>