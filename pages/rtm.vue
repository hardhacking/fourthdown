<template>
    <Head>
        <Title>Receiver Tracking Metrics</Title>
    </Head>
    <div class="bg-espngray-100">
        <Header></Header>
        <div class="pt-28">
            <div class="flex flex-col items-center gap-4">
                <div class="text-4xl font-bold text-center text-espngray-900">The Best NFL Receivers</div>
                <div class="text-espngray-600 font-normal text-sm" v-if="weekUpdate <= 18">Updated through Week {{ weekUpdate }}</div>
                <div class="text-espngray-600 font-normal text-sm" v-else>Updated through {{ weekUpdate2 }}</div>
                <div class="p-2 lg:p-0 max-w-4xl text-center font-medium text-espngray-600">These ratings, updated weekly, use player-tracking data from NFL Next Gen Stats to evaluate every route a pass catcher runs and scores his performance in three phases of the
                game, from 0 to 99<sup class="cursor-pointer" @click="clickedFootnote()">1</sup>.</div>
            </div>
            <div class="hidden sm:block text-xl pt-5 text-center font-bold text-espngray-900">The Top Five: Four Different Ways</div>
            <!-- <div class="flex flex-col justify-center pt-5">
                <div class="hidden sm:block text-xl text-center font-black text-espngray-600">The Top Five</div>
                <div class="hidden sm:block text-xl text-center font-black text-espngray-600">Four Different Ways</div>
            </div> -->
            <div class="hidden sm:flex flex-col cursor-crosshair mb-12 mt-6">
                <div ref="overallRef"><LineScale v-if="showOverall" :arr="overall" value="overall" title="Overall" /></div>
                <div ref="openRef"><LineScale v-if="showOpen" :arr="open" value="open_score" title="Open" /></div>
                <div ref="catchRef"><LineScale v-if="showCatch" :arr="catches" value="catch_score" title="Catch" /></div>
                <div ref="yacRef"><LineScale v-if="showYards" :arr="yards" value="yac_score" title="YAC" /></div>
            </div>
            <!-- <div class="hidden sm:block p-2 lg:p-0 max-w-5xl text-left text-xs m-auto text-espngray-600">Wide receivers and tight ends with at least 20 targets in the 2023 season are eligible for leaderboards. Running backs are not eligible, as different weights 
                are used to construct their composite scores than wide receiver and tight end composite scores.</div> -->
            <div class="text-xl pt-5 text-center font-bold text-espngray-900">Where Every NFL Pass Catcher Stands</div>
            <div class="p-2 text-center font-medium text-espngray-600">Open, Catch, YAC and Overall receiver ratings</div>
            <div class="max-w-5xl m-auto">
                <div>
                    <div class="px-4 xs:pl-8">
                        <div class="flex flex-col lg:flex-row justify-start gap-4 lg:gap-20 py-2">
                            <div class="flex flex-col items-start">
                                <div class="text-xs text-espngray-900">SHOW ME:</div>
                                <div class="flex flex-col items-start">
                                    <label class="text-espngray-900"><input class="mr-0.5" type="radio" name="radio_but" :value=true v-model="radioChoice" @click="updateChartSeason('2023', true)">Individual season(s)</label>
                                    <label class="text-espngray-900"><input class="mr-0.5 text-espngray-600" type="radio" name="radio_but" :value=false v-model="radioChoice" @click="updateChartSeason('2020-23', true)">Combined seasons</label>
                                </div>
                            </div>
                            <div class="flex flex-col items-start" v-if="radioChoice">
                                <div class="text-sm text-left lg:pl-1 text-espngray-900">CHOOSE INDIVIDUAL SEASON(S)</div>
                                <div class="flex flex-wrap">
                                    <div class="flex">
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-1" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2017</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-2" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2018</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-3" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2019</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-4" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2020</label></div>
                                    </div>
                                    <div class="flex">
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-5" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2021</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-6" name="check_seas" type="checkbox" @click="updateChartSeason('check')">2022</label></div>
                                        <div><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="check-7" name="check_seas" type="checkbox" @click="updateChartSeason('check')" checked>2023</label></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-start" v-else>
                                <div class="text-sm text-left lg:pl-1 text-espngray-900">CHOOSE COMBINED SEASONS</div>
                                <div class="flex flex-wrap">
                                    <div class="flex">
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2017-23')" />2017-23</label></div>
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2018-23')" />2018-23</label></div>
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2019-23')" />2019-23</label></div>
                                    </div>
                                    <div class="flex">
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" id="initial-check" name="radio_seas" type="radio" @click="updateChartSeason('2020-23')" />2020-23</label></div>
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2021-23')" />2021-23</label></div>
                                        <div class="block"><label class="pr-2 py-1 lg:p-1 text-espngray-900"><input class="m-0.5" name="radio_seas" type="radio" @click="updateChartSeason('2022-23')" />2022-23</label></div>
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
                                <option value="wrte">WR/TE</option>
                                <option value="WR">WR</option>
                                <option value="TE">TE</option>
                                <option value="RB">RB</option>
                            </select>
                            <input class="rounded-sm bg-gray-50 border border-espngray-300 text-espngray-900 text-sm focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search" v-model="searchString" @keyup="updateScatterData()" @click="handleClick()">
                        </div>
                    </div>
                    <div class="mt-4 lg:-mt-[3.2em]">
                        <div class="flex justify-start xs:justify-end m-2">
                            <div class="hidden xs:block px-1 py-1.5 m-0.5 text-espngray-900">SORT CHART: </div>
                            <div class="block xs:hidden px-1 py-1.5 m-0.5 text-espngray-900">SORT: </div>
                            <div class="flex flex-wrap">
                                <div class="text-espngray-900 text-center cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-16 hover:bg-espnred hover:font-semibold" :class="openBtn" @click="updateChartSort('open_score')">OPEN</div>
                                <div class="text-espngray-900 text-center cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-20 hover:bg-emerald-400 hover:font-semibold" :class="catchBtn" @click="updateChartSort('catch_score')">CATCH</div>
                                <div class="text-espngray-900 text-center cursor-pointer p-1.5 m-0.5 rounded-sm border border-espngray-900 w-14 hover:bg-espncyan-200 hover:font-semibold" :class="yacBtn" @click="updateChartSort('yac_score')">YAC</div>
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
                                    <table class="min-w-[32%] divide-y divide-gray-900 hidden lg:table">
                                        <caption class="text-xs font-semibold text-espngray-900">RECEIVING STATS</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="ydsHeader" @click="sortFromTable('yds')">YDS</th>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="rtsHeader" @click="sortFromTable('rtm_routes')">ROUTES</th>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="tgtsHeader" @click="sortFromTable('rtm_targets')">TGTS</th>
                                                <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" :class="ydsPerRtHeader" @click="sortFromTable('yds_per_rt')">YDS/RT</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr v-for="player in tableArr" class="odd:bg-espngray-100 even:bg-gray-50">
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.yds }}</td>
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.rtm_routes }}</td>
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ player.rtm_targets }}</td>
                                                <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack">{{ (player.yds / player.rtm_routes).toFixed(1) }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="min-w-[32%] divide-y divide-gray-900">
                                        <caption class="text-[10px] xs:text-xs font-semibold text-espngray-900">RECEIVING RATINGS</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-right text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-espnred hover:cursor-pointer" :class="openHeader" @click="updateChartSort('open_score')">OPEN</th>
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-right text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-emerald-400 hover:cursor-pointer" :class="catchHeader" @click="updateChartSort('catch_score')">CATCH</th>
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-right text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-espncyan-200 hover:cursor-pointer" :class="yacHeader" @click="updateChartSort('yac_score')">YAC</th>
                                                <th scope="col" class="px-1 xs:px-2 py-1 text-center text-[10px] xs:text-xs w-1/4 font-normal text-espnblack hover:bg-espngray-600 hover:cursor-pointer hover:text-espngray-100" :class="overallHeader" @click="updateChartSort('overall')">OVERALL</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr v-for="player in tableArr" class="odd:bg-espngray-100 even:bg-gray-50">
                                                <td :style="{ '--tw-bg-opacity': `0.${player.open_score}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-semibold text-xs xs:text-sm text-espnblack bg-espnred">{{ player.open_score }}</td>
                                                <td :style="{ '--tw-bg-opacity': `0.${player.catch_score}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-semibold text-xs xs:text-sm text-espnblack bg-emerald-400">{{ player.catch_score }}</td>
                                                <td :style="{ '--tw-bg-opacity': `0.${player.yac_score}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-semibold text-xs xs:text-sm text-espnblack bg-espncyan-200">{{ player.yac_score }}</td>
                                                <td :style="{ '--tw-bg-opacity': `0.${player.overall}`}" class="whitespace-nowrap text-right px-1 xs:px-2 py-4 w-1/4 font-bold text-xs xs:text-sm text-espnblack bg-espngray-600">{{ player.overall }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 lg:p-0 lg:mt-4 max-w-5xl mx-auto py-5 text-left text-xs text-espngray-600">Wide receivers and tight ends with at least {{ minWrTgt }} targets and running backs with at least {{ minRbTgt }} in the 2023 season are eligible for a score. Only WR/TE are eligible for the Top 5 leaderboard graphic. For prior seasons, all players with at least 48 targets are included.</div>
            <div class="p-2 lg:p-0 lg:pb-4 lg:mt-4 max-w-5xl mx-auto pt-5 pb-10 text-left text-xs text-espngray-600"><sup>1</sup><a class="text-blue-600 underline" href="https://www.espn.com/nfl/story/_/id/34649390/espn-receiver-tracking-metrics-how-new-nfl-stats-work-open-catch-yac-scores" target="_blank">Read more</a> about how ESPN Analytics's receiver ratings work.</div>
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
          open: [],
          catches: [],
          yards: [],
          teams: [],
          tableArr: [],
          json: [],
          response: null,

          showOverall: false,
          showOpen: false,
          showCatch: false,
          showYards: false,

          radioChoice: true,
          chartSeason: '2023',
          chartSeasons: [2023],
          chartPos: 'wrte',
          chartSort: 'overall',
          prevChartSort: -1,
          chartTeams: 'all',
          searchString: '',
          openBtn: '',
          catchBtn: '',
          yacBtn: '',
          overallBtn: 'overall_btn_click',
          openHeader: '',
          catchHeader: '',
          yacHeader: '',
          nmHeader: '',
          tmHeader: '',
          posHeader: '', 
          ydsHeader: '',
          rtsHeader: '',
          tgtsHeader: '',
          ydsPerRtHeader: '',
          overallHeader: 'overall_header',
          minWrTgt: 22,
          minRbTgt: 15,
          weekUpdate: null,
          weekUpdate2: null,
      }
  },
  async mounted() {
    await this.getData();
    this.minWrTgt = this.json.filter(f => {
        return f.min_season == 2023 & f.max_season == 2023 & (f.position == 'WR' | f.position == 'TE')
    })[0].min_rtm_targets
    this.minRbTgt = this.json.filter(f => {
        return f.min_season == 2023 & f.max_season == 2023 & (f.position == 'RB' | f.position == 'FB')
    })[0].min_rtm_targets
    const lastMod = new Date(this.response.headers['last-modified'])
    const week0 = new Date("2023-09-05")
    const timeDifferenceInMilliseconds = lastMod.getTime() - week0.getTime()
    this.weekUpdate = Math.round(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24) / 7)
    this.weekUpdate2 = this.weekUpdate == 19 ? 'Wild Card Round' : (this.weekUpdate == 20 ? 'Divisional Round' : (this.weekUpdate == 21 ? 'Conference Championship' : 'Super Bowl'))
      await this.getSeason(this.json);
      
      this.buildPage();
      this.buildScatter();
      window.addEventListener('resize', this.handleResize);
      var tm = this.chartArr.map(function(i) {
          return i.tm;
      });
      var team_name = this.chartArr.map(function(i) {
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
        this.response = await axios.get('https://nfl-player-metrics.s3.amazonaws.com/rtm/rtm_data.json');
        this.json = this.response.data;
        this.json.map(player => {
            player.first_last_nm = player.first_nm.substring(0, 1) + ". " + player.last_nm;
            player.yds_per_rt = (player.yds / player.rtm_routes).toFixed(1)
            return player;
        })
    },
      buildScatter() {
          const ctx = document.getElementById('chart');

          this.getChartData(this.json);
          let overallMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let openMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let catchMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let yacMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          this.tableArr = this.chartArr.reverse();

          let overallArr = this.reduceToXYByMetric(overallMap, 'overall');
          let openArr = this.reduceToXYByMetric(openMap, 'open_score');
          let catchArr = this.reduceToXYByMetric(catchMap, 'catch_score');
          let yacArr = this.reduceToXYByMetric(yacMap, 'yac_score');
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
                      data: openArr,
                      allData: overallMap,
                      pointRadius: 5,
                      pointHoverRadius: 8,
                      pointStyle: 'rect',
                      backgroundColor: 'rgb(195, 30, 50)',
                      borderColor: 'rgb(195, 30, 50)',
                  }, 
                  {
                      data: catchArr,
                      allData: overallMap,
                      pointRadius: 5,
                      pointHoverRadius: 8,
                      pointStyle: 'rect',
                      backgroundColor: 'rgb(110 231 183)',
                      borderColor: 'rgb(110 231 183)',
                  }, 
                  {
                      data: yacArr,
                      allData: overallMap,
                      pointRadius: 5,
                      pointHoverRadius: 8,
                      pointStyle: 'rect',
                      backgroundColor: 'rgb(0, 167, 225)',
                      borderColor: 'rgb(0, 167, 225)',
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
                              label.push('Open: ' + context.dataset.allData[context.dataIndex].open_score);
                          } else if (context.datasetIndex == 2) {
                              label.push('Catch: ' + context.dataset.allData[context.dataIndex].catch_score);
                          } else {
                              label.push('YAC: ' + context.dataset.allData[context.dataIndex].yac_score);
                          }
                          
                          
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
                          min: 0, 
                          max: 100,
                          grid: {
                              drawTicks: false,
                          },
                          ticks: {
                              display: false,
                              stepSize: 25,
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
                          min: 0, 
                          max: 100,
                          ticks: {
                              stepSize: 25,
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
          let openMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let catchMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          let yacMap = this.sortAndRankBy(this.chartArr, this.chartSort);
          this.tableArr = this.chartArr.reverse();

          let overallArr = this.reduceToXYByMetric(overallMap, 'overall');
          let openArr = this.reduceToXYByMetric(openMap, 'open_score');
          let catchArr = this.reduceToXYByMetric(catchMap, 'catch_score');
          let yacArr = this.reduceToXYByMetric(yacMap, 'yac_score');
          document.getElementById('chart_container').style.width = (overallArr.length + 2) * 10 + 100 + 'px';

          this.chart.data.datasets[0].data = overallArr;
          this.chart.data.datasets[0].allData = overallMap;
          this.chart.data.datasets[1].data = openArr;
          this.chart.data.datasets[1].allData = overallMap;
          this.chart.data.datasets[2].data = catchArr;
          this.chart.data.datasets[2].allData = overallMap;
          this.chart.data.datasets[3].data = yacArr;
          this.chart.data.datasets[3].allData = overallMap;
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
        if (value == 'yds') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = 'yds_header'
            this.rtsHeader = ''
            this.tgtsHeader = ''
            this.ydsPerRtHeader = ''
        } else if (value == 'rtm_targets') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.rtsHeader = ''
            this.tgtsHeader = 'tgts_header'
            this.ydsPerRtHeader = ''
        } else if (value == 'rtm_routes') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.rtsHeader = 'rts_header'
            this.tgtsHeader = ''
            this.ydsPerRtHeader = ''
        } else if (value == 'tm') {
            this.nmHeader = ''
            this.tmHeader = 'tm_header'
            this.posHeader = '' 
            this.ydsHeader = ''
            this.rtsHeader = ''
            this.tgtsHeader = ''
            this.ydsPerRtHeader = ''
        } else if (value == 'full_nm') {
            this.nmHeader = 'nm_header'
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.rtsHeader = ''
            this.tgtsHeader = ''
            this.ydsPerRtHeader = ''
        } else if (value == 'first_last_nm') {
            this.nmHeader = 'nm_header'
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.rtsHeader = ''
            this.tgtsHeader = ''
            this.ydsPerRtHeader = ''
        } else if (value == 'yds_per_rt') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = '' 
            this.ydsHeader = ''
            this.rtsHeader = ''
            this.tgtsHeader = ''
            this.ydsPerRtHeader = 'yds_per_rt_header'
        } else if (value == 'position') {
            this.nmHeader = ''
            this.tmHeader = ''
            this.posHeader = 'pos_header'
            this.ydsHeader = ''
            this.rtsHeader = ''
            this.tgtsHeader = ''
            this.ydsPerRtHeader = ''
        }
        this.openBtn = '';
        this.catchBtn = '';
        this.yacBtn = '';
        this.overallBtn = '';
        this.openHeader = '';
        this.catchHeader = '';
        this.yacHeader = '';
        this.overallHeader = '';
        if (this.chartSort == value) {
            this.prevChartSort = this.prevChartSort * -1;
        } else {
            this.prevChartSort = -1;
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
              if (player.max_season == '2023' && player.min_season == '2023' && 
              (player.position == 'WR' || player.position == 'TE')) {
                  this.seasonArr.push(player);
              }
          });
      },
      getChartData(arr) {
          var tmpArr = [];
          if (this.radioChoice) {
              if (this.chartPos == 'wrte') {
                  arr.forEach((player) => {
                      if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) && 
                      player.position != 'RB' && player.position != 'FB') {
                          tmpArr.push(player);
                      }
                  });
              } else if (this.chartPos == 'RB') {
                arr.forEach((player) => {
                    if (player.max_season == player.min_season && this.chartSeasons.includes(player.max_season) && 
                    (player.position == 'RB' || player.position == 'FB')) {
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
          } else {
              if (this.chartSeason.length == 4 && this.chartPos == 'wrte') {
                  arr.forEach((player) => {
                      if (player.max_season == this.chartSeason && player.min_season == this.chartSeason && 
                      player.position != 'RB' && player.position != 'FB') {
                          tmpArr.push(player);
                      }
                  });
              } else if (this.chartSeason.length == 4) {
                if (this.chartPos == 'RB') {
                    arr.forEach((player) => {
                        if (player.max_season == this.chartSeason && player.min_season == this.chartSeason && 
                        (player.position == 'RB' || player.position == 'FB')) {
                            tmpArr.push(player);
                        }
                    });
                } else {
                  arr.forEach((player) => {
                      if (player.max_season == this.chartSeason && player.min_season == this.chartSeason && 
                      player.position == this.chartPos) {
                          tmpArr.push(player);
                      }
                  });
                }
              } else if (this.chartPos == 'wrte') {
                  arr.forEach((player) => {
                      if (player.min_season == this.chartSeason.substring(0, 4) && player.max_season == '2023' && 
                      player.position != 'RB' && player.position != 'FB') {
                          tmpArr.push(player);
                      }
                  });
              } else {
                if (this.chartPos == 'RB') {
                    arr.forEach((player) => {
                        if (player.min_season == this.chartSeason.substring(0, 4) && player.max_season == '2023' && 
                        (player.position == 'RB' || player.position == 'FB')) {
                            tmpArr.push(player);
                        }
                    });
                } else {
                  arr.forEach((player) => {
                      if (player.min_season == this.chartSeason.substring(0, 4) && player.max_season == '2023' && 
                      player.position == this.chartPos) {
                          tmpArr.push(player);
                      }
                  });
                }
              }
          }
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
      getTopFive(arr, value) {
          arr.sort((a, b) => b[value] - a[value]);
          var top5 = arr.filter(f => {
              return f[value] >= arr[4][value];
          });
          // if (arr[4][value] == arr[5][value]) { var top5 = arr.slice(0, 6); }
          // else { var top5 = arr.slice(0, 5); }
          var previous = 0;
          top5.forEach((player, index) => {
              if (index === 0) {
                  previous = player[value]; 
                  player['gap' + value] = 0;
              }
              else {
                  player['gap' + value] = (previous - player[value]) * (window.innerWidth * .785 - 77.5 - 34.93 - 34.93 - 52) / 14  - 52;
                  previous = player[value];
              }
          })
          const final = this.mergeObjectsWithSameScore(top5, value);
          switch (value) {
              case "overall":
                  this.overall = final;
                  this.showOverall = true
                  break;
              case "open_score":
                  this.open = final;
                  this.showOpen = true
                  break;
              case "catch_score":
                  this.catches = final;
                  this.showCatch = true
                  break;
              case "yac_score":
                  this.yards = final;
                  this.showYards = true
                  break;
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
      buildPage() {
          this.getTopFive(this.seasonArr, 'overall');
          this.getTopFive(this.seasonArr, 'open_score');
          this.getTopFive(this.seasonArr, 'catch_score');
          this.getTopFive(this.seasonArr, 'yac_score');
      },
      handleResize() {
          this.showOverall = false;
          this.showOpen = false;
          this.showCatch = false;
          this.showYards = false;
          this.buildPage();
      },
      updateChartSort(value) {
          if (value == 'open_score') {
              this.openBtn = 'open_btn_click';
              this.catchBtn = '';
              this.yacBtn = '';
              this.overallBtn = '';
              this.openHeader = 'open_header';
              this.catchHeader = '';
              this.yacHeader = '';
              this.overallHeader = '';
          } else if (value == 'catch_score') {
              this.catchBtn = 'catch_btn_click';
              this.openBtn = '';
              this.yacBtn = '';
              this.overallBtn = '';
              this.openHeader = '';
              this.catchHeader = 'catch_header';
              this.yacHeader = '';
              this.overallHeader = '';
          } else if (value == 'yac_score') {
              this.yacBtn = 'yac_btn_click';
              this.catchBtn = '';
              this.openBtn = '';
              this.overallBtn = '';
              this.openHeader = '';
              this.catchHeader = '';
              this.yacHeader = 'yac_header';
              this.overallHeader = '';
          } else {
              this.overallBtn = 'overall_btn_click';
              this.catchBtn = '';
              this.yacBtn = '';
              this.openBtn = '';
              this.openHeader = '';
              this.catchHeader = '';
              this.yacHeader = '';
              this.overallHeader = 'overall_header';
          }
        this.nmHeader = ''
        this.tmHeader = ''
        this.posHeader = '' 
        this.ydsHeader = ''
        this.rtsHeader = ''
        this.tgtsHeader = ''
        this.ydsPerRtHeader = ''
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
              this.chartSeasons = [2023];
              await this.updateScatterData();
          } else {
              this.chartSeasons = [];
              if (document.getElementById('check-1').checked) {
                  this.chartSeasons.push(2017);
              } 
              if (document.getElementById('check-2').checked) {
                  this.chartSeasons.push(2018);
              } 
              if (document.getElementById('check-3').checked) {
                  this.chartSeasons.push(2019);
              } 
              if (document.getElementById('check-4').checked) {
                  this.chartSeasons.push(2020);
              } 
              if (document.getElementById('check-5').checked) {
                  this.chartSeasons.push(2021);
              } 
              if (document.getElementById('check-6').checked) {
                  this.chartSeasons.push(2022);
              } 
              if (document.getElementById('check-7').checked) {
                  this.chartSeasons.push(2023);
              } 
              await this.updateScatterData();
          }
        if (value == '2020-23') document.getElementById('initial-check').checked = true;
      },
  },
}

</script>

<style scoped>
.open_btn_click, 
.open_header {
  background-color: rgb(195, 30, 50);
  font-weight: 600;
}
.overall_btn_click, 
.overall_header {
  background-color: rgb(95 95 95);
  font-weight: 600;
  color: rgb(242, 242, 242);
}
.catch_btn_click, 
.catch_header {
  background-color: rgb(110 231 183);
  font-weight: 600;
}
.yac_btn_click, 
.yac_header {
  background-color: rgb(0, 167, 225);
  font-weight: 600;
}

.yds_header, .nm_header, .tm_header, .pos_header, 
.rts_header, .tgts_header, .yds_per_rt_header {
    background-color: rgb(220, 220, 220);
}
</style>