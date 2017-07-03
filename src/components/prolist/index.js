import React from 'react';
import Basic from './basic'
import Infos from './infos'
import Matters from './matters'
import Report from './report'
import BottomLine from '../common/bottomline'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import {Row, Col} from 'antd'

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

class Prolist extends React.Component{
  render(){
    return(
      <div>
          <Row type="flex" justify="space-around" align="middle" style={{borderBottom:'1px solid #d3d3d3'}}>
            <ListlMenuLink label="基本信息" to="/menu/prolist/basic" />
            <ListlMenuLink label="报表信息"  to="/menu/prolist/report" />
            <ListlMenuLink label="重要事项通报"  to="/menu/prolist/matters" />
            <ListlMenuLink label="附加资料"  to="/menu/prolist/infos" />
          </Row>
          <div style={{paddingTop:'20px'}}>
            <Route path="/menu/prolist/basic" component={Basic}/>
            <Route path="/menu/prolist/infos" component={Infos}/>
            <Route path="/menu/prolist/matters" component={Matters}/>
            <Route path="/menu/prolist/report" component={Report}/>
          </div>
      </div>
    )
  }
}
export default Prolist;
