import React, {useCallback} from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {bg_image} from '../../Assets/Images';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import TextField from '../../Components/Common/TextField/TextField';
import theme from '../../Constants/theme';
import {
  createFeedback,
  getIssuesTypeListing,
} from '../../Store/actions/dashboard';
import styles from './Feedback.styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {useEffect} from 'react';
const Feedback = () => {
  const [load, setLoad] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const [issue, setIssue]: any = useState(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const give_feedback = async () => {
    setError('');
    try {
      if (issue === null) throw new Error(`Please Select issue type`);
      if (feedback.length === 0 || feedback.length === 0)
        throw new Error(`Feedback Message is required`);

      let feedBackData = {
        user_id: '20',
        issue_id: issue,
        feedback: feedback,
      };
      setLoad(true);
      await dispatch(createFeedback(feedBackData));
      setIssue(null);
      setFeedback('');
      setLoad(false);
    } catch (err: any) {
      console.log('error_login', err);
      setError(err.message);
      setLoad(false);
    }
  };
  const get_data = useCallback(async () => {
    try {
      setLoad(true);
      //* fetch banners
      const listing: any = await dispatch(getIssuesTypeListing());
      //?Organize according to list type
      let newList: any = [];

      listing.map((item: any) => {
        newList.push({
          label: item.name,
          value: item.id,
        });
      });
      setItems(newList);
      setLoad(false);
    } catch (err: any) {
      setLoad(false);
      setError(err.message);
    }
  }, [dispatch, setLoad, setError]);

  useEffect(() => {
    get_data();
  }, []);

  useEffect(() => {
    console.log('feedback', issue);
  }, [issue]);

  return (
    <ImageBackground source={bg_image} style={styles.imageBackground}>
      <ScrollView style={styles.parentContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.textHeading}>Choose Issue Type</Text>
          <DropDownPicker
            open={open}
            value={issue}
            items={items}
            placeholder={'Choose Issue Type'}
            setOpen={setOpen}
            setValue={setIssue}
            setItems={setItems}
            onChangeValue={value => setIssue(value)}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listParentContainerStyle={{borderWidth: 0}}
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.textHeading}>Description</Text>
          <TextField
            title={'Description'}
            subParentStyle={styles.description}
            inputProps={{
              style: {
                height: theme.SIZES.large * 8,
                paddingHorizontal: theme.SIZES.small * 0.8,
                width: '100%',
                textAlignVertical: 'top',
                color: `${theme.COLORS.BLACK}`,
              },
              placeholder: 'Message...',
              value: feedback,
              onChangeText: (text: string) => {
                setFeedback(text);
              },
              onBlur: () => {},
              onFocus: () => {},
              keyboardType: 'default',
              multiline: true,
              numberOfLines: 4,
            }}
            error={error}
          />
        </View>
        <CustomButton
          filled
          title={'Submit'}
          touchableProps={{
            onPress: give_feedback,
            disabled: false,
          }}
          loading={false}
          size={'MEDIUM'}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default Feedback;
