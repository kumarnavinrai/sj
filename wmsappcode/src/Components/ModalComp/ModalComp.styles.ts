import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';
import baseStyles from '../Common/styles';
let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  img_submit_height_width: {
    height:50, 
    width: 145
  },
  img_close_height_width: {
    height:100, 
    width: 200
  },
  btn_ctn_submit: {
    flex:.45, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  btn_ctn_close: {
    flex:.45, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop:10
  },
  txt_checkbox: {
    fontFamily:'Montserrat-Medium', 
    fontSize: 16, 
    color: '#232323'
  },
  txt_second: { 
    fontFamily: 'Montserrat-Regular', 
    fontSize:14, 
    fontWeight: 'normal', 
    color:'#525d61', 
    textAlign: 'center'
  },
  f_1_r_c_c: {
    flex:1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text_top: { 
    fontFamily: 'Montserrat-Bold', 
    fontSize:20, 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  modal_sub_ctn_one: {
    flex:1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modal_ctn_one: {
    flex:1,
    flexDirection:'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 25, 
    paddingHorizontal: 15
  },
  modal_second_touch: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [
      { translateX: -(deviceWidth * 0.45) },
      { translateY: -120 },
    ],
    height: 350,
    width: deviceWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  modal_first_touch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: theme.SIZES.large * 3,
    height: theme.SIZES.large * 3,
    aspectRatio: 1,
  },
  imageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: theme.SIZES.small / 1.7,
    borderRadius: 2,
  },
  titleContainer: {
    width: '80%',
    paddingLeft: theme.SIZES.small / 2,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: theme.SIZES.normal - 1,
    fontWeight: 'bold',
    width: '100%',
    color: '#252424',
  },
  subTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: theme.SIZES.small + 2,
    color: '#8d989d',
  },
  progressParent: {
    paddingVertical: theme.SIZES.small,
  },
  rowContainer: {
    width: '100%',
    paddingVertical: theme.SIZES.normal,
    flexDirection: 'row',
  },
  parent: {
    borderRadius: 10,
    backgroundColor: theme.COLORS.DEFAULT,
    ...baseStyles.shadow_minimal,
    // marginHorizontal: theme.SIZES.large,
    marginBottom: theme.SIZES.normal,
    // paddingHorizontal: theme.SIZES.small,
  },
  checkboxcontainer: {
    flex:0.2,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  checkboxstyle: { 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center' 
  },
  checkboxcheckedimage: {
    height:30,
    width:30,
  },
  titlesubcontainer: {
    flex:1,
    flexDirection:'column'
  },
  titlewrapperstyle: {
    flexDirection:'row', 
    paddingRight: 5
  },
  playiconouterwrapper: {
    flex:1,
    flexDirection:'row'
  },
  playiconwrapper: {
    flex:.15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  playimage: {
    height:25,
    width:20
  },
  linewrapperstyle: {
    flex:.05,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  linestyle: {
    height:15,
    width:15
  },
  downloadiconwrapper: {
    flex:.15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  downloadiconstyle: {
    height:25,
    width:20
  },
  custombuttonwrapper: {
    flex:.6,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }


});
export default styles;
