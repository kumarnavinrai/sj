import React from 'react';
import styles from './CustomTopBarAc.styles';
import {FunctionComponent} from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity,  TextInput } from 'react-native';
import { search_icons, filter_icons } from '../../Assets/Images';
import { allContentOpenModal } from '../../Store/actions/allcontent';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type props = {
  navigation?: any;
  screenname?: any;
  routename?: any;
  currentscreen?: any;
};

const CustomTopBarAc: FunctionComponent<props> = ({navigation, screenname, routename, currentscreen}) => {
  const dispatch = useDispatch();
  const openCloseModal = useCallback(async (modalstate) => {
    try {

      await dispatch(allContentOpenModal(modalstate));

    } catch (err) {

      console.log(err.message);
    }
  }, [dispatch]);

  const changeModelState = async (modalstate: any, currentscreen: any) => {
      if(currentscreen === 'allcontent'){
        openCloseModal(modalstate);
      }else{
        console.log(currentscreen);
      }  
  };

  const checkHeaderStateTitle = (screenname: any) => {
      switch (true) {
        case screenname === 'searchvideo':
          return false;
        case screenname === 'chapter':
            return true;
        case screenname === 'allcontent':
            return true;      
        default:
          return false;
    
      }
  }
  
  const checkHeaderStateTextBox= (screenname: any) => {
    switch (true) {
      case screenname === 'searchvideo':
        return true;
      case screenname === 'chapter':
          return false;
      case screenname === 'allcontent':
          return false;        
      default:
        return false;
  
    }
}

const checkHeaderStateIcons= (screenname: any) => {
  switch (true) {
    case screenname === 'searchvideo':
      return false;
    case screenname === 'chapter':
        return false;
    case screenname === 'allcontent':
        return true;       
    default:
      return false;

  }
}

  let deviceWidth = Dimensions.get('window').width;
  return (
    <View style={styles.mainParent}>
      <View style={styles.subParent}>

        <View style={{flex:0.6}}>
          {checkHeaderStateTitle(currentscreen) === true? 
          <Text style={styles.titlestyle}>Chapter 2</Text>
          :null}
          {checkHeaderStateTextBox(currentscreen) === true?
          <TextInput
            style={{}}
            // onChangeText={{onChangeNumber}}
            value={''}
            placeholder="Search video name ..."
            placeholderTextColor={'#ffffff'}
            // keyboardType="numeric"
          />
          :null}
        </View>
        <View style={{flex:0.15}}>
          {/* <Image style={{height:25,width:25}} resizeMode='contain' source={search_icons} /> */}
        </View>
        {checkHeaderStateIcons(currentscreen) === true? 
        <View style={styles.icon_container}>
          <TouchableOpacity onPress={ () => {   navigation.navigate(screenname); }}>
            <Image style={styles.search_icon} resizeMode='contain' source={search_icons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => { changeModelState(true, currentscreen); }}>
            <Image style={styles.filter_icon} resizeMode='contain' source={filter_icons} />
          </TouchableOpacity>
        </View>
         :null} 
      </View>  
      
    </View>
  );
};

export default CustomTopBarAc;
