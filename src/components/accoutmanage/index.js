import React from 'react';
import { Redirect, Link } from 'react-router-dom'

import { Table, Input, Popconfirm, Row, Col, Button } from 'antd';
import $ from  'jquery'


export default class Accoutmanage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '姓名',
      dataIndex: 'accountName'
    }, {
      title: '角色',
      dataIndex: 'roleName'
    }, {
      title: '登录账户',
      dataIndex: 'address'
    },{
      title: '关联项目',
      dataIndex: 'isLimit'
    },{
      title: '创建时间',
      dataIndex: 'createTime'
    },{
      title: '账户状态',
      dataIndex: 'status'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <div className="editable-row-operations" style={{display:'flex',justifyContent:'space-around'}}>
            <Link to={{pathname:'/menu/accoutmanage/add',state:this.state.newrole}}>编辑</Link>
            <a onClick={() => this.stop(index)}>停用</a>
            <a onClick={() => this.onDelete(index)}>删除</a>
          </div>
        );
      },
    }];
    this.state = {
      data: [],
      newrole: false
    };
  }
  newroles = () =>{
    this.setState({
      newrole: true
    })
  }
  componentWillMount () {
    let { data } = this.state

    let that = this
    $.ajax({
      type:"POST",
      url: '/account/getAccounts.do',
      data:{
        page:1,
        rows:10
      },
      // url: '/account.json',
      success:function(datas){
        console.log(datas)
        data = datas.rows
        that.setState({
          data:data
        })
        console.log(that.state.data)
      }
    })

  }

  onDelete = (index) => {
    const data = [...this.state.data];
    data.splice(index, 1);
    this.setState({ data });
  }
  render() {
    const { data } = this.state;

    const columns = this.columns;

    if ( this.state.newrole ) {
      return (
        <Redirect to={'/menu/accoutmanage/add'} />
      )
    }

    return (
      <div>
         <div className="border_line">
           <Row type="flex" align="middle" style={{height:'60px'}}>
             <Col span={3} offset={18}><Button type="primary" onClick={this.newroles}>添加账户</Button></Col>
           </Row>
         </div>
         <div style={{padding:'10px 20px'}}>
           <Table bordered dataSource={data} columns={columns} />
         </div>
       </div>
    )
  }
}
