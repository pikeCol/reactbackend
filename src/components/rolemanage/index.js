import React from 'react';
import { Row, Col, Table, Button} from 'antd';
import { Link, Redirect } from 'react-router-dom'

import $ from  'jquery'
import Myalert from '../common/alert'

class Rolemanage extends React.Component{
  state={
     columns:[{
        title:'角色名称',
        dataIndex: 'roleName'
      },{
        title:'角色性质',
        dataIndex: 'roleType'
      },{
        title:'角色状态',
        dataIndex: 'status',
        render:(text, record, index) => {
          let status = this.state.data[index].status
          return (
            <p>
              {
                status>0?"启用": "禁止"
              }
            </p>
          )
        }
      },{
        title:'创建时间',
        dataIndex: 'createTime'
      },{
        title:'操作',
        dataIndex: 'operate',
        render: (text, record, index) =>{
          let status = this.state.data[index].status
          return (
            <Row   type="flex"  align="middle">
              <Col span={6}>
                <a onClick={()=>this.edit(text, record, index)}>编辑</a>
              </Col>
              <Col span={6}>
                {
                  status?
                  <a onClick={()=>this.stop(text, record, index)}>冻结</a>
                  :
                  <a onClick={()=>this.start(text, record, index)}>启用</a>
                }
              </Col>
              <Col span={6}><a onClick={()=>this.delete(text, record, index)}>删除</a></Col>
              <Col span={6}><Link to={'/menu/editpass'}>修改密码</Link></Col>
            </Row>
          )
        }
    }],
    isnew:false,
    param:{},
    data:[],
    loading:false,
    pagination:{}
  }
  edit = (text, record, index) =>{
    let { param } = this.state
    let roleparams=this.state.data[index]
    param.oid=roleparams.oid,
    param.roleName=roleparams.roleName,
    param.roleType=roleparams.roleType,
    param.pemissionOids=roleparams.pemissionOids
    this.setState({
      param:param,
      isnew: true
    })

  }
  stop=(text, record, index)=>{
    let that = this
    let { data } = this.state
    data[index].status  = 0
    $.ajax({
      type:"POST",
      url: '/role/updateRoleStatus.do',
      data:{
        oid: this.state.data[index].oid,
        status: 0
      },
      // url: '/data.json',
      success:function(datas){
        if( datas.restCode === 200 ){
          Myalert.success('success', '修改成功')
          that.setState({
            data:data
          })
        }
      }
    })
  }
  start=(text, record, index)=>{
    let that = this
    let { data } = this.state
    data[index].status  = 1
    $.ajax({
      type:"POST",
      url: '/role/updateRoleStatus.do',
      data:{
        oid: this.state.data[index].oid,
        status: 1
      },
      // url: '/data.json',
      success:function(datas){
        if( datas.restCode === 200 ){
          Myalert.success('success', '修改成功')
          that.setState({
            data:data
          })
        }
      }
    })
  }
  delete=(text, record, index)=>{
    let that = this
    let { data } = this.state
    data.splice(index, 1)
    $.ajax({
      type:"POST",
      url: '/role/delRole.do',
      data:{
        oid: this.state.data[index].oid
      },
      // url: '/data.json',
      success:function(datas){
        if( datas.restCode === 200 ){
          Myalert.success('success', '修改成功')
          that.setState({
            data:data
          })
        }
      }
    })
  }

  newroles = (e) =>{
    this.setState({
      isnew: true
    })
  }
  fetch (param={}) {
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    var that = this
    $.ajax({
      type:"POST",
      url: '/role/queryRoleList.do',
      data: {
        rows:10,
        ...param
      },
      success:function(datas){
          pagination.total = datas.total;
           that.setState({
             loading: false,
             data: datas.rows,
             pagination,
           });
          // data = datas.data
          // that.setState({
          //   data:data
          // })
      }
    })
  }
  handleTableChange = (pagination) => {
    const page = { ...this.state.pagination };
    page.current = pagination.current;
    this.setState({
      pagination: page,
    });
    this.fetch({
      rows: pagination.pageSize,
      page: pagination.current
    });
  }
  componentDidMount () {
    this.fetch({
      page:1,
      rows:10
    })
  }


  render(){
    if(this.state.isnew) {
      return(
        <Redirect to={{pathname:'/menu/rolemanage/edit',state:{param:this.state.param}}} />
      )
    }
    const {columns} = this.state
    return(
      <div>
        <div className="border_line">
          <Row type="flex" align="middle" style={{height:'60px'}}>
            <Col span={3} offset={18}>
              <Button type="primary">
                <Link to={'/menu/rolemanage/newrole'}>新建角色</Link>
              </Button>
            </Col>
          </Row>
        </div>
        <div style={{padding:'10px 20px'}}>
          <Table
            columns={columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            bordered
          />
        </div>
      </div>
    )
  }
}
export default Rolemanage;
