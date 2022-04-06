// import AsyncStorage from '@react-native-community/async-storage';
// import {Alert, Keyboard} from 'react-native';
// import Snackbar from 'react-native-snackbar';
// import services from '../../Services/UserServices';
// import User from '../models/user';
// import {GraphRequestConfig} from 'react-native-fbsdk-next/types/FBGraphRequest';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk-next';
// export const HANDLE_REGISTER_INPUTS = 'HANDLE_REGISTER_INPUTS';
// export const HANDLE_LOGIN_INPUT = 'HANDLE_LOGIN_INPUT';
// export const SIGN_UP = 'SIGN_UP';
// export const SIGN_IN = 'SIGN_IN';
// export const LOGOUT = 'LOGOUT';
// export const SET_USER = 'SET_USER';
// export const RESET_REGISTER = 'RESET_REGISTER';
// export const GOOGLE_SIGNIN = 'GOOGLE_SIGNIN';
// export const FACEBOOK_SIGNIN = 'FACEBOOK_SIGNIN';
// export const GOOGLE_REGISTER = 'GOOGLE_REGISTER';
// export const FACEBOOK_REGISTER = 'FACEBOOK_REGISTER';
// const service = new services();

// export const handleLogin = (
//   key: 'email' | 'password',
//   key1: 'text' | 'active' | 'error_message' | 'show',
//   value: any,
// ) => {
//   return {type: HANDLE_LOGIN_INPUT, key, key1, value};
// };

// export const handleRegister = (
//   key: string, // coming from registration template
//   key1: string,
//   value: any,
// ) => {
//   return {type: HANDLE_REGISTER_INPUTS, key, key1, value};
// };

// export const resetRegister = () => {
//   return {type: RESET_REGISTER};
// };

// export const setUser = (user: any) => {
//   return {type: SET_USER, user};
// };

// export const getUser = (user_id: string) => {
//   return async (dispatch: any) => {
//     try {
//       const response = await service.get_user(user_id);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       dispatch(setUser(response.data.data));
//     } catch (err) {
//       throw err;
//     }
//   };
// };

export const HandelResponse = (data: any) => {
    console.log(data)
    console.log(data.payload)
    try {
        switch (true) {

            case data.payload !== undefined && data.payload.error !== undefined:
            return false;

            case data.payload !== undefined && data.payload[0].success !== undefined:
            return true;
        
            default:
            return false;
        }
        
    } catch (err) {
      throw err;
    }

};

