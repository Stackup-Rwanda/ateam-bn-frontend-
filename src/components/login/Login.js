import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SocialAuthButton from '../socialAuthButtons/socialAuthButton';
import { oauthActions } from '../../actions';
import AuthError from '../errors';
import { login } from '../../actions/user/login';
import '../../assets/css/style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    const { oauthActions } = this.props;
    const { token, error } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    });
    if (token || error) {
      oauthActions({ token, error });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { loginRequest } = this.props;
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    loginRequest(userData);
  };
  emailChange = event => {
    this.setState({ email: event.target.value });
  };

  passwordChange = event => {
    this.setState({ password: event.target.value });
  };
  render() {
    const { oauthErrors, loginErrors, history } = this.props;
    const token = localStorage.getItem("token");
    let componentToRender;
    if (!token) {
      componentToRender = (
        <div className="login">
          <form className="login-form m-20" onSubmit={this.handleSubmit}>
            <div className="flex column p-20 b-radius m-bottom">
              {loginErrors && <AuthError error={loginErrors} />}
              {oauthErrors && <AuthError error={oauthErrors} />}
              <h1 className="md-title c-green m-bottom">Sign in to Barefoot</h1>
              <SocialAuthButton
                type="facebook"
                linkClass="full-btn sm-radius bg-blue social-btn"
                text="Sign in with Facebook"
              />
              <SocialAuthButton
                type="google"
                linkClass="full-btn sm-radius bg-half-white social-btn"
                text="Sign in with Google"
              />
              <div className="form-filed m-bottom">
                <input
                  name="email"
                  type="email"
                  className="lg-input border-0 bg-half-white"
                  placeholder="Email..."
                  onChange={this.emailChange}
                />
              </div>
              ​
              <div className="form-filed m-bottom">
                <input
                  name="password"
                  type="password"
                  className="lg-input border-0 bg-half-white"
                  placeholder="Password..."
                  onChange={this.passwordChange}
                />
              </div>
              <button
                name="button"
                type="submit"
                className="btn md-btn b-radius-circle bg-green text-center sm-title"
              >
                Sign In
              </button>
              <div className="text-center">
                <a href="#" className="link c-green">
                  Forgot password?
                </a>
              </div>
                <button className="btn md-btn b-radius-circle bg-green text-center sm-title m-top-bottom-40">Sign In</button>
              <div className="text-center"><Link to="/forgot-password" className="link c-green">Forgot password?</Link></div>
            </div>
          </form>
          <div className="land-auth">
            <div className="welcome-auth m-20 p-20 text-center">
              <h1 className="lg-title m-bottom">
                Hello
                <br />
                Barefooter!
              </h1>
              <p className="xs-title m-top">Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.</p>
              <Link to="#" className="btn auth-btn md-btn b-radius-circle c-blue m-top text-center sm-title">Sign Up</Link>
            </div>
          </div>
        </div>
      );
    } else {
      componentToRender = history.push("/profile");
    }
    return <div>{componentToRender}</div>;
  }
}

Login.defaultProps = { oauthErrors: null };

Login.propTypes = {
  oauthActions: PropTypes.func.isRequired,
  oauthErrors: PropTypes.string,
  loginRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

const mapStateToProps = ({ user }) => ({
  token: user.token,
  oauthErrors: user.oauthErrors,
  loading: user.loading,
  loginErrors: user.loginErrors
});

const mapDispatchToProps = (dispatch) => ({
  oauthActions: (payload) => dispatch(oauthActions(payload)),
  loginRequest: (payload) => dispatch(login(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
