import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './TitleHeader.styles';
const TitleHeader = ({
  title,
  viewAll,
}: {
  title: string;
  viewAll?: () => void;
}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.title}>{title}</Text>
      {viewAll && (
        <TouchableOpacity onPress={viewAll}>
          <Text style={styles.viewAllText}>View all {'>'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TitleHeader;
