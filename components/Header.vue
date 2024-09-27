<template>
    <header class="absolute inset-x-0 top-0 z-20 border-b border-[#9D9E9F]">
      <nav class="flex items-center justify-between p-6 lg:px-8">
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">ESPN Analytics</span>
            <img class="h-10 w-auto" src="../assets/logo.png" alt="" />
          </a>
        </div>
        
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12 lg:items-center">
          <Popover class="relative px-10 w-[170px] text-center">
            <PopoverButton class="inline-flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900 focus-visible:outline-none">
              <span>NFL</span>            
            </PopoverButton>
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div class="p-4">
                    <div v-for="item in mcbb" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div class="w-[316px]">
                        <a :href="item.href" class="font-semibold text-gray-900">
                          {{ item.name }}
                          <span class="absolute inset-0" ></span>
                        </a>
                        <p class="mt-1 text-gray-600">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <Popover class="relative w-[170px] text-center">
            <PopoverButton class="inline-flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900 focus-visible:outline-none">
              <span>Everything Else</span>            
            </PopoverButton>
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div class="p-4 max-h-[450px] overflow-y-auto">
                    <div v-for="item in wcbb" :key="item.name" class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div class="w-[316px]">
                        <a :href="item.href" class="font-semibold text-gray-900">
                          {{ item.name }}
                          <span class="absolute inset-0" ></span>
                        </a>
                        <p class="mt-1 text-gray-600">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- <Popover class="relative w-[170px] text-center">
            <PopoverButton class="inline-flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900 focus-visible:outline-none">
              <span>Other NFL</span>            
            </PopoverButton>
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div class="p-4">
                    <div v-for="item in nfl" :key="item.name" class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <a :href="item.href" class="font-semibold text-gray-900">
                          {{ item.name }}
                          <span class="absolute inset-0" ></span>
                        </a>
                        <p class="mt-1 text-gray-600">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                      <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover> -->
          <!-- <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-lg font-semibold leading-6 text-gray-900">{{ item.name }}</a> -->
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/" class="text-sm font-semibold leading-6 text-gray-900"> <span aria-hidden="true"></span></a> <!-- &rarr; -->
        </div>
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-[100]" ></div>
        <DialogPanel class="fixed inset-y-0 right-0 z-[100] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">ESPN Analytics</span>
              <img class="h-8 w-auto" src="../assets/logo.png" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <!-- <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
              </div> -->
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, CubeTransparentIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { InformationCircleIcon, PresentationChartLineIcon, ForwardIcon, ChartBarIcon, 
         ArrowTrendingUpIcon, ListBulletIcon } from '@heroicons/vue/24/outline'
import { CalendarDaysIcon } from '@heroicons/vue/20/solid'
const navigation = [ 
  { name: 'WNBA Player Metrics', href: '/wnba-wpa'},
  { name: 'NFL 4th Downs', href: '/decision'},
  { name: 'NFL Receiver Scores', href: '/receivers'}
]
// const nfl = [
//   { name: 'Receiver Scores', description: 'Evaluate pass catchers a number of ways', href: '/receivers', icon: CubeTransparentIcon },
//   { name: '4th Downs', description: 'See 4th down decision breakdowns', href: '/decision', icon: InformationCircleIcon },
//   { name: 'Live Draft Pick Chances', description: "Live chances at a top 5 pick during Week 18", href: '/draft-order', icon: PresentationChartLineIcon },
// ]
const mcbb = [
  { name: '4th Downs', description: 'See 4th down decision breakdowns', href: '/decision', icon: InformationCircleIcon }, 
  { name: 'Receiver Scores', description: 'Evaluate pass catchers a number of ways', href: '/receivers', icon: CubeTransparentIcon },
  { name: 'Schedule Analysis', description: 'How does the NFL schedule impact each team?', href: '/schedule', icon: CalendarDaysIcon }
]
const wcbb = [
  { name: 'WNBA Player Metrics', description: 'Measuring impact for WNBA players using Win Probability Added', href: '/wnba-wpa', icon: CubeTransparentIcon },
  { name: 'NBA Draft Simulator', description: 'Be the GM and run a full simulation of the NFL Draft, make picks, trades and more', href: '/nba-draft-sim', icon: ForwardIcon },
  { name: 'NBA Draft Day Predictor', description: 'Projections for how the NFL Draft will unfold', href: '/nba-draft-predictor', icon: ChartBarIcon },
  { name: 'NBA Mock Draft Builder', description: 'Be the GM for every team in the NFL Draft, make picks, trades and more', href: '/nba-mock-draft', icon: ListBulletIcon }, 
  { name: 'NFL Draft Day Predictor', description: 'Projections for how the NFL Draft will unfold', href: '/draft-predictor', icon: ChartBarIcon },
  { name: 'NFL Draft Simulator', description: 'Be the GM and run a full simulation of the NFL Draft, make picks, trades and more', href: '/draft-sim', icon: ForwardIcon },
  { name: 'NFL Mock Draft Builder', description: 'Be the GM for every team in the NFL Draft, make picks, trades and more', href: '/mock-draft', icon: ListBulletIcon },
  { name: 'Women\'s Games', description: 'Full win probability wall for all women\'s games', href: '/wcbb-games', icon: ArrowTrendingUpIcon },
  { name: 'Women\'s Projections', description: 'Table showing live chances to advance to each round', href: '/wcbb-all', icon: ChartBarIcon },
  { name: 'Men\'s Games', description: 'Full win probability wall for all men\'s games', href: '/mcbb-games', icon: ArrowTrendingUpIcon },
  { name: 'Men\'s Projections', description: 'Table showing live chances to advance to each round', href: '/mcbb-all', icon: ChartBarIcon },
  { name: 'Live Draft Pick Chances', description: "Live chances at a top 5 pick during Week 18", href: '/draft-order', icon: PresentationChartLineIcon }
]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]
const mobileMenuOpen = ref(false)
</script>