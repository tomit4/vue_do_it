<template>
  <div class="container">

    <span class="fixed">
    <router-link @click="reRenderMyListLink" id="my_list_btn" to="/">HOME</router-link>
    <form v-if="!editButtonClicked" @submit="onSubmit">
      <input id="initial_form" type="text" v-model="newTask" placeholder="THERE IS NO TRY..." maxlength="28">
    </form>
    <div v-if="editButtonClicked">
    <form @submit="updateTask"><input id="edit_forms" name ="edit_input" type="text" v-model="updatedTask" placeholder="EDIT HERE..." maxlength="28"></form>
    </div>
    
    <form>
      <label for="hours"></label>
      <input class="time_select" id="hours_select" type="number" min="1" max="12" v-model="selectedHour" placeholder="00" v-on:keydown="onlyArrows">
    </form>
    <form>
      <label for="minutes" id="hours_colon">:</label>
      <input class="time_select" id="minutes_select" type="number" min="0" max="59" v-model="selectedMinutes" placeholder="00" v-on:keydown="onlyArrows">
    </form>
    <form>
      <select name="am_pm" class="select" id="am_pm_form" v-model="selectedAMPM">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </form>

    <button v-if="editButtonClicked" @click="updateTask" class="edit_btn">EDIT</button>
    <input v-if="!editButtonClicked" @click="onSubmit" type="submit" value="SUBMIT">
    <br>
      <div class="bar"></div>
    </span>

    <ul>  
      <li class="tooltip" v-for="(tasks, id) in tasks" :key="tasks" :id="id" :name="tasks.currentStatus ? 'right_now' : 'not_now'">
      <div>
        <span>
          {{ tasks.todo + " AT " + tasks.hours + ":" + tasks.minutes + tasks.am_pm }}
        </span>
      <span @click="editTask(id, tasks)" class="tooltiptext" :id="'edit_btn'+id">
        <span>EDIT</span>
      </span>
      </div>
      <button @click="onClick(id, tasks)" class="btn" :id="tasks.currentStatus ? 'right_now' : 'not_now'">DONE</button>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { nanoid } from 'nanoid'

