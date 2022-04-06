import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextComponent,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Login,
  handleLogin,
  signInGoogle,
  loginWithFacebook,
} from '../../Store/actions/user';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from '../../Components/Common/TextField/TextField';
import styles from './styles';
import {bg_image} from '../../Assets/Images';
import SocialItem from '../../Components/SocialItem/SocialItem';
import theme from '../../Constants/theme';

type props = {
  navigation?: any;
};
const SignIn: FunctionComponent<props> = ({navigation}) => {
  const [load, setLoad] = useState(false);
  const login = useSelector((state: any) => state.user.login);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleInput = (key: any, key1: any, value: any) => {
    dispatch(handleLogin(key, key1, value));
  };

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const signin = async () => {
    setError('');
    try {
      if (login.email.text.length === 0 || login.password.text.length === 0)
        throw new Error(
          `${login.email.text.length === 0 ? 'Email' : 'password'} is empty`,
        );
      if (
        login.email.error_message.length !== 0 &&
        login.password.error_message.length !== 0
      )
        throw new Error(
          `${
            login.email.error_message.length === 0
              ? login.email.error_message
              : login.password.error_message
          }`,
        );
      let loginData = {
        email: login.email.text.toLowerCase(),
        password: login.password.text,
      };
      setLoad(true);
      await dispatch(Login(navigation, loginData));
      setLoad(false);
    } catch (err: any) {
      console.log('error_login', err);
      setError(err.message);
      setLoad(false);
    }
  };

  const configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: '', //If fails add webclient id
      offlineAccess: false,
    });
  };

  //*google signin
  useEffect(() => {
    configureGoogleSign();
  }, []);

  const google_signin = async () => {
    setError('');
    try {
      setLoad(true);
      await dispatch(signInGoogle(navigation));
      setLoad(false);
    } catch (err: any) {
      setLoad(false);
      setError(err.message);
    }
  };
  const facebook_signin = async () => {
    setError('');
    try {
      setLoad(true);
      await dispatch(loginWithFacebook(navigation));
      setLoad(false);
    } catch (err: any) {
      setLoad(false);
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ImageBackground source={bg_image} style={styles.imageBackground}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: theme.SIZES.large}}>
          <View style={styles.firstContainer}>
            <Text style={styles.signintitletext}>
              Login into WMS
            </Text>
            <TextField
              icon={'mail'}
              inputProps={{
                placeholder: 'Email',
                value: login.email.text,
                onChangeText: (text: string) => {
                  handleInput('email', 'text', text);
                },
                onBlur: () => handleInput('email', 'active', false),
                onFocus: () => handleInput('email', 'active', true),
                keyboardType: 'email-address',
              }}
              error={login.email.error_message}
            />
            <TextField
              icon={'lock'}
              inputProps={{
                placeholder: 'Password',
                value: login.password.text,
                onChangeText: (text: string) => {
                  handleInput('password', 'text', text);
                },
                onBlur: () => handleInput('password', 'active', false),
                onFocus: () => handleInput('password', 'active', true),
                keyboardType: 'default',
              }}
              secureText={{
                onToggle: () =>
                  handleInput('password', 'show', !login.password.show),
                hidden: login.password.show,
              }}
              error={login.password.error_message}
            />
          </View>
          
          {error.length > 0 ? (
            <View style={styles.errortitle}>
              <Text style={styles.errortext}>{error}</Text>
            </View>
          ) : null}
          <CustomButton
            filled
            title={'LOG IN'}
            touchableProps={{
              onPress: () => signin(),
              disabled: load,
            }}
            loading={load}
            size={'SMALL'}
          />
          
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
