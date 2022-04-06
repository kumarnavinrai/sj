import React from 'react';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../Constants/theme';
import CustomButton from './Common/CustomButton/CustomButton';
//*start from here finish till 16
type props = {
  heading?: string;
  subHeading?: string;
  onPress?: () => void;
  buttonTitle?: string;
};
const NotAvailableItem: FC<props> = ({
  heading,
  subHeading,
  onPress,
  buttonTitle,
}) => {
  return (
    <View style={styles.parent}>
      {heading && <Text style={styles.firstText}>{heading}</Text>}
      {subHeading && <Text style={styles.secondText}>{subHeading}</Text>}
      {onPress && buttonTitle && (
        <CustomButton
          filled
          title={buttonTitle}
          touchableProps={{
            onPress: onPress,
            disabled: false,
          }}
          loading={false}
          size={'SMALL'}
        />
      )}
    </View>
  );
};

export default NotAvailableItem;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  firstText: {
    fontFamily: 'Montserrat-ExtraBold',
    color: theme.COLORS.FONT_COLOR_2,
    fontSize: theme.SIZES.normal + 2,
    fontWeight: 'bold',
    width: '70%',
    marginBottom: theme.SIZES.small + 2,
  },
  secondText: {
    fontFamily: 'Montserrat-Medium',
    color: theme.COLORS.FONT_COLOR_2,
    fontSize: theme.SIZES.normal,
    width: '70%',
    marginBottom: theme.SIZES.small + 2,
  },
});
