import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';
import React , {useEffect, useState} from 'react'
import * as Font from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { IP, MEMBERAPPURL } from './Constants';

async function loadFonts() {
    await Font.loadAsync({
      'ChakraPetch-Bold': require('../.././assets/fonts/ChakraPetch-Bold.ttf'),
    });
  }
  
  loadFonts();

export default function OverAllSales() {
  const [tableData, setTableData]= useState()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'CSE', value: 'CSE'},
    {label: 'MECH', value: 'MECH'},
    {label: 'EE', value: 'EE'}
  ]);
console.log(tableData)
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `getEventSales`, {dept : value})
      .then((response) => {`  `
      +
       // console.log(response.data.result);
        setTableData(response.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  },[value]);

      return(
        <View style={[styles.container]}>
      <View style={{margin:10}}>
      
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
    </View>
      <View style={[styles.listWrapper, { backgroundColor: "#5f5f5f", zIndex: -2 }]}>
        <Text style={styles.row}>Event Name</Text>
        <Text style={styles.row}>Target Registration</Text>
        <Text style={styles.row}>Total Registration</Text>
        <Text style={styles.row}>Extra</Text>
        
      </View>
      <FlatList
      style={{ zIndex: -2 }}
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.listWrapper}>
            <Text style={styles.row}>{item.eventName}</Text>
            <Text style={styles.row}>{item.target}</Text>
            <Text style={styles.row}>{item.total/item.fees}</Text>
            <Text style={styles.row}>{((item.total/item.fees)-item.target)*item.fees}</Text>
            
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