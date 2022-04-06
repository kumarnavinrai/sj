import Snackbar from 'react-native-snackbar';
import DashboardService from '../../Services/DashboardServices';
const service = new DashboardService();
export const SET_BANNERS = 'SET_BANNERS';
export const SET_PAID_COURSES = 'SET_ACTIVE_COURSES';
export const SET_DEMO_COURSES = 'SET_DEMO_COURSES';

export const setBanners = (banners: any) => {
  return {type: SET_BANNERS, banners};
};

export const setPaidCourses = (courses: any) => {
  return {type: SET_PAID_COURSES, courses};
};

export const setDemoCourses = (courses: any) => {
  return {type: SET_DEMO_COURSES, courses};
};

export const getBanners = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_banners();
      if (response.status !== 200) {
        throw new Error(`Server Error - ${response}`);
      }

      if (response.data.responseCode !== '2000') {
        throw new Error(response.data.Message);
      }
      const banners = response.data.payload;
      dispatch(setBanners(banners));
    } catch (err) {
      throw err;
    }
  };
};

export const getMyCourses = (user_id: string) => {
  return async (dispatch: any) => {
    try {
      //*paid
      const active_paid_courses_response = await service.get_my_courses(
        user_id,
        1,
      );
      console.log('active_paid_courses_response', active_paid_courses_response);
      if (active_paid_courses_response.status !== 200) {
        throw new Error(`Server Error - ${active_paid_courses_response}`);
      }
      if (active_paid_courses_response.data.responseCode !== '2000') {
        throw new Error(active_paid_courses_response.data.Message);
      }
      const active_courses = active_paid_courses_response.data.payload;
      dispatch(setPaidCourses(active_courses));
      //*demo
      const active_demo_courses_response = await service.get_my_courses(
        user_id,
        1,
      );
      if (active_demo_courses_response.status !== 200) {
        throw new Error(`Server Error - ${active_demo_courses_response}`);
      }
      if (active_demo_courses_response.data.responseCode !== '2000') {
        throw new Error(active_demo_courses_response.data.Message);
      }
      const demo_courses = active_demo_courses_response.data.payload;
      dispatch(setDemoCourses(demo_courses));
    } catch (err) {
      throw err;
    }
  };
};

export const createFeedback = (data: any) => {
  return async (dispatch: any) => {
    try {
      //*paid
      const feedback_response = await service.create_feedback(data);
      console.log('feedBack_response', feedback_response);
      if (feedback_response.status !== 200) {
        throw new Error(`Server Error - ${feedback_response}`);
      }
      if (feedback_response.data.responseCode !== '2000') {
        throw new Error(feedback_response.data.Message);
      }
      Snackbar.show({
        text: 'Thank you for feedback',
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getIssuesTypeListing = () => {
  return async (dispatch: any) => {
    try {
      //*paid
      const issue_listing_response = await service.get_issue_type_listing();
      if (issue_listing_response.status !== 200) {
        throw new Error(`Server Error - ${issue_listing_response}`);
      }
      if (issue_listing_response.data.responseCode !== '2000') {
        throw new Error(issue_listing_response.data.Message);
      }
      const issue_list = issue_listing_response.data.payload;
      return issue_list;
    } catch (err) {
      throw err;
    }
  };
};
