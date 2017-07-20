import React from 'react';
import Basic from './basic'
import Infos from './infos'
import Matters from './matters'
import Report from './report'
import BottomLine from '../common/bottomline'

import {
  Route,
  Link
} from 'react-router-dom'

import {Row} from 'antd'

const ListlMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'prolist_nav' : 'prolist_nav'}>
      <Link to={to}>
        {label}
        {match?<BottomLine />:''}
      </Link>
    </div>
  )}/>
  )

class addProlist extends React.Component{
  render(){
    return(
      <div>
          <Row type="flex" justify="space-around" align="middle" style={{borderBottom:'1px solid #d3d3d3'}}>
            <ListlMenuLink label="基本信息" to="/menu/addprolist/basic" />
            <ListlMenuLink label="报表信息"  to="/menu/addprolist/report" />
            <ListlMenuLink label="重要事项通报"  to="/menu/addprolist/matters" />
            <ListlMenuLink label="附加资料"  to="/menu/addprolist/infos" />
          </Row>
          <div style={{paddingTop:'20px'}}>
            <Route path="/menu/addprolist/basic" component={Basic}/>
            <Route path="/menu/addprolist/infos" component={Infos}/>
            <Route path="/menu/addprolist/matters" component={Matters}/>
            <Route path="/menu/addprolist/report" component={Report}/>
          </div>
      </div>
    )
  }
}
export default addProlist;
