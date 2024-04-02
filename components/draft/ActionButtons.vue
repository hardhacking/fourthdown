<template>
  <div class="draft-btns" id="draft-btns">
    <div
      :class="startBtn"
      class="btn start-btn"
      id="start-btn"
      v-on:click="startDraft">
      {{ startPause }}
    </div>

    <div
      :class="stopBtn"
      class="btn stop-btn"
      id="stop-btn"
      v-on:click="makeTrade">
      Make Trade
    </div>

    <div
      :class="resetBtn"
      class="btn reset-btn"
      id="reset-btn"
      v-on:click="resetDraft">
      Cancel Draft
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      startPause: String,
      startBtn: String,
      stopBtn: String,
      resetBtn: String,
      startDraft: Function,
      makeTrade: Function,
      resetDraft: Function
    }
  }
</script>

<style>
  .draft-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0px;
  }

  .draft-btn {
    width: 50px;
    margin-top: 2px;
    font-size: 15px;
    height: 19px;
    padding: 2.5px 5px;
  }

  .btn:hover {
    background-color: #009ee2d5;
  }

  .btn {
    cursor: pointer;
    border-radius: 50px;
    background-color: #009ee2;
    color: white;
  }

  .start-btn,
  .stop-btn,
  .reset-btn {
    padding: 6px 6px;
    height: 30px;
    width: 175px;
    text-align: center;
    line-height: 17.5px;
  }

</style>