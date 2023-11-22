import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home_screen from "./login/Home_screen";
import Reset from "./login/Reset_Password";
import { useState, useEffect } from "react";
import Event from "./login/Event";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";
import axios from "axios";
import { IP, MEMBERAPPURL } from "./login/Constants";
import Login_screen from "./login/Login_screen";

async function loadFonts() {
  await Font.loadAsync({
    "ChakraPetch-Bold": require(".././assets/fonts/ChakraPetch-Bold.ttf"),
  });
}

loadFonts();

const Drawer = createDrawerNavigator();

function LogoTitle() {
  return (
    <Pressable>
        <Image source={require("../assets/Logotex.png")} />
    </Pressable>
  );
}

const CustomerDrawer = (props) => {

  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `fetchMember`, { id: props.id })
      .then((response) => {
        // console.log(response.data.name)
        setUserName(response.data.name)
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  });

  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground>
          <Text style={{ color: "#fff", fontSize: 25 }}>{userName}</Text>
          <Text style={{ color: "#fff" }}>
            ----------------------------------------------
          </Text>
        </ImageBackground>
         <DrawerItemList {...props} id = {props.id} navigation = {props.navigation}/>

        <TouchableOpacity
          onPress={() => { props.navigation.replace('Login');} }
          style={[styles.button, { marginTop: 20 }]}
        >
          <Text style={styles.text}>LOGOUT</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
        <Text style={styles.text1}> © TECH TEAM TEX 2023</Text>
      </View>
    </View>
  );
};

export function MyDrawer(props) {
  // console.log(props.id);
  const id = props.id;
  const navigation = props.navigation;
  const [header, setHeader] = useState(true);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#171717",
          width: 240,
        },
      }}
      drawerContent={(props) => <CustomerDrawer id={id} navigation={navigation} {...props} />}
    >
      <Drawer.Screen
      initialParams={{ id: id }}
      
        name="Home"
        component={Home_screen}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Entypo name="home" size={20} color={color} />
          ),
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "grey",
          headerTitle: "TEXEPHYR",
          headerTitle: (props) => <LogoTitle />,
          headerTitleStyle: { backgroundColor: "#0782F9" },
          headerStyle: {
            backgroundColor: "#079779",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "ChakraPetch-Bold",
            fontSize: 25,
          },
        }}
      />
      <Drawer.Screen
       initialParams={{ id: id }}
        name="Reset Password"
        component={Reset}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Entypo name="lock-open" size={20} color={color} />
          ),
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "grey",
          // headerTitle: "TEXEPHYR",
          headerTitle: (props) => <LogoTitle />,
          headerTitleStyle: { backgroundColor: "#0782F9" },
          headerStyle: {
            backgroundColor: "#079779",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "ChakraPetch-Bold",
            fontSize: 25,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

const Drawer_navigation = ({ route, navigation }) => {
  const id = route.params.id;
  return <MyDrawer id={id} navigation={navigation} />;
};

export default Drawer_navigation;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#079779",
    width: "90%",
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text1: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "grey",
    justifyContent: "flex-end",
  },
});
