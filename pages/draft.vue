<template>
    <Head>
        <Title>Draft Pick Projections - ESPN Analytics</Title>
        <Meta property="og:title" content="Draft Pick Projections - ESPN Analytics"/>
        <Meta property="og:site_name" content="Draft Pick Projections - ESPN Analytics" />
        <Meta property="og:url" content="https://www.espnanalytics.com/draft" />
        <Meta name="twitter:url" content="https://www.espnanalytics.com/draft" />
        <Meta name="twitter:title" content="Draft Pick Projections - ESPN Analytics"/>
        <Meta name="title" content="Draft Pick Projections - ESPN Analytics"/>
    </Head>
    <div class="relative min-h-screen bg-espngray-100">
        <Header></Header>

      <div class="page-cont pt-28">
        <table class="odds-table" :key="keyIn">
            <tr class="labels">
              <th class="th-odds first-col">Team</th>
              <th class="th-odds">2<sup>nd</sup> Pick</th>
              <th class="th-odds">3<sup>rd</sup> Pick</th>
              <th class="th-odds">4<sup>th</sup> Pick</th>
              <th class="th-odds">5<sup>th</sup> Pick</th>
              <th class="th-odds last-col">Avg Proj</th>
            </tr>
            <tr class="table-row" id="my-table-row" v-for="(odds,index) in current">
              <th class="td-odds first-col">{{ odds.NICK }}</th>
              <td class="td-odds cell-odds font-semibold" style="color: black" :style="{backgroundColor: `rgba(${170},${0},${170},${odds.pick2})`}">{{ odds.pick2_text }}</td>
              <td class="td-odds cell-odds font-semibold" style="color: black" :style="{backgroundColor: `rgba(${170},${0},${170},${odds.pick3})`}">{{ odds.pick3_text }}</td>
              <td class="td-odds cell-odds font-semibold" style="color: black" :style="{backgroundColor: `rgba(${170},${0},${170},${odds.pick4})`}">{{ odds.pick4_text }}</td>
              <td class="td-odds cell-odds font-semibold" style="color: black" :style="{backgroundColor: `rgba(${170},${0},${170},${odds.pick5})`}">{{ odds.pick5_text }}</td>
              <td class="td-odds last-col cell-odds">{{ odds.proj }}</td>
            </tr>
          </table>
        <div class="flex justify-center">
          <select class="rounded-sm bg-gray-50 border border-espngray-300 text-espngray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-8" v-model="dataDate" @change="updatePage()">
              <option value="2024-01-06">Sat, Jan 6</option>
              <option value="2024-01-07">Sun, Jan 7</option>
          </select>
        </div>
        <div class="charts" id="cjs-charts">
            <div class="chart-cont">
                <canvas id="chart1">

                </canvas>
            </div>
            <div class="chart-cont">
                <canvas id="chart2">

                </canvas>
            </div>
            <div class="chart-cont">
                <canvas id="chart3">

                </canvas>
            </div>
            <div class="chart-cont">
                <canvas id="chart4">

                </canvas>
            </div>
            <!-- <div class="chart-cont">
                <canvas id="chart5">

                </canvas>
            </div>
            <div class="chart-cont">
                <canvas id="chart6">

                </canvas>
            </div> -->
            <div class="chart-cont">
                <canvas id="chart5">

                </canvas>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
// import * as d3 from 'd3'
import 'chartjs-adapter-date-fns'

