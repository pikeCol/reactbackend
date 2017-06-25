import React from 'react';
import PropTypes from 'prop-types'

let banklogo = require('../../../images/zylogo.png')
let back = require('../../../images/backicon.png')

class Header extends React.Component{

  render(){
    return(
      <div className="header_wrap">
        <img src={banklogo} className="zylogos"/>
      <div className="left_detail" >
          <span className="usrs">欢迎，</span><span style={{fontSize:'16px'}}>丨</span><span className="goback"><img src={back} className="backs"/>退出</span>
        </div>
      </div>
    )
  }
}


export default Header;
