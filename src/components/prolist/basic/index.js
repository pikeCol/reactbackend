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
//
// const data = [{
//   key: '1',
//   companyName:'',
//   mainBusiness:'',
//   regCapital:'',
//   contributedCapital:'',
//   ourInvestors:'',
//   ourRate:'',
//   actualAmount:'',
//   ourInvestmentTime:''
// }];
//
// const columnsPartents = [{
//   title: '股东名称',
//   dataIndex: 'name'
// }, {
//   title: '投资时间',
//   dataIndex: 'investmentTime'
// }, {
//   title: '持股比例',
//   dataIndex: 'rate'
// }, {
//   title: '认缴资本',
//   dataIndex: 'subscribedCapital'
// },{
//   title: '实缴资本',
//   dataIndex: 'contributedCapital'
// }];

// const dataPartents = [{
//   key: '20',
//   name:'',
//   investmentTime:'',
//   rate:'',
//   subscribedCapital:'',
//   contributedCapital:''
// }];


export default class Basic extends React.Component{
  state={
    data:{
      project:[],
      projectPartents:[]
    }
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
          //  this.state.project=res.data.project
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
    return(
      <div style={{paddingTop:'20px'}}>
        <Row>
          <Col span={2} offset={2}>
            目标名称
          </Col>
          <Col span={6}>
            <Input />
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
          <Table columns={columns} dataSource={data} size="middle" pagination={false}  />
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
        <Button type="primary">编辑</Button>
      </Row>
      </div>
    )
  }
}

























// class Basic extends React.Component{
//   state={
//     edit:''
//   }
//   componentWillMount(){
//     let urls=this.props.location.search;
//     let _edit=urlParse(urls)
//     let isedit=_edit.edit
//     this.setState({
//       edit:isedit
//     })
//   }
//   render(){
//     return(
//       <div className="col-sm-10 " style={{ paddingTop: '12px'}}>
//         <form className="form-horizontal">
//           <div className="form-group">
//             <label className="col-sm-2 control-label">目标名称</label>
//             <div className="col-sm-6">
//               <input className="form-control" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label className="col-sm-4 col-sm-offset-1 control-label formlabel">公司简介</label>
//             <table className="table table-bordered col-sm-10 col-sm-offset-1 center">
//               <tbody>
//                 <tr>
//                   <td className="danger">
//                     项目编码
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                   <td className="danger">
//                     公司名称
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="danger">
//                     主营业务
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                   <td className="danger">
//                     注册资本
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//
//           <div className="form-group">
//             <label className="col-sm-4 col-sm-offset-1 control-label formlabel">股东结构</label>
//             <table className="table table-bordered col-sm-10 col-sm-offset-1 center">
//               <tbody>
//                 <tr className="danger">
//                   <td >
//                     股东名称
//                   </td>
//                   <td>
//                     投资时间
//                   </td>
//                   <td >
//                     投缴资本
//                   </td>
//                   <td>
//                     认缴资本
//                   </td>
//                 </tr>
//                 <tr>
//                   <td >
//                     主营业务
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                   <td>
//                     注册资本
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//
//           <div className="form-group">
//             <label className="col-sm-4 control-label col-sm-offset-1 formlabel">董事会/监事会结构</label>
//             <table className="table table-bordered col-sm-10 col-sm-offset-1 center">
//               <tbody>
//                 <tr className="danger">
//                   <td >
//                     股东名称
//                   </td>
//                   <td>
//                     投资时间
//                   </td>
//                   <td >
//                     投缴资本
//                   </td>
//                   <td>
//                     认缴资本
//                   </td>
//                 </tr>
//                 <tr>
//                   <td >
//                     主营业务
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                   <td>
//                     注册资本
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//
//
//           <div className="form-group">
//             <label className="col-sm-4 col-sm-offset-1 control-label formlabel">联系信息</label>
//             <table className="table table-bordered col-sm-10 col-sm-offset-1 center">
//               <tbody>
//                 <tr>
//                   <td className="danger">
//                     实际控制人
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                   <td className="danger">
//                     联系方式
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="danger">
//                     常用联系人
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                   <td className="danger">
//                     联系方式
//                   </td>
//                   <td>
//                     1234124
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="danger">
//                     办公地址
//                   </td>
//                   <td colSpan="3">
//                     1234124
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//
//           <div className="form-group">
//             <label className="col-sm-4 col-sm-offset-1 control-label formlabel">重要条款</label>
//             <textarea placeholder="条款内容区域" className="col-sm-12 col-sm-offset-1 textbg" cols="30" rows="10"></textarea>
//           </div>
//
//           <div className="form-group">
//             <label className="col-sm-4 col-sm-offset-1 control-label formlabel">备注</label>
//             <textarea placeholder="条款内容区域" className="col-sm-12 col-sm-offset-1 textbg" cols="30" rows="5"></textarea>
//           </div>
//
//           <div className="center">
//             <a
//               href={`/menu/prolist?edit=${!this.state.edit}`}
//               // onClick={this.hander}
//               className="btn btn-primary" style={{
//               padding: '6px 20px',
//               marginTop: '24px'
//             }}>{this.state.edit?'编辑':'确认修改'}</a>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
// export default Basic;
