import {
  StyleSheet,
  Text,
  View,
  Card,
  ListItem,
  Icon,
  FlatList,
  Modal,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DataTable } from "react-native-paper";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows,
} from "react-native-table-component";
import * as Font from "expo-font";
import axios from "axios";
import { IP, MEMBERAPPURL } from "./Constants";
import { ScrollView } from "react-native-gesture-handler";


async function loadFonts() {
  await Font.loadAsync({
    "ChakraPetch-Bold": require("../.././assets/fonts/ChakraPetch-Bold.ttf"),
  });
}

loadFonts();

const Tab = createMaterialTopTabNavigator();

const UpdateRecord = ({ navigation, route }) => {
  const id = route.params.id;
  // console.log(AsyncStorage.getItem("userToken"))
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000",
          opacity: 0.9,
        },
      }}
    >
      <Tab.Screen
        name="Individual"
        component={Individual}
        options={{ tabBarActiveTintColor: "#fff" }}
      />
      <Tab.Screen
        name="All"
        initialParams={{ id: id }}
        component={All}
        options={{ tabBarActiveTintColor: "#fff" }}
      />
    </Tab.Navigator>
  );
};

function All({ navigation, route }) {
  const id = route.params.id;
  const [tableData, setTableData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState();
  const [name, setName] = useState();
  const [holding, setHolding] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `memberWithHolding`)
      .then((response) => {
        setTableData(response.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  },[reload]);
  

  return (
    
    <View style={[styles.container1]}>
      
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
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={[styles.cancelBtnContainer, { alignSelf: "flex-end" }]}
            >
              <Text style={styles.appButtonText}>
                <Entypo name="cross" size={24} color="#fff" />
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                padding: 7,
                fontSize: 18,
              }}
            >
              Name: {name}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                padding: 7,
                fontSize: 18,
              }}
            >
              Amount Holding: {'\u20B9'} {holding}
            </Text>
            <TouchableOpacity
              onPress={() => {
                axios
                  .post(MEMBERAPPURL + `clearBalance`, { id: ID, memId:id })
                  .then((response) => {
                    // console.log(response.data.member);
                    setReload(!reload)
                  })
                  .catch((err) => {
                    console.log(err.response.data.err);
                  });

                setModalVisible(!modalVisible);
              }}
              style={[styles.modalButton, { marginTop: 20 }]}
            >
              <Text style={{ color: "#fff" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {tableData != '' ? (
      <View>
      <View style={[styles.listWrapper, { backgroundColor: "#5f5f5f" }]}>
        <Text style={styles.row}>TEX ID</Text>
        <Text style={styles.row}>NAME</Text>
        <Text style={styles.row}>HOLDING</Text>
        <Text style={styles.row}>COLLECT</Text>
      </View>
      <FlatList
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.listWrapper}>
            <Text style={styles.row}>{item.texid}</Text>
            <Text style={styles.row}>{item.name}</Text>
            <Text style={styles.row}>{item.money_holding}</Text>
            {/* Collect button*/}
            <Pressable
              style={styles.row}
              onPress={() => {
                setModalVisible(!modalVisible);
                setID(item.texid);
                setName(item.name);
                setHolding(item.money_holding);
              }}
            >
              <Text style={styles.collectText}>Collect</Text>
            </Pressable>
          </View>
        )}
      />
      
      </View>
      ): (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.nothingText}>Nothing to Display</Text>
        </View>
      )}
    </View>
  );
}

