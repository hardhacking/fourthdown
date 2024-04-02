<template>
    <div class="nfl-mock-draft">
      <Banner/>
        <div class="page-cont" id="page-cont">
          <div class="pre-draft-page" id="pre-draft-page">
  
            <div class="flex flex-wrap justify-center">
              <SpeedSelector
                :selectedSpeed="selectedSpeed"
                :updateSelectedSpeed="updateSelectedSpeed"
              />
  
              <RoundSelector
                :selectedRound="selectedRound"
                :updateSelectedRound="updateSelectedRound"
              />
            </div>
            <div class="fixed bottom-0 md:static flex bg-white p-4 md:p-5 justify-around w-full z-10">
              <div :class=getLoadBtnClasses() 
                class="py-1 px-4 h-8 w-full sm:w-[170px] text-center flex flex-col justify-center items-center gap-1 text-white text-xs rounded-[100px] font-semibold" 
                v-on:click="loadDraft">Load Draft</div>
            </div>
  
            <TeamSelector
              :selectedTeam="selectedTeam"
              :updateSelectedTeam="updateSelectedTeam"
            />
          </div>
          <div class="draft-page" id="draft-page" ref="prePage">
            <div class="draft-head" id="draft-head">
  
              <ActionButtons
                :startPause="startPause"
                :startDraft="startDraft"
                :makeTrade="makeTrade"
                :resetDraft="resetDraft"
              />
  
              <TeamInfo
                :allPicks="allPicks"
                :selectedTeam="selectedTeam"
                :boardBtn="boardBtn"
                :nextPickText="nextPickText"
                :onClock="onClock"
                :userTurn="userTurn"
                :expanded="expanded"
                :makePick="makePick"
                :expandDraft="expandDraft"
              />
  
            </div>
            <DraftTable
              :pickData="pickData"
              :currentPick="currentPick"
              :draftStarted="draftStarted"
            />
          </div>
          <div class="post-draft" id="post-draft">
            <div class="post-draft-head" id="post-draft-head">
              <div class="post-draft-btns" id="post-draft-btns">
                <div :class="resetBtn" class="reset-btn" id="reset-btn" v-on:click="resetDraft">New Draft</div>
                <div :class="expBtn" class="save-btn btn" id="save-btn" v-on:click="expMobileDraft">Save Image</div>
                <div :class="expBtn" class="exp-btn" id="exp-btn" v-on:click="expDraft">Share</div>
              </div>
              <div class="post-draft-grade-cont">
                <div class="top-draft-post" id="post-top-draft1" ref="capture">
                  <div class="post-draft-user-header">
                    <img class="team-logo" :src="getImg(selectedTeamLogo)" />
                    <div class="post-team-name">{{  }} Draft</div><!-- selectedTeam -->
                    <img class="ea-post" src="@/assets/ea3.png" />
                  </div>
                  <div class="post-team-draft-info team-one">
                    <div class="pick-header">Pick</div>
                    <div class="player-header">Player</div>
                    <div class="chance-header">
                      <div class="rk-header">Player Rank</div>
                      <div class="chce-header">Chance Available at Pick</div>
                      <div class="chce-header2">Chance Available at Next Pick</div>
                    </div>
                  </div>
                  <div class="post-user-picks1" id="post-user-picks1">
                    <div class="post-all-picks" id="post-all-picks1" v-for="pick in allPicks">
                      <div class="post-team-pick" id="post-team-pick1">{{ pick.pick }}</div>
                      <div class="post-team-player" id="post-team-player1">{{ pick.player_text }}</div>
                      <div class="player-stats">
                        <div class="player-rk" id="post-player-rk">{{ pick.rk }}</div>
                        <div class="player-prob" id="post-player-prob">{{ pick.p }}%</div>
                        <div class="player-prob2" id="post-player-prob2">{{ pick.p2 }}%</div>
                      </div>
                    </div>
                  </div>
                  <div class="trade-cont" v-if="tradeSet.length > 0">
                    <div class="trade-headers">
                      <div class="trades-text">#</div>
                      <div class="gained-text">Gained</div>
                      <div class="lost-text">Lost</div>
                    </div>
                    <div class="trade" v-for="(trade, i) in tradeSet" v-if="(i + 1) < tradeSet.length">
                      <div class="trade-label">
                        <div class="trade-text" v-if="trade.forced">{{ i + 1 }}<sup>*</sup></div>
                        <div class="trade-text" v-else>{{ i + 1 }}</div>
                      </div>
                      <div class="gained-cont">
                        <div class="gained-assets-cont noscroll">
                          <div class="gained-assets" v-for="asset in trade.gained">
                            <div class="gained-pick" v-if="asset.substring(0, 4) == '2023'">&bull;Pick {{ asset.substring(5) }}</div>
                            <div class="gained-round" v-else>&bull;'{{ asset.substring(2, 4) }} {{ asset.substring(5) }}</div>
                          </div>
                        </div>
                        <div class="trade-arrow">&harr;</div>
                      </div>
                      <div class="lost-cont">
                        <div class="lost-assets-cont noscroll">
                          <div class="lost-assets" v-for="asset in trade.lost">
                            <div class="lost-pick" v-if="asset.substring(0, 4) == '2023'">&bull;Pick {{ asset.substring(5) }}</div>
                            <div class="lost-round" v-else>&bull;'{{ asset.substring(2, 4) }} {{ asset.substring(5) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="trade last-trade" v-for="(trade, i) in tradeSet" v-if="(i + 1) == tradeSet.length">
                      <div class="trade-label">
                        <div class="trade-text" v-if="trade.forced">{{ i + 1 }}<sup>*</sup></div>
                        <div class="trade-text" v-else>{{ i + 1 }}</div>
                      </div>
                      <div class="gained-cont">
                        <div class="gained-assets-cont noscroll">
                          <div class="gained-assets" v-for="asset in trade.gained">
                            <div class="gained-pick" v-if="asset.substring(0, 4) == '2023'">&bull;Pick {{ asset.substring(5) }}</div>
                            <div class="gained-round" v-else>&bull;'{{ asset.substring(2, 4) }} {{ asset.substring(5) }}</div>
                          </div>
                        </div>
                        <div class="trade-arrow">&harr;</div>
                      </div>
                      <div class="lost-cont">
                        <div class="lost-assets-cont noscroll">
                          <div class="lost-assets" v-for="asset in trade.lost">
                            <div class="lost-pick" v-if="asset.substring(0, 4) == '2023'">&bull;Pick {{ asset.substring(5) }}</div>
                            <div class="lost-round" v-else>&bull;'{{ asset.substring(2, 4) }} {{ asset.substring(5) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="forced-note" v-if="tradeSet.filter(f => f.forced).length > 0">*Forced</div>
                  </div>
                  <div class="esa-link-text">espnsportsanalytics.com</div>
                </div>
                <div class="post-top-draft" id="post-top-draft2">
                  <div class="post-team-draft-info">
                    <img class="team-logo" :src="getImg(otherTeamLogo)" />
                    <form class="form-team" id="form-team">
                      <select class="team-input" name="team" id="team-input" @change="getTeamPost($event)">
                        <option v-for="team in teamList" :value="team.team">
                          {{ team.team }}
                        </option>
                      </select>
                    </form>
                  </div>
                  <div class="post-user-picks" id="post-user-picks2">
                    <div class="post-all-picks2" id="post-all-picks2" v-for="pick in otherTeamPicks">
                      <div class="post-team-pick2" id="post-team-pick2">{{ pick.pick }}</div>
                      <div class="post-team-player2" id="post-team-player2">{{ pick.player_text }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="download-popup-cont" v-if="phoneDnld" v-on:click="exitDnld($event)">
          <div class="dnld-inst">Hold or right click to save<div class="exit-output">X</div></div>
          <img class="output-img2" id="output-img2" :src="output" />
        </div>
        <div class="player-popup-cont" id="player-popup-cont" v-if="userTurnWindow" v-on:click="exitPick($event)">
          <div class="player-popup">
            <div class="popup-head">
              <div class="head-toprow">
                <div class="pick-num">Pick No. {{ currentPick }}</div>
                <div class="exit" id="exit" v-on:click="exitPick($event)">X</div>
              </div>
              <div class="head-2rows">
                <div class="head-row2">
                  <form class="form-pos" id="form-pos">
                    <label class="label-pos" id="label-pos" for="team">Filter:</label>
                    <select class="pos-input" name="pos" id="pos-input" @change="getPos($event)">
                      <option value="" selected>Pos</option>
                      <option v-for="pos in posList" :value="pos">
                        {{ pos }}
                      </option>
                    </select>
                  </form>
                  <!-- <div class="search-players">Search</div> -->
                </div>
                <div class="head-row3" id="head-row3">
                  <div class="selected-player">{{ selectedPlayer }}</div>
                  <div :class="draftBtn" class="draft-btn" id="draft-btn" v-on:click="draftPlayer">Draft</div>
                </div>
                <div class="myProgress2" id="myProgress2">
                  <div class="myBar2-label" id="myBar2-label">Drafting Player</div>
                  <div class="myBar2" id="myBar2"></div>
                </div>
              </div>
            </div>
            <div class="player-table-cont">
              <table class="player-table" v-if="selectedPos == ''">
                <tr class="labels">
                  <th class="th-player first-col">Player</th>
                  <th class="th-player">Position</th>
                  <!-- <th class="th-game">Availability</th> -->
                  <th class="th-player last-col">Rank</th>
                </tr>
                <tr class="table-row" v-for="(player,index) in playersToPick" v-on:click="getPlayer($event)">
                  <td class="td-player first-col">{{ player.player }}</td>
                  <td class="td-player">{{ player.pos }}</td>
                  <!-- <td class="td-game">{{ player.p }}</td> -->
                  <td class="td-player last-col">{{ player.rank }}</td>
                </tr>
              </table>
              <table class="player-table" v-else>
                <tr class="labels">
                  <th class="th-player first-col">Player</th>
                  <th class="th-player">Position</th>
                  <!-- <th class="th-game">Availability</th> -->
                  <th class="th-player last-col">Rank</th>
                </tr>
                <tr class="table-row" v-for="(player,index) in sortedPlayersToPick" v-on:click="getPlayer($event)">
                  <td class="td-player first-col">{{ player.player }}</td>
                  <td class="td-player">{{ player.pos }}</td>
                  <!-- <td class="td-game">{{ player.p }}</td> -->
                  <td class="td-player last-col">{{ player.rank }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="trade-popup-cont" id="trade-popup-cont" v-if="userTradeWindow" v-on:click="exitTrade($event)">
          <div class="trade-popup">
            <div class="first-team-trade">
              <div class="trade-top-team">
                <img class="team-logo" :src="getImg(selectedTeamLogo)" />
                <div class="exit mtneg" id="exit" v-on:click="exitTrade($event)">X</div>
              </div>
              <div class="all-assets">
                <div class="single-asset" id="single-assets" v-for="(asset,index) in teamAssets" :key="index" ref="assets1">
                  <div class="asset" v-if="Number(asset.pick) < 260">
                    <div class="asset-title">2023</div>
                    <div class="asset-pick" v-on:click="getAsset($event, index, 1)">{{ asset.pick }}</div>
                  </div>
                  <div class="asset-fut" v-else-if="Number(asset.pick) == 260">
                    <div class="asset-title">2024</div>
                    <div class="asset-round" v-on:click="getAsset($event, index, 1)">R{{ asset.round }}</div>
                  </div>
                  <div class="asset-fut" v-else-if="Number(asset.pick) == 261">
                    <div class="asset-title">2025</div>
                    <div class="asset-round" v-on:click="getAsset($event, index, 1)">R{{ asset.round }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="second-team-trade">
              <div class="post-team-draft-info">
                <img class="team-logo" :src="getImg(otherTeamLogo)" />
                <form class="form-team" id="form-team">
                  <select class="trade-team-input" name="trade" id="trade-team-input" @change="getTeamTrade($event)">
                    <option v-for="team in teamList" :value="team.team">
                      {{ team.team }}
                    </option>
                  </select>
                </form>
              </div>
              <div class="all-assets">
                <div class="single-asset" id="single-assets" v-for="(asset,index) in otherTeamAssets" :key="index" ref="assets2">
                  <div class="asset" v-if="Number(asset.pick) < 260">
                    <div class="asset-title">2023</div>
                    <div class="asset-pick" v-on:click="getAsset($event, index, 2)">{{ asset.pick }}</div>
                  </div>
                  <div class="asset-fut" v-else-if="Number(asset.pick) == 260">
                    <div class="asset-title">2024</div>
                    <div class="asset-round" v-on:click="getAsset($event, index, 2)">R{{ asset.round }}</div>
                  </div>
                  <div class="asset-fut" v-else="Number(asset.pick) == 261">
                    <div class="asset-title">2025</div>
                    <div class="asset-round" v-on:click="getAsset($event, index, 2)">R{{ asset.round }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="propose-btn-cont">
              <div class="myProgress3" id="myProgress3">
                <div class="myBar3-label" id="myBar3-label">Trading Assets</div>
                <div class="myBar3" id="myBar3"></div>
              </div>
              <div class="failed" id="failed" v-if="forceTrade">
                <div>The {{ this.otherTeam }} didn't accept your trade, force anyway?</div><div class="force-sub">Otherwise, change team/assets</div>
              </div>
              <div :class="propBtn" class="propose-btn" id="propose-btn" v-on:click="proposeTrade">{{ tradeButtonText }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  
    <script>
    import draft from '@/assets/draft.json';
    import picks from '@/assets/picks.json';
    import teams from '@/assets/teams.json';
    import players from '@/assets/players.json';
    import assets from '@/assets/assets.json';
    import avail from '@/assets/avail.json';
    import jj_val from '@/assets/jj_val.json';
    import html2canvas from 'html2canvas';
    import dropped from '@/assets/dropped.json';
    import { v4 as uuidv4 } from 'uuid';
    import * as d3 from 'd3'
  
    export default {
      data() {
        return {
          assets: [],
          playerData: [],
          pickData: [],
          pickInterval: null,
          pickCounter: 0,
          teamList: [],
          selectedTeamLogo: 'temp',
          playerList: [],
          playersToPick: [],
          sortedPlayersToPick: [],
          sortedPlayers: [],
          posList: [],
          selectedPos: '',
          selectedPlayer: '',
          currentPick: 0,
          currentTeam: '',
          biNormalized: [],
          draftGoing: false,
          draftStarted: false,
          prevPick: null,
          prevTeam: '',
          prevPlayer: '',
          lastPlayer: 0,
          lastPick: 0,
          onClock: '',
          nextPick: 0,
          nextPickText: 0,
          teamPicks: 0,
          allPicks: [],
          loadedPicks: [],
          chosenSpeed: 500,
          expanded: false,
          userTurn: false,
          userTurnWindow: false,
          userTradeWindow: false,
          loadBtn: 'disabled-btn',
          startBtn: 'btn',
          stopBtn: 'btn',
          resetBtn: 'btn',
          propBtn: 'disabled-btn',
          draftBtn: 'disabled-btn',
          boardBtn: 'btn',
          startPause: 'Start Draft',
          expBtn: 'btn',
          otherTeam: '',
          otherTeamLogo: 'temp',
          otherTeamPicks: [],
          teamAssets: [],
          otherTeamAssets: [],
          output: null,
          jjVal: [],
          tradeButtonText: 'Propose Trade',
          forceTrade: false,
          exportBtns: false,
          phoneDnld: false,
          tradeSet: [],
          currentRound: 1,
          deviceId: '',
  
          selectedRound: 3,
          selectedSpeed: 'Fast',
          selectedTeam: null,
        }
      },
      // watch: {
      //   selectedRound(newRound, oldRound) {
      //     // console.log('update selectedRound', newRound, oldRound);
      //   },
      //   selectedSpeed(newSpeed, oldSpeed) {
      //     // console.log('update selectedSpeed', newSpeed, oldSpeed);
      //   },
      //   selectedTeam(newTeam, oldTeam) {
      //     // console.log('update selectedTeam', newTeam.team, (oldTeam ? oldTeam.team : null));
      //   }
      // },
      created() {
        this.playerData = draft.map(d => ({ ...d }));
        this.pickData = picks.map(d => ({ ...d }));
        this.uniquePlayerData = players.map(d => ({ ...d }));
        this.teamList = teams.map(({team, id, pick}) => ({team, id, pick}));
        this.playerList = [];
        this.sortedPlayers = [...new Set(this.playerData.map(d => d.player))];
        this.posList = [...new Set(this.playerData.map(d => d.pos))];
        this.biNormalized = this.playerData.map(d => ({ ...d }));
        this.lastPlayer = this.uniquePlayerData.length;
        this.assets = assets.map(d => ({ ...d })).sort((a, b) => d3.descending(a.team, b.team));
        this.jjVal = jj_val.map(d => ({ ...d }));
        this.droppedPlayers = dropped.map(d => ({ ...d }));
        this.playersToPick = this.uniquePlayerData.filter(f => {
          return !(this.playerList.some(ff => ff == f.player));
        });
      },
      mounted() {
          // document.getElementById('round1').className = 'p-[15px] rounded text-[#012237] text-xs font-bold cursor-pointer border-2 border-espncyan-200 bg-espncyan-50'
          // document.getElementById('round2').className = 'p-[15px] rounded text-[#012237] text-xs font-bold cursor-pointer border-2 border-espncyan-200 bg-espncyan-50'
          // document.getElementById('round3').className = 'p-[15px] rounded text-[#012237] text-xs font-bold cursor-pointer border-2 border-espncyan-200 bg-espncyan-50'
          // document.getElementById('speedFast').className = 'p-[15px] rounded text-[#012237] text-xs font-bold cursor-pointer border-2 border-espncyan-200 bg-espncyan-50'
          try{
              this.deviceId = localStorage.getItem('deviceId')
          } catch(e) {
              this.deviceId = null
          }
          if (!(this.deviceId)) {
              this.deviceId = uuidv4() + Date.now();
              localStorage.setItem('deviceId', this.deviceId);
          }
      },
      methods: {
  
        updateSelectedRound(round) {
          this.selectedRound = round;
        },
        switchSpeed(speed) {
          switch(speed) {
            case 'Lightspeed':
                return 1;
            case 'Turbo':
                return 100;
            case 'Fast':
                return 500;
            case 'Normal':
                return 1000;
          }
        },
        updateSelectedSpeed(speed) {
          this.selectedSpeed = speed;
          this.chosenSpeed = this.switchSpeed(speed);
        },
        updateSelectedTeam(team) {
          this.selectedTeam = team;
        },
        getLoadBtnClasses() {
          return this.selectedTeam ? 'btn' : 'disabled-btn';
        },
  
        async putS3File(obj, folderName, fileName) {
          AWS.config.update({
              region: 'us-east-1',
              credentials: new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: 'us-east-1:e4d3ea19-0bcd-4e00-a2e1-9c2090e9bbc3',
              })
          });
  
          const buf = JSON.stringify(obj);
  
          let s3 = new AWS.S3();
          let params = {
            Bucket: "espn-nfl-draft-simulator",
            Key: folderName + "/" + fileName,
            Body: buf,
            ContentType: 'application/json'
          };
  
          s3.putObject(params, function(err, data) {
            if (err) {
              console.log(err, data);
            }
          })
        },
        async loadDraft() {
          document.getElementById('pre-draft-page').style.pointerEvents = 'none';
          const initPromise = new Promise(resolve => {
            // document.getElementById('myProgress').style.display = 'block';
            this.pickData = picks.filter(f => f.round <= this.selectedRound).map(d => ({ ...d }));
            this.lastPick = this.pickData.length;
            if (this.nextPick = this.pickData.filter(f => {
              return f.team == this.selectedTeam.team;
            })[this.teamPicks]) {
              this.nextPick = this.pickData.filter(f => {
                return f.team == this.selectedTeam.team;
              })[this.teamPicks].pick;
              this.nextPickText = this.nextPick;
            } else {
              this.nextPick = this.lastPick + 1;
              document.getElementById('on-clock').style.display = 'none';
              this.nextPickText = 'None';
            }
            this.onClock = (this.nextPick - this.currentPick - 1).toString();
  
            this.allPicks = this.pickData.filter(f => f.team == this.selectedTeam.team).map(({pick, player_text}) => ({pick, player_text}));
            if (this.allPicks.length == 0) {
              // document.getElementById('expander').style.display = 'none';
            } else {
              // document.getElementById('expander').style.display = 'flex';
            }
            setTimeout(() => {
              resolve();
            }, 1);
          });
          this.currentPick = 1;
          await initPromise;
          this.loadedPicks = await this.loadDraftPicks(1);
          this.$refs.prePage.scrollIntoView({ block: 'start' });
          document.getElementById('pre-draft-page').style.display = 'none';
          document.getElementById('draft-page').style.display = 'block';
          this.startPause = 'Start Draft';
          this.boardBtn = 'btn';
          this.teamList = this.teamList.filter(f => f.team != this.selectedTeam.team);
          this.teamList.sort((a,b) => {
            return d3.ascending(a.team, b.team);
          });
          document.getElementById('pre-draft-page').style.pointerEvents = 'auto';
        },
        startDraft() {
          this.otherTeam = '';
          if (this.startPause == 'Start Draft') {
            this.draftGoing = true;
            this.draftStarted = true;
            if (this.currentPick == 1) {
              // this.$refs.items[0].childNodes[this.$refs.items[0].childNodes.length - 1].style.border = '1px solid black';
              // this.$refs.items[0].childNodes[this.$refs.items[0].childNodes.length - 1].style.backgroundColor = 'white';
              this.currentTeam = this.teamList[0].team;
            }
            this.onClock = (this.nextPick - this.currentPick).toString();
            if (this.pickData[this.pickCounter].team == this.selectedTeam.team) {
              if (this.nextPick == 1) {
                if (this.nextPick = this.pickData.filter(f => {
                  return f.team == this.selectedTeam.team;
                })[this.teamPicks]) {
                  this.nextPick = this.pickData.filter(f => {
                    return f.team == this.selectedTeam.team;
                  })[this.teamPicks].pick;
                } else {
                  this.nextPick = this.lastPick + 1;
                  document.getElementById('on-clock').style.display = 'none';
                  this.nextPickText = 'None';
                }
                this.allPicks = this.pickData.filter(f => f.team == this.selectedTeam.team).map(({pick, player_text}) => ({pick, player_text}));
              }
              this.waitDraft();
            } else {
              this.startPause = 'Pause Draft';
              this.boardBtn = 'disabled-btn';
              this.pickInterval = setInterval(() => {
                this.slotTurnover(false);
              }, this.chosenSpeed)
            }
          } else {
            this.draftGoing = false;
            clearInterval(this.pickInterval);
            this.startPause = 'Start Draft';
            this.boardBtn = 'btn';
          }
        },
        stopDraft() {
          clearInterval(this.pickInterval);
        },
        async endDraft() {
          const initPromise = new Promise(resolve => {
            clearInterval(this.pickInterval);
            setTimeout(() => {
              resolve();
            }, this.chosenSpeed);
          });
  
          await initPromise;
          const regex = / [^ ]*$/;
          this.allPicks.map((d,i) => {
            const player_name = d.player_text.replace(regex, '');
            d.rk = this.playerData.filter(f => f.player == player_name).map(dd => dd.rank)[0];
            if (d.pick != 1) {
              d.p = Math.round(avail.filter(f => {
                return ((f.player == player_name) && (f.pick == d.pick));
              }).map(dd => dd.p)[0] * 100);
              if (!(d.p)) {
                if (this.droppedPlayers.map(d => d.player).some(f => f == player_name)) {
                  if (this.droppedPlayers.filter(f => f.player == player_name)[0].new_rank <= d.pick) {
                    d.p = '<5';
                  } else {
                    d.p = '>95';
                  }
                } else {
                  if (d.rk <= d.pick) {
                    d.p = '<5';
                  } else {
                    d.p = '>95';
                  }
                }
              } else if (d.p > 99) {
                d.p = '>99';
              } else if (d.p < 1) {
                d.p = '<1';
              }
            } else {
              d.p = '100';
            }
            if (i != (this.allPicks.length - 1)) {
              let nextPick = this.allPicks[i + 1].pick;
              d.p2 = Math.round(avail.filter(f => {
                return ((f.player == player_name) && (f.pick == nextPick));
              }).map(dd => dd.p)[0] * 100);
              if (!(d.p2)) {
                if (this.droppedPlayers.map(d => d.player).some(f => f == player_name)) {
                  if (this.droppedPlayers.filter(f => f.player == player_name)[0].new_rank <= nextPick) {
                    d.p2 = '<5';
                  } else {
                    d.p2 = '>95';
                  }
                } else {
                  if (d.rk <= nextPick) {
                    d.p2 = '<5';
                  } else {
                    d.p2 = '>95';
                  }
                }
              } else if (d.p2 > 99) {
                d.p2 = '>99';
              } else if (d.p2 < 1) {
                d.p2 = '<1';
              }
            } else {
              d.p2 = '--';
            }
          })
          if (this.selectedRound == 1) {
  
          }
          document.getElementById('draft-page').style.display = 'none';
          document.getElementById('post-draft').style.display = 'block';
          if (this.selectedRound < 3) {
            this.otherTeam = this.teamList.filter(f => f.team != this.selectedTeam.team)[1].team;
            this.otherTeamLogo = this.teamList.filter(f => f.team != this.selectedTeam.team)[1].id;
          } else {
            this.otherTeam = this.teamList.filter(f => f.team != this.selectedTeam.team)[0].team;
            this.otherTeamLogo = this.teamList.filter(f => f.team != this.selectedTeam.team)[0].id;
          }
          document.getElementById('team-input').selectedIndex = this.teamList.map(d => d.team).indexOf(this.otherTeam);
          this.otherTeamPicks = this.pickData.filter(f => f.team == this.otherTeam).map(({pick, player_text}) => ({pick, player_text}));
  
          const temp_draft = {
            'deviceId': this.deviceId,
            'team': this.selectedTeam.team,
            'time': new Date().getTime(),
            'rounds': this.selectedRound,
            'speed': this.chosenSpeed,
            'trades': this.tradeSet,
            'userPicks': this.allPicks,
            'draft': this.pickData.map(({pick, team, player_text}) => ({pick, team, player_text}))
          }
          this.putS3File(temp_draft, 'user_drafts', 'draft_' + uuidv4() + Date.now() + '_' + this.deviceId + '.json');
        },
        async makePick() {
          const initPromise = new Promise(resolve => {
            this.userTurnWindow = true;
            setTimeout(() => {
              resolve();
            }, 1);
          });
          await initPromise;
          this.playersToPick = this.uniquePlayerData.filter(f => {
            return !(this.playerList.some(ff => ff == f.player));
          });
          if (this.selectedPlayer != '') {
            document.getElementById('head-row3').style.display = 'flex';
          }
          if (this.selectedPos != '') {
            document.getElementById('pos-input').selectedIndex = this.posList.indexOf(this.selectedPos) + 1;
          }
        },
        async makeTrade() {
          const initPromise = new Promise(resolve => {
            this.userTradeWindow = true;
            setTimeout(() => {
              resolve();
            }, 1);
          });
          await initPromise;
          this.teamAssets = this.assets.filter(f => f.team == this.selectedTeam.team);
          var pickIndex = this.teamList.filter(f => f.team != this.selectedTeam.team).map(d => d.team).indexOf(this.pickData[this.pickCounter].team);
          if (pickIndex == -1) {
            let nextTeam = this.pickData.filter(f => {
              return f.pick > this.pickCounter+1;
            }).filter(ff => {
              return ff.team != this.selectedTeam.team;
            })[0].team;
            if (!nextTeam) {
              if (this.selectedTeam.team != '49ers') {
                nextTeam = '49ers';
              } else {
                nextTeam = 'Bears';
              }
            }
            pickIndex = this.teamList.filter(f => f.team != this.selectedTeam.team).map(d => d.team).indexOf(nextTeam);
          }
          if (this.otherTeam == '') {
            this.otherTeam = this.teamList.filter(f => f.team != this.selectedTeam.team)[pickIndex].team;
            this.otherTeamLogo = this.teamList.filter(f => f.team != this.selectedTeam.team)[pickIndex].id;
            document.getElementById('trade-team-input').selectedIndex = pickIndex;
          } else {
            document.getElementById('trade-team-input').selectedIndex = this.teamList.map(d => d.team).indexOf(this.otherTeam);
          }
          this.otherTeamAssets = this.assets.filter(f => f.team == this.otherTeam);
          this.startPause = 'Start Draft';
          this.boardBtn = 'btn';
          this.stopDraft();
        },
        waitDraft() {
          this.userTurn = true;
          this.expanded = true;
          this.userTurnWindow = true;
          this.playersToPick = this.uniquePlayerData.filter(f => {
            return !(this.playerList.some(ff => ff == f.player));
          });
          // if (!this.expanded) {
            document.getElementById('user-picks').style.display = 'block';
          // }
          clearInterval(this.pickInterval);
          this.loadedPicks = [];
          this.startBtn = 'disabled-btn';
          this.startPause = 'Start Draft';
          this.boardBtn = 'btn';
        },
        resetDraft() {
          // if (this.currentPick < this.$refs.items.length) {
          //   this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.border = '0.5px solid #d7d5d5';
          //   this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.backgroundColor = '#e5e5e5';
          // } else if (this.currentPick == this.$refs.items.length) {
          //   this.$refs.items[this.currentPick].childNodes[this.$refs.items[this.currentPick].childNodes.length - 1].style.border = '0.5px solid #d7d5d5';
          //   this.$refs.items[this.currentPick].childNodes[this.$refs.items[this.currentPick].childNodes.length - 1].style.backgroundColor = '#e5e5e5';
          // }
          this.$refs.prePage.scrollIntoView({ block: 'start' });
          this.output = null;
          clearInterval(this.pickInterval);
          // document.getElementById('myProgress').style.display = 'none';
          // document.getElementById('myBar').style.width = '1%';
          document.getElementById('pre-draft-page').style.display = 'block';
          document.getElementById('draft-page').style.display = 'none';
          document.getElementById('post-draft').style.display = 'none';
          document.getElementById('on-clock').style.display = 'block';
          document.getElementById('user-picks').style.display = 'none';
          document.getElementById('post-top-draft1').style.display = 'block';
          this.playerData = [];
          this.pickData = [];
          this.pickCounter = 0;
          this.teamList = [];
          this.selectedTeam = null;
          this.selectedTeamLogo = 'temp';
          this.playerList = [];
          this.sortedPlayers = [];
          this.posList = [];
          this.selectedPlayer = '';
          this.selectedPos = '';
          this.currentPick = 0;
          this.currentTeam = '';
          this.biNormalized = [];
          this.prevPick = null;
          this.prevTeam = '';
          this.draftGoing = false;
          this.draftStarted = false;
          this.prevPlayer = '';
          this.onClock = '';
          this.nextPick = 0;
          this.nextPickText = 0;
          this.allPicks = [];
          this.teamPicks = 0;
          this.loadedPicks = [];
          this.expanded = false;
          this.loadBtn = 'disabled-btn';
          this.draftBtn = 'disabled-btn';
          this.startPause = 'Start Draft';
          this.boardBtn = 'btn';
          this.propBtn = 'disabled-btn';
          this.startBtn = 'btn';
          this.userTurn = false;
          this.otherTeam = '';
          this.otherTeamLogo = 'temp';
          this.userTurnWindow = false;
          this.userTradeWindow = false;
          this.otherTeamPicks = [];
          this.teamAssets = [];
          this.otherTeamAssets = [];
          this.forceTrade = false;
          this.tradeButtonText = 'Propose Trade';
          this.tradeSet = [];
          this.exportBtns = false;
          this.phoneDnld = false;
          this.playerData = draft.map(d => ({ ...d }));
          this.pickData = picks.map(d => ({ ...d }));
          this.teamList = teams.map(({team, id, pick}) => ({team, id, pick}));
          this.sortedPlayers = [...new Set(this.playerData.map(d => d.player))];
          this.posList = [...new Set(this.playerData.map(d => d.pos))];
          this.biNormalized = this.playerData.map(d => ({ ...d }));
          this.assets = assets.map(d => ({ ...d })).sort((a, b) => d3.descending(a.team, b.team));
        },
        async loadDraftPicks(bar) {
          let count = 1;
  
          const updateProgressBar = () => {
            let nextPickArg = '';
            if (this.nextPick > this.lastPick) {
              nextPickArg = this.lastPick + 1;
            } else {
              nextPickArg = this.nextPick;
            }
            const currentPickArg = this.currentPick;
            const randPicks = Array.from(new Array(nextPickArg - currentPickArg), (x, i) => i + currentPickArg);
            const addProgress = 100 / randPicks.length;
            const percentage = addProgress * count;
            if (bar == 1) {
              // document.getElementById('myBar').style.width = `${percentage}%`;
            } else if (bar == 2) {
              if (document.getElementById('myBar2')) {
                document.getElementById('myBar2').style.width = `${percentage}%`;
              }
            } else {
              if (document.getElementById('myBar3')) {
                document.getElementById('myBar3').style.width = `${percentage}%`;
              }
            }
          }
  
          let loadUpDraft = async (nextPickArg, currentPickArg, binormalizeFun, randPickFun, playerDataArg,
                                   biNormalizedArg, playerListArg, pickCounterArg, lastPlayerArg, tempPickData) => {
            let loadedUpPicks = [];
            let returnedVars = [];
            if (nextPickArg > lastPlayerArg) {nextPickArg = lastPlayerArg + 1;}
            await new Promise(function (resolve, reject) {
              const randPicks = Array.from(new Array(nextPickArg - currentPickArg), (x, i) => i + currentPickArg);
              const interval = setInterval(() => {
                const pick_num = randPicks.shift();
                biNormalizedArg = binormalizeFun(biNormalizedArg, lastPlayerArg, pickCounterArg);
                var playerPicked = randPickFun(pick_num, biNormalizedArg, tempPickData);
  
                playerDataArg.filter(f => {
                  return f.player == playerPicked;
                }).map(d => {
                  d.selected = true;
                  return d;
                });
  
                const currPickSet = [...new Set(playerDataArg.filter(f => f.pick ==
                                     pick_num).filter(ff => ff.selected ==
                                     false).map(d => d.player))];
                const restPickSet = [...new Set(playerDataArg.filter(f => {
                  return f.pick > pick_num;
                }).map(d => d.player))];
  
                const unPicked = playerDataArg.filter(f => {
                  return (currPickSet.some(ff => ff == f.player) && !restPickSet.some(ff => ff == f.player));
                });
                if (unPicked.length > 0) {
                  const playerSet = [...new Set(unPicked.map(d => d.player))];
  
                  playerSet.forEach(player => {
                    let filteredUnPicked = unPicked.filter(f => f.player == player);
                    filteredUnPicked[0].p = 1;
                    filteredUnPicked[0].pick = pick_num + 1;
                    biNormalizedArg.push(filteredUnPicked[0]);
                  })
                }
                biNormalizedArg = biNormalizedArg.filter(f => {
                  return f.pick != pick_num;
                }).filter(ff => {
                  return ff.player != playerPicked;
                })
                // playerListArg = [...new Set(biNormalizedArg.map(d => d.player))];
                const playerPos = playerDataArg.filter(f => f.player == playerPicked).map(d => d.pos)[0];
                loadedUpPicks[pick_num - 1] = playerPicked;
                tempPickData[pick_num - 1].player_text = playerPicked + ' ' + playerPos;
                ++pickCounterArg;
                ++count;
                updateProgressBar();
                if (randPicks.length == 0) {
                  clearInterval(interval);
                  returnedVars[0] = loadedUpPicks;
                  returnedVars[1] = biNormalizedArg;
                  returnedVars[2] = playerDataArg;
                  // returnedVars[3] = playerListArg;
                  if (loadedUpPicks.length > 0) {
                    resolve()
                  } else {
                    reject(Error('No Picks'));
                  }
                }
              }, 1);
            });
            return returnedVars;
          };
          let data = [];
          if (this.nextPick != 1) {
            data = await loadUpDraft(this.nextPick, this.currentPick, this.binormalizeLoad, this.randPickLoad,
                                       this.playerData, this.biNormalized, this.playerList, this.pickCounter,
                                       this.lastPlayer, this.pickData.map(d => ({...d})));
            this.biNormalized = data[1];
            this.playerData = data[2];
            // this.playerList = data[3];
          }
          return data[0];
        },
        async slotTurnover(userSelected) {
          // if (this.currentPick + 1 < this.$refs.items.length) {
          //   // this.$refs.items[this.currentPick + 1].scrollIntoView({ block: 'nearest' });
          //   // this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.border = '0.5px solid #d7d5d5';
          //   // this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.backgroundColor = '#e5e5e5';
          //   // this.$refs.items[this.currentPick].childNodes[this.$refs.items[this.currentPick].childNodes.length - 1].style.border = '1px solid black';
          //   // this.$refs.items[this.currentPick].childNodes[this.$refs.items[this.currentPick].childNodes.length - 1].style.backgroundColor = 'white';
          // } else if (this.currentPick < this.$refs.items.length) {
          //   // this.$refs.items[this.currentPick].scrollIntoView({ block: 'nearest' });
          //   // this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.border = '0.5px solid #d7d5d5';
          //   // this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.backgroundColor = '#e5e5e5';
          //   // this.$refs.items[this.currentPick].childNodes[this.$refs.items[this.currentPick].childNodes.length - 1].style.border = '1px solid black';
          //   // this.$refs.items[this.currentPick].childNodes[this.$refs.items[this.currentPick].childNodes.length - 1].style.backgroundColor = 'white';
          // } else if (this.currentPick == this.$refs.items.length) {
          //   // this.$refs.items[this.currentPick - 1].scrollIntoView({ block: 'nearest' });
          //   // this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.border = '0.5px solid #d7d5d5';
          //   // this.$refs.items[this.currentPick - 1].childNodes[this.$refs.items[this.currentPick - 1].childNodes.length - 1].style.backgroundColor = '#e5e5e5';
          // }
          let playerPicked = '';
          if (userSelected) {
            playerPicked = this.selectedPlayer;
          } else {
            this.selectedPlayer = '';
            this.selectedPos = '';
            playerPicked = this.loadedPicks[this.pickCounter];
          }
          if (userSelected) {
            this.playerData.filter(f => {
              return f.player == playerPicked;
            }).map(d => {
              d.selected = true;
              return d;
            });
          }
          // const playerRank = this.playerData.filter(f => f.player == playerPicked).map(d => d.rank)[0];
          const playerPos = this.playerData.filter(f => f.player == playerPicked).map(d => d.pos)[0];
          if (userSelected) {
            const pick_num = this.pickData[this.pickCounter].pick;
            const currPickSet = [...new Set(this.playerData.filter(f => f.pick ==
                                  pick_num).filter(ff => ff.selected ==
                                  false).map(d => d.player))];
            const restPickSet = [...new Set(this.playerData.filter(f => {
              return f.pick > pick_num;
            }).map(d => d.player))];
  
            const unPicked = this.playerData.filter(f => {
              return (currPickSet.some(ff => ff == f.player) && !restPickSet.some(ff => ff == f.player));
            });
            if (unPicked.length > 0) {
              const playerSet = [...new Set(unPicked.map(d => d.player))];
              // console.log(playerSet);
              // console.log(pick_num);
              playerSet.forEach(player => {
                let filteredUnPicked = unPicked.filter(f => f.player == player);
                filteredUnPicked[0].p = 1;
                filteredUnPicked[0].pick = pick_num + 1;
                this.biNormalized.push(filteredUnPicked[0]);
              })
            }
            this.biNormalized = this.biNormalized.filter(f => {
              return f.pick != pick_num;
            }).filter(ff => {
              return ff.player != playerPicked;
            })
          }
  
          this.pickData[this.pickCounter].player_text = playerPicked + ' ' + playerPos;
          this.assets = this.assets.filter(f => {
            return f.pick != this.pickData[this.pickCounter].pick;;
          });
          const regex = / [^ ]*$/;
          this.playerList = [...new Set(this.pickData.filter(f => f.player_text != '--').map(d => d.player_text))];
          this.playerList = this.playerList.map(player => player.replace(regex, ''));
  
          this.prevPick = this.pickCounter + 1;
          this.prevTeam = this.pickData[this.pickCounter].team;
          this.prevPlayer = playerPicked;
  
          this.pickCounter = this.pickCounter + 1;
          this.currentPick = this.pickCounter + 1;
          this.currentRound = assets[this.currentPick - 1].round;
          if (this.pickCounter < this.lastPick) {
            this.currentTeam = this.pickData[this.pickCounter].team;
            if (this.pickData[this.pickCounter].team == this.selectedTeam.team) {
              if (userSelected) {
                if (this.nextPick = this.pickData.filter(f => {
                  return f.team == this.selectedTeam.team;
                })[this.teamPicks]) {
                  this.nextPick = this.pickData.filter(f => {
                    return f.team == this.selectedTeam.team;
                  })[this.teamPicks].pick;
                } else {
                  this.nextPick = this.Pick + 1;
                }
                if (this.nextPick > this.lastPick) {
                  document.getElementById('on-clock').style.display = 'none';
                  this.nextPickText = 'None';
                } else {
                  this.nextPickText = this.nextPick;
                }
                this.allPicks = this.pickData.filter(f => f.team == this.selectedTeam.team).map(({pick, player_text}) => ({pick, player_text}));
              }
              this.onClock = (this.nextPick - this.currentPick).toString();// +
                // ((this.nextPick - this.currentPick) == 1 ? ' Pick' : ' Picks');
              this.waitDraft();
              if (document.getElementById('player-popup-cont')) {
                document.getElementById('player-popup-cont').style.pointerEvents = 'auto';
              }
            } else if (userSelected) {
              const initPromise = new Promise(resolve => {
                document.getElementById('myProgress2').style.display = 'block';
                document.getElementById('myBar2').style.width = '1%';
                if (this.nextPick = this.pickData.filter(f => {
                  return f.team == this.selectedTeam.team;
                })[this.teamPicks]) {
                  this.nextPick = this.pickData.filter(f => {
                    return f.team == this.selectedTeam.team;
                  })[this.teamPicks].pick;
                } else {
                  this.nextPick = this.lastPick + 1;
                }
                setTimeout(() => {
                  resolve();
                }, 1);
              });
              await initPromise;
              this.loadedPicks = await this.loadDraftPicks(2);
              if (document.getElementById('myProgress2')) {
                document.getElementById('myProgress2').style.display = 'none';
              }
              if (document.getElementById('player-popup-cont')) {
                document.getElementById('player-popup-cont').style.pointerEvents = 'auto';
              }
              this.userTurnWindow = false;
              if (this.nextPick > this.lastPick) {
                document.getElementById('on-clock').style.display = 'none';
                this.nextPickText = 'None';
              } else {
                this.nextPickText = this.nextPick;
              }
              this.startBtn = 'btn';
              this.onClock = (this.nextPick - this.currentPick).toString();// +
                // ((this.nextPick - this.currentPick) == 1 ? ' Pick' : ' Picks');
              this.allPicks = this.pickData.filter(f => f.team == this.selectedTeam.team).map(({pick, player_text}) => ({pick, player_text}));
              this.startDraft();
            } else {
              this.onClock = (this.nextPick - this.currentPick).toString();
            }
          } else {
            if (userSelected) {
              this.nextPick = this.lastPick + 1;
              if (document.getElementById('player-popup-cont')) {
                document.getElementById('player-popup-cont').style.pointerEvents = 'auto';
              }
              this.userTurnWindow = false;
              document.getElementById('on-clock').style.display = 'none';
              this.nextPickText = 'None';
              this.startBtn = 'btn';
              this.onClock = (this.nextPick - this.currentPick).toString();
              this.allPicks = this.pickData.filter(f => f.team == this.selectedTeam.team).map(({pick, player_text}) => ({pick, player_text}));
            }
            this.endDraft();
          }
        },
        draftPlayer() {
          document.getElementById('player-popup-cont').style.pointerEvents = 'none';
          ++this.teamPicks;
          this.draftBtn = 'disabled-btn';
          this.userTurn = false;
          this.expanded = false;
          // if (!this.expanded) {
            document.getElementById('user-picks').style.display = 'none';
          // }
          this.slotTurnover(true);
          document.getElementById('pos-input').selectedIndex = 0;
          this.selectedPos = '';
          this.selectedPlayer = '';
          document.getElementById('head-row3').style.display = 'none';
        },
        getPlayer(event) {
          if (event.target.value != "") {
            this.selectedPlayer = event.target.parentElement.childNodes[0].innerText;
            // this.selectedPlayer = event.target.value;
            document.getElementById('head-row3').style.display = 'flex';
            if (this.pickData[this.pickCounter].team == this.selectedTeam.team) {
              this.draftBtn = 'btn';
            }
          } else {
            this.selectedPlayer = '';
            this.draftBtn = 'disabled-btn';
            document.getElementById('head-row3').style.display = 'none';
          }
        },
        getPos(event) {
          if (event.target.value != "") {
            this.selectedPos = event.target.value;
            this.sortedPlayersToPick = this.uniquePlayerData.filter(f => {
              return (!(this.playerList.some(ff => ff == f.player)) && (f.pos == this.selectedPos));
            });
          } else {
            this.selectedPos = '';
          }
        },
        randPickLoad(pick_num, biNormalizedArg, tempPickData) {
          const selectingTeam = tempPickData.filter(f => {
            return f.pick == pick_num;
          })[0].team;
          const selectingTeamsPicks = tempPickData.filter(f => {
            return (f.team == selectingTeam && f.player_text != '--');
          })
          let availPlayers = [];
          if (selectingTeamsPicks.length > 0) {
            const regex = / ([^ ]*)$/;
            const selectedPosList = selectingTeamsPicks.map(d => {
              const match = regex.exec(d.player_text);
              d.pos = match[1]
              return d;
            }).map(d => d.pos);
            let repeatedPos = [];
            selectedPosList.forEach(function(element, index) {
              if (element == 'QB' || (selectedPosList.indexOf(element, index + 1) > -1 && repeatedPos.indexOf(element) === -1)) {
                repeatedPos.push(element);
              }
            });
            if (repeatedPos.length > 0) {
              availPlayers = biNormalizedArg.filter(f => {
                return f.pick == pick_num;
              }).filter(ff => {
                return !(repeatedPos.some(fff => fff == ff.pos));
              });
              if (availPlayers.length == 0) {
                availPlayers = biNormalizedArg.filter(f => {
                  return f.pick == pick_num;
                });
              }
            } else {
              availPlayers = biNormalizedArg.filter(f => {
                return f.pick == pick_num;
              });
            }
          } else {
            availPlayers = biNormalizedArg.filter(f => {
              return f.pick == pick_num;
            });
          }
          if (pick_num == 3) {
            const tempPlayers = availPlayers.filter(f => {
              return f.pos != 'QB';
            })
            if (tempPlayers.length > 0) {
              availPlayers = tempPlayers;
            }
          } else if (pick_num < 103) {
            const noQBTeams = ['Bills', 'Bears', 'Bengals', 'Browns', 'Cowboys', 'Broncos', 'Jaguars',
                               'Chiefs', 'Chargers', 'Rams', 'Raiders', 'Dolphins', 'Saints', 'Giants',
                               'Eagles', 'Steelers', '49ers', 'Jets'];
            if (noQBTeams.some(f => f == selectingTeam)) {
              const tempPlayers = availPlayers.filter(f => {
                return f.pos != 'QB';
              })
              if (tempPlayers.length > 0) {
                availPlayers = tempPlayers;
              }
            }
          }
  
          var playerPicked = this.randPlayer(availPlayers.map(d => d.player), availPlayers.map(d => d.p))
  
          return playerPicked;
        },
        randPick() {
          var availPlayers = this.biNormalized.filter(f => {
            return f.pick == this.pickData[this.pickCounter].pick;
          })
  
          var playerPicked = this.randPlayer(availPlayers.map(d => d.player), availPlayers.map(d => d.p))
  
          this.slotTurnover(playerPicked, false);
        },
        randPlayer(players, probs) {
          const totalProb = probs.reduce((acc, cur) => acc + cur, 0);
          const randNum = Math.random() * totalProb;;
          let probAccum = 0;
          let index = 0;
          while(probAccum < randNum) {
            probAccum += probs[index];
            ++index;
          }
          return players[index - 1];
        },
        binormalizeLoad(biNormalizedArg, lastPlayerArg) {
          // console.log('Garrett before: ', biNormalizedArg.filter(f => f.player == 'Garrett Wilson').map(d => d.p));
          var binormalized = [...biNormalizedArg];
          const players = [...new Set(biNormalizedArg.filter(f => {
            return f.pick <= lastPlayerArg;
          }).map(d => d.player))];
  
          const groupedDataByPick = {};
          binormalized.forEach(d => {
            const { player, ...rest } = d;
            if (!groupedDataByPick[player]) {
              groupedDataByPick[player] = [];
            }
            groupedDataByPick[player].push({ player, ...rest });
          });
  
          players.forEach(player => {
            const filteredData = groupedDataByPick[player];
            const sumP = filteredData.reduce((acc, cur) => acc + cur.p, 0);
            filteredData.forEach(d => {
              d.p /= sumP;
            });
          });
  
          binormalized = Object.values(groupedDataByPick)
                            .reduce((acc, cur) => acc.concat(cur), []);
          // console.log('Garrett after: ', binormalized.filter(f => f.player == 'Garrett Wilson').map(d => d.p));
          return binormalized;
        },
        getAsset(e, i, team) {
          this.forceTrade = false;
          this.tradeButtonText = 'Propose Trade';
          if (!(this.$refs.assets1[0].indicator)) {
            this.$refs.assets1.map(d => {
              d.indicator = 'white';
            })
            this.$refs.assets2.map(d => {
              d.indicator = 'white'
            })
          }
          if (team == 1) {
            if (this.$refs.assets1[i].indicator != 'blue') {
              this.$refs.assets1[i].indicator = 'blue';
              this.$refs.assets1[i].childNodes[0].childNodes[1].style.backgroundColor = '#009ee2';
              this.$refs.assets1[i].childNodes[0].childNodes[1].style.color = '#e5e5e5';
            } else {
              this.$refs.assets1[i].indicator = 'white';
              this.$refs.assets1[i].childNodes[0].childNodes[1].style.backgroundColor = '#fff';
              this.$refs.assets1[i].childNodes[0].childNodes[1].style.color = '#393939';
            }
          } else if (team == 2) {
            if (this.$refs.assets2[i].indicator != 'blue') {
              this.$refs.assets2[i].indicator = 'blue';
              this.$refs.assets2[i].childNodes[0].childNodes[1].style.backgroundColor = '#009ee2';
              this.$refs.assets2[i].childNodes[0].childNodes[1].style.color = '#e5e5e5';
            } else {
              this.$refs.assets2[i].indicator = 'white';
              this.$refs.assets2[i].childNodes[0].childNodes[1].style.backgroundColor = '#fff';
              this.$refs.assets2[i].childNodes[0].childNodes[1].style.color = '#393939';
            }
          }
          const team1 = this.$refs.assets1.filter(f => {
            return f.indicator == 'blue';
          }).length;
          const team2 = this.$refs.assets2.filter(f => {
            return f.indicator == 'blue';
          }).length;
          if (team1 > 0 && team2 > 0) {
            this.propBtn = 'btn';
          } else {
            this.propBtn = 'disabled-btn';
          }
        },
        expandDraft() {
          if (!this.expanded) {
            document.getElementById('user-picks').style.display = 'block';
          } else {
            document.getElementById('user-picks').style.display = 'none';
          }
          this.expanded = !this.expanded;
        },
        exitPick(event) {
          if (event.target.className == 'player-popup-cont') {
            this.userTurnWindow = false;
          } else if (event.target.className == 'exit') {
            this.userTurnWindow = false;
          }
        },
        exitDnld(event) {
          if (event.target.className == 'download-popup-cont') {
            this.phoneDnld = false;
          } else if (event.target.className == 'exit-output') {
            this.phoneDnld = false;
          }
        },
        exitTrade(event) {
          if (event.target.className == 'trade-popup-cont') {
            this.forceTrade = false;
            this.tradeButtonText = 'Propose Trade';
            this.propBtn = 'disabled-btn';
            this.userTradeWindow = false;
          } else if (event.target.className == 'exit mtneg') {
            this.forceTrade = false;
            this.tradeButtonText = 'Propose Trade';
            this.propBtn = 'disabled-btn';
            this.userTradeWindow = false;
          }
        },
        proposeTrade() {
          document.getElementById('trade-popup-cont').style.pointerEvents = 'none';
          var team1 = this.$refs.assets1.filter(f => {
            return f.indicator == 'blue';
          }).map(d => d.innerText);
          var team2 = this.$refs.assets2.filter(f => {
            return f.indicator == 'blue';
          }).map(d => d.innerText);
  
          if (this.forceTrade) {
            this.executeTrade(team1, team2, true);
          } else {
            let jj1 = [];
            let jj2 = [];
            const oneYearDiscount = .75;
            const twoYearDiscount = .6;
  
            team1.forEach((asset,i) => {
              const trade_asset = asset.substring(5);
              if (trade_asset.substring(0, 1) == 'R') {
                let roundArr = this.jjVal.filter(f => {
                  return f.round == trade_asset.substring(1, 2);
                }).map(d => d.pick_value);
                if (asset.substring(0, 4) == '2024') {
                  jj1[i] = roundArr.reduce((acc, cur) => acc + cur, 0) / roundArr.length * oneYearDiscount;
                } else {
                  jj1[i] = roundArr.reduce((acc, cur) => acc + cur, 0) / roundArr.length * twoYearDiscount;
                }
              } else {
                jj1[i] = this.jjVal.filter(f => {
                  return f.pick_num == trade_asset;
                }).map(d => d.pick_value)[0];
              }
            })
            team2.forEach((asset,i) => {
              const trade_asset = asset.substring(5);
              if (trade_asset.substring(0, 1) == 'R') {
                let roundArr = this.jjVal.filter(f => {
                  return f.round == trade_asset.substring(1, 2);
                }).map(d => d.pick_value);
                if (asset.substring(0, 4) == '2024') {
                  jj2[i] = roundArr.reduce((acc, cur) => acc + cur, 0) / roundArr.length * oneYearDiscount;
                } else {
                  jj2[i] = roundArr.reduce((acc, cur) => acc + cur, 0) / roundArr.length * twoYearDiscount;
                }
              } else {
                jj2[i] = this.jjVal.filter(f => {
                  return f.pick_num == trade_asset;
                }).map(d => d.pick_value)[0];
              }
            })
            // console.log(jj1.reduce((acc, cur) => acc + cur, 0), .9 * jj2.reduce((acc, cur) => acc + cur, 0));
            if (jj1.reduce((acc, cur) => acc + cur, 0) >= .9 * jj2.reduce((acc, cur) => acc + cur, 0)) {
              this.executeTrade(team1, team2, false);
            } else {
              this.forceTrade = true;
              this.tradeButtonText = 'Force Trade';
              document.getElementById('trade-popup-cont').style.pointerEvents = 'auto';
            }
          }
        },
        async executeTrade(team1, team2, forced) {
          document.getElementById('trade-popup-cont').style.pointerEvents = 'none';
          document.getElementById('myProgress3').style.display = 'block';
          document.getElementById('myBar3').style.width = '1%';
          this.tradeSet.push({'forced': forced,
                              'lost': team1,
                              'gained': team2,
                              'otherTeam': this.otherTeam});
          let tradeUp = false;
          this.forceTrade = false;
          const initPromise = new Promise(resolve => {
            team1.forEach(asset => {
              const trade_asset = asset.substring(5);
              if (trade_asset.substring(0, 1) == 'R') {
                if (asset.substring(0, 4) == '2024') {
                  this.assets.filter(f => {
                    return (f.pick == 260) && (f.round == trade_asset.substring(1, 2)) && (f.team == this.selectedTeam.team);
                  })[0].team = this.otherTeam;
                } else  {
                  this.assets.filter(f => {
                    return (f.pick == 261) && (f.round == trade_asset.substring(1, 2)) && (f.team == this.selectedTeam.team);
                  })[0].team = this.otherTeam;
                }
              } else {
                this.assets.filter(f => {
                  return (f.pick == trade_asset);
                }).map(d => {
                  d.team = this.otherTeam;
                })
                this.pickData.filter(f => {
                  return (f.pick == trade_asset);
                }).map(d => {
                  d.team = this.otherTeam;
                })
              }
            })
            team2.forEach(asset => {
              const trade_asset = asset.substring(5);
              if (trade_asset.substring(0, 1) == 'R') {
                if (asset.substring(0, 4) == '2024') {
                  this.assets.filter(f => {
                    return (f.pick == 260) && (f.round == trade_asset.substring(1, 2)) && (f.team == this.otherTeam);
                  })[0].team = this.selectedTeam.team;
                } else {
                  this.assets.filter(f => {
                    return (f.pick == 261) && (f.round == trade_asset.substring(1, 2)) && (f.team == this.otherTeam);
                  })[0].team = this.selectedTeam.team;
                }
              } else {
                this.assets.filter(f => {
                  return (f.pick == trade_asset);
                }).map(d => {
                  d.team = this.selectedTeam.team;
                })
                this.pickData.filter(f => {
                  return (f.pick == trade_asset);
                }).map(d => {
                  d.team = this.selectedTeam.team;
                })
                if (this.loadedPicks) {
                  if (trade_asset <= this.loadedPicks.length && !tradeUp) {
                    tradeUp = true;
                    // const sliceSpot = this.loadedPicks.length - trade_asset + 1;
                    // var putBackPlayers = this.loadedPicks.slice(trade_asset - 1);
                    var removePlayers1 = this.pickData.filter(f => {
                      return f.pick < this.currentPick;
                    }).map(d => d.player_text);
                    var removePlayers2 = this.loadedPicks.slice(this.pickCounter, trade_asset - 1);
                    const regex = / [^ ]*$/;
  
                    removePlayers1 = removePlayers1.map(player => player.replace(regex, ''));
                    var removePlayers = removePlayers1.concat(removePlayers2);
  
                    this.playerData = draft.map(d => ({ ...d }));
                    this.biNormalized = this.playerData.map(d => ({ ...d }));
                    this.playerData.filter(f => {
                      return removePlayers.some(ff => ff == f.player);
                    }).map(d => {
                      d.selected = true;
                      return d;
                    });
                    this.biNormalized = this.biNormalized.filter(f => {
                      return f.pick >= trade_asset;
                    }).filter(ff => {
                      return !(removePlayers.some(fff => fff == ff.player));
                    });
                    // this.playerList = [...new Set(this.biNormalized.map(d => d.player))];
                    // this.pickData = picks.map(d => ({ ...d }));
  
                    // this.uniquePlayerData = players.map(d => ({ ...d }));
  
                    // this.sortedPlayers = [...new Set(this.playerData.map(d => d.player))];
  
                    // this.playersToPick = this.uniquePlayerData.filter(f => {
                    //   return this.playerList.some(ff => ff == f.player);
                    // });
                  }
                }
              }
            })
            setTimeout(() => {
              resolve();
            }, 1);
          });
          await initPromise;
          const initPromise2 = new Promise(resolve => {
            if (!tradeUp) {
              let none = false;
              team1.forEach(async (asset, i) => {
                const trade_asset = asset.substring(5);
                if (trade_asset == this.nextPick) {
                  none = true;
                  var removePlayers = this.pickData.filter(f => {
                    return f.pick < this.currentPick;
                  }).map(d => d.player_text);
                  const regex = / [^ ]*$/;
                  removePlayers = removePlayers.map(player => player.replace(regex, ''));
                  this.playerData = draft.map(d => ({ ...d }));
                  this.biNormalized = this.playerData.map(d => ({ ...d }));
                  this.playerData.filter(f => {
                    return removePlayers.some(ff => ff == f.player);
                  }).map(d => {
                    d.selected = true;
                    return d;
                  });
                  this.biNormalized = this.biNormalized.filter(f => {
                    return f.pick >= this.currentPick;
                  }).filter(ff => {
                    return !(removePlayers.some(fff => fff == ff.player));
                  });
                  // this.playerList = [...new Set(this.biNormalized.map(d => d.player))];
  
                  if (this.nextPick = this.pickData.filter(f => {
                    return f.team == this.selectedTeam.team;
                  })[this.teamPicks]) {
                    this.nextPick = this.pickData.filter(f => {
                      return f.team == this.selectedTeam.team;
                    })[this.teamPicks].pick;
                    this.nextPickText = this.nextPick;
                  } else {
                    this.nextPick = this.lastPick + 1;
                    document.getElementById('on-clock').style.display = 'none';
                    this.nextPickText = 'None';
                  }
                  this.loadedPicks = [];
                  // add a loading bar!
                  this.loadedPicks = await this.loadDraftPicks(3);
                  if (this.loadedPicks.length > 0) {
                    resolve();
                  }
                }
              })
              if (!none) {
                resolve();
              }
            } else {
              resolve();
            }
          })
          await initPromise2;
          this.otherTeam = '';
          if (this.nextPick = this.pickData.filter(f => {
            return f.team == this.selectedTeam.team;
          })[this.teamPicks]) {
            this.nextPick = this.pickData.filter(f => {
              return f.team == this.selectedTeam.team;
            })[this.teamPicks].pick;
            this.nextPickText = this.nextPick;
          } else {
            this.nextPick = this.lastPick + 1;
            document.getElementById('on-clock').style.display = 'none';
            this.nextPickText = 'None';
          }
          if (this.currentPick == 0) {
            this.onClock = (this.nextPick - 1).toString();// +
          } else {
            this.onClock = (this.nextPick - this.currentPick).toString();// +
          }
          this.allPicks = this.pickData.filter(f => f.team == this.selectedTeam.team).map(({pick, player_text}) => ({pick, player_text}));
          if (this.allPicks.length == 0) {
            if (document.getElementById('expander')) {
              document.getElementById('expander').style.display = 'none';
            }
          } else {
            if (document.getElementById('expander')) {
              document.getElementById('expander').style.display = 'flex';
            }
          }
          this.assets.sort((a, b) =>  d3.ascending(a.team, b.team) || d3.ascending(Number(a.pick), Number(b.pick)));
          this.propBtn = 'disabled-btn';
          document.getElementById('myProgress3').style.display = 'none';
          this.tradeButtonText = 'Propose Trade';
          document.getElementById('trade-popup-cont').style.pointerEvents = 'auto';
          this.userTradeWindow = false;
          this.userTurn = false;
          this.expanded = false;
          if (this.pickData[this.pickCounter].team == this.selectedTeam.team) {
            this.waitDraft();
          } else {
            if (this.draftGoing) {
              this.startPause = 'Pause Draft';
              this.boardBtn = 'disabled-btn';
              this.startBtn = 'btn';
              this.pickInterval = setInterval(() => {
                this.slotTurnover(false);
              }, this.chosenSpeed)
            }
          }
        },
        async expMobileDraft() {
          let el = this.$refs.capture;
          const initPromise = new Promise(async resolve => {
            this.output = (await html2canvas(el)).toDataURL();
            if (this.output) {
              resolve();
            } else {
              reject(Error('Something went wrong!'));
            }
          });
          await initPromise;
          this.phoneDnld = !this.phoneDnld;
  
          const temp_save = {
            'time': new Date().getTime(),
            'type': 'save',
            'deviceId': this.deviceId
          }
          this.putS3File(temp_save, 'user_clicks', 'click_' + uuidv4() + Date.now() + '_' + this.deviceId + '.json');
        },
        async expDraft() {
          let el = this.$refs.capture;
          if (navigator.share) {
            let shareImg = async() => {
              const temp_share = await html2canvas(el).then(async function(canvas) {
                let temp_share = null;
                await new Promise(async function(resolve, reject) {
                  const myImage = canvas.toDataURL();
                  const blob = await (await fetch(myImage)).blob();
                  const filesArray = [
                    new File(
                      [blob],
                      'draft_sim.png',
                      {
                        type: blob.type,
                        lastModified: new Date().getTime()
                      }
                    )
                  ];
                  const shareData = {
                    title: "NFL Mock Draft",
                    text: "Make your own Mock Draft using ESPN's Draft Simulator @ espnsportsanalytics.com",
                    url:  "https://www.espnsportsanalytics.com/",
                    files: filesArray,
                    dialogTitle: 'Share my draft',
                  };
                  navigator.share(shareData);
                  temp_share = {
                    'time': new Date().getTime(),
                    'type': 'share'
                  }
                  if (blob) {
                    resolve();
                  }
                });
                return temp_share;
              });
              return temp_share;
            }
            let temp_share = await shareImg();
            temp_share.deviceId = this.deviceId;
            this.putS3File(temp_share, 'user_clicks', 'click_' + uuidv4() + Date.now() + '_' + this.deviceId + '.json');
          } else {
            html2canvas(el).then(function(canvas) {
              canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(() => {
                alert('Image copied successfully');
              }).catch(() => {
                alert('Something went wrong!');
              }));
            });
            const temp_copy = {
              'time': new Date().getTime(),
              'type': 'copy',
              'deviceId': this.deviceId
            }
            this.putS3File(temp_copy, 'user_clicks', 'click_' + uuidv4() + Date.now() + '_' + this.deviceId + '.json');
          }
          // this.csvDraft();
        },
        dnldImg() {
          let el = this.$refs.capture;
          html2canvas(el).then(function(canvas) {
            const downloadURI = function(uri, name) {
              var link = document.createElement("a");
              link.download = name;
              link.href = uri;
              document.body.appendChild(link);
              link.click();
            }
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "draft-sim.png");
          });
        },
        cpImg() {
          let el = this.$refs.capture;
          html2canvas(el).then(function(canvas) {
            canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
          })
        },
        csvDraft() {
          const regex = / [^ ]*$/;
          const regex2 = / ([^ ]*)$/;
          const exportData = this.pickData.filter(f => {
            return f.player_text != '--';
          }).map(d => {
            d.player = d.player_text.replace(regex, '');
            const match = regex2.exec(d.player_text);
            d.pos = match[1];
            return d;
          })
          this.exportToCsvFile(exportData.map(({pick, team, player, pos}) => ({pick, team, player, pos})));
        },
        getTeamTrade(event) {
          this.forceTrade = false;
          this.tradeButtonText = 'Propose Trade';
          if (event.target.value != '') {
            this.otherTeam = event.target.value;
            this.otherTeamLogo = this.teamList.filter(f => f.team == this.otherTeam).map(d => d.id);
            this.otherTeamAssets = this.assets.filter(f => f.team == this.otherTeam);
            this.$refs.assets2.map(d => {
              d.childNodes[0].childNodes[1].style.backgroundColor = '#fff';
              d.childNodes[0].childNodes[1].style.color = '#393939';
              d.indicator = 'white';
            })
          }
        },
        getTeamPost(event) {
          if (event.target.value != '') {
            this.otherTeam = event.target.value;
            this.otherTeamLogo = this.teamList.filter(f => f.team == this.otherTeam).map(d => d.id);
            this.otherTeamPicks = this.pickData.filter(f => f.team == this.otherTeam).map(({pick, player_text}) => ({pick, player_text}));
          }
        },
        parseJSONToCSVStr(jsonData) {
          if(jsonData.length == 0) {
              return '';
          }
  
          let keys = Object.keys(jsonData[0]);
  
          let columnDelimiter = ',';
          let lineDelimiter = '\n';
  
          let csvColumnHeader = keys.join(columnDelimiter);
          let csvStr = csvColumnHeader + lineDelimiter;
  
          jsonData.forEach(item => {
              keys.forEach((key, index) => {
                  if( (index > 0) ) {
                      csvStr += columnDelimiter;
                  }
                  csvStr += item[key];
              });
              csvStr += lineDelimiter;
          });
          // console.log(csvStr);
          return encodeURIComponent(csvStr);;
        },
        exportToCsvFile(jsonData) {
          let csvStr = this.parseJSONToCSVStr(jsonData);
          let dataUri = 'data:text/csv;charset=utf-8,'+ csvStr;
  
          let exportFileDefaultName = 'draft.csv';
  
          let linkElement = document.createElement('a');
          linkElement.setAttribute('href', dataUri);
          linkElement.setAttribute('download', exportFileDefaultName);
          linkElement.click();
        },
        getImg(path) {
          // var images = import.meta.webpackContent('../../assets/nfl_logo/',
          //                 {recursive: false,
          //                     regExp: /\.png$/})
          // return images('./' + path + '.png')
        },
      },
      destroyed() {
        this.stopDraft();
      }
    }
    </script>
  
    <style scoped>
    .pre-draft-page {
      width: 100%;
      position: relative;
    }
    .nfl-mock-draft {
      background-color: #fff;
      position: relative;
    }
    .top-draft {
      background-color: white;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border: 1px solid #e5e5e5;
      /* margin: 0px 5px; */
      padding: 5px;
    }
    .output-img2 {
      width: calc(100% - 200px);
    }
    .exit-output {
      cursor: pointer;
      font-size: 20px;
      color: red;
      position: absolute;
      top: 0;
      right: 2px;
    }
    .top-draft-post {
      width: calc(100% - 2px);
      background-color: white;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
    }
    .top-draft-post-img {
      display: none;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
    }
    .post-top-draft {
      background-color: white;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
      margin: 10px 0px;
      padding: 5px;
      width: calc(100% - 12px);
    }
    .form-team {
      margin-left: 4px;
    }
    .trade-top-team {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 5px;
    }
    .post-team-draft-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .team-one {
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid #9e9e9e;
      margin: 0px 5px 2px 5px;
    }
    .post-draft-user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #393939;
      padding: 0px 5px;
    }
    .post-draft-grade-cont {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .post-team-name {
      width: calc(100% - 50px - 102.21px);
      height: 50px;
      line-height: 50px;
      font-size: 19px;
      font-weight: bold;
    }
    .ea-post {
      height: 30px;
    }
    .trade-cont {
      display: flex;
      flex-direction: column;
      padding: 15px 0px 5px 0px;
      margin: 0px 5px;
      border-top: 1px solid #393939;
    }
    .trade-headers {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #9e9e9e;
    }
    .trade {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      border-bottom: 1px solid #d7d5d5;
    }
    .last-trade {
      border-bottom: none;
    }
    .trade-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 40px;
    }
    .trade-text {
      font-size: 15px;
    }
    .forced-note {
      font-size: 8px;
      text-align: left;
    }
    .esa-link-text {
      padding: 5px;
      text-align: left;
      width: 100%;
      color: #009ee2;
    }
    .lost-cont {
      width: 296px;
      display: flex;
      align-items: center;
    }
    .gained-cont {
      display: flex;
      align-items: center;
      width: calc(100% - 40px - 296px);
    }
    .trade-arrow {
      font-weight: bold;
      font-size: 20px;
      margin: auto;
    }
    .lost-assets-cont {
      width: 292px;
    }
    .gained-assets-cont {
      width: calc(100% - 35px);
      max-width: 200px;
    }
    .lost-assets-cont,
    .gained-assets-cont {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      overflow-x: scroll;
      padding: 2px;
      max-height: 50px;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .noscroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .noscroll::-webkit-scrollbar {
        display: none;
    }
    .trades-text {
      text-align: left;
      width: 50px;
      font-size: 12px;
    }
    .gained-text {
      width: calc(100% - 50px - 285px);
    }
    .lost-text {
      width: 285px;
    }
    .lost-text,
    .gained-text {
      font-size: 12px;
      text-align: left;
    }
    .lost-assets,
    .gained-assets {
      width: 78px;
      height: 16.5px;
    }
    .lost-pick,
    .lost-round,
    .gained-pick,
    .gained-round {
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .pick-header {
      font-size: 12px;
      text-align: left;
      width: 50px;
    }
    .player-header {
      font-size: 12px;
      text-align: left;
      width: calc(100% - 50px - 300px);
    }
    .chance-header {
      text-align: end;
      font-size: 12px;
      width: 300px;
      display: flex;
      justify-content: space-between;
    }
    .post-user-picks {
      text-align: start;
    }
    .post-user-picks1 {
      text-align: start;
      margin: 0px 5px;
      padding-bottom: 15px;
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
  
    .btn {
      cursor: pointer;
      background-color: #012337;
      /* font-family: "SF Pro Text"; */
    }
    /* .btn:hover {
      background-color: #009ee2d5;
    } */
    .disabled-btn {
      pointer-events: none;
      background-color: #9D9E9F;
      /* font-family: "SF Pro Text"; */
    }
    .user-draft,
    .user-pick {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-end;
      width: 32.5%;
    }
    .board-btn {
      padding: 5px;
    }
    .pick-btn {
      padding: 5px;
      display: block !important;
      margin-right: 4px;
    }
  
    .mock-title {
      padding: 10px 10px 0px 10px;
    }
  
    .pre-draft-head {
      /* position: sticky; */
      /* top: 0; */
      background-color: #fbfcfd;
      padding: 10px 0px;
    }
    
    /* .expander {
      font-size: 10px;
      align-items: center;
      width: 85px;
      justify-content: flex-end;
      display: flex;
    }
    .expand-img {
      height: 20px;
      cursor: pointer;
    } */
  
    /* .team-square:hover {
      border: 1px solid black;
      background-color: lightgray;
    } */
  
    .post-draft,
    .draft-page {
      display: none;
    }
    .draft-head {
      position: sticky;
      top: 0;
      background-color: #fbfcfd;
    }
    .on-clock-text {
      font-size: 10px;
    }
    .post-draft-btns {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
    }
    .export-btns {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      font-size: 16px;
      padding-bottom: 10px;
    }
    .share-icon,
    .down-arrow {
      font-weight: bold;
      font-size: 20px;
    }
    .draft-btns {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10px 0px;
    }
    .load-btn {
      padding: 4px 16px;
      height: 32px;
      width: 100%;
      text-align: center;
      display: flex; 
      flex: 1 0 0;
      justify-content: center;
      align-items: center;  
      gap: 4px;
    }
    .start-btn,
    .stop-btn,
    .reset-btn,
    .export-btn,
    .save-btn,
    .exp-btn {
      padding: 6px 6px;
      height: 30px;
      width: 175px;
      text-align: center;
      line-height: 17.5px;
    }
    .propose-btn {
      min-width: 95px;
      padding: 5px;
      margin: 0px 1%;
    }
    .propose-btn-cont {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 12%;
    }
    .player-options {
      display: none;
      /* display: flex; */
      justify-content: space-around;
      margin-top: 5px;
      align-items: center;
    }
    .draft-btn {
      width: 50px;
      margin-top: 2px;
      font-size: 15px;
      height: 19px;
      padding: 2.5px 5px;
    }
    .user-picks {
      display: none;
      text-align: start;
    }
    .post-all-picks,
    .all-picks,
    .post-all-picks2 {
      display: flex;
    }
    /* .team-pick { */
      /* width: 50px; */
    /* } */
    .post-team-pick,
    .post-team-pick2 {
      width: 50px;
    }
    .player-stats {
      display: flex;
      width: 300px;
      justify-content: space-between;
    }
    .player-rk {
      width: 38px;
      text-align: end;
    }
    .player-prob {
      /* font-weight: bold; */
      width: 100px;
      text-align: end;
    }
    .player-prob2 {
      /* font-weight: bold; */
      width: 110px;
      text-align: end;
    }
    .team-player {
      width: calc(100% - 50px);
    }
    .post-team-player {
      width: calc(100% - 50px - 300px);
    }
    .post-team-player2 {
      width: calc(100% - 50px);
    }
    .draft-table {
      width: 100%;
    }
    .header {
      text-align: start;
    }
    .round-padding {
      padding-top: 19.5px;
    }
    .pick-col {
      width: 15%;
    }
    .team-col {
      width: 34%;
    }
    .player-col {
      width: 51%;
    }
    .trade-popup-cont {
      position: fixed;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(59, 59, 59, 0.5);
      background-blend-mode: multiply;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .trade-popup {
      width: 90%;
      height: 75%;
      background-color: #fbfcfd;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
    }
    .player-popup-cont {
      position: fixed;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(59, 59, 59, 0.5);
      background-blend-mode: multiply;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .download-popup-cont {
      position: fixed;
      top: 0;
      width: 100vw;
      height: 110vh;
      background-color: rgba(59, 59, 59, 0.5);
      background-blend-mode: multiply;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .dnld-inst {
      background-color: white;
      padding: 5px;
      padding-right: 20px;
      width: 50%;
      margin: 5px;
      border-radius: 5px;
      font-weight: bold;
      position: relative;
      margin-top: -250px;
    }
    .player-popup {
      width: 90%;
      height: 75%;
      background-color: #fbfcfd;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
    }
    .popup-head {
      height: 20%;
      position: sticky;
      top: 0;
    }
    .first-team-trade,
    .second-team-trade {
      height: 42%;
      width: 98%;
      background-color: white;
      border: 1px solid #e5e5e5;
      margin: 1% auto 0 auto;
      border-radius: 5px;
    }
    .head-2rows {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 60px;
    }
    .head-toprow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
    }
    .pick-num {
      font-weight: bold;
    }
    .exit {
      cursor: pointer;
      font-size: 20px;
      color: red;
    }
    .all-assets {
      display: flex;
      flex-wrap: wrap;
      height: calc(100% - 50px);
      overflow: auto;
    }
    .asset-title {
      font-size: 10px;
    }
    .asset,
    .asset-fut {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .asset-pick,
    .asset-round {
      cursor: pointer;
      line-height: 40px;
      border: 1px solid #e5e5e5;
      color: #393939;
      border-radius: 50%;
      width: 40px;
      margin: 5px;
      height: 40px;
    }
    .asset-pick:hover,
    .asset-round:hover {
      border: 1px solid black;
    }
    .mtneg {
      margin-top: -30px;
    }
    .head-row2 {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .head-row3 {
      display: none;
      justify-content: space-around;
      align-items: center;
    }
    .selected-player {
      border: 1px solid #009ee2;
      padding: 5px;
    }
    .player-table-cont {
      height: 80%;
      overflow: auto;
    }
    .player-table {
      width: 100%;
      border-collapse: collapse;
    }
    .table-row {
      border: 2px solid #393939;
      cursor: pointer;
      height: 40px;
    }
    .table-row:hover {
      background-color: #d7d5d5;
    }
    .first-col {
      width: 50%;
      padding: 2px 0px 2px 5px;
      text-align: start;
    }
    .last-col {
      padding: 0px 5px 0px 0px;
      text-align: end;
    }
    .rk-header {
      width: 38px;
    }
    .chce-header {
      width: 100px;
    }
    .chce-header2 {
      width: 110px;
    }
    .failed {
      font-size: 16px;
    }
  
    @media only screen and (max-width: 699px) {
      .propose-btn-cont {
        height: 14%;
      }
      .chance-header {
        width: 180px;
      }
      .rk-header {
        display: flex;
        align-items: flex-end;
        text-align: end;
        flex-wrap: wrap;
      }
      .player-stats {
        width: 180px;
      }
      .player-prob,
      .player-prob2 {
        width: 68.09px;
      }
      .player-rk {
        width: 36.91px;
      }
      .post-team-player {
        width: calc(100% - 30px - 190px);
      }
      .post-team-pick {
        width: 30px;
      }
      .pick-header {
        width: 30px;
      }
      .player-header {
        width: calc(100% - 30px - 190px);
      }
      .post-all-picks {
        justify-content: space-between;
      }
      .post-user-picks {
        font-size: 15px;
      }
      .chce-header,
      .chce-header2 {
        width: auto;
      }
      .failed {
        font-size: 14px;
      }
      .force-sub {
        font-size: 12px;
      }
      .trades-text {
        width: 30px;
      }
      .trade-label {
        width: 25px;
      }
      .gained-text {
        width: calc(100% - 30px - 175px);
      }
      .lost-text {
        width: 165px;
      }
      .lost-cont {
        width: 176px;
      }
      .lost-assets-cont {
        width: 172px;
      }
      .gained-cont {
        width: calc(100% - 25px - 176px);
      }
      .gained-assets-cont {
        width: calc(100% - 35px);
      }
      .output-img2 {
        width: calc(100% - 10px);
      }
    }
  
    @media only screen and (max-width: 365px) {
      .post-team-name {
        line-height: auto;
      }
    }
    </style>
  