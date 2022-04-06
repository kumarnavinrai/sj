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
    paddingHorizontal: theme.SIZES.normal,
    width: '100%',
    aspectRatio: 2.3,
    resizeMode: 'contain',
    borderRadius: 10,
  },

  parent: {
    width: wp('80%'),
    borderRadius: 10,
    backgroundColor: theme.COLORS.DEFAULT,
    ...baseStyles.shadow_minimal,
    marginRight: theme.SIZES.large,
  },
});
export default styles;
