<template>
    <nav class="navbar">
        <div class="container d-flex justify-content-end">
            <ul class="nav">
                <router-link to="/home" class="nav-link">Home</router-link>
                <router-link to="/logout" class="nav-link">Logout</router-link>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
/* Styles for router links */
    .nav-link {
        padding: 10px;
        border-radius: 15px;
        box-shadow: rgba(45, 35, 66, 0.5) 0 2px 4px, rgba(45, 35, 66, 0.5) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 250px;
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

</style>
