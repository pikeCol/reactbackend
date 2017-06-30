
// import React from 'react';
// import Titles from '../common/title';
//
// let codeImage = require('../../images/code_edit.png');
//
//
// import {
//   // Route,
//   // Link,
//   Redirect
// } from 'react-router-dom'
//
//
// class Login extends React.Component {
//   state = {
//      redirectToReferrer: false,
//      islogin: false,
//      usr:''
//    }
//    login=()=>{
//     //  请求
//     let that =this;
//     fetch('../../api/data.json')
//      .then((res)=>res.json())
//       .then(function(json){
//         // console.log(json.usr);
//         that.setState({
//           redirectToReferrer: true,
//           usr:json.usr
//         })
//       })
//    }
//   render() {
//
//     const { redirectToReferrer,usr } = this.state
//     // console.log(usr)
//     if (redirectToReferrer) {
//       return (
//         <Redirect to={`/menu?usr=${usr}`}  />
//       )
//     }
//
//
//
//     return(
//       <div className="login_wrap">
//         <div className="login">
//           <Titles />
//           <form className="form-horizontal col-xs-12">
//               <div className="form-group centers">
//                   <div className="col-sm-9 ">
//                       <input type="text" className="form-control" id="inputEmail3" placeholder="请输入用户名" />
//                   </div>
//               </div>
//               <div className="form-group centers">
//                   <div className="col-sm-9 ">
//                       <input type="password" className="form-control" id="inputPassword3" placeholder="请输入密码" />
//                   </div>
//               </div>
//               <div className="form-group centers">
//                   <div className="col-sm-6 pull-left incode">
//                     <input type="text" className="form-control"  placeholder="请输入验证码" />
//                   </div>
//                   <div className="pull-right code">
//                     <img src={codeImage} />
//                   </div>
//               </div>
//               <div className="form-group" style={{
//                 display:'flex',
//                 position: 'relative',
//                 justifyContent: 'center'
//               }}>
//                   {
//                     this.state.islogin?
//                     <div className="alert alert-danger" role="alert" style={{
//                       position:'absolute',
//                       top:'-10px',
//                       padding: '3px',
//                       width:'333px'
//                     }}>
//                         您输入的账号或密码有误
//                     </div>
//                     :''
//                   }
//                   <div className="btn btn-warning logbtn" onClick={this.login}>登  录</div>
//               </div>
//           </form>
//         </div>
//       </div>
//   )
//   }
// }
//
// export default Login;
import React from 'react';
import { Row, Col } from 'antd';
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