export default {
  data() {
    return {
      "newTask": undefined,
      "selectedHour": undefined,
      "selectedMinutes": undefined,
      "selectedAMPM": undefined,
      "updatedTask": undefined,
      "editButtonClicked": false,
      "todoTask": [],
    }
  },
  methods: {
    ...mapActions(["fetchTodos", "postTodo", "deleteTodo", "editTodo"]),
    ...mapMutations(["showTodos", "addTodo", "removeTodo", "updateTodo", "showMyListLink"]),
    onSubmit(e) {
      e.preventDefault()
      // console.log(this.$store.state.currentHour, this.$store.state.currentAMPM)
// Consider switch/case statements instead of so many if statements...
      if (this.newTask === undefined) {
        alert("PLEASE ENTER A TASK")
        this.newTask = undefined
        this.selectedHour = undefined
        this.selectedMinutes = undefined
        this.selectedAMPM = undefined
        return
      }
      if (this.selectedHour === undefined || this.selectedHour === "0") {
        this.selectedHour = "12"
      }
      if (this.selectedMinutes === undefined || this.selectedMinutes === "0") {
        this.selectedMinutes = "00"
      }
      if (this.selectedAMPM === undefined) {
        this.selectedAMPM = "AM"
      }
      if (Number(this.selectedHour) > 12 || Number(this.selectedMinutes) > 59){
        alert("PLEASE ENTER VALID HOURS/MINUTES")
        this.newTask = undefined
        this.selectedHour = undefined
        this.selectedMinutes = undefined
        this.selectedAMPM = undefined
        return
      }
      if (this.selectedHour.length > 2 || this.selectedMinutes.length > 2) {
        alert("PLEASE ENTER UP TO ONLY TWO DIGITS FOR TIME INPUT")
        this.newTask = undefined
        this.selectedHour = undefined
        this.selectedMinutes = undefined
        this.selectedAMPM = undefined
        return
      }

      let newTodo = {
        todo: this.newTask.toUpperCase(),
        hours: this.selectedHour,
        minutes: this.selectedMinutes,
        am_pm: this.selectedAMPM,
        nanoid: nanoid(21)
      }

      this.postTodo(newTodo)
      this.newTask = undefined
      this.selectedHour = undefined
      this.selectedMinutes = undefined
      this.selectedAMPM = undefined
    },
    onClick(id, tasks) {
      let clickedLi = document.getElementById(id)
      clickedLi.remove();
      this.deleteTodo(tasks)
    },
    // Only allow Numbers, Arrows, BackSpace, and Delete buttons on Time input
    // Strange behavior when trying to rename onlyArrows to onlyNums or something like that, it forgets everything...
    onlyArrows(e){
      // console.log(e.keyCode)
      if (e.keyCode !== 8
          && e.keyCode !== 9
          && e.keyCode !== 37
          && e.keyCode !== 38
          && e.keyCode !== 39
          && e.keyCode !== 40
          && e.keyCode !== 46
          && e.keyCode !== 48
          && e.keyCode !== 49
          && e.keyCode !== 50
          && e.keyCode !== 51
          && e.keyCode !== 52
          && e.keyCode !== 53
          && e.keyCode !== 54
          && e.keyCode !== 55
          && e.keyCode !== 56
          && e.keyCode !== 57) {
         e.preventDefault()
      }
    },

    editTask(id, tasks) {
      id
      this.editButtonClicked = true;
      
      this.todoTask.push(tasks) // temporarily holds the todo in an array to be compared to our state object's task array
    },
    updateTask(e){
      e.preventDefault()
      if(this.updatedTask === undefined) {
        this.editButtonClicked = false
        return
      }
      this.updatedTask = this.updatedTask.toUpperCase()

      for (let i = 0; i < this.$store.state.tasks.length; i++) {
        if (this.todoTask[0].todo === this.$store.state.tasks[i].todo &&
            this.todoTask[0].nanoid === this.$store.state.tasks[i].nanoid) {
        
        this.$store.state.tasks[i].todo = this.updatedTask 

        if (this.selectedHour === undefined) {
          break
        }
        else if (this.selectedHour !== undefined) {
          this.$store.state.tasks[i].hours = this.selectedHour
        }
        if (this.selectedMinutes === undefined) {
          break
        }
        else if (this.selectedMinutes !== undefined) {
          this.$store.state.tasks[i].minutes = this.selectedMinutes
        }
        if (this.selectedAMPM === undefined) {
          break
        }
        else if (this.selectedAMPM !== undefined) {
          this.$store.state.tasks[i].am_pm = this.selectedAMPM
        }
        
        }
      }

      this.editTodo(this.todoTask[0])

      this.todoTask = [];
      this.updatedTask = undefined
      this.editButtonClicked = false;

      this.newTask = undefined
      this.selectedHour = undefined
      this.selectedMinutes = undefined
      this.selectedAMPM = undefined
    },
    reRenderMyListLink() {
      this.showMyListLink()
    },
  },
  computed: {
    ...mapState(["tasks"])
  },
  created() { // this is what invokes fetchTodos()
    this.fetchTodos()
  },
  mounted() {

  }
}
</script>

<style scoped>

.container {
  margin-top: 280px;
}

.fixed {
  margin-top: 250px;
  position: fixed;
  background-color: white;
}

.bar {
  background-color: #41b883;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 3em 0em 3em;
  padding: 0.3em;
  border: 5px white solid;
  border-radius: 0.2em;
}

form {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: -13px 0 0 0;
  padding: 0 0 -20px 0;
}

#initial_form[type="text"] {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 140%;
  font-weight: 900;
  color:#41b883;
  display: block;
  align-content: center;
  justify-content: center;
  margin: -7px 0 5px 0;
  padding: 6px 500px 6px 500px;
  border: 3.5px solid #41b883;
  border-radius: 0.4em;
  outline: 0;
  cursor: default;
}

input[type="submit"] {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  font-weight: 900;
  height: 47px;
  display: inline-block;
  align-content: center;
  justify-content: center;
  margin: 0.3em 0 0.25em 0;
  background: #41b883;
  color: #fff;
  border: 3px #41b883 solid;
  border-radius: 0.4em;
  cursor: pointer;
}

input[type="submit"]:hover, input[type="submit"]:focus {
  background: #206557ff;
  border: 3px #206557ff solid;
}

#initial_form[placeholder] {
  font-family: Arial, Helvetica, sans-serif;
  height: 28px;
  width: 200px;
  font-size: 115%;
  font-weight: 900;
  color:#41b883;
  text-align: center;
}

/* Time Forms */

/*These hide the arrow from number input fields */

input[type=number] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hides the arrow on the dropdown menu */
/* select {
  -webkit-appearance:none
} */

#hours_select {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 95%;
  font-weight: 900;
  width:50px;
  height:32px;
  display:block;
  align-content: center;
  justify-content: center;
  margin: 1rem 0 0 -10rem;
  padding: 1px;
  background: #41b883;
  border: #41b883 solid;
  border-radius: 5px;
  color: #fff;
  cursor:pointer;
}

