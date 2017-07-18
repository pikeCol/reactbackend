import React from 'react';
import { Row, Col, Input, Select,Button, DatePicker, Table  } from 'antd';
const Option = Select.Option;

import $ from  'jquery'
const dateFormat = 'YYYY';


import moment from 'moment';


class Listedit extends React.Component{
  state = {
    type:'',
    size: 'default',
    columns:[{
      title:'报表年',
      dataIndex:'val1'
    }, {
      title:'报表月',
      dataIndex:'val2'
    }, {
      title:'总资产',
      dataIndex:'val3'
    }, {
      title:'净资产',
      dataIndex:'val4'
    }, {
      title:'实收资本',
      dataIndex:'val5'
    }, {
      title:'货币资本',
      dataIndex:'val6'
    }, {
      title:'营收资本',
      dataIndex:'val7'
    }, {
      title:'净利',
      dataIndex:'val8'
    }]
  }
  componentWillMount() {

  }
  adddatas =() => {
    let { data }=this.state
    let newdata={}
    for (let variable of data) {
      if( data.hasOwnProperty(variable) ) {
        newdata[variable] = ''
      }
    }
    newdata.editable = true

    this.setState({
        data:[...data, newdata]
      })
  }
  delete =() => {
    let { data }=this.state
    data.splice(data.length-1,1)
    this.setState({
        data:[...data]
      })
  }
  select = (e) =>{

  }
  render(){
    const { size } = this.state;
    return(
      <div style={{paddingLeft:'20px'}}>
        <Row type="flex" style={{marginTop:'40px'}}>
          <Col span={4} style={{lineHeight:'28px'}}>模板名称</Col>
          <Col span={6}><Input placeholder="Basic usage" /></Col>
        </Row>
        <Row type="flex" style={{marginTop:'40px',margiLeft:'20px'}}>
          <Col span={4} style={{lineHeight:'28px'}}>模板名称</Col>
          <Col span={4}>表报性质</Col>
          <Col span={4}>
            <Select
              size={size}
              defaultValue="请选择"
              style={{ width: 200 }}
              onSelect={this.select}
            >
            <Option key="2">季度报表</Option>
            <Option key="1">月度报表</Option>
          </Select>
          </Col>
          <Col span={4} offset={2}><Button type="primary">调用模板</Button></Col>
        </Row>
        <Row style={{margin:'40px 0 20px'}}>
          <Col span={2}>
            <Button type="primary" onClick={this.adddatas}>添加</Button>
          </Col>
          <Col  span={4}>
            <Button type="primary" onClick={this.delete}>删除</Button>
          </Col>
        </Row>
        <Table
           columns={this.state.columns}
           bordered
         />
        <Row>
          <Col offset={16}>
            <Button type="primary">保存</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Listedit;
