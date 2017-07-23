import React from 'react';
import {  Row, Col, Input, Select,Button,Tree } from 'antd';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
import $ from 'jquery'
import reqwest from 'reqwest'
import Myalert from '../common/alert'

import { Redirect } from 'react-router-dom'

class Newrole extends React.Component{
  state = {
    data:[],
    roleName:'',
    roleType:'',
    mypost: [],
    defaultCheckedKeys:[],
    redirect: false
  }
  save =() => {
    let { mypost, roleName, roleType } = this.state

    reqwest({
      url:'/role/findRoleRepeat.do',
      method:'POST',
      data: {
        roleName:roleName
      }
    }).then((result) => {
      console.log(result);
      if (result.restCode === 200) {
        reqwest({
          url:'/role/addRole.do',
          method:'POST',
          data: {
            roleName:roleName,
            roleType:roleType,
            pemissionOids:mypost.join()
          }
        }).then((result) => {
          console.log(result);
          if (result.restCode === 200) {
            Myalert.success('success', '创建成功')
            this.setState({
              redirect: true
            })
          }
        })
      } else {
          Myalert.error('Error', result.msg)
      }
    })


  }
  componentDidMount () {
    let { data } = this.state
    let that = this
    reqwest({
      // url:'../../api/rolepermission.json',
      url:'/permission/getPermissionList.do',
      method:'POST'
    }).then((result) => {
      console.log(result)
      if (result.restCode == 200) {
        data = result.data
        this.setState({
          data:data
        })
      }
    }).catch((err) =>{
      console.log(err)
    })

  }
  onCheck = (checkedKeys,val) => {
    console.log(checkedKeys,val)
    let {mypost} = this.state
    let checkedNodes = val.checkedNodes
    for (let keys of checkedNodes) {
      if (keys.props.isLeaf) {
        mypost.push(keys.key)
      }
    }
    this.setState({
      mypost
    })
   }
   handleChange = (val) => {
     this.setState({
       roleType:val
     })
   }
   handleinput  = (e) => {
     this.setState({
       roleName:e.target.value
     })
   }
  render(){

    if ( this.state.redirect ) {
      return(
        <Redirect path={'/menu/rolemanage'} />
      )
    }

    const tree = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.oid} title={item.permissionName}>
            {tree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.oid} isLeaf={true} title={item.permissionName} />;
    });

    const { roleName, roleType } = this.state
      return(
        <div>
          <div className="border_line">
           <Row type="flex" align="middle" style={{height:'60px'}}>
             <Col offset={1}>角色性质</Col>
             <Col>
               <Select defaultValue="请选择" style={{ width: 120 }} onChange={this.handleChange}>
                 <Option value="0">外部角色</Option>
                 <Option value="1">内部角色</Option>
               </Select>
             </Col>
             <Col>角色名称</Col>
             <Col>
               <Input defaultValue={roleName} onChange={this.handleinput}/>
             </Col>
           </Row>
          </div>
          <Row type="flex" justify="center" align="center">
            <Tree
              checkable
              autoExpandParent={true}
              onCheck={this.onCheck}
              defaultExpandAll={true}
              // onSelect={this.onSelect}
              // filterTreeNode={this.filterTreeNode}
              >
              {tree(this.state.data)}
            </Tree>
          </Row>
          <Row type="flex" align="middle" align="center" style={{marginTop:40}}>
            <Col>
              <Button type="primary" onClick={this.save}>保存</Button>
            </Col>
          </Row>
        </div>

      )
    }
}
export default Newrole;
