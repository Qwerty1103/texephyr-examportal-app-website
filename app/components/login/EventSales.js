import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';
import React , {useEffect, useState} from 'react'
import * as Font from "expo-font";
import axios from 'axios';
import { IP, MEMBERAPPURL } from './Constants';
import { FlatList } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
async function loadFonts() {
    await Font.loadAsync({
      'ChakraPetch-Bold': require('../.././assets/fonts/ChakraPetch-Bold.ttf'),
    });
    
  }
  
  loadFonts();


export default function EventSales({navigation, route}) {
  const id = route.params.id;
    // const [tableHead, setTableHead] = useState( ['Event Name', 'Online', 'Offline', 'Total Sales'])
    const [tableData, setTableData]= useState()
    const [dept, setDept] = useState()
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
          console.log(response.data.dept)
          setRole(response.data.role)
        }
          )
        .catch((err) => {
          console.log(err.response.data.error);
        });
    },[]);

    // useEffect(() => {
    //   axios
    //     .post(MEMBERAPPURL + `memberWithHolding`)
    //     .then((response) => {
    //       setTableData(response.data.result);
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data.err);
    //     });
    // },[reload]);
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `getEventSales`, {dept : value})
      .then((response) => {
       console.log("EVENT SALES DATA:- ", response.data.result);
        setTableData(response.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  },[value]);

      return(
      <View style={[styles.container]}>
      <View style={{margin:10}}>
      {role == 'All' ? (
      <DropDownPicker
      placeholder="Select Dept"
      dropDownContainerStyle={{
  backgroundColor: "#8f8f8f"
}}
      style={{backgroundColor:'#5f5f5f', color:'#fff'}}
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
      <View style={[styles.listWrapper, { backgroundColor: "#5f5f5f", zIndex: -2 }]}>
        <Text style={styles.row}>Event Name</Text>
        <Text style={styles.row}>Online</Text>
        <Text style={styles.row}>Offline</Text>
        <Text style={styles.row}>Total Sales</Text>
        
      </View>
      <FlatList
      style={{ zIndex: -2 }}
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.listWrapper}>
            <Text style={styles.row}>{item.eventName}</Text>
            <Text style={styles.row}>{item.online}</Text>
            <Text style={styles.row}>{item.offline}</Text>
            <Text style={styles.row}>{item.total}</Text>
            
          </View>
        )}
      />
    </View>
    
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#171717' },
    listWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    row: {
      color: "#fff",
      flex: 1,
      fontSize: 13,
      paddingHorizontal: 2,
      paddingVertical: 7,
      borderWidth: 0.5,
      fontFamily: "ChakraPetch-Bold",
      textAlign: "center",
      borderColor: "#c8e1ff",
    },
  });