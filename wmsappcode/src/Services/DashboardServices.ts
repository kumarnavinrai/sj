import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../Constants/url';
import axios from 'axios';
export default class services {
  get_banners = async () => {
    //Call authenticate api
    // const token = await AsyncStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    };
    return axios
      .get(URL + 'banner_listing', {headers})
      .then(response => response)
      .catch(error => error);
  };

  get_my_courses = async (user_id: string, is_demo: number) => {
    //Call authenticate api
    // const token = await AsyncStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    };
    return axios
      .get(URL + 'my_course_listing/' + user_id, {headers})
      .then(response => response)
      .catch(error => error);
  };

  get_issue_type_listing = async () => {
    //Call authenticate api
    // const token = await AsyncStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    };
    return axios
      .get(URL + 'issue_type_listing', {headers})
      .then(response => response)
      .catch(error => error);
  };

  create_feedback = async (data: any) => {
    //Call authenticate api
    // const token = await AsyncStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    };
    return axios
      .post(URL + 'user_course_feedback', data, {headers})
      .then(response => response)
      .catch(error => error);
  };
}
