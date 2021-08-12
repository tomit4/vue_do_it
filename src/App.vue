<template>
<div class="container">
  <div class="fixed">
  <div class="nav_bar"></div>
  <img alt="Vue logo" src="./assets/mockup_nobg.svg">
  <div class="nav_bar"></div>
  <Clock id="clock"/>
    <div  v-if="this.$store.state.listIsShown">
    <router-link @click="clearMyList" id="my_list_btn" to="/my_list">MY LIST</router-link>
    </div>
    <br>
  </div>
  
  <router-view />

<!-- Apparently this is deprecated, although it still works...-->
    <!-- <transition name="fade" mode="out-in">
    <router-view />
    </transition> -->

<!-- New Version... can't figure out how it works yet -->
    <!-- <router-view v-slot="{ Header }">
    <transition name="fade" mode="out-in">
      <component :is="Header" />
    </transition>
    </router-view> -->
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Clock from '../src/components/Clock.vue'
// import Header from '../src/views/Header.vue'

export default {
  name: 'App',
  components: {
    Clock,
    // Header
  },
  computed: {
      ...mapState(["tasks"]),
  },
  methods: {
    ...mapMutations(["showMyListLink"]),
    clearMyList() {
      // we clear the tasks array otherwise there will be a re-render through the v-for loop every time we click on the MY LIST router-link
      this.$store.state.tasks = []
      this.showMyListLink()
    }

  }
}
</script>

<style>
#app {
  text-align: center;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  margin-top: 10px;
  background-color: white;
}


.container {
  margin: 0;
  padding: 0;
}

.nav_bar {
  background-color: #41b883;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 5em 0 5em;
  padding: 0.4em;
  border-radius: 0.2em;
}

/* Buttons CSS */
#my_list_btn {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 115%;
    font-weight: 900;
    text-decoration:none;
    height:51px; 
    display:block;
    align-content: center;
    justify-content: center;
    margin: 5px 0px -25px 0px;
    background: none;
    border: none;
    color: #41b883;
    cursor: pointer;
}

#my_list_btn:hover, #my_list_btn:focus {
    color: #206557ff;
    text-decoration:underline;
    
}

/* Traditional CSS transition effects...doesn't quite work with this */

/* .list {
  opacity: 1;
  -webkit-transition: 0.25s all ease-in-out;
	-moz-transition: 0.25s all ease-in-out;
	-o-transition: 0.25s all ease-in-out;
  transition: 0.25s all ease-in-out;
}

.list:active {
  opacity: 0;
} */

/* VueJS transition effects */

/* .fade-enter-active {
transition: 0.5s all ease-in-out;
}

.fade-enter-from {
  opacity: 0;
} */

</style>
