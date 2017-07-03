import React from 'react';
import { Table, Row, Col, Input, Button } from 'antd';
// import {urlParse} from '../../common/util'

const columns = [{
  title: '项目编码',
  dataIndex: 'code'
}, {
  title: '公司名称',
  dataIndex: 'name'
}, {
  title: '主营业务',
  dataIndex: 'business'
}, {
  title: '注册资本',
  dataIndex: 'regcap'
}];
const data = [{
  key: '1',
  code:'1111',
  name: 'John Brown',
  business: 32,
  regcap: 'New York No. 1 Lake Park'
},{
  key: '2',
  code:'1111',
  name: 'John Brown',
  business: 32,
  regcap: 'New York No. 1 Lake Park'
}];

export default class Basic extends React.Component{
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
             <Table columns={columns} dataSource={data} size="middle" pagination={false}  />
          </Col>
        </Row>
       <Row>
        <Col offset={2} className="listtitle">
          <h6>股东结构</h6>
        </Col>
        <Col span={20} offset={2}>
           <Table columns={columns} dataSource={data} size="middle" pagination={false}  />
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
