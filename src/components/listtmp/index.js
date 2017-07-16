import React from 'react';
import { Row, Col, Input, Select,Button, DatePicker, Table  } from 'antd';
const Option = Select.Option;

import $ from  'jquery'
const dateFormat = 'YYYY';


import moment from 'moment';



class Listtmp extends React.Component{
  state = {
    size: 'default',
    columns:[{
      title:'报表年',
      dataIndex:'lv1',
      render: (text, record, index) => {
        return(
          this.state.data[index].editable?
          <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat}/>
          :
          <p>{text}</p>
        )
      }
    }, {
      title:'报表月',
      dataIndex:'lv2',
      render: (text, record, index) => {
        return(
          this.state.data[index].editable?
          <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat}/>
          :
          <p>{text}</p>
        )
      }
    }, {
      title:'总资产',
      dataIndex:'lv3',
      render: (text, record, index) => {
        return(
          this.state.data[index].editable?
          <Input />
          :
          <p>{text}</p>
        )
      }
    }, {
      title:'净资产',
      dataIndex:'lv4',
      render: (text, record, index) => {
        return(
          this.state.data[index].editable?
          <Input />
          :
          <p>{text}</p>
        )
      }
    }, {
      title:'实收资本',
      dataIndex:'lv5'
    }, {
      title:'货币资本',
      dataIndex:'lv6'
    }, {
      title:'营收资本',
      dataIndex:'lv7'
    }, {
      title:'净利',
      dataIndex:'lv8'
    }],
    data: [{
      lv1:'我是表体报表年',
      lv2:'报表月',
      lv3:'总资产',
      lv4:'净资产',
      lv5:'实收资本',
      lv6:'货币资本',
      lv7:'营收资本',
      lv8:'净利',
      editable:false
    }, {
      lv1:'我是表体报表2222年',
      lv2:'报表月',
      lv3:'总资产',
      lv4:'净资产',
      lv5:'实收资本',
      lv6:'货币资本',
      lv7:'营收资本',
      lv8:'净利',
      editable:false
    }],
    htmls:''
  }
  componentWillMount() {

  }
  //
  // gettable = () =>{
  //   const {tablehead} = this.state;
  //   let {htmls, datas}=this.state
  //   $.each(tablehead,function(index,value){
  //     htmls += `<tr><td>${value}</td>`;
  //     $.each(datas, function(item, items){
  //       htmls += `<td>${items[index]}</td>`;
  //     })
  //     htmls += `</tr>`
  //   })
  //   console.log(htmls)
  //   return {__html: htmls};
  // }
  // adddatas =() => {
  //   let { datas }=this.state
  //   let newdata = {
  //     lv1:`<span class="ant-calendar-picker"><div><input readonly="" value="2015" placeholder="请选择日期" class="ant-calendar-picker-input ant-input"><i class="anticon anticon-cross-circle ant-calendar-picker-clear"></i><span class="ant-calendar-picker-icon"></span></div></span>`,
  //     lv2:`<span class="ant-calendar-picker"><div><input readonly="" value="06" placeholder="请选择日期" class="ant-calendar-picker-input ant-input"><i class="anticon anticon-cross-circle ant-calendar-picker-clear"></i><span class="ant-calendar-picker-icon"></span></div></span>`,
  //     lv3:'总资产',
  //     lv4:'净资产',
  //     lv5:'实收资本',
  //     lv6:'货币资本',
  //     lv7:'营收资本',
  //     lv8:'净利'
  //   }
  //   this.setState({
  //     datas:[...datas, newdata]
  //   })
  // }
  //
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
            <Button type="primary" onClick={this.delete}>删除</Button>
          </Col>
        </Row>
        <Table
           columns={this.state.columns}
           dataSource={this.state.data}
           bordered
         />
        {/* <table  className="cloumstable" cellSpacing="0" cellPadding="0">
          <tbody className="cloumsbody" dangerouslySetInnerHTML={this.gettable()}>

          </tbody>
        </table> */}
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
