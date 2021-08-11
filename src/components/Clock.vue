<template>
  <div id="clock">
    {{ time }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  data() {
    return {
      time: "00:00:00AM",
    }
  },
  methods: {
    showTime() {
      let time = new Date()
      time.setHours(time.getHours()-7)
      let hour = time.getHours()
      let min = time.getMinutes()
      let sec = time.getSeconds()
      let am_pm = "AM"

      if (hour > 12) {
        hour -= 12
        am_pm = "PM"
      }
      
      if (hour == 0) {
        hour = 12
        am_pm = "PM"
      }

      hour = hour < 10 ? "0" + hour : hour
      min = min < 10 ? "0" + min : min
      sec = sec < 10 ? "0" + sec : sec
      
      let currentTime = hour + ":" + min + ":" + sec + am_pm

      this.time = currentTime
      this.hour = hour
      this.ampm = am_pm
    },
  },
  mounted() {
    setInterval(this.showTime, 1000)
  },
  computed: {
      ...mapState(["tasks"]),
  }
}
</script>

<style scoped>

#clock {
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-weight: 900;
    font-size: 20px;
    justify-content: center;
    align-content: center;
    width: 150px;
    /* the margin auto feature centers our clock no matter the window dimension */
    margin: 10px auto; 
    padding: 0;
    text-align: center;
    border: 4px solid #206557ff;
    border-radius: 5px;
    color: #fff;
    background-color: #206557ff;
    cursor:default;
}

</style>