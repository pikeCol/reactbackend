import React from 'react';
// import PropTypes from 'prop-types'

// import { connect } from 'react-redux'

let banklogo = require('../../../images/zylogo.png')
let back = require('../../../images/backicon.png')

export default class Header extends React.Component{

  render(){
    //  const { store } = this.context;
    //  console.log(store)
    return(
      <div className="header_wrap">
        <img src={banklogo} className="zylogos"/>
        <div className="left_detail" >
          <span className="usrs">欢迎，{this.props.names}</span><span style={{fontSize:'16px'}}>丨</span><span className="goback"><img src={back} className="backs"/>退出</span>
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
