import React, { useState, useRef } from "react";
import { View, Text, ImageBackground, ToastAndroid, TouchableOpacity, Button } from 'react-native';
import { bg_image } from '../../Assets/Images';
import styles from './Schedule.styles';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker';
import moment from 'moment'; 
import Notifications from "../Notification/Notification";
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';



const Schedule = ({ navigation, route }: any) => {

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [waterInTimeOne, setWaterInTimeOne] = useState('');
  const [waterInTimeTwo, setWaterInTimeTwo] = useState('');
  const [waterInTimeThree, setWaterInTimeThree] = useState('');
  const [waterOutTimeOne, setWaterOutTimeOne] = useState('');
  const [waterOutTimeTwo, setWaterOutTimeTwo] = useState('');
  const [waterOutTimeThree, setWaterOutTimeThree] = useState('');
  const [handlepressNumber, setHandlepressNumber] = useState(0);
  const [mode, setMode] = useState('');
  const refRBSheet = useRef();

  useFocusEffect(
    React.useCallback(() => {
      setDataInsidePage();
    }, [])
  );

  const setDataInsidePage = async () => {

      let witone = await _retrieveData('@witone');
      setWaterInTimeOne(witone?witone.toString():''); 
      let wotone = await _retrieveData('@wotone');
      setWaterOutTimeOne(wotone?wotone.toString():'');
      let wittwo = await _retrieveData('@wittwo');
      setWaterInTimeTwo(wittwo?wittwo.toString():'');
      let wottwo = await _retrieveData('@wottwo');
      setWaterOutTimeTwo(wottwo?wottwo.toString():'');
      let witthree = await _retrieveData('@witthree');
      setWaterInTimeThree(witthree?witthree.toString():'');
      let wotthree = await _retrieveData('@wotthree');
      setWaterOutTimeThree(wotthree?wotthree.toString():'');
   

  }

  const setNotification = (datetime: any) => {
    // Notifications.schduleNotification(date);
    let scheduleTime = moment(datetime).add(5, 'minutes').format('DD/MM/YYYY hh:mm A');
    // it will add 11 mins in the current time and will give time in 03:35 PM format; can use m or minutes 

    console.log('set notification');
    console.log(scheduleTime)
    Notifications.schduleNotification(new Date(Date.now() + 10 * 1000));
  };

  const showToastWithGravity = (msg: string) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };
  

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

  const compareTime = (timeone: string, timetwo: string) => {

    //remove am pm from time
    timeone = timeone.toLowerCase();
    timetwo = timetwo.toLowerCase();

    timeone = timeone.replace('am','');
    timeone = timeone.replace('pm','');
    timetwo = timetwo.replace('am','');
    timetwo = timetwo.replace('pm','');
    //remove spaces
    timeone = timeone.replace(' ','');
    timeone = timeone.replace(' ','');
    timetwo = timetwo.replace(' ','');
    timetwo = timetwo.replace(' ','');

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
    if(
      parseInt(timeonehour) > parseInt(timetwohour)
    )
    {
      //return decision start it
      return true;
    }

    if(
      parseInt(timeonehour) === parseInt(timetwohour)
      && parseInt(timeoneminiute) > parseInt(timetwominiute) 
    )
    {
      //return decision start it
      return true;
    }

    if(
      parseInt(timeonehour) > parseInt(timetwohour)
      && parseInt(timeoneminiute) === parseInt(timetwominiute) 
    )
    {
      //return decision start it
      return true;
    }

    return false;

  }

  const checkWinTimeOne =  () => {
    switch (true) {
      case waterInTimeOne === '':
        return false;
      case waterInTimeOne !== '' && waterOutTimeOne === '':
        return false;
      case waterInTimeOne !== '' && waterOutTimeOne !== '':
          return compareTime(waterOutTimeOne,waterInTimeOne);  
      default:
        return false;
    }
  }

  const checkWinTimeTwo = () => {
    switch (true) {
      case waterInTimeTwo === '':
        return false;
      case waterInTimeTwo !== '' && waterOutTimeTwo === '':
        return false;
      case waterInTimeTwo !== '' && waterOutTimeTwo !== '':
          if(compareTime(waterOutTimeTwo, waterInTimeTwo)){
            if(checkTimeDonotFallInRange(waterInTimeTwo, waterOutTimeOne)){
              return true;
            }else{
              showToastWithGravity("Set time one and time two should not fall in range of time one !");
              return false;
            }
          }else{
            return false;
          }  
      default:
        return false;
    }
  }

  
  const checkWinTimeThree = () => {
    switch (true) {
      case waterInTimeThree === '':
        return false;
      case waterInTimeThree !== '' && waterOutTimeThree === '':
        return false;
      case waterInTimeThree !== '' && waterOutTimeThree !== '':
          if(compareTime(waterOutTimeThree, waterInTimeThree)){
            if(checkTimeDonotFallInRange(waterInTimeThree, waterOutTimeTwo)){
              return true;
            }else{
              showToastWithGravity("Set time two and time three should not fall in range of time two !");
              return false;
            }
          }else{
            return false;
          }  
      default:
        return false;
    }
  }

  const checkTimeDonotFallInRange = (time1: any,time2: any) => {
    return compareTime(time1, time2);
  }


  const setTimeForWaterSupply = async (mode: string, time: string) => {
  
    switch (true) {
      case mode === 'in' && handlepressNumber === 1 :
        //setNotification(time);
        setWaterInTimeOne(moment(time).format('HH:mm'));
        refRBSheet.current.close();
        break;
      case mode === 'in' && handlepressNumber ===  2:
        setWaterInTimeTwo(moment(time).format('HH:mm'));
        refRBSheet.current.close();
        break;
      case mode === 'in' && handlepressNumber === 3 :
        setWaterInTimeThree(moment(time).format('HH:mm'));
        refRBSheet.current.close();
        break;
      case mode === 'out' && handlepressNumber === 1 :
        setWaterOutTimeOne(moment(time).format('HH:mm'));
        refRBSheet.current.close();
        break;
      case mode === 'out' && handlepressNumber === 2 :
        setWaterOutTimeTwo(moment(time).format('HH:mm'));
        refRBSheet.current.close();
        break;
      case mode === 'out' && handlepressNumber === 3 :
        setWaterOutTimeThree(moment(time).format('HH:mm'));
        refRBSheet.current.close();
        break;      
      default:
        
        break;
    }
  }

  const setTimeForWaterSupplyUnset = async (mode: string, time: string) => {
  
    switch (true) {
      case mode === 'in' && handlepressNumber === 1 :
        //setNotification(time);
        setWaterInTimeOne('');
        refRBSheet.current.close();
        break;
      case mode === 'in' && handlepressNumber ===  2:
        setWaterInTimeTwo('');
        refRBSheet.current.close();
        break;
      case mode === 'in' && handlepressNumber === 3 :
        setWaterInTimeThree('');
        refRBSheet.current.close();
        break;
      case mode === 'out' && handlepressNumber === 1 :
        setWaterOutTimeOne('');
        refRBSheet.current.close();
        break;
      case mode === 'out' && handlepressNumber === 2 :
        setWaterOutTimeTwo('');
        refRBSheet.current.close();
        break;
      case mode === 'out' && handlepressNumber === 3 :
        setWaterOutTimeThree('');
        refRBSheet.current.close();
        break;      
      default:
        
        break;
    }
  }

  const handlePress = (id: number, mode: string) => {
    setMode(mode);
    switch (id) {
      case 1:
        setHandlepressNumber(1);
        setMode(mode);
        refRBSheet.current.open();
        break;
      case 2:
        setHandlepressNumber(2);
        setMode(mode);
        refRBSheet.current.open();
        break;
      case 3:
        setHandlepressNumber(3);
        setMode(mode);
        refRBSheet.current.open();
        break;
      default:
        setHandlepressNumber(0);
        setMode('');
        break;
    }
  };

  const saveSchedule = () => {
    
    let scheduleset = 
        { 
          schedule1: { ontime: '', offtime: '', ison: 'false', isoff: 'false', distance: '0'},
          schedule2: { ontime: '', offtime: '', ison: 'false', isoff: 'false', distance: '0'},
          schedule3: { ontime: '', offtime: '', ison: 'false', isoff: 'false', distance: '0'},
        };  
    

    if(waterInTimeOne !== ''){
      if(checkWinTimeOne() === true){
        _storeData('@witone', waterInTimeOne);
        _storeData('@wotone', waterOutTimeOne);
        scheduleset.schedule1.ontime =  waterInTimeOne;
        scheduleset.schedule1.offtime =  waterOutTimeOne;
        scheduleset.schedule1.ison =  'false';
        scheduleset.schedule1.isoff =  'false';

      }else{
        showToastWithGravity('Please check water in timing for set one !!!');
        return;
      }
    }
    
    if(waterInTimeTwo !== ''){
      if(checkWinTimeTwo() === true){
        _storeData('@wittwo', waterInTimeTwo);
        _storeData('@wottwo', waterOutTimeTwo);
        scheduleset.schedule2.ontime =  waterInTimeTwo;
        scheduleset.schedule2.offtime =  waterOutTimeTwo;
        scheduleset.schedule2.ison =  'false';
        scheduleset.schedule2.isoff =  'false';
      }else{
        showToastWithGravity('Please check water in timing for set two !!!');
        return;
      }
    }
    
    if(waterInTimeThree !== ''){
      if(checkWinTimeThree() === true){
        _storeData('@witthree', waterInTimeThree);
        _storeData('@wotthree', waterOutTimeThree);
        scheduleset.schedule3.ontime =  waterInTimeThree;
        scheduleset.schedule3.offtime =  waterOutTimeThree;
        scheduleset.schedule3.ison =  'false';
        scheduleset.schedule3.isoff =  'false';
      }else{
        showToastWithGravity('Please check water in timing for set three !!!');
        return;
      }
    }
    _storeData('@scheduleset', JSON.stringify(scheduleset));
    _storeData('@storeddate', '');
    showToastWithGravity('Successfully Saved !');
  }


  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{textAlign: 'center', padding: 10}}> Time one, two and three should be set in sequence and they should not fall in eact other range.</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{ handlePress(1,'in'); }}>
              <Text> Water in time: {waterInTimeOne} </Text>
            </TouchableOpacity>  
          </View>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
           <TouchableOpacity onPress={()=>{ handlePress(1,'out'); }}>
            <Text> Water out time: {waterOutTimeOne} </Text>
           </TouchableOpacity> 
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{ handlePress(2,'in'); }}>
              <Text> Water in time: {waterInTimeTwo} </Text>
            </TouchableOpacity>         
          </View>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{ handlePress(2,'out'); }}>
             <Text> Water out time: {waterOutTimeTwo} </Text>
            </TouchableOpacity> 
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{ handlePress(3,'in'); }}>  
              <Text> Water in time: {waterInTimeThree}</Text>
            </TouchableOpacity>  
          </View>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{ handlePress(3,'out'); }}> 
              <Text> Water out time: {waterOutTimeThree}</Text>
            </TouchableOpacity>  
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => { saveSchedule(); } }
              style={
                { 
                  backgroundColor: '#012f6c',
                  paddingHorizontal: 30,
                  paddingVertical: 15,
                  borderRadius:10,
                }
            }>
              <Text
                style={[
                  {
                    fontFamily: 'Montserrat-Bold',
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: '#ffffff',
                  },
                ]}>
                {"Save"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => { 
                
               } }
              style={
                { 
                  backgroundColor: '#012f6c',
                  paddingHorizontal: 30,
                  paddingVertical: 15,
                  borderRadius:10, 
                }
            }>
              <Text
                style={[
                  {
                    fontFamily: 'Montserrat-Bold',
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: '#ffffff',
                  },
                ]}>
                {"Cancel"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000"
          }}
        >

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent"
              },
              draggableIcon: {
                backgroundColor: "#000"
              }
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF"
              }}
            >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF"
              }}
            >
                      <TouchableOpacity
                      onPress= { () => {
                        setTimeForWaterSupply(mode,date.toString())
                      }}
                      style={{  backgroundColor: '#012f6c',
                      paddingHorizontal: 30,
                      paddingVertical: 15,
                      borderRadius:10, }}>
                        <Text
                          style={[
                            {
                              fontFamily: 'Montserrat-Bold',
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#ffffff',
                            },
                          ]}>
                          {"Set"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress= { () => {
                        setTimeForWaterSupplyUnset(mode,date.toString())
                      }}
                      style={{  backgroundColor: '#012f6c',
                      paddingHorizontal: 30,
                      paddingVertical: 15,
                      marginLeft: 10,
                      borderRadius:10, }}>
                        <Text
                          style={[
                            {
                              fontFamily: 'Montserrat-Bold',
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#ffffff',
                            },
                          ]}>
                          {"Unset"}
                        </Text>
                    </TouchableOpacity>
              </View>      
              <DatePicker
                open={open}
                date={date}
                mode={'time'}
                locale={'en_US'}
                onDateChange={(date) => {
                  setOpen(false);
                  setDate(date);
                }}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </View>  
          </RBSheet>
        </View>
      
      </View>
    </ImageBackground>
  );
};

export default Schedule;
