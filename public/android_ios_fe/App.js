import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LoginComp from './LoginComp';
import NoteComp from './NotesComp';

export default function App() {
  const [loginRender,setLoginRender] = useState(true);
  if(loginRender)
  return (
    <LoginComp setLoginRender={setLoginRender} ></LoginComp>
    );
  return (
    <NoteComp></NoteComp>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#E3E3E3"
  },
  input:{
    width: 200,
    height: 50,
    borderRadius: 10,
    lineHeight: "100%",
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  button:{
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor:"#3BD16F",
    paddingTop: 10,
    margin: 10,
  }
});
