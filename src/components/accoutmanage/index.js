import React from 'react';
import { Redirect, Link } from 'react-router-dom'

import { Table, Input, Popconfirm, Row, Col, Button } from 'antd';
import $ from  'jquery'
import Myalert from '../common/alert'
import globalPemission from '../common/permission'

export default class Accoutmanage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '角色',
      dataIndex: 'roleName'
    }, {
      title: '登录账户',
      dataIndex: 'accountName'
    },{
      title: '关联项目',
      dataIndex: 'isLimit',
      render:(text, record, index) => {
        let isLimit = this.state.data[index].isLimit
        return (
          <p>
            {
              isLimit>0?"关联项目": "不关联项目"
            }
          </p>
        )
      }
    },{
      title: '创建时间',
      dataIndex: 'createTime'
    },{
      title: '账户状态',
      dataIndex: 'status',
      render:(text, record, index) => {
        let status = this.state.data[index].status
        return (
          <p>
            {
              status>0?"冻结": "启用"
            }
          </p>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        let status = this.state.data[index].status
        return (
          <div className="editable-row-operations" style={{display:'flex',justifyContent:'space-around'}}>
            {
             globalPemission.indexOf("账户编辑")>=0?
              <Link to={{pathname:'/menu/accoutmanage/edit',state:{oid:this.state.data[index].oid}}}>编辑</Link>
              :''
            }
            {
             globalPemission.indexOf("账户停用")>=0?
              <Col span={6}>
                {
                  status>0?
                  <a onClick={()=>this.start(text, record, index)}>启用</a>
                  :
                  <a onClick={()=>this.stop(text, record, index)}>冻结</a>
                }
              </Col>
              :''
            }
            {
             globalPemission.indexOf("账户删除")>=0?
              <a onClick={() => this.onDelete(index)}>删除</a>
              :''
            }
          </div>
        );
      },
    }];
    this.state = {
      data: []
    };
  }
  stop=(text, record, index)=>{
    let that = this
    let { data } = this.state
    data[index].status  = 1
    $.ajax({
      type:"POST",
      url: '/account/updateAccountStatus.do',
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

  start=(text, record, index)=>{
    let that = this
    let { data } = this.state
    data[index].status  = 0
    $.ajax({
      type:"POST",
      url: '/account/updateAccountStatus.do',
      data:{
        oid: this.state.data[index].oid,
        status: 0
      },
      // url: '/data.json',
      success:function(datas){
        if( datas.restCode === 200 ){
          that.setState({
            data:data
          })
        }
      }
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
    // const data = [...this.state.data];
    const { data } = this.state
    let that = this
    let oid = data[index].oid
    $.ajax({
      type:"POST",
      url: '/account/delAccount.do',
      data: {
        oid: oid
      },
      success:function(datas){
        if( datas.restCode === 200 ){
          Myalert.success('success', '删除成功')
          data.splice(index, 1);
          that.setState({ data });
        }
      }
    })
  }
  render() {
    const { data } = this.state;

    const columns = this.columns;


    return (
      <div>
         <div className="border_line">
           <Row type="flex" align="middle" style={{height:'60px'}}>
             {
              globalPemission.indexOf("账户添加")>=0?
               <Col span={3} offset={18}><Button type="primary"><Link to={'/menu/accoutmanage/add'}>添加账户</Link></Button></Col>
               :''
             }
           </Row>
         </div>
         <div style={{padding:'10px 20px'}}>
           <Table
             dataSource={data}
             columns={columns}
             bordered
           />
         </div>
       </div>
    )
  }
}
