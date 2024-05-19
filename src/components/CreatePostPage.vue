<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="background-image"></div>
        <h1>Create New Post</h1>
        <form @submit.prevent="createPost">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" v-model="title" class="form-control" id="title" name="title">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" v-model="body" id="body" name="body" rows="5"></textarea>
            </div>
            <div class="container">
                <router-link to="/home" class="btn btn-secondary m-2">Back</router-link>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            title: '',
            body: '',
            errors: {}
        };
    },

    methods: {
        async createPost() {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api" + '/create', {
                    title: this.title,
                    body: this.body
                });

                if(response.status == 201){
                    this.title = '';
                    this.body = '';
                    this.$router.go(-1);
                }
                
            } catch (error) {
                alert("Something went wrong. Please try again!")
            }
        }
    }
}

</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background-image {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://i.pinimg.com/originals/65/79/4d/65794da1ce3e5e3537a281ad6eaba286.jpg');
            background-size: cover;
            background-position: center;
            z-index: -1;
            overflow: hidden;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                 left: 0;
                width: 100%;
                height: 100%; 
                background-color: rgba(255, 255, 255, 0.2); 
                z-index: -1;
                }
            }
</style>