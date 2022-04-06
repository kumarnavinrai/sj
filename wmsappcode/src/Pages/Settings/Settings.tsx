import React from 'react';
import {useState} from 'react';
import {View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {bg_image} from '../../Assets/Images';
import styles from './Settings.styles';
import { useFocusEffect } from '@react-navigation/native';

const Settings = ({navigation, route}: any) => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ tankcapacity, setTankcapacity ] = useState('');
  const [ tankdiameter, setTankdiameter ] = useState('');
  const [ tankheight, setTankheight ] = useState('');
  const [ cameraurl, setCameraurl ] = useState('');
  const [ spoturl, setSpoturl ] = useState('');
  const [ distanceurl, setDistanceurl ] = useState('');
  const [ motoron, setMotoron ] = useState('');
  const [ motoroff, setMotoroff ] = useState('');
  const [ resetesp, setResetesp ] = useState('');
  const [ distanceend, setDistanceend ] = useState('0');
  const [ error, setError ] = useState(false);
  const [ errormsg, setErrormsg ] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setDataInsidePage();
    }, [])
  );

  const setDataInsidePage = async () => {

      let user = await _retrieveData('@username');
      setUsername(user?user.toString():''); 
      let pass = await _retrieveData('@password');
      setPassword(pass?pass.toString():'');
      let tc = await _retrieveData('@tankcapacity');
      setTankcapacity(tc?tc.toString():'');
      let td = await _retrieveData('@tankdiameter');
      setTankdiameter(td?td.toString():'');
      let th = await _retrieveData('@tankheight');
      setTankheight(th?th.toString():'');
      let cu = await _retrieveData('@cameraurl');
      setCameraurl(cu?cu.toString():'');
      let su = await _retrieveData('@spoturl');
      setSpoturl(su?su.toString():'');
      let du = await _retrieveData('@distanceurl');
      setDistanceurl(du?du.toString():'');
      let mo = await _retrieveData('@motoron');
      setMotoron(mo?mo.toString():'');
      let mf = await _retrieveData('@motoroff');
      setMotoroff(mf?mf.toString():'');
      let de = await _retrieveData('@distanceend');
      setDistanceend(de?de.toString():'');
      let esp = await _retrieveData('@resetesp');
      setResetesp(esp?esp.toString():'');

  }

  const saveSettings = () => {

     switch (true) {
       case !validateEmail(username):
        setError(true);
        setErrormsg('Please check username !');
        break;
       case !checkPassword(password):
        setError(true);
        setErrormsg('Password must be min 8 letter, with a symbol, upper and lower case letters and a number !');
        break;
       case !isNumber(tankcapacity):
        setError(true);
        setErrormsg('Tank capacity in liters !');
        break;
       case !isNumber(tankdiameter):
        setError(true);
        setErrormsg('Tank diameter in CM !');
        break;
       case !isNumber(tankheight):
        setError(true);
        setErrormsg('Tank height in CM !');
        break;
       case !isUrlValid(cameraurl):
        setError(true);
        setErrormsg('Not valid camera url !');
         break;
       case !isUrlValid(spoturl):
        setError(true);
        setErrormsg('Not valid spot url !');
        break;
       case !isUrlValid(distanceurl):
          setError(true);
          setErrormsg('Not valid distance url !');
          break; 
        case !isUrlValid(motoron):
          setError(true);
          setErrormsg('Not valid motor on url !');
          break;
        case !isUrlValid(motoroff):
          setError(true);
          setErrormsg('Not valid motor off url !');
          break;   
        case !isNumber(distanceend):
          setError(true);
          setErrormsg('Not valid distance end !');
          break;
        case !isUrlValid(resetesp):
          setError(true);
          setErrormsg('Not valid reset url !');
          break;  
       default:
        setError(false);
        _storeData('@username', username);
        _storeData('@password', password);
        _storeData('@tankcapacity', tankcapacity);
        _storeData('@tankdiameter', tankdiameter);
        _storeData('@tankheight', tankheight);
        _storeData('@cameraurl', cameraurl);
        _storeData('@spoturl', spoturl);
        _storeData('@distanceurl', distanceurl);
        _storeData('@motoron', motoron);
        _storeData('@motoroff', motoroff);
        _storeData('@distanceend', distanceend);
        _storeData('@resetesp', resetesp);


        ToastAndroid.show('Successfully Saved !', ToastAndroid.SHORT)
         break;
     }
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

  const getDataFromApi = async (url: any) => {
console.log(url)
    //distanceurl
    try {
      let response = await fetch(url) //distanceurl replace this with this
      .then(function(response) {
        // When the page is loaded convert it to text
      ToastAndroid.show('Successfully Restart !', ToastAndroid.SHORT)
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
  
      return response;
    } catch (error) {
      console.error(error);
    }
  };


  const isUrlValid = (userInput: any) => {
      let url = new RegExp(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
      return url.test(userInput);
  }

  const validateEmail = (email: any) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  const checkPassword = (str: any) => {
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(str);
  }

  const isNumber = (str: any) => {
    let pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
  };   

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
        <ScrollView style={{flex:1}}>
            {error?
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                <Text style={{color: 'red'}}> { errormsg } </Text>
            </View>
            :null}
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Username: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  value={username}
                  onChangeText={ (username: any) =>{ setUsername(username) }}
                  placeholder="Username"
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Password: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (password: any) =>{ setPassword(password) }}
                  value={password}
                  placeholder="Password"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Tank Capacity(L): </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (tc: any) =>{ setTankcapacity(tc); }}
                  value={tankcapacity}
                  placeholder="Tank Capacity"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Tank Diameter(cm): </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (td: any) =>{ setTankdiameter(td) }}
                  value={tankdiameter}
                  placeholder="Tank Diameter"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Tank Height(cm): </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (th: any) =>{ setTankheight(th) }}
                  value={tankheight}
                  placeholder="Tank Height"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Camera url: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (cu: any) =>{ setCameraurl(cu) }}
                  value={cameraurl}
                  placeholder="Camera url"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Spot url: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (su: any) =>{ setSpoturl(su) }}
                  value={spoturl}
                  placeholder="Spot url"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Get distance url: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (du: any) =>{ setDistanceurl(du) }}
                  value={distanceurl}
                  placeholder="Distance url"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Motor on url: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (mo: any) =>{ setMotoron(mo) }}
                  value={motoron}
                  placeholder="Motor on url"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Motor off url: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (mf: any) =>{ setMotoroff(mf) }}
                  value={motoroff}
                  placeholder="Motor off url"
                  
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Distance end: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (de: any) =>{ setDistanceend(de) }}
                  value={distanceend}
                  placeholder="Distance end"
                  
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text> Reset url: </Text>
              </View>
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={{}}
                  onChangeText={ (ru: any) =>{ setResetesp(ru) }}
                  value={resetesp}
                  placeholder="Reset url"
                  
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex:0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={saveSettings}
                    style={{    backgroundColor: '#012f6c',
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    borderRadius:10,}}>
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
              <View style={{flex:0.5,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                    style={{    backgroundColor: '#012f6c',
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    borderRadius:10,}}>
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
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:10}}>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={ () => { _storeData('@auth_token', ''); navigation.replace('entrance') }}
                    style={{    backgroundColor: '#012f6c',
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    borderRadius:10,}}>
                    <Text
                      style={[
                        {
                          fontFamily: 'Montserrat-Bold',
                          fontWeight: 'bold',
                          fontSize: 14,
                          color: '#ffffff',
                        },
                      ]}>
                      {"Logout"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={ () => { getDataFromApi(resetesp) }}
                    style={{    backgroundColor: '#012f6c',
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    marginLeft:10,
                    borderRadius:10,}}>
                    <Text
                      style={[
                        {
                          fontFamily: 'Montserrat-Bold',
                          fontWeight: 'bold',
                          fontSize: 14,
                          color: '#ffffff',
                        },
                      ]}>
                      {"Restart"}
                    </Text>
                  </TouchableOpacity>
              </View>
              
            </View>
        </ScrollView>
    </ImageBackground>
  );
};

export default Settings;
