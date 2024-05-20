<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="background-image"></div>
    <router-link to="/create" class="btn-create">Create New Post</router-link>
    <table class="table">
      <thead>
        <tr>
          <th width="30%">Title</th>
          <th width="20%">Created At</th>
          <th width="25%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through all the posts -->
        <tr v-for="(post, index) in posts" v-bind:key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ this.formatDate(post.created_at) }}</td>
          <td>
            <button class="btn-view btn-primary m-1" @click="viewPost(post)">View</button>
            <button @click="editPost(post)" class="btn-edit btn-warning">Edit</button>
            <form @submit.prevent="deletePost(post, index)" method="POST" style="display:inline">
              <button type="submit" class="btn-delete btn-danger m-1"
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
import NavBar from  '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  },
  async mounted() {
    const response = await axios.get(this.$root.$data.apiUrl + '/home');
    this.posts = response.data.posts;
  },
  name: 'HomePage',
  data() {
    return {
      posts: []
    }
  },
  computed: {
    allPosts() {
      return this.$store.dispatch('asyncLoadPosts');
    }
  },

  methods: {
    async deletePost(post, index) {
      const response = await axios.delete(this.$root.$data.apiUrl + "/delete/" + post.id);
      if (response.status == 200) {
        this.posts.splice(index, 1);
        alert(post.title + " is Deleted");
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

<style scoped>
  /*buttons*/
  .btn-create {
      padding: 10px;
      border-radius: 15px;
      box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
      background-color: #5293f5;
      border: none;
      color: white;
      cursor: pointer;
      border: 1px solid #000000;
      transition: all 0.3s ease; 
      margin-top: 50px;
        margin-right: 50px; 
        text-decoration: none;
    }

  .btn-create:hover {
    background: linear-gradient(to bottom, #7cadec, white);
        color: black;
        border: 1px solid #7cadec;
        transform: scale(1.02);
    }

  .btn-view {
      padding: 10px;
      border-radius: 15px;
      box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
      background-color: #e6b800;
      border: none;
      color: white;
      cursor: pointer;
      border: 1px solid #000000;
      transition: all 0.3s ease; 
    }

  .btn-view:hover {
      background: linear-gradient(to bottom, #fad338, white);
      color: black;
      border: 1px solid #fad338;
      transform: scale(1.02);
    }

    .btn-edit {
     padding: 10px;
     border-radius: 15px;
     box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
     background-color: #00b33c;
     border: none;
     color: white;
     cursor: pointer;
     border: 1px solid #000000;
     transition: all 0.3s ease; 
   }

 .btn-edit:hover {
     background: linear-gradient(to bottom, #0cd850, white);
     color: black;
     border: 1px solid #0cd850;
     transform: scale(1.02);
  
   }

   .btn-delete {
     padding: 10px;
     border-radius: 15px;
     box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
     background-color: #ff0000;
     border: none;
     color: white;
     cursor: pointer;
     border: 1px solid #000000;
     transition: all 0.3s ease; 
   }

 .btn-delete:hover {
     background: linear-gradient(to bottom, #ec2b2b, white);
     color: black;
     border: 1px solid #ec2b2b;
     transform: scale(1.02);
  
   }

  /*bg image*/
  .background-image {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://i.pinimg.com/originals/e1/f4/d8/e1f4d8ebfe1c90e8500fff3c6acf4ab9.gif');
        background-size: cover;
        background-position: center;
        z-index: -1;
        filter: blur(5px); 
         }
       

/* Table Design */
      .modal-group {
        margin: 1rem;
        display: flex;
        flex-direction: column;
        align-items: start;
      }
      table {
        background: #4ac2ae;
        border-radius: 10px; 
        border-collapse: collapse;
        margin: auto;
        padding: 10px;
        width: 80%;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 1); 
        animation: float 5s infinite;
      }

      th {
        background: rgb(255, 255, 255, 0.5);
        background: #44c0ab;
        border-bottom: 4px solid #471c12;
        border-right: 1px solid #343a45;
        font-size: 20px;
        font-weight: bold;
        padding: 24px;
        text-align: center;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        vertical-align: middle;
      }

      th:first-child {
        border-top-left-radius: 10px; 
      }

      th:last-child {
        border-top-right-radius: 10px;
        border-right: none;
      }


      tr {
        
        border-top: 1px solid #c1c3d1;
        border-bottom: 1px solid #3fbda8;
        color: #432d27;
        font-size: 16px;
        font-weight: normal;
        text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
      }

      tr:hover td {
        background: #1d8876;
        color: #ffffff;
        border-top: 1px solid #277367;
      }


      tr:first-child {
        border-top: none;
      }

      tr:last-child {
        border-bottom: none;
      }



      tr:nth-child(odd):hover td {
        background: #3db7a2;
      }

      tr:last-child td:first-child {
        border-bottom-left-radius: 20px; 
      }

      tr:last-child td:last-child {
        border-bottom-right-radius: 20px;
      }
      /* Actions column */
      td:nth-child(3) {
          text-align: center;
        }

      td {
        background: rgb(255, 255, 255, 0.5);
        padding: 20px;
        vertical-align: middle;
        font-weight: 300;
        font-size: 18px;
        text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
        border-right: 1px solid #1e5b51;
      }

      td:last-child {
        border-right: none;
      }
</style>
