import {StyleSheet} from 'react-native';
import theme from '../../../Constants/theme';
export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small - 1,
    marginVertical: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small,
    borderRadius: 9,
    elevation: 3,
    textAlign: 'center',
  },
  filled: {
    backgroundColor: theme.COLORS.PRIMARY,
  },
  square: {
    borderRadius: 9,
  },
  filled_white: {
    backgroundColor: theme.COLORS.DEFAULT,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
