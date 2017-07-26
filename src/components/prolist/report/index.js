import React from 'react';
import { DatePicker, Button, Row, Col, Input, Table } from 'antd';
import moment from 'moment';
// const { MonthPicker } = DatePicker;
import reqwest from 'reqwest';
const dateFormat = 'YYYY';
const monthFormat = 'MM';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Myalert from '../../common/alert'

import globalPemission from '../../common/permission'


class Report extends React.Component{
  state={
    data:[],
    columns:[{
      title:'报表年',
      dataIndex:'val1',
      render:(text, record, index) => this.renderColumns(this.state.data, index, 'val1', text)
    }, {
      title:'报表月',
      dataIndex:'val2',
      render:(text, record, index) => this.renderColumns(this.state.data, index, 'val2', text)
    }, {
      title:'最新总资产',
      dataIndex:'val3',
      render:(text, record, index) => this.inputColumns(this.state.data, index, 'val3', text)
    }, {
      title:'最新净资产',
      dataIndex:'val4',
      render:(text, record, index) => this.inputColumns(this.state.data, index, 'val4', text)
    }, {
      title:'最新实收资本',
      dataIndex:'val5',
      render:(text, record, index) => this.inputColumns(this.state.data, index, 'val5', text)
    }, {
      title:'最新货币资金',
      dataIndex:'val6',
      render:(text, record, index) => this.inputColumns(this.state.data, index, 'val6', text)
    }],
    editable: false,
    addable:false,
    year:''
  }
  renderColumns(data, index, key, text) {
    const { isedit } = data[index];
    if ( isedit == false) {
      return text;
    }
    if ( key == 'val1' ) {
      return (<DatePicker defaultValue={moment('2017', dateFormat)}/>);
    }
    if ( key == 'val2' ) {
      return (<MonthPicker defaultValue={moment('1', 'MM')} />);
    }
  }
  inputColumns = (data, index, key, text) => {
    const { isedit } = data[index];
    const { editable } = this.state;
    // console.log(editable)
    if (editable) {
      return (
        <Input defaultValue={text} onChange={(e)=>this.handleChange(e,data,index,key)}/>
      )
    }
    if ( isedit == false) {
      return text;
    }
    return (<Input defaultValue={text} onChange={(e)=>this.handleChange(e,data,index,key)}/>);
  }
  // myrender = (text, record, index) => {
  //   return(
  //     this.inputColumns(this.state.data, index, 'val6', text)
  //   )
  // }
  handleChange = (e,data,index,key) => {
     let newval = e.target.value
     let datas = [...this.state.data]
     if (datas[index][key] != newval) {
       datas[index][key] = newval
       this.setState({
         data:[...datas]
       })
     }
  }

