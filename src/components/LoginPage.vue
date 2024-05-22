<template>
  <div class="container" >
    <div class="row">
      <div class="background-image"></div>
      <h4>Enter your email and password</h4>
      <form @submit.prevent="loginUser" class="col-12">
        <div class="form-group mt-3">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required @input="clearErrors">
          <small class="text-danger" v-if="errors">{{ errors }}</small>
        </div>
        <div class="form-group mt-3">
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required @input="clearErrors">

        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
    </div>
    <div class="row">
      <div class="col-12">
          <p class="mt-3 text-left">Don't have an account? <router-link to="/register" class="link-reg">Register here!</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: null
    };
  },
  methods: {
    async loginUser() {
      try {
        // Call the login API endpoint using Axios
        // the /login is an API route that define in the backend using Laravel
        const response = await axios.post(this.$root.$data.apiUrl + '/login', {
          email: this.email,
          password: this.password
        });
        if (response.status === 201) {
          // Successful login, handle token storage and redirection
          // the token will be stored in the local storage to guard the routes
          // this will prevent to access the route without login
          localStorage.setItem('token', response.data.token);
          this.$router.push('/home');
        }
      } catch (error) {
        // Handle login error, show error message to the user
        // the errors will be displayed in the template using v-if directives
        this.errors = error.response.data.message;
      }
    },
    clearErrors() {
      // Clear error message for the specified field
      // this method is called when the user types in the input field triggering the event handler 
      this.errors = null;
    }

  }
};
</script>
<style scoped>
/*container*/


  .container {
      margin-right: 5px;
      background: rgb(0, 0, 0);
      border-radius: 10px;
      padding: 60px;  
      max-width: 400px;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.4); 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
   }

   /*bg image*/
 .background-image {
      position: fixed;
      top: 0;
      left: 0;
      width: 69%;
      height: 100%;
      background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/feeec363616517.5ab85b6d0686f.gif');
      background-size: cover;
      background-position: center;
      z-index: -1;
      overflow: hidden;
      border: 1px solid #234a4b;
         &::before {
         content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%; 
          background-color: rgba(70, 109, 110, 0.3); 
          z-index: -1;
   
         }
       }

  /*button*/
  .btn-login {
      width: 80%;
      margin-top: 15px;
      padding: 10px;
      border-radius: 15px;
      font-size: 18px;
      box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
      background-color: #4ba4a6;
      border: none;
      color: white;
      cursor: pointer;
      border: 1px solid #000000;
      transition: all 0.3s ease; 
    }

  .btn-login:hover {
      background: linear-gradient(to bottom, #57bcbe, white);
      color: black;
      border: 1px solid #408d8e;
      transform: scale(1.02);
      border-radius: 5rem;
      border: 1px solid #000000;
    }

  .close {
      background: none;
      border: none;
      font-size: 1.5rem;
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
    }

  .fade {
      opacity: 1;
      transition: opacity 0.15s linear;
     }

  .show {
      display: block;
    }

  .alert-dismissible {
      position: relative;
    }

    /*link underline*/
    .link-reg {
           
            color: #000000;
        }
        
        
        .link-reg:hover {
            text-decoration: underline;
            transform: scale(1.1); 
             color: rgb(5, 99, 193); 
             
        }

   .h4, h4 {
           
            color: #000000;
        }

</style>
