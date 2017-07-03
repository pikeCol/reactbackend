import React from 'react';
import { Row, Col, Table, Button} from 'antd';
import { Link, Redirect } from 'react-router-dom'

const columns=[{
  title:'姓名',
  dataIndex: 'name'
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
  title:'创建时间',
  dataIndex: 'status'
},{
  title:'操作',
  dataIndex: 'operate',
  render: arr =>{
    return (
      <Row   type="flex" align="middle">
        <Col span={6}><Button type="primary">编辑</Button></Col>
        <Col span={6}><Button type="primary">停用</Button></Col>
        <Col span={6}><Button type="primary">删除</Button></Col>
        <Col span={6}><Button type="primary">修改密码</Button></Col>
      </Row>
      )
    }
  }
]

const data=[{
  key:1,
  name:'2312',
  propety:'2312',
  longin_account:'asdfasd',
  pro:'施蒂利克九分裤',
  status:'2312',
  createtiem:'2312',
}]

class Accoutmanage extends React.Component{
  state={
    isnew:false
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
    return(
      <div>
        <div className="border_line">
          <Row type="flex" align="middle" style={{height:'60px'}}>
            <Col span={3} offset={18}><Button type="primary" onClick={this.newroles}>添加账户</Button></Col>
          </Row>
        </div>
        <div style={{padding:'10px 20px'}}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
          />
        </div>
      </div>
    )
  }
}
export default Accoutmanage;
