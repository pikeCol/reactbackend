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

const ListlMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'col-sm-3 prolist_nav' : 'col-sm-3 prolist_nav'}>
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
      <div className="col-sm-10 col-sm-offset-1" style={{
        background: 'white',
        marginTop: '60px',
        border: '1px solid #d3d3d3',
        padding: 0,
        paddingBottom:'150px'
      }}>
          <nav>
            <ListlMenuLink label="基本信息" activeOnlyWhenExact={true} to="/menu/prolist" />
            <ListlMenuLink label="报表信息"  to="/menu/prolist/report" />
            <ListlMenuLink label="重要事项通报"  to="/menu/prolist/matters" />
            <ListlMenuLink label="附加资料"  to="/menu/prolist/infos" />
          </nav>
          <div >
            <Route exact path="/menu/prolist" component={Basic}/>
            <Route path="/menu/prolist/infos" component={Infos}/>
            <Route path="/menu/prolist/matters" component={Matters}/>
            <Route path="/menu/prolist/report" component={Report}/>
          </div>
      </div>
    )
  }
}
export default Prolist;