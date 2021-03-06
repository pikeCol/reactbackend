import React from 'react';
import {Link} from 'react-router-dom'

class First extends React.Component{
  render(){
    // console.log(this.props.location)
    return(
      <div>
        <h1 style={{
          paddingTop:'200px',
          color:'#000',
          fontSize:'36px',
          textAlign:'center',
          marginBottom:'40px'
        }}>浙银资产投资项目管理系统 </h1>
        <h4 style={{
          color:'#0099ff',
          fontSize:'18px',
          textAlign:'center'
        }}>
          初次登录如未修改密码，请立即<Link to={'/menu/editpass'}><strong style={{
          color:'#ff3747',
          fontStyle: 'italic'
          }}>修改密码</strong></Link>
        </h4>
      </div>
    )
  }
}
export default First;
