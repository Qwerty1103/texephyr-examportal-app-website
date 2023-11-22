import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Record from './Records'
import TRecords from './TRecords'
import Update from './UpdateRecord'
import EventSales from './EventSales'
import OverAllSales from './OverAllSales'

import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'
import { IP } from './Constants'

const Stack = createStackNavigator();
export default function MainRecord({route}) {

  const id = route.params.id;

  

  return (
    <Stack.Navigator>
    <Stack.Screen name="Record" initialParams={{ id: id }} component={Record} options={{headerShown:false}}/>
    
    
    <Stack.Screen name="Update" initialParams={{ id: id }} component={Update} options={{ headerShown:false}}/>
   
    <Stack.Screen name="TresRecord" initialParams={{ id: id }} component={TRecords} options={{ headerShown:false}}/>
    <Stack.Screen name="EventSales" initialParams={{ id: id }} component={EventSales} options={{ headerShown:false}}/>
    <Stack.Screen name="OverAllSales" component={OverAllSales} options={{ headerShown:false}}/>
  </Stack.Navigator>
  )
}