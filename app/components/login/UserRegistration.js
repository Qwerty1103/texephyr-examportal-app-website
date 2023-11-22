import {
  StyleSheet,
  Text,
  View,
  Card,
  ListItem,
  Icon,
  FlatList,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { element } from "prop-types";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { Feather, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { AUTHAPIURL, IP } from "./Constants";
import * as Font from "expo-font";
async function loadFonts() {
  await Font.loadAsync({
    "ChakraPetch-Bold": require("../.././assets/fonts/ChakraPetch-Bold.ttf"),
  });
  
}

loadFonts();
//import RNFetchBlob from "rn-fetch-blob";
// import RFFetchBlob from 'react-native-fetch-blob';
const countries = ["MITWPU", "Harvard", "Yale", "Oxford"];

const CollegeSelect = () => {
  return (
    <View
      style={{
        marginTop: 15,
        alignSelf: "center",
      }}
    >
      <SelectDropdown
        data={countries}
        defaultValue={countries[0]}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
  );
};

const UserRegisteration = ({updateStateValue, updateRegTexID, userName}) => {
  
  let formData = new FormData();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false)
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [contactErr, setContactErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPword, setConfirmPword] = useState("");
  const [verCode, setVerCode] = useState("");
  const [college, setCollege] = useState("");
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [showVerText, setShowVer] = useState(false);
  const [collegeErr, setCollegeErr] = useState(false)
  const mailFormat =  /\S+@\S+\.\S+/;

const validate = () =>{
   if(name.length<=0){
    setNameErr(true)
   }else{
    setNameErr(false)
   }
   if(contactNo.length!=10){
    setContactErr(true)
   }
   else{
    setContactErr(false)
   }
   if(email.length<=0 || !email.match(mailFormat)){
    setEmailErr(true)
   }
   else{
    setEmailErr(false)
   }
   if(password.length<=0){
    setPasswordErr(true)
   }
   else{
    setPasswordErr(false)
   }
   if(college.length<=0){
    setCollegeErr(true)
   }
   else{
    setCollegeErr(false)
   }
  
   if(nameErr==false && contactErr==false && emailErr==false && passwordErr==false && collegeErr==false && (password == confirmPword) && password.length>0 ){
    submit()
    updateStateValue(false);
   }

}



const submit = () =>
{
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', contactNo)
    formData.append('college', college)
    formData.append('password', password)
  
    axios.post(
      AUTHAPIURL + 'createUserByApp', formData, {headers: {'Content-Type': 'multipart/form-data'}}
    )
    .then((response) => {
      updateRegTexID(response.data.texid)
      userName(name);
      // ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      alert(response.data.message+" And TEXID is Fetched.");
    })
    .catch((err) => {
      console.log(err.response.data.error)
      alert(err.response.data.error);
      // ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
    })

}


  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          placeholder="NAME"
          placeholderTextColor="#D9D9D9"
          onChangeText={(text) => {
            if(name.length != text.length)
              setNameErr(false);
            if(/^[a-zA-Z( )]*$/.test(text) == false)
              setNameErr(true);
            setName(text); 
          }}
          style={[styles.input, { fontSize: 15 }]}
        />
        {
        nameErr == true ?
          <Text style={{color : 'red'}}>Name must contain alphabets only</Text>
          : null
        }
        <TextInput
          placeholder="PHONE"
          placeholderTextColor="#D9D9D9"
          onChangeText={(text) => {
            if(text.length>0){
              setContactErr(false)
            }
            setContactNo(text)
            }}
          style={[styles.input, { fontSize: 15 }]}
        />
        {
          contactErr ?
            <Text style={{color : 'red'}}>Enter 10 digit Phone Number</Text>
          :null
        }
        <TextInput
          placeholder="EMAIL"
          placeholderTextColor="#D9D9D9"
          onChangeText={(text) => {
            if(text.length>0){
              setEmailErr(false)
            }
            setEmail(text)
          }}
          style={[styles.input, { fontSize: 15 }]}
        />
        {
           emailErr?
            <Text style={{color : 'red'}}>Enter Email Id</Text>
          :null
        }
        <TextInput
          placeholder="PASSWORD"
          placeholderTextColor="#D9D9D9"
          onChangeText={(text) => {
            if(text.length>0){
              setPasswordErr(false)
            }
            setPassword(text)
            }}
          style={[styles.input, { fontSize: 15 }]}
          secureTextEntry
        />
        {
           passwordErr?
            <Text style={{color : 'red'}}>Enter Password</Text>
          :null
        }
        <TextInput
          placeholder="CONFIRM PASSWORD"
          placeholderTextColor="#D9D9D9"
          onChangeText={(text) => setConfirmPword(text)}
          style={[styles.input, { fontSize: 15 }]}
          secureTextEntry
        />
        {
          password != confirmPword ? 
          <Text style={{color : 'red'}}>passwords don't match</Text>
          :null
        }
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: 30,
              color: "#fff",
              fontSize: 15,
              paddingHorizontal: 15,
            }}
          >
            COLLEGE:
          </Text>
          <TextInput
            placeholderTextColor="#D9D9D9"
            onChangeText={(text) => 
            {
              if(text.length>0){
              setCollegeErr(false)
            }
              setCollege(text)
              }}
            style={[{ fontSize: 15, marginTop: 0, marginBottom:10 }, styles.input]}
          />
        </View>
        {
            collegeErr ?
            <Text style={{color : 'red'}}>College field can't be empty</Text>
            :null
        }
      
      <Text style={{ color: "#fff" }}>
        {/* ------------------------------------------------------ */}
      </Text>
      </View>
      <Text
        style={{
          color: "#fff",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 15,
        }}
      >
        
      </Text>
      <View
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          marginTop: 15,
         
        }}
      >
        {/* <TouchableOpacity style={styles.modalButton} onPress={showImagePicker}>
          <Text style={{ color: "#fff", fontSize: 15 }}>
            UPLOAD <Feather name="upload" size={20} color="#fff" />{" "}
          </Text>
        </TouchableOpacity> */}
        {/* <Text style={{ color: "white", marginTop: 10, marginHorizontal: 10 }}>
          {" "}
          OR{" "}
        </Text> */}
        {/* <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
          <Text style={{ color: "#fff", fontSize: 15 }}>
            TAKE <Entypo name="camera" size={20} color="#fff" />
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* <View style={{ margin: 10,alignSelf: "flex-start", marginLeft:50 }}>
        {pickedImagePath !== "" ? (
          <Text style={{ color: "#079779" }}>Image Added successfully</Text>
        ) : (
          <Text style={{ color: "red" }}>Please select an image</Text>
        )}
      </View> */}
      
      
        
        <TouchableOpacity
          style={[styles.modalButton,{marginLeft:90, alignSelf:'baseline'}]}
          onPress={validate}
        >
          <Text style={[styles.Text, { color: "#fff", fontSize:16, textTransform:'uppercase',fontFamily: "ChakraPetch-Bold", }]}>
            Create
          </Text>
        </TouchableOpacity>
      
      <View
        style={[
          styles.container,
          {
            alignSelf:'flex-start',
          },
        ]}
      >
        {showVerText == true ? (
          <View>
            <TextInput
              placeholder="VERIFICATION CODE"
              placeholderTextColor="#D9D9D9"
              onChangeText={(text) => setVerCode(text)}
              secureTextEntry
              style={[styles.input, { fontSize: 14}]}
            />

            <View>
              <TouchableOpacity
                style={[styles.modalButton, { marginTop: 15, width:'90%' }]}
                onPress={validate}
              >
                <Text
                  style={[
                    styles.Text,
                    { color: "#fff", textTransform: "uppercase" },
                  ]}
                >
                  VERIFY & Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default UserRegisteration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 5,
    color: "white",
    paddingHorizontal: 5,
    paddingTop: 20,
    borderRadius: 2,
    marginTop: 5,
    width: 270,
  },
  modalButton: {
    alignItems: "center",
    backgroundColor: "#079779",
    borderRadius: 5,
    padding: 12,
  },
});
