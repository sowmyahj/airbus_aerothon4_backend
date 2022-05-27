import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NoteComp() {
    const [newNote,setNewNote] = useState("");
    const [newNoteText,setNewNoteText] = useState("");
    const [newValue,setNewValue] = useState("");
    const [notes,setNotes] = useState([]);
    const addNote = async () =>{
        if(newNoteText != ""){
            const res  = await fetch("http://192.168.51.229:3002/api/notes/add",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note:newNoteText
                })
            });
            const data = await res.json();
            if(data.done){
                const myNotes = notes;
                myNotes.push({
                    id:data.note.id,
                    msg:data.note.value,
                    updating:false,
                    showButton:false
                })
                setNotes(myNotes);
            }
            setNewNoteText("");
        }
    }
    const getData = async () => {
        const res = await fetch("http://192.168.51.229:3002/api/notes");
        const data = await res.json();
        if(data.notes){
            const myNotes = [];
            for(let note of data.notes){
                // console.log(note);
                myNotes.push({id:note.id,msg:note.value,updating:false,showButton:false});
            }
            setNotes(myNotes);
        }
    }
    const onUpdatePress = (id,value) => {
        setNewValue(value)
        const myNotes = notes.map(note => {
            if(note.id == id){
                note.updating = true;
                note.showButton = false;
            }
            return note;
        })
        setNotes(myNotes);
    }
    const doneUpdate = async (id)=>{
        const res  = await fetch("http://192.168.51.229:3002/api/notes/update",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                value:newValue
            })
        });
        const data = await res.json();
        if(data.done){
            const myNotes = notes.map(note=>{
                if(note.id == id){
                    note.msg = newValue;
                    note.updating = false;
                }
                return note;
            })
            setNotes(myNotes);
            setNewValue("");
        }
    }

    const deleteNote = async(id)=>{
        const res  = await fetch("http://192.168.51.229:3002/api/notes/delete",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
            })
        });
        const data = await res.json();
        if(data.done){
            const myNotes = notes.filter(note=>note.id != id)
            setNotes(myNotes);
        }
    }
    const showButtonId = (id) =>{
        console.log("long pressed",id)
        const myNotes = notes.map(note => {
            if(note.id == id){
                note.showButton = !note.showButton;
            }else{
                note.showButton = false;
            }
            return note;
        })
        setNotes(myNotes);
    }
    useEffect(() => {
        getData();
    },[]);
    let renderedNotes = notes.map((note,index) => {
        if(!note.updating)
        return (
            <View key={note.id} style={styles.noteInputCont}>
                <Pressable onLongPress={()=>showButtonId(note.id)} style={styles.note}><Text>{note.msg}</Text></Pressable>
                {note.showButton && <View style={styles.buttons}>
                    <Pressable style={styles.updateButton} onPress={()=>onUpdatePress(note.id,note.msg)}><Text>Update</Text></Pressable>
                    <Pressable style={styles.delelteButton} onPress={()=>deleteNote(note.id)}><Text>Delete</Text></Pressable>
                </View>}

            </View>
        );
        else
            return(
                <View key={note.id} style={styles.updatingNote}>
                    <TextInput value={newValue} onChangeText={(newT)=>setNewValue(newT)}/>
                    <Pressable style={styles.updateButton} onPress={()=>doneUpdate(note.id)}><Text>Done</Text></Pressable>
                </View>
            );
    });
  return (
    <View style={styles.container} onTouchEnd={()=>{
        // console.log("oresse")
        // const mynotes = notes.map(note=>{
        //     note.showButton = false;
        //     note.updating = false;
        //     return note;
        // });
        // console.log(mynotes)
        // setNotes(mynotes);
    }}>
        <View style={styles.inputContainer}>
            <TextInput  style={styles.input} onChangeText={newText=>{setNewNoteText(newText)}} value={newNoteText}/>
            <Pressable style={styles.greenButton}>
                <Text style={{textAlign:"center",padding:12,fontWeight:"bold"}} onPress={addNote}>Add</Text>
            </Pressable>
        </View>
        <View style={styles.noteContainer}>
            {renderedNotes}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor:"#E3E3E3"
  },
  input:{
    width: 180,
    height: 50,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor:"#3BD16F",
    borderWidth:2,
    borderStyle:"solid",
    marginBottom:10,
  },
  button:{
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor:"#3BD16F",
    paddingTop: 10,
    margin: 10,
  },
  inputContainer:{
    flexDirection: "row",
    height: 50,
    marginBottom:20,
    padding:0,
    justifyContent:"space-between",
    alignItems:"center",
  },
  greenButton:{
    backgroundColor:"#3BD16F",
    width: 80,
    height: 50,
    borderRadius: 10,
  },
  noteContainer:{
    width: 300,
  },
  note:{
    width: "100%",
    borderLeftWidth: 2,
    borderLeftColor: "#3BD16F",
    borderStyle:"solid",
    borderRadius: 10,
    marginBottom:10,
    padding:10,
    // backgroundColor:"rgba(255,255,255,0.3)",
  },
  noteInputCont:{
      position:"relative",
  },
  updateButton:{
    width:80,
    height:30,
    backgroundColor:"#ffd900",
    borderRadius:10,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",

  },
  delelteButton:{
    width:80,
    height:30,
    backgroundColor:"#ff6200",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
  },
  buttons:
      {display:"flex",flexDirection:"row",justifyContent:"space-around"}
  ,
  displayNone:{
    display:"none"
  },
    updatingNote:{
        width: "100%",
        borderLeftWidth: 2,
        borderLeftColor: "#ffd900",
        borderStyle:"solid",
        borderRadius: 10,
        marginBottom:10,
        padding:10,
    }

});
