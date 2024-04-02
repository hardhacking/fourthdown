<template>
  <div class="top-draft" id="top-draft">
    <div class="team-draft-info">

      <img
        v-if="selectedTeam"
        class="team-image"
        :src="`https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/${selectedTeam && selectedTeam.id}.png`"
      />

      <div class="pick-info-cont">
        <div class="pick-info">
          <div class="next-pick" id="next-pick">Your Next Pick: {{ nextPickText }}</div>
          <div class="on-clock" id="on-clock">Before You: {{ onClock }}</div>
        </div>
      </div>
      <div class="user-pick" id="user-pick" v-if="userTurn">
        <div class="on-clock-text">You're on the clock!</div>
        <div class="pick-btn btn" v-on:click="makePick">Make Pick</div>
        <div
          v-if="expanded"
          class="expander"
          id="expander">
            Close Team:
            <img
              class="expand-img"

              v-on:click="expandDraft">
        </div>
        <!-- src="@/../public/dropup.png" -->
        <!-- <div v-else class="expander" id="expander">Team Picks:<img class="expand-img" src="@/../public/drop.png" v-on:click="expandDraft"></div> -->

      </div>
      <div class="user-draft" id="user-draft" v-else>
        <div
          :class="boardBtn"
          class="board-btn"
          v-on:click="makePick">
          Big Board
        </div>

        <div
          v-if="expanded"
          class="expander"
          id="expander">
          Close Team:
          <img
            class="expand-img"
            
            v-on:click="expandDraft">
        </div>
        <!-- src="@/../public/dropup.png" -->
        <!-- <div v-else class="expander" id="expander">Team Picks:<img class="expand-img" src="@/../public/drop.png" v-on:click="expandDraft"></div> -->
      </div>
    </div>
    <div class="user-picks" id="user-picks">
      <div class="all-picks" id="all-picks" v-for="pick in allPicks">
        <div class="team-pick" id="team-pick">{{ pick.pick }}</div>
        <div class="team-player" id="team-player">{{ pick.player_text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      allPicks: Array,
      selectedTeam: Object,
      boardBtn: String,
      nextPickText: Number,
      onClock: String,
      userTurn: Boolean,
      expanded: Boolean,
      makePick: Function,
      expandDraft: Function
    }
  }
</script>

<style>
  .top-draft {
    background-color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid #e5e5e5;
    /* margin: 0px 5px; */
    padding: 5px;
  }

  .team-draft-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .pick-info-cont {
    display: flex;
    justify-content: flex-end;
    width: 51%;
  }

  .user-draft,
  .user-pick {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    width: 32.5%;
  }

  .on-clock-text {
    font-size: 10px;
  }

  .pick-btn {
    padding: 5px;
    display: block !important;
    margin-right: 4px;
  }

  .btn {
    cursor: pointer;
    border-radius: 50px;
    background-color: #009ee2;
    color: white;
  }

  .btn:hover {
    background-color: #009ee2d5;
  }

  .expander {
    font-size: 10px;
    align-items: center;
    width: 85px;
    justify-content: flex-end;
    display: flex;
  }

  .expand-img {
    height: 20px;
    cursor: pointer;
  }

  .board-btn {
    padding: 5px;
  }

  .user-picks {
    display: none;
    text-align: start;
  }

  /* .team-pick {
    width: 50px;
  } */

  .team-player {
    width: calc(100% - 50px);
  }

  .team-image {
    width: 40px;
    height: 40px;
  }
</style>