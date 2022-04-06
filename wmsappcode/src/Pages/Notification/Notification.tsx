import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-community/async-storage';

class Notifications {
    constructor() {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token: any) {
          // console.log('TOKEN:', token);
        },
        onNotification: function (notification: any) {
          console.log("this is onNotification function");
          console.log('NOTIFICATION:', notification);
                //notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        popInitialNotification: true,
        requestPermissions: true,
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: false,
          sound: false,
        },
      });
  
      PushNotification.createChannel(
        {
          channelId: 'attention', // (required)
          channelName: 'Attention notifications', // (required)
          channelDescription: 'Attention for any tasks',
        },
        () => {},
      );
  
      PushNotification.getScheduledLocalNotifications( (rn: any) => {
        console.log('SN --- ', rn);
      });
    }

    _storeData = async () => {
      try {
        await AsyncStorage.setItem(
          '@MySuperStore:key',
          'I like to save it.'
        );
      } catch (error) {
        // Error saving data
      }
    };

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('TASKS');
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
  
    schduleNotification(date: any, msg: any) {
      PushNotification.localNotificationSchedule({
        channelId: 'attention',
        title: '🔔 Attention !',
        message: msg,
        date,
      });
    }
  }
  
  export default new Notifications();