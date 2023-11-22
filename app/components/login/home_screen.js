import { View , Image, BackHandler, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventList from './Event';
import MyStatus from './MyStatus'
import MainRecord from './MainRecord'
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import EventRegStack from './EventRegStack'
import axios from 'axios';
import { IP, MEMBERAPPURL } from './Constants';


function EventLogo() {
  return (
    <Image
      
      source={require('../../assets/calendar-days-solid.svg')}
    />
  );
}
const Home_screen = ({navigation, route}) => {
  
  const id = route.params.id;
  const [role, setRole] = useState();

  // const handleBackPress = () => {
  //   Alert.alert(
  //     'Exit App',
  //     'Exiting the application?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           console.log('Cancel Pressed!');
  //         },
  //         style: 'cancel'
  //       },
  //       {
  //         text: 'Ok',
  //         onPress:  () => BackHandler.exitApp(),
  //       }
  //     ],
  //     {
  //       cancelable: false,
  //     }
  //   );

  //   return true;
  // };

  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `fetchMember`, { id: id })
      .then((response) => {
        setRole(response.data.role)
        // console.log(response.data.role)
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });

      // BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      // return () => {
      //   BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      // }
  });


  return (
    <View style={{width: '100%', height: '100%'}}>
      <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#232323',
          
        },
      }}
      // screenOptions={({ route }) => ({
      //     tabBarIcon: ({ focused, color, size }) => {
      //       let iconName;

      //       if (route.name === 'Event') {
      //         iconName = focused
      //           ? 'event'
      //           : 'event';
      //       } else if (route.name === 'Register') {
      //         iconName = focused ? 'pencil-square-o' : 'pencil-square-o';
      //       }

      //       // You can return any component that you like here!
      //       return <MaterialIcons name={iconName} size={24} color={color}/>;
      //     },
      //     tabBarActiveTintColor: 'black',
      //     tabBarInactiveTintColor: 'gray',
      //   })}
      >
    <Stack.Screen name="Event" component={EventList} initialParams = {{id : id}} options={{headerShown:false,gestureEnabled: false,tabBarLabel: 'Event', tabBarIcon: ({color}) => <MaterialIcons name="event" size={24} color={color}/>, tabBarActiveTintColor: '#fff',tabBarInactiveTintColor: 'gray'}} />
    <Stack.Screen name="Register" initialParams={{ id: id }} component={EventRegStack} options={{headerShown:false,gestureEnabled: false, tabBarIcon:({color})=> <FontAwesome name="pencil-square-o" size={24} color={color} />, tabBarActiveTintColor: '#fff',tabBarInactiveTintColor: 'gray'}}/>
    <Stack.Screen name="My Status" initialParams={{ id: id }} component={MyStatus} options={{headerShown:false,gestureEnabled: false, tabBarIcon:({color})=> <FontAwesome5 name="money-check-alt" size={24} color={color} />, tabBarActiveTintColor: '#fff',tabBarInactiveTintColor: 'gray'}}/>
    
    {role !=('Few')?(
      <Stack.Screen name="Records" initialParams={{ id: id }} component={MainRecord} options={{headerShown:false,gestureEnabled: false, tabBarIcon:({color})=> <FontAwesome name="address-book" size={24} color={color} />, tabBarActiveTintColor: '#fff',tabBarInactiveTintColor: 'gray'}}/>
    ):null
    }
  </Stack.Navigator>
  
    </View>
  )
}

export default Home_screen
const Stack = createBottomTabNavigator();
