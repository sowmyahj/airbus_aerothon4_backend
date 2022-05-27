<script setup>

defineProps({
  msg: {
    type: String,
    required: true
  },
  id:{
    type: Number,
    required: true
  }
})
</script>
<script>
export default{
    emits:["updateNoteDone"],
    methods:{
        onEnter: function(){
            console.log(this.msg,this.id)
            this.$emit('updateNoteDone',this.id,this.msg)
        }
    },
    created: function(){
        console.log("created",this)
    }
}
</script>

<template>
    <div class="note">
        <input v-model="msg" v-on:keyup.enter="onEnter"/>
    </div>
</template>

