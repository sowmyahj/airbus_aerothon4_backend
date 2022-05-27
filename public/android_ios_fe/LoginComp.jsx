import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App(props) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const buttonPressed = async () => {
    const res = await fetch("http://192.168.51.229:3002/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const data = await res.json();
    if(data.response == "success"){
        props.setLoginRender(false)
    }
  }
  return (
        <View style={styles.container}>
        <View class="input_username" style={styles.input}>
            <TextInput type="text" name="username" placeholder="Username" onChangeText={newText => setUsername(newText)}/>
        </View>
        <View style={styles.input}>
            <TextInput type="password" name="password" placeholder="Password" onChangeText={newText => setPassword(newText)}/>
        </View >
        <Pressable title='Login' style={styles.button} onPress={buttonPressed}> 
          <Text style={{
            textAlign:"center",
            fontSize:16,
            fontWeight:"bold",
            }}> Login</Text> 
          </Pressable>
    </View>
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
