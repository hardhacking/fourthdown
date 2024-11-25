<template>
    <div class="player_circle hover:z-20 flex flex-col items-center relative z-10">
        <div class="h-12 w-12 border border-neutral-300 overflow-hidden flex items-center justify-center rounded-[50%] bg-white outline-2 outline-white hover:border-espncyan-200">
            <img :src="playerURL" class="h-[49.5px] w-[69px] max-w-none" />
        </div>
        <div class="info_text text-xs w-16 p-0.5 z-[5] bg-espngray-100 text-center">{{ player.last_nm }}</div>
        <div class="info_wrapper absolute hidden bg-white p-1 border border-neutral-300 rounded-sm -top-[45px] right-[15px] float-right after:content[' '] after:absolute after:right-[5px] after:-bottom-[5px] after:border-t-[5px] after:border-t-neutral-500 after:border-x-[5px] after:border-x-transparent after:border-b-0">
            <div class="text-xs whitespace-nowrap text-left font-normal"><b>{{ player.full_nm }}</b> {{ player.position }} - {{ player.tm }}</div>
            <div class="text-xs whitespace-nowrap text-left font-normal">{{ subtitle }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerCircle',
    components: {},
    data() {
        return {
            playerURL: '',
            subtitle: ''
        }
    },
    props: {
        player: Object,
        rank: String,
        value: String,
        title: String,
        league: String,
    },
    mounted() {
        this.subtitle = this.title + ' score: ' + this.player[this.value];
        this.playerURL = `https://a.espncdn.com/i/headshots/${this.league}/players/full/${this.player.dot_com_id}.png`
    },
}
</script>

<style scoped>
/* .image {
    height: 50px;
    width: auto;
    margin-left: -8.4px;
} */
/* .subtext {
    font-size: 10px;
    max-width: 52px;
    overflow: hidden;
    white-space: nowrap;
    background-color: white;
} */

/* .info_wrapper:after {
    content: " ";
    position: absolute;
    right: 5px;
    bottom: -5px;
    border-top: 5px solid rgb(124, 124, 124);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: none;
} */

.player_circle:hover .info_wrapper {
    display: block;
}

.player_circle:hover .info_text {
    font-weight: 600;
}
</style>