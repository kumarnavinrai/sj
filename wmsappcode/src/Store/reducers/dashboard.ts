import {
  SET_BANNERS,
  SET_DEMO_COURSES,
  SET_PAID_COURSES,
} from '../actions/dashboard';

const initialState = {
  banners: [],
  continue_watching: [],
  daily_quiz: {},
  active_paid_courses: [],
  active_demo_courses: [],
  live_classes: [],
  performance_analytics: [],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BANNERS:
      return {...state, banners: action.banners};

    case SET_PAID_COURSES:
      return {...state, active_paid_courses: action.courses};
    case SET_DEMO_COURSES:
      return {...state, active_demo_courses: action.courses};
    default:
      return state;
  }
};

export default userReducer;
