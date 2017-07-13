import React from 'react';
import { DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';
// const { MonthPicker } = DatePicker;

import { Table } from 'antd';

const monthFormat = 'YYYY';

import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const columns=[{
  title:'报表年',
  dataIndex:'year'
},{
  title:'报表月',
  dataIndex:'month'
},{
  title:'总资产',
  dataIndex:'tolinvent'
},{
  title:'净资产',
  dataIndex:'invent'
},{
  title:'实收资本',
  dataIndex:'reainvent'
},{
  title:'货币资本',
  dataIndex:'huoinvent'
},{
  title:'营收资本',
  dataIndex:'getlinvent'
},{
  title:'净利',
  dataIndex:'acclinvent'
}]

const data=[{
  key:1,
  year:'12asd',
  month:'12asd',
  tolinvent:'12asd',
  invent:'12asd',
  reainvent:'12asd',
  huoinvent:'12asd',
  getlinvent:'12asd',
  acclinvent:'12asd'
}]

class Report extends React.Component{
  render(){
    return(
      <div>
        <Row >
          <Col span={4} offset={2}>
            <DatePicker defaultValue={moment('2015', monthFormat)} format={monthFormat} />
          </Col>
          <Col>
            <Button type="primary" >筛选</Button>
          </Col>
         </Row>
        <Row style={{paddingTop:'20px'}}>
          <Col offset={18}>
            <Button type="primary" >导出所选报表</Button>
            <Button type="primary" style={{margin:'0 10px'}}>添加报表</Button>
            <Button type="primary" >编辑报表</Button>
          </Col>
        </Row>
        <Row style={{paddingTop:'20px'}}>
          <Col offset={2} span={20}>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={false}
            />
          </Col>
        </Row>

      </div>
    )
  }
}
export default Report;
