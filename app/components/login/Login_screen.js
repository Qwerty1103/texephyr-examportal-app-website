import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { Component } from "react/cjs/react.production.min";
import Home_screen from "./Home_screen";
import { useNavigation } from "@react-navigation/native";
import styles from "./LoginStyle";
import * as Font from "expo-font";
import {  Entypo } from '@expo/vector-icons'; 
import axios from "axios";
import { IP, MEMBERAPPURL } from "./Constants";
import { FontAwesome5 } from "@expo/vector-icons";

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

async function loadFonts() {
  await Font.loadAsync({
    "ChakraPetch-Bold": require("../.././assets/fonts/ChakraPetch-Bold.ttf"),
  });
}

loadFonts();

const Login_screen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("white");
  const [emailStar, setEmailStar] = useState(false);
  const [passErr, setPassErr] = useState("white");
  const [passwordStar, setPasswordStar] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false)
  
  const { getItem, setItem } = useAsyncStorage('@storage_key');
  const {loginDetail, setLoginDetail} = useState("");

  React.useEffect(() =>
    navigation.addListener("beforeRemove", (e) => {
      const action = e.data.action;
      e.preventDefault();
    })
  );

  const writeItemToStorage = async newValue => {
    await setItem(newValue);
  };

  const readItemFromStorage = async () => {
    const item = await getItem();
    setLoginDetail(item);
    console.log(item);
  };


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
    <View
      style={[
        styles.container,
        { justifyContent: "space-evenly", alignItems: "center" },
      ]}
      behavior="padding"
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 35,
            lineHeight: 47,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "ChakraPetch-Bold",
          }}
        >
          WELCOME
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 35,
            lineHeight: 47,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "ChakraPetch-Bold",
          }}
        >
          TEAM TEXEPHYR
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ color: "#fff", marginLeft: 5, opacity: 0.79 }}>
          Tex ID
        </Text>

        <View style={{ flexDirection: "row" }}>
          <TextInput
            // value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErr("white");
              setEmailStar(false);
            }}
            style={[styles.input, { borderBottomColor: err, width: "90%", textTransform: "uppercase" }]}
          />
          {emailStar ? (
            <FontAwesome5 name="star-of-life" size={5} color="red" />
          ) : null}
        </View>

        <Text style={{ color: "#fff", marginLeft: 5, opacity: 0.79 }}>
          Password
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
              setPassErr("white");
              setPasswordStar(false);
            }}
            style={[styles.input, { borderBottomColor: passErr, width: "90%" }]}
            secureTextEntry
          />
          {passwordStar ? (
            <FontAwesome5 name="star-of-life" size={5} color="red" />
          ) : null}
        </View>
        {<Text style={{ color: "red" }}>{errorCode}</Text>}

        <Modal
        style={styles.modalView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        <ScrollView>
        <View style={styles.modalView}>
            
                <Text style={{ color:'#fff', fontSize:20, textTransform:'uppercase', fontWeight:'bold'}}>Terms & Conditions {`\n`}</Text>

                {/* Description Start */}
                <View style={{flex: 1, flexDirection: "row", justifyContent:"center"}}>
                <Text style={{color:'#fff'}}>
                  {`\u2022`}
                </Text>
                <Text style={{color:'#fff',lineHeight: 22,paddingLeft: 10}}>
                  As you all know this year Texephyr has initiated something new by making a Member App for the ease of all the members for registration of participants and easy flow of money without any hassle of checking with the respective treasurers.{`\n`}
                </Text>
                </View>

                <View style={{flex: 1, flexDirection: "row", justifyContent:"center"}}>
                <Text style={{color:'#fff'}}>
                  {`\u2022`}
                </Text>
                <Text style={{color:'#fff',lineHeight: 22,paddingLeft: 10}}>
                  So as this is a subject of great importance there are some rules which everyone should abide for transparency purpose and ease of operation of the app.{`\n\n`}
                </Text>
                </View>

                <View>
                  <Text style={{color:'#079779', fontWeight: 800, lineHeight: 22,paddingBottom:0, marginBottom: 0, letterSpacing: 1.2}}>
                    Therefore, we request all the members of Texephyr to abide by the following rules while collecting and managing payments for the events:{`\n\n`}
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: "row", justifyContent:"center", paddingTop: 0, marginTop: 0}}>
                    <Text style={{color:'#fff'}}>
                      1. 
                    </Text>
                    <Text style={{color:'#fff',paddingLeft: 10, lineHeight: 22,}}>
                        Texephyr has the right to collect the money deposited by participants in your bank account for registration purposes via Member App.{`\n`}
                    </Text>
                  </View>

                  <View style={{flex: 1, flexDirection: "row", justifyContent:"center", paddingTop: 0, marginTop: 0}}>
                    <Text style={{color:'#fff'}}>
                      2. 
                    </Text>
                    <Text style={{color:'#fff',paddingLeft: 10, lineHeight: 22}}>
                    The collected amount must not be used for any personal use.{`\n`}
                      
                    </Text>
                  </View>

                  <View style={{flex: 1, flexDirection: "row", justifyContent:"center", paddingTop: 0, marginTop: 0}}>
                    <Text style={{color:'#fff'}}>
                      3. 
                    </Text>
                    <Text style={{color:'#fff',paddingLeft: 10, lineHeight: 22,}}>
                      All the collected amount by participants must be deposited into the Texephyr club account by End of the Day.{`\n`}
                    </Text>
                  </View>

                  <View style={{flex: 1, flexDirection: "row", justifyContent:"center", paddingTop: 0, marginTop: 0}}>
                    <Text style={{color:'#fff'}}>
                      4. 
                    </Text>
                    <Text style={{color:'#fff',paddingLeft: 10, lineHeight: 22,}}>
                      In case of any discrepancy in the financial record or any complaints regarding the payment process, the matter should be immediately reported to the Treasurer.{`\n`}
                    </Text>
                  </View>

                  <View style={{flex: 1, flexDirection: "row", justifyContent:"center", paddingTop: 0, marginTop: 0}}>
                    <Text style={{color:'#fff'}}>
                      5. 
                    </Text>
                    <Text style={{color:'#fff',paddingLeft: 10, lineHeight: 22,}}>
                      No cases of fake registrations should be shown and no fake reasons related to non payment of money will be entertained.{`\n`}
                    </Text>
                  </View>

                  <Text style={{color:'#fff', fontSize: 12, lineHeight: 21, paddingBottom: 20}}>
                    By signing below, I agree the above rules and regulations while managing the payments for the events.
                  </Text>
                </View>
                {/* Description End */}

                <TouchableOpacity  onPress={()=>
                  {
                    axios
                      .post(MEMBERAPPURL + `memberStatus`, {
                        id: email.toUpperCase(),
                        password: password,
                      })
                      .then(async(res) => {
                        
                        setModalVisible(!modalVisible)
                        navigation.navigate("DrawerNav", { id: email });
                      })
                      .catch((err) => {
                        setErrorCode(err.response.data.error);
                      });
                    
              
                  }
                } style={styles.modalButton}><Text style={{color:'#fff'}}>I AGREE</Text></TouchableOpacity>
                
            </View>
          </ScrollView>
        </View>
      </Modal>

        <TouchableOpacity
          onPress={() => {
            // setModalVisible(!modalVisible);
            // navigation.navigate('DrawerNav')
            // // if(email == 'sourabh@gmail.com' && password == `'12345')
            axios
              .post(MEMBERAPPURL + `memberLogin`, {
                id: email.toUpperCase(),
                password: password,
              })
              .then(async(res) => {
                // await AsyncStorage.setItem("userToken",res.data.token);
                // const setLOGINValue = "{email: "+email+", password: "+password+"}";
                // writeItemToStorage(setLOGINValue);

                console.log(res.data.result[0].status);

                let term_condition_status = res.data.result[0].status;

                if(term_condition_status == 0)
                {
                  setModalVisible(!modalVisible);
                }
                else
                {
                  navigation.navigate("DrawerNav", { id: email });
                }
              })
              .catch((err) => {
                setErrorCode(err.response.data.error);
              });

            if (email == "") {
              setErr("red");
              setEmailStar(true);
            } else {
              setErr("white");
              setEmailStar(false);
            }
            if (password == "") {
              setPassErr("red");
              setPasswordStar(true);
            } else {
              setPassErr("white");
              setPasswordStar(false);
            }
          }}
          style={[{ marginTop: 40 }, styles.button]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

export default Login_screen;
