import React from 'react';
import {Icon} from 'antd'
// import PropTypes from 'prop-types'

// import { connect } from 'react-redux'

import { Alert } from 'antd';

let banklogo = require('../../../images/zylogo.png')
let back = require('../../../images/backicon.png')

export default class Headers extends React.Component{

  render(){
    return(
      <div className="header_wrap">
        <img src={banklogo} className="zylogos"/>
        <Alert
          message="success tips"
          description="Detailed description and advices about successful copywriting."
          type="success"
          showIcon
          closable
        />
        <div className="left_detail" >
          <span className="usrs">欢迎，{this.props.names}</span>
          <span style={{fontSize:'16px'}}>丨</span>
          <span className="goback">
            <span style={{padding:'0 10px'}}><Icon type="poweroff" style={{fontSize:18}} /></span>退出
          </span>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     type:'login',
//     text:'usrs'
//   }
// }
// export default connect(
// mapStateToProps
// )(Header);
