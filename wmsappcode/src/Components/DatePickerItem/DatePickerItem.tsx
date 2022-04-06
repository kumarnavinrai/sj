import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
import IconIon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {styles} from './styles';
import theme from '../../Constants/theme';

type props = {
  selected: string;
  onDateChange: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  parentStyle: StyleProp<ViewStyle>;
  time?: boolean;
};

const DatePickerItem: FunctionComponent<props> = ({
  style,
  onDateChange,
  parentStyle,
  selected,
  time,
}) => {
  const [show, setShow] = useState(false);
  let date = new Date(selected);
  const renderModal = () => {
    return (
      <Modal
        style={styles.modal}
        backdropOpacity={0.1}
        backdropColor={theme.COLORS.BORDER_TEXT}
        isVisible={show}
        animationInTiming={400}
        backdropTransitionInTiming={400}
        backdropTransitionOutTiming={400}
        onBackdropPress={() => setShow(false)}
        animationOutTiming={500}
        onSwipeComplete={() => setShow(false)}
        swipeDirection={['down']}>
        <View
          style={styles.mainModal}>
          <TouchableOpacity
            style={styles.iconTouchable}
            onPress={() => setShow(false)}>
            <IconIon name={'close'} size={37} color={theme.COLORS.PRIMARY} />
          </TouchableOpacity>
          <DatePicker
            textColor={theme.COLORS.PRIMARY}
            mode={time ? 'time' : 'date'}
            date={
              typeof selected === 'string' ? new Date() : new Date(selected)
            }
            onDateChange={onDateChange}
          />
        </View>
      </Modal>
    );
  };
  return (
    <View style={[styles.parent, parentStyle]}>
      <TouchableOpacity onPress={e => setShow(!show)}>
        <View style={[styles.mainContainer, style]}>
          <Icon
            name={time ? 'clock' : 'calendar'}
            size={theme.SIZES.large * 1.1}
            color={theme.COLORS.FONT_COLOR_1}
            style={styles.leftIcon}
          />
          {time ? (
            <Text>
              {typeof selected === 'string'
                ? selected
                : `${date.getHours()} : ${date.getMinutes()}`}
            </Text>
          ) : (
            <Text style={styles.selected}>
              {typeof selected === 'string'
                ? selected
                : `${date.getDate().toString()} / ${
                    date.getMonth() + 1
                  } / ${date.getFullYear().toString()}`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {show && renderModal()}
    </View>
  );
};

export default DatePickerItem;
