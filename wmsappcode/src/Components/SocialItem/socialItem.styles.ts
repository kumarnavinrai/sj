import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
export const styles = StyleSheet.create({
  parent: {
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
  },
  socialButtonParent: {
    // width: '100%',
    paddingVertical: theme.SIZES.small - 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  socialButtonText: {
    fontSize: theme.SIZES.small + 3,
    fontFamily: 'Montserrat-Bold',
    color: theme.COLORS.DEFAULT,
    marginLeft: theme.SIZES.small,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    width: '70%',
    alignSelf: 'center',
    fontSize: theme.SIZES.small + 1,
    marginBottom: theme.SIZES.small,
  },
  orImage: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: theme.SIZES.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
