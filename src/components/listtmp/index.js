import React from 'react';
import { Row, Col, Input, Table,Button  } from 'antd';
const dateFormat = 'YYYY';

import moment from 'moment';
import reqwest from 'reqwest';
import { Redirect } from 'react-router-dom'

export default class Listtmp extends React.Component{
  constructor(props){
    super(props)
  }
  state={
    columns:[{
      title: '模板名称',
      dataIndex: 'name'
    }, {
      title: '创建时间',
      dataIndex: 'updateTime'
    }, {
      title: '操作',
      dataIndex: 'opreate',
      render: (text, record, index) => {
        return(
          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
              <a onClick={()=>this.edit(index)}>编辑</a>
            </Col>
            <Col span={4}>
              <a onClick={() =>this.delt(index)}>删除</a>
            </Col>
          </Row>
        )
      }
    }],
    data: [],
    params:{},
    add: false
  }
  edit = (index) => {
    let {data, params, add} = this.state
    params.name = data[index].name
    params.type = data[index].type
    this.setState({
      params:params,
      add:true
    })
    console.log(this.state.params)
  }
  delt = (index) => {
    let {data} = this.state
    data.splice(index, 1)
    this.setState({
      data:[...data]
    })
  }
  componentWillMount() {
    let {data} = this.state
    reqwest({
      url:'../../api/temlist.json'
    }).then((result)=>{
      if (result.restCode === 200) {
        let data = result.data.template
        this.setState({
          data:[...data]
        })
      }
    })
  }
  addmodule =() =>{
    this.setState({
      add:true
    })
  }
  render(){
    const { size, add } = this.state;
    if (add) {
      return(
        <Redirect to={{pathname:'/menu/listtmp/add',state:{params:this.state.params}}} />
      )
    }
    return(
      <div style={{paddingTop:'40px'}}>
        <Row style={{paddingBottom:'40px'}}>
          <Col offset={20}>
            <Button type="primary" onClick={this.addmodule}>添加</Button>
          </Col>
        </Row>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
         />
      </div>
    )
  }
}
