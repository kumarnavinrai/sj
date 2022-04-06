import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';

const styles = StyleSheet.create({
  dropDownContainerStyle: {
    borderWidth: 1,
    // borderRadius: 6,
    borderColor: '#eceeef',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#eceeef',
  },
  imageBackground: {
    flex: 1,
    // paddingTop: hp('11%'),
  },
  parentContainer: {
    flex: 1,
    paddingTop: theme.SIZES.large + 2,
  },
  innerContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: theme.SIZES.small / 2,
    paddingHorizontal: theme.SIZES.normal,
  },
  textHeading: {
    fontFamily: 'Montserrat-Medium',
    color: theme.COLORS.BLACK,
    fontSize: theme.SIZES.normal + 2,
    marginBottom: theme.SIZES.small,
  },
  description: {
    borderWidth: 1,
    borderColor: 'rgb(189,189,189)',
    borderRadius: 5,
    borderBottomWidth: 1,
    marginTop: theme.SIZES.normal,
  },
});
export default styles;
