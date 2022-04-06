import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {FunctionComponent} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  bepedia,
  bg_image,
  daily_quiz,
  i_z,
  make_test,
  sbi_logo,
} from '../../Assets/Images';
import BannerListItem from '../../Components/BannerListItem/BannerListItem';
import BePediaItem from '../../Components/BePediaItem/BePediaItem';
import CourseListItem from '../../Components/CourseListItem/CourseListItem';
import DailyQuizItem from '../../Components/DailyQuizItem/DailyQuizItem';
import MakeMyTestItem from '../../Components/MakeMyTestItem/MakeMyTestItem';
import TitleHeader from '../../Components/TitleHeader/TitleHeader';
import theme from '../../Constants/theme';
import {getBanners} from '../../Store/actions/dashboard';
import Loader from './Alarm.Loader';
import styles from './Alarm.styles';

type props = {
  navigation?: any;
};

const Alarm: FunctionComponent<props> = ({navigation}) => {
  // const Dashboard = () => {
  const banners = useSelector((state: any) => state.dashboard.banners);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const get_data = useCallback(async () => {
    try {
      setLoad(true);
      //* fetch banners
      await dispatch(getBanners());
      setLoad(false);
    } catch (err) {
      setLoad(false);
    }
  }, [dispatch, setLoad, setError]);

  useEffect(() => {
    get_data();
  }, []);

  useEffect(() => {
    console.log('banners', banners);
  }, [banners]);

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
      {load ? (
        <Loader />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View style={{flex:1, flexDirection: 'column', justifyContent:'center' }}>
            <Text style={{textAlign:'center', textAlignVertical: 'center'}}>Soon will updates come here!!!</Text>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default Alarm;
