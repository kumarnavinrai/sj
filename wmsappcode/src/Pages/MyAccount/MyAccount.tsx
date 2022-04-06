import React from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {bg_image} from '../../Assets/Images';
import {getUser} from '../../Store/actions/user';
import styles from './MyAccount.styles';
const MyAccount = () => {
  const [load, setLoad] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const get_data = useCallback(async () => {
    try {
      setLoad(true);
      await dispatch(getUser(user.userID));
      setLoad(false);
    } catch (err) {
      setLoad(false);
      setError(err.message);
    }
  }, [dispatch, setLoad, setError]);

  useEffect(() => {
    get_data();
  }, []);

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
      <ScrollView style={styles.parentContainer}></ScrollView>
    </ImageBackground>
  );
};

export default MyAccount;
