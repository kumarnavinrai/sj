import React from 'react';
import {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {View, Text, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import theme from '../../Constants/theme';
import CustomButton from '../Common/CustomButton/CustomButton';
import styles from './LiveCourseItem.styles';
import {calander, clock} from '../../Assets/Images';


type props = {
  logo: any;
  title: string;
  subtitle: string;
  subtitledate: string;
  coursecompleated: string;
  progress: number;
  buttonTitle: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
const LiveCourseItem: FC<props> = ({
  logo,
  title,
  subtitle,
  progress,
  subtitledate,
  coursecompleated,
  buttonTitle,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.parent, style]}>
      <View style={styles.rowContainer}>
    
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{'Application of Active Passive Voice'}</Text>
        </View>
      </View>
  
      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,flexDirection:'column',padding:7}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <Image style={{height:25,width:25}} source={calander} />
            <Text style={{textAlign:'center',paddingLeft:10}}>20 Aug 2021</Text>
          </View>
          <View style={{flex:1,flexDirection:'row'}}>
            <Image style={{height:25,width:25}} source={clock} />
            <Text style={{textAlign:'center',paddingLeft:10}}>20 Aug 2021</Text>
          </View>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingRight:10}}>
          <CustomButton
            style={{width: '100%', borderRadius: 6}}
            filled
            title={buttonTitle}
            touchableProps={{
              onPress: onPress,
              disabled: false,
            }}
            loading={false}
            size={'SMALL'}
          />
        </View>
      </View>
      
      
    </View>
  );
};

export default LiveCourseItem;
