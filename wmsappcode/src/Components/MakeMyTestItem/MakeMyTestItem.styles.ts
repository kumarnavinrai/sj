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
    height: theme.SIZES.large * 7,
    aspectRatio: 2.3,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.SIZES.small,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: theme.SIZES.normal + 2,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: theme.SIZES.small / 2,
    color: theme.COLORS.FONT_COLOR_2,
  },
  parent: {
    borderRadius: 10,
    backgroundColor: theme.COLORS.DEFAULT,
    ...baseStyles.shadow_minimal,
    marginHorizontal: theme.SIZES.large,
    marginBottom: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
    paddingTop: theme.SIZES.normal,
  },
});
export default styles;
