import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useState, useRef } from 'react';
import { ImageBackground, ScrollView, View, ToastAndroid, Button } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { bg_image } from '../../Assets/Images';
import styles from './Live.styles';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';



const Live = () => {
  const active_paid_courses = useSelector(
    (state: any) => state.dashboard.active_paid_courses,
  );
  const active_demo_courses = useSelector(
    (state: any) => state.dashboard.active_demo_courses,
  );
  const user = useSelector((state: any) => state.user.user);

  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();
  const data = {
    labels: ["Capacity", "Filled"],
    datasets: [
      {
        data: [100, 50],
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

  const setDataInsidePage = async () => {

    let cameraurl = await _retrieveData('@cameraurl');
    setUrl(cameraurl !== undefined?cameraurl:'');
    setLoad(true);
    console.log(cameraurl)
    

  }

  const showToastWithGravity = (msg: string) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };


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
    height: 5000,
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


  let WebViewRef: any;

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>

      <ScrollView style={{ flex: 1 }}>
        {load ?
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: url }}
              style={{ height: 500, width: wp('100%') }}
              ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            />
            <Button 
          
              title="Reload !" 
              onPress={() => { 
              WebViewRef && WebViewRef.reload();
              setLoad(false);
              setTimeout(() => {
                setLoad(true);
              }, 2000); 
            }} />
          </View>
          : null}


      </ScrollView>

    </ImageBackground>
  );
};

export default Live;
