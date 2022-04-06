/**
 * Navin WMS App
 * https://github.com/kumarnavinrai
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';

import AppScreens from './Navigation';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import ReduxThunk from 'redux-thunk';
import userReducer from './Store/reducers/user';
import dashboardReducer from './Store/reducers/dashboard';
import allcontentReducer from './Store/reducers/allcontent';
import Notifications from "./Pages/Notification/Notification";
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
let DOMParser = require('react-native-html-parser').DOMParser




var motoronurl = '';
var motoroffurl = '';
var distanceurl = '';
var distancend = '';
//this is the time elapsed after which we will check change in distance for water supply check
var afterHowMuchTimeWaterSupplyShouldCheck = 10;
//this is the distance we will check in cm after above time in miniutes passed to switch off motor if no water supply
var changeInDistanceAfterWaterCheckTime = 2;

var counterForTimeCheckBeforeDistanceGet = 0;
// EStyleSheet.build({$rem: entireScreenWidth / 380});


const getDataOnStart = async () => {
  let distanceurlTemp = await _retrieveData('@distanceurl');
  distanceurl = distanceurlTemp !== undefined ? distanceurlTemp : '';
  let motoronurlTemp = await _retrieveData('@motoron');
  motoronurl = motoronurlTemp !== undefined ? motoronurlTemp : '';
  let motoroffurlTemp = await _retrieveData('@motoroff');
  motoroffurl = motoroffurlTemp !== undefined ? motoroffurlTemp : '';
  let distanceendTemp = await _retrieveData('@distanceend');
  distancend = distanceendTemp !== undefined ? distanceendTemp : '';
}

const _storeData = async (key: any, data: any) => {
  try {
    await AsyncStorage.setItem(
      key,
      data
    );
  } catch (error: any) {
    // Error saving data
    console.log(error)
  }
};

const _retrieveData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return value;
    }

    return 'null';
  } catch (error: any) {
    // Error retrieving data
    console.log(error)
  }
};

const getDataFromApi = async (url: any) => {
console.log('hitting get data from api')
console.log(counterForTimeCheckBeforeDistanceGet)
console.log(url);
  if(counterForTimeCheckBeforeDistanceGet < 5){
    counterForTimeCheckBeforeDistanceGet++;
    return null;
  }else{
    counterForTimeCheckBeforeDistanceGet = 0;
  }
  let distanceReadingArray = [];
      for(let i = 0; i < 10; i++) {
        //distanceurl
        try {
          let response = await fetch(url) //distanceurl replace this with this
          .then(function(response) {
            // When the page is loaded convert it to text
            return response.text()
        })
        .then(function(html) {
            let indexfirst = html.indexOf('{');
            let indexsecond = html.indexOf('}');
            let mySubString = html.substring(
              html.indexOf("{") + 1, 
              html.lastIndexOf("}")
            );
            mySubString = mySubString.replace('distance:', '');
            mySubString = mySubString.trim();
            return mySubString;
        })
        .catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
        });
      
        distanceReadingArray.push(response);
        } catch (error) {
          console.error(error);
        }
        await timer(2000);
      }
      
      let max = distanceReadingArray.sort((a: any,b: any)=>a-b)[distanceReadingArray.length - 1];
      distanceReadingArray = [];
      return max;
};

const timer = (ms: any) => { return new Promise(res => setTimeout(res, ms)); }


const compareTime = (timeone: string, timetwo: string) => {

  //remove am pm from time
  timeone = timeone.toLowerCase();
  timetwo = timetwo.toLowerCase();


  timeone = timeone.replace('am', '');
  timeone = timeone.replace('pm', '');
  timetwo = timetwo.replace('am', '');
  timetwo = timetwo.replace('pm', '');
  //remove spaces
  timeone = timeone.replace(' ', '');
  timeone = timeone.replace(' ', '');
  timetwo = timetwo.replace(' ', '');
  timetwo = timetwo.replace(' ', '');

  timeone = timeone.trim();
  timetwo = timetwo.trim();
  //make array
  let timeonearray = timeone.split(":");
  let timetwoarray = timetwo.split(":");
  let timeonehour = timeonearray[0];
  let timeoneminiute = timeonearray[1];
  let timetwohour = timetwoarray[0];
  let timetwominiute = timetwoarray[1];
  //compare
  if (
    parseInt(timeonehour) === parseInt(timetwohour)
    && parseInt(timeoneminiute) > parseInt(timetwominiute)
  ) {
    //return decision start it
    return true;
  }

  return false;

}

const trunOn = async (param: any) => {

  try {
    let response = await fetch(motoronurl)
      .then(response => { return response.json() })
      .catch((error) => console.error(error))

    return response;
  } catch (error) {
    console.error(error);
  }

}

const trunOff = async (param: any) => {

  try {
    let response = await fetch(motoroffurl)
      .then(response => { return response.json() })
      .catch((error) => console.error(error))

    return response;
  } catch (error) {
    console.error(error);
  }
}

const getRightSchedule = (sd: any) => {

  if (sd) {
    switch (true) {
      case sd.ison !== 'true':
        return sd.ontime;
      case sd.isoff !== 'true':
        return sd.offtime;
      default:
        return false;
    }
  }
  return false;
}


const getRightScheduleOff = (sd: any) => {

  if (sd) {
    switch (true) {
      case sd.isoff !== 'true':
        return sd.offtime;
      default:
        return false;
    }
  }
  return false;
}

const filterSchedule1 = (data: any, prod: string) => {
  if (data?.schedule1 && prod === 'on') {
    return getRightSchedule(data?.schedule1);
  }
  else {
    if (data?.schedule1 && prod === 'off') { return getRightScheduleOff(data?.schedule1) }
    if (data?.schedule1 && prod === 'schedule1') { return data?.schedule1; }
  }
  return '';
}
const filterSchedule2 = (data: any, prod: string) => {
  if (data.schedule2 && prod === 'on') {
    return getRightSchedule(data.schedule2);
  }
  else {
    if (data.schedule2 && prod === 'off') { return getRightScheduleOff(data.schedule2) }
    if (data.schedule2 && prod === 'schedule2') { return data.schedule2; }
  }
  return '';
}
const filterSchedule3 = (data: any, prod: string) => {
  if (data.schedule3 && prod === 'on') {
    return getRightSchedule(data.schedule3);
  }
  else {
    if (data.schedule3 && prod === 'off') { return getRightScheduleOff(data.schedule3) }
    if (data.schedule3 && prod === 'schedule3') { return data.schedule3; }
  }
  return '';
}

const setScheduleSetToDefault = (data: any) => {

  data.schedule1.ison = 'false';
  data.schedule1.isoff = 'false';
  data.schedule2.ison = 'false';
  data.schedule2.isoff = 'false';
  data.schedule3.ison = 'false';
  data.schedule3.isoff = 'false';

  return data;
}

const checkWaterSupply = (distsaveed: any, distnow: any, ontime: any) => {
  let start = moment().format('YYYY-MM-DD');
  start = start + ' ' + ontime;
  let minutesPassed = moment().diff(start, 'minutes');
  let changeInDistance = parseInt(distnow) - parseInt(distsaveed);
  if (minutesPassed > afterHowMuchTimeWaterSupplyShouldCheck && changeInDistance < changeInDistanceAfterWaterCheckTime) {
    return false;
  }
  return true;
}

const shallWeCheckWaterSupply = (data: any) => {
  if (data.ison === 'true' && data.isoff === 'false') {
    return true;
  }
  return false;
}

const sendNotificationOn50and20Percent = async (distance: any) => {
  let distanceNow = distance;
  distanceNow = distanceNow !== undefined ? distanceNow : '0';
  let hot = await _retrieveData('@tankheight');
  hot = hot !== undefined ? hot : '0';
  let fiftypn = await _retrieveData('@fiftypn');
  let twentypn = await _retrieveData('@twentypn');
console.log('fiftypn');
console.log(fiftypn);
  let filledTankHeight = parseInt(hot) - parseInt(distanceNow); //in cm
  let fiftyPercentHeight = parseInt(hot) / 2;
  let twentyPercentHeight = parseInt(hot) / 5;
  
  if (filledTankHeight < fiftyPercentHeight && fiftypn === 'null') {
    //set notification for 50% tank left
    console.log('sending 50 pn notification from here');
    await _storeData('@fiftypn', 'sent');
    Notifications.schduleNotification(new Date(Date.now()), '50% water left in tank. !');
  } 
  // 20 % notification stopped
  else {

    if (filledTankHeight < twentyPercentHeight && twentypn === 'null') {
      //set notification for 20% tank left
      await _storeData('@twentypn', 'sent');
      Notifications.schduleNotification(new Date(Date.now()), '20% water left in tank. !');
    }
  }

  if (filledTankHeight > fiftyPercentHeight && (fiftypn !== 'null' || twentypn !== 'null')) {
    await _storeData('@twentypn', 'null');
    await _storeData('@fiftypn', 'null');
  }


}


BackgroundTimer.runBackgroundTimer(async () => {
  let du = await _retrieveData('@distanceurl');
  du = du?du.toString():'';
  let distanceFromApi = await getDataFromApi(du);
  if(distanceFromApi === undefined 
    || distanceFromApi === 'undefined' 
    || distanceFromApi === null 
    || distanceFromApi === 'null'){ return false; }
  let distance = parseInt(distanceFromApi);
  console.log('distance we got from api')
  console.log(distance);
  sendNotificationOn50and20Percent(distance);
  let storeddate = await _retrieveData('@storeddate');
  let datetoday = moment().format('YYYY-MM-DD');
  let findOutDateIsSame = moment(storeddate).isSame(datetoday);

  let schedulesetdata = await _retrieveData('@scheduleset');
  let dataToForward = '';
  if (schedulesetdata !== null 
      && schedulesetdata !== 'null' 
      && schedulesetdata !== undefined) 
  {
    schedulesetdata = JSON.parse(schedulesetdata);
    console.log('schedule set data positon now ', schedulesetdata)
    if (findOutDateIsSame === false) {
      await _storeData('@storeddate', datetoday.toString());
      schedulesetdata = setScheduleSetToDefault(schedulesetdata);
      await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
    }

    //code for schedule1 starts
    //pass data for on steps
    dataToForward = filterSchedule1(schedulesetdata, 'on');
    let timenow = moment().format('H:mm');
    console.log('time now', timenow)
    console.log('time came', dataToForward)
    //if we have time set for sch 1 for on on morot
    if (dataToForward) {
      if (compareTime(timenow, dataToForward.toString())) {
        //switch on motor
        let datafordecision = filterSchedule1(schedulesetdata, 'schedule1');
        if (datafordecision.ison === 'false' && parseInt(distance) >= parseInt(distancend)) {
          trunOn('on');
          datafordecision.ison = 'true';
          datafordecision.distance = distance;
          if (schedulesetdata !== undefined && schedulesetdata.schedule1 !== undefined)
            schedulesetdata.schedule1 = datafordecision;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user
          Notifications.schduleNotification(new Date(Date.now()), 'Pump truned on at: ' + timenow);
          //*********************** */
        }
      }
    }
    dataToForward = filterSchedule1(schedulesetdata, 'off');
    //if we have time set for sch 1 for on on morot
    if (dataToForward) {
      //code to check water supply start
      let datafordistancelogic = filterSchedule1(schedulesetdata, 'schedule1');
      if (shallWeCheckWaterSupply(datafordistancelogic) == true) {
        if (checkWaterSupply(datafordistancelogic.distance, distance, datafordistancelogic.ontime) === false) {
          trunOff('off');
          datafordistancelogic.isoff = 'true';
          datafordistancelogic.distance = distance;
          if (schedulesetdata !== undefined)
            schedulesetdata.schedule1 = datafordistancelogic;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user no water supply
          Notifications.schduleNotification(new Date(Date.now()), 'No water supply');
          //*********************** */
        }
      }
      //code to check water supply ends    
      if (compareTime(timenow, dataToForward.toString())) {
        //switch on motor
        let datafordecision = filterSchedule1(schedulesetdata, 'schedule1');
        if (datafordecision.isoff === 'false' && parseInt(distance) <= parseInt(distancend)) {
          trunOff('off');
          datafordecision.isoff = 'true';
          datafordecision.distance = distance;
          if (schedulesetdata !== undefined && schedulesetdata.schedule1 !== undefined)
            schedulesetdata.schedule1 = datafordecision;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user
          Notifications.schduleNotification(new Date(Date.now()), 'Pump truned off at: ' + timenow);
          //*********************** */

        }

      }
    }
    //code for schedule1 end

    //code for schedule2 starts
    //pass data for on steps
    dataToForward = filterSchedule2(schedulesetdata, 'on');

    //if we have time set for sch 1 for on on morot
    if (dataToForward) {
      if (compareTime(timenow, dataToForward.toString())) {
        //switch on motor
        let datafordecision = filterSchedule2(schedulesetdata, 'schedule2');
        if (datafordecision.ison === 'false' && parseInt(distance) >= parseInt(distancend)) {
          trunOn('on');
          datafordecision.ison = 'true';
          if (schedulesetdata !== undefined && schedulesetdata.schedule2 !== undefined)
            schedulesetdata.schedule2 = datafordecision;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user
          Notifications.schduleNotification(new Date(Date.now()), 'Pump truned on at: ' + timenow);
          //*********************** */
        }
      }
    }
    dataToForward = filterSchedule2(schedulesetdata, 'off');
    //if we have time set for sch 1 for on on morot
    if (dataToForward) {
      //code to check water supply start
      let datafordistancelogic = filterSchedule2(schedulesetdata, 'schedule2');
      if (shallWeCheckWaterSupply(datafordistancelogic) == true) {
        if (checkWaterSupply(datafordistancelogic.distance, distance, datafordistancelogic.ontime) === false) {
          trunOff('off');
          datafordistancelogic.isoff = 'true';
          datafordistancelogic.distance = distance;
          if (schedulesetdata !== undefined)
            schedulesetdata.schedule2 = datafordistancelogic;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user no water supply
          Notifications.schduleNotification(new Date(Date.now()), 'No water supply');
          //*********************** */
        }
      }
      //code to check water supply end    
      if (compareTime(timenow, dataToForward.toString())) {
        //switch on motor
        let datafordecision = filterSchedule2(schedulesetdata, 'schedule2');
        if (datafordecision.isoff === 'false' && parseInt(distance) <= parseInt(distancend)) {
          trunOff('off');
          datafordecision.isoff = 'true';
          if (schedulesetdata !== undefined && schedulesetdata.schedule2 !== undefined)
            schedulesetdata.schedule2 = datafordecision;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user
          Notifications.schduleNotification(new Date(Date.now()), 'Pump truned off at: ' + timenow);
          //*********************** */
        }

      }
    }
    //code for schedule2 end

    //code for schedule3 starts
    //pass data for on steps
    dataToForward = filterSchedule3(schedulesetdata, 'on');

    //if we have time set for sch 1 for on on morot
    if (dataToForward) {
      if (compareTime(timenow, dataToForward.toString())) {
        //switch on motor
        let datafordecision = filterSchedule3(schedulesetdata, 'schedule3');
        if (datafordecision.ison === 'false' && parseInt(distance) >= parseInt(distancend)) {
          trunOn('on');
          datafordecision.ison = 'true';
          if (schedulesetdata !== undefined && schedulesetdata.schedule3 !== undefined)
            schedulesetdata.schedule3 = datafordecision;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user
          Notifications.schduleNotification(new Date(Date.now()), 'Pump truned off on: ' + timenow);
          //*********************** */
        }
      }
    }
    dataToForward = filterSchedule3(schedulesetdata, 'off');

    //if we have time set for sch 1 for on on morot
    if (dataToForward) {
      //code to check water supply start
      let datafordistancelogic = filterSchedule3(schedulesetdata, 'schedule3');
      if (shallWeCheckWaterSupply(datafordistancelogic) == true) {
        if (checkWaterSupply(datafordistancelogic.distance, distance, datafordistancelogic.ontime) === false) {
          trunOff('off');
          datafordistancelogic.isoff = 'true';
          datafordistancelogic.distance = distance;
          if (schedulesetdata !== undefined)
            schedulesetdata.schedule3 = datafordistancelogic;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user no water supply
          Notifications.schduleNotification(new Date(Date.now()), 'No water supply');
          //*********************** */
        }
      }
      //code to check water supply end  
      if (compareTime(timenow, dataToForward.toString())) {
        //switch on motor
        let datafordecision = filterSchedule3(schedulesetdata, 'schedule3');
        if (datafordecision.isoff === 'false' && parseInt(distance) <= parseInt(distancend)) {
          trunOff('off');
          datafordecision.isoff = 'true';
          if (schedulesetdata !== undefined && schedulesetdata.schedule3 !== undefined)
            schedulesetdata.schedule3 = datafordecision;
          await _storeData('@scheduleset', JSON.stringify(schedulesetdata));
          //send notification to user
          Notifications.schduleNotification(new Date(Date.now()), 'Pump truned off on: ' + timenow);
          //*********************** */
        }

      }
    }
    //code for schedule3 end      


  }

},
  60000);

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  allcontent: allcontentReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

getDataOnStart();

const App = ({ }) => {

  return (
    <Provider store={store}>
      <AppScreens />
    </Provider>
  );
};
function HeadlessCheck({ isHeadless }: any) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

export default HeadlessCheck;
