import React from "react";
// import "./login.scss";
import {
  NormalInput,
  NormalButton,
  NormalCheckbox
} from "../../../components/common";
// import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
// import { userSignin } from "../../../redux/actions/login";
import { history } from "../../../helpers";
import { EXIST_LOCAL_STORAGE } from "../../../service/constants";
import { userSignin } from '../../../api'
export class Login extends React.Component {
  state = {
    loginForm: {
      username: "",
      password: "",
    },
    passwordType: 'password',
    isFormLoder: false,
    isKeepMe: false,
    keepMeObj: {
      username: "",
      password: "",
    },
    isResErr:''
  };



  //on lode function start
  componentWillMount() {
    //keep login function start
    let isKeepMe = localStorage.getItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME);
    let keepMeObj = JSON.parse(localStorage.getItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ));
    localStorage.clear();
    if (isKeepMe === '1') {
      keepMeObj = Object.assign({}, keepMeObj);
      this.setState({ isKeepMe, loginForm: keepMeObj });
      localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, isKeepMe);
      localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
    } else {
      this.setState({ isKeepMe: false });
    }



    //validation set function start
    this.validator = new SimpleReactValidator({
      element: message => <span className="error-message text-danger validNo fs14">{message}</span>,
      autoForceUpdate: this,
    });
  }


  //handle input change function call start
  handleInputChange = e => {
    let { value, name } = e.target;
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }
    })
  };


  //login submit API call function  start
  handleSubmit = () => {
    // history.push(`/dashboard`)
    let { loginForm, isKeepMe, keepMeObj } = this.state;
    this.setState({ isResErr: false })
    if (this.validator.allValid()) {
      this.validator.hideMessages();
      this.setState({ isFormLoder: true });
      userSignin(loginForm).then((data) => {
        this.setState({ isFormLoder: false });
        if (!!data) {
          if (isKeepMe) {
            keepMeObj.username = loginForm.username;
            keepMeObj.password = loginForm.password;
            this.setState({ keepMeObj });
            localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, 1);
            localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
          } else {
            localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, 0);
            localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
          }
          history.push(`/supplier`);
        }
      }).catch((error) => {
        if(error==='auth/wrong-password'){
          this.setState({ isFormLoder: false });

        }else{

        }
        console.error(error);
        this.setState({ isFormLoder: false ,isResErr:error});
      });

    } else {
      this.validator.showMessages();
    }

  }

  // handlekeep me change start
  handleisKeepMeChange = () => {
    let { isKeepMe } = this.state;
    this.setState({ isKeepMe: !isKeepMe });
  }

  render() {
    let { loginForm, isFormLoder, isResErr, isKeepMe, passwordType } = this.state;
    return (

      <>
        <div className="row login-page">
          <div className="col-md-9 col-lg-8 mx-auto">

            <div className="row mb-3">
              <div className="col-md-12">
                <img width="72" height="57" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="text-sub-title">Sign into your <strong>Avatar Management Console</strong> </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group mb-0">
                  <label>Login</label>
                  <NormalInput
                    placeholder="Email address or phone number"
                    name="username"
                    value={loginForm.username}
                    className="form-control border-left-0"
                    onChange={this.handleInputChange}
                  />

                </div>
                {this.validator.message('User Name', loginForm.username, 'required')}
                {['auth/user-not-found', 'auth/invalid-email'].includes(isResErr) ?
                  <span className="text-danger validNo fs14">
                  Sorry, your email is incorrect. Please try again
                  </span> : ''}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group mb-0">
                  <label>Password</label>
                  <NormalInput
                    placeholder="Password"
                    name="password"
                    type={passwordType}
                    value={loginForm.password}
                    className="form-control border-left-0  border-right-0"
                    onChange={this.handleInputChange}
                  />

                </div>
                {this.validator.message('Password', loginForm.password, 'required')}
                {isResErr=='auth/wrong-password' ?
                  <span className="text-danger validNo fs14">
                  Sorry, your password is incorrect. Please try again
                  </span> : ''}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <NormalCheckbox
                  name="isKeepMe"
                  checked={isKeepMe}
                  className="mb-3 mt-3"
                  label="Keep me signed in"
                  id="isKeepMe"
                  onChange={this.handleisKeepMeChange}
                />
              </div>
              <div className="col-md-6 text-end">
                <NormalButton
                  onClick={this.handleSubmit}
                  id="cancelProfile"
                  label="sign in"
                  outline={false}
                  loader={isFormLoder}
                  className="mb-3 mt-3  btn-primary"
                />
              </div>
            </div>


            {/* <div className="text-center">
              <a className="small" href="#">Forgot password?</a></div> */}
          </div>
        </div>



      </>
    );
  }
}
