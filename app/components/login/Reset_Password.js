import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import styles from './LoginStyle'
import {  Entypo } from '@expo/vector-icons'; 
import axios from 'axios'
import { IP, MEMBERAPPURL } from './Constants'
import {DevSettings} from 'react-native';


// Import package from node modules

// Immediately reload the React Native Bundle

export default function Reset_Password({navigation, route}) {
  const id = route.params.id;

  const [oldpassword,setOldPassword] = useState('')
  const [newpassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [errorCode, setErrorCode] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const CancelBTN = ({ onPress, title }) => (
    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
    <TouchableOpacity onPress={()=>
    {
      setModalVisible(!modalVisible)}
     }
      style={[styles.cancelBtnContainer,{marginLeft:170, margin:0}]}>
      <Text style={[styles.appButtonText]}><Entypo name="cross" size={24} color="#fff" /></Text>
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container,{justifyContent:'space-evenly', alignItems:'center' }]} behavior="padding"
    >

<Modal
        style={styles.modalView}
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{height:150,width: "70%",flexDirection:'column',justifyContent:'center', paddingTop: 1}]}>
          <CancelBTN title="X" size="sm" backgroundColor="#007bff" />
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                padding: 1,
                fontSize: 14,
                marginTop: 20,
              }}
            >
             Password Changed Successfully!
            </Text>
            
          </View>
        </View>
      </Modal>
  <View style={styles.inputContainer}>
  
    <Text style={{color:'#fff', marginLeft:5, opacity:0.79}}>OLD PASSWORD</Text>
    <TextInput
      value={oldpassword}
      
      onChangeText={text =>setOldPassword(text)}
      style={styles.input}/>
      <Text style={{color:'#fff', marginLeft:5, opacity:0.79}}>NEW PASSWORD</Text>
    <TextInput
      value={newpassword}
      
      onChangeText={text =>setNewPassword(text)}
      style={styles.input}/>
      <Text style={{color:'#fff', marginLeft:5, opacity:0.79}}>RE-ENTER PASSWORD</Text>
    <TextInput
      value={confirmPassword}
      
      onChangeText={text =>setConfirmPassword(text)}
      style={styles.input}/>
      <Text style={{color:'red'}}>{errorCode}</Text>
      
      <TouchableOpacity
    
        onPress={() =>{
          
          if(newpassword.length > 4){
            if(newpassword == confirmPassword){
                axios
              .post(MEMBERAPPURL + `resetPassword`, {
                password: oldpassword,
                newPassword: newpassword,
                id:id,
              })
              .then((response) => {
                // DevSettings.reload()
                setModalVisible(!modalVisible);
                //console.log(response.data)
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setErrorCode('');
                
              })
              .catch((err) => {
                setErrorCode(err.response.data.error);
              });
              }
              else{
                setErrorCode("Password doesn't match!");
              }
          }
          else if(newpassword.length < 4){
            setErrorCode("Password too short")
          }
              
            // if(email == 'sourabh@gmail.com' && password == '12345')
                
        }}
        style={[{marginTop:40},styles.button]}
        >
            <Text style={styles.buttonText}>
                RESET PASSWORD
            </Text>
        </TouchableOpacity>
  </View>
  </View>
  
  )
}