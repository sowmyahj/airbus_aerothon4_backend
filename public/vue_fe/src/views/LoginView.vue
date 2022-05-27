<script setup>
const username = "";
const password = "";
</script>
<template>
    <form action="/" method="get" class="login_form" v-on:submit.prevent="()=>this.$emit('formSubmit',username,password)">
        <div class="input_username">
            <input type="text" name="username" placeholder="Username" :value="username" @input="event => username = event.target.value">
        </div>
        <div class="input_password">
            <input type="password" name="password" placeholder="Password" v-model="password">
        </div>
        <div class="input_submit">
            <button>Login</button>
        </div>
    </form>
</template>

<style>

body {
    background-color: var(--white);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    display: flex;
    height: 90vh;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

:root {
    --green1: #01B636;
    --green2: #3BD16F;
    --green3: #74E39A;
    --white: #E3E3E3;
    --black: #989898;
}

.login_form {
    width: 300px;
    padding: 20px;
    /* border: 1px solid #ccc; */
    border-radius: 10px;
    /* background-color: rgba(255, 255, 255, 0.5); */
    /* background-color: var(--green3); */
    ;
}

.input_username {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

.input_username input {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 100%;
    height: 100%;
    padding: 20px;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 1.5rem;
}

.input_username input:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 1);
}

.input_password {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

.input_password input {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 100%;
    height: 100%;
    padding: 20px;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 1.5rem;
}

.input_submit {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

.input_submit button {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 100%;
    height: 100%;
    padding: 20px;
    border: none;
    background-color: var(--green1);
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 1.5rem;
}
</style>
