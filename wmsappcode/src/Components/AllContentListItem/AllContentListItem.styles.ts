import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';
import baseStyles from '../Common/styles';

const styles = StyleSheet.create({
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
