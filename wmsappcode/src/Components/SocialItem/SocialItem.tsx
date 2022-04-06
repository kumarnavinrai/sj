import React from 'react';
import {FC} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {formDivider} from '../../Assets/Images';
import theme from '../../Constants/theme';
import Icon from '../Common/Icon';
import {styles} from './socialItem.styles';
type socialprops = {
  onPress: () => void;
  title: string;
  icon: string;
};
const SocialButton: FC<socialprops> = ({onPress, title, icon}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: '45%',
          backgroundColor:
            title === 'GOOGLE' ? theme.COLORS.DEFAULT : theme.COLORS.FACEBOOK,
          borderRadius: 8,
          borderWidth: title === 'GOOGLE' ? 1.3 : 0,
          borderColor: title === 'GOOGLE' ? '#c4c4c4' : 'transparent',
        },
      ]}>
      <View style={styles.socialButtonParent}>
        <Icon type={icon} size={1.6} />
        <Text
          style={[
            styles.socialButtonText,
            {color: title === 'GOOGLE' ? '#696969' : theme.COLORS.DEFAULT},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
type props = {
  onClickFacebook: () => void;
  onClickGoogle: () => void;
};
const SocialItem: FC<props> = ({onClickFacebook, onClickGoogle}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.termsText}>
        By continuing, you agree to accept our Privacy Policy & Terms of
        Service.{' '}
      </Text>
      <Image style={styles.orImage} source={formDivider} />
      <View style={styles.buttonContainer}>
        <SocialButton
          title={'FACEBOOK'}
          onPress={onClickFacebook}
          icon={'FACEBOOK'}
        />
        <SocialButton
          title={'GOOGLE'}
          onPress={onClickGoogle}
          icon={'GOOGLE'}
        />
      </View>
    </View>
  );
};

export default SocialItem;
