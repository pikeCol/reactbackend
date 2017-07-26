import React from 'react';
import { Row, Col, Table, Button} from 'antd';
import { Link, Redirect } from 'react-router-dom'

import $ from  'jquery'
import Myalert from '../common/alert'
import globalPemission from '../common/permission'

class Rolemanage extends React.Component{
  state={
     columns:[{
        title:'角色名称',
        dataIndex: 'roleName'
      },
      // {
      //   title:'角色性质',
      //   dataIndex: 'roleType',
      //   render: (index) => {
      //     let roleType = this.state.data[index].roleType
      //     return(
      //       <div>
      //         {
      //           roleType==0?'外部性质':'内部性质'
      //         }
      //       </div>
      //     )
      //   }
      // },
      {
        title:'角色状态',
        dataIndex: 'status',
        render:(text, record, index) => {
          let status = this.state.data[index].status
          return (
            <p>
              {
                status>0?"停用": "启用"
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
                {
                    globalPemission.indexOf('editRole')>=0?
                    <a onClick={()=>this.edit(text, record, index)}>编辑</a>
                    :''
                }
              </Col>
              <Col span={6}>
                {
                  globalPemission.indexOf('stopRole')>=0?
                  <span>
                    {
                      status>0?
                      <a onClick={()=>this.start(text, record, index)}>启用</a>
                      :
                      <a onClick={()=>this.stop(text, record, index)}>停用</a>
                    }
                  </span>
                  :''
                }
              </Col>
              {
                  globalPemission.indexOf('delRole')>=0?
                  <Col span={6}><a onClick={()=>this.delete(text, record, index)}>删除</a></Col>
                  :
                  ''
              }
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
    param.pemissionOids=roleparams.pemissionOids
    this.setState({
      param:param,
      isnew: true
    })

  }
  stop=(text, record, index)=>{
    let that = this
    $.ajax({
      type:"POST",
      url: '/role/updateRoleStatus.do',
      data:{
        oid: this.state.data[index].oid,
        status: 1
      },
      success:function(datas){
        if( datas.restCode === 200 ){
          that.fetch({
            page:1,
            rows:10
          })
          Myalert.success('success', '修改成功')
        }
      }
    })
  }
  start=(text, record, index)=>{
    let that = this
    let { data } = this.state
    $.ajax({
      type:"POST",
      url: '/role/updateRoleStatus.do',
      data:{
        oid: this.state.data[index].oid,
        status: 0
      },
      success:function(datas){
        if( datas.restCode === 200 ){
          that.fetch({
            page:1,
            rows:10
          })
          Myalert.success('success', '修改成功')
        }
      }
    })
  }
  delete=(text, record, index)=>{
    let that = this
    $.ajax({
      type:"POST",
      url: '/role/delRole.do',
      data:{
        oid: this.state.data[index].oid,
      },
      success:function(datas){
        if( datas.restCode === 200 ){
          that.fetch({
            page:1,
            rows:10
          })
          Myalert.success('success', '修改成功')
        } else {
          Myalert.error('Error', datas.msg)
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
    console.log(globalPemission)
    if(this.state.isnew) {
      return(
        <Redirect to={{pathname:'/menu/rolemanage/edit',state:{param:this.state.param}}} />
      )
    }
    const {columns} = this.state
    return(
      <div>
        <div className="border_line">
          {
            globalPemission.indexOf('addRole')>=0?
              <Row type="flex" align="middle" style={{height:'60px'}}>
                <Col span={3} offset={18}>
                  <Button type="primary">
                    <Link to={'/menu/rolemanage/newrole'}>新建角色</Link>
                  </Button>
                </Col>
              </Row>
              :''
            }
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
