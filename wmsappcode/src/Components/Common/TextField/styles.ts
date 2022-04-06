import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import theme from '../../../Constants/theme';

export const styles = StyleSheet.create({
  verifyButton: {
    position: 'absolute',
    zIndex: 1,
    elevation: 2,
    right: -2,
    top: 14,
  },
  iconContainer: {
    // width:'10%',
    justifyContent: 'center',
    paddingTop: wp('1%'),
    // paddingHorizontal:wp('1%'),
  },
  leftIcon: {},
  title: {
    fontSize: wp('8%'),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: 'rgb(80,80,80)',
    lineHeight: 21,
  },
  parent: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: `${theme.COLORS.BORDER_TEXT}90`,
    paddingTop: theme.SIZES.small * 0.7,
    paddingBottom: theme.SIZES.small * 0.1,
    paddingLeft: theme.SIZES.small * 0.2,
    paddingRight: theme.SIZES.small * 0.2,
  },
  textField: {
    flex: 1,
    paddingLeft: 2,
    paddingBottom: 0,
    fontSize: theme.SIZES.normal,
    letterSpacing: 1,
    fontFamily: 'Montserrat-Medium',
    borderRadius: 5,
  },
  flame_icon: {},
  eye: {},
  errorContainer: {
    marginLeft: theme.SIZES.small / 2.5,
    paddingRight: theme.SIZES.small / 2,
    paddingTop: theme.SIZES.small * 0.2,
  },
  error: {
    fontSize: theme.SIZES.normal / 1.3,
    color: theme.COLORS.ERROR,
    fontFamily: 'Poppins-Medium',
  },
  check: {
    zIndex: 1,
    elevation: 2,
    marginHorizontal: theme.SIZES.small,
    marginTop: theme.SIZES.small / 3.5,
  },
});
