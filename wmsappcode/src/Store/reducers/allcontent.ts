import {SET_ALLCONTENT, SET_ALLCONTENT_VIDEO} from '../actions/allcontent';

const initialState = {
  allcontentsdata: [],
  videocontents: [],
  notescontent: {},
  practicecontent: [],
  filtermodalstate: true,
};

const userReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case SET_ALLCONTENT:
 
      return {...state, allcontentsdata: action.contents};
    case SET_ALLCONTENT_VIDEO:
 
      return {...state, filtermodalstate: action.contents};  
    default:
      return state;
  }
};

export default userReducer;
