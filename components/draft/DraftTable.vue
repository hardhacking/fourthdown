<template>
    <div class="draft-table" id="draft-table">
        <div class="tbl-rows" id="tbl-rows">
            <div class ="tbl-row-cont" id="tbl-row-cont" v-for="(pick,index) in pickData">
            <RoundBanner 
                :pick="pick.pick"
            />
            <PickRow 
                :pick="pick"
                :index="index"
                :currentPick="currentPick"
                :draftStarted="draftStarted"
            />
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    props: {
        pickData: Array, 
        currentPick: Number,
        draftStarted: Boolean
    }, 
  }
</script>

<style scoped>
    .draft-table {
        width: 100%;
    }

</style>