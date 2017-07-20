
import React from 'react';
import { Form } from 'antd';

import NormalLoginForm from './login.js'
const Login_bg = Form.create()(NormalLoginForm);

class Login extends React.Component{
  render(){
    return(
      <div className="login_wrap">
        {/* <Row type="flex" align="center">
          <Col span={8}> */}
            <Login_bg />
          {/* </Col>
        </Row> */}
      </div>
    )
  }
}

export default Login;
