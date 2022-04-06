import React from 'react';
import {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {View, Text, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import theme from '../../Constants/theme';
import CustomButton from '../Common/CustomButton/CustomButton';
import styles from './CourseListItem.styles';
type props = {
  logo: any;
  title: string;
  subtitle: string;
  subtitledate?: string;
  coursecompleated?: string;
  progress: number;
  buttonTitle: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
const CourseListItem: FC<props> = ({
  logo,
  title,
  subtitle,
  progress,
  subtitledate,
  coursecompleated,
  buttonTitle,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.parent, style]}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof logo === 'string' ? {uri: logo} : logo}
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {!subtitledate ? (
            <Text style={styles.subTitle}>{subtitle}</Text>
          ) : null}
          {subtitledate ? (
            <View style={{flex: 1, flexDirection: 'row', paddingTop: 5}}>
              <Text style={[styles.subTitle, {fontWeight: 'bold'}]}>
                {subtitle}
              </Text>
              <Text style={styles.subTitle}>{subtitledate}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View>
        {coursecompleated ? (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.subTitle, styles.coursecompleated]}>
              {coursecompleated}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.progressParent}>
        <ProgressBar
          style={styles.progressBar}
          progress={progress}
          color={'#6b757e'}
        />
      </View>
      <CustomButton
        style={{width: '100%', borderRadius: 6, marginHorizontal: 0}}
        filled
        title={buttonTitle}
        touchableProps={{
          onPress: onPress,
          disabled: false,
        }}
        loading={false}
        size={'SMALL'}
      />
    </View>
  );
};

export default CourseListItem;
