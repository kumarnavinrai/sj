export const InputValidation = (key: string, value: string) => {
  let error = '';
  switch (key) {
    case 'first_name':
      if (value.length < 2) error = `First Name is required`;
      break;
    case 'last_name':
      if (value.length < 2) error = `Last Name is required`;
      break;
    case 'email':
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        error = `Invalid Email`;
      }
      break;
    case 'user_name':
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
        error = `Don't use special characters in username`;
      }
      break;
    case 'contact':
      if (value.length === 0) break;
      if (!/^\d{10}$/.test(value)) error = `Invalid contact number`;
      break;
    case 'password':
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value,
        )
      )
        error = `Must be 8 character, at least one letter, one number and one special character`;
      break;
    case 'old_password':
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value,
        )
      )
        error = `Must be 8 character, at least one letter, one number and one special character`;
      break;
    case 'confirm_password':
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value,
        )
      )
        error = `Must be 8 character, at least one letter, one number and one special character`;
      break;
    case 'input_otp':
      if (value.length < 6) error = `Invalid Code`;
    default:
      break;
  }
  return error;
};

export const handleRegister = (
  state: any,
  key: string, // coming from registration template
  key1: string,
  value: any,
) => {
  let x = {...state.register};
  x[key][key1] = value;
  //check input validation
  if (key1 !== 'error_message') {
    x[key]['error_message'] = InputValidation(key, x[key]['text']);
  }
  //disbale error on select
  if (key === 'confirm_password' && key1 === 'text') {
    if (x[key].text !== x.password.text)
      x[key]['error_message'] = 'Password does not match';
  }
  return {...state, register: x};
};

export const handleLogin = (
  state: any,
  key: 'email' | 'password',
  key1: 'text' | 'active' | 'error_message' | 'show',
  value: any,
) => {
  let x = {...state.login};
  x[key][key1] = value;
  if (key1 === 'active' && x[key][key1] === false) {
    x[key]['error_message'] = InputValidation(key, x[key]['text']);
  }
  if (key1 === 'active' && x[key][key1] === true) {
    x[key]['error_message'] = '';
  }
  return {...state, login: x};
};
