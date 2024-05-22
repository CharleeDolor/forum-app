<template>
    <nav class="navbar">
      <div class="container d-flex justify-content-end">
        <ul class="nav">
          <router-link to="/home" class="nav-link">Home</router-link>
          <a @click="showLogoutDialog" class="nav-link">Logout</a>
        </ul>
      </div>
    </nav>
  
    <div v-if="isDialogVisible" class="dialog-overlay">
      <div class="dialog">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div class="dialog-buttons">
          <button @click="confirmLogout" class="confirm-button">Yes</button>
          <button @click="hideLogoutDialog" class="cancel-button">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDialogVisible: false,
      };
    },
    methods: {
      showLogoutDialog() {
        this.isDialogVisible = true;
      },
      hideLogoutDialog() {
        this.isDialogVisible = false;
      },
      confirmLogout() {
        this.$router.push('/logout');
      },
    },
  };
  </script>
  
  <style scoped>

.container {
    position: relative;


  }
  /*router links*/
  .navbar {
    position: fixed;
  top: 10px; /* Adjust as needed */
 right: 50px; /* Adjust as needed */
  z-index: 1000;
}
  .nav-link {
    padding: 10px;
    border-radius: 15px;
    box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    cursor: pointer;
    transition: all 0.3s ease;

    margin-right: 10px; 
    text-decoration: none;
  }
  
  .nav-link:nth-child(1) {
    background-color: #00b8e6;
    color: white;
    border: 1px solid #000000;
  }
  
  .nav-link:nth-child(2) {
    background-color: #ff3333;
    color: white;
    border: 1px solid #000000;
  }
  
  .nav-link:nth-child(1):hover {
    background: linear-gradient(to bottom, #7cadec, white);
    color: black;
    border: 1px solid #7cadec;
    transform: scale(1.02);
  }
  
  .nav-link:nth-child(2):hover {
    background: linear-gradient(to bottom, #ff6060, white);
    color: black;
    border: 1px solid #f57171;
    transform: scale(1.02);
  }
  
  /*logout*/
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .dialog {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    text-align: center;
  }
  
  .dialog h3 {
    margin-bottom: 10px;
  }
  
  .dialog-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .confirm-button, .cancel-button {
    width: 100px; 
    padding: 10px 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .confirm-button {
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
  
  .cancel-button {
     padding: 10px;
     border-radius: 15px;
     box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
     background-color: #6a6767;
     border: none;
     color: white;
     cursor: pointer;
     border: 1px solid #000000;
     transition: all 0.3s ease; 
 
  }
  
  .confirm-button:hover {
    background: linear-gradient(to bottom, #ff6060, white);
    color: black;
    border: 1px solid #f57171;
    transform: scale(1.02);
  }
  
  .cancel-button:hover {
    background: linear-gradient(to bottom, #6a6767, white);
    color: black;
    border: 1px solid #6a6767;
    transform: scale(1.02);
 
  }
  </style>
  