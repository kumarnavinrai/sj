import React from 'react';
import {FC} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Modal} from 'react-native';

import styles from './ModalComp.styles';
import CheckBox from 'react-native-check-box';
import {
  icon_checkbox, 
  play_icon, 
  icon_uncheckbox, 
  pdf_icon, 
  path_icon,
  close_btn,
  submit_btn,
} from '../../Assets/Images';


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
  changeModelState: any;
  filtermodal: any;
  onPress: () => void;
};



const ModalComp: FC<props> = ({
  logo,
  title,
  subtitle,
  progress,
  whichIcon, 
  buttonTitle,
  chkstate,
  indexChkbox,
  setCheckbox,
  filtermodal,
  changeModelState,
  onPress,
}) => {

  let deviceHeight = Dimensions.get('screen').height;
  let deviceWidth = Dimensions.get('screen').width;

  return (
    <Modal
          animationType={'fade'}
          transparent={true}
          visible={filtermodal}
          onDismiss={() => {
            changeModelState(false);
          }}
          onRequestClose={() => {
            changeModelState(false);
          }}>
          <TouchableOpacity
            style={styles.modal_first_touch}
            activeOpacity={1}
            onPressOut={() => {
              changeModelState(false);
            }}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View
                style={styles.modal_second_touch}>
                <View style={styles.modal_ctn_one}>
                  <View style={styles.modal_sub_ctn_one}>
                      <Text style={styles.text_top}>Please Choose Tag</Text>
                  </View>
                  <View style={styles.f_1_r_c_c}>
                      <Text style={styles.txt_second}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</Text>
                  </View>
                  <View style={styles.f_1_r_c_c}>
                      <View style={{flex:.3}}>
                        <CheckBox
                            style={styles.checkboxstyle}
                            onClick={()=>{
                              
                            }}
                            checkedImage={<Image style={styles.checkboxcheckedimage} source={icon_checkbox} />}
                            unCheckedImage={<Image style={styles.checkboxcheckedimage} source={icon_uncheckbox} />}
                            isChecked={true}
                            leftText={""}
                        />
                      </View>
                      <View style={{flex:.7}}>
                            <Text style={styles.txt_checkbox}>Important</Text>
                      </View>
                  </View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={{flex:.3}}>
                        <CheckBox
                            style={styles.checkboxstyle}
                            onClick={()=>{
                              
                            }}
                            checkedImage={<Image style={styles.checkboxcheckedimage} source={icon_checkbox} />}
                            unCheckedImage={<Image style={styles.checkboxcheckedimage} source={icon_uncheckbox} />}
                            isChecked={true}
                            leftText={""}
                        />
                      </View>
                      <View style={{flex:.7}}>
                            <Text style={styles.txt_checkbox}>Watch Later</Text>
                      </View>
                  </View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={{flex:.3}}>
                        <CheckBox
                            style={styles.checkboxstyle}
                            onClick={()=>{
                              
                            }}
                            checkedImage={<Image style={styles.checkboxcheckedimage} source={icon_checkbox} />}
                            unCheckedImage={<Image style={styles.checkboxcheckedimage} source={icon_uncheckbox} />}
                            isChecked={false}
                            leftText={""}
                        />
                      </View>
                      <View style={{flex:.7}}>
                            <Text style={styles.txt_checkbox}>Have Confusion</Text>
                      </View>
                  </View>
                  <View style={styles.f_1_r_c_c}>
                    <View style={styles.btn_ctn_close}>            
                          <TouchableOpacity
                            onPress={() => {
                              changeModelState(false);
                            }}
                            style={{
                            
                            }}>
                            <Image 
                              source={close_btn}
                              resizeMode='contain' 
                              style={styles.img_close_height_width}
                            />  
                          
                          </TouchableOpacity>
                      </View>
                      <View style={styles.btn_ctn_submit}>            
                          <TouchableOpacity
                            onPress={() => {
                              changeModelState(false);
                            }}
                            style={{
                            
                            }}>
                            <Image 
                              source={submit_btn}
                              resizeMode='contain' 
                              style={styles.img_submit_height_width}
                            />  
                          
                          </TouchableOpacity>
                      </View>    
                  </View>
                </View>  

                    
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal> 
  );
};

export default ModalComp;
