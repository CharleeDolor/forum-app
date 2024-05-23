import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
    name: 'store',
    state: {
        posts: [],
        role: '',
        permissions: []
    },

    getters: {
        allPosts: state => {
            return state.posts;
        },
        getRole: state =>{
            return state.role;
        },
        getPermissions: state => {
            return state.permissions;
        }
    },

    mutations: {
        loadPosts: (state) => {
            const response = axios.get("http://127.0.0.1:8000/api" + '/home');
            console.log(response);
            state.posts = response.data;
        },

        loadRoleAndPermissions: (state, payload) => {
            state.role = payload.roles[0];
            state.permissions = payload.permissions
        }
    },

    actions: {

        asyncLoadRoleAndPermissions(context, payload){
            context.commit('loadRoleAndPermissions', payload);
        }
    }
})