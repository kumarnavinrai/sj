import React, {FunctionComponent, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Icon_vec from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import {styles} from './styles';
import theme from '../../../Constants/theme';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

type props = {
  inputProps: {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    onBlur: (e: any) => void;
    onFocus: (e: any) => void;
    style?: StyleProp<ViewStyle>;
    multiline?: boolean;
    keyboardType: any;
    maxLength?: number;
    editable?: boolean;
    numberOfLines?: number;
    ref?: any;
  };
  error: string;
  secureText?: {onToggle: () => void; hidden: boolean};
  icon?: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  verify?: {
    onPress: () => void;
    verified: boolean;
    load: boolean;
  };
  title?: string;
  flame_icon?: boolean;
  subParentStyle?: StyleProp<ViewStyle>;
};
const TextField: FunctionComponent<props> = ({
  inputProps,
  error,
  secureText,
  icon,
  label,
  style,
  verify,
  title,
  flame_icon,
  subParentStyle,
}) => {
  return (
    <View
      style={[
        {
          maxWidth: 700,
          marginBottom: theme.SIZES.small + 5,
        },
        style,
      ]}>
      <View style={[styles.parent, subParentStyle]}>
        {/* {icon && (
          <View style={styles.iconContainer}>
           <Icon
            name={icon}
            size={theme.SIZES.large * 1.2}
            color={theme.COLORS.FONT_COLOR_1}
            style={styles.leftIcon}
          />
          </View>
        )} */}
        <TextInput
          multiline={false}
          numberOfLines={1}
          placeholderTextColor={`#b1b1b1`}
          style={[
            styles.textField,
            {
              color: theme.COLORS.FONT_COLOR_1,
            },
            inputProps.style,
          ]}
          {...inputProps}
          onFocus={e => {
            inputProps.onFocus(e);
          }}
          onBlur={e => {
            inputProps.onBlur(e);
          }}
          secureTextEntry={
            secureText && secureText.hidden === false ? true : false
          }
        />
        {secureText && (
          <View style={styles.iconContainer}>
            <Icon_vec
              style={styles.eye}
              name={secureText.hidden === false ? 'eye' : 'eye-off'}
              size={theme.SIZES.large + 1}
              color={
                secureText.hidden
                  ? theme.COLORS.BORDER_COLOR
                  : theme.COLORS.HEADER
              }
              onPress={() => secureText.onToggle && secureText.onToggle()}
            />
          </View>
        )}
      </View>

      <View style={styles.errorContainer}>
        {error.length !== 0 && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default TextField;
