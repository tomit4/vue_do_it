import {createRouter, createWebHistory} from 'vue-router'
import Header from '../views/Header'
import Blank from '../views/Blank'
import NotFound from '../views/404'

const routes = [
    {
        path: '/',
        name: '/',
        component: Blank
    },
    {
        path: '/my_list',
        name: 'Header',
        component: Header
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: NotFound 
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
// We export our router here to be utilized in our main.js file
export default router
