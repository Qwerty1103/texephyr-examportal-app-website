import { StyleSheet, Text, View , Card, ListItem, Icon, FlatList, StatusBar, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventRegisteration from './EventRegisteration';
import { element } from 'prop-types';
import EventList from './Event';
import Records from './Records';
import styles from './LoginStyle'
import axios from 'axios';
import { IP, MEMBERAPPURL } from './Constants';
const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
    </View>
);





const MyStatus = ({route}) =>{

    const [totalMoney, setTotalMoney] = useState()

    const id = route.params.id;
    useEffect(() => {
        axios.post(MEMBERAPPURL + `fetchMember`,  {id: id}).then((response) => setTotalMoney(response.data.money_holding)).catch((err) => {
            console.log(err.response.data.error)
        })
    })

    return(
        <View style={[styles.containerMyStatus]}>
        <ImageBackground source={require('../../assets/backDark.jpg')} resizeMode="cover" style={styles.imageMyStatus}>
        <Text style={styles.textMyStatusMoney}>Money To be {"\n"}Submitted</Text>
        <Text style={{fontSize:30, marginLeft:40, fontWeight:'bold', color:'#fff'}}>{'\u20B9'}{totalMoney}</Text>
           
           
           </ImageBackground>
        </View>
    )
}

export default MyStatus

