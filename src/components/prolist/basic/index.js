import React from 'react';
import { Table, Row, Col, Input, Button, Select } from 'antd';
import reqwest from 'reqwest';
const Option = Select.Option;

import EditableCell from '../../common/editablecell'



export default class Basic extends React.Component{
  state={
     columns: [{
        title: '项目编码',
        dataIndex: 'templateOid',
        render:(text, record, index) => {
          return(
                <p>{text}</p>
          )
        }
      }, {
        title: '公司名称',
        dataIndex: 'companyName',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      }, {
        title: '主营业务',
        dataIndex: 'mainBusiness',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      }, {
        title: '注册资本',
        dataIndex: 'regCapital',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      },{
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      },{
        title: '我方投资方',
        dataIndex: 'ourInvestors',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      },{
        title: '我方持股比例',
        dataIndex: 'ourRate',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      },{
        title: '实投金额',
        dataIndex: 'actualAmount',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
      },{
        title: '我方投资时间',
        dataIndex: 'ourInvestmentTime',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
                <p>{text}</p>
          )
        }
    }],
    data:{
      project:[],
      projectPartents:[]
    },
    columnsPartents : [{
        title: '董事会人数',
        dataIndex: 'boardNumber',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
      }, {
        title: '董事会我方委派人员',
        dataIndex: 'ourBoardPerson',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
      }, {
        title: '监事会人数',
        dataIndex: 'boardOfVisitorsNumber',
        render: (text, record, index) => <EditableCell value={text}  isedit={this.state.editable}/>
      }, {
        title: '监事会我方委派人员',
        dataIndex: 'ourBoardOfVisitorsPerson',
        render: (text, record, index) => <EditableCell value={text} isedit={this.state.editable}/>
      }],
    editable:false,
    value:'dfka',
    addoid:'',
    opt:[],
    nulldata:[{
      'templateOid':'',
      'companyName':'',
      'mainBusiness':'',
      'regCapital':'',
      'contributedCapital':'',
      'ourInvestors':'',
      'ourRate':'',
      'actualAmount':'',
      'ourInvestmentTime':''
    }],
    mypost:{}
  }
  inputchange = (e, names) => {
    const {mypost} = this.state
    mypost[names] = e.target.value
    this.setState({
      mypost
    })
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
      editable: true,
      columnsPartents: columnsPartents
    });
  }
  save = () => {
    const { data  } = this.state
    let _post = {}
    for (var variable in data) {
        if ( variable == 'project' ) {
          _post = data.project
        }
    }
    _post[0].projectPartents = data.projectPartents
    console.log(_post[0])
    reqwest({
      url:'/project/editBaseInfo.do',
      data:_post[0],
      method:'POST'
    }).then((result) => {
      this.setState({
        editable: true,
        data
      })
    })

  }
  componentWillMount(){

    // let _state =  this.props.location.state
    // console.log(_state)
    // let _add = _state?_state.add:localStorage.getItem('_add')
    // if ( _add ){
    //   localStorage.setItem('_add',true)
      reqwest({
        // url: '/project/chooseTemplate.do'
        url: '../../api/tt.json'
      }).then((result) => {
          console.log(result)
          if (result.restCode ===200) {
            let { opt } = this.state
            opt = result.data
            this.setState({
              opt:[...opt]
            })
          }
      });
    //   return
    // }
    //
    // let oid =_state?_state.oid:localStorage.getItem('projectOid')
    // localStorage.setItem('projectOid',oid)
    // let { projectPartents, project, value, importantClause, remarke } = this.state.data
    // reqwest({
    //   url: '../../api/data.json',
      // url: '/project/showBaseInfo.do',
      // data: {
      //   projectOid: oid
      // },
    // }).then((result) => {
    //     console.log(result)
    //     if (result.restCode ===200) {
    //       project[0] = result.data.project
    //       value = result.data.project.actualAmount
    //       projectPartents = result.data.projectPartents
    //       this.setState({
    //         data:{
    //           importantClause:result.data.project.importantClause,
    //           remarke:result.data.project.remarke,
    //           value:value,
    //           project:[...project],
    //           projectPartents:[...projectPartents]
    //         }
    //       })
    //       localStorage.setItem('_add',false)
    //       console.log(this.state.data.project)
    //     }
    // });


  }
  handleChange = (value) => {
    console.log(`Selected: ${value}`);
    const {addoid} = this.state
    this.setState({
      addoid:value
    })
  }
  importantClause = (e) => {
    const { data } = this.state
    data.project[0].importantClause = e.target.value
    this.setState({
      data
    })
  }
  remarke = (e) => {
    const { data } = this.state
    data.project[0].remarke = e.target.value
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
            目标名称
          </Col>
          <Col span={6}>
            {
              // localStorage.getItem('_add')=="true"?
              true?
              <Select
                size="default"
                onChange={this.handleChange}
                style={{ width: 200 }}
              >
                {children}
              </Select>
              :
              <div>
                {
                  editable?
                  <div className="editable-cell-input-wrapper">
                    <Input value={value} onChange={e => this.setState({value:e.target.value})}/>
                  </div>
                  :
                  <div className="editable-cell-input-wrapper">
                    {value || ' '}
                  </div>
                }
              </div>
            }
          </Col>
        </Row>
        <Row>
          <Col offset={2} className="listtitle">
            <h6>项目简介</h6>
          </Col>
          <Col span={20} offset={2}>
            {
              // localStorage.getItem('_add')=="true"?
              true?
              <Table columns={this.state.columns}  dataSource={this.state.nulldata} size="middle" pagination={false}  />
              :
              <Table columns={this.state.columns}  dataSource={this.state.data.project} size="middle" pagination={false}  />
            }
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
        <Input type="textarea"  onChange={this.importantClause} autosize={{ minRows: 5, maxRows: 8 }} />
      </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>备注</h6>
       </Col>
       <Col span={20} offset={2}>
         <Input type="textarea"  onChange={this.remarke} autosize={{ minRows: 5, maxRows: 8 }} />
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
