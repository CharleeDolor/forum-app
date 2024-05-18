<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-end">
      <ul class="nav">
        <router-link to="/logout" class="col-6">Logout</router-link>
      </ul>
    </div>
  </nav>
  <div class="container">
    <router-link to="/create" class="btn btn-primary">Create New Post</router-link>
    <!-- <a href="" class="btn btn-primary">Create New Post</a> -->
    <table class="table-striped">
      <thead>
        <tr>
          <th width="30%">Title</th>
          <th width="25%">Body</th>
          <th width="20%">Created At</th>
          <th width="25%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through all the posts -->
        <tr v-for="(post) in posts" :key="post">
          <td style="padding: 10px;">{{ post.title }}</td>
          <td style="padding: 10px;">{{ }}</td>
          <td style="padding: 10px;">{{ post.created_at }}</td>
          <td>
            <a href="" class="btn btn-primary mr-2 btn-sm">View</a>
            <a href="" class="btn btn-secondary mr-2 btn-sm">Edit</a>
            <form @submit.prevent="deletePost(post)" method="POST" style="display:inline">
              <button type="submit" class="btn btn-danger mr-2 btn-sm"
                onclick="return confirm('Are you sure you want to delete this post?')">Delete</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- the router view is where all the routes are rendered -->
  <router-view />
</template>

<script>
import axios from 'axios';

export default {
  async beforeMount(){
    const response = await axios.get(this.$root.$data.apiUrl + '/home');
    this.posts = response.data.posts;
  },
  name: 'HomePage',
  data() {
    return {
      // posts: this.$store.getters.posts,
      posts: []
    }
  },
  computed: {
    allPosts(){
      return this.$store.dispatch('asyncLoadPosts');
    }
  },

  methods:{
    async deletePost(post){
      const response = await axios.delete(this.$root.$data.apiUrl + "/delete/" + post.id);
      if(response.status == 201){
        alert(post.title + " is Deleted");
      }
    }
  }
}
</script>