import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';
import baseStyles from '../Common/styles';

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: theme.SIZES.normal,
    color: '#232323',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
  },

  parent: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    marginHorizontal: theme.SIZES.normal,
    marginVertical: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
  },
  outerview: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 60,
    paddingVertical: 10,
    borderBottomColor: '#ffffff'
  },
  innerview: { 
    flex: 4, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 80 
  },
  segmentview: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: 100,

  },
  selecttedtab: { 
    fontFamily: 'Montserrat-Bold', 
    color: '#1a448c', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline', 
    textDecorationStyle: 'solid', 
    textDecorationColor: '#1a448c', 
    fontSize: 17 
  },
  notselecttedtab: { 
    fontFamily: 'Montserrat-Normal', 
    color: '#1f1f1f', 
    textAlign: 'center', 
    fontSize: 16
  }
});
export default styles;
