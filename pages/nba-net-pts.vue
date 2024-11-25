<template>
    <Head>
        <Title>NBA Net Points - ESPN Analytics</Title>
        <Meta property="og:title" content="NBA Net Points - ESPN Analytics"/>
        <Meta property="og:site_name" content="NBA Net Points - ESPN Analytics" />
        <Meta property="og:url" content="https://www.espnanalytics.com/nba-net-pts" />
        <Meta name="twitter:url" content="https://www.espnanalytics.com/nba-net-pts" />
        <Meta name="twitter:title" content="NBA Net Points - ESPN Analytics"/>
        <Meta name="title" content="NBA Net Points - ESPN Analytics"/>
    </Head>
    <div class="bg-espngray-100">
        <Header></Header>
        <div class="pt-28">
            <div class="flex flex-col items-center gap-4">
                <div class="text-4xl font-bold text-center text-espngray-900">The Best NBA Players</div>
                <div class="text-espngray-600 font-normal text-sm">Updated through {{ dateUpdate }}</div>
                <!-- <div class="text-espngray-600 font-normal text-sm">Updated through 2024 season</div> -->
                <div class="p-2 lg:p-0 max-w-4xl text-center font-medium text-espngray-600">These ratings, updated daily, use data from the NBA to measure how impactful a player is to his team.</div> <!-- <sup class="cursor-pointer" @click="clickedFootnote()">1</sup> -->
            </div>
            <div class="hidden sm:block text-xl pt-5 text-center font-bold text-espngray-900">The Top Five on Offense, Defense and Overall</div>
            <!-- <div class="flex flex-col justify-center pt-5">
                <div class="hidden sm:block text-xl text-center font-black text-espngray-600">The Top Five</div>
                <div class="hidden sm:block text-xl text-center font-black text-espngray-600">Four Different Ways</div>
            </div> -->
            <div class="hidden sm:flex flex-col cursor-crosshair mb-12 mt-6">
                <div ref="overallRef"><LineScale v-if="showOverall" :arr="overall" value="overall" title="Overall" league="nba" metric="Net Pts" /></div>
                <div ref="offenseRef"><LineScale v-if="showOffense" :arr="offense" value="offense" title="Offense" league="nba" metric="Net Pts" /></div>
                <div ref="defenseRef"><LineScale v-if="showDefense" :arr="defense" value="defense" title="Defense" league="nba" metric="Net Pts" /></div>
                <!-- <div ref="astRef"><LineScale v-if="showAsts" :arr="asts" value="ast" title="Ast" league="nba" /></div> -->
            </div>
            <!-- <div class="hidden sm:block p-2 lg:p-0 max-w-5xl text-left text-xs m-auto text-espngray-600">Wide receivers and tight ends with at least 20 targets in the 2023 season are eligible for leaderboards. Running backs are not eligible, as different weights 
                are used to construct their composite scores than wide receiver and tight end composite scores.</div> -->
            <div class="text-xl pt-5 text-center font-bold text-espngray-900">Where Every NBA Player Stands</div>
            <div class="p-2 text-center font-medium text-espngray-600">Net Points from offense, defense and overall</div>
            <div class="max-w-5xl m-auto">
                <div>
                    <div class="px-4 xs:pl-8">
                        <div class="flex flex-col lg:flex-row justify-start gap-4 lg:gap-20 py-2">
                            <div class="flex flex-col items-start">
                                <div class="text-xs text-espngray-900">SHOW ME:</div>
                                <div class="flex flex-col items-start">
                                    <label class="text-espngray-900"><input class="mr-0.5" type="radio" name="radio_but" :value=true v-model="radioChoice" @click="updateChartSeason('2024', true)">Individual season(s)</label>
                                    <!-- <label class="text-espngray-900"><input class="mr-0.5 text-espngray-600" type="radio" name="radio_but" :value=false v-model="radioChoice" @click="updateChartSeason('2020-23', true)">Combined seasons</label> -->
                                </div>
                            </div>
                            <div class="flex flex-col items-start" v-if="radioChoice">
                                <div class="text-sm text-left lg:pl-1 text-espngray-900">CHOOSE INDIVIDUAL SEASON(S)</div>
                                <div class="flex flex-wrap">
                                    <!-- <div class="flex">
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-1" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2017</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-2" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2018</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-3" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2019</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-4" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2020</label></div>
                                    </div> -->
                                    <div class="flex">
                                        <!-- <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-5" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2021</label></div> -->
                                        <!-- <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-6" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2022</label></div> -->
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-7" name="check_seas" type="checkbox" @click="updateChartSeason('check')" checked>2024</label></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-start" v-else>
                                <div class="text-sm text-left lg:pl-1 text-espngray-900">CHOOSE COMBINED SEASONS</div>
                                <div class="flex flex-wrap">
                                    <!-- <div class="flex">
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2017-23')" />2017-23</label></div>
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2018-23')" />2018-23</label></div>
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2019-23')" />2019-23</label></div>
                                    </div> -->
                                    <div class="flex">
                                        <!-- <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="initial-check" name="radio_seas" type="radio" @click="updateChartSeason('2020-23')" />2020-23</label></div> -->
                                        <!-- <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2021-23')" />2021-23</label></div> -->
                                        <!-- <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2022-23')" />2022-23</label></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-start gap-4 pt-2 flex-wrap">
                            <select class="rounded-sm w-32 xs:w-fit bg-gray-50 border border-espngray-300 text-espngray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" v-model="chartTeams" @change="updateScatterData()">
                                <option value="all">All teams</option>
                                <option v-for="team in teams" :value="team.tm">{{ team.team_name }}</option>
                            </select>
                            <select class="rounded-sm bg-gray-50 border border-espngray-300 text-espngray-900 text-sm focus:ring-blue-500 focus:border-blue-500" v-model="chartPos" @change="updateScatterData()">
                                <option value="all">All</option>
                                <option value="G">G</option>
                                <option value="F">F</option>
                                <option value="C">C</option>
                                <option value="gf">G/F</option>
                                <option value="fg">F/G</option>
                                <option value="fc">F/C</option>
                                <option value="cf">C/F</option>
                            </select>
                            <input class="rounded-sm bg-gray-50 border border-espngray-300 text-espngray-900 text-sm focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search" v-model="searchString" @keyup="updateScatterData()" @click="handleClick()">
                        </div>
                    </div>
                    <div class="mt-4 lg:-mt-[3.2em]">
                        <div class="flex justify-start xs:justify-end m-2">
                            <div class="hidden xs:block px-1 py-1.5 m-0.5 text-espngray-900">SORT CHART: </div>
                            <div class="block xs:hidden px-1 py-1.5 m-0.5 text-espngray-900">SORT: </div>
                            <div class="flex flex-wrap">
                                <div class="text-espngray-900 text-center cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-16 hover:bg-espnred hover:font-semibold" :class="offenseBtn" @click="updateChartSort('offense')">OFF</div>
                                <div class="text-espngray-900 text-center cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-16 hover:bg-emerald-400 hover:font-semibold" :class="defenseBtn" @click="updateChartSort('defense')">DEF</div>
                                <!-- <div class="text-espngray-900 text-center cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-16 hover:bg-espncyan-200 hover:font-semibold" :class="astBtn" @click="updateChartSort('ast')">AST</div> -->
                                <div class="text-espngray-900 text-center block xs:hidden cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-14 hover:bg-espngray-600 hover:font-semibold hover:text-espngray-100" :class="overallBtn" @click="updateChartSort('overall')">OVR</div>
                                <div class="text-espngray-900 text-center hidden xs:block cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-24 hover:bg-espngray-600 hover:font-semibold hover:text-espngray-100" :class="overallBtn" @click="updateChartSort('overall')">OVERALL</div>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div>
                                <div class="relative cursor-crosshair w-8 h-96 ml-1" id="chart_container2">
                                    <canvas id="chart2"></canvas>
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <div class="relative cursor-crosshair h-96 -ml-[11px]" id="chart_container">
                                    <canvas id="chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="mt-8 flow-root">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle">
                                <div class="flex justify-center">
                                    <table class="min-w-[32%] mt-4 xs:mt-[1.075em] divide-y divide-gray-900">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="py-1 pl-0.5 xs:pl-1 pr-0.5" :class="nmHeader" @click="sortFromTable('full_nm')"></th>
                                                <th scope="col" class="hidden xs:table-cell py-1 pl-0.5 pr-0.5 xs:pr-1 text-left text-[10px] xs:text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="nmHeader" @click="sortFromTable('full_nm')">PLAYER</th>
                                                <th scope="col" class="table-cell xs:hidden py-1 pl-0.5 pr-0.5 xs:pr-1 text-left text-[10px] xs:text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="nmHeader" @click="sortFromTable('first_last_nm')">PLAYER</th>
                                                <th scope="col" class="px-1 py-1 text-left text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer hidden sm:table-cell" :class="tmHeader" @click="sortFromTable('tm')">TEAM</th>
                                                <th scope="col" class="px-2 py-1 text-left text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer hidden sm:table-cell" :class="posHeader" @click="sortFromTable('position')">POS.</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr v-for="player in tableArr" class="odd:bg-espngray-100 even:bg-gray-50">
                                                <td class="whitespace-nowrap text-left py-3 pl-0.5 xs:pl-1 pr-0.5 text-[10px] xs:text-xs font-medium text-espnblack">{{ player.table_rk }}</td>
                                                <td class="hidden xs:table-cell whitespace-nowrap text-left py-3 pl-0.5 pr-0.5 xs:pr-1 text-xs xs:text-base font-medium text-espnblack" v-if="player.max_season != player.min_season">{{ player.full_nm }} <span class="-ml-0.5 text-espngray-600 font-normal text-xs">{{ player.min_season + '-' + player.max_season.toString().substring(2) }}</span></td>
                                                <td class="hidden xs:table-cell whitespace-nowrap text-left py-3 pl-0.5 pr-0.5 xs:pr-1 text-xs xs:text-base font-medium text-espnblack border-r-2 border-dashed sm:border-0" v-else>{{ player.full_nm }} <span class="-ml-0.5 text-espngray-600 font-normal text-xs">{{ player.max_season }}</span></td>
                                                <td class="table-cell xs:hidden whitespace-nowrap text-left py-3 pl-0.5 pr-0.5 xs:pr-1 text-[10px] xs:text-base font-medium text-espnblack" v-if="player.max_season != player.min_season">{{ player.first_nm.substring(0, 1) + ". " + player.last_nm }} <span class="-ml-0.5 text-espngray-600 font-normal text-[10px]">{{ '\'' + player.min_season.toString().substring(2) + '-' + player.max_season.toString().substring(2) }}</span></td>
                                                <td class="table-cell xs:hidden whitespace-nowrap text-left py-3 pl-0.5 pr-0.5 xs:pr-1 text-[10px] xs:text-base font-medium text-espnblack border-r-2 border-dashed sm:border-0" v-else>{{ player.first_nm.substring(0, 1) + ". " + player.last_nm }} <span class="-ml-0.5 text-espngray-600 font-normal text-[10px]">{{ '\'' + player.max_season.toString().substring(2) }}</span></td>
                                                <td class="whitespace-nowrap text-left px-1 py-4 text-sm text-espngray-900 hidden sm:table-cell">{{ player.tm }}</td>
                                                <td class="whitespace-nowrap text-left px-2 py-4 text-xs text-espngray-900 sm:border-r-2 sm:border-dashed hidden sm:table-cell">{{ player.position }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="min-w-[32%] mt-4 xs:mt-[1.075em] divide-y divide-gray-900 hidden lg:table">
                                        <!-- <caption class="text-xs font-semibold text-espngray-900">RECEIVING STATS</caption> -->
                                        <thead>
                                            <tr>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="ydsHeader" @click="sortFromTable('net_pts_games')">G</th>
                                                <!-- <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="tovHeader" @click="sortFromTable('tov')">TOV</th>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="stlHeader" @click="sortFromTable('stl')">STL</th>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="blkHeader" @click="sortFromTable('blk')">BLK</th>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="clutchHeader" @click="sortFromTable('clutch')">CLUTCH</th> -->
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr v-for="player in tableArr" class="odd:bg-espngray-100 even:bg-gray-50">
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.net_pts_games }}</td>
                                                <!-- <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.tov }}</td>
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.stl }}</td>
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.blk }}</td>
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.clutch }}</td> -->
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="min-w-[32%] mt-4 xs:mt-[1.075em] divide-y divide-gray-900">
                                        <!-- <caption class="text-[10px] xs:text-xs font-semibold text-espngray-900">RECEIVING RATINGS</caption> -->
                                        <thead>
                                            <tr>
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-right text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-espnred hover:cursor-pointer" :class="offenseHeader" @click="updateChartSort('offense')">OFF</th>
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-right text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-emerald-400 hover:cursor-pointer" :class="defenseHeader" @click="updateChartSort('defense')">DEF</th>
                                                <!-- <th scope="col" class="px-1 xs:px-2 py-1 text-right text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-espncyan-200 hover:cursor-pointer" :class="astHeader" @click="updateChartSort('ast')">AST</th> -->
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-center text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-espngray-600 hover:cursor-pointer hover:text-espngray-100" :class="overallHeader" @click="updateChartSort('overall')">OVERALL</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr v-for="player in tableArr" class="odd:bg-espngray-100 even:bg-gray-50">
                                                <td :style="{ '--tw-bg-opacity': `${player.offense_z/100}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-semibold text-xs xs:text-sm text-espnblack bg-espnred">{{ player.offense }}</td>
                                                <td :style="{ '--tw-bg-opacity': `${player.defense_z/100}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-semibold text-xs xs:text-sm text-espnblack bg-emerald-400">{{ player.defense }}</td>
                                                <!-- <td :style="{ '--tw-bg-opacity': `${player.ast_z/100}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-semibold text-xs xs:text-sm text-espnblack bg-espncyan-200">{{ player.ast }}</td> -->
                                                <td :style="{ '--tw-bg-opacity': `${player.overall_z/100}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-bold text-xs xs:text-sm text-espnblack bg-espngray-600">{{ player.overall }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="p-2 lg:p-0 lg:mt-4 max-w-5xl mx-auto py-5 text-left text-xs text-espngray-600">Wide receivers and tight ends with at least {{ minWrTgt }} targets and running backs with at least {{ minRbTgt }} in the 2023 season are eligible for a score. Only WR/TE are eligible for the Top 5 leaderboard graphic. For prior seasons, all players with at least 48 targets are included.</div> -->
            <!-- <div class="p-2 lg:p-0 lg:pb-4 lg:mt-4 max-w-5xl mx-auto pt-5 pb-10 text-left text-xs text-espngray-600"><sup>1</sup>Win Probability represents the chance to win at any point in the game. Win Probability Added (WPA) captures how much probability goes up or down when a player is on the court and gives them approximate credit.</div> -->
            <!-- <div class="footnote">Design ideas from <a href="https://fivethirtyeight.com/contributors/ryan-best/" target="_blank">Ryan Best</a>. Statistical model by Brian Burke. Additional contributions by <a href="https://benjaminharden.vercel.app/" target="_blank">Ben Harden</a>, Henry Gargiulo, Matt Morris and Chris Harden.</div> -->
        </div>
    </div>
  </template>

<script>
import Chart from 'chart.js/auto'
import * as d3 from 'd3'
import axios from 'axios'

export default {
  data() {
    this.chart = null
      return {
          seasonArr: [],
          chartArr: [],
          overall: [],
          offense: [],
          defense: [],
        //   asts: [],
          teams: [],
          tableArr: [],
          json: [],
          response: null,

          showOverall: false,
          showOffense: false,
          showDefense: false,
        //   showAsts: false,

          radioChoice: true,
          chartSeason: '2024',
          chartSeasons: [2024],
          chartPos: 'all',
          chartSort: 'overall',
          prevChartSort: -1,
          chartTeams: 'all',
          searchString: '',
          offenseBtn: '',
          defenseBtn: '',
        //   astBtn: '',
          overallBtn: 'overall_btn_click',
          offenseHeader: '',
          defenseHeader: '',
        //   astHeader: '',
          nmHeader: '',
          tmHeader: '',
          posHeader: '', 
          ydsHeader: '',
          tovHeader: '',
          stlHeader: '',
          blkHeader: '',
          clutchHeader: '',
          overallHeader: 'overall_header',
          minTgt: 1,
          dateUpdate: null,
          dataMin: -2,
          dataMax: 6,
      }
  },
  async mounted() {
    await this.getData();
    this.minTgt = this.json[0].min_net_pts_games
    const lastMod = new Date(this.response.headers['last-modified'])
    this.dateUpdate = new Date(lastMod.getTime() - 1000 * 60 * 60 * 24).toDateString()
    await this.getSeason(this.json);
    // console.log(this.json);
    this.buildPage();
    this.buildScatter();
    window.addEventListener('resize', this.handleResize);
    var tm = this.json.map(function(i) {
        return i.tm;
    });
    var team_name = this.json.map(function(i) {
        return i.team_name;
    })
    tm = [... new Set(tm)];
    team_name = [... new Set(team_name)];
    this.teams = tm.map(function(x, i) {
        return {tm: x, team_name: team_name[i]};
    });
    this.teams.sort((a, b) => d3.ascending(a.team_name, b.team_name));
  },
  methods: {
    handleClick() {
        if (this.searchString != '') {
            setTimeout(this.updateScatterData, 300)
        }
    },
    clickedFootnote() {
        window.scrollTo(0, document.body.scrollHeight)
    },
    async getData() {
        this.response = await axios.get('https://nfl-player-metrics.s3.amazonaws.com/net-pts/nba_net_pts_data.json');
        this.json = this.response.data;
        var ovrOldMin = Math.min(...this.json.map(o => o.overall))
        var ovrOldRange = Math.max(...this.json.map(o => o.overall)) - ovrOldMin
        var offenseOldMin = Math.min(...this.json.map(o => o.offense))
        var offenseOldRange = Math.max(...this.json.map(o => o.offense)) - offenseOldMin
        var defenseOldMin = Math.min(...this.json.map(o => o.defense))
        var defenseOldRange = Math.max(...this.json.map(o => o.defense)) - defenseOldMin
        // var astOldMin = Math.min(...this.json.map(o => o.ast))
        // var astOldRange = Math.max(...this.json.map(o => o.ast)) - astOldMin
        // var tovOldMin = Math.min(...this.json.map(o => o.tov))
        // var tovOldRange = Math.max(...this.json.map(o => o.tov)) - tovOldMin
        // var stlOldMin = Math.min(...this.json.map(o => o.stl))
        // var stlOldRange = Math.max(...this.json.map(o => o.stl)) - stlOldMin
        // var blkOldMin = Math.min(...this.json.map(o => o.blk))
        // var blkOldRange = Math.max(...this.json.map(o => o.blk)) - blkOldMin
        // var cluOldMin = Math.min(...this.json.map(o => o.clutch))
        // var cluOldRange = Math.max(...this.json.map(o => o.clutch)) - cluOldMin
        this.json.map(player => {
            player.first_last_nm = player.first_nm.substring(0, 1) + ". " + player.last_nm;
            player.overall_z = Math.round((player.overall - ovrOldMin) * 99 / ovrOldRange)
            player.offense_z = Math.round((player.offense - offenseOldMin) * 99 / offenseOldRange)
            player.defense_z = Math.round((player.defense - defenseOldMin) * 99 / defenseOldRange)
            // player.ast_z = Math.round((player.ast - astOldMin) * 99 / astOldRange)
            // player.tov_z = Math.round((player.tov - tovOldMin) * 99 / tovOldRange)
            // player.stl_z = Math.round((player.stl - stlOldMin) * 99 / stlOldRange)
            // player.blk_z = Math.round((player.blk - blkOldMin) * 99 / blkOldRange)
            // player.clutch_z = Math.round((player.clutch - cluOldMin) * 99 / cluOldRange)
            return player;
        })
        this.dataMin = Math.floor(Math.min(ovrOldMin, offenseOldMin, defenseOldMin)) - 5
        this.dataMax = Math.ceil(Math.max(Math.max(...this.json.map(o => o.overall)), Math.max(...this.json.map(o => o.offense)), 
                                Math.max(...this.json.map(o => o.defense)))) + 5
    },
      buildScatter() {
          const ctx = document.getElementById('chart');

          this.getChartData(this.json);
          let overallMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let offenseMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let defenseMap = this.sortAndRankBy(this.chartArr, this.chartSort);
        //   let astMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          this.tableArr = this.chartArr.reverse();

          let overallArr = this.reduceToXYByMetric(overallMap, 'overall');
          let offenseArr = this.reduceToXYByMetric(offenseMap, 'offense');
          let defenseArr = this.reduceToXYByMetric(defenseMap, 'defense');
        //   let astArr = this.reduceToXYByMetric(astMap, 'ast');
          document.getElementById('chart_container').style.width = (overallArr.length + 2) * 10 + 100 + 'px';

          this.chart = new Chart(ctx, {
              type: 'scatter',
              data: {
                  labels: 'Scatter Plot',
                  datasets: [{
                      data: overallArr,
                      allData: overallMap,
                      // fill: {
                      // target: 'origin',
                      // above: homeGradient,
                      // below: awayGradient,
                      // },
                      pointRadius: 5,
                      pointHoverRadius: 8,
                      pointStyle: 'rect',
                      backgroundColor: 'rgb(95, 95, 95)',
                      borderColor: 'rgb(95, 95, 95)',
                      // borderWidth: 1,
                      // customClock: tooltip_clock,
                      // customHomeScore: tooltip_homeScore,
                      // customAwayScore: tooltip_awayScore,
                      // customPlay: tooltip_play,
                      // customHomeTeam: chart_homeTeam,
                      // customAwayTeam: chart_awayTeam,
                      // customWinTeam: chart_winTeam,
                      // spanGaps: true,
                  }, 
                  {
                      data: offenseArr,
                      allData: overallMap,
                      pointRadius: 5,
                      pointHoverRadius: 8,
                      pointStyle: 'rect',
                      backgroundColor: 'rgb(195, 30, 50)',
                      borderColor: 'rgb(195, 30, 50)',
                  }, 
                  {
                      data: defenseArr,
                      allData: overallMap,
                      pointRadius: 5,
                      pointHoverRadius: 8,
                      pointStyle: 'rect',
                      backgroundColor: 'rgb(110 231 183)',
                      borderColor: 'rgb(110 231 183)',
                  }],
              },
              options: {
                  // animation,
                  responsive: true,
                  maintainAspectRatio: false,
                  // interaction: {
                  //     mode: 'index',
                  //     intersect: false,
                  // },
                  layout: {
                      padding: {
                          top: 10,
                          bottom: 10,
                      }
                  },
                  plugins: {
                  //     verticalLiner: {},
                      legend: {
                      display: false,
                      },
                      tooltip: {
                      displayColors: false,
                      // backgroundColor: '#EFEFEF',
                      callbacks: {
                          title: () => null,
                          label: function(context) {
                          let label = [context.dataset.allData[context.dataIndex].full_nm];
                          if (context.dataset.allData[context.dataIndex].min_season == context.dataset.allData[context.dataIndex].max_season) {
                              label.push(context.dataset.allData[context.dataIndex].position + ' | ' + context.dataset.allData[context.dataIndex].tm + ' | ' + context.dataset.allData[context.dataIndex].max_season);
                          } else {
                              label.push(context.dataset.allData[context.dataIndex].position + ' | ' + context.dataset.allData[context.dataIndex].tm + ' | ' + context.dataset.allData[context.dataIndex].min_season + '-' + context.dataset.allData[context.dataIndex].max_season.toString().substring(2));
                          }
                          if (context.datasetIndex == 0) {
                              label.push('Overall: ' + context.dataset.allData[context.dataIndex].overall);
                          } else if (context.datasetIndex == 1) {
                              label.push('Offense: ' + context.dataset.allData[context.dataIndex].offense);
                          } else {
                              label.push('Defense: ' + context.dataset.allData[context.dataIndex].defense);
                          } // else {
                        //       label.push('Ast: ' + context.dataset.allData[context.dataIndex].ast);
                        //   }
                          
                          
                          return label;
                          },
                      },
                  //     bodyColor: 'rgba(0, 0, 0)',
                      },
                  },
                  scales: {
                      y: {
                          beginAtZero: true,
                          display: true,
                          min: this.dataMin, 
                          max: this.dataMax,
                          grid: {
                              drawTicks: false,
                          },
                          ticks: {
                              display: false,
                              stepSize: 20,
                          },
                      },
                      x: {
                          display: false,
                          max: overallArr.length + 1,
                          // type: 'linear',
                          // max: xAxisEnd,
                          // min: -2400,
                      },
                  },
                  elements: {
                      // line: {
                      // tension: 1, // adjust the tension to control the curvature of the line
                      // cubicInterpolationMode: 'monotone'
                      // },
                  },
              },
          })

          const ctx2 = document.getElementById('chart2');

          new Chart(ctx2, {
              type: 'scatter',
              data: {
                  // datasets: [{
                  //     data: overallArr,
                  //     pointRadius: 5,
                  //     pointHoverRadius: 8,
                  //     pointStyle: 'rect',
                  //     backgroundColor: 'rgb(82 82 82)',
                  //     borderColor: 'rgb(82 82 82)',
                  // }]
              },
              options: {
                  maintainAspectRatio: false,
                  scales: {
                      y: {
                          beginAtZero: true,
                          display: true,
                          min: this.dataMin, 
                          max: this.dataMax,
                          ticks: {
                              stepSize: 20,
                          },
                          afterFit: (ctx) => {
                              ctx.width = 32;
                          }
                      },
                      x: {
                          ticks: {
                              display: false,
                          },
                          grid: {
                              drawTicks: false,
                          }
                      },
                  },
                  elements: {
                  },
              },
          })
      },
      updateScatterData() {
          this.getChartData(this.json);
          this.updateScatter();
      },
      updateScatter() {
          let overallMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let offenseMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let defenseMap = this.sortAndRankBy(this.chartArr, this.chartSort);
        //   let astMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          this.tableArr = this.chartArr.reverse();
        
          let overallArr = this.reduceToXYByMetric(overallMap, 'overall');
          let offenseArr = this.reduceToXYByMetric(offenseMap, 'offense');
          let defenseArr = this.reduceToXYByMetric(defenseMap, 'defense');
        //   let astArr = this.reduceToXYByMetric(astMap, 'ast');
          document.getElementById('chart_container').style.width = (overallArr.length + 2) * 10 + 100 + 'px';

          this.chart.data.datasets[0].data = overallArr;
          this.chart.data.datasets[0].allData = overallMap;
          this.chart.data.datasets[1].data = offenseArr;
          this.chart.data.datasets[1].allData = overallMap;
          this.chart.data.datasets[2].data = defenseArr;
          this.chart.data.datasets[2].allData = overallMap;
        //   this.chart.data.datasets[3].data = astArr;
        //   this.chart.data.datasets[3].allData = overallMap;
          if (overallArr.length > 3) {
            this.chart.options.scales.x.max = overallArr.length + 1;
            this.chart.options.scales.x.offset = false;
          } else {
            this.chart.options.scales.x.max = overallArr.length + 1;
            this.chart.options.scales.x.offset = true;
          }
          this.chart.update();
          this.chart.resize();
      },
      sortAndRankBy(arr, sortMetric) {
        if (['full_nm', 'tm', 'first_last_nm', 'position'].includes(sortMetric)) {
            if (this.prevChartSort > 0) {
                if (['full_nm', 'first_last_nm'].includes(sortMetric)) {
                    arr.sort((a, b) => b['min_season'] - a['min_season'])
                }
                arr.sort((a, b) => {
                    const nameA = a[sortMetric].toUpperCase(); // ignore upper and lowercase
                    const nameB = b[sortMetric].toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                if (['full_nm', 'first_last_nm'].includes(sortMetric)) {
                    arr.sort((a, b) => a['min_season'] - b['min_season'])
                }
                arr.sort((a, b) => {
                    const nameA = a[sortMetric].toUpperCase(); // ignore upper and lowercase
                    const nameB = b[sortMetric].toUpperCase(); // ignore upper and lowercase
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                });
            }
        } else {
            if (this.prevChartSort > 0) {
                arr.sort((a, b) => b[sortMetric] -  a[sortMetric]);
            } else {
                arr.sort((a, b) => a[sortMetric] - b[sortMetric]);
            }
        }
        arr.reverse()
        let rank = 1;
        let prevValue = null;
        arr.map((d, i) => {
            d.rk = i + 1
            if (d[sortMetric] === prevValue) {
                d.table_rk = rank;
            } else {
                rank = i + 1;
                d.table_rk = rank;
            }
            prevValue = d[sortMetric];
            return d;
        });
        return arr.reverse();
      },
      sortFromTable(value) {
        if (value == 'net_pts_games') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = 'yds_header'
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'stl') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = 'tgts_header'
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'tov') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.tovHeader = 'rts_header'
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'tm') {
            this.nmHeader = ''
            this.tmHeader = 'tm_header'
            this.posHeader = '' 
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'full_nm') {
            this.nmHeader = 'nm_header'
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'first_last_nm') {
            this.nmHeader = 'nm_header'
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'blk') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = 'yds_per_rt_header'
            this.clutchHeader = ''
        } else if (value == 'position') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = 'pos_header'
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = ''
        } else if (value == 'clutch') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = ''
            this.ydsHeader = ''
            this.tovHeader = ''
            this.stlHeader = ''
            this.blkHeader = ''
            this.clutchHeader = 'clutch_header'
        }
        this.offenseBtn = '';
        this.defenseBtn = '';
        // this.astBtn = '';
        this.overallBtn = '';
        this.offenseHeader = '';
        this.defenseHeader = '';
        // this.astHeader = '';
        this.overallHeader = '';
        if (this.chartSort == value) {
            this.prevChartSort = this.prevChartSort * -1;
        } else {
            this.prevChartSort = -1 * (value == 'tov' ? -1 : 1);
        }
        this.chartSort = value;
        this.updateScatter();
      },
      reduceToXYByMetric(arr, returnMetric) {
          let returnArr = arr.map(d => {
              return {x: d.rk, y: d[returnMetric]};
          });
          return returnArr;
      },
      getSeason(arr) {
          arr.forEach((player) => {
              if (player.max_season == '2024' && player.min_season == '2024') {
                  this.seasonArr.push(player);
              }
          });
      },
      getChartData(arr) {
          var tmpArr = [];
          if (this.radioChoice) {
              if (this.chartPos == 'all') {
                  arr.forEach((player) => {
                      if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season)) {
                          tmpArr.push(player);
                      }
                  });
              } else if (this.chartPos == 'gf') {
                  arr.forEach((player) => {
                      if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) &&
                      (player.position == 'G-F')) {
                          tmpArr.push(player);
                      }
                  });
              } else if (this.chartPos == 'fg') {
                  arr.forEach((player) => {
                      if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) &&
                      (player.position == 'F-G')) {
                          tmpArr.push(player);
                      }
                  });
              } else if (this.chartPos == 'fc') {
                arr.forEach((player) => {
                    if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) && 
                    (player.position == 'F-C')) {
                        tmpArr.push(player);
                    }
                });
              } else if (this.chartPos == 'cf') {
                arr.forEach((player) => {
                    if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) && 
                    (player.position == 'C-F')) {
                        tmpArr.push(player);
                    }
                });
              } else {
                  arr.forEach((player) => {
                      if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) &&
                      player.position == this.chartPos) {
                          tmpArr.push(player);
                      }
                  });
              }
          } //else {
        //       if (this.chartSeason.length == 4 && this.chartPos == 'wrte') {
        //           arr.forEach((player) => {
        //               if (player.max_season == this.chartSeason && player.min_season == this.chartSeason && 
        //               player.position != 'RB' && player.position != 'FB') {
        //                   tmpArr.push(player);
        //               }
        //           });
        //       } else if (this.chartSeason.length == 4) {
        //         if (this.chartPos == 'RB') {
        //             arr.forEach((player) => {
        //                 if (player.max_season == this.chartSeason && player.min_season == this.chartSeason && 
        //                 (player.position == 'RB' || player.position == 'FB')) {
        //                     tmpArr.push(player);
        //                 }
        //             });
        //         } else {
        //           arr.forEach((player) => {
        //               if (player.max_season == this.chartSeason && player.min_season == this.chartSeason && 
        //               player.position == this.chartPos) {
        //                   tmpArr.push(player);
        //               }
        //           });
        //         }
        //       } else if (this.chartPos == 'wrte') {
        //           arr.forEach((player) => {
        //               if (player.min_season == this.chartSeason.substring(0, 4) && player.max_season == '2023' && 
        //               player.position != 'RB' && player.position != 'FB') {
        //                   tmpArr.push(player);
        //               }
        //           });
        //       } else {
        //         if (this.chartPos == 'RB') {
        //             arr.forEach((player) => {
        //                 if (player.min_season == this.chartSeason.substring(0, 4) && player.max_season == '2023' && 
        //                 (player.position == 'RB' || player.position == 'FB')) {
        //                     tmpArr.push(player);
        //                 }
        //             });
        //         } else {
        //           arr.forEach((player) => {
        //               if (player.min_season == this.chartSeason.substring(0, 4) && player.max_season == '2023' && 
        //               player.position == this.chartPos) {
        //                   tmpArr.push(player);
        //               }
        //           });
        //         }
        //       }
        //   }
          if (this.chartTeams != 'all') {
            if (this.searchString != '') {
                let search = this.searchString.replace(/ /g, '')
                search = search.replace(/\./g, '')
                search = search.replace(/\-/g, '')
                search = search.replace(/\'/g, '').toLowerCase()
                this.chartArr = tmpArr.filter((player) => {
                    let nm = player.full_nm.replace(/ /g, '')
                    nm = nm.replace(/\./g, '')
                    nm = nm.replace(/\-/g, '')
                    nm = nm.replace(/\'/g, '').toLowerCase()
                    return player.tm == this.chartTeams && nm.includes(search)
                });
            } else {
                this.chartArr = tmpArr.filter((player) => {
                  return player.tm == this.chartTeams
              });
            }
          } else {
            if (this.searchString != '') {
                let search = this.searchString.replace(/ /g, '')
                search = search.replace(/\./g, '')
                search = search.replace(/\-/g, '')
                search = search.replace(/\'/g, '').toLowerCase()
                this.chartArr = tmpArr.filter((player) => {
                    let nm = player.full_nm.replace(/ /g, '')
                    nm = nm.replace(/\./g, '')
                    nm = nm.replace(/\-/g, '')
                    nm = nm.replace(/\'/g, '').toLowerCase()
                    return nm.includes(search)
                });
            } else {
                this.chartArr = tmpArr
            }
          }
      },
      getTopFive(arr, value, gap) {
          arr.sort((a, b) => b[value] - a[value]);
          var top5 = arr.filter(f => {
              return f[value] >= arr[4][value];
          });
          // if (arr[4][value] == arr[5][value]) { var top5 = arr.slice(0, 6); }
          // else { var top5 = arr.slice(0, 5); }
          var used = -1000
          var numUniques = 0;
          top5.forEach((player, index) => {
              if (index === 0) {
                  used = player[value]
                  numUniques = 1
              }
              else {
                  if (player[value] != used) {
                      numUniques = numUniques + 1
                  }
                  used = player[value]
              }
          })
          var previous = -1000
          top5.forEach((player, index) => {
              if (index === 0) {
                  previous = player[value]; 
                  player['gap' + value] = 0;
              }
              else {                              //window width - padding - "Title" - padding - high # - padding - low# - padding - 5 player circles - extra bit
                  player['gap' + value] = (previous - player[value]) * (window.innerWidth - 96 - 59.5 - 10 - 44.5 - 10 - 44.5 - 12 - 64 * numUniques - 15) / gap;
                  previous = player[value];
              }
          })
          const final = this.mergeObjectsWithSameScore(top5, value);
          switch (value) {
              case "overall":
                  this.overall = final.reverse();
                  this.showOverall = true
                  break;
              case "offense":
                  this.offense = final.reverse();
                  this.showOffense = true
                  break;
              case "defense":
                  this.defense = final.reverse();
                  this.showDefense = true
                  break;
            //   case "ast":
                //   this.asts = final.reverse();
                //   this.showAsts = true
                //   break;
              default:
                  console.log("Unknown day!");
          }
      },
      mergeObjectsWithSameScore(arr, val) {
          const scoreMap = {};
          const mergedArr = [];
          for (const obj of arr) {
              const valt = obj[val];
              if (scoreMap[valt]) {
                  scoreMap[valt].push(obj);
              } else {
                  scoreMap[valt] = [obj];
              }
          }
          for (const val in scoreMap) {
              if (scoreMap[val].length > 1) {
                  mergedArr.push({type: 'array', array: scoreMap[val]});
              } else {
                  mergedArr.push(scoreMap[val][0]);
              }
          }
          return mergedArr;
      },
      getMaxGap(arr, valueArr) {
        var maxGap = 0;
        valueArr.forEach(d => {
            var value = d;
            arr.sort((a, b) => b[value] - a[value]);
            var top5 = arr.filter(f => {
                return f[value] >= arr[4][value];
            });
            var gap = top5[0][value] - top5[4][value]
            maxGap = Math.max(maxGap, gap)
        })
        return maxGap
      },
      buildPage() {
          var maxGap = this.getMaxGap(this.seasonArr, ['overall', 'offense', 'defense']);
          this.getTopFive(this.seasonArr, 'overall', maxGap);
          this.getTopFive(this.seasonArr, 'offense', maxGap);
          this.getTopFive(this.seasonArr, 'defense', maxGap);
        //   this.getTopFive(this.seasonArr, 'ast', maxGap);
      },
      handleResize() {
          this.showOverall = false;
          this.showOffense = false;
          this.showDefense = false;
        //   this.showAsts = false;
          this.buildPage();
      },
      updateChartSort(value) {
          if (value == 'offense') {
              this.offenseBtn = 'offense_btn_click';
              this.defenseBtn = '';
            //   this.astBtn = '';
              this.overallBtn = '';
              this.offenseHeader = 'offense_header';
              this.defenseHeader = '';
            //   this.astHeader = '';
              this.overallHeader = '';
          } else if (value == 'defense') {
              this.defenseBtn = 'defense_btn_click';
              this.offenseBtn = '';
            //   this.astBtn = '';
              this.overallBtn = '';
              this.offenseHeader = '';
              this.defenseHeader = 'defense_header';
            //   this.astHeader = '';
              this.overallHeader = '';
          } else if (value == 'ast') {
              this.astBtn = 'ast_btn_click';
              this.defenseBtn = '';
              this.offenseBtn = '';
              this.overallBtn = '';
              this.offenseHeader = '';
              this.defenseHeader = '';
              this.astHeader = 'ast_header';
              this.overallHeader = '';
          } else {
              this.overallBtn = 'overall_btn_click';
              this.defenseBtn = '';
            //   this.astBtn = '';
              this.offenseBtn = '';
              this.offenseHeader = '';
              this.defenseHeader = '';
            //   this.astHeader = '';
              this.overallHeader = 'overall_header';
          }
        this.nmHeader = ''
        this.tmHeader = ''
        this.posHeader = '' 
        this.ydsHeader = ''
        this.tovHeader = ''
        this.stlHeader = ''
        this.blkHeader = ''
        this.clutchHeader = ''
        if (this.chartSort == value) {
            this.prevChartSort = this.prevChartSort * -1;
        } else {
            this.prevChartSort = -1;
        }
          this.chartSort = value;
          this.updateScatter();
      },
      async updateChartSeason(value, radioBool) {
          if (radioBool) this.radioChoice = !this.radioChoice;
          if (value != 'check') {
              this.chartSeason = value;
              this.chartSeasons = [2024];
              await this.updateScatterData();
          } else {
              this.chartSeasons = [];
              if (document.getElementById('check-1').checked) {
                  this.chartSeasons.push(2018);
              } 
              if (document.getElementById('check-2').checked) {
                  this.chartSeasons.push(2019);
              } 
              if (document.getElementById('check-3').checked) {
                  this.chartSeasons.push(2020);
              } 
              if (document.getElementById('check-4').checked) {
                  this.chartSeasons.push(2021);
              } 
              if (document.getElementById('check-5').checked) {
                  this.chartSeasons.push(2022);
              } 
              if (document.getElementById('check-6').checked) {
                  this.chartSeasons.push(2023);
              } 
              if (document.getElementById('check-7').checked) {
                  this.chartSeasons.push(2024);
              } 
              await this.updateScatterData();
          }
        // if (value == '2020-23') document.getElementById('initial-check').checked = true;
      },
  },
}

</script>

<style scoped>
.offense_btn_click, 
.offense_header {
  background-color: rgb(195, 30, 50);
  font-weight: 600;
}
.overall_btn_click, 
.overall_header {
  background-color: rgb(95 95 95);
  font-weight: 600;
  color: rgb(242, 242, 242);
}
.defense_btn_click, 
.defense_header {
  background-color: rgb(110 231 183);
  font-weight: 600;
}
/* .ast_btn_click, 
.ast_header {
  background-color: rgb(0, 167, 225);
  font-weight: 600;
} */

.yds_header, .nm_header, .tm_header, .pos_header, 
.rts_header, .tgts_header, .yds_per_rt_header, .clutch_header {
    background-color: rgb(220, 220, 220);
}
</style>