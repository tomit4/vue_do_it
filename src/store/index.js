import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({

    // think of state as being like the data() method in a standard vue component, it holds onto key/value pairs that can be referenced throughout your application
    state: {
        tasks: [],
        listIsShown: true,
        currentHour: undefined,
        currentAMPM: undefined // used to toggle the view of the MyList Link, we CANNOT allow the user to click on the MyList Link TWICE as it will clear the state.tasks array with the clearMyList() function in App.vue, thusly when we display our list, we hide the MyList Link when viewing the Header.vue file
    },
    // mutations  should contain methods that manipulate the state() objects synchornously
    mutations: {

        showTodos(state, payload) {
            for (let i = 0; i < payload.length; i++) {
                let taskObj = {}
                taskObj.id = i
                taskObj.todo = payload[i].task
                taskObj.hours = payload[i].hours
                taskObj.minutes = payload[i].minutes
                taskObj.am_pm = payload[i].am_pm
                taskObj.nanoid = payload[i].nanoid
                taskObj.currentStatus = false

                if (taskObj.am_pm === "PM") {
                    taskObj.hours = Number(taskObj.hours - 12)
                }

                if (taskObj.am_pm === "AM" && taskObj.hours === 0) {
                    taskObj.hours = 12
                }

                if (taskObj.am_pm === "PM" && taskObj.hours === 0) {
                    taskObj.hours = 12
                }

                taskObj.hours = String(taskObj.hours)
                taskObj.minutes = String(taskObj.minutes)
                if (taskObj.hours.length < 2) {
                    taskObj.hours = "0" + taskObj.hours
                }
                if (taskObj.minutes.length < 2) {
                    taskObj.minutes = "0" + taskObj.minutes
                }
                
                let time = new Date()
                time.setHours(time.getHours()-7)
                let hour = time.getHours()
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
                state.currentHour = hour
                state.currentAMPM = am_pm
                if (taskObj.hours === state.currentHour && taskObj.am_pm === state.currentAMPM) {
                    taskObj.currentStatus = true
                }

                state.tasks.push(taskObj)
            }

// We can sort our list this way, but it is inefficient, especially when dealing with the number 12 (we saw this with our original CLI todo list app), we may wish to actually deal in military time and create two SQL tables on the backend for AM and PM, then join them and return them here, the hours can then be changed if they are in the PM table back to civilian time, this will require a bit of work however, as we will need to adjust our app.js SQL queries and our axios api calls to implement this feature

            return state // now the state is reset to the returned data from fetchToDos
        },
        addTodo(state, payload) {
            let taskObj = {}
            taskObj.id = state.tasks.length
            taskObj.nanoid = payload.nanoid
            taskObj.hours = payload.hours
            taskObj.minutes = payload.minutes
            taskObj.am_pm = payload.am_pm
            taskObj.todo = payload.todo
            state.tasks.push(taskObj)
        },

        // And pass our axios call to removeTodo which will update our state object
        removeTodo(state, payload) {
            for (let i = 0; i < state.tasks.length; i++) {
                if (payload.todo === state.tasks[i].todo && payload.nanoid === state.tasks[i].nanoid ) {
                    state.tasks.splice(i, 1)
                }
            }
        },

        showMyListLink(state) {
            state.listIsShown = !state.listIsShown
        }

    },
    // here we have our axios/fetch calls which then pass the data back up to our mutations
    actions: {
        
        async fetchTodos(context) {
            try {
                const response = await axios.get('http://localhost:3000/maria_database')
                context.commit('showTodos', response.data)
                // context.commit('getTime')
            }
            catch(err) {console.log(err)}
        },

        async postTodo(context, payload) {
            try {
                const response = await axios.post('http://localhost:3000/maria_database', 
                {
                    "task": payload.todo,
                    "hours": payload.hours,
                    "minutes": payload.minutes,
                    "am_pm": payload.am_pm,
                    "nanoid": payload.nanoid
                })
                response
                context.commit('addTodo', payload)
            }
            catch(err) {console.log(err)}
        },

        async deleteTodo(context, payload) {
            try {
              const response = await axios.delete('http://localhost:3000/maria_database', {data:{"deletedItem": payload }}) // note the need to encapsulate the body in a {data:{}} object field
              response
              context.commit('removeTodo', payload)
            }
            catch(err) {console.log(err)}
        },

        async editTodo(context, payload) {
            try{
                context
                const response = await axios.put('http://localhost:3000/maria_database', 
                {"updated_todo": payload.todo, 
                "hours": payload.hours, 
                "minutes": payload.minutes, 
                "am_pm": payload.am_pm, 
                "nanoid": payload.nanoid })
                response
            }
            catch(err) {console.log(err)}
        }

    }
    
    // note that we did not utilize all of vuex's store properties, we did not use getters and modules, please see vuex documentation

})

export default store