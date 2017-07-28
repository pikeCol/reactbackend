import React from 'react';
import Basic from './basic'
import Infos from './infos'
import Matters from './matters'
import Report from './report'
import BottomLine from '../common/bottomline'

import globalPemission from '../common/permission'


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

class Prolist extends React.Component{
  render(){
    // basic: ":basic"
    console.log(this.props.match.param)
    return(
      <div>
          <Row type="flex" justify="space-around" align="middle" style={{borderBottom:'1px solid #d3d3d3'}}>
            {
              globalPemission.indexOf('projectDetail')>=0?
              <ListlMenuLink label="基本信息" to="/menu/prolist/basic" />
              :''
            }
            {
              globalPemission.indexOf('reportDetail')>=0?
              <ListlMenuLink label="报表信息"  to="/menu/prolist/report" />
              :''
            }
            {
              globalPemission.indexOf('importantItem')>=0?
              <ListlMenuLink label="重要事项通报"  to="/menu/prolist/matters" />
              :''
            }
            {
              globalPemission.indexOf('material')>=0?
              <ListlMenuLink label="附加资料"  to="/menu/prolist/infos" />
              :''
            }
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
