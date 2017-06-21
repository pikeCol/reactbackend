import React from 'react';
let titleImage = require('../../../images/logo.png');


class Titles extends React.Component{
  render(){
    return(
      <h1 className="h1">
        <span  className="titleimg"><img src={titleImage} /></span>
        浙银资产投资项目管理系统
      </h1>
    )
  }
}
export default Titles;
