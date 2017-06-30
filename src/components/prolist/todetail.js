import React from 'react';
import { Link } from 'react-router-dom'

import { Table, Row, Col, Input, Button } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'name',
    render: text => <div className="td_a"><Link to={'/menu/prolist/basic'}>{text}</Link></div>,
  }, {
    title: '主营业务',
    className: 'column-money',
    dataIndex: 'money',
  }, {
    title: '注册资本',
    dataIndex: 'regmoney',
  }, {
    title: '实缴资本',
    dataIndex: 'jiaomon',
  }, {
    title: '我方投资方',
    dataIndex: 'myinvent',
  }, {
    title: '实投金额',
    dataIndex: 'finvent',
  }, {
    title: '持有比例',
    dataIndex: 'persent',
  }, {
    title: '投资时间',
    dataIndex: 'inventime',
  }, {
    title: '最新总资产',
    dataIndex: 'address',
  }, {
    title: '最新净资产',
    dataIndex: 'resonmon',
  }, {
    title: '最新实收资本',
    dataIndex: 'actmon',
  }, {
    title: '最新货币资金',
    dataIndex: 'newmon',
  }, {
    title: '最新营收',
    dataIndex: 'newacount',
  }, {
    title: '最新利润',
    dataIndex: 'lirun',
  }, {
    title: '备注',
    dataIndex: 'beizhu',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
    regmoney:'222222',
    jiaomon:'222222',
    myinvent:'222222',
    finvent:'222222',
    persent:'222222',
    inventime:'222222',
    resonmon:'222222',
    actmon:'222222',
    newmon:'222222',
    newacount:'222222',
    lirun:'222222',
    beizhu:'222222'
  }, {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
    regmoney:'222222',
    jiaomon:'222222',
    myinvent:'222222',
    finvent:'222222',
    persent:'222222',
    inventime:'222222',
    resonmon:'222222',
    actmon:'222222',
    newmon:'222222',
    newacount:'222222',
    lirun:'222222',
    beizhu:'222222'
  }, {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
    regmoney:'222222',
    jiaomon:'222222',
    myinvent:'222222',
    finvent:'222222',
    persent:'222222',
    inventime:'222222',
    resonmon:'222222',
    actmon:'222222',
    newmon:'222222',
    newacount:'222222',
    lirun:'222222',
    beizhu:'222222'
}];


class Todetail extends React.Component{
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
    render(){
      return(
        <div style={{padding:'0 20px'}}>
          <div className="border_line">
            <Row type="flex" align="middle" style={{height:'60px'}}>
              <Col span={3}>项目名称</Col>
              <Col span={6}><Input /></Col>
              <Col span={2}><Button type='primary'>搜索</Button></Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            bordered
          />
        </div>
      )
    }
}
export default Todetail;
