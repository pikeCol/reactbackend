import React from 'react';
import { Row, Col, Input, Select,Button, DatePicker   } from 'antd';
const Option = Select.Option;

import $ from  'jquery'
const dateFormat = 'YYYY-MM-DD';

import moment from 'moment';
class Listtmp extends React.Component{
  state = {
    size: 'default',
    tablehead:{
      lv1:'报表年',
      lv2:'报表月',
      lv3:'总资产',
      lv4:'净资产',
      lv5:'实收资本',
      lv6:'货币资本',
      lv7:'营收资本',
      lv8:'净利'
    },
    datas: [{
      lv1:'我是表体报表年',
      lv2:'报表月',
      lv3:'总资产',
      lv4:'净资产',
      lv5:'实收资本',
      lv6:'货币资本',
      lv7:'营收资本',
      lv8:'净利'
    }, {
      lv1:'我是表体报表2222年',
      lv2:'报表月',
      lv3:'总资产',
      lv4:'净资产',
      lv5:'实收资本',
      lv6:'货币资本',
      lv7:'营收资本',
      lv8:'净利'
    }],
    htmls:''
  }
  componentWillMount() {
    // const {tablehead} = this.state;
    // let {htmls, datas}=this.state
    // $.each(tablehead,function(index,value){
    //
    //   // if (index === "lv1" || index === "lv2") {
    //   //   htmls.push(<tr><td><DatePicker defaultValue={moment('2015-06-06', dateFormat)} /></td></tr>)
    //   //   return
    //   // }
    //   $.each(datas, function(item, items){
    //     htmls.push(<tr>
    //                 <td>{value}</td>
    //                 <td>{items[index]}</td>
    //               </tr>)
    //   })
    //
    // })
    //
    // this.setState({
    //   htmls:htmls
    // })

  }
  gettable = () =>{
    const {tablehead} = this.state;
    let {htmls, datas}=this.state
    $.each(tablehead,function(index,value){

      htmls += `<tr><td>${value}</td>`;
      $.each(datas, function(item, items){
        htmls += `<td>${items[index]}</td>`;
      })
      htmls += `</tr>`
    })

    console.log(htmls)
    return {__html: htmls};
  }
  adddatas =() => {
    let { datas }=this.state
    let newdata = {
      lv1:`<span class="ant-calendar-picker"><div><input readonly="" value="2015" placeholder="请选择日期" class="ant-calendar-picker-input ant-input"><i class="anticon anticon-cross-circle ant-calendar-picker-clear"></i><span class="ant-calendar-picker-icon"></span></div></span>`,
      lv2:`<span class="ant-calendar-picker"><div><input readonly="" value="06" placeholder="请选择日期" class="ant-calendar-picker-input ant-input"><i class="anticon anticon-cross-circle ant-calendar-picker-clear"></i><span class="ant-calendar-picker-icon"></span></div></span>`,
      lv3:'总资产',
      lv4:'净资产',
      lv5:'实收资本',
      lv6:'货币资本',
      lv7:'营收资本',
      lv8:'净利'
    }

    this.setState({
      datas:[...datas, newdata]
    })
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
            <Option key="1">季度报表</Option>
            <Option key="2">月度报表</Option>
          </Select>
          </Col>
          <Col span={4} offset={2}><Button type="primary">调用模板</Button></Col>
        </Row>
        <Row style={{marginTop:'20px'}}>
          <Col span={2}>
            <Button type="primary" onClick={this.adddatas}>添加</Button>
          </Col>
          <Col  span={4}>
            <Button type="primary">删除</Button>
          </Col>
        </Row>
        <table  className="cloumstable" cellSpacing="0" cellPadding="0">
          <tbody className="cloumsbody" dangerouslySetInnerHTML={this.gettable()}>

          </tbody>
        </table>
        <Row>
          <Col offset={16}>
            <Button type="primary">保存</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Listtmp;
