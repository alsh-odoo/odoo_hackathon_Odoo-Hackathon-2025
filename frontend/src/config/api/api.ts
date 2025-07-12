const API = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
  },
  quesions:{
    get:'questions',
    post:'question/save',
  }
};

Object.freeze(API);
export default API;