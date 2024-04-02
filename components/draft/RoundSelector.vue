<template>
  <div class="w-[393px] md+:ml-[14px]">
    <div class="speed-label ml-[18px] mt-4 mb-[9px] text-sm font-black text-black h-[17px]">Number of Rounds</div>
    <div class="flex w-full justify-between px-[18px]">
      <div
        :class=getClasses(round)
        v-for="round in roundList"
        v-on:click="setRound(round)"
      >
        {{ round }}
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      selectedRound: Number,
      updateSelectedRound: Function
    },
    data() {
      return {
        roundList: [1, 2, 3, 4, 5, 6, 7]
      }
    },
    methods: {
      setRound(round) {
        this.updateSelectedRound(round);
      },
      getClasses(round) {
        let classes = 'flex flex-col justify-center items-center gap-1 p-3 w-11 h-11 rounded text-Data-Blue-Dark text-xs font-semibold cursor-pointer'
        if (round && round <= this.selectedRound) {
          classes += " border-2 border-Data-Blue-Light bg-Data-Blue-Light-bg";
        } else {
          classes += " border border-Sports-Gray-40";
        }
        return classes;
      }
    }
  }
</script>