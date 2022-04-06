import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import ActionLoader from '../ActionLoader';
import PropTypes from 'prop-types';
import {TouchableHighlight} from 'react-native-gesture-handler';
import baseStyles from '../styles';
import {styles} from './styles';
import theme from '../../../Constants/theme';
import {StyleProp} from 'react-native';

type props = {
  loading: boolean;
  touchableProps: {onPress: () => void; disabled: boolean};
  title: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  filled?: boolean;
  // toggle?: boolean;
  squared?: boolean;
  style?: StyleProp<ViewStyle>;
  loadingText?: string;
};
const CustomButton: FunctionComponent<props> = ({
  loading,
  touchableProps,
  title,
  size,
  filled,
  // toggle,
  squared,
  style,
  loadingText,
}) => {
  const custom_font_size =
    size === 'LARGE'
      ? theme.SIZES.large + 4
      : size === 'MEDIUM'
      ? theme.SIZES.normal + 2
      : theme.SIZES.small + 2;

  return loading === false ? (
    <TouchableOpacity
      {...touchableProps}
      style={[
        styles.button,
        filled ? styles.filled : styles.filled_white,
        squared && styles.square,
        style,
      ]}>
      <Text
        style={[
          {
            fontFamily: 'Montserrat-Bold',
            fontWeight: 'bold',
            fontSize: custom_font_size,
            color: filled ? theme.COLORS.WHITE : theme.COLORS.HEADER,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <ActionLoader
      title={loadingText ? loadingText : 'Loading...'}
      size={theme.SIZES.large * 2}
      color={theme.COLORS.PRIMARY}
    />
  );
};

export default CustomButton;
