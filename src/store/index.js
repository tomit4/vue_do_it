import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({

    // think of state as being like the data() method in a standard vue component, it holds onto key/value pairs that can be referenced throughout your application
    state: {
        tasks: [],
        // amTasks: [],
        // pmTasks: [],
        listIsShown: true // used to toggle the view of the MyList Link, we CANNOT allow the user to click on the MyList Link TWICE as it will clear the state.tasks array with the clearMyList() function in App.vue, thusly when we display our list, we hide the MyList Link when viewing the Header.vue file
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

                // if (taskObj.am_pm === "AM") {
                //     state.amTasks.push(taskObj)
                // }
                
                // if (taskObj.am_pm === "PM") {
                //     state.pmTasks.push(taskObj)
                // }

                state.tasks.push(taskObj)
            }

// We can sort our list this way, but it is inefficient, especially when dealing with the number 12, we may 
// wish to actually deal in military time and create two SQL tables on the backend for AM and PM, then join 
// them and return them here, the hours can then be changed if they are in the PM table, this will require a 
// bit of work however, as we will need to adjust our app.js SQL queries and our axios api calls to implement 
// this feature

            // state.amTasks.sort(({ minutes: a }, { minutes: b }) => a - b)
            // state.amTasks.sort (({ hours: a }, { hours: b }) => a - b)

            // state.pmTasks.sort(({ minutes: a }, { minutes: b }) => a - b)
            // state.pmTasks.sort (({ hours: a }, { hours: b }) => a - b)

            // state.tasks = state.amTasks.concat(state.pmTasks)

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
                {"updated_todo": payload[0].todo, 
                "hours": payload[0].hours, 
                "minutes": payload[0].minutes, 
                "am_pm": payload[0].am_pm, 
                "nanoid": payload[0].nanoid })
                response
            }
            catch(err) {console.log(err)}
        }

    }
    
    // note that we did not utilize all of vuex's store properties, we did not use getters and modules, please see vuex documentation

})

export default store