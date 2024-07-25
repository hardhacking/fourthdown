<template>
    <div class="m-12 flex items-center">
        <div class="pr-2.5 w-[67.5px] font-black text-espngray-600">{{ title }}</div>
        <div class="relative grow-[2]">
            <div class="absolute border-t-2 border-espngray-600 border-dotted h-0 w-full" v-if="title=='Overall'"></div>
            <div class="absolute border-t-2 border-espnred border-dotted h-0 w-full" v-else-if="title=='Shots'"></div>
            <div class="absolute border-t-2 border-emerald-400 border-dotted h-0 w-full" v-else-if="title=='Reb'"></div>
            <div class="absolute border-t-2 border-espncyan-200 border-dotted h-0 w-full" v-else-if="title=='Ast'"></div>
        </div>
        <div class="p-1.5 text-xs">{{ low }} -</div>
        <div class="flex justify-end h-[52px] overflow-visible relative">
            <div v-for="player in arr" :style="{ 'margin-right': `${player['gap' + value]}px`}">
                <div v-if="player.type == 'array' && player.array.length == 2" class="-mt-[40px]" :style="{ 'margin-right': `${player.array[0]['gap' + value]}px` }">
                    <div v-for="p in player.array" :key="p.dot_com_id">
                        <div>
                            <WNBAPlayerCircle :player="p" :rank="title" :value="value" :title="title" />
                        </div>
                    </div>
                </div>
                <div v-else-if="player.type == 'array' && player.array.length == 3" class="-mt-[66px]" :style="{ 'margin-right': `${player.array[0]['gap' + value]}px` }">
                    <div v-for="p in player.array" :key="p.dot_com_id">
                        <div>
                            <WNBAPlayerCircle :player="p" :rank="title" :value="value" :title="title" />
                        </div>
                    </div>
                </div>
                <div v-else>
                    <WNBAPlayerCircle :player="player" :rank="title" :value="value" :title="title" />
                </div>
            </div>
            <div class="h-px w-full bg-espngray-600 absolute top-1/2" v-if="title=='Overall'"></div>
            <div class="h-px w-full bg-espnred absolute top-1/2" v-else-if="title=='Shots'"></div>
            <div class="h-px w-full bg-emerald-400 absolute top-1/2" v-else-if="title=='Reb'"></div>
            <div class="h-px w-full bg-espncyan-200 absolute top-1/2" v-else-if="title=='Ast'"></div>
        </div>
        <div class="highend">- {{ high }}</div>
    </div>
</template>

<script>
// import WNBAPlayerCircle from '@/components/WNBAPlayerCircle.vue'

export default {
    name: 'WNBALineScale',
    // components: { WNBAPlayerCircle },
    data() {
        return {
            low: 0,
            high: 0,
        }
    },
    props: {
        arr: Array,
        title: String,
        value: String,
    },
    mounted() {
        if (this.arr && this.arr.length > 0) {
            if (this.arr[this.arr.length - 1].type == 'array') { this.high = this.arr[this.arr.length - 1].array[0][this.value]; }
            else { this.high = this.arr[this.arr.length - 1][this.value]; }
            if (this.arr[0].type == 'array') { this.low = this.arr[0].array[0][this.value]; }
            else { this.low = this.arr[0][this.value]; }
        }
    },


}
</script>

<style scoped>
.wrapper {
    margin: 50px;
    display: flex;
    align-items: center;
}
.catagory_title {
    padding-right: 10px;
    width: 67.5px;
}
.filler {
    flex-grow: 2;
    position: relative;
}
.line {
    position: absolute;
    border-top: 2px dotted rgb(152, 152, 152);
    height: 0px;
    width: 100%;
}
.player_container {
    display: flex;
    justify-content: flex-end;
    height: 52px;
    overflow: visible;
    position: relative;
}
.hardline {
    height: 1px;
    width: 100%;
    background-color: rgb(90, 90, 90);
    position: absolute;
    z-index: -1;
    top: 50%;
}
.highend, .lowend {
    padding: 5px;
    font-size: 12px;
}
.stacked {
    margin-top: -30px;
}
</style>