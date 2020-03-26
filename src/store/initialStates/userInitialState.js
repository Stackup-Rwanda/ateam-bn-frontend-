const userInitialState = {
  loading: false,
  loginErrors: null,
  token: localStorage.token,
  oauthErrors: null,
  profile: localStorage.profile,
  isAuth: localStorage.isAuth,
  forgotPassword: {
    loading: false,
    message: '',
    errors: {}
  },
  updatePassword: {
    loading: false,
    message: '',
    errors: {}
  }
};
export default userInitialState;