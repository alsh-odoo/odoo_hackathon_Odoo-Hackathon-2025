const API = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
  },
  quesions:{
    get:'question',
    post:'question/save',
  },
  answers:{
    postAnswer:'answers/save',
    upvotes:'answers'
  }
};

Object.freeze(API);
export default API;