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
    width: '100%',
    height: theme.SIZES.large * 8,
  },

  parent: {
    borderRadius: 10,
    // ...baseStyles.shadow_minimal,
    marginHorizontal: theme.SIZES.large,
    marginBottom: theme.SIZES.normal,
  },
});
export default styles;
