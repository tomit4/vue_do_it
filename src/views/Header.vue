<template>
  <div>
    <form @submit="onSubmit">
      <input id="initial_form" type="text" v-model="newTask" placeholder="THERE IS NO TRY..." maxlength="28">
    </form>
    <input @click="onSubmit" type="submit" value="SUBMIT">
    <br>
    <div v-if="editButtonClicked">
    <form @submit="updateTask"><input id="edit_forms" name ="edit_input" type="text" v-model="updatedTask" placeholder="EDIT HERE..." maxlength="28"></form>
    <button @click="updateTask" class="edit_btn">EDIT</button>
    </div>
    
    <ul>
      
      <li class="tooltip" v-for="(tasks, id) in tasks" :key="tasks" :id="id" >
      <div>
        <span :id="'li_'+id">
          {{ tasks.todo }}
        </span>
      <span @click="editTask(id, tasks)" class="tooltiptext" :id="'edit_btn'+id">
        <span>EDIT</span>
      </span>
      </div>
      <button @click="onClick(id, tasks)" class="btn" :id="'btn_' +id">DONE</button>
      </li>

    </ul>
    <router-link @click="reRenderMyListLink" id="my_list_btn" to="/">HOME</router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { nanoid } from 'nanoid'

export default {
  data() {
    return {
      "newTask": undefined,
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
      if(this.newTask === undefined) {
        return
      }
      let newTodo = {
        todo: this.newTask.toUpperCase(),
        nanoid: nanoid(21)
      }
      this.postTodo(newTodo)
      this.newTask = undefined
    },
    onClick(id, tasks) {
      let clickedLi = document.getElementById(id)
      clickedLi.remove();
      this.deleteTodo(tasks)
    },

    // Note that our edit functionality is probably not how it was intended to be used considering everything else is done using mutations and actions within the vuex store... we probably did this in a more round about way than necessary and it would be good to look into how this could be done more cleanly in future projects...
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
        if (this.todoTask[0].todo === this.$store.state.tasks[i].todo && this.todoTask[0].nanoid === this.$store.state.tasks[i].nanoid)
        this.$store.state.tasks[i].todo = this.updatedTask
      }
      console.log(this.todoTask)
      this.editTodo(this.todoTask)

      this.todoTask = [];
      this.updatedTask = undefined
      this.editButtonClicked = false;
    },
    reRenderMyListLink() {
      this.showMyListLink()
    }
  },
  computed: {
    ...mapState(["tasks"])
  },
  created() { // this is what invokes fetchTodos()
    this.fetchTodos()
  }
}
</script>

<style scoped>

form {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 10px 0 0 0;
}

#initial_form[type="text"] {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 140%;
  font-weight: 900;
  color:#41b883;
  display: block;
  align-content: center;
  justify-content: center;
  padding: 5px 300px 5px 300px;
  border: 3.5px solid #41b883;
  border-radius: 0.4em;
  outline: 0;
}

input[type="submit"] {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  font-weight: 900;
  height: 47px;
  display: inline-block;
  align-content: center;
  justify-content: center;
  margin: 0.75em 0 0.25em 0;

  background: #41b883;
  color: #fff;
  border: 3px #41b883 solid;
  border-radius: 0.4em;
  cursor: pointer;
}

input[type="submit"]:hover {
  background: #206557ff;
  border: 3px #206557ff solid;
}

#initial_form[placeholder] {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 140%;
  font-weight: 900;
  color:#41b883;
  text-align: center;
}
ul {
  display:inline-block;
  justify-content:center;
  align-content:center;
  text-align: center;
  text-indent: -0.4em;
  list-style-type: none; /*Remove bullets*/
  padding: 0; /* Remove padding */
  margin: 0 625px 0 50px;
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
  padding: 12px 80px 12px 80px;
  cursor: pointer;
}

li:hover {
  background-color: #206557ff;
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
    margin: -41px 0px 0px 875px;
    background: #41b883;
    border: #41b883 solid;
    border-radius: 0.4em;
    color: #fff;
    cursor: pointer;
}

.btn:hover {
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
  margin-top: 0.5rem;
  padding: 3px 150px 3px 150px;
  border: 3.5px solid #41b883;
  border-radius: 0.4em;
  outline: 0;
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
    margin: 1rem;
    background: #41b883;
    border: #41b883 solid;
    border-radius: 0.4em;
    color: #fff;
    cursor: pointer;
}

.edit_btn:hover {
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