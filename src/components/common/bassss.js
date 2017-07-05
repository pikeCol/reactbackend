// Todetail.js
// render(){
//   return(
//     <div>
//       <div>
//         <form className="form-inline">
//           <div className="form-group">
//             <label htmlFor="exampleInputName2">项目名称</label>
//             <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" />
//           </div>
//           <button type="submit" className="btn btn-default">查找</button>
//         </form>
//       </div>
//       <div>
//         <table className="table table-bordered">
//           <tbody>
//             <tr className="danger">
//               <td>项目名称</td>
//               <td>主营业务</td>
//               <td>注册资本</td>
//               <td>实缴资本</td>
//               <td>我方投资方</td>
//               <td>实投金额</td>
//               <td>持有比例</td>
//               <td>投资时间</td>
//               <td>最新总资产</td>
//               <td>最新净资产</td>
//               <td>最新实收资本</td>
//               <td>最新货币资金</td>
//               <td>最新营收</td>
//               <td>最新利润</td>
//               <td>备注</td>
//             </tr>
//             <tr>
//               <td>
//                 <Link to={'/menu/prolist/basic'}>项目名称</Link>
//               </td>
//               <td>主营业务</td>
//               <td>注册资本</td>
//               <td>实缴资本</td>
//               <td>我方投资方</td>
//               <td>实投金额</td>
//               <td>持有比例</td>
//               <td>投资时间</td>
//               <td>最新总资产</td>
//               <td>最新净资产</td>
//               <td>最新实收资本</td>
//               <td>最新货币资金</td>
//               <td>最新营收</td>
//               <td>最新利润</td>
//               <td>备注</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }







// const dataPartents = [{
//   key: '20',
//   name:'',
//   investmentTime:'',
//   rate:'',
//   subscribedCapital:'',
//   contributedCapital:''
// }];
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
