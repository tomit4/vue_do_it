<template>
  <div id="clock"></div>
</template>

<script>
export default {
//     setInterval(showTime, 1000);
//         function showTime() {
//             let time = new Date();
//             let hour = time.getHours() - 7; // adjusted because internal clock is off by seven hours... otherwise works fine
//             let min = time.getMinutes();
//             let sec = time.getSeconds();
//             am_pm = "AM";
  
//             if (hour > 12) {
//                 hour -= 12;
//                 am_pm = "PM";
//             }
//             if (hour == 0) {
//                 hr = 12;
//                 am_pm = "AM";
//             }
  
//             hour = hour < 10 ? "0" + hour : hour;
//             min = min < 10 ? "0" + min : min;
//             sec = sec < 10 ? "0" + sec : sec;
  
//             let currentTime = hour + ":" 
//                 + min + ":" + sec + am_pm;
  
//             document.getElementById("clock")
//                 .innerHTML = currentTime;
//         }
  
//         showTime();

}
</script>

<style scoped>
#clock {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 900;
    font-size: 25px;
    width: 250px;
    margin: 200px;
    text-align: center;
    border: 4px solid #206557ff;
    border-radius: 5px;
    color: #fff;
    background-color: #206557ff;
}
</style>