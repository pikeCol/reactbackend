import React from 'react';
import { Row, Col, Input, Select,Button, DatePicker, Table  } from 'antd';
const Option = Select.Option;

const dateFormat = 'YYYY';

import reqwest from 'reqwest';

import moment from 'moment';
import Myalert from '../common/alert'
import { Redirect } from 'react-router-dom'


class Listedit extends React.Component{
  state = {
    redirect:false,
    addable:true,
    type:'',
    size: 'default',
    columns:[{
      title:'',
      dataIndex:'name',
      render: (text, record, index) =>{
        let {isedit} = this.state.data[index]
        return(
          <div>
            {
              isedit?
              <Input onChange={e =>this.changes(e, index)}/>
              :
              <p>{text}</p>
            }
          </div>
        )
      }
    }],
    data:[],
    datalen:'',
    total:{
    },
    choosetype:''
  }
  componentWillMount () {
    console.log(this.props.location)
    if (this.props.location.state) {

      var oid = this.props.location.state.oid
      reqwest({
        url:'/template/template.do',
        method:'POST',
        data: {
          templateOid:oid
        }
      }).then((result) => {
        let { data } = this.state
        console.log(result)
        if (result.restCode === 200) {
           data = result.data.template.tableHead
           for (var variable of data) {
               variable.isedit = false
           }
           let totals = result.data.template
           let type = totals.type + ''
           this.setState({
             total: totals,
             data: [...data],
             choosetype: type,
             datalen:data.length
           })
        }
        console.log(this.state.total)
      })
    }
  }
  save = () => {
    const {data,total,choosetype, datalen} = this.state
    let index = data.length-1
    let _datalength = datalen-1
    console.log(data[index].name)
    if (  !data[index].name ) {
      Myalert.success('success', '编辑成功')
      this.setState({
        redirect:true
      })
      return
    }
    if (!total.name) {
      Myalert.erros('Error', '请输入名字')
      return
    }
    reqwest({
      url:'/template/details.do',
      method:'POST',
      data: {
        name:total.name,
        templateOid:this.props.location.state.oid,
        tableCol:data[index].name
      }
    }).then((result) => {
      let { data } = this.state
      if (result.restCode === 200) {
        data[index].isedit = false
        Myalert.success('success', '编辑成功')
        this.setState({
          redirect:true,
          data:[...data]
        })

      } else {
        Myalert.error('Error', result.msg)
      }
    })
  }
  changes = (e,index) => {
    let {data} = this.state
    let newval = e.target.value
    data[index].name = newval
    this.setState({
      data:[...data]
    })
  }
  adddatas =() => {
    let { data }=this.state
    let newdata={
      name:'',
      isedit:true
    }

    this.setState({
        data:[...data, newdata],
        addable:false
      })
  }
  delete =() => {
    let { data }=this.state
    let len = data.length-1
    if (len<8) return
    data.splice(len,1)
    this.setState({
        data:[...data],
        addable:true
      })
  }
  select = (val) => {
    let { columns, moncolumns, seacolumns, choosetype } = this.state
    console.log(val)
    // if ( val == 1 ) {
    //   this.setState({
    //     choosetype: true,
    //     columns:[...moncolumns]
    //   })
    // }
    // if ( val == 2 ) {
    //   this.setState({
    //     choosetype: true,
    //     columns:[...seacolumns]
    //   })
    // }
  }
  nameChang = (val) => {
    const {total} = this.state
    total.name = val.target.value
    this.setState({
      total:{...total}
    })
    console.log(this.state.total)
  }
  render(){
    const { size, choosetype } = this.state;

    if (this.state.redirect) {
      return(
        <Redirect to={'/menu/listtmp'} />
      )
    }

    // console.log(total)
    // const val = total.type
    return(
      <div style={{paddingLeft:'20px'}}>
        <Row type="flex" style={{marginTop:'40px'}}>
          <Col span={4} style={{lineHeight:'28px'}}>模板名称</Col>
          <Col span={6}><Input placeholder="Basic usage" onChange={this.nameChang} value={this.state.total.name}/></Col>
        </Row>
        <Row type="flex" style={{marginTop:'40px',margiLeft:'20px'}}>
          <Col span={4} style={{lineHeight:'28px'}}>模板名称</Col>
          <Col span={4}>表报性质</Col>
          <Col span={4}>
            <Select
              size={size}
              value={choosetype}
              style={{ width: 200 }}
              disabled
            >
            <Option key="2">季度报表</Option>
            <Option key="1">月度报表</Option>
          </Select>
          </Col>
          {/* <Col span={4} offset={2}><Button type="primary">调用模板</Button></Col> */}
        </Row>
        <Row style={{margin:'40px 0 20px'}}>
          <Col span={2}>
            {
              this.state.addable?
              <Button type="primary" onClick={this.adddatas}>添加</Button>
              :
              <Button type="primary" onClick={this.delete}>取消添加</Button>
            }
          </Col>
        </Row>
        <Table
           columns={this.state.columns}
           dataSource={this.state.data}
           style={{width:'100px'}}
           bordered
           pagination={false}
         />
         <Row>
           <Col offset={16}>
             <Button type="primary" onClick={this.save}>保存</Button>
           </Col>
         </Row>
      </div>
    )
  }
}
export default Listedit;
