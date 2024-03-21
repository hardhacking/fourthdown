<template>
    <Head>
      <Title>Live Women's March Madness Projections - ESPN Analytics</Title>
      <Meta property="og:title" content="Live Women's March Madness Projections - ESPN Analytics"/>
      <Meta property="og:site_name" content="Live Women's March Madness Projections - ESPN Analytics" />
      <Meta property="og:url" content="https://www.espnanalytics.com/wcbbAll" />
      <Meta name="twitter:url" content="https://www.espnanalytics.com/wcbbAll" />
      <Meta name="twitter:title" content="Live Women's March Madness Projections - ESPN Analytics"/>
      <Meta name="title" content="Live Women's March Madness Projections - ESPN Analytics"/>
    </Head>
    <div id="cbb-app">
      <Header></Header>
      <CBBHeader :gamesRef="gamesRef" :titleRef="titleRef" :allRef="allRef" :buttonLink="buttonLink" :menuClass1="menuClass1" :menuClass2="menuClass2" :menuClass3="menuClass3"/>
      
      <div class="page-div pt-4" id="page-id">
        
        <div class="proj">
          
          <div class="proj-page flex">
            
            <div class="heat-map m-auto" id="my_dataviz">
            </div>
          </div>
        </div>
      </div>
        <!-- <CBBFooter :espnLink="setEspnLink"/> -->
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3'
  // import axios from "axios";
  // import { server } from "@/utils/server.js";
  
  export default {
    // name: 'WCBBProj',
    // title: 'ESPN Analytics: Women\'s Tournament',
    data() {
      return {
        table: [],
        ref: [],
      }
    },
    created() {
    },
    mounted() {
      this.setZoomLevel()
      window.addEventListener('resize', this.setZoomLevel)
      
      
      this.loadPage();
      this.setZoomLevel()
    },
    methods: {
      async loadPage() {
        this.table = await this.getS3Data('womens_table.json');
        this.ref = await this.getS3Data('wcbb_teams.json');
        this.createAllCharts();
      },
      setZoomLevel() {
        if (window.innerWidth > 1130) {
          document.getElementById('page-id').style.zoom = '1.0';
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else if (window.innerWidth > 1020) {
          document.getElementById('page-id').style.zoom = '0.9';
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else if (window.innerWidth > 899) {
          document.getElementById('page-id').style.zoom = '0.8'
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else if (window.innerWidth > 788) {
          document.getElementById('page-id').style.zoom = '0.7'
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else if (window.innerWidth > 675) {
          document.getElementById('page-id').style.zoom = '0.6'
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else if (window.innerWidth > 570) {
          document.getElementById('page-id').style.zoom = '0.5'
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else if (window.innerWidth > 450) {
          document.getElementById('page-id').style.zoom = '0.4'
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        } else {
          document.getElementById('page-id').style.zoom = '0.32'
          if(document.getElementById('image-id')) {
            d3.selectAll('#image-id').attr('width', '60px');
          }
        }
      },
      // async getS3Data(fileName) {
      //   let getS3Files = async () => {
      //     let json_data = [];
      //     await new Promise(function (resolve, reject) {
      //       axios
      //       .post( server.baseURL + '/cats', {
      //         'fileName': fileName
      //       })
      //       .then(response => {
      //         json_data = response.data;
      //         resolve();
      //       }).catch(function (error) {
      //         reject(error);
      //       });
      //     });
      //     return json_data;
      //   };
  
      //   let data = await getS3Files();
      //   return data;   
      // },
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
          Key: "2024/" + fileName,
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
      createAllCharts() {
        this.createHeatMap();
      },
      createHeatMap() {
        let heatData = this.table;
  
        // heatData = heatData.map(d => {
        //   d.chance_text = d.chance * 100;
        //   // var decimal = (d.chance - parseInt(d.chance, 10));
        //   // if (decimal != 0) {
        //   //   d.chance_text = d.chance.toFixed(1);
        //   // } else {
        //   //   d.chance_text = Math.round(d.chance);
        //   // }
        //   d.chance_text = Math.round(d.chance_text) + '%';
        //   return d;
        // })
  
        // heatData = heatData.filter(d => {
        //   return d.round != 'chance_r32';
        // })//.filter(f => {
        //   return f.round != 'chance_r16';
        // })
  
        // let data_order = data.filter(d => {
        //   return d.round == "WIN_TITLE";
        // });
        // data_order = data_order.sort((a,b) => {
        //   return d3.descending(a.chance, b.chance);
        // });
        // console.log(data_order);
        // console.log(data);
        // console.log(data.sort(function(a,b) {
        //   return data_order[data.indexOf(a)] < data[data_order.indexOf(b)];
        // }));
            // console.log(heatData)
        heatData = heatData.map(d => {
          d.TEAM_NAME = this.ref.filter(f => {
            return f.id == d.id;
          })[0].shortDisplayName;
          return d
        })
  
        var myVars = [...new Set(heatData.map(function(d){return d.TEAM_NAME;}))];
        var myVars2 = [...new Set(heatData.map(function(d){return d.id;}))].map(d => {
          return this.ref.filter(f => {
            return f.id == d;
          })[0];
        }).map(d => d.seed);
        var myVars3 = [...new Set(heatData.map(function(d){return d.id;}))].map(d => {
          return this.ref.filter(f => {
            return f.id == d;
          })[0];
        }).map(d => d.logo_url);
        // console.log(myVars3)
  
        heatData = heatData.map(d => {
          if (d.round=='chance_r32') {
            d.roundL1 = 'Round';
            d.roundL2 = 'of 32';
          } else if (d.round=="chance_r16") {
          // if (d.round=="chance_r16") {
            d.roundL1 = "Sweet";
            d.roundL2 = "Sixteen";
          } else if (d.round == "chance_r08") {
            d.roundL1 = "Elite";
            d.roundL2 = "Eight";
          } else if (d.round == "chance_r04") {
            d.roundL1 = "Final";
            d.roundL2 = "Four";
          } else if (d.round == "chance_r02") {
            d.roundL1 = "Make";
            d.roundL2 = "Final";
          } else {
            d.roundL1 = "Win";
            d.roundL2 = "Title";
          }
          return d;
        })
  
        var myGroups = [...new Set(heatData.map(function(d){return d.roundL1;}))];
        var myGroups2 = [...new Set(heatData.map(function(d){return d.roundL2;}))];
  
        var margin = {top: 25, right: 25, bottom: 25, left: 25},
          width = myGroups.length*133.33,
          height = myVars.length*75 - margin.top - margin.bottom;
  
        var svg = d3.select('#my_dataviz')
          .append('div')
          .attr('class', 'svg-cont')
          .attr('id', 'svg-cont-id')
          .append('svg')
          .attr('id', 'svg_id')
          .attr("height", height + margin.top + margin.bottom)
  
        var svg_g = svg.append("g")
        
        var xAxisFunction = d3.scaleBand()
          .range([ 0, width ])
          .domain(myGroups)
          .padding(0.01)
          .paddingOuter(0)
  
        var xAxis2Function = d3.scaleBand()
          .range([0, width ])
          .domain(myGroups2)
          .padding(0.01)
          .paddingOuter(0)
  
        var xAxis = svg_g.append("g")
          .style("font-size", 20)
          .call(d3.axisTop(xAxisFunction).tickSize(0))
          .attr('transform', 'translate(0, -5)')
  
        xAxis.select(".domain").remove()
  
        var xAxis2 = svg_g.append('g')
          .style('font-size', 20)
          .call(d3.axisTop(xAxis2Function).tickSize(0))
          .attr('transform', 'translate(0, 15)')
  
        xAxis2.select('.domain').remove()
  
        var yAxisFunction = d3.scaleBand()
          .range([ 0, height ])
          .domain(myVars)
          .padding(0.02)
          .paddingOuter(0)
  
        var yAxis2Function = d3.scaleBand()
          .domain(myVars2.map((d, i) => (i + 100).toString() + d.toString()))
          .range([ 0, height ])
          .padding(0.02)
          .paddingOuter(0)
  
        var yAxis3Function = d3.scaleBand()
          .range([ 0, height ])
          .domain(myVars3)
        
        var yAxis = svg_g.append("g")
          .style("font-size", 25)
          .call(d3.axisLeft(yAxisFunction).tickSize(0))
  
        yAxis.selectAll('text')
          .style('text-anchor', 'start')
  
        var yAxisBoundingBox = yAxis.node().getBoundingClientRect();
  
        yAxis.select(".domain")
          .attr('transform', 'translate(' + (yAxisBoundingBox.width + 1) + ',0)')
          .style('stroke-width', '2px')
  
        yAxis.attr("transform", "translate(" + (-yAxisBoundingBox.width - 2) + ",20)");
  
        var yAxis2 = svg_g.append('g')
          .style('font-size', 17.5)
          .call(d3.axisLeft(yAxis2Function).tickSize(0))
  
        yAxis2.select('.domain').remove()
        
        yAxis2.selectAll('text')
          .style('text-anchor', 'end')
          .attr('dy', 0)
          .text(d => d.substring(3, d.length))
  
        yAxis2.attr("transform", "translate(" + (-yAxisBoundingBox.width - 5) + ", 25)");
  
        var yAxis2BoundingBox = yAxis2.node().getBoundingClientRect();
  
        var yAxis3 = svg_g.append("g")
          .attr("class", "y-axis")
          .style('font-size', 15)
          .call(d3.axisLeft(yAxis3Function).tickSize(0))
  
        yAxis3.selectAll("text")
          .remove();
  
        yAxis3.select('.domain')
          .remove();
  
        var images = yAxis3.selectAll("image")
          .data(myVars3)
          .enter()
          .append("svg:image")
          .attr('id', 'image-id')
          .attr("xlink:href", function(d) {return (d + '&w=60&h=60&transparent=true')})
        // console.log(images);
  
        // var imagesBoundingBox = images.node().getBoundingClientRect();
        // console.log(imagesBoundingBox.width);
        images
          .attr("x", (-yAxisBoundingBox.width-yAxis2BoundingBox.width-70))
          .attr("y", function(d) { return yAxis3Function(d) + 25; })
        // console.log('here');
        svg.attr('width', (width + yAxisBoundingBox.width + yAxis2BoundingBox.width + 70 + margin.left + margin.right))
  
        svg_g.attr("transform",
              "translate(" + (yAxisBoundingBox.width + yAxis2BoundingBox.width + 70) + "," + margin.top + ")");
  
        var getColor = d3.scaleSequential()
          .interpolator(d3.interpolate("white", "purple"))
          .domain([0, 1])
  
        // add the squares
        var square = svg_g.selectAll()
          .data(heatData)
          .enter()
          .append("g")
  
        square.style('margin', '20px')
  
        square.append('rect')
          .attr("x", function(d) { return xAxisFunction(d.roundL1) })
          .attr("y", function(d) { return yAxisFunction(d.TEAM_NAME) + 20 })
          .attr("width", xAxisFunction.bandwidth() )
          .attr("height", yAxisFunction.bandwidth() )
          .attr('id', function(d) {
            if (d.chance_text == '100%') {
              return 'clinch-rect';
            } else if (d.chance_text == '0%') {
              return 'elim-rect';
            } else {
              return 'pending-rect';
            }
          })
          .style("fill", function(d) { return getColor(d.chance)} )
          .style('class', 'foo')
          .style("stroke-width", 4)
          .style("stroke", "none")
          .style("opacity", 0.8)
        square.append('text')
          .attr('class', 'percent_text')
          .attr("x", function(d) { return xAxisFunction(d.roundL1) })
          .attr("y", function(d) { return yAxisFunction(d.TEAM_NAME) })
          .attr('transform', 'translate(' + (xAxisFunction.bandwidth()/2) + ',' + (yAxisFunction.bandwidth()/2 + 20) + ')')
          .attr('dy', '.35em')
          // .attr('id', function(d) { 
          //   if (d.chance == 100) {
          //     return 'clinch-text';
          //   } else if (d.chance == 0) {
          //     return 'elim-text';
          //   } else {
          //     return 'pending-text';
          //   }
          // })
          .style('text-anchor', 'middle')
          .style('font-weight', 'bold')
          .text(d => { 
            if (d.chance_text == '100%') {
              return "";
            } else if (d.chance_text == '0%') {
              return "";
            } else {
              return d.chance_text
            }
          })
  
        // const divWidth = svg.node().getBoundingClientRect().width;
        // if (divWidth > window.innerWidth) {
  
        //   console.log(divWidth);
        //   svg.style('float', 'left');
        //   square.filter(function(d) { return d.round == "Sweet"; })
        //     .attr('width', 0)
        //     .attr('height', 0)
        // }
  
        square.filter(function(d) { return d.chance_text == '100%'; })
          .append("svg:image")
          .attr("xlink:href", '/greencheck.png')
          .attr("x", function(d) { return xAxisFunction(d.roundL1) })
          .attr("y", function(d) { return yAxisFunction(d.TEAM_NAME) })
          .attr('transform', 'translate(' + (xAxisFunction.bandwidth()/2-12.5) + ',' + (yAxisFunction.bandwidth()/2 + 10) + ')')
          .attr("width", '20px')
          .attr("height", '20px');
  
        square.filter(function(d) { return d.chance_text == '0%'; })
          .append("svg:image")
          .attr("xlink:href", '/redx.png')
          .attr("x", function(d) { return xAxisFunction(d.roundL1) })
          .attr("y", function(d) { return yAxisFunction(d.TEAM_NAME) })
          .attr('transform', 'translate(' + (xAxisFunction.bandwidth()/2-7.5) + ',' + (yAxisFunction.bandwidth()/2 + 10) + ')')
          .attr("width", '15px')
          .attr("height", '15px');
  
        this.setZoomLevel();
      },
    },
    computed: {
      gamesRef() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'w') {
          return '/wcbbGames';
        } else {
          return '/mcbbGames';
        }
  
      },
      titleRef() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'w') {
          return '/wcbb-title';
        } else {
          return '/mcbb-title';
        }
  
      },
      allRef() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'w') {
          return '/wcbbAll';
        } else {
          return '/mcbbAll';
        }
  
      },
      buttonLink() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'w') {
          return '/mcbbAll';
        } else {
          return '/wcbbAll';
        }
      },
      menuClass1() {
        return 'btn btn-secondary btn-lg these-buttons';
      },
      menuClass2() {
        return 'btn btn-secondary btn-lg these-buttons';
      },
      menuClass3() {
        return 'btn btn-secondary btn-lg these-buttons selected-btn';
      },
      setEspnLink() {
        const currRoute = this.$route.name;
  
        if (currRoute.substring(0, 1) == 'w') {
          return 'https://www.espn.com/womens-college-basketball/scoreboard'
        } else {
          return 'https://www.espn.com/mens-college-basketball/bpi/predictions'
        }
      },
    },
  }
  
  </script>
  
  <style>
  /* * {
    padding: 0px;
    margin: 0px;
  } */
  .header {
    margin-bottom: 0px;
  }
  .proj-page {
    padding: 5px;
  }
  @media only screen and (max-width: 725px) {
    .percent_text {
      font-size: 20px;
    }
  }
  </style>
  
  
  