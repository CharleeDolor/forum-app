import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
    name: 'store',
    state: {
        posts: [],

    },

    getters: {
        posts: state => {
            return state.posts;
        }
    },

    mutations: {
        loadPosts: (state) => {
            const response = axios.get("http://127.0.0.1:8000/api" + '/home');
            console.log(response.data);
            state.posts = response.data.posts;
        },

        createPost: (state, data) => {
            // eslint-disable-next-line no-useless-catch
            try {
                const response = axios.post("http://127.0.0.1:8000/api" + '/create', {
                    title: data.title,
                    body: data.body
                });
                if (response.status == 201) {
                    alert('Post Created');
                    state.posts.push(data);
                }
            } catch (error) {
                throw error;
            }
        }
    },

    actions: {
        asyncLoadPosts(context){
            context.commit('loadPosts');
        },

        asyncCreatePost({ commit }, data) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('createPost', data);
                    resolve(data);
                }, 1000);
            });
        },
    }
})