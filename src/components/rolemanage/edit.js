import React from 'react';
import {  Row, Col, Input, Select,Button,Tree, Alert } from 'antd';

const Option = Select.Option;

const TreeNode = Tree.TreeNode;

import reqwest from 'reqwest'
import Myalert from '../common/alert'
import { Redirect } from 'react-router-dom'


class Roleedit extends React.Component{
  state = {
    data:[],
    roleName:'',
    roleType:'',
    mypost: [],
    defaultCheckedKeys:[],
    redirect:false
  }
  save =() => {
    let { mypost, roleName, roleType } = this.state
    let oid = this.props.location.state.param.oid
    reqwest({
      url:'/role/editRole.do',
      method:'POST',
      data: {
        oid:oid,
        roleName:roleName,
        roleType:roleType,
        pemissionOids:mypost.join()
      }
    }).then((result) => {
      console.log(result);
      if (result.restCode === 200) {
        Myalert.success('success', '编辑成功')
        this.setState({
          redirect:true
        })
      }
    })
  }
  componentDidMount () {
    let { data, defaultCheckedKeys, roleName, roleType} = this.state
    let that = this
    let dck = []
    let oid = this.props.location.state.param.oid
    let _roleName = this.props.location.state.param.roleName
    let _roleType = this.props.location.state.param.roleType
    console.log(this.props.location.state)
    reqwest({
      // url:'../../api/rolepermission.json',
      url:'/permission/getInitPermissionList.do',
      method:'POST',
      data:{
        roleOid:oid,
      }
    }).then((result) => {
      console.log(result)
      if (result.restCode == 200) {
        // 获取默认节点
        function getchild (val) {
          console.log(val)
          if (val.children) {
            for (var i = 0; i < val.children.length; i++) {
              getchild(val.children[i])
            }
          } else {
            if ( val.checked === "true" ) {
              dck.push(val.oid)
            }
          }
        }
        data = result.data
        for (var i = 0; i < data.length; i++) {
          getchild(data[i])
        }

        this.setState({
          defaultCheckedKeys:[...dck],
          roleName:_roleName,
          roleType:_roleType,
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
        <Redirect to={'/menu/rolemanage'} />
      )
    }

    console.log(this.state.defaultCheckedKeys)
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
               {
                 roleType?
                 <Select defaultValue={roleType} style={{ width: 120 }} onChange={this.handleChange}>
                   <Option value="0">外部角色</Option>
                   <Option value="1">内部角色</Option>
                 </Select>
                 :''
               }

             </Col>
             <Col>角色名称</Col>
             <Col>
               {
                 roleName?
                 <Input defaultValue={roleName} onChange={this.handleinput}/>
                 :''
               }
             </Col>
           </Row>
          </div>
          <Row type="flex" justify="center" align="center">
            {
              this.state.defaultCheckedKeys.length?
              <Tree
                checkable
                autoExpandParent={true}
                onCheck={this.onCheck}
                defaultExpandAll={true}
                defaultCheckedKeys={this.state.defaultCheckedKeys}
                >
                {tree(this.state.data)}
              </Tree>
              :
              'loading tree'
            }

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
export default Roleedit;
