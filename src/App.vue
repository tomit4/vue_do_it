<template>
  <div class="container">
  <img alt="Vue logo" src="./assets/mockup_nobg.svg">
  <div class="nav_bar">
  </div>
  <Clock id="clock"/>
    <div v-if="this.$store.state.listIsShown">
    <router-link @click="clearMyList" id ="my_list_btn" to="/my_list">MY LIST</router-link>
    </div>
    <br>
    <router-view id="router"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Clock from '../src/components/Clock.vue'

export default {
  name: 'App',
  components: {
    Clock
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
  padding: 0.5em;
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

#my_list_btn:hover {
    color: #206557ff;
    text-decoration:underline;
    
}

</style>
