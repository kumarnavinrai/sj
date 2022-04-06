import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import Icons from '../../Assets/Svg';
import theme from '../../Constants/theme';
import {TouchableRipple} from 'react-native-paper';

type props = {
  type: string;
  size: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  subcategory?: boolean;
};

const Icon: FunctionComponent<props> = ({
  type,
  style,
  size,
  onPress,
  subcategory,
}) => {
  const {Icon}: any = Icons.find((item: any) => item.label === type);

  return (
    <TouchableRipple
      style={[styles.parent, style]}
      rippleColor={`${theme.COLORS.DEFAULT}70`}
      onPress={onPress && onPress}
      borderless={true}>
      <Icon
        width={theme.SIZES.large * size}
        height={theme.SIZES.large * size}
      />
    </TouchableRipple>
  );
};

export default Icon;

const styles = StyleSheet.create({
  parent: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});
