<template>
    <div id="cbb-app">
      <div class="page-div">
        <!-- <CBBHeader :gamesRef="gamesRef" :titleRef="titleRef" :allRef="allRef" :buttonLink="buttonLink" :menuClass1="menuClass1" :menuClass2="menuClass2" :menuClass3="menuClass3"/> -->
        <div class="home" id="page-id">
          
          <div class="games-page">
            <!-- <div class="s16-title">April 1<sup>st</sup></div> -->
            <form class="form-round flex items-center justify-center" id="form-round">
              <label class="label-round p-2" id="label-round" for="round">Charts: </label>
              <select class="round-input" name="round" id="round-input" v-model="chosenData" @change="changePage()">
                <option value=0>Probability Charts</option>
                <option value=1>Plays Table</option>
              </select>
            </form>
            <form class="form-round flex items-center justify-center" id="form-round">
              <label class="label-round p-2" id="label-round" for="round">Bet: </label>
              <select class="round-input" name="round" id="round-input" v-model="chosenBet" @change="changePage()">
                <option value=0>Total</option>
                <option value=1>Spread</option>
              </select>
            </form>
            <form class="form-round flex items-center justify-center" id="form-round">
              <label class="label-round p-2" id="label-round" for="round">Date: </label>
              <select class="round-input" name="round" id="round-input" v-model="chosenDate" @change="changePage()">
                <option v-for="date in dates" :value="date">{{ date }}</option>
              </select>
            </form>
            <div class="charts" id="cjs-charts">
              <!-- <div class="chart">
                <div class="legend-title-cont" >
                  <div class="legend-title" >
                    <div class="team-title" >
                      <div class="legend-seed">
                        10
                      </div>
                      <div class="legend-team" >
                        Texas A&M-CC
                      </div>
                      <div class="legend-score" >
                        58
                      </div>
                    </div>
                    <div class="legend-time" >
                      1:28 2H
                    </div>
                    <div class="team-title" >
                      <div class="legend-seed" >
                        6
                      </div>
                      <div class="legend-team" >
                        Texas Southern
                      </div>
                      <div class="legend-score" >
                        42
                      </div>
                    </div>
                  </div>
                </div>
                <div class="legend-top-left">
                  <div id="team-info">
                    <div class="btn-sm" style="background: #003559;"></div>
                    <p class="tm-abbrev">HOU</p>
                  </div>
                </div>
                <div class="canvas-cont">
                  <canvas id="myChart2"></canvas>
                </div>
                <div class="legend-bottom-left">
                  <div id="team-info">
                    <div class="btn-sm" style="background: #003559;"></div>
                    <p class="tm-abbrev" >UNC</p>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="flex justify-center">
              <table class="min-w-[32%] mt-4 xs:mt-[1.075em] divide-y divide-gray-900">
                <thead>
                    <tr>
                        <th scope="col" class="hidden xs:table-cell py-1 pl-0.5 pr-0.5 xs:pr-1 text-left text-[10px] xs:text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('full_nm')">GAME</th>
                        <th scope="col" class="table-cell xs:hidden py-1 pl-0.5 pr-0.5 xs:pr-1 text-left text-[10px] xs:text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('first_last_nm')">GAME</th>
                        <th scope="col" class="px-1 py-1 text-right text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer hidden sm:table-cell" @click="sortFromTable('full_nm')">QUARTER</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer hidden sm:table-cell" @click="sortFromTable('position')">CLOCK</th>
                        <th scope="col" class="px-1 py-1 text-right text-xs font-semibold text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer hidden sm:table-cell" @click="sortFromTable('tm')">SEC LEFT</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('yds')" v-if="chosenBet == 0">PREV OVER %</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('yds')" v-else>PREV COVER %</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('yds')" v-if="chosenBet == 0">NEW OVER %</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('yds')" v-else>NEW COVER %</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('yds')" v-if="chosenBet == 0">CHANGE IN OVER %</th>
                        <th scope="col" class="px-2 py-1 text-right text-xs font-normal text-espngray-900 hover:bg-espngray-300 hover:cursor-pointer" @click="sortFromTable('yds')" v-else>CHANGE IN COVER %</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="play in tableData" class="odd:bg-espngray-100 even:bg-gray-50">
                        <td class="hidden xs:table-cell whitespace-nowrap text-left py-3 pl-0.5 pr-0.5 xs:pr-1 text-xs xs:text-base font-medium text-espnblack">{{ play.OPP_NICKNAME + ' @ ' + play.TEAM_NICKNAME }} </td>
                        <td class="table-cell xs:hidden whitespace-nowrap text-left py-3 pl-0.5 pr-0.5 xs:pr-1 text-[10px] xs:text-base font-medium text-espnblack">{{ play.OPP_NICKNAME + ' @ ' + play.TEAM_NICKNAME }}</td>
                        <td class="whitespace-nowrap text-right py-3 pl-0.5 xs:pl-1 pr-0.5 text-[10px] xs:text-xs font-medium text-espnblack">{{ play.PERIOD }}</td>
                        <td class="whitespace-nowrap text-right px-1 py-4 text-sm text-espngray-900 hidden sm:table-cell">{{ play.CLOCK_TEXT }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 text-xs text-espngray-900 sm:border-r-2 sm:border-dashed hidden sm:table-cell">{{ play.SECLEFT }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack" v-if="chosenBet == 0">{{ (play.PREV_OVER * 100).toFixed(2) + '%' }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack" v-else>{{ (play.PREV_COVER * 100).toFixed(2) + '%' }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack" v-if="chosenBet == 0">{{ (play.OVER_PROB * 100).toFixed(2) + '%' }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack" v-else>{{ (play.COVER_PROB * 100).toFixed(2) + '%' }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack" v-if="chosenBet == 0">{{ (play.OVER_CHANGE * 100).toFixed(2) + '%' }}</td>
                        <td class="whitespace-nowrap text-right px-2 py-4 font-medium text-sm text-espnblack" v-else>{{ (play.COVER_CHANGE * 100).toFixed(2) + '%' }}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- <CBBFooter :espnLink="setEspnLink"/> -->
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto'
  import * as d3 from 'd3'
//   import AWS from 'aws-sdk'
  
  export default {
    name: 'MCBBGames',
    title: 'ESPN Analytics: Men\'s Games',
    data() {
      return {
        data: [],
        ref: [],
        dates: [],
        // timer: null,
        live_chartsArr: [],
        curr_game_ids: [],
        // old_game_ids: [],
        chosenBet: 1,
        chosenData: 0,
        test_bool: [],
        animation_bool: true,
        chosenDate: null,
        filtered_ids: [],
        tableData: [],
      }
    },
    created() {
    //   const descEl = document.querySelector('head meta[name="description"]');
    //   const titleEl = document.querySelector('head title');
    //   const title2 = document.querySelector('head meta[name="title"]');
    // //   title2.setAttribute('content', 'ESPN Analytics: Men\'s Games');
    // //   descEl.setAttribute('content', 'Game by game win probabilities for March Madness by ESPN Analytics');
    //   titleEl.textContent = 'ESPN Analytics: Men\'s Games';
    //   document.title = 'ESPN Analytics: Men\'s Games';
    },
    mounted() {
      // this.setZoomLevel()
      // window.addEventListener('resize', this.setZoomLevel)
      
      this.loadPage();
      // this.timer = setInterval(() => {
      //   this.updatePageTemp()
      // }, 20000)
    },
    methods: {
      async loadPage() {
        // console.log(this.chosenDate)
        this.data = await this.getS3Data('wp_table.json')

        this.data.map(d => {
          var dateString = d.SCHEDULE_ID.substring(0, 8)
          var year = dateString.substring(0, 4);
          var month = dateString.substring(4, 6);
          var day = dateString.substring(6, 8);

          // Create a formatted date string
          var formattedDateString = `${month}/${day}/${year}`;
          d.date = formattedDateString
          return d;
        })
        // console.log(this.data)
        this.ref = [...new Set(this.data.map(d => d.OPP_NICKNAME).
                            concat(this.data.map(d => d.TEAM_NICKNAME)))]
        // console.log(this.ref)
        this.dates = [...new Set(this.data.map(d => d.date))]
        // console.log(this.dates)
        if (!this.chosenDate) {
          this.chosenDate = this.dates[0]
        }
        // console.log(this.chosenDate)
        this.curr_game_ids = this.data.map(({EVENT_ID, date}) => ({EVENT_ID, date}))
        // console.log(this.curr_game_ids)
        this.filtered_ids = this.curr_game_ids.filter(f => f.date == this.chosenDate);
        // console.log(this.filtered_ids);
        // d3.select('#cjs-charts').selectAll('*').remove();
        this.animation_bool = true;
        if (this.chosenData == 0) {
          this.createAllCharts(this.data);
          this.displayTable(this.data);
        } else {
          this.displayTable(this.data);
        }
        // let game = this.data.filter(function(p) {return p.game_id == 401524079});
        // this.makeTestChart();
      },
      displayTable(fullData) {
        fullData = fullData.filter(f => f.date == this.chosenDate)
        fullData = fullData.sort((a,b) => {
          return d3.ascending(a.SECLEFT, b.SECLEFT)
        }).sort((a, b) => {
          return d3.descending(a.EVENT_ID, b.EVENT_ID)
        })
        fullData = fullData.map((d, i) => {
          if ((fullData.length - 1) != i) {
            if (d.EVENT_ID == fullData[i+1].EVENT_ID) {
              d.COVER_CHANGE = d.COVER_PROB - fullData[i+1].COVER_PROB
              d.PREV_COVER = fullData[i+1].COVER_PROB
              d.OVER_CHANGE = d.OVER_PROB - fullData[i+1].OVER_PROB
              d.PREV_OVER = fullData[i+1].OVER_PROB
            } else {
              d.COVER_CHANGE = 0
              d.OVER_CHANGE = 0
            }
          } else {
            d.COVER_CHANGE = 0
            d.OVER_CHANGE = 0
          }
          return d
        })
        this.tableData = fullData.map(d => (d))
        if (this.chosenBet == 0) {
          this.tableData = this.tableData.filter(f => {
            return (Math.abs(f.OVER_CHANGE) >= .2)
          })
        } else {
          this.tableData = this.tableData.filter(f => {
            return (Math.abs(f.COVER_CHANGE) >= .05)
          })
        }
      },
      CreateTotalChart(game, chartId, idIndex) {
        game = game.map(d => {
          d.new_COVER_PROB = d.OVER_PROB * 100;
          return d;
        });
        game = game.sort((a,b) => {
          return d3.descending(a.SECLEFT, b.SECLEFT);
        });
        let wp_arr = game.map(d => {
          return {x: d.SECLEFT * -1, y: (d.new_COVER_PROB - 50)};
        });
        let tooltip_wp_arr = game.map(d => {
          if (d.new_COVER_PROB >= 50) {
            return d.new_COVER_PROB;
          } else {
            return 100-d.new_COVER_PROB;
          }
        });
        let tooltip_clock = game.map(d => {
          return (d.PERIOD + 'Q ' + d.CLOCK_TEXT);
        });
        let tooltip_homeScore = game.map(d => {
          return d.SCOREDIFF;
        });
        let tooltip_awayScore = game.map(d => {
          return d.SCOREDIFF * -1;
        });
        let tooltip_play = game.map(d => {
          return "";
        });
        let chart_homeTeam = 'OVER'
        let chart_awayTeam = 'UNDER'
        let chart_winTeam = game.map(d => {
          if (d.new_COVER_PROB >= 50) {
            return chart_homeTeam;
          } else {
            return chart_awayTeam;
          }
        })
        let chart_homeColor = '#FF0000' 
        let chart_awayColor = '#6C7280' 
        let sec = game.map(d => {
          return d.SECLEFT * -1;
        });
        let currTime = '';
        // if (game[game.length-1].shortText == "End of Game" || this.filtered_ids[idIndex].status == 'post') {
        //   currTime = 'Final'
        // } else if (game[game.length-1].shortText == "End of 1st half") {
        //   currTime = 'Halftime'
        // } else {
          currTime = game[game.length-1].PERIOD + 'Q - ' + 
            game[game.length-1].CLOCK_TEXT;
        // }
        let currAwayScore = game[game.length-1].SCOREDIFF * -1;
        let currHomeScore = game[game.length-1].SCOREDIFF;
        let homeChartTitle = this.ref.filter(d => {
          return d == game[0].TEAM_NICKNAME
        })[0]
        let awayChartTitle = this.ref.filter(d => {
          return d == game[0].OPP_NICKNAME
        })[0]
        let xAxisEnd;
        if (Math.min(...game.map(d => d.SECLEFT)) >= 0) {
          xAxisEnd = 0;
        } else {
          xAxisEnd = (Math.max(...game.map(d => d.PERIOD)) - 4) * 300;
        } 
        
        var d3chartdiv = d3.select('#cjs-charts')
          .insert('div', ':first-child')
            .attr('class', 'chart')
            .attr('id', (chartId + '-cont'))
            .append('div')
            .attr('class', 'chart-title-cont')
  
        var legendtitle = d3chartdiv.append('div')
          .attr('class', 'legend-title-cont').
          append('div')
          .attr('class', 'legend-title')
  
        var homeTeamInfo = legendtitle.append('div')
          .attr('class', 'team-title')
          .attr('id', 'home-team-title')
  
        homeTeamInfo.append('div')
          .attr('class', 'legend-team')
          .text(homeChartTitle)
  
        homeTeamInfo.append('div')
          .attr('class', 'legend-score')
          .text(currHomeScore)
  
        legendtitle.append('div')
          .attr('class', 'legend-time')
          .text(currTime)
  
        var awayTeamInfo = legendtitle.append('div')
          .attr('class', 'team-title')
          .attr('id', 'away-team-title')
  
        awayTeamInfo.append('div')
          .attr('class', 'legend-team')
          .text(awayChartTitle)
  
        awayTeamInfo.append('div')
          .attr('class', 'legend-score')
          .text(currAwayScore)
        
        var teaminfo = d3chartdiv.append('div')
          .attr('class', 'legend-top-left')
          .append('div')
          .attr('id', 'team-info')
  
        teaminfo.append('div')
          .attr('class', 'btn-sm')
          .style('background-color', chart_homeColor)
        teaminfo.append('p')
          .attr('class', 'tm-abbrev')
          .text(chart_homeTeam)
  
        d3chartdiv.append('div')
          .attr('class', 'canvas-cont')
          .append('canvas')
          .attr('id', chartId)
  
        var teaminfo2 = d3chartdiv.append('div')
          .attr('class', 'legend-bottom-left')
          .append('div')
          .attr('id', 'team-info')
  
        teaminfo2.append('div')
          .attr('class', 'btn-sm')
          .style('background-color', chart_awayColor)
  
        teaminfo2.append('p')
          .attr('class', 'tm-abbrev')
          .append('text')
            .text(chart_awayTeam)
  
        const ctx = document.getElementById(chartId);
        const threshold = 0;
  
        var homeGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 120);
        homeGradient.addColorStop(0, chart_homeColor);
        homeGradient.addColorStop(1, 'white');
  
        var awayGradient = ctx.getContext('2d').createLinearGradient(0, 80, 0, 205);
        awayGradient.addColorStop(1, chart_awayColor);
        awayGradient.addColorStop(0, 'white');
  
        const totalDuration = 1500;
        const delayBetweenPoints = totalDuration / wp_arr.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : 
          ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
          x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
              }
              ctx.xStarted = true;
              return ctx.index * delayBetweenPoints;
            }
          },
          y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
              }
              ctx.yStarted = true;
              return ctx.index * delayBetweenPoints;
            }
          }
        };
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            verticalLiner: {},
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              backgroundColor: '#EFEFEF',
              callbacks: {
                title: () => null,
                label: function(context) {
                  let label = [context.dataset.customWinTeam[context.dataIndex] + ' ' + context.dataset.customWP[context.dataIndex].toFixed(1) + '%'];
                  // label.push([context.dataset.customHomeTeam + ' ' + context.dataset.customHomeScore[context.dataIndex] + ' - ' + context.dataset.customAwayTeam + ' ' + context.dataset.customAwayScore[context.dataIndex]]);
                  label.push('(' + context.dataset.customClock[context.dataIndex] + ') ' +
                    context.dataset.customPlay[context.dataIndex]);
  
                  return label;
                },
              },
              bodyColor: 'rgba(0, 0, 0)',
            },
          },
          scales: {
            y: {
              display: true,
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              min: -50, 
              max: 50,
              ticks: {
                stepSize: 50,
                callback: function(label, index, labels) {
                  switch(label) {
                    case 50:
                      return 100;
                    case 0:
                      return 50;
                    case -50:
                      return 100;
                  }
                },
              },
            },
            x: {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              type: 'linear',
              max: xAxisEnd,
              min: -2880,
              afterBuildTicks: axis => {
                function switchResult(axisEnd) { 
                  switch(axisEnd) {
                    case 300:
                      return [-1440, 0].map(v => ({ value: v }));
                    case 600:
                      return [-1440, 0, 300].map(v => ({ value: v }));
                    case 900:
                      return [-1440, 0, 300, 600].map(v => ({ value: v }));
                    case 1200:
                      return [-1440, 0, 300, 600, 900].map(v => ({ value: v }));
                    case 1500:
                      return [-1440, 0, 300, 600, 900, 1200].map(v => ({ value: v }));
                    case 1800:
                      return [-1440, 0, 300, 600, 900, 1200, 1500].map(v => ({ value: v }));
                    case 2100:
                      return [-1440, 0, 300, 600, 900, 1200, 1500, 1800].map(v => ({ value: v }));
                    default: 
                      return [-1440,].map(v => ({ value: v }));
                  }
                }
                axis.ticks = switchResult(xAxisEnd);
              },
              ticks: {
                stepSize: 300,
                callback: function(label, index, labels) {
                  switch(label) {
                    case -1200:
                      return 'Half';
                    case 0: 
                      return '            OT';
                    case 300: 
                      return '           2OT';
                    case 600: 
                      return '           3OT';
                    case 900: 
                      return '           4OT';
                    case 1200: 
                      return '           5OT';
                    case 1500: 
                      return '           6OT';
                    case 1800: 
                      return '           7OT';
                    default:
                      return '';
                  }
                },
              },
            },
          },
          elements: {
            line: {
              tension: 1, // adjust the tension to control the curvature of the line
              cubicInterpolationMode: 'monotone'
            },
          },
        };
  
        if (this.animation_bool) {
          options.animation = animation;
        }
  
        this.live_chartsArr[chartId] = {'chart': new Chart(ctx, {
          type: 'line',
          plugins: [{
            afterLayout: chart => {
              let ctx = chart.ctx;
              ctx.save();
              let yAxis = chart.scales.y;
              let yThreshold = yAxis.getPixelForValue(threshold);
              let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);
              gradient.addColorStop(0, chart_homeColor);
              let offset = (yThreshold - yAxis.top) / (yAxis.bottom - yAxis.top);
              gradient.addColorStop(offset, chart_homeColor);
              gradient.addColorStop(offset, chart_awayColor);
              gradient.addColorStop(1, chart_awayColor);
              chart.data.datasets[0].borderColor = gradient;
              ctx.restore();
            }
          }, {
            id: 'verticalLiner',
            afterInit: (chart, args, opts) => {
              chart.verticalLiner = {}
            },
            afterEvent: (chart, args, options) => {
                const {inChartArea} = args
                chart.verticalLiner = {draw: inChartArea}
            },
            beforeTooltipDraw: (chart, args, options) => {
                const {draw} = chart.verticalLiner
                if (!draw) return
  
                const {ctx} = chart
                const {top, bottom} = chart.chartArea
                const {tooltip} = args
                const x = tooltip?.caretX
                if (!x) return
  
                ctx.save()
  
                ctx.beginPath()
                ctx.moveTo(x, top)
                ctx.lineTo(x, bottom)
                ctx.stroke()
  
                ctx.restore()
            }
          }],
          data: {
            labels: sec,
            datasets: [{
              data: wp_arr,
              fill: {
                target: 'origin',
                above: homeGradient,
                below: awayGradient,
              },
              pointStyle: false,
              borderWidth: 1,
              customWP: tooltip_wp_arr,
              customClock: tooltip_clock,
              customHomeScore: tooltip_homeScore,
              customAwayScore: tooltip_awayScore,
              customPlay: tooltip_play,
              customHomeTeam: chart_homeTeam,
              customAwayTeam: chart_awayTeam,
              customWinTeam: chart_winTeam,
              spanGaps: true,
            }],
          },
          options: options,
        }), 'moved': false};
        if (this.curr_game_ids[idIndex].status == 'post') {
          this.live_chartsArr[chartId].moved = true;
        }
      },
      CreateSpreadChart(game, chartId, idIndex) {
        game = game.map(d => {
          d.new_COVER_PROB = d.COVER_PROB * 100;
          return d;
        });
        game = game.sort((a,b) => {
          return d3.descending(a.SECLEFT, b.SECLEFT);
        });
        let wp_arr = game.map(d => {
          return {x: d.SECLEFT * -1, y: (d.new_COVER_PROB - 50)};
        });
        let tooltip_wp_arr = game.map(d => {
          if (d.new_COVER_PROB >= 50) {
            return d.new_COVER_PROB;
          } else {
            return 100-d.new_COVER_PROB;
          }
        });
        let tooltip_clock = game.map(d => {
          return (d.PERIOD + 'Q ' + d.CLOCK_TEXT);
        });
        let tooltip_homeScore = game.map(d => {
          return d.SCOREDIFF;
        });
        let tooltip_awayScore = game.map(d => {
          return d.SCOREDIFF * -1;
        });
        let tooltip_play = game.map(d => {
          return "";
        });
        let chart_homeTeam = this.ref.filter(d => {
          return d == game[0].TEAM_NICKNAME;
        })[0]
        let chart_awayTeam = this.ref.filter(d => {
          return d == game[0].OPP_NICKNAME;
        })[0];
        let chart_winTeam = game.map(d => {
          if (d.new_COVER_PROB >= 50) {
            return chart_homeTeam;
          } else {
            return chart_awayTeam;
          }
        })
        let chart_homeColor = '#FF0000' 
        let chart_awayColor = '#6C7280' 
        let sec = game.map(d => {
          return d.SECLEFT * -1;
        });
        let currTime = '';
        // if (game[game.length-1].shortText == "End of Game" || this.filtered_ids[idIndex].status == 'post') {
        //   currTime = 'Final'
        // } else if (game[game.length-1].shortText == "End of 1st half") {
        //   currTime = 'Halftime'
        // } else {
          currTime = game[game.length-1].PERIOD + 'Q - ' + 
            game[game.length-1].CLOCK_TEXT;
        // }
        let currAwayScore = game[game.length-1].SCOREDIFF * -1;
        let currHomeScore = game[game.length-1].SCOREDIFF;
        let homeChartTitle = this.ref.filter(d => {
          return d == game[0].TEAM_NICKNAME
        })[0]
        let awayChartTitle = this.ref.filter(d => {
          return d == game[0].OPP_NICKNAME
        })[0]
        let xAxisEnd;
        if (Math.min(...game.map(d => d.SECLEFT)) >= 0) {
          xAxisEnd = 0;
        } else {
          xAxisEnd = (Math.max(...game.map(d => d.PERIOD)) - 4) * 300;
        } 
        
        var d3chartdiv = d3.select('#cjs-charts')
          .insert('div', ':first-child')
            .attr('class', 'chart')
            .attr('id', (chartId + '-cont'))
            .append('div')
            .attr('class', 'chart-title-cont')
  
        var legendtitle = d3chartdiv.append('div')
          .attr('class', 'legend-title-cont').
          append('div')
          .attr('class', 'legend-title')
  
        var homeTeamInfo = legendtitle.append('div')
          .attr('class', 'team-title')
          .attr('id', 'home-team-title')
  
        homeTeamInfo.append('div')
          .attr('class', 'legend-team')
          .text(homeChartTitle)
  
        homeTeamInfo.append('div')
          .attr('class', 'legend-score')
          .text(currHomeScore)
  
        legendtitle.append('div')
          .attr('class', 'legend-time')
          .text(currTime)
  
        var awayTeamInfo = legendtitle.append('div')
          .attr('class', 'team-title')
          .attr('id', 'away-team-title')
  
        awayTeamInfo.append('div')
          .attr('class', 'legend-team')
          .text(awayChartTitle)
  
        awayTeamInfo.append('div')
          .attr('class', 'legend-score')
          .text(currAwayScore)
        
        var teaminfo = d3chartdiv.append('div')
          .attr('class', 'legend-top-left')
          .append('div')
          .attr('id', 'team-info')
  
        teaminfo.append('div')
          .attr('class', 'btn-sm')
          .style('background-color', chart_homeColor)
        teaminfo.append('p')
          .attr('class', 'tm-abbrev')
          .text(chart_homeTeam)
  
        d3chartdiv.append('div')
          .attr('class', 'canvas-cont')
          .append('canvas')
          .attr('id', chartId)
  
        var teaminfo2 = d3chartdiv.append('div')
          .attr('class', 'legend-bottom-left')
          .append('div')
          .attr('id', 'team-info')
  
        teaminfo2.append('div')
          .attr('class', 'btn-sm')
          .style('background-color', chart_awayColor)
  
        teaminfo2.append('p')
          .attr('class', 'tm-abbrev')
          .append('text')
            .text(chart_awayTeam)
  
        const ctx = document.getElementById(chartId);
        const threshold = 0;
  
        var homeGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 120);
        homeGradient.addColorStop(0, chart_homeColor);
        homeGradient.addColorStop(1, 'white');
  
        var awayGradient = ctx.getContext('2d').createLinearGradient(0, 80, 0, 205);
        awayGradient.addColorStop(1, chart_awayColor);
        awayGradient.addColorStop(0, 'white');
  
        const totalDuration = 1500;
        const delayBetweenPoints = totalDuration / wp_arr.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : 
          ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
          x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
              }
              ctx.xStarted = true;
              return ctx.index * delayBetweenPoints;
            }
          },
          y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
              }
              ctx.yStarted = true;
              return ctx.index * delayBetweenPoints;
            }
          }
        };
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            verticalLiner: {},
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              backgroundColor: '#EFEFEF',
              callbacks: {
                title: () => null,
                label: function(context) {
                  let label = [context.dataset.customWinTeam[context.dataIndex] + ' ' + context.dataset.customWP[context.dataIndex].toFixed(1) + '%'];
                  label.push([context.dataset.customHomeTeam + ' ' + context.dataset.customHomeScore[context.dataIndex] + ' - ' + context.dataset.customAwayTeam + ' ' + context.dataset.customAwayScore[context.dataIndex]]);
                  label.push('(' + context.dataset.customClock[context.dataIndex] + ') ' +
                    context.dataset.customPlay[context.dataIndex]);
  
                  return label;
                },
              },
              bodyColor: 'rgba(0, 0, 0)',
            },
          },
          scales: {
            y: {
              display: true,
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              min: -50, 
              max: 50,
              ticks: {
                stepSize: 50,
                callback: function(label, index, labels) {
                  switch(label) {
                    case 50:
                      return 100;
                    case 0:
                      return 50;
                    case -50:
                      return 100;
                  }
                },
              },
            },
            x: {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              type: 'linear',
              max: xAxisEnd,
              min: -2880,
              afterBuildTicks: axis => {
                function switchResult(axisEnd) { 
                  switch(axisEnd) {
                    case 300:
                      return [-1440, 0].map(v => ({ value: v }));
                    case 600:
                      return [-1440, 0, 300].map(v => ({ value: v }));
                    case 900:
                      return [-1440, 0, 300, 600].map(v => ({ value: v }));
                    case 1200:
                      return [-1440, 0, 300, 600, 900].map(v => ({ value: v }));
                    case 1500:
                      return [-1440, 0, 300, 600, 900, 1200].map(v => ({ value: v }));
                    case 1800:
                      return [-1440, 0, 300, 600, 900, 1200, 1500].map(v => ({ value: v }));
                    case 2100:
                      return [-1440, 0, 300, 600, 900, 1200, 1500, 1800].map(v => ({ value: v }));
                    default: 
                      return [-1440,].map(v => ({ value: v }));
                  }
                }
                axis.ticks = switchResult(xAxisEnd);
              },
              ticks: {
                stepSize: 300,
                callback: function(label, index, labels) {
                  switch(label) {
                    case -1200:
                      return 'Half';
                    case 0: 
                      return '            OT';
                    case 300: 
                      return '           2OT';
                    case 600: 
                      return '           3OT';
                    case 900: 
                      return '           4OT';
                    case 1200: 
                      return '           5OT';
                    case 1500: 
                      return '           6OT';
                    case 1800: 
                      return '           7OT';
                    default:
                      return '';
                  }
                },
              },
            },
          },
          elements: {
            line: {
              tension: 1, // adjust the tension to control the curvature of the line
              cubicInterpolationMode: 'monotone'
            },
          },
        };
  
        if (this.animation_bool) {
          options.animation = animation;
        }
  
        this.live_chartsArr[chartId] = {'chart': new Chart(ctx, {
          type: 'line',
          plugins: [{
            afterLayout: chart => {
              let ctx = chart.ctx;
              ctx.save();
              let yAxis = chart.scales.y;
              let yThreshold = yAxis.getPixelForValue(threshold);
              let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);
              gradient.addColorStop(0, chart_homeColor);
              let offset = (yThreshold - yAxis.top) / (yAxis.bottom - yAxis.top);
              gradient.addColorStop(offset, chart_homeColor);
              gradient.addColorStop(offset, chart_awayColor);
              gradient.addColorStop(1, chart_awayColor);
              chart.data.datasets[0].borderColor = gradient;
              ctx.restore();
            }
          }, {
            id: 'verticalLiner',
            afterInit: (chart, args, opts) => {
              chart.verticalLiner = {}
            },
            afterEvent: (chart, args, options) => {
                const {inChartArea} = args
                chart.verticalLiner = {draw: inChartArea}
            },
            beforeTooltipDraw: (chart, args, options) => {
                const {draw} = chart.verticalLiner
                if (!draw) return
  
                const {ctx} = chart
                const {top, bottom} = chart.chartArea
                const {tooltip} = args
                const x = tooltip?.caretX
                if (!x) return
  
                ctx.save()
  
                ctx.beginPath()
                ctx.moveTo(x, top)
                ctx.lineTo(x, bottom)
                ctx.stroke()
  
                ctx.restore()
            }
          }],
          data: {
            labels: sec,
            datasets: [{
              data: wp_arr,
              fill: {
                target: 'origin',
                above: homeGradient,
                below: awayGradient,
              },
              pointStyle: false,
              borderWidth: 1,
              customWP: tooltip_wp_arr,
              customClock: tooltip_clock,
              customHomeScore: tooltip_homeScore,
              customAwayScore: tooltip_awayScore,
              customPlay: tooltip_play,
              customHomeTeam: chart_homeTeam,
              customAwayTeam: chart_awayTeam,
              customWinTeam: chart_winTeam,
              spanGaps: true,
            }],
          },
          options: options,
        }), 'moved': false};
        if (this.curr_game_ids[idIndex].status == 'post') {
          this.live_chartsArr[chartId].moved = true;
        }
      },
      // setZoomLevel() {
      //   if (window.innerWidth > 480) {
      //     document.getElementById('page-id').style.zoom = '1.0';
      //   } else if (window.innerWidth > 440) {
      //     document.getElementById('page-id').style.zoom = '0.9';
      //   } else if (window.innerWidth > 395) {
      //     document.getElementById('page-id').style.zoom = '0.8';
      //   // } else if (window.innerWidth > 345) {
      //   //   document.getElementById('page-id').style.zoom = '0.7';
      //   // } else if (window.innerWidth > 295) {
      //   //   document.getElementById('page-id').style.zoom = '0.6';
      //   } else {
      //     document.getElementById('page-id').style.zoom = '0.7';
      //   }
      // },
      changePage() {
        d3.select('#cjs-charts').selectAll('*').remove();
        if (this.chosenData == 0) {
          document.getElementById('cjs-charts').style.minHeight = "700px"
        } else {
          document.getElementById('cjs-charts').style.minHeight = "0px"
        }
        this.loadPage();
      },
      // async updatePageTemp() {
      //   let newS3Data = await this.getS3Data('mens-college-basketball.json');
      //   this.curr_game_ids = await this.getS3Data('games_mens-college-basketball.json');
      //   // let updatedData = await this.getS3Data('test_diff_womens-college-basketball.json');
      //   // d3.select('#cjs-charts').selectAll('*').remove();
      //   // console.log('here');
      //   this.animation_bool = false;
      //   // d3.select('.games-page').append('div').attr('id', '#cjs-charts')
      //   this.updateChartsTemp(newS3Data);
      //   // console.log('here')
      // },
      // async updatePage() {
      //   let newS3Data = await this.getS3Data('test_mens-college-basketball.json');
      //   this.curr_game_ids = await this.getS3Data('test_games_mens-college-basketball.json');
      //   let updatedData = await this.getS3Data('test_diff_mens-college-basketball.json');
      //   this.updateCharts(newS3Data, updatedData);
      // },
      async getS3Data(fileName, creating) {
        AWS.config.update({
            region: 'us-east-1',
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:7b073343-561b-4a8f-bf2a-765958c3aaaa',
            })
        });
  
        // console.log(AWS.config.credentials);
  
        let s3 = new AWS.S3();
        let params = {
          Bucket: "espnsportsanalytics.com",
          Key: "2023nbaCover/" + fileName,
          ResponseCacheControl: 'no-cache, max-age=0',
        };
  
        let getS3Files = async () => {
          let json_data = [];
          await new Promise(function (resolve, reject) {
            s3.getObject(params, function (err, data) {
              if (data) {
                // console.log(data);
                json_data = JSON.parse(data.Body.toString('utf-8'));
                // console.log(json_data);
                resolve();
              } else {
                reject(err);
              }
              
            });
          });
          return json_data;
        };
  
        let data = await getS3Files();
        return data;
      },
      createAllCharts(gamesData) {
        let game = []
        let game_ids = [...new Set(this.filtered_ids.map(d => d.EVENT_ID))]
        // console.log(game_ids)
  
        for (let i = 0; i < game_ids.length; i++) {
          // if (this.filtered_ids[i].status == 'pre') {
          //   game = gamesData[game_ids[i]];
          //   if (game) {
          //     this.createPreGameChart(game, "myChart" + game_ids[i]);
          //   }
          // } else {
            game = gamesData.filter(f => f.EVENT_ID == game_ids[i])
            // console.log(game)
            if (game) {
              if (this.chosenBet == 0) {
                this.CreateTotalChart(game, "myChart" + game_ids[i], i);
              } else {
                this.CreateSpreadChart(game, "myChart" + game_ids[i], i);
              }
            }
          // }
        }
        this.old_game_ids = game_ids;
        // console.log(this.old_game_ids);
      },
      // updateChartsTemp(allGamesData) {
      //   let game = [];
      //     let game_ids = this.curr_game_ids.map(d => d.game_id);
      //     for (let i = 0; i < game_ids.length; i++) {
      //       if (this.curr_game_ids[i].status == 'pre') {
      //         // game = gamesData[game_ids[i]];
      //         // this.createPreGameChart(game, "myChart" + game_ids[i]);
      //       } else {
      //         game = allGamesData[game_ids[i]];
      //         if (game) {
      //           this.updateChart(game, "myChart" + game_ids[i], i);
      //         }
      //       }
      //     }
      // },
      // updateCharts(gamesData, newPlaysData) {
      //   let game = [];
      //   let game_ids = this.curr_game_ids.map(d => d.game_id);
      //   let old_game_ids = this.old_game_ids.map(d => d.game_id);
  
      //   for (let i = 0; i < game_ids.length; i++) {
      //     if (this.curr_game_ids[i].status == 'pre') {
      //       // game = gamesData[game_ids[i]];
      //       // this.createPreGameChart(game, "myChart" + game_ids[i]);
      //     } else if (this.curr_game_ids[i].status == 'in') {
      //       game = gamesData[game_ids[i]];
      //       if (game) {
      //         this.updateChart(game, "myChart" + game_ids[i], newPlaysData[game_ids[i]]);
      //       }
      //     } else {
      //       game = gamesData[game_ids[i]];
      //       if (game) {
      //         this.createWPChart(game, "myChart" + game_ids[i], i);
      //       }
      //     }
      //   }
  
      // },
      removeChart(game_id_to_remove) {
        d3.selectAll('#myChart' + game_id_to_remove + '-cont').remove();
      },
      // updateChart(game, chartId
      // // , newPlays
      // , index) {
      //   // console.log(this.live_chartsArr);
      //   // console.log('update');
      //   let chartLength = this.live_chartsArr[chartId].chart.data.datasets[0].data.length;
        
      //   if (game.length != chartLength && this.curr_game_ids[index].status != 'post') {
      //     game = game.map(d => {
      //       d.new_homeWin = d.homeWin * 100;
      //       return d;
      //     });
      //     game = game.sort((a,b) => {
      //       return d3.descending(a.clock, b.clock);
      //     });
      //     let wp_arr = game.map(d => {
      //       return {x: d.clock * -1, y: (d.new_homeWin - 50)};
      //     });
      //     let tooltip_wp_arr = game.map(d => {
      //       if (d.new_homeWin >= 50) {
      //         return d.new_homeWin;
      //       } else {
      //         return 100-d.new_homeWin;
      //       }
      //     });
      //     let tooltip_clock = game.map(d => {
      //       return (d.period + 'H ' + d.displayClock);
      //     });
      //     let tooltip_homeScore = game.map(d => {
      //       return d.homeScore;
      //     });
      //     let tooltip_awayScore = game.map(d => {
      //       return d.awayScore;
      //     });
      //     let tooltip_play = game.map(d => {
      //       return d.shortText;
      //     });
      //     let chart_homeTeam = this.ref.filter(d => {
      //       return d.id == game[0].home_id;
      //     })[0].abbreviation;
      //     let chart_awayTeam = this.ref.filter(d => {
      //       return d.id == game[0].away_id;
      //     })[0].abbreviation;
      //     let chart_winTeam = game.map(d => {
      //       if (d.new_homeWin >= 50) {
      //         return chart_homeTeam;
      //       } else {
      //         return chart_awayTeam;
      //       }
      //     })
      //     let sec = game.map(d => {
      //       return d.clock * -1;
      //     });
      //     let currTime = '';
      //     if (game[game.length-1].shortText == "End of Game") {
      //       currTime = 'Final'
      //     } else if (game[game.length-1].shortText == "End of 1st half") {
      //       currTime = 'Halftime'
      //     } else if (game[game.length-1].period == 3) {
      //       currTime = 'OT - ' + 
      //         game[game.length-1].displayClock;
      //     } else if (game[game.length-1].period == 4) {
      //       currTime = '2OT - ' + 
      //         game[game.length-1].displayClock;
      //     } else {
      //       currTime = game[game.length-1].period + 'H - ' + 
      //         game[game.length-1].displayClock;
      //     }
      //     let currAwayScore = game[game.length-1].awayScore;
      //     let currHomeScore = game[game.length-1].homeScore;
      //     let xAxisEnd;
      //     if (Math.min(...game.map(d => d.clock)) >= 0) {
      //       xAxisEnd = 0;
      //     } else {
      //       xAxisEnd = (Math.max(...game.map(d => d.period)) - 2) * 300;
      //     } 
  
      //     var d3Chart = d3.select('#' + chartId + '-cont')
  
      //     // console.log(d3Chart);
  
      //     var legendTitle = d3Chart.select('.legend-title-cont')
      //       .select('.legend-title')
  
      //     var homeTeaminfo = legendTitle.select('#home-team-title')
  
      //     homeTeaminfo.select('.legend-score')
      //       .text(currHomeScore)
  
      //     legendTitle.select('.legend-time')
      //       .text(currTime)
  
      //     var awayTeaminfo = legendTitle.select('#away-team-title')
  
      //     awayTeaminfo.select('.legend-score')
      //       .text(currAwayScore)
  
      //     // if (game[game.length-1].new_homeWin < 50) {
      //     //   d3.select('#' + chartId + '-cont').select('.chart-title-cont')
      //     //     .style('border', '2px solid rgb(195,  30,  50)');
      //     // } else {
      //     //   d3.select('#' + chartId + '-cont').select('.chart-title-cont')
      //     //     .style('border', 0);
      //     // }
    
      //     this.live_chartsArr[chartId].chart.data.datasets[0].data = wp_arr;
      //     this.live_chartsArr[chartId].chart.data.labels = sec;
  
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customWP = tooltip_wp_arr;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customClock = tooltip_clock;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customHomeScore = tooltip_homeScore;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customAwayScore = tooltip_awayScore;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customPlay = tooltip_play;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customWinTeam = chart_winTeam;
      //     this.live_chartsArr[chartId].chart.options.scales.x.max = xAxisEnd;
  
  
      //     this.live_chartsArr[chartId].chart.update();
      //     // console.log('update')
          
  
      //     // console.log('chartData endLength: ', this.live_chartsArr[chartId].data.datasets[0].data.length);
      //   } else if (game.length != chartLength && this.curr_game_ids[index].status == 'post') {
      //     game = game.map(d => {
      //       d.new_homeWin = d.homeWin * 100;
      //       return d;
      //     });
      //     game = game.sort((a,b) => {
      //       return d3.descending(a.clock, b.clock);
      //     });
      //     let wp_arr = game.map(d => {
      //       return {x: d.clock * -1, y: (d.new_homeWin - 50)};
      //     });
      //     let tooltip_wp_arr = game.map(d => {
      //       if (d.new_homeWin >= 50) {
      //         return d.new_homeWin;
      //       } else {
      //         return 100-d.new_homeWin;
      //       }
      //     });
      //     let tooltip_clock = game.map(d => {
      //       return (d.period + 'H ' + d.displayClock);
      //     });
      //     let tooltip_homeScore = game.map(d => {
      //       return d.homeScore;
      //     });
      //     let tooltip_awayScore = game.map(d => {
      //       return d.awayScore;
      //     });
      //     let tooltip_play = game.map(d => {
      //       return d.shortText;
      //     });
      //     let chart_homeTeam = this.ref.filter(d => {
      //       return d.id == game[0].home_id;
      //     })[0].abbreviation;
      //     let chart_awayTeam = this.ref.filter(d => {
      //       return d.id == game[0].away_id;
      //     })[0].abbreviation;
      //     let chart_winTeam = game.map(d => {
      //       if (d.new_homeWin >= 50) {
      //         return chart_homeTeam;
      //       } else {
      //         return chart_awayTeam;
      //       }
      //     })
      //     let sec = game.map(d => {
      //       return d.clock * -1;
      //     });
          
      //     let currAwayScore = game[game.length-1].awayScore;
      //     let currHomeScore = game[game.length-1].homeScore;
      //     let xAxisEnd;
      //     if (Math.min(...game.map(d => d.clock)) >= 0) {
      //       xAxisEnd = 0;
      //     } else {
      //       xAxisEnd = (Math.max(...game.map(d => d.period)) - 2) * 300;
      //     } 
  
      //     var d3Chart = d3.select('#' + chartId + '-cont')
  
      //     // console.log(d3Chart);
  
      //     var legendTitle = d3Chart.select('.legend-title-cont')
      //       .select('.legend-title')
  
      //     var homeTeaminfo = legendTitle.select('#home-team-title')
  
      //     homeTeaminfo.select('.legend-score')
      //       .text(currHomeScore)
  
      //     legendTitle.select('.legend-time')
      //       .text('Final')
  
      //     var awayTeaminfo = legendTitle.select('#away-team-title')
  
      //     awayTeaminfo.select('.legend-score')
      //       .text(currAwayScore)
      //     d3Chart.select('.chart-title-cont')
      //       .style('background-color', '#f2f3f4');
            
      //     // if (game[game.length-1].new_homeWin < 50) {
      //     //   d3.select('#' + chartId + '-cont').select('.chart-title-cont')
      //     //     .style('border', '2px solid rgb(195,  30,  50)');
      //     // } else {
      //     //   d3.select('#' + chartId + '-cont').select('.chart-title-cont')
      //     //     .style('border', 0);
      //     // }
      //     this.live_chartsArr[chartId].chart.data.datasets[0].data = wp_arr;
      //     this.live_chartsArr[chartId].chart.data.labels = sec;
  
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customWP = tooltip_wp_arr;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customClock = tooltip_clock;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customHomeScore = tooltip_homeScore;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customAwayScore = tooltip_awayScore;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customPlay = tooltip_play;
      //     this.live_chartsArr[chartId].chart.data.datasets[0].customWinTeam = chart_winTeam;
      //     this.live_chartsArr[chartId].chart.options.scales.x.max = xAxisEnd;
  
  
      //     this.live_chartsArr[chartId].chart.update();
      //     // console.log('updating final')
      //     d3.select('#cjs-charts').node().appendChild(d3Chart.node())
      //     this.live_chartsArr[chartId].moved = true;
      //     // var children = d3Chart.selectAll('*');
      //     // d3.select('#cjs-charts').selectAll('*').filter(function() {
      //     //   return this.parentNode === d3Chart.node();
      //     // }).each(function() {
      //     //   d3.select('#cjs-charts').node().appendChild(this);
      //     // })
      //   } else if (this.curr_game_ids[index].status == 'post') {
      //     if (!this.live_chartsArr[chartId].moved) {
      //       var d3Chart = d3.select('#' + chartId + '-cont')
      //       var legendTitle = d3Chart.select('.legend-title-cont')
      //         .select('.legend-title')
      //       legendTitle.select('.legend-time')
      //         .text('Final')
      //       d3Chart.select('.chart-title-cont')
      //         .style('background-color', '#f2f3f4');
      //       d3.select('#cjs-charts').node().appendChild(d3Chart.node())
      //     }
      //   }
      // },
      // createPreGameChart(game, chartId) {
      //   game = game.map(d => {
      //     d.new_homeWin = d.homeWin * 100;
      //     return d;
      //   });
      //   game = game.sort((a,b) => {
      //     return d3.descending(a.clock, b.clock);
      //   });
      //   // console.log(game);
  
      //   let wp_arr = game.map(d => {
      //     return {x: d.clock * -1, y: (d.new_homeWin - 50)};
      //   });
      //   // if (wp_arr.filter(d => {
      //   //   return d.x == 0;
      //   // }).length == 0) {
      //   //   wp_arr.push({x: 0, y: null});
      //   // }
      //   // console.log(wp_arr.filter(d => {
      //   //   return d.x == 0;
      //   // }).length);
      //   let tooltip_wp_arr = game.map(d => {
      //     if (d.new_homeWin >= 50) {
      //       return d.new_homeWin;
      //     } else {
      //       return 100-d.new_homeWin;
      //     }
      //   });
      //   let tooltip_clock = game.map(d => {
      //     return (d.period + 'H ' + d.displayClock);
      //   });
      //   let tooltip_homeScore = game.map(d => {
      //     return d.homeScore;
      //   });
      //   let tooltip_awayScore = game.map(d => {
      //     return d.awayScore;
      //   });
      //   let tooltip_play = game.map(d => {
      //     return d.shortText;
      //   });
      //   // console.log(game[0].home_id);
      //   // console.log(this.ref.map(d => d.displayName));
      //   let chart_homeTeam = this.ref.filter(d => {
      //     return d.id == game[0].home_id;
      //   })[0].abbreviation;
      //   // console.log(chart_homeTeam);
      //   // console.log(game[0].away_id);
      //   let chart_awayTeam = this.ref.filter(d => {
      //     return d.id == game[0].away_id;
      //   })[0].abbreviation;
      //   let chart_winTeam = game.map(d => {
      //     if (d.new_homeWin >= 50) {
      //       return chart_homeTeam;
      //     } else {
      //       return chart_awayTeam;
      //     }
      //   })
      //   // console.log(chart_awayTeam);
      //   let chart_homeColor = '#' + this.ref.filter(d => {
      //     return d.id == game[0].home_id;
      //   })[0].displayColor;
      //   // console.log(chart_homeColor);
      //   let chart_awayColor = '#' + this.ref.filter(d => {
      //     return d.id == game[0].away_id;
      //   })[0].displayColor;
      //   // console.log(chart_awayColor);
      //   let sec = game.map(d => {
      //     return d.clock * -1;
      //   });
      //   let currTime = '4/3 - ' + this.curr_game_ids.filter(d => {
      //     return d.game_id == chartId.substring(7, chartId.length);
      //   })[0].game_time;
      //   let currAwayScore = Math.round(100 - Math.round(game[0].new_homeWin)) + '%';
      //   let currHomeScore = Math.round(game[0].new_homeWin) + '%';
      //   let homeSeed = this.ref.filter(d => {
      //     return d.id == game[0].home_id;
      //   })[0].seed;
      //   let awaySeed = this.ref.filter(d => {
      //     return d.id == game[0].away_id;
      //   })[0].seed;
      //   let homeChartTitle = this.ref.filter(d => {
      //     return d.id == game[game.length-1].home_id;
      //   })[0].shortDisplayName;
      //   let awayChartTitle = this.ref.filter(d => {
      //     return d.id == game[game.length-1].away_id;
      //   })[0].shortDisplayName;
      //   let xAxisEnd;
      //   if (Math.min(...game.map(d => d.clock)) >= 0) {
      //     xAxisEnd = 0;
      //   } else {
      //     xAxisEnd = (Math.max(...game.map(d => d.period)) - 2) * 300;
      //   } 
  
      //   var d3chartdiv = d3.select('#cjs-charts')
      //     .insert('div', ':first-child')
      //       .attr('class', 'chart')
      //       .attr('id', (chartId + '-cont'))
      //       .append('div')
      //       .attr('class', 'chart-title-cont')
  
      //   var legendtitle = d3chartdiv.append('div')
      //     .attr('class', 'legend-title-cont').
      //     append('div')
      //     .attr('class', 'legend-title')
  
      //   var homeTeamInfo = legendtitle.append('div')
      //     .attr('class', 'team-title')
      //     .attr('id', 'home-team-title')
  
      //   homeTeamInfo.append('div')
      //     .attr('class', 'legend-seed')
      //     .text(homeSeed)
  
      //   homeTeamInfo.append('div')
      //     .attr('class', 'legend-team')
      //     .text(homeChartTitle)
  
      //   homeTeamInfo.append('div')
      //     .attr('class', 'legend-score')
      //     .text(currHomeScore)
  
      //   legendtitle.append('div')
      //     .attr('class', 'legend-time')
      //     .text(currTime)
  
      //   var awayTeamInfo = legendtitle.append('div')
      //     .attr('class', 'team-title')
      //     .attr('id', 'away-team-title')
  
      //   awayTeamInfo.append('div')
      //     .attr('class', 'legend-seed')
      //     .text(awaySeed)
  
      //   awayTeamInfo.append('div')
      //     .attr('class', 'legend-team')
      //     .text(awayChartTitle)
  
      //   awayTeamInfo.append('div')
      //     .attr('class', 'legend-score')
      //     .text(currAwayScore)
        
      //   var teaminfo = d3chartdiv.append('div')
      //     .attr('class', 'legend-top-left')
      //     .append('div')
      //     .attr('id', 'team-info')
  
      //   teaminfo.append('div')
      //     .attr('class', 'btn-sm')
      //     .style('background-color', chart_homeColor)
      //   teaminfo.append('p')
      //     .attr('class', 'tm-abbrev')
      //     .text(chart_homeTeam)
  
      //   d3chartdiv.append('div')
      //     .attr('class', 'canvas-cont')
      //     .append('canvas')
      //     .attr('id', chartId)
  
      //   var teaminfo2 = d3chartdiv.append('div')
      //     .attr('class', 'legend-bottom-left')
      //     .append('div')
      //     .attr('id', 'team-info')
  
      //   teaminfo2.append('div')
      //     .attr('class', 'btn-sm')
      //     .style('background-color', chart_awayColor)
  
      //   teaminfo2.append('p')
      //     .attr('class', 'tm-abbrev')
      //     .append('text')
      //       .text(chart_awayTeam)
  
      //   const ctx = document.getElementById(chartId);
      //   const threshold = 0;
        
      //   var homeGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 120);
      //   homeGradient.addColorStop(0, chart_homeColor);
      //   homeGradient.addColorStop(1, 'white');
  
      //   var awayGradient = ctx.getContext('2d').createLinearGradient(0, 80, 0, 205);
      //   awayGradient.addColorStop(1, chart_awayColor);
      //   awayGradient.addColorStop(0, 'white');
  
      //   // const totalDuration = 1500;
      //   // const delayBetweenPoints = totalDuration / wp_arr.length;
      //   // const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      //   // const animation = {
      //   //   x: {
      //   //     type: 'number',
      //   //     easing: 'linear',
      //   //     duration: delayBetweenPoints,
      //   //     from: NaN, // the point is initially skipped
      //   //     delay(ctx) {
      //   //       if (ctx.type !== 'data' || ctx.xStarted) {
      //   //         return 0;
      //   //       }
      //   //       ctx.xStarted = true;
      //   //       return ctx.index * delayBetweenPoints;
      //   //     }
      //   //   },
      //   //   y: {
      //   //     type: 'number',
      //   //     easing: 'linear',
      //   //     duration: delayBetweenPoints,
      //   //     from: previousY,
      //   //     delay(ctx) {
      //   //       if (ctx.type !== 'data' || ctx.yStarted) {
      //   //         return 0;
      //   //       }
      //   //       ctx.yStarted = true;
      //   //       return ctx.index * delayBetweenPoints;
      //   //     }
      //   //   }
      //   // };
  
      //   this.live_chartsArr[chartId] = {'chart': new Chart(ctx, {
      //     type: 'line',
      //     plugins: [{
      //       afterLayout: chart => {
      //         let ctx = chart.ctx;
      //         ctx.save();
      //         let yAxis = chart.scales.y;
      //         let yThreshold = yAxis.getPixelForValue(threshold);
      //         let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);
      //         gradient.addColorStop(0, chart_homeColor);
      //         let offset = (yThreshold - yAxis.top) / (yAxis.bottom - yAxis.top);
      //         gradient.addColorStop(offset, chart_homeColor);
      //         gradient.addColorStop(offset, chart_awayColor);
      //         gradient.addColorStop(1, chart_awayColor);
      //         chart.data.datasets[0].borderColor = gradient;
      //         ctx.restore();
      //       }
      //     }, {
      //       id: 'verticalLiner',
      //       afterInit: (chart, args, opts) => {
      //         chart.verticalLiner = {}
      //       },
      //       afterEvent: (chart, args, options) => {
      //           const {inChartArea} = args
      //           chart.verticalLiner = {draw: inChartArea}
      //       },
      //       beforeTooltipDraw: (chart, args, options) => {
      //           const {draw} = chart.verticalLiner
      //           if (!draw) return
  
      //           const {ctx} = chart
      //           const {top, bottom} = chart.chartArea
      //           const {tooltip} = args
      //           const x = tooltip?.caretX
      //           if (!x) return
  
      //           ctx.save()
  
      //           ctx.beginPath()
      //           ctx.moveTo(x, top)
      //           ctx.lineTo(x, bottom)
      //           ctx.stroke()
  
      //           ctx.restore()
      //       }
      //     }],
      //     data: {
      //       labels: sec,
      //       datasets: [{
      //         data: wp_arr,
      //         fill: {
      //           target: 'origin',
      //           above: homeGradient,
      //           below: awayGradient,
      //         },
      //         // pointRadius: 9,
      //         pointStyle: false,
      //         borderWidth: 1,
      //         customWP: tooltip_wp_arr,
      //         customClock: tooltip_clock,
      //         customHomeScore: tooltip_homeScore,
      //         customAwayScore: tooltip_awayScore,
      //         customPlay: tooltip_play,
      //         customHomeTeam: chart_homeTeam,
      //         customAwayTeam: chart_awayTeam,
      //         customWinTeam: chart_winTeam,
      //         spanGaps: true,
      //       }],
      //     },
      //     options: {
      //       // animation,
      //       responsive: true,
      //       maintainAspectRatio: false,
      //       interaction: {
      //         mode: 'index',
      //         intersect: false,
      //       },
      //       plugins: {
      //         verticalLiner: {},
      //         legend: {
      //           display: false,
      //         },
      //         tooltip: {
      //           displayColors: false,
      //           backgroundColor: '#EFEFEF',
      //           callbacks: {
      //             title: () => null,
      //             label: function(context) {
      //               // console.log(context.dataIndex);
      //               // console.log(context);
      //               let label = [context.dataset.customWinTeam[context.dataIndex] + ' ' + context.dataset.customWP[context.dataIndex].toFixed(1) + '%'];
      //               label.push([context.dataset.customHomeTeam + ' ' + context.dataset.customHomeScore[context.dataIndex] + ' - ' + context.dataset.customAwayTeam + ' ' + context.dataset.customAwayScore[context.dataIndex]]);
      //               label.push('(' + context.dataset.customClock[context.dataIndex] + ') ' +
      //                 context.dataset.customPlay[context.dataIndex]);
  
      //               return label;
      //             },
      //           },
      //           bodyColor: 'rgba(0, 0, 0)',
      //         },
      //       },
      //       scales: {
      //         y: {
      //           display: true,
      //           position: 'right',
      //           scaleLabel: {
      //             display: true,
      //             labelString: 'Value',
      //           },
      //           min: -50, 
      //           max: 50,
      //           ticks: {
      //             stepSize: 50,
      //             callback: function(label, index, labels) {
      //               switch(label) {
      //                 case 50:
      //                   return 100;
      //                 case 0:
      //                   return 50;
      //                 case -50:
      //                   return 100;
      //               }
      //             },
      //           },
      //         },
      //         x: {
      //           display: false,
      //           type: 'linear',
      //           max: xAxisEnd,
      //           min: -2400,
      //         },
      //       },
      //       elements: {
      //         line: {
      //           tension: 1, // adjust the tension to control the curvature of the line
      //           cubicInterpolationMode: 'monotone'
      //         },
      //       },
      //     },
      //   }), 'moved': false};
      // },
      // makeTestChart() {
      //   let game = this.data[401522118];
      //   game = game.map(d => {
      //     d.new_homeWin = d.homeWin * 100;
      //     return d;
      //   });
      //   game = game.sort((a,b) => {
      //     return d3.descending(a.clock, b.clock);
      //   });
      //   // console.log(game);
  
      //   let wp_arr = game.map(d => {
      //     return {x: d.clock * -1, y: (d.new_homeWin - 50)};
      //   });
      //   // if (wp_arr.filter(d => {
      //   //   return d.x == 0;
      //   // }).length == 0) {
      //   //   wp_arr.push({x: 0, y: null});
      //   // }
      //   // console.log(wp_arr.filter(d => {
      //   //   return d.x == 0;
      //   // }).length);
      //   let tooltip_wp_arr = game.map(d => {
      //     return d.new_homeWin;
      //   });
      //   let tooltip_clock = game.map(d => {
      //     return (d.period + 'H ' + d.displayClock);
      //   });
      //   let tooltip_homeScore = game.map(d => {
      //     return d.homeScore;
      //   });
      //   let tooltip_awayScore = game.map(d => {
      //     return d.awayScore;
      //   });
      //   let tooltip_play = game.map(d => {
      //     return d.shortText;
      //   });
      //   // console.log(game[0].home_id);
      //   // console.log(this.ref.map(d => d.displayName));
      //   let chart_homeTeam = this.ref.filter(d => {
      //     return d.id == game[0].home_id;
      //   })[0].abbreviation;
      //   // console.log(chart_homeTeam);
      //   // console.log(game[0].away_id);
      //   let chart_awayTeam = this.ref.filter(d => {
      //     return d.id == game[0].away_id;
      //   })[0].abbreviation;
      //   // console.log(chart_awayTeam);
      //   let chart_homeColor = '#' + this.ref.filter(d => {
      //     return d.id == game[0].home_id;
      //   })[0].color;
      //   if (chart_homeColor == '#ffffff') {
      //     chart_homeColor = '#000000';
      //   }
      //   // console.log(chart_homeColor);
      //   let chart_awayColor = '#' + this.ref.filter(d => {
      //     return d.id == game[0].away_id;
      //   })[0].color;
      //   if (chart_awayColor == '#ffffff') {
      //     chart_awayColor = '#000000';
      //   }
      //   // console.log(chart_awayColor);
      //   let sec = game.map(d => {
      //     return d.clock * -1;
      //   });
  
      //   const ctx = document.getElementById('myChart2');
      //   const threshold = 0;
  
      //   var homeGradient = ctx.getContext('2d').createLinearGradient(0, -20, 0, 130);
      //   homeGradient.addColorStop(0, chart_homeColor);
      //   homeGradient.addColorStop(1, 'white');
  
      //   var awayGradient = ctx.getContext('2d').createLinearGradient(0, 90, 0, 240);
      //   awayGradient.addColorStop(1, chart_awayColor);
      //   awayGradient.addColorStop(0, 'white');
  
      //   const totalDuration = 2000;
      //   const delayBetweenPoints = totalDuration / wp_arr.length;
      //   const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      //   const animation = {
      //     x: {
      //       type: 'number',
      //       easing: 'linear',
      //       duration: delayBetweenPoints,
      //       from: NaN, // the point is initially skipped
      //       delay(ctx) {
      //         if (ctx.type !== 'data' || ctx.xStarted) {
      //           return 0;
      //         }
      //         ctx.xStarted = true;
      //         return ctx.index * delayBetweenPoints;
      //       }
      //     },
      //     y: {
      //       type: 'number',
      //       easing: 'linear',
      //       duration: delayBetweenPoints,
      //       from: previousY,
      //       delay(ctx) {
      //         if (ctx.type !== 'data' || ctx.yStarted) {
      //           return 0;
      //         }
      //         ctx.yStarted = true;
      //         return ctx.index * delayBetweenPoints;
      //       }
      //     }
      //   };
  
      //   new Chart(ctx, {
      //     type: 'line',
      //     plugins: [{
      //       afterLayout: chart => {
      //         let ctx = chart.ctx;
      //         ctx.save();
      //         let yAxis = chart.scales.y;
      //         let yThreshold = yAxis.getPixelForValue(threshold);
      //         let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);
      //         gradient.addColorStop(0, chart_homeColor);
      //         let offset = (yThreshold - yAxis.top) / (yAxis.bottom - yAxis.top);
      //         gradient.addColorStop(offset, chart_homeColor);
      //         gradient.addColorStop(offset, chart_awayColor);
      //         gradient.addColorStop(1, chart_awayColor);
      //         chart.data.datasets[0].borderColor = gradient;
      //         ctx.restore();
      //       }
      //     }, {
      //       id: 'verticalLiner',
      //       afterInit: (chart, args, opts) => {
      //         chart.verticalLiner = {}
      //       },
      //       afterEvent: (chart, args, options) => {
      //           const {inChartArea} = args
      //           chart.verticalLiner = {draw: inChartArea}
      //       },
      //       beforeTooltipDraw: (chart, args, options) => {
      //           const {draw} = chart.verticalLiner
      //           if (!draw) return
  
      //           const {ctx} = chart
      //           const {top, bottom} = chart.chartArea
      //           const {tooltip} = args
      //           const x = tooltip?.caretX
      //           if (!x) return
  
      //           ctx.save()
  
      //           ctx.beginPath()
      //           ctx.moveTo(x, top)
      //           ctx.lineTo(x, bottom)
      //           ctx.stroke()
  
      //           ctx.restore()
      //       }
      //     }],
      //     data: {
      //       labels: sec,
      //       datasets: [{
      //         data: wp_arr,
      //         fill: {
      //           target: 'origin',
      //           above: homeGradient,
      //           below: awayGradient,
      //         },
      //         pointStyle: false,
      //         borderWidth: 1,
      //         customWP: tooltip_wp_arr,
      //         customClock: tooltip_clock,
      //         customHomeScore: tooltip_homeScore,
      //         customAwayScore: tooltip_awayScore,
      //         customPlay: tooltip_play,
      //         customHomeTeam: chart_homeTeam,
      //         customAwayTeam: chart_awayTeam,
      //         spanGaps: true,
      //       }],
      //     },
      //     options: {
      //       animation,
      //       responsive: true,
      //       maintainAspectRatio: false,
      //       interaction: {
      //         mode: 'index',
      //         intersect: false,
      //       },
      //       plugins: {
      //         verticalLiner: {},
      //         legend: {
      //           display: false,
      //         },
      //         tooltip: {
      //           displayColors: false,
      //           backgroundColor: '#EFEFEF',
      //           callbacks: {
      //             title: () => null,
      //             label: function(context) {
      //               // console.log(context.dataIndex);
      //               // console.log(context);
      //               let label = [context.dataset.customHomeTeam + ' ' + context.dataset.customWP[context.dataIndex].toFixed(1) + '%'];
      //               label.push([context.dataset.customHomeTeam + ' ' + context.dataset.customHomeScore[context.dataIndex] + ' - ' + context.dataset.customAwayTeam + ' ' + context.dataset.customAwayScore[context.dataIndex]]);
      //               label.push('(' + context.dataset.customClock[context.dataIndex] + ') ' +
      //                 context.dataset.customPlay[context.dataIndex]);
  
      //               return label;
      //             },
      //           },
      //           bodyColor: 'rgba(0, 0, 0)',
      //         },
      //       },
      //       scales: {
      //         y: {
      //           display: true,
      //           position: 'right',
      //           scaleLabel: {
      //             display: true,
      //             labelString: 'Value',
      //           },
      //           min: -50, 
      //           max: 50,
      //           ticks: {
      //             stepSize: 50,
      //             callback: function(label, index, labels) {
      //               switch(label) {
      //                 case 50:
      //                   return 100;
      //                 case 0:
      //                   return 50;
      //                 case -50:
      //                   return 100;
      //               }
      //             },
      //           },
      //         },
      //         x: {
      //           display: false,
      //           type: 'linear',
      //           suggestedMax: 0, 
      //           min: -2400,
      //         },
      //       },
      //       elements: {
      //         line: {
      //           tension: 1, // adjust the tension to control the curvature of the line
      //           cubicInterpolationMode: 'monotone'
      //         },
      //       },
      //     },
      //   });
      // },
  
    },
    computed: {
      gamesRef() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'W') {
          return '/wcbb-games';
        } else {
          return '/mcbb-games';
        }
  
      },
      titleRef() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'W') {
          return '/wcbb-title';
        } else {
          return '/mcbb-title';
        }
  
      },
      allRef() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'W') {
          return '/wcbb-all';
        } else {
          return '/mcbb-all';
        }
  
      },
      buttonLink() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'W') {
          return '/mcbb-games';
        } else {
          return '/wcbb-games';
        }
      },
      menuClass1() {
        return 'btn btn-secondary btn-lg these-buttons selected-btn';
      },
      menuClass2() {
        return 'btn btn-secondary btn-lg these-buttons';
      },
      menuClass3() {
        return 'btn btn-secondary btn-lg these-buttons';
      },
      setEspnLink() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'W') {
          return 'https://www.espn.com/womens-college-basketball/scoreboard'
        } else {
          return 'https://www.espn.com/mens-college-basketball/bpi/predictions'
        }
      },
    },
    // beforeUnmount() {
    //   clearInterval(this.timer);
    // }
  
  }
  
  </script>
  
  
  <style>
  * {
    padding: 0px;
    margin: 0px;
  }
  .games-page {
    padding: 5px;
  }
  .btn-sm {
    width: 20px;
    height: 11px;
  }
  .charts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    min-height: 700px;
  }
  .chart {
    margin: 10px;
    padding: 1.5px 15px 1.5px 15px;
    height: 350px;
    width: 450px;
  }
  .chart-title-cont {
    width: 430px;
    padding: 5px 0px 10px 10px;
  }
  .legend-title-cont {
    display: flex; 
    justify-content: center;
  }
  .legend-title {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin-bottom: 5px;
  }
  .team-title {
    display: flex; 
    width: 250px; 
    gap: 5px; 
    align-items: center; 
    justify-content: center;
  }
  .legend-seed {
    width: 15px; 
    font-size: 12px;
  }
  .legend-team {
    font-size: 20px; 
    width: 160px; 
    text-align: left;
  }
  .legend-score {
    font-size: 18px; 
    font-weight: bold;
    width: 50px;
    text-align: left;
  }
  .legend-time {
    font-size: 15px; 
    padding: 5px 62.5px 5px 27.5px;
    width: 160px;
  }
  .canvas-cont {
    padding-right: 20px;
    height: 225px;
    width: 425px;
  }
  .legend-top-left {
    margin-bottom: -3.5px;
  }
  #team-info {
    display: flex;
    height: 10px;
    margin-top: -3.5px;
  }
  .tm-abbrev {
    padding-left: 2px;
    line-height: 9px;
    font-size: 15px;
  }
  .form-round {
    padding-bottom: 10px;
  }
  /* .upset {
    border: 2px solid rgb(195,  30,  50);
  } */
  
  @media only screen and (max-width: 489px) {
    .charts {
      width: 95%;
      margin: auto;
    }
    .chart {
      width: 100%;
      padding: 0;
      margin: 0;
    }
    .canvas-cont {
      width: 99%;
      padding: 0px;
    }
    .legend-seed {
      font-size: 12px;
    }
    .legend-team {
      font-size: 17px;
      width: 135px;
    }
    .legend-score {
      font-size: 15px;
    }
    .legend-time {
      font-size: 12px;
    }
    .tm-abbrev {
      font-size: 12px;
    }
    .chart-title-cont {
      width: 100%;
      padding: 0px 0px 5px 5px;
    }
  }
  </style>
  
  