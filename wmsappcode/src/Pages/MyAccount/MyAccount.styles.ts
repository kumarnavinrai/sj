import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    paddingTop: hp('11%'),
  },
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: theme.SIZES.large + 2,
  },
});
export default styles;
