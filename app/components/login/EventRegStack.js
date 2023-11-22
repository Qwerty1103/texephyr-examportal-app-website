import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, FlatList, Pressable, Image, ToastAndroid, BackHandler} from 'react-native'
import React, { useState, useEffect } from 'react'
import Event from './EventRegisteration'
import { createStackNavigator } from '@react-navigation/stack';
import Modal from "react-native-modal";
import styles from './LoginStyle'
import EventRegisteration from './EventRegisteration';
import {  Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import QRCode from 'react-native-qrcode-svg'
import { Card } from 'react-native-paper';
import axios from "axios";
import { IP, MEMBERAPPURL } from "./Constants";
import { USERAPIURL } from './Constants';
import { StackActions } from '@react-navigation/native';

const Stack = createStackNavigator();

function Next({route, navigation}){
 
  const [phone, setPhone] = useState("")
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `fetchMember`, { id: route.params.id })
      .then((response) => {
        setPhone(response.data.phone)

      }
        )

      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);

    const [confirmVisible, setConfirmVisible] = useState(false);

    const [onlineSelect, setOnline] = useState(false);
    const [offlineSelect, setOffline] = useState(false);
    const value = 'string';
    const getRef = 'getRef';

    const handleOnline = (checkValue) => {
        setOnline(!checkValue);
      };
    
    const handleOffline = (checkValue) => {
        setOffline(!checkValue);
    };

    const CancelBTN = ({ onPress, title }) => (
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
        <TouchableOpacity onPress={()=>
        {
          setConfirmVisible(!confirmVisible)}
         }
          style={[styles.cancelBtnContainer,{marginLeft:170, margin:0}]}>
          <Text style={[styles.appButtonText]}><Entypo name="cross" size={24} color="#fff" /></Text>
        </TouchableOpacity>
        </View>
      );
    return(
        <ScrollView style={[{backgroundColor:'#171717', flex: 1}]}>
        <Text style={styles.paymentText}>Mode Of Payment</Text>
        <View style={{backgroundColor:'#171717'}}>
        <View style={styles.itemPayment}>
        <View style={[styles.card,{marginBottom:10}]}>
        <TouchableWithoutFeedback onPress={() => handleOnline(onlineSelect)} >
            <MaterialCommunityIcons
                name={onlineSelect == true ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color="#079779" />
        </TouchableWithoutFeedback>
        <Text style={styles.payment}>UPI PAYMENT</Text>
        </View>
        {onlineSelect == true ?
        <View style={{alignSelf:'center', backgroundColor:'white', padding: 10, margintop:5, marginBottom:15}}>
            <Image
            style={{ width: 200,height: 200}}
             source={{
          uri: `https://texephyr.live/static/qr/${phone}.png`,
          
        }} />
        </View>
        :null}
        <View style={styles.card}>
        <TouchableWithoutFeedback onPress={() => handleOffline(offlineSelect)} >
            <MaterialCommunityIcons
                name={offlineSelect == true ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color="#079779" />
        </TouchableWithoutFeedback>
        <Text style={styles.payment}>CASH</Text>
        </View>
        </View>
        
        </View>
        
        <View style={styles.itemCart}>
          <Text style={styles.cartText}>CART {route.params.noOfitems}</Text>
          <Text style={styles.cartText}>Total Cost {'\u20B9'}{route.params.total}</Text>
        </View>
        <TouchableOpacity
        onPress={() =>{
          if((onlineSelect == true && offlineSelect == false) || (onlineSelect == false && offlineSelect == true))
          {
            setConfirmVisible(!confirmVisible);
          }
          else if((onlineSelect == true && offlineSelect == true))
          {
            alert('Please select single payment mode.');
            // ToastAndroid.show('Please select single payment mode.', ToastAndroid.SHORT);
          }
          else{
            alert('Please select payment mode.');
            // ToastAndroid.show('Please select payment mode.', ToastAndroid.SHORT);
          }
            
        }}
        style={[styles.nextButton,{alignSelf:'center',width:'85%'}]}
        >
            <Text style={styles.nextBtn}>
                Purchase
            </Text>
        </TouchableOpacity>
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={confirmVisible}
        
        onRequestClose={() => {
          setConfirmVisible(false);
        }}

        >
        <View style={styles.centeredView}>
            <View style={[styles.modalView,{width:'70%'}]}>
            <CancelBTN title="X" size="sm" backgroundColor="#007bff" />
            <Text style={{color:"#fff", marginTop:20, fontWeight:'bold', textTransform:'uppercase'}}>Do you want to confirm?</Text>
            <TouchableOpacity
                onPress={() =>{
                  console.log(route.params.cart)                  

                    let details = {
                      userId:"",
                      reference_id: route.params.id,
                      totalAmt: route.params.total,
                      reg_type: 0,
                      events: route.params.cart,
                      texId: route.params.texId,
                    }
                    console.log("details:",details)


                  axios
                  .post(MEMBERAPPURL + `testRegister`, {
                    details: details
                  })
                  .then(async(res) => {
                    alert(res.data.message);
                    // ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                    setConfirmVisible(!confirmVisible);
                  })
                  .catch((err) => {
                    setErrorCode(err.response.data.error);
                  });

                  navigation.replace("EventRegisteration");  
                }}
                style={[styles.button,{marginTop:20, backgroundColor:'#079779', width:200}]}
                >
                    <Text style={[styles.buttonText,{textTransform:'uppercase'}]}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            
           
            
        </Modal>
        </ScrollView>
    )
    
}

export default function EventRegStack({route}){

    return(
        <Stack.Navigator>
          <Stack.Screen name='EventRegisteration' component={EventRegisteration} options={{headerShown:false}}/>
          <Stack.Screen name='NEXT' initialParams={{ id: route.params.id }} component={Next} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}