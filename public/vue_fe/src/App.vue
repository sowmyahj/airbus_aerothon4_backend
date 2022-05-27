<script setup>
import NotesView from './views/NotesView.vue';
import LoginView from './views/LoginView.vue';


</script>

<script>
  export default{
    data(){
      return{
        loginRender: true
      }
    },
    methods : {
      async formSubmit(username,password){
        const res = await fetch('http://localhost:3002/api/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        }); 
        const data = await res.json();
        if(data.response){
          this.loginRender = false;
        }
      }
    },
    created(){
      console.log("created",this.loginRender)
    }
  }
</script>

<template>
  <LoginView v-if="loginRender" @formSubmit="formSubmit"/>
  <NotesView v-if="!loginRender"/>
</template>

<style>

</style>
