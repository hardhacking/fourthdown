<template>
    <div class="tbl-row" id="tbl-row" :class="getClasses(pick.pick)">
        <div class="pick-cell tbl-cell" id="pick-cell">Pick:<br>{{ pick.pick }}</div>
        <div class="team-cell tbl-cell" id="team-cell">{{ pick.team }}</div>
        <div class="player-cell tbl-cell" id="player-cell">{{ pick.player_text }}</div>
    </div>
</template>

<script>
  export default {
    props: {
        pick: Object, 
        index: Number, 
        currentPick: Number,
        draftStarted: Boolean
    }, 
    methods: {
        getClasses(pick) {
            if (pick == this.currentPick && this.draftStarted) {
                return 'border border-black bg-white'
            } else {
                return 'border-[0.5px] border-[#d7d5d5] bg-[#e5e5e5]'
            }
        }
    }
  }
</script>

<style scoped>
.tbl-row {
    display: flex;
    height: 50px;
    padding: 2px;
    align-items: center;
    /* background-color: #e5e5e5;
    border: 0.5px solid #d7d5d5; */
}
.tbl-cell {
    text-align: start;
}
.pick-cell {
    width: 15%;
}
.team-cell {
    width: 34%;
}
.player-cell {
    width: 51%;
}
  </style>