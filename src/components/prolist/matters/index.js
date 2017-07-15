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
    reqwest({
      url:'/project/showImportantEvent.do',
      data:{
        projectOid:projectOid
      }
    }).then((result) =>{
      console.log(result)

    })
  }
  state={
     data:[],
     columns:[{
        title: '添加日期',
        dataIndex: 'date',
        render:(text, record, index) => {
          return (
            <DatePicker defaultValue={moment(text, dateFormat)} disabled/>
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
                true?
                <p>{text}</p>
                :
                <Input type="textarea"  autosize={{ minRows: 5, maxRows: 8 }} onChange={() =>this.textval(e)}/>
              }
            </div>
          )
        }
      }]
  }
  add = () => {
    const { columns, data } = this.state;
    const newData = {
      date: ``,
      content: ` Pasdsadrk Lane no.dfasdfasd`,
    };
    this.setState({
      data: [...data, newData]
    });
  }
  textval =(e) =>{
    console.log(e.target.value)
  }
  render(){
    return(
      <div>
        <Row className="nav_head ">
          <Col offset={20}>
            <Button type="primary" onClick={this.add}>添加通报事项</Button>
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