export default {
    name: 'PlayoffProj',
    data() {
        this.charts = []
        return {
            pick2: [],
            pick3: [],
            pick4: [],
            pick5: [],
            overall: [],
            current: [],
            timer: null,
            keyIn: 0,
            projections: [],
            dataDate: '2024-01-07',
        }
    },
    mounted() {
        document.title = 'Draft Pick Projections';
        this.loadPage();
        // window.addEventListener('resize', this.handleResize);
        
        // this.timer = setInterval(() => {
        //     this.updatePage()
        //     // console.log('updated')
        // }, 45000)
        // setTimeout(() => {
        //   this.fillColor();
        // }, 1000);
    },
    methods: {
    // handleResize() {
    //     this.charts = [];
    //     // d3.selectAll('#line_viz').remove();
    //     this.loadPage();
    //   },
        // fillColor() {
//             var getColor = d3.scaleSequential()
//                 .interpolator(d3.interpolate("white", "purple"))
//                 .domain([0, 1])
//             let myData5 = this.current.map(d => d.pick2);
//             console.log(myData5);
//             console.log(d3.selectAll('#my-table-row').selectAll('.cell-odds5'));
//             d3.selectAll('#my-table-row').selectAll('td')
//                 .data(this.current)
//                 // .selectAll('.cell-odds5')
//                 .style('background-color', function(d, i) {
//                     // console.log(d.pick2);
//                     if (this._prevClass == 'td-odds cell-odds5') {
//                         return getColor(d.pick2);
//                     } else if (this._prevClass == 'td-odds cell-odds6') {
//                         return getColor(d.pick3)
//                     } else if (this._prevClass == 'td-odds cell-odds7') {
//                         return getColor(d.pick4)
//                     } else if (this._prevClass == 'td-odds cell-odds8') {

// console.log(i, getColor(d.pick2));
//                         return getColor(d.pick5)
//                     } else {
//                         return getColor(d.seed9)
//                     }
//                 });
//         },
        async updatePage() {
            if (this.dataDate == '2024-01-07') {
                this.overall = await this.getS3Data('draft_timeseries.json');
            } else {
                this.overall = await this.getS3Data('draft_timeseries_20240106.json');
            }
            this.projections = this.overall.map(({NICK, ts, proj}) => ({NICK, ts, proj}));
            this.pick2 = this.overall.map(({NICK, ts, pick2}) => ({NICK, ts, pick2}));
            this.pick3 = this.overall.map(({NICK, ts, pick3}) => ({NICK, ts, pick3}));
            this.pick4 = this.overall.map(({NICK, ts, pick4}) => ({NICK, ts, pick4}));
            this.pick5 = this.overall.map(({NICK, ts, pick5}) => ({NICK, ts, pick5}));
            this.current = this.overall.slice(-7).map(d => {
                if (d.pick2 == 0) {
                    d.pick2_text = '--';
                } else if (d.pick2 < 0.01) {
                    d.pick2_text = '<1%';
                } else if (d.pick2 == 1) {
                    console.log(d.pick2);
                    d.pick2_text = '100%';
                }  else if (d.pick2 > 0.99) {
                    d.pick2_text = '>99%'
                } else {
                    d.pick2_text = Math.round(d.pick2 * 100) + '%';
                }
                if (d.pick3 == 0) {
                    d.pick3_text = '--';
                } else if (d.pick3 < 0.01) {
                    d.pick3_text = '<1%';
                } else if (d.pick3 == 1) {
                    d.pick3_text = '100%';
                }  else if (d.pick3 > 0.99) {
                    d.pick3_text = '>99%';
                } else {
                    d.pick3_text = Math.round(d.pick3 * 100) + '%';
                }
                if (d.pick4 == 0) {
                    d.pick4_text = '--';
                } else if (d.pick4 < 0.01) {
                    d.pick4_text = '<1%';
                } else if (d.pick4 == 1) {
                    d.pick4_text = '100%';
                }  else if (d.pick4 > 0.99) {
                    d.pick4_text = '>99%';
                } else {
                    d.pick4_text = Math.round(d.pick4 * 100) + '%';
                }
                if (d.pick5 == 0) {
                    d.pick5_text = '--';
                } else if (d.pick5 < 0.01) {
                    d.pick5_text = '<1%';
                } else if (d.pick5 == 1) {
                    d.pick5_text = '100%';
                }  else if (d.pick5 > 0.99) {
                    d.pick5_text = '>99%';
                } else {
                    d.pick5_text = Math.round(d.pick5 * 100) + '%';
                }
                return d;
            })
            this.charts[0].data.datasets[0].data = this.pick2.filter(f => f.NICK == 'Commanders').map(obj => obj.pick2 * 100);
            this.charts[0].data.datasets[1].data = this.pick2.filter(f => f.NICK == 'Patriots').map(obj => obj.pick2 * 100);
            this.charts[0].data.datasets[2].data = this.pick2.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick2 * 100);
            this.charts[0].data.datasets[3].data = this.pick2.filter(f => f.NICK == 'Giants').map(obj => obj.pick2 * 100);
            this.charts[0].data.labels = this.pick2.filter(f => f.NICK == 'Commanders').map(obj => obj.ts);
            this.charts[0].update();
            this.charts[1].data.datasets[0].data = this.pick3.filter(f => f.NICK == 'Patriots').map(obj => obj.pick3 * 100);
            this.charts[1].data.datasets[1].data = this.pick3.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick3 * 100);
            this.charts[1].data.datasets[2].data = this.pick3.filter(f => f.NICK == 'Commanders').map(obj => obj.pick3 * 100);
            this.charts[1].data.datasets[3].data = this.pick3.filter(f => f.NICK == 'Giants').map(obj => obj.pick3 * 100);
            this.charts[1].data.labels = this.pick3.filter(f => f.NICK == 'Commanders').map(obj => obj.ts);
            this.charts[1].update();
            this.charts[2].data.datasets[0].data = this.pick4.filter(f => f.NICK == 'Giants').map(obj => obj.pick4 * 100);
            this.charts[2].data.datasets[1].data = this.pick4.filter(f => f.NICK == 'Patriots').map(obj => obj.pick4 * 100);
            this.charts[2].data.datasets[2].data = this.pick4.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick4 * 100);
            this.charts[2].data.datasets[3].data = this.pick4.filter(f => f.NICK == 'Commanders').map(obj => obj.pick4 * 100);
            this.charts[2].data.datasets[4].data = this.pick4.filter(f => f.NICK == 'Titans').map(obj => obj.pick4 * 100);
            this.charts[2].data.datasets[5].data = this.pick4.filter(f => f.NICK == 'Chargers').map(obj => obj.pick4 * 100);
            this.charts[2].data.labels = this.pick4.filter(f => f.NICK == 'Commanders').map(obj => obj.ts);
            this.charts[2].update();
            this.charts[3].data.datasets[0].data = this.pick5.filter(f => f.NICK == 'Giants').map(obj => obj.pick5 * 100);
            this.charts[3].data.datasets[1].data = this.pick5.filter(f => f.NICK == 'Titans').map(obj => obj.pick5 * 100);
            this.charts[3].data.datasets[2].data = this.pick5.filter(f => f.NICK == 'Chargers').map(obj => obj.pick5 * 100);
            this.charts[3].data.datasets[3].data = this.pick5.filter(f => f.NICK == 'Patriots').map(obj => obj.pick5 * 100);
            this.charts[3].data.datasets[4].data = this.pick5.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick5 * 100);
            this.charts[3].data.datasets[5].data = this.pick5.filter(f => f.NICK == 'Commanders').map(obj => obj.pick5 * 100);
            this.charts[3].data.datasets[6].data = this.pick5.filter(f => f.NICK == 'Jets').map(obj => obj.pick5 * 100);
            this.charts[3].data.labels = this.pick5.filter(f => f.NICK == 'Commanders').map(obj => obj.ts);
            this.charts[3].update();
            this.charts[4].data.datasets[0].data = this.projections.filter(f => f.NICK == 'Commanders').map(obj => obj.proj);
            this.charts[4].data.datasets[1].data = this.projections.filter(f => f.NICK == 'Patriots').map(obj => obj.proj);
            this.charts[4].data.datasets[2].data = this.projections.filter(f => f.NICK == 'Cardinals').map(obj => obj.proj);
            this.charts[4].data.datasets[3].data = this.projections.filter(f => f.NICK == 'Giants').map(obj => obj.proj);
            this.charts[4].data.datasets[4].data = this.projections.filter(f => f.NICK == 'Chargers').map(obj => obj.proj);
            this.charts[4].data.datasets[5].data = this.projections.filter(f => f.NICK == 'Titans').map(obj => obj.proj);
            this.charts[4].data.datasets[6].data = this.projections.filter(f => f.NICK == 'Jets').map(obj => obj.proj);
            this.charts[4].data.labels = this.projections.filter(f => f.NICK == 'Commanders').map(obj => obj.ts);
            this.charts[4].update();
            this.keyIn += 1;
        },
        async loadPage() {
            // const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');
            if (this.dataDate == '2024-01-07') {
                this.overall = await this.getS3Data('draft_timeseries.json');
            } else {
                this.overall = await this.getS3Data('draft_timeseries_20240106.json');
            }
            this.projections = this.overall.map(({NICK, ts, proj}) => ({NICK, ts, proj}));
            this.pick2 = this.overall.map(({NICK, ts, pick2}) => ({NICK, ts, pick2}));
            this.pick3 = this.overall.map(({NICK, ts, pick3}) => ({NICK, ts, pick3}));
            this.pick4 = this.overall.map(({NICK, ts, pick4}) => ({NICK, ts, pick4}));
            this.pick5 = this.overall.map(({NICK, ts, pick5}) => ({NICK, ts, pick5}));
            // this.seed9 = this.overall.map(({NICK, ts, seed9}) => ({NICK, ts, seed9}));
            this.current = this.overall.slice(-7).map(d => {
                if (d.pick2 == 0) {
                    d.pick2_text = '--';
                } else if (d.pick2 < 0.01) {
                    d.pick2_text = '<1%';
                } else if (d.pick2 == 1) {
                    d.pick2_text = '100%';
                }  else if (d.pick2 > 0.99) {
                    d.pick2_text = '>99%'
                } else {
                    d.pick2_text = Math.round(d.pick2 * 100) + '%';
                }
                if (d.pick3 == 0) {
                    d.pick3_text = '--';
                } else if (d.pick3 < 0.01) {
                    d.pick3_text = '<1%';
                } else if (d.pick3 == 1) {
                    d.pick3_text = '100%';
                }  else if (d.pick3 > 0.99) {
                    d.pick3_text = '>99%';
                } else {
                    d.pick3_text = Math.round(d.pick3 * 100) + '%';
                }
                if (d.pick4 == 0) {
                    d.pick4_text = '--';
                } else if (d.pick4 < 0.01) {
                    d.pick4_text = '<1%';
                } else if (d.pick4 == 1) {
                    d.pick4_text = '100%';
                }  else if (d.pick4 > 0.99) {
                    d.pick4_text = '>99%';
                } else {
                    d.pick4_text = Math.round(d.pick4 * 100) + '%';
                }
                if (d.pick5 == 0) {
                    d.pick5_text = '--';
                } else if (d.pick5 < 0.01) {
                    d.pick5_text = '<1%';
                } else if (d.pick5 == 1) {
                    d.pick5_text = '100%';
                }  else if (d.pick5 > 0.99) {
                    d.pick5_text = '>99%';
                } else {
                    d.pick5_text = Math.round(d.pick5 * 100) + '%';
                }
                // if (d.seed9 == 0) {
                //     d.seed9_text = '--';
                // } else if (d.seed9 < 0.01) {
                //     d.seed9_text = '<1%';
                // } else if (d.pick2 == 1) {
                //     d.pick2_text = '100%';
                // }  else if (d.seed9 > 0.99) {
                //     d.seed9_text = '100%';
                // } else {
                //     d.seed9_text = Math.round(d.seed9 * 100) + '%';
                // }
                return d;
            })
            this.createChart();
        },
        async createChart() {
            const ctx1 = document.getElementById('chart1');
            const ctx2 = document.getElementById('chart2');
            const ctx3 = document.getElementById('chart3');
            const ctx4 = document.getElementById('chart4');
            const ctx5 = document.getElementById('chart5');
            // const ctx6 = document.getElementById('chart6');
            // const ctx7 = document.getElementById('chart7');
            const ariColor = '#000000';
            const neColor = '#D92129';
            const nygColor = '#003D7E';
            const nyjColor = '#105740';
            const lacColor = '#FFC210';
            const tenColor = '#4B92DB';
            const wasColor = '#5A1313';
            const options1 = {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    intersect: false,
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    verticalLiner: {},
                    title: {
                        display: true,
                        text: 'Chances for No. 2 Pick'
                    },
                    legend: {
                        labels: {
                            // boxWidth: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#6c6d6f',
                        usePointStyle: true,
                        callbacks: {
                            labelPointStyle: function(context) {
                                return 'circle'
                            }
                        } 
                    }
                },
                scales: {
                    x: {
                        // display: false,
                        type: 'timeseries',
                        time: {
                            unit: 'minute',
                        },
                        afterTickToLabelConversion: (ctx) => {
                            // let int = Math.round(ctx.ticks.length / 12);
                            ctx.ticks.map((tick, i) => {
                                if ((i % 5) > 0) {
                                    tick.label = '';
                                }
                                return tick;
                            });
                        },
                    },
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            };
            const options2 = {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    intersect: false,
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    verticalLiner: {},
                    title: {
                        display: true,
                        text: 'Chances for No. 3 Pick'
                    },
                    legend: {
                        labels: {
                            // boxWidth: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#6c6d6f',
                        usePointStyle: true,
                        callbacks: {
                            labelPointStyle: function(context) {
                                return 'circle'
                            }
                        } 
                    }
                },
                scales: {
                    x: {
                        // display: false,
                        type: 'timeseries',
                        time: {
                            unit: 'minute',
                        },
                        afterTickToLabelConversion: (ctx) => {
                            // console.log(ctx.ticks);
                            // let int = Math.round(ctx.ticks.length / 30);
                            ctx.ticks.map((tick, i) => {
                                if ((i % 5) > 0) {
                                    tick.label = '';
                                    // tick.value = null;
                                }
                                return tick;
                            });
                        },
                    },
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            };
            const options3 = {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    intersect: false,
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    verticalLiner: {},
                    title: {
                        display: true,
                        text: 'Chances for No. 4 Pick'
                    },
                    legend: {
                        labels: {
                            // boxWidth: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#6c6d6f',
                        usePointStyle: true,
                        callbacks: {
                            labelPointStyle: function(context) {
                                return 'circle'
                            }
                        } 
                    }
                },
                scales: {
                    x: {
                        // display: false,
                        type: 'timeseries',
                        time: {
                            unit: 'minute',
                        },
                        afterTickToLabelConversion: (ctx) => {
                            // console.log(ctx.ticks);
                            // let int = Math.round(ctx.ticks.length / 30);
                            ctx.ticks.map((tick, i) => {
                                if ((i % 5) > 0) {
                                    tick.label = '';
                                    // tick.value = null;
                                }
                                return tick;
                            });
                        },
                    },
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            };
            const options4 = {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    intersect: false,
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    verticalLiner: {},
                    title: {
                        display: true,
                        text: 'Chances for No. 5 Pick'
                    },
                    legend: {
                        labels: {
                            // boxWidth: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#6c6d6f',
                        usePointStyle: true,
                        callbacks: {
                            labelPointStyle: function(context) {
                                return 'circle'
                            }
                        } 
                    }
                },
                scales: {
                    x: {
                        // display: false,
                        type: 'timeseries',
                        time: {
                            unit: 'minute',
                        },
                        afterTickToLabelConversion: (ctx) => {
                            // console.log(ctx.ticks);
                            // let int = Math.round(ctx.ticks.length / 30);
                            ctx.ticks.map((tick, i) => {
                                if ((i % 5) > 0) {
                                    tick.label = '';
                                    // tick.value = null;
                                }
                                return tick;
                            });
                        },
                    },
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            };
            // const options5 = {
            //     hover: {
            //         intersect: false,
            //     },
            //     interaction: {
            //         mode: 'index',
            //         intersect: false,
            //     },
            //     plugins: {
            //         verticalLiner: {},
            //         title: {
            //             display: true,
            //             text: 'Chances for 9 Seed'
            //         },
            //         legend: {
            //             labels: {
            //                 // boxWidth: 20,
            //                 usePointStyle: true,
            //                 pointStyle: 'circle'
            //             }
            //         },
            //         tooltip: {
            //             backgroundColor: '#6c6d6f',
            //             usePointStyle: true,
            //             callbacks: {
            //                 labelPointStyle: function(context) {
            //                     return 'circle'
            //                 }
            //             } 
            //         }
            //     },
            //     scales: {
            //         x: {
            //             // display: false,
            //             type: 'time',
            //             time: {
            //                 unit: 'minute',
            //             },
            //             afterTickToLabelConversion: (ctx) => {
            //                 // console.log(ctx.ticks);
            //                 let int = Math.round(ctx.ticks.length / 30);
            //                 ctx.ticks.map((tick, i) => {
            //                     if ((i % int)) {
            //                         tick.label = '';
            //                         tick.value = null;
            //                     }
            //                     return tick;
            //                 });
            //             },
            //         },
            //         y: {
            //             min: 0,
            //             max: 100,
            //             ticks: {
            //                 beginAtZero: true
            //             }
            //         }
            //     }
            // };
            // const options6 = {
            //     hover: {
            //         intersect: false,
            //     },
            //     interaction: {
            //         mode: 'index',
            //         intersect: false,
            //     },
            //     plugins: {
            //         verticalLiner: {},
            //         title: {
            //             display: true,
            //             text: 'Pelican\'s Projected Seed'
            //         },
            //         legend: {
            //             labels: {
            //                 // boxWidth: 20,
            //                 usePointStyle: true,
            //                 pointStyle: 'circle'
            //             }
            //         },
            //         tooltip: {
            //             backgroundColor: '#6c6d6f',
            //             usePointStyle: true,
            //             callbacks: {
            //                 labelPointStyle: function(context) {
            //                     return 'circle'
            //                 }
            //             } 
            //         }
            //     },
            //     scales: {
            //         x: {
            //             // display: false,
            //             type: 'time',
            //             time: {
            //                 unit: 'minute',
            //             },
            //             afterTickToLabelConversion: (ctx) => {
            //                 // console.log(ctx.ticks);
            //                 let int = Math.round(ctx.ticks.length / 30);
            //                 ctx.ticks.map((tick, i) => {
            //                     if ((i % int)) {
            //                         tick.label = '';
            //                         tick.value = null;
            //                     }
            //                     return tick;
            //                 });
            //             },
            //         },
            //         y: {
            //             min: 5,
            //             max: 9,
            //             ticks: {
            //                 stepSize: 1,
            //                 beginAtZero: false
            //             }
            //         }
            //     }
            // };
            const options7 = {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    intersect: false,
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    verticalLiner: {},
                    title: {
                        display: true,
                        text: 'Projected Pick'
                    },
                    legend: {
                        labels: {
                            // boxWidth: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#6c6d6f',
                        usePointStyle: true,
                        callbacks: {
                            labelPointStyle: function(context) {
                                return 'circle'
                            }
                        } 
                    }
                },
                scales: {
                    x: {
                        // display: false,
                        type: 'timeseries',
                        time: {
                            unit: 'minute',
                        },
                        afterTickToLabelConversion: (ctx) => {
                            // console.log(ctx.ticks);
                            // let int = Math.round(ctx.ticks.length / 30);
                            ctx.ticks.map((tick, i) => {
                                if ((i % 5) > 0) {
                                    tick.label = '';
                                    // tick.value = null;
                                }
                                return tick;
                            });
                        },
                        // afterTickToLabelConversion: (ctx) => {
                        //     ctx.ticks.map((tick, i) => {
                        //         if (!(i == 0 | i == 35 | i == 70 | i == 105 | i == 140)) {
                        //             tick.label = '';
                        //             tick.value = null;
                        //         }
                        //         return tick;
                        //     });
                        // },
                    },
                    y: {
                        reverse: true,
                        min: 2,
                        max: 10,
                        ticks: {
                            stepSize: 1,
                            beginAtZero: false
                        }
                    }
                }
            };
            this.charts[0] = new Chart(ctx1, {
                type: 'line',
                plugins: [
                    {
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
                    }
                ],
                data: {
                    labels: this.pick2.filter(f => f.NICK == 'Commanders').map(obj => obj.ts),
                    datasets: [{
                        label: 'Commanders',
                        data: this.pick2.filter(f => f.NICK == 'Commanders').map(obj => obj.pick2 * 100),
                        fill: false,
                        borderColor: wasColor,
                        backgroundColor: wasColor,
                        tension: 0.4,
                        pointStyle: false,
                        // pointRadius: 7.5,
                        // pointHoverRadius: 7.5,
                        // pointBorderWidth: 2.5,
                        // pointHoverBorderWidth: 2.5,
                        // pointBorderColor: 'rgba(0, 0, 0, 0)',
                        // pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        // pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                        // pointHoverBorderColor: lalColor,

                    },
                    {
                        label: 'Patriots',
                        data: this.pick2.filter(f => f.NICK == 'Patriots').map(obj => obj.pick2 * 100),
                        fill: false,
                        borderColor: neColor,
                        backgroundColor: neColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Cardinals',
                        data: this.pick2.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick2 * 100),
                        fill: false,
                        borderColor: ariColor,
                        backgroundColor: ariColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Giants',
                        data: this.pick2.filter(f => f.NICK == 'Giants').map(obj => obj.pick2 * 100),
                        fill: false,
                        borderColor: nygColor,
                        backgroundColor: nygColor,
                        tension: 0.4,
                        pointStyle: false,
                    }],
                },
                options: options1,
            })
            this.charts[1] = new Chart(ctx2, {
                type: 'line',
                plugins: [
                    {
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
                    }
                ],
                data: {
                    labels: this.pick3.filter(f => f.NICK == 'Commanders').map(obj => obj.ts),
                    datasets: [{
                        label: 'Patriots',
                        data: this.pick3.filter(f => f.NICK == 'Patriots').map(obj => obj.pick3 * 100),
                        fill: false,
                        borderColor: neColor,
                        backgroundColor: neColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Cardinals',
                        data: this.pick3.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick3 * 100),
                        fill: false,
                        borderColor: ariColor,
                        backgroundColor: ariColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Commanders',
                        data: this.pick3.filter(f => f.NICK == 'Commanders').map(obj => obj.pick3 * 100),
                        fill: false,
                        borderColor: wasColor,
                        backgroundColor: wasColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Giants',
                        data: this.pick3.filter(f => f.NICK == 'Giants').map(obj => obj.pick3 * 100),
                        fill: false,
                        borderColor: nygColor,
                        backgroundColor: nygColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    ],
                },
                options: options2,
            })
            this.charts[2] = new Chart(ctx3, {
                type: 'line',
                plugins: [
                    {
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
                    }
                ],
                data: {
                    labels: this.pick4.filter(f => f.NICK == 'Commanders').map(obj => obj.ts),
                    datasets: [
                    {
                        label: 'Giants',
                        data: this.pick4.filter(f => f.NICK == 'Giants').map(obj => obj.pick4 * 100),
                        fill: false,
                        borderColor: nygColor,
                        backgroundColor: nygColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Patriots',
                        data: this.pick4.filter(f => f.NICK == 'Patriots').map(obj => obj.pick4 * 100),
                        fill: false,
                        borderColor: neColor,
                        backgroundColor: neColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Cardinals',
                        data: this.pick4.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick4 * 100),
                        fill: false,
                        borderColor: ariColor,
                        backgroundColor: ariColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Commanders',
                        data: this.pick4.filter(f => f.NICK == 'Commanders').map(obj => obj.pick4 * 100),
                        fill: false,
                        borderColor: wasColor,
                        backgroundColor: wasColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Titans',
                        data: this.pick4.filter(f => f.NICK == 'Titans').map(obj => obj.pick4 * 100),
                        fill: false,
                        borderColor: tenColor,
                        backgroundColor: tenColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Chargers',
                        data: this.pick4.filter(f => f.NICK == 'Chargers').map(obj => obj.pick4 * 100),
                        fill: false,
                        borderColor: lacColor,
                        backgroundColor: lacColor,
                        tension: 0.4,
                        pointStyle: false,
                    }],
                },
                options: options3,
            })
            this.charts[3] = new Chart(ctx4, {
                type: 'line',
                plugins: [
                    {
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
                    }
                ],
                data: {
                    labels: this.pick5.filter(f => f.NICK == 'Commanders').map(obj => obj.ts),
                    datasets: [
                    {
                        label: 'Giants',
                        data: this.pick5.filter(f => f.NICK == 'Giants').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: nygColor,
                        backgroundColor: nygColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Titans',
                        data: this.pick5.filter(f => f.NICK == 'Titans').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: tenColor,
                        backgroundColor: tenColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Chargers',
                        data: this.pick5.filter(f => f.NICK == 'Chargers').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: lacColor,
                        backgroundColor: lacColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Patriots',
                        data: this.pick5.filter(f => f.NICK == 'Patriots').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: neColor,
                        backgroundColor: neColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Cardinals',
                        data: this.pick5.filter(f => f.NICK == 'Cardinals').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: ariColor,
                        backgroundColor: ariColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Commanders',
                        data: this.pick5.filter(f => f.NICK == 'Commanders').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: wasColor,
                        backgroundColor: wasColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Jets',
                        data: this.pick5.filter(f => f.NICK == 'Jets').map(obj => obj.pick5 * 100),
                        fill: false,
                        borderColor: nyjColor,
                        backgroundColor: nyjColor,
                        tension: 0.4,
                        pointStyle: false,
                    }],
                },
                options: options4,
            })
            // this.charts[4] = new Chart(ctx5, {
            //     type: 'line',
            //     plugins: [
            //         {
            //             id: 'verticalLiner',
            //             afterInit: (chart, args, opts) => {
            //                 chart.verticalLiner = {}
            //             },
            //             afterEvent: (chart, args, options) => {
            //                 const {inChartArea} = args
            //                 chart.verticalLiner = {draw: inChartArea}
            //             },
            //             beforeTooltipDraw: (chart, args, options) => {
            //                 const {draw} = chart.verticalLiner
            //                 if (!draw) return

            //                 const {ctx} = chart
            //                 const {top, bottom} = chart.chartArea
            //                 const {tooltip} = args
            //                 const x = tooltip?.caretX
            //                 if (!x) return

            //                 ctx.save()

            //                 ctx.beginPath()
            //                 ctx.moveTo(x, top)
            //                 ctx.lineTo(x, bottom)
            //                 ctx.stroke()
            //                 ctx.restore()
            //             }
            //         }
            //     ],
            //     data: {
            //         labels: this.seed9.filter(f => f.NICK == 'Pelicans').map(obj => obj.ts),
            //         datasets: [
            //         {
            //             label: 'Pelicans',
            //             data: this.seed9.filter(f => f.NICK == 'Pelicans').map(obj => obj.seed9 * 100),
            //             fill: false,
            //             borderColor: nopColor,
            //             backgroundColor: nopColor,
            //             tension: 0.4,
            //             pointStyle: false,
            //         },
            //         {
            //             label: 'Timberwolves',
            //             data: this.seed9.filter(f => f.NICK == 'Timberwolves').map(obj => obj.seed9 * 100),
            //             fill: false,
            //             borderColor: minColor,
            //             backgroundColor: minColor,
            //             tension: 0.4,
            //             pointStyle: false,
            //         }],
            //     },
            //     options: options5,
            // })
            // this.charts[5] = new Chart(ctx6, {
            //     type: 'line',
            //     plugins: [
            //         {
            //             id: 'verticalLiner',
            //             afterInit: (chart, args, opts) => {
            //                 chart.verticalLiner = {}
            //             },
            //             afterEvent: (chart, args, options) => {
            //                 const {inChartArea} = args
            //                 chart.verticalLiner = {draw: inChartArea}
            //             },
            //             beforeTooltipDraw: (chart, args, options) => {
            //                 const {draw} = chart.verticalLiner
            //                 if (!draw) return

            //                 const {ctx} = chart
            //                 const {top, bottom} = chart.chartArea
            //                 const {tooltip} = args
            //                 const x = tooltip?.caretX
            //                 if (!x) return

            //                 ctx.save()

            //                 ctx.beginPath()
            //                 ctx.moveTo(x, top)
            //                 ctx.lineTo(x, bottom)
            //                 ctx.stroke()
            //                 ctx.restore()
            //             }
            //         }
            //     ],
            //     data: {
            //         labels: this.projections.filter(f => f.NICK == 'Pelicans').map(obj => obj.ts),
            //         datasets: [{
            //             label: 'Pelicans',
            //             data: this.projections.filter(f => f.NICK == 'Pelicans').map(obj => obj.avg),
            //             fill: false,
            //             borderColor: nopColor,
            //             backgroundColor: nopColor,
            //             tension: 0.4,
            //             pointStyle: false,
            //         }],
            //     },
            //     options: options6,
            // })
            this.charts[4] = new Chart(ctx5, {
                type: 'line',
                plugins: [
                    {
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
                    }
                ],
                data: {
                    labels: this.projections.filter(f => f.NICK == 'Commanders').map(obj => obj.ts),
                    datasets: [{
                        label: 'Commanders',
                        data: this.projections.filter(f => f.NICK == 'Commanders').map(obj => obj.proj),
                        fill: false,
                        borderColor: wasColor,
                        backgroundColor: wasColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Patriots',
                        data: this.projections.filter(f => f.NICK == 'Patriots').map(obj => obj.proj),
                        fill: false,
                        borderColor: neColor,
                        backgroundColor: neColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Cardinals',
                        data: this.projections.filter(f => f.NICK == 'Cardinals').map(obj => obj.proj),
                        fill: false,
                        borderColor: ariColor,
                        backgroundColor: ariColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Giants',
                        data: this.projections.filter(f => f.NICK == 'Giants').map(obj => obj.proj),
                        fill: false,
                        borderColor: nygColor,
                        backgroundColor: nygColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Chargers',
                        data: this.projections.filter(f => f.NICK == 'Chargers').map(obj => obj.proj),
                        fill: false,
                        borderColor: lacColor,
                        backgroundColor: lacColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Titans',
                        data: this.projections.filter(f => f.NICK == 'Titans').map(obj => obj.proj),
                        fill: false,
                        borderColor: tenColor,
                        backgroundColor: tenColor,
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Jets',
                        data: this.projections.filter(f => f.NICK == 'Jets').map(obj => obj.proj),
                        fill: false,
                        borderColor: nyjColor,
                        backgroundColor: nyjColor,
                        tension: 0.4,
                        pointStyle: false,
                    }],
                },
                options: options7,
            })
        },
        async getS3Data(fileName) {
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
                Key: "2023nfl/" + fileName,
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
    },
    destroyed() {
        this.timer = null;
    }
}
</script>

<style scoped>
.nba-playoff-projections {
    background-color: #fbfcfd;
    position: relative;
}

.charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.navbar {
    background-color: #272829;
    color: white;
    height: 75px;
    border: 1px solid black;
    display: flex;
    align-items: center;
}
.navbar-text {
    text-align: end;
}
.navbar-title {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    font-size: 20px;
    font-weight: bold;
}
.ea {
    padding-right: 10px;
}

.odds-table {
    border-collapse: collapse;
    margin: 0px auto 20px auto;
}
.th-odds {
    width: 75px;
}
.td-odds {
    width: 75px;
    border: 1px solid lightgray;
}
.table-row {
    border: 2px solid #393939;
}
.first-col {
  padding: 0px 0px 0px 5px;
  text-align: start;
  width: 115px;
}
.cell-odds {
    text-align: center;
}

.chart-cont {
    margin: 10px;
    padding: 1.5px 15px 1.5px 15px;
    height: 300px;
    width: 600px;
}
@media only screen and (max-width: 699px) {
    .odds-table {
        margin: 20px 5px;
    }
}
</style>