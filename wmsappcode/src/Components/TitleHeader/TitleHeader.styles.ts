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
    width: '83%',
    fontSize: theme.SIZES.large,
    color: '#232323',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#1a448b',
    fontFamily: 'Montserrat-Medium',
    fontSize: theme.SIZES.normal,
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
  },
});
export default styles;
