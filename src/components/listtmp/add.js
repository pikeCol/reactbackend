import React from 'react';
import { Row, Col, Input, Select,Button, DatePicker, Table  } from 'antd';
const Option = Select.Option;

import { Modal } from 'antd';
const confirm = Modal.confirm;

const dateFormat = 'YYYY';

import reqwest from 'reqwest';
import $ from 'jquery';

import moment from 'moment';
import { Redirect } from 'react-router-dom'
import Myalert from '../common/alert'


export default class Listadd extends React.Component{
  state = {
    redirect:false,
    addable:true,
    tepname:'',
    type:'',
    size: 'default',
    data:[],
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
    mondata:[{
        name:'报表年',
        isedit:false
      }, {
        name:'报表月',
        isedit:false
      }, {
        name:'总资产',
        isedit:false
      }, {
        name:'净资产',
        isedit:false
      }, {
        name:'实收资本',
        isedit:false
      }, {
        name:'货币资本',
        isedit:false
      }, {
        name:'营收资本',
        isedit:false
      }, {
        name:'净利',
        isedit:false
    }],
    seadata:[{
        name:'报表年',
        isedit:false
      }, {
        name:'报表季度',
        isedit:false
      }, {
        name:'总资产',
        isedit:false
      }, {
        name:'净资产',
        isedit:false
      }, {
        name:'实收资本',
        isedit:false
      }, {
        name:'货币资本',
        isedit:false
      }, {
        name:'营收资本',
        isedit:false
      }, {
        name:'净利',
        isedit:false
    }],
    choosetype:false
  }
  changes = (e,index) => {
    let {data} = this.state
    let newval = e.target.value
    data[index].name = newval
    this.setState({
      data:[...data]
    })
    console.log(this.state.data)
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
  select = (val) => {
    let { data, mondata, seadata, choosetype, type } = this.state
    console.log(val)
    if ( val == 1 ) {
      this.setState({
        choosetype: true,
        type: val,
        data:[...mondata]
      })
    }
    if ( val == 2 ) {
      this.setState({
        choosetype: true,
        type: val,
        data:[...seadata]
      })
    }
  }
  showConfirm =()=> {

    let datas = this.state.data
    let pushdata = []
    for (var variable of datas) {
        pushdata.push(variable.name)
    }
    let that = this
    const { tepname } = this.state
    let { data } = this.state
    confirm({
      title: '模板创建或修改后不可删除，请仔细检查?',
      onOk() {
        $.ajax({
          url:'/template/add.do',
          method:'POST',
          traditional:true,
          data: {
            name:that.state.tepname,
            type:that.state.type,
            tableCol:[...pushdata]
          }
        }).then((result) => {
          let index = data.length-1
          if (result.restCode === 200) {
            data[index].isedit = false
            Myalert.success('success', '添加成功')
            that.setState({
              redirect: true,
              data:[...data]
            })
          } else {
            Myalert.error('Error', result.msg )
          }
        })
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  // save = () => {
  //   // let datas = this.state.data
  //   // let pushdata = []
  //   // for (var variable of datas) {
  //   //     pushdata.push(variable.name)
  //   // }
  //   // let that = this
  //   // // console.log(pushdata)
  //   // const { tepname } = this.state
  //
  //   this.showConfirm()
  //
  //
  // }
  nameChang = (val) => {
    let {tepname} = this.state
    tepname = val.target.value
    this.setState({
      tepname:tepname
    })
  }
  render(){
    const { size, choosetype} = this.state;

    if (this.state.redirect) {
      return(
        <Redirect to={'/menu/listtmp'} />
      )
    }

    return(
      <div style={{paddingLeft:'20px'}}>
        <Row type="flex" style={{marginTop:'40px'}}>
          <Col span={2} style={{lineHeight:'28px'}}>模板名称</Col>
          <Col span={4}><Input placeholder="Basic usage" onChange={this.nameChang}/></Col>
        </Row>
        <Row type="flex" style={{marginTop:'40px',margiLeft:'20px'}}>
          <Col span={2} style={{lineHeight:'28px'}}>报表模板</Col>
          <Col span={2}>表报性质</Col>
          <Col span={4}>
            <Select
              size={size}
              defaultValue="请选择"
              style={{ width: 200 }}
              onSelect={this.select}
            >
            <Option key="2">季度报表</Option>
            <Option key="1">月度报表</Option>
          </Select>
          </Col>
          {/* <Col span={4} offset={2}><Button type="primary">调用模板</Button></Col> */}
        </Row>
        {
          choosetype?
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
          :
          ''
        }

        <Table
          dataSource={this.state.data}
           columns={this.state.columns}
           bordered
           style={{width:'100px'}}
           pagination={false}
         />
         {
           choosetype?
           <Row>
             <Col offset={16}>
               <Button type="primary" onClick={this.showConfirm}>保存</Button>
             </Col>
           </Row>
           :
           ''
         }

      </div>
    )
  }
}
