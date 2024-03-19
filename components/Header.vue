<template>
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8">
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">ESPN Analytics</span>
            <img class="h-8 w-auto" src="../assets/logo.png" alt="" />
          </a>
        </div>
        
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <!-- <Popover class="relative">
            <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <span>NFL</span>            
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
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-lg font-semibold leading-6 text-gray-900">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"> <span aria-hidden="true"></span></a> <!-- &rarr; -->
        </div>
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" ></div>
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/vue/24/outline'
const navigation = [
  { name: 'March Madness (W)', href: 'wcbbGames'},
  { name: 'March Madness (M)', href: 'mcbbGames'},
  // { name: '4th Downs', href: 'decision' },
  { name: 'RTMs', href: 'rtm' },
  // { name: 'W18 Draft Picks', href: 'draft' },
]
const nfl = [
  { name: '4th Downs', description: 'See 4th down decision breakdowns', href: '/decision', icon: ChartPieIcon },
  { name: 'Receiver Tracking Metrics', description: 'Evaluate pass catchers a number of ways', href: '/rtm', icon: CursorArrowRaysIcon },
  { name: 'Live Draft Pick Chances', description: "Live chances at a top 5 pick during Week 18", href: '/draft', icon: FingerPrintIcon },
]
const mcbb = [
  { name: '4th Downs', description: 'See 4th down decision breakdowns', href: '/decision', icon: ChartPieIcon },
  { name: 'Receiver Tracking Metrics', description: 'Evaluate pass catchers a number of ways', href: '/rtm', icon: CursorArrowRaysIcon },
  { name: 'Live Draft Pick Chances', description: "Live chances at a top 5 pick during Week 18", href: '/draft', icon: FingerPrintIcon },
]
const wcbb = [
  { name: '4th Downs', description: 'See 4th down decision breakdowns', href: '/decision', icon: ChartPieIcon },
  { name: 'Receiver Tracking Metrics', description: 'Evaluate pass catchers a number of ways', href: '/rtm', icon: CursorArrowRaysIcon },
  { name: 'Live Draft Pick Chances', description: "Live chances at a top 5 pick during Week 18", href: '/draft', icon: FingerPrintIcon },
]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]
const mobileMenuOpen = ref(false)
</script>