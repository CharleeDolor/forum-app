<template>
    <div class="container">
        <h1>Edit Post</h1>
        <form @submit.prevent="editPost()">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="title" name="title">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" id="body" v-model="body" name="body" rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <router-link to="/home" class="btn btn-secondary m-2">Cancel</router-link>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    async beforeMount(){
        const response = await axios.get(this.$root.$data.apiUrl + "/show/" + this.$route.params.id)
        this.title = response.data.post.title
        this.body = response.data.post.body
    },
    data(){
        return {
            title: '',
            body: ''
        }
    },

    methods:{
        async editPost(){
            const response = await axios.put(this.$root.$data.apiUrl + "/update/" + this.$route.params.id,
            {
                title: this.title,
                body: this.body
            });

            if(response.status == 200){
                this.title = '';
                this.body = '';
                alert('Post edited successfully');
                this.$router.go(-1);
            }
        }
    }
}
</script>