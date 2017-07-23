import React from 'react';
import { Table, Row, Col, Input, Button, Select, DatePicker } from 'antd';
import reqwest from 'reqwest';
const Option = Select.Option;

import Myalert from '../../common/alert'


const  columnsPartents = [{
        title: '董事会人数',
        dataIndex: 'boardNumber',
        render: (text, record, index) => text
      }, {
        title: '董事会我方委派人员',
        dataIndex: 'ourBoardPerson',
        render: (text, record, index) => text
      }, {
        title: '监事会人数',
        dataIndex: 'boardOfVisitorsNumber',
        render: (text, record, index) => text
      }, {
        title: '监事会我方委派人员',
        dataIndex: 'ourBoardOfVisitorsPerson',
        render: (text, record, index) => text
      }]



export default class Basic extends React.Component{
  state={
    _Partents : [{
        title: '股东姓名',
        dataIndex: 'name',
        render: (text, record, index) => {
          return(
            <div>
            {
              this.state.data.projectPartents[index].isedit?

              <Input onChange={e => this.addinput(e, index, 'name')}/>
              :
              <p>{text}</p>
            }
            </div>
          )
        }
      }, {
        title: '投资时间',
        dataIndex: 'investmentTime',
        render: (text, record, index) => {
          return(
            <div>
            {
              this.state.data.projectPartents[index].isedit?
              <DatePicker onChange={(date, dateString) =>this.datetime(date, dateString,'investmentTime', index)}/>
              // <Input onChange={e => this.addinput(e, index, 'name')}/>
              :
              <p>{text}</p>
            }
            </div>
          )
        }
      }, {
        title: '持股比例',
        dataIndex: 'rate',
        render: (text, record, index) => {
          return(
            <div>
            {
              this.state.data.projectPartents[index].isedit?
              <Input onChange={e => this.addinput(e, index, 'rate')}/>
              :
              <p>{text}</p>
            }
            </div>
          )
        }
      }, {
        title: '认缴资本',
        dataIndex: 'subscribedCapital',
        render: (text, record, index) => {
          return(
            <div>
            {
              this.state.data.projectPartents[index].isedit?
              <Input onChange={e => this.addinput(e, index, 'subscribedCapital')}/>
              :
              <p>{text}</p>
            }
            </div>
          )
        }
      }, {
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render: (text, record, index) => {
          return(
            <div>
            {
              this.state.data.projectPartents[index].isedit?
              <Input onChange={e => this.addinput(e, index, 'contributedCapital')}/>
              :
              <p>{text}</p>
            }
            </div>
          )
        }
      }],
     columns: [{
        title: '项目编码',
        dataIndex: 'templateOid',
        render:(text, record, index) => <p>{text}</p>
      }, {
        title: '公司名称',
        dataIndex: 'companyName',
        render:(text, record, index) => <p>{text}</p>
      }, {
        title: '主营业务',
        dataIndex: 'mainBusiness',
        render:(text, record, index) => <p>{text}</p>
      }, {
        title: '注册资本',
        dataIndex: 'regCapital',
        render:(text, record, index) => <p>{text}</p>
      },{
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render:(text, record, index) => <p>{text}</p>
      },{
        title: '我方投资方',
        dataIndex: 'ourInvestors',
        render:(text, record, index) => <p>{text}</p>
      },{
        title: '我方持股比例',
        dataIndex: 'ourRate',
        render:(text, record, index) => <p>{text}</p>
      },{
        title: '实投金额',
        dataIndex: 'actualAmount',
        render:(text, record, index) => <p>{text}</p>
      },{
        title: '我方投资时间',
        dataIndex: 'ourInvestmentTime',
        render:(text, record, index) => <p>{text}</p>
    }],
    data:{
      project:{},
      projectPartents:[]
    },
    editable:false,
    opt:[]
  }
  datetime = (date, dateString, key, index) => {
    console.log(date, dateString, key)
    const {data} = this.state
    data.projectPartents[index][key] = dateString
    this.setState({
      data
    })
  }
  addinput = (e, index, key) => {
    const {data} = this.state
    data.projectPartents[index][key] = e.target.value
    this.setState({data})
  }
  inputchange = (e, names) => {
    const {data} = this.state
    console.log(data)
    data.project[names] = e.target.value
    this.setState({
      data
    })
  }
  handleAdd = () => {
    const { projectPartents, project } = this.state.data;
    const newData = {
      "name":'',
      "investmentTime":'',
      "rate":'',
      "subscribedCapital":'',
      "contributedCapital":''
    }
    newData.isedit = true
    this.setState({
      data:{
        project:project,
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
        project:project,
        projectPartents:projectPartents
      }
    })
  }
  edit = () => {
    // const { columnsPartents } = this.state;
    this.setState({
      editable: true,
      // columnsPartents: columnsPartents
    });
  }
  save = () => {
    const { data  } = this.state
    console.log(data)
    reqwest({
      url:'/project/editBaseInfo.do',
      data:JSON.stringify(data),
      method:'POST'
    }).then((result) => {
      if (result.restCode ===200) {
        // isedit
        for ( let variable of data.projectPartents) {
          if (variable.isedit == true) {
            variable.isedit = false
          }
        }

        Myalert.success('success', '保存成功')
        this.setState({
          editable: true,
          data
        })

      }

    })

  }
  componentWillMount(){

    let _state =  this.props.location.state
    console.log(_state)
    let oid =_state?_state.oid:localStorage.getItem('projectOid')
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
          project = result.data.project
          projectPartents = result.data.projectPartents
          this.setState({
            data:{
              project:project,
              projectPartents:[...projectPartents]
            }
          })
          console.log(this.state.data.project)
        }
    });

  }
  importantClause = (e,key) => {
    const { data } = this.state
    data.project[key] = e.target.value
    this.setState({
      data
    })
  }
  render(){
    const { value, editable, opt } = this.state;
    const children = [];
    for (let variable of opt) {
      children.push(<Option key={variable.oid}>{variable.name}</Option>);
    }
    return(
      <div style={{paddingTop:'20px'}}>
        <Row>
          <Col span={2} offset={2}>
            项目名称
          </Col>
          <Col span={4} >
            <Input
              value={this.state.data.project.projectName}
              onChange={e => this.inputchange(e,'projectName')}
            />
          </Col>
          <Col span={2} offset={2}>
            目标名称
          </Col>
          <Col span={6}>
              <div>
                {
                  editable?
                  <div className="editable-cell-input-wrapper">
                    <Input value={this.state.data.project.templateName}  onChange={e =>this.importantClause(e, 'templateName')}/>
                  </div>
                  :
                  <div className="editable-cell-input-wrapper">
                    {this.state.data.project.templateName}
                  </div>
                }
              </div>
          </Col>
        </Row>
        <Row>
          <Col offset={2} className="listtitle">
            <h6>项目简介</h6>
          </Col>
          <Col span={20} offset={2}>
              <Table columns={this.state.columns}  dataSource={[this.state.data.project]} size="middle" pagination={false}  />
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
           <Table columns={this.state._Partents} dataSource={this.state.data.projectPartents} size="middle" pagination={false}  />
        </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>董事会/监事会结构</h6>
       </Col>
       <Col span={20} offset={2}>
          <Table columns={columnsPartents} dataSource={[this.state.data.project]} size="middle" pagination={false}  />
       </Col>
     </Row>
     <Row>
      <Col offset={2} className="listtitle">
        <h6>重要条款</h6>
      </Col>
      <Col span={20} offset={2}>
        <Input type="textarea"  onChange={e =>this.importantClause(e, 'importantClause')} autosize={{ minRows: 5, maxRows: 8 }} />
      </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>备注</h6>
       </Col>
       <Col span={20} offset={2}>
         <Input type="textarea"  onChange={e =>this.importantClause(e, 'remarke')} autosize={{ minRows: 5, maxRows: 8 }} />
       </Col>
      </Row>
      <Row type="flex" justify="center" style={{paddingTop:'30px'}}>
        {
          this.state.editable?
          <Button type="primary" onClick={this.save}>保存</Button>
          :
          <Button type="primary" onClick={this.edit}>编辑</Button>
        }
      </Row>
      </div>
    )
  }
}