// export const forgotPassword = (email: string) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.forgot_password(email);
//       console.log('response_forgot_password', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       Snackbar.show({
//         text: 'Reset password link sent successfully',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const updatePassword = (data: any) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.update_password(data);
//       console.log('response_update_password', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       Snackbar.show({
//         text: 'Password Updated Successfully',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const updateProfile = (data: any) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.update_profile(data);
//       console.log('response_update_profile', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       Snackbar.show({
//         text: 'Profile Updated Successfully',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const Register = (navigation: any, userData: any) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.create_user(userData);
//       console.log('response_register', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       //   const token = await firebase.messaging().getToken();
//       //   await service.update_student({device_token: token});
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       Snackbar.show({
//         text: 'Registration Successful',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//       dispatch({
//         type: SIGN_UP,
//       });

//       return navigation.navigate('signupdetails', {
//         user_id: response.data.payload[0].userID,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const googleSigninRegister = (navigation: any, userData: any) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.google_login_register(userData);
//       console.log('response_register_google_signin_register', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       //   const token = await firebase.messaging().getToken();
//       //   await service.update_student({device_token: token});
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       if (response.data.payload && response.data.payload.length > 0) {
//         const registered_user = response.data.payload[0];
//         console.log('registered_mobile_number', registered_user);
//         if (registered_user.mobile_Number === null) {
//           return navigation.navigate('signupdetails', {
//             user_id: response.data.payload[0].userID,
//           });
//         } else {
//           return navigation.replace('main');
//         }
//       }
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const facebookSigninRegister = (navigation: any, userData: any) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.facebook_login_register(userData);
//       console.log('response_register_facebook_signin_register', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       //   const token = await firebase.messaging().getToken();
//       //   await service.update_student({device_token: token});
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       if (response.data.payload && response.data.payload.length > 0) {
//         const registered_user = response.data.payload[0];
//         if (registered_user.mobile_Number === null) {
//           return navigation.navigate('signupdetails', {
//             user_id: response.data.payload[0].userID,
//             take_name: registered_user.first_name === null,
//           });
//         } else {
//           return navigation.replace('main');
//         }
//       }
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const addContact = (navigation: any, userData: any) => {
//   return async (dispatch: any) => {
//     try {
//       Keyboard.dismiss();
//       const response = await service.add_contact(userData);
//       console.log('response_add-contact', response);
//       if (response.status !== 200) {
//         throw new Error(`Server Error - ${response}`);
//       }
//       //   const token = await firebase.messaging().getToken();
//       //   await service.update_student({device_token: token});
//       if (response.data.responseCode !== '2000') {
//         throw new Error(response.data.Message);
//       }
//       Snackbar.show({
//         text: 'Welcome User',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//       dispatch({
//         type: SIGN_UP,
//       });

//       return navigation.replace('main');
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const logout = () => {
//   return {type: LOGOUT};
// };

// //*google

// export const signInGoogle = (navigation: any) => {
//   return async (dispatch: any) => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       let userData = {
//         get_email: userInfo.user.email,
//         get_profile_pic: userInfo.user.photo,
//         get_page_url: '',
//         name: userInfo.user.name,
//       };
//       await dispatch(googleSigninRegister(navigation, userData));
//     } catch (error) {
//       console.log('google_err', error);
//       throw error;
//     }
//   };
// };
// export const signOutGoogle = async () => {
//   try {
//     await GoogleSignin.revokeAccess();
//     await GoogleSignin.signOut();
//   } catch (error) {
//     Alert.alert('Something else went wrong... ', error.toString());
//   }
// };
// export const getCurrentUserInfo = async () => {
//   try {
//     const userInfo = await GoogleSignin.signInSilently();
//     console.log('userInfo_silent', userInfo);
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//       // when user hasn't signed in yet
//       Alert.alert('Please Sign in');
//     } else {
//       Alert.alert('Something else went wrong... ', error.toString());
//     }
//   }
// };

// // //*facebook
// export const getInfoFromToken = (token: string, navigation: any) => {
//   return async (dispatch: any) => {
//     try {
//       const PROFILE_REQUEST_PARAMS = {
//         fields: {
//           string: 'id,name,first_name,last_name,email',
//         },
//       };
//       const profileRequest = new GraphRequest(
//         '/me',
//         {accessToken: token, parameters: PROFILE_REQUEST_PARAMS},
//         async (error: any, user: any) => {
//           if (error) {
//             throw new Error('facebook login info has error: ' + error);
//           } else {
//             // let userData = {
//             //   get_email: user.user.email,
//             //   get_profile_pic: user.user.photo,
//             //   get_page_url: '',
//             // };
//             // await dispatch(facebookSigninRegister(navigation, userData));
//             console.log('facebook_result:', user);
//           }
//         },
//       );
//       new GraphRequestManager().addRequest(profileRequest).start();
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const loginWithFacebook = (navigation: any) => {
//   // Attempt a login using the Facebook login dialog asking for default permissions.
//   return async (dispatch: any) => {
//     try {
//       const login = await LoginManager.logInWithPermissions([
//         'public_profile',
//         'email',
//       ]);
//       if (login.isCancelled) {
//         throw new Error('User Cancelled login');
//       }
//       const token: any = await AccessToken.getCurrentAccessToken();
//       await dispatch(
//         getInfoFromToken(token.accessToken.toString(), navigation),
//       );
//     } catch (err) {
//       throw err;
//     }
//   };
// };

// export const facebook_logout = async () => {
//   await LoginManager.logOut();
// };
