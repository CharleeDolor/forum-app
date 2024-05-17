<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-end">
        <ul class="nav">
          <router-link to="/logout" class="col-6">Logout</router-link>
        </ul> 
    </div>
  </nav>
  <div class="container">
      <router-link to="/create" class="btn btn-primary">Create Post</router-link>
      <ul>
        <li v-for="(post, index) in this.posts" :key="index">{{ post.title }}</li>
      </ul>
  </div>
  <!-- the router view is where all the routes are rendered -->
  <router-view/>
</template>

<script>
import axios from 'axios';
export default {
  async beforeMount(){
    const response = await axios.get(this.$root.$data.apiUrl + '/home');
    this.posts = response.data.data;
  },
  name: 'HomePage',
  data(){
    return {
      posts: []
    }
  }
}
</script>