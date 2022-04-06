import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import theme from '../../Constants/theme';

const styles = StyleSheet.create({
  dropdownParent: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    ...(Platform.OS !== 'android' && {
      zIndex: 10,
    }),
    marginBottom: theme.SIZES.normal,
  },
  basic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  parentContainer: {
    flex: 1,
  },
  signuptitle: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    marginVertical: hp('10%'),
    fontFamily: 'Monsterrat-Bold',
    color: theme.COLORS.FONT_COLOR_1,
    textAlign: 'center',
  },
  and: {
    fontFamily: 'Poppins-Regular',
  },
  privacy: {
    fontSize: wp('4%'),
    color: theme.COLORS.PRIMARY,
    fontFamily: 'Poppins-Regular',
  },
  sendbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
    borderRadius: 7,
    padding: 11,
    width: wp('83%'),
    alignSelf: 'center',
  },
  signuptextbot: {
    fontSize: wp('4%'),
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  accept: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Regular',
  },
  terms: {
    color: theme.COLORS.PRIMARY,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Regular',
  },
  basicstart: {
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small - 4,
  },
  country: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: wp('4%'),
  },
  touchsend2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: theme.SIZES.normal,
  },
  noacc: {
    fontSize: wp('4.5%'),
    color: 'grey',
    fontFamily: 'Monsterrat-Bold',
    fontWeight: 'bold',
  },
  signintext: {
    fontSize: theme.SIZES.normal + 2,
    color: theme.COLORS.SECONDARY,
    marginLeft: wp('1%'),
    fontFamily: 'Monsterrat-Bold',
    fontWeight: 'bold',
  },

  send: {
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('1%'),
  },
  textin: {
    flex: 1,
    fontSize: wp('5%'),
    marginLeft: wp('3%'),
  },
  check: {
    justifyContent: 'center',
    marginLeft: wp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    marginEnd: wp('4%'),
    marginTop: wp('1%'),
  },
  basiccheck: {
    width: 22,
    height: 22,
    marginRight: theme.SIZES.small / 2,
  },
  basicbot: {
    flexDirection: 'row',
    width: '100%',
    marginTop: theme.SIZES.small / 2,
  },
  termContainer: {
    marginLeft: '2%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  errortitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    paddingHorizontal: theme.SIZES.small,
  },
  errortext: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-Regular',
    color: 'red',
  },
});
export default styles;
