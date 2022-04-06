import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { ImageBackground, ScrollView, View, ToastAndroid } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { bg_image } from '../../Assets/Images';
import styles from './Hotspot.styles';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const Hotspot = () => {
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

    let spoturl = await _retrieveData('@spoturl');
    setUrl(spoturl !== undefined?spoturl:'');
    setLoad(true);
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


  const get_data = useCallback(async () => {
    try {
      setLoad(true);
      //* fetch banners
      setLoad(false);
    } catch (err) {
      setLoad(false);
    }
  }, [dispatch, setLoad, setError]);

  useEffect(() => {
    get_data();
  }, []);

  useEffect(() => {
    console.log('mycourses', user, active_demo_courses, active_paid_courses);
  }, [user, active_demo_courses, active_paid_courses]);

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>

        {load ?
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: 550, width: 300 }}>
            <WebView
              automaticallyAdjustContentInsets={false}
              scrollEnabled={false}
              javaScriptEnabled={false}
              source={{ uri: url }}
              style={{ height: 550, width: 300 }}
            />
          </View>
          : null}


    </ImageBackground>
  );
};

export default Hotspot;
