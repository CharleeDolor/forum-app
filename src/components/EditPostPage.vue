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

        <!-- Error Modal -->
        <div v-if="showErrorModal" class="modal-overlay">
            <div class="modal-content">
                <p>{{ errorMessage }}</p>
                <button @click="closeErrorModal" class="btn-cancel">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    async beforeMount() {
        const response = await axios.get(this.$root.$data.apiUrl + "/show/" + this.$route.params.id)
        this.initialTitle = response.data.post.title
        this.initialBody = response.data.post.body
        this.title = this.initialTitle
        this.body = this.initialBody
    },
    data() {
        return {
            initialTitle: '',
            initialBody: '',
            title: '',
            body: '',
            showErrorModal: false,
            errorMessage: ''
        }
    },
    methods: {
        async editPost() {
            // Check if title or body has been changed
            if (this.title === this.initialTitle && this.body === this.initialBody) {
                this.errorMessage = 'No changes were made to the post. Please update.';
                this.showErrorModal = true;
                return;
            }

            try {
                const response = await axios.put(this.$root.$data.apiUrl + "/update/" + this.$route.params.id, {
                    title: this.title,
                    body: this.body
                });

                if (response.status == 200) {
                    this.title = '';
                    this.body = '';
                    alert('Post edited successfully');
                    this.$router.go(-1);
                }
            } catch (error) {
                this.errorMessage = "An error occurred while updating the post.";
                this.showErrorModal = true;
            }
        },
        closeErrorModal() {
            this.showErrorModal = false;
        }
    }
}
</script>

<style scoped>
.container {
    position: relative;
    margin-top: 10%;
    width: 100%;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    box-sizing: border-box; 
    padding: 20px;
    overflow: hidden; 
}

/* Add your other CSS styles here */

.background-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://i.pinimg.com/originals/16/69/e5/1669e57761ccc67fa5e31a09a54764d0.gif');
    background-size: cover;
    background-position: center;
    z-index: -1;
    overflow: hidden;
    filter: blur(3px); 
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


/* Buttons */
.button-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
}

.btn-back,
.btn-submit {
    font-size: 19px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    border: none;
    color: white;
    cursor: pointer;
    border: 1px solid #000000;
    transition: all 0.3s ease;
    text-decoration: none;
    margin-right: 10px;
    margin-bottom: 100px;
}

.btn-back {
    background-color: #6a6767;
}

.btn-back:hover {
    background: linear-gradient(to bottom, #6a6767, white);
    color: black;
    border: 1px solid #6a6767;
    transform: scale(1.02);
}

.btn-submit {
    background-color: #0096c7;
}

.btn-submit:hover {
    background: linear-gradient(to bottom, #0096c7, white);
    color: black;
    border: 1px solid #0096c7;
    transform: scale(1.02);
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 15px;
    width: 300px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
}

.btn-confirm,
.btn-cancel {
    margin: 10px 5px;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    transition: background 0.3s ease;
}

.btn-cancel {
    background-color: #31b0d5;
    color: white;
}

.btn-cancel:hover {
    background: linear-gradient(to bottom, #31b0d5, white);
    color: black;
}
</style>
