import React from 'react';
import { Link } from 'react-router-dom'
import reqwest from 'reqwest';

import { Table, Row, Col, Input, Button } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'name',
    render: text => <div className="td_a"><Link to={'/menu/prolist/basic'}>{text}</Link></div>
  }, {
    title: '主营业务',
    className: 'column-money',
    dataIndex: 'money'
  }, {
    title: '注册资本',
    dataIndex: 'regmoney'
  }, {
    title: '实缴资本',
    dataIndex: 'jiaomon'
  }, {
    title: '我方投资方',
    dataIndex: 'myinvent'
  }, {
    title: '实投金额',
    dataIndex: 'finvent'
  }, {
    title: '持有比例',
    dataIndex: 'persent'
  }, {
    title: '投资时间',
    dataIndex: 'inventime'
  }, {
    title: '最新总资产',
    dataIndex: 'address'
  }, {
    title: '最新净资产',
    dataIndex: 'resonmon'
  }, {
    title: '最新实收资本',
    dataIndex: 'actmon'
  }, {
    title: '最新货币资金',
    dataIndex: 'newmon'
  }, {
    title: '最新营收',
    dataIndex: 'newacount'
  }, {
    title: '最新利润',
    dataIndex: 'lirun'
  }, {
    title: '备注',
    dataIndex: 'beizhu'
}];


class Todetail extends React.Component{
  constructor(props){
    super(props)
  }
  state = {
      data: [],
      pagination: {},
      loading: false,
    };

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
    });
  }

    fetch = (params = {}) => {
      console.log('params:', params);
      this.setState({ loading: true });
      reqwest({
        url: '../../api/item.json',
        method: 'get',
        data: {
          results: 10
        },
        type: 'json'
      }).then((data) => {
        console.log(data)
        const pagination = { ...this.state.pagination };
        pagination.total = 200;
        this.setState({
          loading: false,
          data: data.data,
          pagination,
        });
      });
    }
    componentDidMount() {
      this.fetch();
    }

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
            rowKey={record => record.registered}
            dataSource={this.state.data}
            bordered
            onChange={this.handleTableChange}
          />
        </div>
      )
    }
}
export default Todetail;
