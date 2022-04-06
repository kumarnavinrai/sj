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
    marginVertical: theme.SIZES.small,
  },
});
export default styles;
