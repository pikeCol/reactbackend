import React from 'react';
import First from '../first'
import Prolist from '../prolist'
import Todetail from '../prolist/todetail'
import Second from '../second'
import Editpass from '../editpass'
import Rolemanage from '../rolemanage'
import Newrole from '../rolemanage/newrole'
import Editprofile from '../editprofile'
import Listtmp from '../listtmp'


import Accoutmanage from '../accoutmanage'
import Add from '../accoutmanage/add'
import Headers from '../common/header'
import Line from '../common/line'

import {urlParse} from '../common/util'

import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;


import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

let indexicon = require('../../images/indexicon.png')
let touziicon = require('../../images/touziicon.png')
let accounticon = require('../../images/accounticon.png')
let personicon = require('../../images/personicon.png')

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
      <Link to={to}>
        {label}
      </Link>
  )}/>
  )

  const StaticMenuLink = ({ label,imgsrc }) => (
      <div className="static">
        <img src={imgsrc} />
        {label}
      </div>
    )

class Menus extends React.Component{
  state={
    show:true
  }
  constructor(props){
    super(props)
    this.state={
      show:true,
      usr:''
    }
  }
  componentWillMount() {
    let urls=this.props.location.search;
    let usrs=urlParse(urls)
    this.setState({
      usr:usrs.usr
    })
  }
  render(){
    let isnone=this.props.location.pathname=='/menu' ? 'none':'block'
    return(
      <Layout>
        <Headers names={this.state.usr} />
         <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="menu-unfold" />首页</span>}>
                <Menu.Item key="1">
                    <OldSchoolMenuLink activeOnlyWhenExact={true}  to="/menu" label="首页"/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />投资项目管理</span>}>
                <Menu.Item key="5">
                  <OldSchoolMenuLink  to="/menu/prolist" label="项目列表"/>
                </Menu.Item>
                <Menu.Item key="6">
                  <OldSchoolMenuLink  to="/menu/listtmp" label="项目模板管理"/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />账户管理</span>}>
                <Menu.Item key="9">
                  <OldSchoolMenuLink  to="/menu/rolemanage" label="角色管理"/>
                </Menu.Item>
                <Menu.Item key="10">
                  <OldSchoolMenuLink  to="/menu/accoutmanage" label="账户设置"/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="user" />个人中心</span>}>
                <Menu.Item key="11">
                  <OldSchoolMenuLink  to="/menu/editprofile" label="修改资料"/>
                </Menu.Item>
                <Menu.Item key="12">
                  <OldSchoolMenuLink  to="/menu/editpass" label="修改密码"/>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <div className="maincontainer">
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <div className="main_wrap">
                <Switch>
                  <Route exact path="/menu" component={First}/>
                  <Route path="/menu/prolist/:basic" component={Prolist}/>
                  <Route path="/menu/prolist" component={Todetail}/>
                  <Route path="/menu/second" component={Second}/>
                  <Route path="/menu/editpass" component={Editpass}/>
                  <Route path="/menu/accoutmanage/add" component={Add}/>
                  <Route path="/menu/accoutmanage" component={Accoutmanage}/>
                  <Route path="/menu/rolemanage/newrole" component={Newrole}/>
                  <Route path="/menu/rolemanage" component={Rolemanage}/>
                  <Route path="/menu/editprofile" component={Editprofile}/>
                  <Route path="/menu/listtmp" component={Listtmp}/>
                </Switch>
              </div>
            </Content>
          </div>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default Menus;
