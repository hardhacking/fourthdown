<template>
  <div id="header-app">
    <div class="header">
      <div class="full-header">
      <div class="header">

        <div class="custom-nav bg-espngray-100">
          <a to="/">
            <img class="h-8 w-auto" src="" />
          </a>
          <a :href="buttonLink" class="mr-16 lg:mr-0 z-50">
            <div id="myBtn-id" class="cat-button text-center">
            </div>
          </a>
        </div>

      </div>
    </div>
    </div>
    <div class="menu-component">
      <div class="title-menu">
        <div class="title-title">
              <h1 class="text-3xl font-semibold text-center" id="title-id"></h1>
            </div>
        <div class="full-menu">
          <a :href="gamesRef" >
            <button id="games-btn" type="button" :class="menuClass1">Live Games</button>
          </a>
          <!-- <router-link :to="titleRef" >
            <button id="futures-btn" type="button" :class="menuClass2">Title Chances</button>
          </router-link> -->
          <a :href="allRef">
            <button id="proj-btn" type="button" :class="menuClass3">All Projections</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'CBBHeader',
  components: {

  },
  props: {
    gamesRef: String,
    titleRef: String,
    allRef: String,
    buttonLink: String,
    menuClass1: String,
    menuClass2: String,
    menuClass3: String,
  },
  mounted() {
    this.update();
    d3.select(window).on('resize', this.update);
  },
  methods: {
    update() {
      // console.log(window.innerWidth)
      if (window.innerWidth <= 252) {
        const currRoute = this.$route.name;

        if (currRoute.substring(0, 1) == 'w') {
          document.getElementById('title-id').innerHTML='Women\'s';
          document.getElementById('myBtn-id').innerHTML='->Men\'s';
        } else {
          document.getElementById('title-id').innerHTML='Men\'s';
          document.getElementById('myBtn-id').innerHTML='->Women\'s';
        }
      } else if (window.innerWidth <= 305) {
        // document.getElementById('games-btn').innerHTML='Games';
        // document.getElementById('futures-btn').innerHTML='Women\'s';
        // document.getElementById('proj-btn').innerHTML='M';
        const currRoute = this.$route.name;

        if (currRoute.substring(0, 1) == 'w') {
          document.getElementById('title-id').innerHTML='Women\'s 2024';
          document.getElementById('myBtn-id').innerHTML='View Men\'s';
        } else {
          document.getElementById('title-id').innerHTML='Men\'s 2024';
          document.getElementById('myBtn-id').innerHTML='View Women\'s';
        }
      } else if (window.innerWidth <= 400) {
        const currRoute = this.$route.name;

        if (currRoute.substring(0, 1) == 'w') {
          document.getElementById('title-id').innerHTML='Women\'s Tournament 2024';
          document.getElementById('myBtn-id').innerHTML='View Men\'s';
        } else {
          document.getElementById('title-id').innerHTML='Men\'s Tournament 2024';
          document.getElementById('myBtn-id').innerHTML='View Women\'s';
        }
      } else if (window.innerWidth <= 600) {
        const currRoute = this.$route.name;

        if (currRoute.substring(0, 1) == 'w') {
          document.getElementById('title-id').innerHTML='Women\'s Tournament 2024';
          document.getElementById('myBtn-id').innerHTML='View Men\'s';
        } else {
          document.getElementById('title-id').innerHTML='Men\'s Tournament 2024';
          document.getElementById('myBtn-id').innerHTML='View Women\'s';
        }
      } else {
        const currRoute = this.$route.name;

        if (currRoute.substring(0, 1) == 'w') {
          document.getElementById('title-id').innerHTML='Women\'s Tournament Projections 2024';
          document.getElementById('myBtn-id').innerHTML='View Men\'s';
        } else {
          document.getElementById('title-id').innerHTML='Men\'s Tournament Projections 2024';
          document.getElementById('myBtn-id').innerHTML='View Women\'s';
        }
      }
    },
  },
}
</script>

<style>
.custom-nav {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
}
.starter-template {
  text-align: center;
}
.ea {
  width: 150px;
  float: left;
}
.cat-button {
  float: right;
  background-color: #009ee2;
  font-weight: bold;
  padding: 10px 10px;
  color: white;
  border: 0px;
  box-shadow: none;
  font-size: 18px;
  width: 150px;
}

.cat-button:hover,
.cat-button:hover:active {
  background-color: #067eb2;
}

@media only screen and (max-width: 400px) and (min-width: 306px) {
  .cat-button {
    width: 120px;
  }
}
@media only screen and (max-width: 305px) {
  .cat-button {
    width: 90px;
  }
}
.full-menu {
  width: 400px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.title-title {
  padding-top: 10px;
}
.menu-component {
  padding: 10px;
}
.these-buttons {
  padding: 15px;
  font-size: 20px;
  width: 160px;
  border: 0px;
  color: #393939 !important;
  background-color: #f2f3f4;
  cursor: pointer;
}
.selected-btn {
  padding-bottom: 11px;
  border-bottom: 4px solid #009ee2;/*00AEEF C31E32*/
}

.these-buttons:hover,
.these-buttons:hover:active {
  padding-bottom: 11px;
  border-bottom: 4px solid #C31E32;/*00AEEF C31E32*/
}

@media only screen and (max-width: 525px) {
  .full-menu {
    width: 100%;
    justify-content: center;
  }
  .these-buttons {
    margin: 5px;
    width: 120px;
    font-size: 15px;
    padding: 7.5px;
  }
  .selected-btn {
    padding-bottom: 3.5px;
  }
  .these-buttons:hover,
  .these-buttons:hover:active {
    padding-bottom: 3.5px;
    border-bottom: 4px solid #C31E32;/*00AEEF C31E32*/
  }
}

@media only screen and (max-width: 475px) {
  #title-id {
    font-size: 25px;
  }
  .menu-component {
    padding: 0px;
  }
  .full-menu {
    margin: 5px 0px 10px 0px;
  }
  .ea {
    width: 100px;
  }
  .custom-nav {
    padding: 0px 10px;
  }
  .cat-button {
    font-size: 12px;
    width: 120px;
  }
}

@media only screen and (max-width: 250px) {
  .cat-button {
    width: 100px;
  }
}

@media only screen and (max-width: 250px) {
  .cat-button {
    width: 100px;
  }
}

</style>
