import React from 'react';
import { Button, Row, Col, Table,Input } from  'antd'
import reqwest from 'reqwest';
import $ from 'jquery'
// import moment from 'moment';
// const dateFormat = 'YYYY-MM-dd';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

import Myalert from '../../common/alert'

// http://xx.com/project/editImportantEvent.do
// 参数
// projectOid
// content

import globalPemission from '../../common/permission'

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
            <p>{text}</p>
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
    var mydate = new Date();
    var y=mydate.getFullYear()
    var m=mydate.getMonth() + 1
    if (m>=1 && m<=9){
      m= "0" +m
    }
    var d=mydate.getDate()
    var time = y+'-'+m+'-'+d
    let newData = {
      "createTime":time,
      "content":''
    }
    newData.isedit = true;
    this.setState({
      data: [...data, newData],
      addable: true
    });
    // alert(this.state.data[1].editable)
  }
  save = () => {
    const { data, addable, content } = this.state;
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
        Myalert.success('success', '添加成功')
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
    let {data, content} = this.state
    if (newval) {
      data[index].content = newval
      this.setState({
        data:[...data],
        content:newval
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
          {
            globalPemission.indexOf('addImportantItem')>=0?
            <Col offset={20}>
              {
                addable?
                <Button type="primary" onClick={this.handleCancel}>取消添加</Button>
                :
                <Button type="primary" onClick={this.handleAdd}>添加通报事项</Button>
              }
            </Col>:''
          }
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
