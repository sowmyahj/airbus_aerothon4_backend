<script setup>
import UpdatingNoteVue from '../components/UpdatingNote.vue';
import UpdatingNote from '../components/UpdatingNote.vue';
defineProps({
  msg: {
    type: String,
    required: true
  },
  id:{
    type: Number,
    required: true
  },
    updating: {
        type: Boolean,
        required: true
    }
})
</script>

<script>
export default {
    emits:["deleteNote","updateNoteDone","updatingNote"],
}
</script>
<template>
    <div v-if="!updating" class="note">
        <span>{{msg}}</span>
        <div class="buttons">
            <button class="edit_button" @click="this.$emit('updatingNote',id)">Update</button>
            <button class="delete_button" @click="this.$emit('deleteNote',id)">Delete</button>
        </div>
    </div>

    <UpdatingNote v-if="updating" :id="id" :msg="msg" @updateNoteDone="(id,msg)=>this.$emit('updateNoteDone',msg,id)"/>
</template>

