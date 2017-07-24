import React from 'react';
import First from '../first'
import Prolist from '../prolist'
import Todetail from '../prolist/todetail'
import addProlist from '../second/'
import Editpass from '../editpass'
import Rolemanage from '../rolemanage'
import Newrole from '../rolemanage/newrole'
import Roleedit from '../rolemanage/edit'
import Editprofile from '../editprofile'
import Listtmp from '../listtmp'
import Listedit from '../listtmp/edit'
import Listadd from '../listtmp/add'


import Accoutmanage from '../accoutmanage'
import Add from '../accoutmanage/add'
import Edit from '../accoutmanage/edit'

import Headers from '../common/header'

import {urlParse} from '../common/util'

import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
import reqwest from 'reqwest';

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'


const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact, datas }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
      <Link to={{pathname:to,state:{data:datas}}}>
        <span>{label}</span>
      </Link>
  )}/>
  )

class Menus extends React.Component{
  constructor(props){
    super(props)
    this.state={
      menudata:[],
      show:true,
      usr:''
    }
  }
  componentWillMount () {
    let {menudata} = this.state
    // sys/getMenu.do  请求权限
    reqwest({
      // url:'/sys/getMenu.do',
      url:'../../api/data0.json'
      // method:'POST',
    }).then((res) => {
      console.log(res)
      if ( res.restCode === 200 ) {
        let menudata = res.data
        this.setState({
          menudata:menudata
        })
      }
    })
  }
  render(){
    let isnone=this.props.location.pathname=='/menu' ? 'none':'block'
    const obj={
      "/menu/prolist/:basic":`Prolist`,
      "/menu/prolist":`Todetail`,
      "/menu/addprolist/:basic":`addProlist`,
      "/menu/editpass":`Editpass`,
      "/menu/accoutmanage/add":`Add`,
      "/menu/editprofile":`Editprofile`,
      "/menu/rolemanage/newrole":`Newrole`,
      "/menu/rolemanage/edit":`Roleedit`,
      "/menu/rolemanage":`Rolemanage`
    }
    // let _obj={}
    let routers = []

    const { menudata } = this.state;

    // 循环菜单栏
    const menunode = menuchildren  => menuchildren.map((item) => {
      // 获取路由
      if (obj[item.content]) {
        // _obj[item.content] = obj[item.content]
        routers.push(<Route path={`${obj[item.content]}`} component={`${obj[item.content]}`}/>)
      }
      return(
        <Menu.Item key={item.oid}>
          <OldSchoolMenuLink  to={item.content} datas={item.children} label={item.permissionName}/>
        </Menu.Item>
      )
    })
    const menulist = menudata => menudata.map((item) => {
      return(
        <SubMenu key={item.oid} title={<span><Icon type={item.iconSkin} />{item.permissionName}</span>}>
          {menunode(item.children)}
        </SubMenu>
      )
    })

    // for (let variable in _obj) {
    //   alert(22)
    //   if (_obj.hasOwnProperty(variable)) {
    //     routers.push(<Route path={variable} component={_obj[variable]}/>)
    //   }
    // }
    // console.log(routers)
    return(
      <Layout>
        <Headers />
         <Layout>
           {
             this.state.menudata.length>0?
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="menu-unfold" />首页</span>}>
                <Menu.Item key="1">
                    <OldSchoolMenuLink activeOnlyWhenExact={true}  to="/menu" label="首页" datas={{'mm':'dd'}} />
                </Menu.Item>
              </SubMenu>
              {menulist(this.state.menudata)}
              {/* <SubMenu key="sub2" title={<span><Icon type="laptop" />投资项目管理</span>}>
                <Menu.Item key="5">
                  <OldSchoolMenuLink  to="/menu/prolist" label="项目列表"/>
                </Menu.Item>
                <Menu.Item key="6">
                  <OldSchoolMenuLink  to="/menu/listtmp" label="项目模板管理"/>
                </Menu.Item>
              </SubMenu> */}
              {/* <SubMenu key="sub3" title={<span><Icon type="notification" />账户管理</span>}>
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
              </SubMenu> */}
            </Menu>
          </Sider>
          :'loading'
          }
          <Layout style={{ padding: '24px' }}>
            <div className="maincontainer">
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <div className="main_wrap">

                <Switch>
                  <Route exact path="/menu" component={First}/>
                {routers}
                  {/* <Route path="/menu/prolist/:basic" component={Prolist}/>
                  <Route path="/menu/prolist" component={Todetail}/>
                  <Route path="/menu/addprolist/:basic" component={addProlist}/>

                  <Route path="/menu/editpass" component={Editpass}/>

                  <Route path="/menu/accoutmanage/add" component={Add}/>
                  <Route path="/menu/accoutmanage/edit" component={Edit}/>
                  <Route path="/menu/accoutmanage" component={Accoutmanage}/>

                  <Route path="/menu/rolemanage/newrole" component={Newrole}/>
                  <Route path="/menu/rolemanage/edit" component={Roleedit}/>
                  <Route path="/menu/rolemanage" component={Rolemanage}/>

                  <Route path="/menu/editprofile" component={Editprofile}/>

                  <Route path="/menu/listtmp/add" component={Listadd}/>
                  <Route path="/menu/listtmp/edit" component={Listedit}/>
                  <Route path="/menu/listtmp" component={Listtmp}/> */}
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
