<template>
  <NavBar></NavBar>
  <div class="container">
    <router-link to="/create" class="btn btn-primary">Create New Post</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th width="30%">Title</th>
          <th width="20%">Created At</th>
          <th width="25%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through all the posts -->
        <tr v-for="(post) in posts" :key="post">
          <td>{{ post.title }}</td>
          <td>{{ this.formatDate(post.created_at) }}</td>
          <td>
            <button class="btn btn-primary m-1" @click="viewPost(post)">View</button>
            <button @click="editPost(post)" class="btn btn-warning">Edit</button>
            <form @submit.prevent="deletePost(post)" method="POST" style="display:inline">
              <button type="submit" class="btn btn-danger m-1"
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
import NavBar from  '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  async beforeMount() {
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
    allPosts() {
      return this.$store.dispatch('asyncLoadPosts');
    }
  },

  methods: {
    async deletePost(post) {
      const response = await axios.delete(this.$root.$data.apiUrl + "/delete/" + post.id);
      if (response.status == 200) {
        alert(post.title + " is Deleted");
        // reload list. getting all from db (not optimal, might change)
        const response = await axios.get(this.$root.$data.apiUrl + '/home');
        this.posts = response.data.posts;
      }
    },

    formatDate(value) {
      let date = new Date(value);
      const day = date.toLocaleString('default', { day: '2-digit' });
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.toLocaleString('default', { year: 'numeric' });
      return day + '-' + month + '-' + year;
    },

    viewPost(post){
      this.$router.push({
        path: '/show/' + post.id,
        params: {id: post.id}
      });
    },

    editPost(post){
      this.$router.push({
        path: '/edit/' + post.id,
        params: {id: post.id}
      });
    },
  }
}
</script>