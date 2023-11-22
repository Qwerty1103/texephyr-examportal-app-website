import { StyleSheet, Text, View , ListItem, Icon, FlatList, StatusBar, Modal,Button, Alert, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { element } from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './LoginStyle'
import { Card } from 'react-native-paper';
import * as Font from 'expo-font'
import axios from "axios";
import { IP, MEMBERAPPURL } from "./Constants";

async function loadFonts() {
  await Font.loadAsync({
    'ChakraPetch-Bold': require('../.././assets/fonts/ChakraPetch-Bold.ttf'),
  });
}

loadFonts();



const Tab = createMaterialTopTabNavigator();
// const events = [
//     {name: 'codestorm', description: 'For all the codeers Texephyr brings code storm. Write out the optimized and most efficient code to prove your coding prowess. This event will not only test your coding but also evaluate your debugging. Event format: 1) Minor (Diploma and FE and SE), 2) Major (TE and BE), Prizes for both tracks are different',branch: 0},
//     {name: 'algoholics', description: 'Algoholics, as the name suggests, is an algorithm-based event which tests your logical thinking rather than testing your coding abilities. The motto of the event is Think efficient, build efficient.', branch: 0},
//     {name: 'catch the muderer', description: 'catch the murder', branch: 1},
//     {name: 'hackathon', description: 'college level hackathon', branch: 2}
//    ]

//    console.log(events);

   const windowWidth = Dimensions. get('window').width
const EventListItem = ({ name }) => (
  
    <View style={[{flex: 1,  justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor:'#171717', borderRadius:2, marginHorizontal:5, borderBottomColor: '#079779',
    borderBottomWidth: 2}]}>
    {/* <Image
     style={{
       flex: 1,
       height: 150,
       backgroundColor:'red'
     }}
     source={require('../../assets/card.jpg')}
     /> */}
     {/* codeStrom */}
     <View style={{flex:1, height:90, width:windowWidth}}><Text style={[styles.eventName,{textTransform:'uppercase'}]}>{name}</Text></View>
      
    </View>
);
const BranchItem = ({ name }) => (
  <View style={styles.branchItem}>
    <Text style={styles.branchname}>{name}</Text>
  </View>
);


function CSE(){
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');  
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [cseEvents,setCseEvents] = useState([]);
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `getEvent`, {dept : 'CSE'})
      .then((response) => {
        setCseEvents(response.data.event);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <View style={[{alignSelf:'center', padding: 10,backgroundColor:'#171717'
  }]}>
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
            <ScrollView>
            <View style={styles.modalView}>
            <Text style={{ color:'#fff', fontSize:20, textTransform:'uppercase', fontWeight:'bold'}}>{name} ( {price} RS )</Text>
                <Text style={{padding:25, color:'#fff'}}>{description.replace(new RegExp("<br /><br />", 'g'), "\n\n")}</Text>
                <TouchableOpacity  onPress={()=>
                  {
                    setModalVisible(!modalVisible)
                    
                  }
                } style={styles.modalButton}><Text style={{color:'#fff'}}>CLOSE</Text></TouchableOpacity>
            </View>
            </ScrollView>
            </View>
        </Modal>
      <FlatList
        data={cseEvents}
        renderItem={ ({item}) => (
            <TouchableOpacity onPress={() => {
              
              setModalVisible(!modalVisible);
              setDescription(item.details);
              setName(item.name);
              setPrice(item.fees);
            }}>
          <EventListItem name={item.name}/>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

function MECH(){
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [mechEvents,setMechEvents] = useState([]);
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `getEvent`, {dept : 'MECH'})
      .then((response) => {
        setMechEvents(response.data.event);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 
  
  return (
    <View style={[{alignSelf:'center', padding: 10,backgroundColor:'#171717'
  }]}>
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
            <ScrollView>
            <View style={styles.modalView}>
            
            <Text style={{ color:'#fff', fontSize:20, textTransform:'uppercase', fontWeight:'bold'}}>{name} ( {price} RS )</Text>
                <Text style={{padding:25, color:'#fff'}}>{description.replace(new RegExp("<br /><br />", 'g'), "\n\n")}</Text>
                <TouchableOpacity  onPress={()=>
                  {
                    setModalVisible(!modalVisible)
                   
                  }
                } style={styles.modalButton}><Text style={{color:'#fff'}}>CLOSE</Text></TouchableOpacity>
                
            </View>
            </ScrollView>
            </View>
        </Modal>
      <FlatList
        data={mechEvents}
        renderItem={ ({item}) => (
            <TouchableOpacity onPress={() => {
              
              setModalVisible(!modalVisible);
              setDescription(item.details);
              setName(item.name);
              setPrice(item.fees);
            }}>
          <EventListItem name={item.name}/>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

function EE(){
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [civilEvents, setCivilEvents] = useState([]);
  useEffect(() => {
    axios
      .post(MEMBERAPPURL + `getEvent`, {dept : 'EE'})
      .then((response) => {
        setCivilEvents(response.data.event);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(civilEvents);
  return (
    <View style={[{alignSelf:'center', padding:10, 
    backgroundColor:'#171717'
  }]}>
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
            <ScrollView>
            <View style={styles.modalView}>
            
            <Text style={{ color:'#fff', fontSize:20, textTransform:'uppercase', fontWeight:'bold'}}>{name} ( {price} RS ) </Text>
                <Text style={{padding:25, color:'#fff'}}>{description.replace(new RegExp("<br /><br />", 'g'), "\n\n")}</Text>
                <TouchableOpacity  onPress={()=>
                  {
                    setModalVisible(!modalVisible)
              
                  }
                } style={styles.modalButton}><Text style={{color:'#fff'}}>CLOSE</Text></TouchableOpacity>
                
            </View>
            </ScrollView>
            </View>
        </Modal>
      <FlatList
        data={civilEvents}
        renderItem={ ({item}) => (
            <TouchableOpacity onPress={() => {
              setModalVisible(!modalVisible);
              
              setDescription(item.details);
              setName(item.name);
              setPrice(item.fees);
            }}>
          <EventListItem name={item.name}/>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  )
}
  const EventList = ({navigation}) => {
    const [branch, setBranch] = useState(0);
    
    return (
      <View style={{width: '100%', height: '100%'}}>
      <Tab.Navigator 
       
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          activeTintColor: '#F8F8F8',
          opacity:0.9,
          borderBottomColor: '#079779'

        },
        tabBarSelectedItemStyle: {
            borderBottomWidth: 2,
            borderBottomColor: '#079779',
        },
        tabBarItemStyle:{
          borderBottomColor: '#079779',
          activeTintColor:'#079779',
    },
    indicatorStyle: {
            backgroundColor: '#079779',
        },
      }}>
        <Tab.Screen name="CSE" component={CSE} options={{tabBarActiveTintColor:'#fff'}}></Tab.Screen>
        <Tab.Screen name="MECH" component={MECH}  options={{tabBarActiveTintColor:'#fff'}}/>
        <Tab.Screen name="EE" component={EE}  options={{tabBarActiveTintColor:'#fff'}}/>
      </Tab.Navigator>
      </View>
    )
  }


  
  export default EventList
