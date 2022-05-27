<script setup>

import NoteVue from '../components/Note.vue';

</script>

<script>
export default{

    data(){
        return{
            notes : [],
            newNote: '',
        }
    },
    methods : {
        async addNote(){
            if(this.newNote != ""){
                const res = await fetch('http://localhost:3002/api/notes/add',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        note: this.newNote
                    })
                });
                const data = await res.json();
                if(data.done){
                    this.notes.push({
                        id: data.note.id,
                        msg: data.note.value,
                        updating: false
                    })
                }
                this.newNote = ''
            }
        },
        async deleteNote(id){
            const res = await fetch('http://localhost:3002/api/notes/delete',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const data = await res.json();
            if(data.done)
                this.notes = this.notes.filter(note => note.id !== id)
        },
        async updateNoteDone(msg,id){
            const res = await fetch('http://localhost:3002/api/notes/update',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    value: msg
                })
            });
            const data = await res.json();
            console.log(data)
            if(data.done){
                this.notes = this.notes.map(n => {
                    if(n.id === id){
                        n.msg = data.note.value;
                        n.updating = false;
                    }
                    return n
                })
            }else{
                this.notes = this.notes.map(n => {
                    if(n.id === id){
                        n.updating = false;
                    }
                    return n
                })
            }
        },
        updatingNote(id){
            this.notes = this.notes.map(n => {
                if(n.id === id){
                    n.updating = true
                }
                return n
            })
        }
    },
    async created(){
        const response = await fetch('http://localhost:3002/api/notes')
        const data = await response.json()
        console.log(data.notes)
        for(let note of data.notes){
            console.log(note)
            this.notes.push({
                id: note.id,
                msg: note.value,
                updating: false
            })
        }
    }
}
</script>
<template>
    <div class="container">
        <div class="input_container">
            <input type="text" name="note" id="note" v-model="newNote" v-on:keyup.enter="addNote"/>
            <button @click="addNote">Add</button>
        </div>
        <div class="note_container">
            <NoteVue :key="note.id" v-for="note in notes" :updating="note.updating" :id="note.id" :msg="note.msg" @deleteNote="deleteNote" @updateNoteDone="updateNoteDone" @updatingNote="updatingNote"/>
        </div>
    </div>
</template>

<style>
.container {
    position: fixed;
    overflow: scroll;
    background-color: var(--white);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    height: 100vh;
    box-sizing: border-box;
    top:1rem;
    left: 40%;
}

.container::-webkit-scrollbar {
  display: none;
}

:root {
    --green1: #01B636;
    --green2: #3BD16F;
    --green3: #74E39A;
    --white: #E3E3E3;
    --black: #989898;
}

.input_container {
    height: 4rem;

}

.input_container input {
    height: 80%;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 1.5rem;
    padding: 1rem;
    box-sizing: border-box;
}

.input_container button {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    height: 100%;
    margin-left: 2rem;
    padding: 1rem;
    border: none;
    background-color: var(--green2);
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 1.5rem;
}

.note {
    width: 100%;
    border-left: 5px solid var(--green2);
    border-radius: 0.5rem;
    height: 4rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 0;
    color: black;
}

.note button {
    height: 4rem;
    width: 5rem;
    border: none;
    /* margin-left: 1rem; */
    margin: 0;
    font-size: 1rem;
    opacity: 0;
    transition: all 0.3s;
}

.edit_button {
    background-color: rgb(255, 217, 0);
}

.delete_button {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: rgb(255, 98, 0);
}

.note .buttons:hover button {
    opacity: 1;
}

.note input {
    background-color: none;
    border: none;
    width: 100%;
    height: 100%;
    background: none;
    font-size: 0.9rem;
    color: rgb(255, 145, 0);
}

.note input:focus {
    outline: none;
}

</style>
