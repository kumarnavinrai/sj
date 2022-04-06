import React, {useEffect} from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import { ImageBackground, ScrollView, View, TouchableOpacity, Text, Alert} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {bg_image, sbi_logo} from '../../Assets/Images';
import Loader from './WaterLevel.Loader';
import styles from './WaterLevel.styles';
import {
  BarChart,
} from "react-native-chart-kit";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';



const WaterLevel = () => {

  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [heightoftank, setHeightoftank] = useState('0');
  const [radiustoftank, setRadiusoftank] = useState('0');
  const [tankcapacity, setTankcapacity] = useState('0');
  const [waterPresentInLeters, setWaterPresentInLeters] = useState('0');
  const dispatch = useDispatch();
  const data = {
    labels: ["Capacity", "Filled"],
    datasets: [
      {
        data: [parseInt(tankcapacity), parseInt(waterPresentInLeters)],
        colors: [
            (opacity = 1) => `#BE95FF`,
            (opacity = 1) => `#78A9FF`,
        ]
      }
    ]
  };

  useFocusEffect(
    React.useCallback(() => {
      setDataInsidePage();
    }, [])
  );

  const getDataFromApi = async (url: any) => {
      let distanceReadingArray = [];
          for(let i = 0; i < 10; i++) {
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
          
            distanceReadingArray.push(response);
            } catch (error) {
              console.error(error);
            }
            await timer(2000);
          }
          
          let max = distanceReadingArray.sort((a: any,b: any)=>a-b)[distanceReadingArray.length - 1];
          distanceReadingArray = [];
          return max;
    };
    
    const timer = (ms: any) => { return new Promise(res => setTimeout(res, ms)); }
    

  const validData = (data: any) => {
    if(data === undefined){
      return false;
    }else if(data === 'undefined'){
      return false;
    }else if(data === null){
      return false;
    }else if(data === 'null'){
      return false;
    }else if(data === ''){
      return false;
    }
     return true;
  }

  const setDataInsidePage = async () => {
    let du = await _retrieveData('@distanceurl');
    du = du?du.toString():'';
    let distanceFromApi = await getDataFromApi(du);
    if(distanceFromApi === undefined 
      || distanceFromApi === 'undefined' 
      || distanceFromApi === null 
      || distanceFromApi === 'null'){ return false; }    
    
    let distanceNow = parseInt(distanceFromApi);
    distanceNow = distanceNow !== undefined?distanceNow:'0';
    let hot = await _retrieveData('@tankheight');
    hot = validData(hot) === true?hot:'0';
    setHeightoftank(hot);
    let diameterOfTank = await _retrieveData('@tankdiameter');
    diameterOfTank = validData(diameterOfTank) === true?diameterOfTank:'0';
    let rOfTank = (parseInt(diameterOfTank)/2).toString();
    setRadiusoftank(rOfTank);
    let tc = await _retrieveData('@tankcapacity');
    tc = validData(tc) === true?tc:'0';
    setTankcapacity(tc);
    let filledTankHeight = parseInt(hot) - parseInt(distanceNow); //in cm
    let volume = Math.PI * parseInt(rOfTank) * parseInt(rOfTank) * parseInt(filledTankHeight.toString());
    volume = volume/1000;
    volume = parseInt(volume.toString());
    setWaterPresentInLeters(volume.toString());
  }

  const _storeData = async (key: any, data: any) => {
    try {
      await AsyncStorage.setItem(
        key,
        data
      );
    } catch (error: any) {
      // Error saving data
      console.log(error)
    }
  };

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
  
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 1,
    height:5000,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
  
    style: {
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#e3e3e3",
      strokeDasharray: "0",
    },
    propsForLabels: {
      fontFamily: "Bogle-Regular",
    },
  };


  

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
      {load ? (
        <Loader />
      ) : (
        <ScrollView style={{flex: 1, width: '100%'}}>
          <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical:20, marginHorizontal: 5}}>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
  
                <TouchableOpacity
                    onPress={setDataInsidePage}
                    style={{    backgroundColor: '#012f6c',
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    borderRadius:10,}}>
                    <Text
                      style={[
                        {
                          fontFamily: 'Montserrat-Bold',
                          fontWeight: 'bold',
                          fontSize: 14,
                          color: '#ffffff',
                        },
                      ]}>
                      {"Refresh"}
                    </Text>
                  </TouchableOpacity>
              </View>
              { validData(tankcapacity) === true && tankcapacity !== '0'?    
              <BarChart
                data={data}
                width={wp('100%')}
                height={600}
                fromZero={true}
                yAxisSuffix={''}
                yAxisLabel="L"
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                withCustomBarColorFromData={true}
                flatColor={true}
                withInnerLines={false}
                showBarTops={false}
                showValuesOnTopOfBars={true}
              />
              :null}
          </View>
        
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default WaterLevel;

