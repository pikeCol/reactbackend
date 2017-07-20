import React from 'react';
import { Table, Row, Col, Input, Button, Select } from 'antd';
import reqwest from 'reqwest';
const Option = Select.Option;

export default class Basic extends React.Component{
  state={
     columns: [
      //  {
      //   title: '项目编码',
      //   dataIndex: 'templateOid',
      //   render:(text, record, index) => {
      //     return(
      //       <Input onChange={e => this.inputchange(e, 'templateOid')} />
      //     )
      //   }
      // },
       {
        title: '公司名称',
        dataIndex: 'companyName',
        render:(text, record, index) => {
          return(
            <Input onChange={e => this.inputchange(e, 'companyName')} />
          )
        }
      }, {
        title: '主营业务',
        dataIndex: 'mainBusiness',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
            <Input onChange={e => this.inputchange(e, 'mainBusiness')} />
          )
        }
      }, {
        title: '注册资本',
        dataIndex: 'regCapital',
        render:(text, record, index) => {
          return(
            <Input onChange={e => this.inputchange(e, 'regCapital')} />
          )
        }
      },{
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render:(text, record, index) => {
          return(
            <Input onChange={e => this.inputchange(e, 'contributedCapital')} />
          )
        }
      },{
        title: '我方投资方',
        dataIndex: 'ourInvestors',
        render:(text, record, index) => {
          // localStorage.getItem('_add')=="true"?
          return(
              <Input onChange={e => this.inputchange(e, 'ourInvestors')} />
          )
        }
      },{
        title: '我方持股比例',
        dataIndex: 'ourRate',
        render:(text, record, index) => {
          return(
              <Input onChange={e => this.inputchange(e, 'ourRate')} />
          )
        }
      },{
        title: '实投金额',
        dataIndex: 'actualAmount',
        render:(text, record, index) => {
          return(
                <Input onChange={e => this.inputchange(e, 'actualAmount')} />
          )
        }
      },{
        title: '我方投资时间',
        dataIndex: 'ourInvestmentTime',
        render:(text, record, index) => {
          return(
            <Input onChange={e => this.inputchange(e, 'ourInvestmentTime')} />
          )
        }
    }],
    dong:[{
      boardNumber:'',
      ourBoardPerson:'',
      boardOfVisitorsNumber:'',
      ourBoardOfVisitorsPerson:'',
    }],
    data:{
      project:[],
      _projectPartents:[{
        name:'',
        investmentTime:'',
        rate:'',
        subscribedCapital:'',
        contributedCapital:''
      }]
    },
    _Partents : [{
        title: '股东姓名',
        dataIndex: 'name',
        render: (text, record, index) => <Input onChange={e => this.baname(e,index,'name')} />
      }, {
        title: '投资时间',
        dataIndex: 'investmentTime',
        render: (text, record, index) => <Input onChange={e => this.baname(e,index,'investmentTime')} />
      }, {
        title: '持股比例',
        dataIndex: 'rate',
        render: (text, record, index) => <Input onChange={e => this.baname(e,index,'rate')} />
      }, {
        title: '认缴资本',
        dataIndex: 'subscribedCapital',
        render: (text, record, index) => <Input onChange={e => this.baname(e,index,'subscribedCapital')} />
      }, {
        title: '实缴资本',
        dataIndex: 'contributedCapital',
        render: (text, record, index) => <Input onChange={e => this.baname(e,index,'contributedCapital')} />
      }],
      columnsPartents : [{
        title: '董事会人数',
        dataIndex: 'boardNumber',
        render: (text, record, index) => <Input  onChange={e => this.inputchange(e,'boardNumber')}/>
      }, {
        title: '董事会我方委派人员',
        dataIndex: 'ourBoardPerson',
        render: (text, record, index) => <Input  onChange={e => this.inputchange(e,'ourBoardPerson')}/>
      }, {
        title: '监事会人数',
        dataIndex: 'boardOfVisitorsNumber',
        render: (text, record, index) => <Input  onChange={e => this.inputchange(e,'boardOfVisitorsNumber')}/>
      }, {
        title: '监事会我方委派人员',
        dataIndex: 'ourBoardOfVisitorsPerson',
        render: (text, record, index) => <Input  onChange={e => this.inputchange(e,'ourBoardOfVisitorsPerson')}/>
      }],
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
    mypost:{
      // projectPartents:[{
      //   name:'',
      //   investmentTime:'',
      //   rate:'',
      //   subscribedCapital:'',
      //   contributedCapital:''
      // }]
    }
  }
  baname = (e,index,key) => {
    const {mypost} = this.state
    mypost.projectPartents[index][key] = e.target.value
    this.setState({
      mypost:mypost
    })
  }
  handleChang = ( val ) => {
    const {mypost} = this.state
    mypost.oid = val
    this.setState({
      mypost
    })
    console.log(this.state.mypost)
  }
  inputchange = (e, names) => {
    const {mypost} = this.state
    mypost[names] = e.target.value
    this.setState({
      mypost
    })
    console.log(this.state.mypost)
  }
  handleAdd = () => {
    const { _projectPartents, project } = this.state.data;
    const { mypost } = this.state;
    let _my = mypost
    let _my2 = _my.projectPartents
    console.log(_my)
    const newData = {
      "name":'',
      "investmentTime":'',
      "rate":'',
      "subscribedCapital":'',
      "contributedCapital":''
    }
    _my.projectPartents.push(newData)
    console.log(_my)
    this.setState({
      mypost:{
        ..._my
      }
    })
    this.setState({
      data:{
        project:[...project],
        _projectPartents:[..._projectPartents,newData]
      }
    })
  }
  onDelete = () => {
    const { _projectPartents, project } = this.state.data
    const { mypost } = this.state;
    let len = projectPartents.length
    _projectPartents.splice(len-1, 1)
    mypost.projectPartents.splice(len-1, 1)
    this.setState({
      mypost
    })
    this.setState({
      data:{
        project:[...project],
        _projectPartents:_projectPartents
      }
    })
  }
  save = () => {
    const { mypost  } = this.state
    console.log(mypost)
    reqwest({
      url:'/project/addProject.do',
      data:JSON.stringify(mypost),
      method:'POST',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      }
    }).then((result) => {
      console.log(result)
    })

  }
  componentWillMount(){
      reqwest({
        url: '/project/chooseTemplate.do'
        // url: '../../api/tt.json'
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
              <Select
                size="default"
                onChange={this.handleChang}
                style={{ width: 200 }}
              >
                {children}
              </Select>
          </Col>
        </Row>
        <Row>
          <Col offset={2} className="listtitle">
            <h6>项目简介</h6>
          </Col>
          <Col span={20} offset={2}>
            <Table columns={this.state.columns}   dataSource={this.state.nulldata} size="middle" pagination={false}  />
          </Col>
        </Row>
       <Row>
        <Col offset={2} className="listtitle">
          <h6>股东结构</h6>
        </Col>
            <Col offset={2} className="listtitle">
                <Button type="primary" style={{marginRight:'10px'}} onClick={this.handleAdd}>添加</Button>
                <Button type="primary" onClick={this.onDelete}>删除</Button>
            </Col>
            <Col span={20} offset={2}>
               <Table columns={this.state._Partents} dataSource={this.state.data._projectPartents} size="middle" pagination={false}  />
            </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>董事会/监事会结构</h6>
       </Col>
       <Col span={20} offset={2}>
          <Table columns={this.state.columnsPartents}
              dataSource={this.state.dong}
             size="middle" pagination={false}  />
       </Col>
     </Row>
     <Row>
      <Col offset={2} className="listtitle">
        <h6>重要条款</h6>
      </Col>
      <Col span={20} offset={2}>
        <Input type="textarea"  onChange={e =>this.inputchange(e,'importantClause')} autosize={{ minRows: 5, maxRows: 8 }} />
      </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>备注</h6>
       </Col>
       <Col span={20} offset={2}>
         <Input type="textarea"  onChange={e =>this.inputchange(e,'remarke')} autosize={{ minRows: 5, maxRows: 8 }} />
       </Col>
      </Row>
      <Row type="flex" justify="center" style={{paddingTop:'30px'}}>
          <Button type="primary" onClick={this.save}>保存</Button>
      </Row>
      </div>
    )
  }
}
