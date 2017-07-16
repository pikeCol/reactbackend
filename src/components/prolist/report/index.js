import React from 'react';
import { DatePicker, Button, Row, Col,Table,Input } from 'antd';
import moment from 'moment';
const { MonthPicker } = DatePicker;
import reqwest from 'reqwest';

const dateFormat = 'YYYY';
const monthFormat = 'MM';

import 'moment/locale/zh-cn';
moment.locale('zh-cn');


class Myedit extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const text = this.props.text
    const editable = this.props.editable
    return(
      <div>
        {
          editable?
          <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat}/>
          :
          <p>{text}</p>
        }
      </div>
    )
  }
}

class Mycommentedit extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const text = this.props.text
    const editable = this.props.editable
    return(
      <div>
        {
          editable?
          <Input defaultValue={text}/>
          :
          <p>{text}</p>
        }
      </div>
    )
  }
}


class Myadd extends React.Component{
  render() {
    return(
      <div>
        <DatePicker  format={dateFormat}/>
      </div>
    )
  }
}
class Myaddmonth extends React.Component{
  render() {
    return(
      <div>
        <MonthPicker  defaultValue={moment('1', monthFormat)} format={monthFormat}/>
      </div>
    )
  }
}
class Myeditmonth extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const text = this.props.text
    const editable = this.props.editable
    return(
      <div>
        {
          editable?
          <MonthPicker  defaultValue={moment(text, monthFormat)} format={monthFormat}/>
          :
          <p>{text}</p>
        }
      </div>
    )
  }
}




class Report extends React.Component{
  state={
    data:[],
    columns:[],
    editable: false,
    addable:false
  }
  yearender=(text, record, index) =>{
    let {editable,addable} = this.state
    console.log(this.state.data[index].isedit)
    return(
      <div>
        {
          this.state.data[index].isedit?
          <Myadd />
          :
          <Myedit
            text={text}
            editable={editable}
           />
        }
      </div>
    )
  }
  monrender=(text, record, index) =>{
    let {editable,addable} = this.state
    return(
      <div>
        {
          this.state.data[index].isedit?
          <Myaddmonth />
          :
          <Myeditmonth
            text={text}
            editable={editable}
           />
        }
      </div>
    )
  }
  usrender=(text, record, index) =>{
    let {editable,addable} = this.state
    return(
      <div>
        {
          this.state.data[index].isedit?
          <Input/>
          :
          <Mycommentedit
            text={text}
            editable={editable}
           />
        }
      </div>
    )
  }
  componentWillMount () {
    let projectOid = localStorage.getItem('projectOid')
    reqwest({
      // url:'/project/showReportData.do',
      // data:{
      //   projectOid:projectOid
      // }
      url:'../../../api/item0.json',
    }).then((result)=>{
      console.log(result)
      let { data, columns } = this.state
      if (result.restCode ===200 ) {
        data = result.data.reportDatas
         data.isedit = false
         // 获取表头信息
         let _cols = result.data.templateDetails
         for (let value of _cols) {
            value.title = value.name;
            value.dataIndex=value.valCode
            value.render=this.usrender
            if(value.valCode=='val1') {
              value.render= this.yearender
            }
            if(value.valCode=='val2') {
              value.render= this.monrender
            }
          }
        this.setState({
          columns:[..._cols],
          data:[...data]
        })
      }
    })
  }
  handleAdd = () => {
    const { data, addable } = this.state;
    let newData = {}
    for (var variable in data[0]) {
      if (data[0].hasOwnProperty(variable)) {
        newData[variable] = ''
      }
    }
    // let newData = data[0];
    newData.isedit = true;
    this.setState({
      data: [...data, newData],
      addable: true
    });
    // alert(this.state.data[1].editable)
  }
  handleCancel =() => {
    const { data, addable } = this.state;
    data.splice(data.length - 1,1)
    this.setState({
      data: [...data],
      addable: false
    });
  }
  eidt = () =>{
    this.setState({
      editable: !this.state.editable
    })
  }
  render(){
    const {editable, addable}=this.state
    return(
      <div>
        <Row >
          <Col span={4} offset={2}>
            <DatePicker defaultValue={moment('2015', dateFormat)} format={dateFormat} />
          </Col>
          <Col>
            <Button type="primary" >筛选</Button>
          </Col>
         </Row>
        <Row style={{paddingTop:'20px'}}>
          <Col offset={16}>
            <Button type="primary" >导出所选报表</Button>
            {
              addable?
              <Button type="primary" style={{margin:'0 10px'}} onClick={this.handleCancel}>取消报表</Button>
              :
              <span>
                <Button type="primary" style={{margin:'0 10px'}} onClick={this.handleAdd}>添加报表</Button>
                <Button type="primary" onClick={this.eidt}>
                  {
                    editable?
                    "取消编辑"
                    :
                    "编辑报表"
                  }
                </Button>
              </span>
            }

          </Col>
        </Row>
        <Row style={{paddingTop:'20px'}}>
          <Col offset={2} span={20}>
            <Table
              columns={this.state.columns}
              dataSource={this.state.data}
              bordered
              pagination={false}
            />
          </Col>
        </Row>

        <Row style={{marginTop:'20px'}}>
          {
            editable?
            <Col offset={20} span={2}>
              <Button type="primary" >保存</Button>
            </Col>
            :''
          }
        </Row>
        <Row style={{marginTop:'20px'}}>
          {
            addable?
            <Col offset={20} span={2}>
              <Button type="primary" >提交</Button>
            </Col>
            :''
          }
        </Row>

      </div>
    )
  }
}
export default Report;
