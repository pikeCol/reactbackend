import React from 'react';
import { Button, Row, Col, Table,DatePicker,Input } from  'antd'
import reqwest from 'reqwest';
import moment from 'moment';
const dateFormat = 'YYYY-MM-dd';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// http://xx.com/project/editImportantEvent.do
// 参数
// projectOid
// content


// project/showImportantEvent.do
// projectOid


class Metters extends React.Component{
  componentWillMount() {

    let projectOid = localStorage.getItem('projectOid')
    let { data } = this.state

    reqwest({
      url:'/project/showImportantEvent.do',
      method:'POST',
      data:{
        projectOid:projectOid
      }
    }).then((result) =>{
      console.log(result)
      if( result.restCode === 200 ) {
        data = result.data
        for (let variable of data) {
          variable.isedit = false
        }
        this.setState({
          data:[...data]
        })
      }
    })
  }
  state={
     data:[],
     columns:[{
        title: '添加日期',
        dataIndex: 'createTime',
        render:(text, record, index) => {
          return (
            // <DatePicker defaultValue={moment(text, dateFormat)} disabled/>
            <div>
              {
                this.state.data[index].isedit?
                <DatePicker defaultValue={moment("2017-07-04", dateFormat)}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      }, {
        title: '事件内容',
        className: 'column-money',
        dataIndex: 'content',
        render:(text, record, index) => {
          return (
            <div>
              {
                this.state.data[index].isedit?
                <Input type="textarea"  autosize={{ minRows: 5, maxRows: 8 }} onChange={e =>this.textval(e, index)}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      }],
      addable:false,
      content:''
  }
  handleAdd = () => {
    const { data, addable } = this.state;
    let newData = {}
    for (var variable in data[0]) {
      if (data[0].hasOwnProperty(variable)) {
        newData[variable] = data[0][variable]
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
  save = () => {
    let { data, addable, content } = this.state;
    let projectOid = localStorage.getItem('projectOid')
    reqwest({
      url:'/project/editImportantEvent.do',
      method:'POST',
      data:{
        projectOid:projectOid,
        content:content
      }
    }).then((result) =>{
      console.log(result)
      if( result.restCode === 200 ) {
        alert('success')
        let len = data.length-1
        data[len].isedit = false
        this.setState({
          data:[...data],
          addable: false
        });
      }
    })
  }
  textval =(e,index) =>{
    console.log(e.target.value)
    let newval = e.target.value
    let {data} = this.state
    if (newval) {
      data[index].content = newval
      this.setState({
        data:[...data]
      })
    }

  }
  handleCancel =() => {
    const { data, addable } = this.state;
    data.splice(data.length - 1,1)
    this.setState({
      data: [...data],
      addable: false
    });
  }
  render(){
    const {addable} = this.state
    return(
      <div>
        <Row className="nav_head ">
          <Col offset={20}>
            {
              addable?
              <Button type="primary" onClick={this.handleCancel}>取消添加</Button>
              :
              <Button type="primary" onClick={this.handleAdd}>添加通报事项</Button>
            }
          </Col>
        </Row>
        <div style={{marginTop:'20px'}}>
        <Table
           columns={this.state.columns}
           dataSource={this.state.data}
           bordered
         />
        </div>
        <Row>
          <Col offset={18}>
            {
              addable?
              <Button type="primary" onClick={this.save}>保存</Button>
              :
              ''
            }
          </Col>
        </Row>
      </div>
    )
  }
}
export default Metters;
