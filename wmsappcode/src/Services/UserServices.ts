import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../Constants/url';
import axios from 'axios';
export default class services {
  authenticate = async (loginData: any) => {
    //Call authenticate api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'loginv1', loginData, {headers})
      .then(response => { return response.data; })
      .catch(error => {
        return error;
      });
  };

  get_user = async (user_id: string) => {
    // const token = await AsyncStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    };
    return axios
      .post(URL + 'my_account', {get_user_id: user_id}, {headers})
      .then(response => response)
      .catch(error => error);
  };

  create_user = async (user: any) => {
    //Call register api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'regis', user, {headers})
      .then(response => { return response.data; })
      .catch(error => {
        return error;
      });
  };

  google_login_register = async (user: any) => {
    //Call register api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'google_email_check', user, {headers})
      .then(response => response)
      .catch(error => {
        return error;
      });
  };

  facebook_login_register = async (user: any) => {
    //Call register api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'facebook_login_regis', user, {headers})
      .then(response => response)
      .catch(error => {
        return error;
      });
  };

  add_contact = async (user: any) => {
    //Call register api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'add_name_phone_number', user, {headers})
      .then(response => response)
      .catch(error => {
        return error;
      });
  };

  forgot_password = async (email: string) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'forgot_password', {get_email: email}, {headers})
      .then(response => response)
      .catch(error => error);
  };

  update_password = async (data: any) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'change_password', data, {headers})
      .then(response => response)
      .catch(error => error);
  };

  update_profile = async (data: any) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + 'edit_account', data, {headers})
      .then(response => response)
      .catch(error => error);
  };

  get_user_notifications = async (user_id: string) => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(URL + `/user/notification/get?user_id=${user_id}`, {headers})
      .then(response => response)
      .catch(error => error);
  };
}
