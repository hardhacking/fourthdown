<template>
  <div class="flex flex-col items-center md:w-[786px] md+:w-[814px] md:items-start md:m-auto">
    <div class="team-label w-[393px] pl-[18px] mt-6 md:mt-0 text-sm font-black text-black">Choose your team</div>
    <div class="flex flex-wrap justify-around md:justify-start mb-20 md:mb-10">
      <div
        class="relative"
        v-for="team in teamList"
        v-on:click="getTeam(team)" 
      >
        <div :class=showCheck(team)></div>
        <div 
          :class="getClasses(team)"
          :style="`background-color: ${team.color};`"
        >
          <img class="bg-image max-w-screen-2xl" :src="`https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/`+team.id+`.png`" />
          <div class="flex items-center md:flex-col md:justify-center md:mt-[13px]">
            <img class="team-image" :src="`https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/`+team.id+`.png`"/>
            <div class="team-name ml-1 md:ml-0 md:leading-tight md:mt-[-4px] text-white text-base font-black">{{ team.full_team }}</div>
          </div>
          <div>
            <div class="team-pick mr-4 md:mr-0 md:h-[45px] md:mb-[2px] text-[35px] text-white">{{ team.pick }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import teams from "@/assets/teams.json";

  export default {
    props: {
      selectedTeam: Object,
      updateSelectedTeam: Function
    },
    data() {
      return {
        teamList: []
      }
    },
    created() {
      this.teamList = teams.map(({team, id, pick, color, full_team}) => ({team, id, pick, color, full_team}));
    },
    methods: {
      getTeam(team) {
        this.updateSelectedTeam(team);
      },
      getClasses(team) {
        let classes = 'team-square';
        if (team === this.selectedTeam) {
          classes += ' selected';
        }

        return classes;
      },
      showCheck(team) {
        let classes = 'show-check'
        if (team === this.selectedTeam) {
          return classes
        } else {
          return classes + ' no-check'
        }
      }
    }
  }
</script>

<style scoped>
/* .team-label {
  font-family: "SF Pro Text";
} */
/* .team-name { */
  /* font-family: "SF Pro Text"; */
  /* line-height: normal; */
/* } */
.team-pick {
  /* font-family: "Tungsten; */
  line-height: normal;
}
.no-check {
  display: none
}
.show-check {
  position: absolute;
  top: 3px;
  right: 9px;
  background-color: #0D830F;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  z-index: 1;
}
.bg-image {
  position: absolute;
  bottom: -84px;
  left: -37px;
  width: 200px;
  height: 200px;
  padding: 20px 18.586px 20px 20px;
  opacity: .1;
}

  .team-square {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    height: 56px;
    width: 357px;
    display: flex;
    text-align: end;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    margin: 16px 18px 0px 18px;
    background: linear-gradient(90deg, rgba(217, 217, 217, 0.00) 0%, rgba(0, 0, 0, 0.00) 0.01%, rgba(0, 0, 0, 0.60) 100%);
  }

  .team-square.selected {
    border: 4px solid #0D830F;
    height: 64px;
    width: 365px;
    padding: 8px 12px;
    margin: 12px 14px -4px 14px;
  }

  .team-image {
    width: 40px;
    height: 40px;
  }

@media only screen and (min-width: 786px) {
  .show-check {
    top: 0px;
    right: -14px;
  }
  .bg-image {
    top: -76px;
    left: -100px;
    bottom: 0;
    width: 240px;
    height: 240px;
    padding: 20px 6px 20px 6px;
  }
  .team-square {
    height: 136px;
    width: 135.5px;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    padding: 0px 12px;
    margin: 16px 0px 0px 18px;
  }
  .team-square.selected {
    height: 144px;
    width: 143.5px;
    padding: 0px 12px;
    margin: 12px -4px -4px 14px;
  }
}

@media only screen and (min-width: 814px) {
  .team-square {
    width: 141px;
  }
  .team-square.selected {
    width: 149px;
  }
}
</style>