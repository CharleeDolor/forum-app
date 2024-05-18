<template>
    <div class="container">
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
export default{
    data(){
        return {
            title: '',
            body: '',
            errors: {}
        };
    },

    methods:{
        async createPost(){
            try {
                var post = {
                    title: this.title,
                    body: this.body
                }
                // const response = await axios.post("http://127.0.0.1:8000/api" + '/create', {
                //     title: this.title,
                //     body: this.body
                // });

                await this.$store.dispatch('asyncCreatePost', post);
                this.title = '';
                this.body = '';
                this.$router.push('/home');
            } catch (error) {
                alert("Something went wrong. Please try again")
            }
        }
    }
}

</script>