  componentWillMount () {
    let projectOid = localStorage.getItem('projectOid')
    let { data } = this.state
    reqwest({
      url:'/project/showReportData.do',
      data:{
        projectOid:projectOid
      }
      // url:'../../../api/item0.json',
    }).then((result)=>{
      // console.log(result)
      // templateDetails
      data = result.data.reportDatas
      // let templateDetails = result.data.reportDatas
       for (let variable of data) {
         variable.isedit = false
       }
       // 获取表头信息
      let _cols = result.data.templateDetails
      var str = 'val';
      if (_cols.length > 5) {
        for (var count = 5; count < _cols.length; count++) {
          let txt = str + count
          _cols[count].title = _cols[count].title
          _cols[count].dataIndex = _cols[count].valCode
          _cols[count].render = ((text, record, index) => this.inputColumns(this.state.data, index, txt, text))
        }
      }
      this.setState({
        data:[...data]
      })
    })
  }
  filter = () => {
    let projectOid = localStorage.getItem('projectOid')
    let { year, data } = this.state
    reqwest({
      url:'/project/filterReportData.do',
      data: {
        projectOid:projectOid,
        year:year || '2017'
      }
    }).then((result) => {

      // console.log(result)
      // templateDetails
      data = result.data.reportDatas
      // let templateDetails = result.data.reportDatas
       for (let variable of data) {
         variable.isedit = false
       }
       // 获取表头信息
      let _cols = result.data.templateDetails
      var str = 'val';
      if (_cols.length > 5) {
        for (var count = 5; count < _cols.length; count++) {
          let txt = str + count
          _cols[count].title = _cols[count].title
          _cols[count].dataIndex = _cols[count].valCode
          _cols[count].render = ((text, record, index) => this.inputColumns(this.state.data, index, txt, text))
        }
      }
      this.setState({
        data:[...data]
      })

    })
  }
  handleAdd = () => {
    const { data } = this.state;
    let newData = {}
    for (var variable in data[0]) {
      if (data[0].hasOwnProperty(variable)) {
        newData[variable] = data[0][variable]
      }
    }
    // let newData = data[0];
    console.log(newData)
    newData.isedit = true;
    this.setState({
      data: [...data, newData],
      addable: true
    });
    // alert(this.state.data[1].editable)
  }
  handleCancel =() => {
    const { data } = this.state;
    data.splice(data.length - 1,1)
    this.setState({
      data: [...data],
      addable: false
    });
  }
  // 编辑
  eidt = () =>{
    this.setState({
      editable: !this.state.editable
    })
  }
  // 保存
  save = () => {
    let {data,editable} = this.state
    reqwest({
      url:'/project/editReportData.do',
      method:'POST',
      data:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((result) =>{
      console.log(result)
      if(result.restCode === 200) {
        this.setState({
          editable:false
        })
      }
    })
  }
  // 提交
  upload = () => {
    let {data,addable} = this.state
    let index = data.length-1
     data[index].isedit = false
     let datas = data[index]
    reqwest({
      url:'/project/addReportData.do',
      method:'POST',
      // data:mydata
      data:{
        projectOid:datas.projectOid,
        templateOid:datas.templateOid,
        val1:datas.val1,
        val2:datas.val2,
        val3:datas.val3,
        val4:datas.val4,
        val5:datas.val5,
        val6:datas.val6,
        val7:datas.val7,
        val8:datas.val8,
        val9:datas.val9,
        val10:datas.val10,
        val11:datas.val11,
        val12:datas.val12,
        val13:datas.val13,
        val14:datas.val14,
        val15:datas.val15,
        val16:datas.val16,
        val17:datas.val17,
        val18:datas.val18,
        val19:datas.val19,
        val20:datas.val20,
        val21:datas.val21,
        val22:datas.val22,
        val23:datas.val23,
        val24:datas.val24,
        val25:datas.val25,
        val26:datas.val26,
        val27:datas.val27,
        val28:datas.val28,
        val29:datas.val29,
        val30:datas.val30,
        val31:datas.val31,
        val32:datas.val32,
        val33:datas.val33,
        val34:datas.val34,
        val35:datas.val35,
        val36:datas.val36,
        val37:datas.val37,
        val38:datas.val38,
        val39:datas.val39,
        val40:datas.val40,
        val41:datas.val41,
        val42:datas.val42,
        val43:datas.val43,
        val44:datas.val44,
        val45:datas.val45,
        val46:datas.val46,
        val47:datas.val47,
        val48:datas.val48,
        val49:datas.val49,
        val50:datas.val50
      }
    }).then((result) =>{
      console.log(result)
      if(result.restCode === 200) {
        Myalert.success('success', '添加成功')
        this.setState({
          data:[...data],
          addable:false
        })
      }
    })
  }
  output = () => {
    let projectOid = localStorage.getItem('projectOid')
    const {year} = this.setState
    let url = document.location.origin+'/project/export.do?projectOid='+projectOid+'&year='+year
    // console.log(url)
    window.open(url)
  }

  select = (date, datastring) => {
    this.setState({
      year:datastring
    })
  }
  render(){
    const {editable, addable}=this.state
    return(
      <div>
        <Row >
          <Col span={4} offset={2}>
            <DatePicker defaultValue={moment('2017', dateFormat)} format={dateFormat} onChange={this.select}/>
          </Col>
          <Col>
            <Button type="primary" onClick={this.filter}>筛选</Button>
          </Col>
         </Row>
        <Row style={{paddingTop:'20px'}}>
          <Col offset={16}>
            {
              globalPemission.indexOf('exportReport')>=0?
              <Button type="primary" onClick={this.output}>导出所选报表</Button>
              :''
            }
            {globalPemission.indexOf('addReport')>=0?
              <span>
                {
                  addable?
                  <Button type="primary" style={{margin:'0 10px'}} onClick={this.handleCancel}>取消报表</Button>
                  :
                  <span>
                    <Button type="primary" style={{margin:'0 10px'}} onClick={this.handleAdd}>添加报表</Button>
                    {
                      globalPemission.indexOf('editReport')>=0?
                      <Button type="primary" onClick={this.eidt}>
                        {
                          editable?
                          '取消编辑'
                          :
                          '编辑报表'
                        }
                      </Button>:''
                    }
                  </span>
                }
              </span>:''
            }
          </Col>
        </Row>
        <Row style={{paddingTop:'20px'}}>
          <Col offset={2} span={20}>
           <Table
             columns={this.state.columns}
             dataSource={this.state.data}
            />
          </Col>
        </Row>

        <Row style={{marginTop:'20px'}}>
          {
            editable?
            <Col offset={20} span={2}>
              <Button type="primary" onClick={this.save}>保存</Button>
            </Col>
            :''
          }
        </Row>
        <Row style={{marginTop:'20px'}}>
          {
            addable?
            <Col offset={20} span={2}>
              <Button type="primary" onClick={this.upload}>提交</Button>
            </Col>
            :''
          }
        </Row>

      </div>
    )
  }
}
export default Report;
