<template>
    <NavBar></NavBar>
    <div class="container">
        <h1>{{ this.post.title }}</h1>
        <p><strong>Author: {{ this.author.name }} </strong> </p>
        <p><strong>Created At: {{ this.formatDate(this.post.created_at) }}</strong></p>
        <p>{{ this.post.body }}</p>
        <button @click="editPost(post)" class="btn btn-warning m-2">Edit</button>

        <form @submit.prevent="deletePost(this.post)" method="POST" style="display:inline">
            <button type="submit" class="btn btn-danger"
                onclick="return confirm('Are you sure you want to delete this post?')">Delete</button>
        </form>
        <button @click="toHomePage()" class="btn btn-secondary m-2">Back</button>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue'
export default {
    name: 'PostDetailsPage',
    components: {
        NavBar
    },
    async mounted() {
        const response = await axios.get(this.$root.$data.apiUrl + "/show/" + this.$route.params.id);
        this.post = response.data.post;
        this.author = this.post.user
    },

    data() {
        return {
            post: '',
            author: '',
        }
    },

    methods: {
        async deletePost(post) {
            const response = await axios.delete(this.$root.$data.apiUrl + "/delete/" + post.id);
            if (response.status == 200) {
                alert(post.title + " is Deleted");
                this.$router.go(-1);
            }
        },

        toHomePage() {
            this.$router.go(-1);
        },

        editPost(post) {
            this.$router.push({
                path: '/edit/' + post.id,
                params: { id: post.id }
            });
        },

        formatDate(value) {
            let date = new Date(value);
            const day = date.toLocaleString('default', { day: '2-digit' });
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.toLocaleString('default', { year: 'numeric' });
            return day + '-' + month + '-' + year;
        },
    }

}
</script>