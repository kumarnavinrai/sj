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

  firstContainer: {
    paddingHorizontal: theme.SIZES.normal,
  },

  signintitletext: {
    fontSize: theme.SIZES.large,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: theme.COLORS.FONT_COLOR_1,
    textAlign: 'center',
    marginVertical: hp('8%'),
  },
  touchsend: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  touchsend2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: theme.SIZES.small,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    marginTop: hp('2%'),
    borderColor: 'transparent',
    borderBottomColor: 'black',
    height: hp('6%'),
    margin: 11,
    marginEnd: wp('4%'),
    marginLeft: wp('5%'),
  },
  SectionStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    marginTop: hp('3%'),
    borderColor: 'transparent',
    borderBottomColor: 'black',
    height: hp('6%'),
    margin: 11,
    marginEnd: wp('4%'),
    marginLeft: wp('5%'),
  },

  signuptext: {
    fontSize: theme.SIZES.normal + 2,
    color: theme.COLORS.SECONDARY,
    marginLeft: wp('1%'),
    fontFamily: 'Monsterrat-Bold',
    fontWeight: 'bold',
  },
  forgotpasstext: {
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.BLACK,
    marginRight: theme.SIZES.normal,
    marginBottom: hp('2%'),
    fontFamily: 'Montserrat-Bold',
  },
  noacc: {
    fontSize: wp('4.5%'),
    color: 'grey',
    fontFamily: 'Montserrat-ExtraBold',
    fontWeight: 'bold',
  },
  signintextbot: {
    fontSize: wp('5%'),
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  show: {
    fontSize: wp('5%'),
    color: theme.COLORS.PRIMARY,
    fontFamily: 'Poppins-Medium',
  },
  hide: {
    fontSize: wp('5%'),
    color: theme.COLORS.PRIMARY,
    fontFamily: 'Poppins-Medium',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
    borderRadius: 7,
    padding: 11,
    width: wp('83%'),
    alignSelf: 'center',
  },
  errortitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    paddingHorizontal: theme.SIZES.large,
  },
  errortext: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-Regular',
    color: 'red',
  },
});
export default styles;
