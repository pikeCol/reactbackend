import React from 'react';
import { Button, Row, Col, Table } from  'antd'

const columns = [{
  title: '添加日期',
  dataIndex: 'name'
}, {
  title: '事件内容',
  className: 'column-money',
  dataIndex: 'money'
}];
const data = [{
  key: '1',
  name: '2017-02-02',
  money: '条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容条款内容'
}];

class Metters extends React.Component{
  render(){
    return(
      <div>
        {/* <div className="nav_head ">
          <button className="btn btn-primary col-sm-offset-9">添加通 报事项</button>
        </div> */}
        <Row className="nav_head ">
          <Col offset={20}>
            <Button type="primary">添加通报事项</Button>
          </Col>
        </Row>
        <div className="col-sm-offset-1 col-sm-10" style={{
          marginTop:'20px'
        }}>
        <Table
           columns={columns}
           dataSource={data}
           bordered
         />
          {/* <table className="table table-bordered center">
            <tbody>
              <tr className="danger">
                <td>添加日期</td>
                <td>事件内容</td>
              </tr>
              <tr>
                <td>2013</td>
                <td>事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    )
  }
}
export default Metters;
