import React from 'react';
import { Table, Row, Col, Input, Button } from 'antd';

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

const columnsPartents = [{
    title: '股东名称',
    dataIndex: 'name'
  }, {
    title: '投资时间',
    dataIndex: 'investmentTime'
  }, {
    title: '持股比例',
    dataIndex: 'rate'
  }, {
    title: '认缴资本',
    dataIndex: 'subscribedCapital'
  },{
    title: '实缴资本',
    dataIndex: 'contributedCapital'
}];

export default class Basic extends React.Component{
  state={
    data:{
      project:[],
      projectPartents:[]
    },
    editable:false,
    value:'dfka'
  }
  edit = () => {
    this.setState({ editable: !this.state.editable });
  }
  componentWillMount(){
    let that = this
    let dataPartents = [{
      key: '',
      name:'',
      investmentTime:'',
      rate:'',
      subscribedCapital:'',
      contributedCapital:''
    }];
    const data = [{
      key: '',
      companyName:'',
      mainBusiness:'',
      regCapital:'',
      contributedCapital:'',
      ourInvestors:'',
      ourRate:'',
      actualAmount:'',
      ourInvestmentTime:''
    }];
    fetch('../../../api/data.json')
      .then((res) => res.json())
       .then((res) => {
         if (res.restCode==200) {
           this.state.project=res.data.project
            let resdata=res.data.project
            // console.log(resdata)
            data[0].key = resdata.oid
            for (var variable in resdata) {
              if (resdata.hasOwnProperty(variable)&&data[0].hasOwnProperty(variable)) {
                  data[0][variable] = resdata[variable]
              }
            }
            console.log(data)
            // 项目简介

            // 股东结构  commonlyUsedContact
            let resParentdata=res.data.projectPartents[0]
            dataPartents[0].key=resParentdata.oid
            dataPartents[0].name=resParentdata.name
            dataPartents[0].investmentTime=resParentdata.investmentTime
            dataPartents[0].rate=resParentdata.rate
            dataPartents[0].subscribedCapital=resParentdata.subscribedCapital
            dataPartents[0].contributedCapital=resParentdata.contributedCapital
            that.setState({
               data:{
                 project:data,
                 projectPartents:dataPartents
               }
            })
         }
       })
       .catch((err) => console.error(err));
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
        <Col span={20} offset={2}>
           <Table columns={columnsPartents} dataSource={this.state.data.projectPartents} size="middle" pagination={false}  />
        </Col>
      </Row>
      <Row>
       <Col offset={2} className="listtitle">
         <h6>董事会/监事会结构</h6>
       </Col>
       <Col span={20} offset={2}>
          {/* <Table columns={columns} dataSource={this.state.data} size="middle" pagination={false}  /> */}
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
