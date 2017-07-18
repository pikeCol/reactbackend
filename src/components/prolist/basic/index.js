import React from 'react';
import { Table, Row, Col, Input, Button } from 'antd';
import reqwest from 'reqwest';

import EditableCell from '../../common/editablecell'

const columns = [{
    title: '项目编码',
    dataIndex: 'templateOid'
  }, {
    title: '公司名称',
    dataIndex: 'companyName'
  }, {
    title: '主营业务',
    dataIndex: 'mainBusiness'
  }, {
    title: '注册资本',
    dataIndex: 'regCapital'
  },{
    title: '实缴资本',
    dataIndex: 'contributedCapital'
  },{
    title: '我方投资方',
    dataIndex: 'ourInvestors'
  },{
    title: '我方持股比例',
    dataIndex: 'ourRate'
  },{
    title: '实投金额',
    dataIndex: 'actualAmount'
  },{
    title: '我方投资时间',
    dataIndex: 'ourInvestmentTime'
}];

export default class Basic extends React.Component{
  state={
    data:{
      project:[],
      projectPartents:[]
    },
    columnsPartents : [{
        title: '股东名称',
        dataIndex: 'name',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
      }, {
        title: '投资时间',
        dataIndex: 'investmentTime',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
      }, {
        title: '持股比例',
        dataIndex: 'rate',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
      }, {
        title: '认缴资本',
        dataIndex: 'subscribedCapital',
        render: (text, record, index) => <EditableCell value={text} isedit={this.state.editable}/>
      },{
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
    }],
    editable:false,
    value:'dfka'
  }
  handleAdd = () => {
    const { projectPartents, project } = this.state.data;
    const newData = {
      key:'22',
      "name":'22',
      "investmentTime":'22',
      "rate":'22',
      "subscribedCapital":'22',
      "contributedCapital":'22'
    }
    this.setState({
      data:{
        project:[...project],
        projectPartents:[...projectPartents,newData]
      }
    })
  }
  onDelete = () => {
    const { projectPartents, project } = this.state.data
    let len = projectPartents.length
    projectPartents.splice(len-1, 1)
    this.setState({
      data:{
        project:[...project],
        projectPartents:projectPartents
      }
    })
  }
  edit = () => {
    const { columnsPartents } = this.state;
    this.setState({
      editable: !this.state.editable,
      columnsPartents: columnsPartents
    });
  }
  componentWillMount(){
    let that = this
    let oid = this.props.location.state.oid? this.props.location.state.oid:localStorage.getItem('projectOid')
    localStorage.setItem('projectOid',oid)
    let { projectPartents, project } = this.state.data
    reqwest({
      // url: '../../api/data.json',
      url: '/project/showBaseInfo.do',
      data: {
        projectOid: oid
      },
    }).then((result) => {
        console.log(result)
        if (result.restCode ===200) {
          project[0] = result.data.project
          projectPartents = result.data.projectPartents
          that.setState({
            data:{
              project:[...project],
              projectPartents:[...projectPartents]
            }
          })
          console.log(this.state.data.project)
        }

    });
  }
  render(){
    const { value, editable } = this.state;

    return(
      <div style={{paddingTop:'20px'}}>
        <Row>
          <Col span={2} offset={2}>
            目标名称
          </Col>
          <Col span={6}>
            {
              editable?
              <div className="editable-cell-input-wrapper">
                <Input
                  value={value}
                />
              </div>
              :
              <div className="editable-cell-input-wrapper">
                {value || ' '}
              </div>
            }
          </Col>
        </Row>
        <Row>
          <Col offset={2} className="listtitle">
            <h6>项目简介</h6>
          </Col>
          <Col span={20} offset={2}>
             <Table columns={columns} dataSource={this.state.data.project} size="middle" pagination={false}  />
          </Col>
        </Row>
       <Row>
        <Col offset={2} className="listtitle">
          <h6>股东结构</h6>
        </Col>
        {
            editable?
            <Col offset={2} className="listtitle">
                <Button type="primary" style={{marginRight:'10px'}} onClick={this.handleAdd}>添加</Button>
                <Button type="primary" onClick={this.onDelete}>删除</Button>
            </Col>
            :''
          }
        <Col span={20} offset={2}>
           <Table columns={this.state.columnsPartents} dataSource={this.state.data.projectPartents} size="middle" pagination={false}  />
        </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>董事会/监事会结构</h6>
       </Col>
       <Col span={20} offset={2}>
          <Table columns={this.state.columnsPartents} dataSource={this.state.data.projectPartents} size="middle" pagination={false}  />
       </Col>
     </Row>
     <Row>
      <Col offset={2} className="listtitle">
        <h6>重要条款</h6>
      </Col>
      <Col span={20} offset={2}>
        <Input type="textarea" autosize={{ minRows: 5, maxRows: 8 }} />
      </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>备注</h6>
       </Col>
       <Col span={20} offset={2}>
         <Input type="textarea" autosize={{ minRows: 5, maxRows: 8 }} />
       </Col>
      </Row>
      <Row type="flex" justify="center" style={{paddingTop:'30px'}}>
        <Button type="primary" onClick={this.edit}>{this.state.editable?'保存':'编辑'}</Button>
      </Row>
      </div>
    )
  }
}
