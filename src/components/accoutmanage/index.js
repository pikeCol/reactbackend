import React from 'react';
import { Row, Col, Table, Button, Popconfirm} from 'antd';
import { Redirect } from 'react-router-dom'

import EditableCell from '../common/editablecell'

import { connect } from 'react-redux';


class Accoutmanage extends React.Component{
  state={
    data:[{
      key:1,
      name:'2312',
      propety:'2312',
      longin_account:'asdfasd',
      pro:'施蒂利克九分裤',
      status:'启用',
      createtiem:'2312'
    },{
      key:2,
      name:'2312',
      propety:'2312',
      longin_account:'asdfasd',
      pro:'施蒂利克九分裤',
      status:'启用',
      createtiem:'2312'
    }],
    columns:[{
        title:'姓名',
        dataIndex: 'name',
      },{
        title:'角色',
        dataIndex: 'propety'
      },{
        title:'登录账户',
        dataIndex: 'longin_account'
      },{
        title:'关联项目',
        dataIndex: 'pro'
      },{
        title:'创建时间',
        dataIndex: 'createtiem'
      },{
        title:'状态',
        dataIndex: 'status'
      },{
        title:'操作',
        dataIndex: 'operate',
        render: (text, record, index) =>{
          return (
            <Row   type="flex" align="middle">
              <Col span={6}><Button type="primary">编辑</Button></Col>
              <Col span={6}><Button type="primary">停用</Button></Col>
              <Col span={6}>
                {/* <Button type="primary">删除</Button> */}
                { this.state.columns.length > 0 ?
                 (
                   <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                     <Button type="primary">删除</Button>
                     {/* <a href="#">Delete</a> */}
                   </Popconfirm>
                 ) : null}
              </Col>
            </Row>
            )
          }
        }
    ],
    count: 2,
    // editable:false,
    isnew:false
  }

  onDelete = (index) => {
    const data = [...this.state.data];
    data.splice(index, 1);
    this.setState({ data });
  }

  onCellChange = (index, key) => {
     return (value) => {
       const data = [...this.state.data];
       data[index][key] = value;
       this.setState({ data });
     };
  }
  newroles = (e) =>{
    this.setState({
      isnew: true
    })
  }
  render(){
    if(this.state.isnew) {
      return(
        <Redirect to={'/menu/accoutmanage/add'} />
      )
    }
    const { edit }=this.props

    return(
      <div>
        <div className="border_line">
          <Row type="flex" align="middle" style={{height:'60px'}}>
            <Col span={3} offset={18}><Button type="primary" onClick={this.newroles}>添加账户</Button></Col>
          </Row>
        </div>
        <div style={{padding:'10px 20px'}}>
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            bordered
          />
        </div>
        <Button type="primary" onClick={edit}>加</Button>
        <EditableCell />
      </div>
    )
  }
}
function mapStateToProps(state)  {
  return{
    value:state.editable
  }
}


function mapDispatchToProps(dispatch) {
  return {
    edit: () => dispatch({isedit: true})
  };
}






export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accoutmanage);
