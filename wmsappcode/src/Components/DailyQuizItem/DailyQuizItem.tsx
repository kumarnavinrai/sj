import React from 'react';
import {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Image} from 'react-native';
import theme from '../../Constants/theme';
import CustomButton from '../Common/CustomButton/CustomButton';
import Icon from '../Common/Icon';
import styles from './DailyQuizItem.styles';
type props = {
  logo: any;
  title: string;
  date: any;
  buttonText: string;
  onPress: () => void;
};
const DailyQuizItem: FC<props> = ({logo, title, date, buttonText, onPress}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.imageContainer}>
        <Image
          source={typeof logo === 'string' ? {uri: logo} : logo}
          style={styles.image}
        />
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateContainer}>
          <Icon type={'CLOCK'} size={1} />
          <Text style={styles.dateString}>{date}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonText}</Text>
            <Icon
              type={'RIGHT_ARROW_WHITE'}
              size={1}
              style={{
                position: 'absolute',
                right: 0,
                top: theme.SIZES.small / 1.5,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DailyQuizItem;
