import React from 'react';
import { Table, Row, Col, Input, Button, Select, DatePicker } from 'antd';
import reqwest from 'reqwest';
const Option = Select.Option;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import moment from 'moment';

import Myalert from '../../common/alert'
import globalPemission from '../../common/permission'


export default class Basic extends React.Component{
  constructor() {
    super()
    this.columnsPartents = [{
          title: '董事会人数',
          dataIndex: 'boardNumber',
          render:(text) => {
            return(
              <div>
                {
                  this.state.editable?
                  <Input defaultValue={text} onChange={e => this.importantClause(e, 'boardNumber')}/>
                  :
                  <p>{text}</p>
                }
              </div>
            )
          }
        }, {
          title: '董事会我方委派人员',
          dataIndex: 'ourBoardPerson',
          render:(text) => {
            return(
              <div>
                {
                  this.state.editable?
                  <Input defaultValue={text} onChange={e => this.importantClause(e, 'ourBoardPerson')}/>
                  :
                  <p>{text}</p>
                }
              </div>
            )
          }
        }, {
          title: '监事会人数',
          dataIndex: 'boardOfVisitorsNumber',
          render:(text) => {
            return(
              <div>
                {
                  this.state.editable?
                  <Input defaultValue={text} onChange={e => this.importantClause(e, 'boardOfVisitorsNumber')}/>
                  :
                  <p>{text}</p>
                }
              </div>
            )
          }
        }, {
          title: '监事会我方委派人员',
          dataIndex: 'ourBoardOfVisitorsPerson',
          render:(text) => {
            return(
              <div>
                {
                  this.state.editable?
                  <Input defaultValue={text} onChange={e => this.importantClause(e, 'ourBoardOfVisitorsPerson')}/>
                  :
                  <p>{text}</p>
                }
              </div>
            )
          }
        }]

  }



