import React from 'react';
import Checkboxes from '../common/checkbox';
import {  Row, Col, Input, Select,Button } from 'antd';
import 'rc-tree/assets/index.css';
import Tree, { TreeNode } from 'rc-tree';

const Option = Select.Option;
import $ from 'jquery'

class Rolemanage extends React.Component{
  state={
    params:{},
    plainOptions:['查看详情', '添加'],
    defaultCheckedList: ['查看详情'],
    moduleopt:['查看详情', '添加'],
    defaultModuleopt:['查看详情'],
    rolelist:['新建角色','编辑角色','停用角色','删除角色'],
    defaultRolelist:['编辑角色'],
    personal:['修改资料','修改密码'],
    defaultPersonal:['修改资料']
  }
  componentWillMount () {
    let location = this.props.location

    let that = this
    if (location.state.oid) {
      $.ajax({
        type:"POST",
        url: '/role/editRole.do',
        // url: '/getAccountDetail.json',
        data:{
          oid:location.state.oid,
          roleName:location.state.roleName,
          roleType:location.state.roleType,
          pemissionOids:location.state.pemissionOids
        },
        success:function(datas){
          if( datas.restCode === 200 ){
            that.setState({
              params:location.state
            })
          }
        }
      })
    }

  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onExpand(expandedKeys) {
    console.log('onExpand', expandedKeys, arguments);
  }
  onSelect(selectedKeys, info) {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  }
  onCheck(checkedKeys, info) {
    console.log('onCheck', checkedKeys, info);
  }
  onEdit() {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  }
  onDel(e) {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  }
  render(){
    const customLabel = (<span className="cus-label">
                            <span>operations: </span>
                            <span style={{ color: 'blue' }} onClick={this.onEdit}>Edit</span>&nbsp;
                            <label onClick={(e) => e.stopPropagation()}><input type="checkbox" /> checked</label> &nbsp;
                            <span style={{ color: 'red' }} onClick={this.onDel}>Delete</span>
                          </span>);
    return(
      // state={
      //   params:{},
      //   plainOptions:['查看详情', '添加'],
      //   defaultCheckedList: ['查看详情'],
      //   moduleopt:['查看详情', '添加'],
      //   defaultModuleopt:['查看详情'],
      //   rolelist:['新建角色','编辑角色','停用角色','删除角色'],
      //   defaultRolelist:['编辑角色'],
      //   personal:['修改资料','修改密码'],
      //   defaultPersonal:['修改资料']
      // }
      <Row type="flex" justify="space-around" align="center">
      <Tree
       className="myCls" showLine checkable defaultExpandAll
       defaultExpandedKeys={this.state.defaultExpandedKeys}
       onExpand={this.onExpand}
       defaultSelectedKeys={this.state.defaultSelectedKeys}
       defaultCheckedKeys={this.state.defaultCheckedKeys}
       onSelect={this.onSelect} onCheck={this.onCheck}
     >

       <TreeNode title="项目管理列表" key="0-0">
         {/* <TreeNode title={customLabel} key="0-0-0"> */}
         <TreeNode title="新建角色" key="0-0-0">
           <TreeNode title="leaf" key="0-0-0-0" />
           <TreeNode title="leaf" key="0-0-0-1" />
         </TreeNode>
         <TreeNode title="编辑角色" key="0-0-1">
           <TreeNode title="parent 1-1-0" key="0-0-1-0" />
           <TreeNode title="parent 1-1-1" key="0-0-1-1" />
         </TreeNode>
         <TreeNode title="停用角色" key="0-0-2">
           <TreeNode title="leaf" key="0-0-2-0" />
           <TreeNode title="leaf" key="0-0-2-1" />
         </TreeNode>
         <TreeNode title="删除角色" key="0-0-3">
           <TreeNode title="parent 1-1-0" key="0-0-3-0" />
           <TreeNode title="parent 1-1-1" key="0-0-3-1" />
         </TreeNode>
       </TreeNode>





     </Tree>

    </Row>
      // <div>
      //   <div className="border_line">
      //     <Row type="flex" align="middle" style={{height:'60px'}}>
      //       <Col offset={1}>角色性质</Col>
      //       <Col>
      //         <Select defaultValue="请选择" style={{ width: 120 }} onChange={this.handleChange}>
      //           <Option value="0">外部角色</Option>
      //           <Option value="1">内部角色</Option>
      //         </Select>
      //       </Col>
      //       <Col>角色名称</Col>
      //       <Col>
      //         <Input defaultValue={this.state.params.roleName}/>
      //       </Col>
      //     </Row>
      //   </div>
      //   <Row type="flex" justify="space-around" align="top" style={{paddingTop:'20px'}}>
      //     <Col>
      //       <Checkboxes titles="项目管理列表" plainOptions={this.state.plainOptions} defaultCheckedList={this.state.defaultCheckedList}/>
      //     </Col>
      //     <Col>
      //       <Checkboxes titles="项目模板列表" plainOptions={this.state.moduleopt} defaultCheckedList={this.state.defaultModuleopt}/>
      //     </Col>
      //     <Col>
      //       <Checkboxes titles="角色列表" plainOptions={this.state.rolelist} defaultCheckedList={this.state.defaultRolelist}/>
      //     </Col>
      //     <Col>
      //       <Checkboxes titles="个人中心" plainOptions={this.state.personal} defaultCheckedList={this.state.defaultPersonal}/>
      //     </Col>
      //   </Row>
      //   <Row style={{paddingTop:'40px'}}>
      //     <Col offset={18}>
      //       <Button type="primary">保存</Button>
      //     </Col>
      //   </Row>
      // </div>
    )
  }
}
export default Rolemanage;
