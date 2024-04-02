<template>
  <div class="w-[393px] md+:mr-[14px]">
    <div class="speed-label ml-[18px] mt-4 mb-[9px] text-sm font-black text-black h-[17px]">Speed</div>
    <div class="flex w-full justify-between px-[18px]">
      <div :class=getClasses(speed.speed)
        class="speed-button"
        v-for="speed in speedList"
        v-on:click="setSpeed(speed.speed)"
      >
        {{ speed.speed }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectedSpeed: String,
      updateSelectedSpeed: Function
    },
    data() {
      return {
        speedList: [
          { speed: 'Normal' },
          { speed: 'Fast' },
          { speed: 'Turbo' },
          { speed: 'Lightspeed' }
        ],
      }
    },
    methods: {
      setSpeed(speed) {
        this.updateSelectedSpeed(speed)
      },
      getClasses(speed) {
        let classes = 'flex flex-col justify-center items-center gap-1 p-3 w-[82.791px] h-11 rounded text-Data-Blue-Dark text-xs font-semibold cursor-pointer'
        if (speed === this.selectedSpeed) {
          classes += " border-2 border-Data-Blue-Light bg-Data-Blue-Light-bg";
        } else {
          classes += " border border-Sports-Gray-40";
        }
        return classes
      }
    }
  }
</script>

<style scoped>
.speed-label {
  /* font-family: "SF Pro Text"; */
  line-height: normal;
}
.speed-button {
  /* font-family: "SF Pro Text"; */
  line-height: normal;
}
</style>