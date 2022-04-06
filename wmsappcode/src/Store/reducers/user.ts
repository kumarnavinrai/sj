import {
  HANDLE_LOGIN_INPUT,
  HANDLE_REGISTER_INPUTS,
  RESET_REGISTER,
  SET_USER,
} from '../actions/user';
import {SIGN_IN, SIGN_UP} from './../actions/user';
import {handleLogin, handleRegister} from './../../Pure/user';

export const basicPass = {
  text: '',
  active: false,
  error_message: '',
  show: false,
};
export const basicObj = {
  text: '',
  active: false,
  error_message: '',
};
export const registerTemplate = {
  email: {...basicObj},
  password: {...basicPass},
};
export const LoginTemplate = {
  email: {text: '', active: false, error_message: ''},
  password: {text: '', active: false, error_message: '', show: false},
};

const initialState = {
  register: JSON.parse(JSON.stringify(registerTemplate)),
  login: JSON.parse(JSON.stringify(LoginTemplate)),
  user: {},
  notifications: [],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HANDLE_LOGIN_INPUT:
      return handleLogin(state, action.key, action.key1, action.value);
    case HANDLE_REGISTER_INPUTS:
      return handleRegister(state, action.key, action.key1, action.value);

    case SIGN_UP:
      return {
        ...state,
        register: JSON.parse(JSON.stringify(registerTemplate)),
      };

    case SIGN_IN:
      return {
        ...state,
        login: JSON.parse(JSON.stringify(LoginTemplate)),
      };
    case RESET_REGISTER:
      return {...state, register: JSON.parse(JSON.stringify(registerTemplate))};
    case SET_USER:
      return {...state, user: action.user};

    default:
      return state;
  }
};

export default userReducer;
