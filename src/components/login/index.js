
import React from 'react';
import Register from '../register';
import Titles from '../common/title';

let codeImage = require('../../images/code_edit.png');


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Login extends React.Component {
  state = {
     redirectToReferrer: false
   }
   login=()=>{
     this.setState({ redirectToReferrer: true })
   }
  render() {

    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={'/menu'}/>
      )
    }



    return(
        <div className="login">
          <Titles />
          <form className="form-horizontal col-xs-12">
              <div className="form-group centers">
                  <div className="col-sm-9 ">
                      <input type="text" className="form-control" id="inputEmail3" placeholder="请输入用户名" />
                  </div>
              </div>
              <div className="form-group centers">
                  <div className="col-sm-9 ">
                      <input type="password" className="form-control" id="inputPassword3" placeholder="请输入密码" />
                  </div>
              </div>
              <div className="form-group centers">
                  <div className="col-sm-6 pull-left incode">
                    <input type="number" className="form-control"  placeholder="请输入验证码" />
                  </div>
                  <div className="pull-right code">
                    <img src={codeImage} />
                  </div>
              </div>
              <div className="form-group" style={{
                display:'flex',
                justifyContent: 'center'
              }}>
                  <button className="btn btn-warning logbtn">登  录</button>
              </div>
          </form>
      </div>
  )
  }
}

export default Login;
