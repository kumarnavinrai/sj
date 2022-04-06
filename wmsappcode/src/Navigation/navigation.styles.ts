import {Platform} from 'react-native';
import theme from '../Constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = {
  drawerItemParent: {
    padding: theme.SIZES.small * 0.9,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  touchable: {
    marginHorizontal: 2,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  bottomBarShadow: {
    shadowColor: theme.COLORS.BORDER_COLOR,
    elevation: 5,
    shadowOffset: {width: 0, height: -10},
    shadowRadius: 3.5,
    shadowOpacity: 0.3,
  },
  touchableAudioCall: {
    marginHorizontal: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  touchableAdd: {
    top: -30,
    height: theme.SIZES.large * 3,
    zIndex: 500,
    width: theme.SIZES.large * 3,
    borderRadius: theme.SIZES.large * 1.5,
    backgroundColor: theme.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  headerStyle: {
    backgroundColor: theme.COLORS.PRIMARY,
    height: Platform.OS === 'ios' ? hp('11%') : hp('8%'),
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTintColor: theme.COLORS.BORDER_TEXT,
  headerTitleStyle: {
    fontSize: theme.SIZES.large,
    fontFamily: 'Montserrat-Medium',
    color: theme.COLORS.BLACK,
    marginHorizontal: theme.SIZES.small,
    borderWidth: 0,
    shadowOpacity: 0,
  },
  headerRight: {
    marginHorizontal: theme.SIZES.small,
  },
  headerLeft: {
    marginHorizontal: theme.SIZES.small,
  },
  headerBackTitleStyle: {
    fontWeight: 'bold',
    fontSize: Platform.OS == 'ios' ? wp('4.5%') : wp('4%'),
    marginLeft: theme.SIZES.small * 0.6,
  },
  drawerLabelStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: theme.SIZES.normal - 1,
  },
};

export const options = {
  headerShown: false,
  title: 'First Page', //Set Header Title
  headerStyle: {
    ...styles.headerStyle,
    backgroundColor: theme.COLORS.DEFAULT, //Set Header color
  },
  headerLeftContainerStyle: {paddingLeft: theme.SIZES.small / 5},
  headerTintColor: theme.COLORS.TEXTHEADER, //Set Header text color
  headerTitleStyle: {
    fontFamily: 'Poppins-Bold', //Set Header text style
  },
};
