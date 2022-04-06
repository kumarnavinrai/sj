import React from 'react';
import {FC} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import styles from './ChapterListItem.styles';
import { play_icon,  line_small,  pdf_icon, path_icon, circle, download_icon_new } from '../../Assets/Images';


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


const AllContentListItem: FC<props> = ({
  title,
}) => {
  return (
    <View style={styles.parent}>
      <View style={[styles.rowContainer,{flex:1}]}>
        <View style={styles.checkboxcontainer}>
          <ImageBackground
            resizeMode={'contain'} 
            style={{flex: 1}} 
            source={circle}
          >
              <View style={{flex:1,flexDirection: 'row', justifyContent:'center', alignItems: 'center', borderRadius:100, height: 25, width: 35}}>
                <Text>1</Text>
              </View>
          </ImageBackground>   
        </View>
        <View style={[styles.titleContainer,{flex:0.6}]}>
          <View style={styles.titlesubcontainer} >
            <View style={styles.titlewrapperstyle}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={[styles.playiconouterwrapper,{paddingTop:8}]}>
              <View style={styles.playiconwrapper} >
              <Text style={{fontSize:12}}>177 Videos</Text>
              </View>
              <View style={styles.linewrapperstyle} >
                <Image 
                  source={line_small}
                  style={styles.linestyle}
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.downloadiconwrapper} >
                <Text style={{fontSize:12}}>18 pdfs</Text>
              </View>
              <View style={styles.linewrapperstyle} >
                <Image 
                  source={line_small}
                  style={styles.linestyle}
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.downloadiconwrapper} >
                <Text style={{fontSize:12}}>101 Tests</Text>
              </View> 
              
            </View>
             
          </View>
         
        </View>
        <View style={styles.downloadiconouterwrapper}>
                  <Image 
                      source={download_icon_new}
                      style={styles.linestyle}
                      resizeMode="contain" 
                    />
                
              </View>
      </View>
     
      
    </View>
  );
};

export default AllContentListItem;
