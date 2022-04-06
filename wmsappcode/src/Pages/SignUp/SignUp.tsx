import {
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
  Vibration,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Register,
  handleRegister,
  resetRegister,
  signInGoogle,
  loginWithFacebook,
} from '../../Store/actions/user';
import {useDispatch, useSelector} from 'react-redux';

import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import TextField from '../../Components/Common/TextField/TextField';
import User from '../../Store/models/user';
import styles from './styles';
import {bg_image} from '../../Assets/Images';
import SocialItem from '../../Components/SocialItem/SocialItem';
import theme from '../../Constants/theme';

type props = {
  navigation?: any;
};
const SignUp: FunctionComponent<props> = ({navigation}) => {
  const register = useSelector((state: any) => state.user.register);
  const [load, setLoad] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handle_register = (key: any, key1: any, value: any) => {
    dispatch(handleRegister(key, key1, value));
  };

  const reset_register = () => {
    dispatch(resetRegister());
  };
  const signup = async () => {
    setError('');
    let error_signup: boolean = false;

    try {
      //*Validate Data Register
      for (let key in register) {
        if (register[key].text.length === 0) {
          Vibration.vibrate();
          throw new Error(`${key} is required`);
        }
        if (register[key].error_message.length !== 0) {
          Vibration.vibrate();
          error_signup = true;
          throw new Error(register[key].error_message);
        }
      }
      if (error_signup) return;

      let userData = new User(
        register.email.text.toLowerCase(),
        register.password.text,
      );
      console.log('signup_user', userData);
      setLoad(true);
      await dispatch(Register(navigation, userData));
      setLoad(false);
    } catch (err) {
      console.log('error_register', err.message);
      setError(err.message);
      setLoad(false);
    }
  };

  const google_signin = async () => {
    try {
      setLoad(true);
      await dispatch(signInGoogle(navigation));
      setLoad(false);
    } catch (err) {
      setError(err.message);
      setLoad(false);
    }
  };
  const facebook_signin = async () => {
    try {
      setLoad(true);
      await dispatch(loginWithFacebook(navigation));
      setLoad(false);
    } catch (err) {
      setError(err.message);
      setLoad(false);
    }
  };
  useEffect(() => {
    console.log('error', error);
  }, [error]);

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={bg_image} style={styles.parentContainer}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: theme.SIZES.small}}>
          <View style={styles.basicstart}>
            <Text style={styles.signuptitle}>
              India's only App provide all Mock test free of cost
            </Text>
            <TextField
              icon={'mail'}
              inputProps={{
                placeholder: 'Enter Email Address',
                value: register.email.text,
                onChangeText: (text: string) =>
                  handle_register('email', 'text', text),
                onBlur: () => handle_register('email', 'active', false),
                onFocus: () => handle_register('email', 'active', true),
                keyboardType: 'email-address',
                multiline: false,
              }}
              error={register.email.error_message}
            />
            <TextField
              icon={'lock'}
              inputProps={{
                placeholder: 'Enter Password',
                value: register.password.text,
                onChangeText: (text: string) => {
                  handle_register('password', 'text', text);
                },
                onBlur: () => handle_register('password', 'active', false),
                onFocus: () => handle_register('password', 'active', true),
                keyboardType: 'default',
                multiline: false,
              }}
              secureText={{
                onToggle: () =>
                  handle_register('password', 'show', !register.password.show),
                hidden: register.password.show,
              }}
              error={register.password.error_message}
            />
          </View>
          {error.length > 0 ? (
            <View style={styles.errortitle}>
              <Text style={styles.errortext}>{error}</Text>
            </View>
          ) : null}
          <View style={styles.send}>
            <CustomButton
              title={'JOIN NOW'}
              touchableProps={{
                onPress: () => signup(),
                disabled: load,
              }}
              loading={load}
              size={'SMALL'}
              filled
            />
          </View>
          <SocialItem
            onClickFacebook={() => facebook_signin()}
            onClickGoogle={() => google_signin()}
          />

          <View style={styles.touchsend2}>
            <Text style={styles.noacc}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('signin')}>
              <Text style={styles.signintext}>Login now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;
