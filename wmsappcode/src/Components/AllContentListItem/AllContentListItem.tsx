import React from 'react';
import {FC} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import theme from '../../Constants/theme';
import CustomButton from '../Common/CustomButton/CustomButton';
import styles from './AllContentListItem.styles';
import CheckBox from 'react-native-check-box';
import {icon_checkbox, play_icon, download_icon, line_small, icon_uncheckbox, pdf_icon, path_icon} from '../../Assets/Images';


type props = {
  logo: any;
  title: string;
  subtitle: string;
  progress: number;
  chkstate: any;
  setCheckbox: any;
  indexChkbox: any;
  whichIcon: any; 
  buttonTitle: string;
  onPress: () => void;
};

const getTypeOfIcon = (whichicon: any) => {
   
 switch (true) {
  case whichicon === 'video':
  return play_icon;
  case whichicon === 'pdf':
  return pdf_icon;
  case whichicon === 'link':
  return path_icon;
  default:
  return play_icon;
 }

};

const AllContentListItem: FC<props> = ({
  logo,
  title,
  subtitle,
  progress,
  whichIcon, 
  buttonTitle,
  chkstate,
  indexChkbox,
  setCheckbox,
  onPress,
}) => {
  return (
    <View style={styles.parent}>
      <View style={[styles.rowContainer,{flex:1}]}>
        <View style={styles.checkboxcontainer}>
          <CheckBox
                style={styles.checkboxstyle}
                onClick={()=>{
                  setCheckbox(indexChkbox);
                }}
                checkedImage={<Image style={styles.checkboxcheckedimage} source={icon_checkbox} />}
                unCheckedImage={<Image style={styles.checkboxcheckedimage} source={icon_uncheckbox} />}
                isChecked={chkstate}
                leftText={""}
            />
        </View>
        <View style={[styles.titleContainer,{flex:0.8}]}>
          <View style={styles.titlesubcontainer} >
            <View style={styles.titlewrapperstyle}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.playiconouterwrapper}>
              <View style={styles.playiconwrapper} >
                <Image 
                  source={getTypeOfIcon(whichIcon)}
                  style={styles.playimage}
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.linewrapperstyle} >
                <Image 
                  source={line_small}
                  style={styles.linestyle}
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.downloadiconwrapper} >
                <Image 
                  source={download_icon}
                  style={styles.downloadiconstyle}
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.custombuttonwrapper} >
                <CustomButton
                style={{width: '70%', borderRadius: 6, marginHorizontal: 0, backgroundColor: '#8d8d8d'}}
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
        </View>
      </View>
     
      
    </View>
  );
};

export default AllContentListItem;
