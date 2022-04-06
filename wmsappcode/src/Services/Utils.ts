import { PermissionsAndroid } from "react-native";
import messaging from '@react-native-firebase/messaging';

export const displayFormatedTime = (time?: string) => {
  var date = time ? new Date(time) : new Date();
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  const daynight = date.getHours() < 12 ? 'AM' : 'PM';
  time = hours + ':' + minutes + ' ' + daynight;
  return time;
};

export const formatBytes = (bytes:number, decimals = 2) =>  {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


export async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}