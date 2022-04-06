import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import DropDownPicker from 'react-native-custom-dropdown';
import {styles} from './styles';
import theme from '../../Constants/theme';
import {useState} from 'react';

type props = {
  items: {
    label: any;
    value: any;
    icon?: () => JSX.Element;
    disabled?: boolean;
    selected?: boolean;
  }[];
  placeholder: string;
  onChangeItem: (item: any, index: number) => void;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  dropDownStyle?: StyleProp<ViewStyle>;
  parentStyle?: StyleProp<ViewStyle>;
  arrowColor: string;
  title?: string;
  arrowSize?: number;
};

const DropDown: FunctionComponent<props> = ({
  style,
  items,
  placeholder,
  itemStyle,
  onChangeItem,
  dropDownStyle,
  parentStyle,
  arrowColor,
  title,
  arrowSize,
}) => {
  return (
    <View style={[styles.parent, parentStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <DropDownPicker
        arrowSize={arrowSize ? arrowSize : theme.SIZES.large}
        items={items}
        arrowColor={arrowColor}
        // placeholder={placeholder}
        placeholderStyle={{
          color: `${theme.COLORS.FONT_COLOR_1}50`,
          fontSize: theme.SIZES.normal + 2,
          letterSpacing: 1,
        }}
        dropDownMaxHeight={300}
        containerStyle={[{width: '100%', height:52}, style]}
        style={[styles.dropdownStyle]}
        selectedLabelStyle={{
          fontSize: theme.SIZES.normal,
          letterSpacing: 1,
        }}
        labelStyle={{
          fontSize: theme.SIZES.normal + 2,
          letterSpacing: 1,
        }}
        itemStyle={[
          {
            justifyContent: 'flex-start',
          },
          itemStyle,
        ]}
        dropDownStyle={[styles.dropdown, dropDownStyle]}
        onChangeItem={onChangeItem}
      />
    </View>
  );
};

export default DropDown;
