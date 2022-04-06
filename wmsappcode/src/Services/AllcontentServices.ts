import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../Constants/url';
import axios from 'axios';
export default class services {
  //   create_user = async (user: any) => {
  //     //Call register api
  //     const headers = {
  //       'Content-Type': 'application/json',
  //     };
  //     return axios
  //       .post(URL + 'regis', user, {headers})
  //       .then(response => response)
  //       .catch(error => {
  //         return error;
  //       });
  //   };

  get_allcontents = async () => {
      let dataToRtn : any = [];
      dataToRtn = [
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'video',
          buttonTitle:'Tagged',
          chkstate:true
        },
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'video',
          buttonTitle:'Tagged',
          chkstate:false
        },
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'pdf',
          buttonTitle:'Tagged',
          chkstate:false
        },
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'pdf',
          buttonTitle:'Tagged',
          chkstate:false
        },
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'pdf',
          buttonTitle:'Tagged',
          chkstate:false
        },
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'link',
          buttonTitle:'Tagged',
          chkstate:false
        },
        {
          title:'RBI Gr.B 2016 Solved paper English part 1 Double Blanks',
          whichIcon:'link',
          buttonTitle:'Tagged',
          chkstate:false
        },
      ];

      return dataToRtn;
    //Call authenticate api
    // const token = await AsyncStorage.getItem('auth_token');
//     const headers = {
//       'Content-Type': 'application/json',
//       //   Authorization: `Bearer ${token}`,
//     };
//     return axios
//       .get(URL + 'banner_listing', {headers})
//       .then(response => response)
//       .catch(error => error);
   };
}
