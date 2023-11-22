import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, FlatList, Pressable, ToastAndroid, BackHandler} from 'react-native'
import React, { useState, useEffect } from 'react'
import {ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserRegistration from './UserRegistration';
import Modal from "react-native-modal";
import styles from './LoginStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import axios from "axios";
import { IP, MEMBERAPPURL, WEBAPI } from "./Constants";

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

   const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );

const EventRegisteration = ({navigation}) => {
  const [blur,setBlur] = useState('');
    const [description, setDescription] = useState('');
    const [modalAccountVisible,setAccountModalVisible] = useState(false);
    const [groupVisible, setGroupVisible]  = useState(false);
    const [eventId, setEventId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userTexId, setUserTexId] = useState("");
    const [email, setEmail] = useState("");
    const [eventsBoxes,setEventBoxes] = useState([]);
    const [tid, setTid] = useState(0);
    const [tEmail, settEmail] = useState("")
    const [regID, setRegID] = useState(0);
    const [texId,setTexId] = useState('')
    const [user,setUser] = useState('')
    const [modalRegistrationVisible, setRegistrationtModalVisible] = useState(false);

    const[totalCost, setTotalCost] = useState(0);


    const[totalEntries, setTotalEntries] = useState(0);

    const[memID1, setMemID1] = useState('');
    const[memID2, setMemID2] = useState('');
    const[memID3, setMemID3] = useState('');
    const[regTexID, setRegTexID] = useState('');

    const[cart, setCart] = useState([]);
    const[eventCost, setEventCost] = useState(0);
    
    useEffect(() => {
    if(regID==1){
      setTexId(regTexID)
    }
    else if(regID==2){
      setMemID1(regTexID)
    }
    else if(regID==3){
      setMemID2(regTexID)
    }
    else if(regID==4){
      setMemID3(regTexID)
    }
  }, [regTexID]);


    const updateRegTexID  = (newValue) => {
      setRegTexID(newValue);
      
    };

    const updateStateValue = (newValue) => {
      setRegistrationtModalVisible(newValue);
    };


    // if(stateValue == "Close"){
    //   setRegistrationtModalVisible(!modalRegistrationVisible)
    // }


    useEffect(() => {
      axios
        .get(MEMBERAPPURL + `getEventBoxes`)
        .then((response) => {
          let temp = response.data.event.map((e) => {
            return {...e, isChecked: false};
          });
          setEventBoxes(temp);
        })
        .catch((err) => {
          console.log(err);
        });

    }, []);


    //console.log(eventsBoxes);

    const GetBTN = ({ onPress, title }) => (
      <TouchableOpacity onPress={() => { 
          axios
            .post(MEMBERAPPURL + `getUserByEmail`, { email: tEmail })
            .then((response) => {
              console.log(response.data.user.name);
              setUser(response.data.user.name);
              if(tid == 1){
                setTexId(response.data.user._id);
                setAccountModalVisible(false);
                ToastAndroid.show('TEXID Fetched', ToastAndroid.SHORT);
              }
              else if(tid == 2){
                setAccountModalVisible(false);
                setMemID1(response.data.user._id);
                ToastAndroid.show('TEXID Fetched', ToastAndroid.SHORT);
              }
              else if(tid == 3){
                setAccountModalVisible(false);
                setMemID2(response.data.user._id);
                ToastAndroid.show('TEXID Fetched', ToastAndroid.SHORT);
              }
              else if(tid == 4){
                setAccountModalVisible(false);
                setMemID3(response.data.user._id);
                ToastAndroid.show('TEXID Fetched', ToastAndroid.SHORT);
              }
              
              console.log(userTexId);
            })
            .catch((err) => {
              if(err.response.status==400)
              ToastAndroid.show('Invalid EmailID', ToastAndroid.SHORT);
            });
        
        
       }} style={{marginTop:20,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 7,
        elevation: 3,
        backgroundColor: "#079779"}}>
        <Text style={{color:'#fff'}}>{title}</Text>
      </TouchableOpacity>
    );
    
    // const registerConfirmed = (id, groupMembers) => {
    //   var total;
    //   let temp = eventsBoxes.map((event) =>{
    //     if(id == event._id){
    //       console.log("registered event "+id);
    //       total = event.fees;
    //       return {...event, isChecked : !event.isChecked};
    //     }
    //     return event
    //   })
    //   navigation.navigate('NEXT',{total: total, cart: temp.filter((event) => event.isChecked == true), groupMembers: groupMembers})
    // }



    let selected = eventsBoxes.filter((event) => event.isChecked == true);

    const RegisterGroupBTN = ({ onPress, memID1, memID2, memID3 }) => (
      <TouchableOpacity onPress={()=>{
        let tempEvent = {};
        let temp = eventsBoxes.map((event) => {
          if (eventId === event._id) {
            tempEvent = event;
            setTotalCost(totalCost + event.fees)
            return { ...event, isChecked : true };
          }
          return event
      });
      setEventBoxes(temp)
      
        console.log(texId + " " + memID1 + " " + memID2 + " " + memID3 + " " + eventId);
        if(texId.length > 0){
          if(memID3 != null)
            cart.push({event: tempEvent._id, groupMembers: [texId, memID1, memID2, memID3]})
          else
            cart.push({event: tempEvent._id, groupMembers: [texId, memID1, memID2]})
          setGroupVisible(!groupVisible);
        }
        
        console.log(cart);
      }}
       style={styles.getBtnContainer}>
        <Text style={styles.appButtonText}><FontAwesome name="check" size={24} color="#fff" /></Text>
      </TouchableOpacity>
    );
    
    const CancelBTN = ({ onPress, title }) => (
      <TouchableOpacity onPress={()=>
      {
        setBlur(styles.normal)
        setAccountModalVisible(!modalAccountVisible)
      }
       }
        style={[styles.cancelBtnContainer,{alignSelf:'flex-end'}]}>
        <Text style={styles.appButtonText}><Entypo name="cross" size={24} color="#fff" /></Text>
      </TouchableOpacity>
    );

    const CancelRegBTN = ({ onPress, title }) => (
      
      <TouchableOpacity  onPress={()=>
      {
        setBlur(styles.normal)
        setRegistrationtModalVisible(!modalRegistrationVisible)}
       }
        style={[styles.cancelBtnContainer,{alignSelf:'flex-end'}]}>
        <Text style={styles.appButtonText}><Entypo name="cross" size={24} color="black" /></Text>
      </TouchableOpacity>
    );

    const CancelGroupBTN = ({ onPress, title }) => (
      <TouchableOpacity onPress={()=>{
        setGroupVisible(!groupVisible)
        setTotalCost(totalCost - eventCost)
      }} style={styles.cancelBtnContainer}>
        <Text style={styles.appButtonText}><Entypo name="cross" size={24} color="white" /></Text>
      </TouchableOpacity>
    );
    

    const handleChange = (id) => {
     // console.log(id);
      let temp = eventsBoxes.map((event) => {
          if (id === event._id) {
            if(event.isChecked == false){
              if(!cart.some((obj)=>{ 
                console.log("displaying obj:")
                console.log(obj)
                return id == obj.event })){
                cart.push({event: event._id, groupMembers: [texId]});
                setTotalCost(totalCost + event.fees);
              }
              console.log("cart:")
              console.log(cart)
            }else{
              let tempCart = cart.map((obj) => {
                if(id != obj.event){
                  return obj
                }
              })
              tempCart = tempCart.filter((obj1) => {
                return obj1 !== undefined
              })
              console.log("after removing:")
              console.log(tempCart)
              setCart(tempCart)
              setTotalCost(totalCost - event.fees);
              setEventId('');
            }
            return { ...event, isChecked : !event.isChecked };
          }
          return event;
      });
      setEventBoxes(temp);
    };

    

    function CseEvent(){
      return(
        <View style={{flex:1, backgroundColor:'#171717'}}>
        <FlatList
        data={eventsBoxes}
        style={[styles.item]}
        renderItem={({ item }) => (
          (item.dept == 'CSE' && item.status == true) ?
          <View>
            <Card style={{ margin: 5 }}>
          <View style={styles.card}>
              <View
                  style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems:'center'
                  }}>
                  <TouchableWithoutFeedback onPress={() => {texId.length > 0 ? handleChange(item._id) : alert('Please enter texid.')}} >
                      <MaterialCommunityIcons
                          name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color="#079779" />
                  </TouchableWithoutFeedback>
                  <Text style={styles.EventRegistername}>{item.name}</Text>
              </View>
          </View>
          </Card>
          {
            groupVisible == true && eventId === item._id?
            <GroupRegisterForm/>
            :null
          }
          
          </View>
          :null
        )}
        keyExtractor={item => item._id}
      />
      </View>
      )
    }

    function MechEvent(){
      return(
        <View style={{flex:1, backgroundColor:'#171717'}}>
        <FlatList
        data={eventsBoxes}
        style={styles.item}
        renderItem={({ item }) => (
          (item.dept == 'MECH' && item.status == true) ?
          <View>
            <Card style={{ margin: 5 }}>
          <View style={styles.card}>
              <View
                  style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems:'center'
                  }}>
                  <TouchableWithoutFeedback onPress={() =>{texId.length > 0 ? handleChange(item._id) : alert('Please enter texid.')}} >
                      <MaterialCommunityIcons
                          name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color="#079779" />
                  </TouchableWithoutFeedback>
                  <Text style={styles.EventRegistername}>{item.name}</Text>
              </View>
          </View>
          </Card>
          {
            groupVisible == true && eventId === item._id?
            <GroupRegisterForm/>
            :null
          }
          </View>
          :null
        )}
        keyExtractor={item => item._id}
      />
      </View>
      )
    }

    function EntcEvent(){
      return(
        <View style={{flex:1, backgroundColor:'#171717'}}>
        <FlatList
        data={eventsBoxes}
        style={styles.item}
        renderItem={({ item }) => (
          (item.dept == 'EE' && item.status == true) ?
          <View>
            <Card style={{ margin: 5 }}>
          <View style={styles.card}>
              <View
                  style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems:'center'
                  }}>
                  <TouchableWithoutFeedback onPress={() => {texId.length > 0 ? handleChange(item._id) : alert('Please enter texid.')}}>
                      <MaterialCommunityIcons
                          name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color="#079779" />
                  </TouchableWithoutFeedback>
                  <Text style={styles.EventRegistername}>{item.name}</Text>
              </View>
          </View>
          </Card>
          {
            groupVisible == true && eventId === item._id?
            <GroupRegisterForm/>
            :null
          }
          
          </View>
          :null
        )}
        keyExtractor={item => item._id}
      />
      </View>
      )
    }
  
  const GroupRegisterForm = () =>{
    
    return(
      totalEntries == 3 ?
      <View style = {styles.item}>
        <Text style={styles.grpTextMember}>Group member 2</Text>
        <View style={{flexDirection: "row", justifyContent:'space-around'}}>
        <TextInput
           value={memID1}
           editable = {false}
           placeholder="TEXID"
           placeholderTextColor="#D9D9D9"
           onChangeText={text =>setMemID1(text)}
           style={styles.inputTex}/>
           <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={() => {
              setRegID(2)
              setRegistrationtModalVisible(!modalRegistrationVisible);
              setBlur(styles.normal)
            }}>
            <View style={[{alignItems:'center', justifyContent:'center', backgroundColor:'#079779', height:40, width:60},styles.register]}>
                <FontAwesome name="pencil-square-o" size={25} color='#fff' />
            </View>
        </TouchableWithoutFeedback>
        </View>
        </View>

           <TouchableWithoutFeedback onPress={() => {
             setTid(2)
             setAccountModalVisible(!modalAccountVisible);
            
            }}>
            <Text style={{color:'#079779', marginTop:5}}>Already have an account?</Text>
        </TouchableWithoutFeedback>
        
        <Text style={styles.grpTextMember}>Group member 3</Text>
        <View style={{flexDirection: "row", justifyContent:'space-around'}}>
        <TextInput
           value={memID2}
           editable = {false}
           placeholder="TEXID"
           placeholderTextColor="#D9D9D9"
           onChangeText={text =>setMemID2(text)}
           style={styles.inputTex}/>
           <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={() => {
              setRegID(3)
              setRegistrationtModalVisible(!modalRegistrationVisible);
              setBlur(styles.normal)
            }}>
            <View style={[{alignItems:'center', justifyContent:'center', backgroundColor:'#079779', height:40, width:60},styles.register]}>
                <FontAwesome name="pencil-square-o" size={25} color='#fff' />
            </View>
        </TouchableWithoutFeedback>
        </View>
        </View>
           
           <TouchableWithoutFeedback onPress={() => {
             setTid(3)
             setAccountModalVisible(!modalAccountVisible);
            
            }}>
            <Text style={{color:'#079779', marginTop:5}}>Already have an account?</Text>
        </TouchableWithoutFeedback>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', marginTop:15}}>
            <CancelGroupBTN title="X" size="sm" backgroundColor="#007bff" />
            <RegisterGroupBTN memID1={memID1} memID2={memID2} size="sm" backgroundColor="#007bff" />
            </View>
      </View>
      :
      <View style = {styles.item}>
        <Text style={styles.grpTextMember}>Group member 2</Text>
        <View style={{flexDirection: "row", justifyContent:'space-around'}}>
        <TextInput
           value={memID1}
           placeholder="TEXID"
           editable = {false}
           placeholderTextColor="#D9D9D9"
           onChangeText={text =>setMemID1(text)}
           style={styles.inputTex}/>


           <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={() => {
              setRegID(2)
              setRegistrationtModalVisible(!modalRegistrationVisible);
              setBlur(styles.normal)
            }}>
            <View style={[{alignItems:'center', justifyContent:'center', backgroundColor:'#079779', height:40, width:60},styles.register]}>
                <FontAwesome name="pencil-square-o" size={25} color='#fff' />
            </View>
        </TouchableWithoutFeedback>
        </View>
        </View>

           <TouchableWithoutFeedback onPress={() => {
             setTid(2)
             setAccountModalVisible(!modalAccountVisible);
            
            }}>
            
            <Text style={{color:'#079779', marginTop:5}}>Already have an account?</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.grpTextMember}>Group member 3</Text>
        <View style={{flexDirection: "row", justifyContent:'space-around'}}>
        <TextInput
           value={memID2}
           placeholder="TEXID"
           editable = {false}
           placeholderTextColor="#D9D9D9"
           onChangeText={text =>setMemID2(text)}
           style={styles.inputTex}/>
           <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={() => {
              setRegID(3)
              setRegistrationtModalVisible(!modalRegistrationVisible);
              setBlur(styles.normal)
            }}>
            <View style={[{alignItems:'center', justifyContent:'center', backgroundColor:'#079779', height:40, width:60},styles.register]}>
                <FontAwesome name="pencil-square-o" size={25} color='#fff' />
            </View>
            
        </TouchableWithoutFeedback>
        </View>
        </View>
           <TouchableWithoutFeedback onPress={() => {
             setTid(3)
             setAccountModalVisible(!modalAccountVisible);
            
            }}>
            <Text style={{color:'#079779', marginTop:5}}>Already have an account?</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.grpTextMember}>Group member 4</Text>
        <View style={{flexDirection: "row", justifyContent:'space-around'}}>
        <TextInput
           value={memID3}
           placeholder="TEXID"
           editable = {false}
           placeholderTextColor="#D9D9D9"
           onChangeText={text =>setMemID3(text)}
           style={styles.inputTex}/>
           <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={() => {
              setRegID(4)
              setRegistrationtModalVisible(!modalRegistrationVisible);
              setBlur(styles.normal)
            }}>
            <View style={[{alignItems:'center', justifyContent:'center', backgroundColor:'#079779', height:40, width:60},styles.register]}>
                <FontAwesome name="pencil-square-o" size={25} color='#fff' />
            </View>
        </TouchableWithoutFeedback>
        </View>
      </View>
           <TouchableWithoutFeedback onPress={() => {
             setTid(4)
             setAccountModalVisible(!modalAccountVisible);
            
            }}>
            
        
            <Text style={{color:'#079779', marginTop:5}}>Already have an account?</Text>
        </TouchableWithoutFeedback>
           <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', marginTop:15}}>
            <CancelGroupBTN title="X" size="sm" backgroundColor="#007bff" />
            <RegisterGroupBTN memID1={memID1} memID2={memID2} memID3={memID3} size="sm" backgroundColor="#007bff" />
            
            </View>
      </View>
      
    )
  }

  return (
       <View style = {[blur,{flex:1, backgroundColor:'#171717'}]}>
        <View style={[ blur,{marginTop:10,
            flexDirection: "row", justifyContent:'space-around',backgroundColor:'#171717'
          }]}>
            
          <View>
          <Text style={{color:"#079779", paddingLeft:16, paddingTop: 5, textTransform:"uppercase"}}>Name : {user}</Text>
          <TextInput
            value={texId}
            placeholder="TEXID"
            placeholderTextColor="#D9D9D9"
            onChangeText={text =>{setTexId(text); setUser('');}}
            style={[styles.inputTex, {paddingTop: 0}]}/>
            </View>
        
        <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={() => {
              setRegID(1)
              setRegistrationtModalVisible(!modalRegistrationVisible);
              setBlur(styles.normal)
            }}>
            <View style={[{alignItems:'center', justifyContent:'center', backgroundColor:'#079779', height:40, width:60},styles.register]}>
                <FontAwesome name="pencil-square-o" size={25} color='#fff' />
            </View>
        </TouchableWithoutFeedback>
        </View>
        {/* Modal that handles register user */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalRegistrationVisible}
        onRequestClose={() => {
          

          setRegistrationtModalVisible(!modalRegistrationVisible);
        }}
        >
            <View style={styles.centeredView}>
            
            <View style={styles.modalView}>
            <CancelRegBTN title="X" size="sm" backgroundColor="#007bff" />
            <ScrollView>
                <UserRegistration updateStateValue={updateStateValue} updateRegTexID={updateRegTexID} userName={setUser}/>
                {/* <Button title='close' onPress={()=>setRegistrationtModalVisible(!modalRegistrationVisible)}></Button> */}
            </ScrollView>
            </View>
            </View>
        </Modal>
        </View>
        <View style ={{padding:10, marginLeft:20, backgroundColor:'#171717'}}>
        <TouchableWithoutFeedback onPress={() => {
            setTid(1)
            setAccountModalVisible(!modalAccountVisible);
            
            }}>
            <Text style={{color:'#079779'}}>Already have an account?</Text>
        </TouchableWithoutFeedback>
        </View>

          <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: '#171717',
          opacity:0.9
        },
      }}>
          <Tab.Screen name="CSE" component={CseEvent} options={{tabBarActiveTintColor:'#fff'}}/>
          <Tab.Screen name="MECH" component={MechEvent} options={{tabBarActiveTintColor:'#fff'}}/>
          <Tab.Screen name="EE" component={EntcEvent} options={{tabBarActiveTintColor:'#fff'}}/>
          </Tab.Navigator>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalAccountVisible}
        
        onRequestClose={() => {
          setAccountModalVisible(false);
          setBlur(styles.normal)
        }}

        >
            <View style={styles.centeredView}>
            <View style={[styles.modalView,{backgroundColor:'#171717'}]}>
            <CancelBTN title="X" size="sm" backgroundColor="#007bff" />
            <View>
              
              <Text style={{color:'#fff', marginLeft:5, opacity:0.79, width:200}}>Email</Text>
                <TextInput 
                
                onChangeText={text =>settEmail(text)}
                style={styles.input}
                />


                
            </View>
                {/* <Button title='Get Id' onPress={()=>setAccountModalVisible(!modalAccountVisible)}></Button>
                <Button title='close' onPress={()=>setAccountModalVisible(!modalAccountVisible)}></Button> */}
                <GetBTN title="GET ID" size="sm" backgroundColor="#007bff" > </GetBTN>
            </View>
            </View>
        </Modal>
        
        <View style={styles.itemCart}>
          <Text style={styles.cartText}>CART {selected.length}</Text>
          <Text style={styles.cartText}>Total Cost {'\u20B9'}{totalCost}</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity style={styles.nextButton} onPress={() => {
          axios
            .post(`https://texephyr.live/api/webuser/checkID`, { userid: texId })
            .then((response) => {
              if(response.status == 204){
                console.log(response.status)
                // ToastAndroid.show('TEXID is Empty', ToastAndroid.SHORT);
                alert("Please enter texid.");
              }
              else if(response.status == 200){
                if(totalCost != 0 && cart.length > 0 && groupVisible == false){
                  navigation.navigate('NEXT',{total: totalCost, cart: cart, texId: texId,noOfitems: selected.length})
                }
              }
              
            })
            .catch((err) => {
              if(err.response.status == 401){
                ToastAndroid.show('Invalid TEXID', ToastAndroid.SHORT);
              };
            });
          
        }}>
          <Text style={styles.nextBtn}>NEXT</Text>
        </TouchableOpacity>
        </View>
        </View>
       
       
  )
}

export default EventRegisteration

