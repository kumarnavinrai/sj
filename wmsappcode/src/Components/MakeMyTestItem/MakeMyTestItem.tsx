import React from 'react';
import {FC} from 'react';
import {View, Text, Image} from 'react-native';
import CustomButton from '../Common/CustomButton/CustomButton';
import styles from './MakeMyTestItem.styles';
type props = {
  onPress: () => void;
  title: string;
  image: any;
  buttonTitle: string;
};
const MakeMyTestItem: FC<props> = ({image, title, onPress, buttonTitle}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={styles.image}
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

export default MakeMyTestItem;
