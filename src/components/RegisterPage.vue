<template>
  <div class="container mt-5 w-25">
    <div class="background-image"></div>
    <h4>Registration Form</h4>
    <form @submit.prevent="registerUser">
      <div class="form-group mb-3">
        <input type="text" class="form-control" id="name" v-model="name" @input="clearErrors('name')" placeholder="Enter name" required>
      </div>
      <div class="form-group mb-3">
        <input type="email" class="form-control" id="email" v-model="email" @input="clearErrors('email')" placeholder="Enter email" required>
        <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
      </div>
      <div class="form-group mb-3">
        <input type="password" class="form-control" id="password" v-model="password" @input="clearErrors('password')" placeholder="Password" required>
        <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
      </div>
      <div class="form-group mb-3">
        <input type="password" class="form-control" id="confirm" v-model="confirm" placeholder="Confirm Password" required>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn-reg btn-primary mt-3 w-48">Register</button>
        <button type="button" @click="cancel" class="btn-cancel btn-secondary mt-3 w-48">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm: '',
      errors: {}
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(this.$root.$data.apiUrl + '/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm
        });
        if (response.status === 201) {
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirm = '';
          alert(response.data.message);
          this.$router.push('/');
        }
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    clearErrors(field) {
      this.errors[field] = null;
    },
    cancel() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirm = '';
      this.errors = {};
      this.$router.go(-1); // Go back to the previous page
      // Alternatively, you can redirect to a specific route:
      // this.$router.push('/your-route');
    }
  }
};
</script>

<style scoped>
.container {
  background: rgb(0, 0, 0);
  border-radius: 10px;
  padding: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
  max-width: 500px;
  text-align: center;
  background-color: rgba(165, 199, 187, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-reg {
  width: 48%;
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

.btn-reg:hover {
  background: linear-gradient(to bottom, #57bcbe, white);
  color: black;
  border: 1px solid #408d8e;
  transform: scale(1.02);
  border-radius: 5rem;
}

.btn-cancel {
  width: 48%;
  margin-top: 15px;
  padding: 10px;
  border-radius: 15px;
  font-size: 18px;
  box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  background-color: #d9534f;
  border: none;
  color: white;
  cursor: pointer;
  border: 1px solid #000000;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: linear-gradient(to bottom, #e57373, white);
  color: black;
  border: 1px solid #d43f3a;
  transform: scale(1.02);
  border-radius: 5rem;
}

.background-image {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://i.pinimg.com/originals/19/b2/8c/19b28c8372aaec65623f7ee7332e74be.gif');
  background-size: cover;
  background-position: center;
  z-index: -1;
  overflow: hidden;
  filter: blur(5px);
}

.background-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(75, 164, 166, 0.4);
  z-index: -1;
}
</style>
