import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./LoginStyle";
import * as Font from "expo-font";
import { IP, MEMBERAPPURL } from "./Constants";
import axios from "axios";

async function loadFonts() {
  await Font.loadAsync({
    "ChakraPetch-Bold": require("../.././assets/fonts/ChakraPetch-Bold.ttf"),
  });
}

loadFonts();

export default function Records({ navigation, route }) {
  const id = route.params.id;

  const [role, setRole] = useState();
  // console.log(id);
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `fetchMember`, { id: id })
      .then((response) => setRole(response.data.role))
      .catch((err) => {
        console.log(err.response.data.error);
      });
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#171717",
        justifyContent: "space-evenly",
      }}
    >
      <ScrollView>
        <View style={{ width: "100%", justifyContent: "flex-start" }}>
          {role == "Little" || role == "All" ? (
            <TouchableOpacity
              style={styles.boxRecords}
              onPress={() => {
                navigation.navigate("Update");
              }}
            >
              <Text style={styles.textRecords}>UPDATE</Text>
            </TouchableOpacity>
          ) : null}
          
          {role == "All" || role == "Some" ? (
          <TouchableOpacity
            style={[styles.boxRecords]}
            onPress={() => {
              navigation.navigate("TresRecord");
            }}
          >
            <Text style={[styles.textRecords]}>RECORDS</Text>
          </TouchableOpacity>
          ) : null}

          {role == "All" || role == "Some" ? (
          <TouchableOpacity
            style={[styles.boxRecords]}
            onPress={() => {
              navigation.navigate("EventSales");
            }}
          >
            <Text style={styles.textRecords}>EVENT SALES</Text>
          </TouchableOpacity>
          ) : null}

          {role == "All" ? (
          <TouchableOpacity
            style={[styles.boxRecords]}
            onPress={() => {
              navigation.navigate("OverAllSales");
            }}
          >
            <Text style={styles.textRecords}>OVERALL</Text>
          </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
