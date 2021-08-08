import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({

    // think of state as being like the data() method in a standard vue component, it holds onto key/value pairs that can be referenced throughout your application
    state: {
        tasks: [],
        listIsShown: true // used to toggle the view of the MyList Link, we CANNOT allow the user to click on the MyList Link TWICE as it will clear the state.tasks array with the clearMyList() function in App.vue, thusly when we display our list, we hide the MyList Link when viewing the Header.vue file
    },
    // mutations  should contain methods that manipulate the state() objects synchornously
    mutations: {

        showTodos(state, payload) {
            for (let i = 0; i < payload.length; i++) {
                // console.log(payload[i].nanoid)
                let taskObj = {}
                taskObj.id = i
                taskObj.nanoid = payload[i].nanoid
                taskObj.todo = payload[i].task
                state.tasks.push(taskObj)
            }
            // console.log(state.tasks)
            return state // now the state is reset to the returned data from fetchToDos
        },
        addTodo(state, payload) {
            let taskObj = {}
            taskObj.id = state.tasks.length
            taskObj.nanoid = payload.nanoid
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
            // console.log(state.listIsShown)
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
                const response = await axios.post('http://localhost:3000/maria_database', {"task": payload.todo, "nanoid": payload.nanoid})
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
                console.log(payload[0])
                const response = await axios.put('http://localhost:3000/maria_database', {"updated": payload[0].todo, "nanoid": payload[0].nanoid })
                response
            }
            catch(err) {console.log(err)}
        }

    }
    
    // note that we did not utilize all of vuex's store properties, we did not use getters and modules, please see vuex documentation

})

export default store