#hours_select:hover, #hours_select:focus {
  background: #206557ff;
  border: #206557ff solid;
}

#hours_select[placeholder] {
  text-align: center;
}

#hours_colon {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 115%;
  font-weight: 900;
  text-decoration:none;
  height:51px; 
  align-content: center;
  justify-content: center;
  margin: -25px 15px 0px -10px;
  padding: 0 -2px 0 12px;
  background: none;
  border: none;
  color: #41b883;
}

#minutes_select {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 95%;
  font-weight: 900;
  width:50px;
  height:32px;
  display:flex;
  align-content: center;
  justify-content: center;
  margin: -1.65rem 0rem 0 -0.45rem;
  padding: 1px;
  background: #41b883;
  border: #41b883 solid;
  border-radius: 5px;
  color: #fff;
  cursor:pointer;
}

#minutes_select:hover, #minutes_select:focus {
  background: #206557ff;
  border: #206557ff solid;
}

#minutes_select[placeholder] {
  text-align: center;
}

#am_pm_form {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 95%;
  font-weight: 900;
  width:60px;
  height:40px;
  display:block;
  align-content: center;
  justify-content: center;
  text-align:left;
  margin: -2.45rem 0 0 10rem;
  padding: 0px;
  background: #41b883;
  border: #41b883 solid;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

#am_pm_form:hover, #am_pm_form:focus {
  background: #206557ff;
  border: #206557ff solid;
}

ul {
  display:inline-block;
  justify-content:center;
  align-content:center;
  text-align: left;
  text-indent: -3em;
  list-style-type: none; /*Remove bullets*/
  padding: 1em; /* Remove padding */
  margin: 150px 625px 0 50px;
}


li {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  white-space: nowrap;
  width: 300px;
  height:30px;
  font-size: 115%;
  font-weight: 900;
  color: #fff;
  background-color:#41b883;
  border-radius: 0.4em;
  margin: 10px;
  padding: 12px 180px 12px 80px;
  cursor: pointer;
}

li:hover, li:focus {
  background-color: #206557ff;
}

li[name="right_now"] {
  background-color: #206557ff;
  border-color: #206557ff;
}

.btn {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 95%;
    font-weight: 900;
    width:80px;
    height:51px; /* playing with the height plus the negative margin value allowed me to line these up with the list items */
    display:block;
    align-content: center;
    justify-content: center;
    margin: -41px 0px 0px 970px;
    background: #41b883;
    border: #41b883 solid;
    border-radius: 0.4em;
    color: #fff;
    cursor: pointer;
}

.btn:hover, .btn:focus {
    background: #206557ff;
    border: 9px #206557ff solid;
}

/* Edit Form CSS */
#edit_forms {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  font-weight: 900;
  text-align: center;
  color:#41b883;
  display: block;
  align-content: center;
  justify-content: center;
  margin-top: -8px;
  padding: 7px 462px 7px 462px;
  border: 3.5px solid #41b883;
  border-radius: 0.4em;
  outline: 0;
}

#edit_forms[placeholder] {
  font-size: 115%;
}

.edit_btn {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 95%;
    font-weight: 900;
    width:80px;
    height:45px;
    display: inline-block;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    background: #41b883;
    border: #41b883 solid;
    border-radius: 0.4em;
    color: #fff;
    cursor: pointer;
}

.edit_btn:hover, .edit_btn:focus {
  background: #206557ff;
  border: 9px #206557ff solid;
}

/* ToolTip CSS */

.tooltip { /* Container for our tooltip */
  font-family:Arial, Helvetica, sans-serif;
  font-weight: 900;
  position: relative; 
  display: block;
}

.tooltiptext {
  font-size: 90%;
  margin: 12px 0px 0px -40px;
  text-indent: 0.05em;
}

.tooltip .tooltiptext { /* This is for the tooltip text */
 visibility: hidden;
 width: 80px;
 height: 30px;
 background-color: #206557ff;
 color: white;
 text-align: center;
 padding: 10px;
 border-radius: 0.4em; /* Defines tooltip text position */
 position: absolute;
 z-index: 1;
 top: -10px;
 left: 110%; 
} 

.tooltip:hover .tooltiptext { /* Makes tooltip text visible when hovered on */
 visibility: visible;
}

.tooltiptext:hover {
  visibility: visible;
  background-color: #206557ff;
}

.tooltip .tooltiptext::after {
 content: "";
 position: absolute;
 top: 50%;
 right: 97%;
 margin-top: -10px;
 border-width: 10px;
 border-style: solid;
 border-color: transparent #206557ff transparent transparent;
}

</style>