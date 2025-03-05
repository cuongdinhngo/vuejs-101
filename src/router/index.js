import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../components/TodoList/TodoList.vue";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart.vue";
import MyName from '../components/MyName.vue';
import TodoListPinia from "../components/TodoList_Pinia/TodoList.vue";

const routes = [
    // {
    //     path: '/',
    //     redirect: '/todo'
    // },
    {
        path: '/',
        name: 'Home',
        component: MyName
    },
    {
        path: '/todo',
        name: 'TodoList',
        component: TodoList
    },
    {
        path: '/cart',
        name: 'ShoppingCart',
        component: ShoppingCart
    },
    {
        path: '/todo-pinia',
        name: 'TodoListPinia',
        component: TodoListPinia
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
