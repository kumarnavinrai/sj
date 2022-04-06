import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {FunctionComponent} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {bg_image, d_arrow, i_z, sbi_logo, viewall, r_arrow} from '../../Assets/Images';
import styles from './Motor.styles';


type props = {
  navigation?: any;
};

const Motor: FunctionComponent<props> = ({navigation}) => {

// const Dashboard = () => {
  const banners = useSelector((state: any) => state.dashboard.banners);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

 

  const _retrieveData = async (key: any) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      }
  
      return 'null';
    } catch (error: any) {
      // Error retrieving data
      console.log(error)
    }
  };
  
  const getDataFromApi = async (url: any) => {
  
    //distanceurl
    try {
      let response = await fetch(url) //distanceurl replace this with this
      .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        let indexfirst = html.indexOf('{');
        let indexsecond = html.indexOf('}');
        let mySubString = html.substring(
          html.indexOf("{") + 1, 
          html.lastIndexOf("}")
        );
        mySubString = mySubString.replace('distance:', '');
        mySubString = mySubString.trim();
        return mySubString;
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
  
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const motorOn = async () => {
    let mo = await _retrieveData('@motoron');
    mo = mo?mo.toString():'';
    let distanceFromApi = await getDataFromApi(mo);
  }

  const motorOff = async () => {
    let mof = await _retrieveData('@motoroff');
    mof = mof?mof.toString():'';
    let distanceFromApi = await getDataFromApi(mof);
  }

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
              onPress={motorOn}
              style={[
                styles.button,
                styles.filled,
                styles.square,
                ]}>
              <Text
                style={[
                  {
                    fontFamily: 'Montserrat-Bold',
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: '#ffffff',
                  },
                ]}>
                {"Motor On"}
              </Text>
            </TouchableOpacity>
        </View>
        <View  style={{justifyContent: 'center', alignItems: 'center'}}>      
            <TouchableOpacity
              onPress={motorOff}
              style={[
                styles.button,
                styles.filled,
                styles.square,
                ]}>
              <Text
                style={[
                  {
                    fontFamily: 'Montserrat-Bold',
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: '#ffffff',
                  },
                ]}>
                {"Motor Off"}
              </Text>
            </TouchableOpacity>
        </View>    
      </ScrollView>
    </ImageBackground>
  );
};

export default Motor;

