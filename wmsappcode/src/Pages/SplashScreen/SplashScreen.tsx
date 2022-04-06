import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../Services/CustomSizes';

import {bee_logo, bg_image, ixambee_logo} from '../../Assets/Images';
import AsyncStorage from '@react-native-community/async-storage';
import theme from '../../Constants/theme';

const SplashScreen = ({navigation}: {navigation: any}) => {
  const ifUser = async () => {
    let token = await AsyncStorage.getItem('@auth_token');
    setTimeout(() => {
      if (token === 'yes') {
        navigation.replace('main');
      } else {
        navigation.replace('signin');
      }
    }, 2000);
  };
  useEffect(() => {
    ifUser();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground style={styles.imageContainer} source={bg_image}>
        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={bee_logo} style={styles.beeLogo} />
        </View>
        {/* <View style={styles.bottomContainer}>
          <Image source={ixambee_logo} style={styles.ixambeeLogo} />
          <Text style={styles.tagline}>Government Jobs Made Easy</Text>
        </View> */}
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  beeLogo: {
    width: theme.SIZES.large * 7,
    height: theme.SIZES.large * 7,
  },
  ixambeeLogo: {
    height: theme.SIZES.large * 2,
    marginBottom: theme.SIZES.small,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: theme.SIZES.normal + 4,
    color: theme.COLORS.FONT_COLOR_1,
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.normal,
  },
});
