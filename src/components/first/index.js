import React from 'react';
import {Link} from 'react-router-dom'

class First extends React.Component{
  render(){
    return(
      <div>
        <h1 style={{
          paddingTop:'200px',
          color:'#151515',
          fontSize:'36px',
          textAlign:'center',
          marginBottom:'40px'
        }}>浙银资产投资项目管理系统 </h1>
        <h4 style={{
          color:'#ff3747',
          fontSize:'18px',
          textAlign:'center'
        }}>
          初次登录如未修改密码，请立即<Link to={'/login'}><strong style={{
          color:'#ff3747'
          }}>修改密码</strong></Link>
        </h4>
      </div>
    )
  }
}
export default First;
