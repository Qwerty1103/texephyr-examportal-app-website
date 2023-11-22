import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import React, { useState, useRef , useEffect} from 'react';

export default function Splash_Screen({navigation}) {
    const [align, setAlign] = useState('center');
    const [alignsecond, setAlignsecond] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }).start();
      };
      fadeIn()
    setTimeout(() => {
      setAlign('flex-start'), setAlignsecond(true);
        
    }, 3000);
  return (
    <View style={{flex:1, backgroundColor:'#000'}}>
    <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim
          }, styles.container
        ]}
        
      >
    <View>
      <Image
        source={require('../../assets/TexLogo.png')}
        style={{ width: 300, height: 70 }}
        resizeMode="stretch"
      />
      {useEffect(() => { !alignsecond ? null : (navigation.navigate('Login'))}, [alignsecond])}
    </View>
    </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 40,
    },
  });