function Individual({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [blur, setBlur] = useState("");
  const [textId, setTexId] = useState("");
  const [getDetPressed, pressGetDet] = useState(false);
  const [name, setName] = useState("");
  const [holding, setHolding] = useState();
  const [err, setErr]= useState('');
  const [wrongUser, setWrongUser] = useState(false)
  const [deductAmt, setDeductAmt] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `fetchMember`, { id: textId })
      .then((response) => {
        
        setName(response.data.name);
        setHolding(response.data.money_holding);
        setId(response.data._id);
        setErr('')
      })

      .catch((err) => {
        setErr(err.response.data.error);
      });
  },[textId]);

  return (
    <View style={[blur, { flex: 1, backgroundColor: "#171717" }]}>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <TextInput
          placeholder="TEX ID"
          placeholderTextColor="#D9D9D9"
          style={[styles.input, { fontSize: 20, textTransform: "uppercase" }]}
          onChangeText={(text) => {
            setTexId(text);
            if (text.length != textId.length) {
              pressGetDet(false);
            }
          }}
        />
        {textId.length >= 1 ? (
          <Pressable
            style={[blur, styles.button]}
            onPress={() => {
              if(err!="User Not Found"){
                pressGetDet(!getDetPressed);
                setWrongUser(false)
              }
               else if(err=="User Not Found"){
                setWrongUser(true)
              }
            }}
          >
              <Text style={styles.text}>GET DETAILS</Text>
          
            
          </Pressable>
        ) : null}
            {wrongUser == true ? (
              <Text style={[styles.text,{color:'red', paddingTop:10}]}>Invalid User</Text>
            ): null}
        
      </View>
      {getDetPressed == true ? (
        <View>
          <Text
            style={{
              marginTop: 50,
              marginLeft: 30,
              fontSize: 25,
              color: "#fff",
            }}
          >
            Name: {name}
          </Text>
          <View
            style={{
              backgroundColor: "#5f5f5f",
              height: 70,
              flexDirection: "row",
              margin: 10,
            }}
          >
            <Text style={styles.amtText}>Amount Holding: </Text>
            <Text style={styles.amtText}>
              {"\u20B9"}
              {holding}
            </Text>
          </View>
          <View
            style={{ alignItems: "center", height: 100, flexDirection: "row" }}
          >
            <Text style={{ marginLeft: 50, fontSize: 20, color: "#fff" }}>
              Deduct:
            </Text>
            <TextInput
            onChangeText={(text) => {
            setDeductAmt(text);
            }}
              placeholderTextColor="#D9D9D9"
              placeholder="Enter Amount"
              style={[
                styles.input,
                { width: "50%", height: 50, marginLeft: 20, fontSize: 20 },
              ]}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={[blur, styles.button, { width: "40%" }]}
              onPress={() => {
                if(deductAmt > holding){
                  ToastAndroid.show('Amount is greater than holding', ToastAndroid.SHORT);
                }
                else{
                  setModalVisible(true);
                }
                
                //setBlur(styles.blur);
              }}
            >
              <Text style={[blur, styles.text]}>SUBMIT</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <View style={{ alignItems: "center" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setBlur(styles.normal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: "#232323" }]}>
              <Text
                style={[styles.modalText, { marginBottom: 15, color: "#fff", fontWeight:'bold', textTransform:'uppercase' }]}
              >
                Deduct Amount : {deductAmt}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  console.log(typeof(Number(deductAmt)))
                  axios
                  .post(MEMBERAPPURL + `updateMemberBalance`, { id: id, amount: Number(deductAmt)})
                  .then((response) => {
                    // console.log(response.data.member);
                    
                    setReload(!reload)
                  })
                  .catch((err) => {
                    console.log(err.response.data.error);
                  });

                  // ToastAndroid.show('Amount Deducted Successfully!', ToastAndroid.SHORT);
                  alert('Amount Deducted Successfully!');

                  navigation.replace("Update")
                setModalVisible(!modalVisible);
                  setModalVisible(!modalVisible);
                  setBlur(styles.normal);
                  setTexId("");
                  pressGetDet(!getDetPressed);

                }}
              >
                <Text style={styles.textStyle}>Confirm </Text>
              </Pressable>
            </View>
          </View>
          {/* </BlurView> */}
        </Modal>
      </View>
    </View>
  );
}

export default UpdateRecord;

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "80%",
  },
  textInput: {
    width: "100%",
  },
  text: {
    marginTop: 60,
    fontSize: 20,
  },
  input: {
    borderBottomColor: "white",

    borderBottomWidth: 1,
    marginTop: 5,
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 2,
    marginTop: 5,
    width: 270,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#079779",
  },
  button1: {
    backgroundColor: "#079779",
    borderRadius: 7,
    paddingHorizontal: 25,
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  amtText: { marginTop: 20, marginLeft: 35, fontSize: 20, color: "#fff" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    color: "#fff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  blur: {
    backgroundColor: "grey",
    opacity: 0.2,
  },
  normal: {
    opacity: 1,
  },
  tableText: {
    fontSize: 20,
  },
  container1: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#171717",
  },
  head1: { height: 40, backgroundColor: "#808B97", color: "#fff" },
  text1: { margin: 6, color: "#fff", fontFamily: "ChakraPetch-Bold" },
  row1: { flexDirection: "row", height: "auto", minHeight: 40, color: "#fff" },
  btn1: {
    marginLeft: 6,
    width: 80,
    height: 25,
    backgroundColor: "#079779",
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText1: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "ChakraPetch-Bold",
  },
  tableHeader: {
    backgroundColor: "#5f5f5f",
    borderColor: "#fff",
    borderWidth: 1,
    fontFamily: "ChakraPetch-Bold",
  },
  headerText: {
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    fontFamily: "ChakraPetch-Bold",
    fontSize: 15,
  },

  // All Final

  listWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    color: "#fff",
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 7,
    borderWidth: 0.5,
    fontFamily: "ChakraPetch-Bold",
    textAlign: "center",
    borderColor: "#c8e1ff",
  },
  collectText: {
    color: "#fff",
    fontFamily: "ChakraPetch-Bold",
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "#079779",
    borderRadius: 5,
  },
  modalView: {
    width: "90%",
    height: "auto",
    margin: 20,
    backgroundColor: "#232323",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
    height: "100%",
  },
  modalView: {
    width: "90%",
    height: "auto",
    margin: 20,
    backgroundColor: "#232323",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    alignItems: "center",
    backgroundColor: "#079779",
    borderRadius: 5,
    padding: 10,
  },
  cancelBtnContainer: {
    margin: 5,
    borderRadius: 100,
    backgroundColor: "red",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },

  appButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "ChakraPetch-Bold",
  },
  nothingText: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "ChakraPetch-Bold",
    textTransform: "uppercase",
  }
});
