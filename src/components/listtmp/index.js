import React from 'react';
import MonthReport from '../common/monthReport'
import { Row, Col, Input, Select,Button  } from 'antd';
const Option = Select.Option;

// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

class Listtmp extends React.Component{
  state = {
    size: 'default',
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
            >
          {/* {children} */}
          <Option key="1">季度报表</Option>
          <Option key="2">月度报表</Option>
          </Select>

          </Col>
          <Col span={4} offset={2}><Button type="primary">调用模板</Button></Col>
        </Row>
        <MonthReport />
      </div>
    )
  }
}
export default Listtmp;
