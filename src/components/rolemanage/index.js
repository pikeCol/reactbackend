import React from 'react';
import { Row, Col, Table, Button} from 'antd';
import { Link, Redirect } from 'react-router-dom'

import $ from  'jquery'


const columns=[{
  title:'角色名称',
  dataIndex: 'roleName'
},{
  title:'角色性质',
  dataIndex: 'roleType'
},{
  title:'角色状态',
  dataIndex: 'status'
},{
  title:'创建时间',
  dataIndex: 'createTime'
},{
  title:'操作',
  dataIndex: 'operate',
  render: arr =>{
    return (<Row   type="flex"  align="middle">
              <Col span={6}><a>编辑</a></Col>
              <Col span={6}><a>停用</a></Col>
              <Col span={6}><a>删除</a></Col>
              <Col span={6}><a>修改密码</a></Col>
            </Row>
  )
  }
},]

// const data= [
//     {
//         "oid": "f6d1024c6df84e86be427c824b4dcda8",
//         "roleName": "角色4",
//         "roleType": "1",
//         "status": "0",
//         "pemissionOids": null,
//         "createBy": "",
//         "createTime": "2017-07-05 10:20:19",
//         "updateBy": "",
//         "updateTime": null
//     },
//     {
//         "oid": "2bac7485e3c94bd799011abe5981e936",
//         "roleName": "角色5",
//         "roleType": "1",
//         "status": "0",
//         "pemissionOids": null,
//         "createBy": "",
//         "createTime": "2017-07-05 10:20:22",
//         "updateBy": "",
//         "updateTime": null
//     }
// ]

class Rolemanage extends React.Component{
  state={
    isnew:false,
    data:[
      // {
      //       "oid": "f6d1024c6df84e86be427c824b4dcda8",
      //       "roleName": "角色4",
      //       "roleType": "1",
      //       "status": "0",
      //       "pemissionOids": null,
      //       "createBy": "",
      //       "createTime": "2017-07-05 10:20:19",
      //       "updateBy": "",
      //       "updateTime": null
      //   },
      //   {
      //       "oid": "2bac7485e3c94bd799011abe5981e936",
      //       "roleName": "角色5",
      //       "roleType": "1",
      //       "status": "0",
      //       "pemissionOids": null,
      //       "createBy": "",
      //       "createTime": "2017-07-05 10:20:22",
      //       "updateBy": "",
      //       "updateTime": null
      //   }
    ]
  }
  componentWillMount () {

    let { data } = this.state

    let that = this
    $.ajax({
      type:"POST",
      // url: '/data.json',
      url: '/role/getRoleList.do',
      success:function(datas){
        // data = datas.data
        // that.setState({
        //   data:data
        // })

        if( datas.restCode === 200 ){
          data = datas.data
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
  render(){
    if(this.state.isnew) {
      return(
        <Redirect to={'/menu/rolemanage/newrole'} />
      )
    }
    return(
      <div>
        <div className="border_line">
          <Row type="flex" align="middle" style={{height:'60px'}}>
            <Col span={3} offset={18}><Button type="primary" onClick={this.newroles}>新建角色</Button></Col>
          </Row>
        </div>
        <div style={{padding:'10px 20px'}}>
          <Table
            columns={columns}
            dataSource={this.state.data}
            bordered
          />
        </div>
      </div>
    )
  }
}
export default Rolemanage;