  state={
    _Partents : [{
        title: '股东姓名',
        dataIndex: 'name',
        render: (text, record, index) => {
          return(
            <div>
            {
              this.state.editable?
              <Input defaultValue={text} onChange={e => this.addinput(e, index, 'name')}/>
              :
              <p>{text}</p>
            }
            </div>
          )
        }
      }, {
        title: '投资时间',
        dataIndex: 'investmentTimeString',
        render: (text, record, index) => {
          // let _text = text||'2017'
          return(
            <div>
            {
              this.state.editable?
              // <DatePicker value={moment(text, 'YYYY-MM-DD')}  onChange={(date, dateString) =>this.datetime(date, dateString,'investmentTime', index)}/>

              <div>
                {
                  text?
                  <DatePicker value={moment(text)}  onChange={(date, dateString) =>this.datetime(date, dateString,'investmentTime', index)}/>
                  :
                  <DatePicker  onChange={(date, dateString) =>this.datetime(date, dateString,'investmentTime', index)}/>
                }
              </div>
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
              this.state.editable?
              <Input defaultValue={text} onChange={e => this.addinput(e, index, 'rate')}/>
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
              this.state.editable?
              <Input defaultValue={text} onChange={e => this.addinput(e, index, 'subscribedCapital')}/>
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
              this.state.editable?
              <Input defaultValue={text} onChange={e => this.addinput(e, index, 'contributedCapital')}/>
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
        render:(text) => {
          return(
            <p>{text}</p>
          )
        }
      }, {
        title: '公司名称',
        dataIndex: 'companyName',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'companyName')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      }, {
        title: '主营业务',
        dataIndex: 'mainBusiness',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'mainBusiness')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      }, {
        title: '注册资本',
        dataIndex: 'regCapital',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'regCapital')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      },{
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'contributedCapital')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      },{
        title: '我方投资方',
        dataIndex: 'ourInvestors',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'ourInvestors')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      },{
        title: '我方持股比例',
        dataIndex: 'ourRate',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'ourRate')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      },{
        title: '实投金额',
        dataIndex: 'actualAmount',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                <Input defaultValue={text} onChange={e => this.importantClause(e, 'actualAmount')}/>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
      },{
        title: '我方投资时间',
        dataIndex: 'ourInvestmentTimeString',
        render:(text) => {
          return(
            <div>
              {
                this.state.editable?
                // <DatePicker value={moment(text, 'YYYY-MM-DD')} onChange={(date, dateString) =>this.protime(date, dateString,'ourInvestmentTime')}/>
                <div>
                  {
                    text?
                    <DatePicker value={moment(text)}  onChange={(date, dateString) =>this.protime(date, dateString,'ourInvestmentTime')}/>
                    :
                    <DatePicker  onChange={(date, dateString) =>this.protime(date, dateString,'ourInvestmentTime')}/>
                  }
                </div>
                :
                <p>{text}</p>
              }
            </div>
          )
        }
    }],
    data:{
      project:{},
      projectPartents:[],
      templateName:''
    },
    editable:false,
    opt:[],
    datalen:''
  }
  protime = (date, dateString,key) => {
    const {data} = this.state
    data.project[key] = dateString
    data.project.ourInvestmentTimeString = dateString
    this.setState({
      data
    })
  }
  datetime = (date, dateString, key, index) => {
    const {data} = this.state
    data.projectPartents[index][key] = dateString
    data.projectPartents[index].investmentTimeString = dateString
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
    // console.log(data)
    data.project[names] = e.target.value
    this.setState({
      data
    })
  }
  handleAdd = () => {
    const { projectPartents, project } = this.state.data;
    let _state =  this.props.location.state
    let oid =_state?_state.oid:localStorage.getItem('projectOid')
    const newData = {
      'name':'',
      'investmentTimeString':'',
      'rate':'',
      'subscribedCapital':'',
      'contributedCapital':'',
      'projectOid':oid,
      isedit:true
    }
    this.setState({
      data:{
        project:project,
        projectPartents:[...projectPartents,newData]
      }
    })
  }
  onDelete = () => {
    const { projectPartents, project } = this.state.data
    let { datalen } = this.state
    let len = projectPartents.length
    let index = len-1
    if ( datalen ==0) {
      return
    } else if (datalen>=len) {
      reqwest({
        url:'/project/deleteProjectPartent.do',
        data:{
          oid:projectPartents[index].oid
        }
      }).then((res) => {
        if(res.restCode ===200) {
          projectPartents.splice(len-1, 1)
          this.setState({
            datalen:projectPartents.length
          })
        }
      })
    } else {
      projectPartents.splice(len-1, 1)
    }

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
      editable: true
      // columnsPartents: columnsPartents
    });
  }
  save = () => {
    const { data  } = this.state
    let _pro = {}
    _pro = data.project
    _pro.projectPartents = data.projectPartents
    console.log(_pro)
    reqwest({
      url:'/project/editBaseInfo.do',
      data:JSON.stringify(_pro),
      method:'POST',
      headers:{
          'Content-Type':'application/json;charset=UTF-8'
      }
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
          datalen:data.projectPartents.length,
          editable: false,
          data
        })

      }

    })

  }
  componentWillMount(){

    let _state =  this.props.location.state
    // console.log(_state)
    let oid =_state?_state.oid:localStorage.getItem('projectOid')
    localStorage.setItem('projectOid',oid)

    let { projectPartents, project, templateName } = this.state.data

    reqwest({
      url: '/project/showBaseInfo.do',
      data: {
        projectOid: oid
      }
    }).then((result) => {
        console.log(result)
        if (result.restCode ===200) {
          project = result.data.project
          projectPartents = result.data.projectPartents
          templateName = result.data.templateName
          this.setState({
            data:{
              project:project,
              projectPartents:[...projectPartents],
              templateName: result.data.templateName
            },
            datalen:result.data.projectPartents.length
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
    // console.log(this.state.data.project.remarke,'importantClause')
    const {  editable, opt } = this.state;
    const { templateName } = this.state.data
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
            模板名称
          </Col>
          {
            templateName
          }
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
          <Table columns={this.columnsPartents} dataSource={[this.state.data.project]} size="middle" pagination={false}  />
       </Col>
     </Row>
     <Row>
      <Col offset={2} className="listtitle">
        <h6>重要条款</h6>
      </Col>
      <Col span={20} offset={2}>
          <Input type="textarea" value={this.state.data.project.importantClause || ''}  onChange={e =>this.importantClause(e, 'importantClause')} autosize={{ minRows: 5, maxRows: 8 }} />
      </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>备注</h6>
       </Col>
       <Col span={20} offset={2}>
         <Input type="textarea" value={this.state.data.project.remarke || ''}  onChange={e =>this.importantClause(e, 'remarke')} autosize={{ minRows: 5, maxRows: 8 }} />
       </Col>
      </Row>
      {
        globalPemission.indexOf('editProject')>=0?
        <Row type="flex" justify="center" style={{paddingTop:'30px'}}>
          {
            this.state.editable?
            <Button type="primary" onClick={this.save}>保存</Button>
            :
            <Button type="primary" onClick={this.edit}>编辑</Button>
          }
        </Row>
        :''
      }
      </div>
    )
  }
}
