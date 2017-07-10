import React from 'react';
import { Row, Col, Table, Button, Popconfirm} from 'antd';
import { Redirect } from 'react-router-dom'

import EditableCell  from '../common/editablecell'

import { connect } from 'react-redux';


export default class Accoutmanage extends React.Component{
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
        render:(text, record, index) => {
          return(
            <EditableCell isedit={true} value={text} />
          )
        }
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
              <Col span={6}><a href="#"  onClick={this.check}>编辑</a></Col>
              <Col span={6}><a onClick={() => this.stop(index)}>停用</a></Col>
              <Col span={6}>
                { this.state.columns.length > 0 ?
                 (
                   <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                     <a>删除</a>
                   </Popconfirm>
                 ) : null}
              </Col>
            </Row>
            )
          }
        }
    ],
    count: 2,
    editable:false,
    isnew:false
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  stop = (index) =>{
    const data = this.state.data
    // console.log(data[index].status)
    if (data[index].status == '启用') {
      data[index].status = '禁止'
    }
    this.setState({
      data:data
    })
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
  edit=()=>{
    this.setState({
      editable:true
    })
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
    // const { edit }=this.props

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
        <Button type="primary" onClick={this.edit}>加</Button>
        {/* <EditableCell value={this.state.editable} /> */}
      </div>
    )
  }
}


// const editableAction = {type: 'editable'};
// const diseditableAction = {type: 'diseditable'};
//
// function mapStateToProps(state)  {
//   return{
//     value:state.editable
//   }
// }
//
//
// function mapDispatchToProps(dispatch) {
//   return {
//     edit: () => dispatch(editableAction)
//   };
// }
//
//
//
//
//
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Accoutmanage);
