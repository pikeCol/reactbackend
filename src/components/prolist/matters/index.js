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
      data:{
        projectOid:projectOid
      }
    }).then((result) =>{
      console.log(result)
      if( result.restCode === 200 ) {
        data = result.rows
        data.isedit = false
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
        dataIndex: 'date',
        render:(text, record, index) => {
          return (
            // <DatePicker defaultValue={moment(text, dateFormat)} disabled/>
            <div>
              {
                this.state.data[index].isedit?
                <DatePicker defaultValue={moment(text, dateFormat)}/>
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
                <p>{text}</p>
                :
                <Input type="textarea"  autosize={{ minRows: 5, maxRows: 8 }} onChange={() =>this.textval(e)}/>
              }
            </div>
          )
        }
      }],
      addable:false
  }
  // add = () => {
  //   const { columns, data } = this.state;
  //   const newData = {
  //     date: ``,
  //     content: ` Pasdsadrk Lane no.dfasdfasd`,
  //   };
  //   this.setState({
  //     data: [...data, newData]
  //   });
  // }
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
  textval =(e) =>{
    console.log(e.target.value)
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
      </div>
    )
  }
}
export default Metters;
