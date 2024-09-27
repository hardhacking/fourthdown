<template>
  <Head>
    <Title>ESPN Analytics</Title>
    <Meta property="og:title" content="ESPN Analytics"/>
    <Meta property="og:site_name" content="ESPN Analytics" />
    <Meta property="og:url" content="https://www.espnanalytics.com" />
    <Meta name="twitter:url" content="https://www.espnanalytics.com" />
    <Meta name="twitter:title" content="ESPN Analytics"/>
    <Meta name="title" content="ESPN Analytics"/>
    
  </Head>
  <div class="bg-white">
    <!-- <Header></Header> -->
    <div class="relative isolate">
        <div class="flex lg:flex-1">
          <a href="/" class="p-4">
            <span class="sr-only">ESPN Analytics</span>
            <img class="h-10 w-auto" src="../assets/logo.png" alt="" />
          </a>
        </div>
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#c31e32] to-[#00aeef] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div class="py-0 md:my-[-20px] lg:pb-6">
        <div class="mx-auto px-6 lg:px-8 xl:px-16">
          <div class="mx-auto max-w-2xl text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">ESPN Analytics</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Models and data visualization from ESPN Analytics! Run a simulation of the NFL Draft, look at the Draft Day Predictor, compare receiver scores and more.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
              <div class="flex gap-x-6">
                <!-- <a href="/schedule" class="flex items-center max-w-[200px] rounded-md bg-espncyan-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-espncyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espncyan-900">NFL Schedule Analysis</a> -->
                <a href="https://espnanalytics.com/wnba-wpa" class="flex items-center max-w-[120px] rounded-md bg-espncyan-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-espncyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espncyan-900">WNBA Player Metrics</a>
                <a href="https://espnanalytics.com/decision" class="flex items-center max-w-[120px] rounded-md bg-espncyan-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-espncyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espncyan-900">NFL 4th Downs</a>
                <a href="https://espnanalytics.com/receivers" class="flex items-center max-w-[120px] rounded-md bg-espncyan-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-espncyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espncyan-900">NFL Receiver Scores</a>
              </div>
              <a href="/features" class="pt-4 temp:pt-0 text-sm font-semibold leading-6 text-gray-900">Other ESPN Analytics Features <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="flex flex-wrap justify-between items-center">
            <div class="mt-8 flow-root sm:mt-12">
              <div class="sm:-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <a href="/receivers"><img src="../assets/rtm_screenshot.png" alt="App screenshot" width="2432" height="1442" class="rounded-md shadow-2xl ring-1 ring-gray-900/10" /></a>
              </div>
            </div>
            <!-- <div class="mt-8 flow-root sm:mt-12">
              <div class="sm:-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <a href="/wnba-wpa"><img src="../assets/wpa_screenshot.png" alt="App screenshot" width="2432" height="1442" class="rounded-md shadow-2xl ring-1 ring-gray-900/10" /></a>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#c31e32] to-[#00aeef] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (min-width: 640px) {
  .width-calc {
    width: calc(50% - 40px);
  }
}
</style>