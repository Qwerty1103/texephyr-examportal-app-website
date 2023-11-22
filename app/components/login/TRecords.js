import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Col,
  Rows,
} from "react-native-table-component";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { IP, MEMBERAPPURL } from "./Constants";
async function loadFonts() {
  await Font.loadAsync({
    "ChakraPetch-Bold": require("../.././assets/fonts/ChakraPetch-Bold.ttf"),
  });
}

loadFonts();

export default function TRecords({navigation, route}) {
  const id = route.params.id;
  
  const[dept, setDept] = useState()
  const [tableData, setTableData] = useState([]);
  const [role, setRole] = useState()
const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'CSE', value: 'CSE'},
    {label: 'MECH', value: 'MECH'},
    {label: 'EE', value: 'EE'}
  ]);


  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `fetchMember`, { id: id })
      .then((response) => {
        setValue(response.data.dept)
        setRole(response.data.role)
      }
        )
      
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);

 
  
    useEffect(() => {
      axios
        .post(MEMBERAPPURL + `fetchMemberDept`, {dept : value})
        .then((response) => {
          setTableData(response.data.member);
        })
        .catch((err) => {
          console.log(err.response.data.err);
        });
    }, [value]);
  
  
 
  

  

 
  
  return (
   
    <View style={[styles.container]}>
    <View style={{margin:10}}>
      {role == 'All' ? (
      <DropDownPicker
      placeholder="Select Dept"
      dropDownContainerStyle={{
  backgroundColor: "#8f8f8f", zIndex: 1
}}
      style={{backgroundColor:'#5f5f5f', color:'#fff', zIndex: 1000 }}
      placeholderStyle={{
      color: "#fff",
      fontWeight: "bold",
      }}
      labelStyle={{color:'#fff'}}
      textStyle={{color:'#fff'}}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      
      setItems={setItems}
    />
     ) :null}
    </View>
      <View style={[styles.listWrapper, { backgroundColor: "#5f5f5f" }]}>
        <Text style={styles.row}>TEX ID</Text>
        <Text style={styles.row}>NAME</Text>
        <Text style={styles.row}>DEPT</Text>
        <Text style={styles.row}>HOLDING</Text>
        <Text style={styles.row}>TOTAL</Text>
      </View>
      
      <FlatList
        style={{zIndex: -2}}
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.listWrapper}>
            <Text style={styles.row}>{item._id}</Text>
            <Text style={styles.row}>{item.name}</Text>
            <Text style={styles.row}>{item.dept}</Text>
            <Text style={styles.row}>{item.money_holding}</Text>
            <Text style={styles.row}>{item.total_money}</Text>
          </View>
        )}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  headSection: {
    borderBottomWidth: 2,
    borderColor: "black",
    paddingBottom: 15,
  },
  titleHeading: {
    marginTop: 50,
    fontWeight: "bold",
    marginHorizontal: 167,
  },

  container: {
    flex: 1,
    paddingTop: 30,
    padding: 15,
    backgroundColor: "#171717",
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
  listWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    zIndex: -2,
  },
  row: {
    color: "#fff",
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 2,
    paddingVertical: 7,
    borderWidth: 0.5,
    fontFamily: "ChakraPetch-Bold",
    textAlign: "center",
    borderColor: "#c8e1ff",
  },
});