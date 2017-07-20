import React from 'react';
import { Link } from 'react-router-dom'
import reqwest from 'reqwest';

import { Table, Row, Col, Input, Button } from 'antd';
//    /project/getProjects.do 获取列表 page 和 rows
import { Redirect } from 'react-router-dom'

class Todetail extends React.Component{
  constructor(props){
    super(props)
  }
  state = {
      data: [],
      pagination: {},
      loading: false,
      columns:[{
          title: '项目名称',
          dataIndex: 'projectName',
          render: (text, record, index) =>{
            let oid = this.state.data[index].oid
            return(
              <div className="td_a"><Link to={{pathname:`/menu/prolist/basic`,state:{oid:oid}}}>{text}</Link></div>
            )
          }
        }, {
          title: '主营业务',
          className: 'column-money',
          dataIndex: 'mainBusiness'
        }, {
          title: '注册资本',
          dataIndex: 'regCapital'
        }, {
          title: '实缴资本',
          dataIndex: 'contributedCapital'
        }, {
          title: '我方投资方',
          dataIndex: 'ourInvestors'
        }, {
          title: '实投金额',
          dataIndex: 'actualAmount'
        }, {
          title: '持有比例',
          dataIndex: 'ourRate'
        }, {
          title: '投资时间',
          dataIndex: 'ourInvestmentTime'
        }, {
          title: '最新总资产',
          dataIndex: 'val1'
        }, {
          title: '最新净资产',
          dataIndex: 'val2'
        }, {
          title: '最新实收资本',
          dataIndex: 'val3'
        }, {
          title: '最新货币资金',
          dataIndex: 'val4'
        }, {
          title: '最新营收',
          dataIndex: 'val5'
        }, {
          title: '最新利润',
          dataIndex: 'val6'
        }, {
          title: '备注',
          dataIndex: 'remarke'
      }],
      add:false
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
        url: '/project/getProjects.do',
        method: 'POST',
        data: {
          projectName: '',
          page: params.page || 1,
          rows: 10
        },
        // url: '../../api/item.json',
        // data: {
        //    results: 10,
        //    ...params,
        //  },
        type: 'json'
      }).then((data) => {
        console.log(data)
        const pagination = { ...this.state.pagination };
        pagination.total = 200;
        this.setState({
          loading: false,
          data: data.rows,
          pagination,
        });
      });
    }
    componentDidMount() {
      this.fetch();
    }
    changes = (e) => {
      console.log(e.target.value)
    }

    render(){
      const { columns, add } = this.state

      return(
        <div style={{padding:'0 20px'}}>
          <div className="border_line">
            <Row type="flex" align="middle" style={{height:'60px'}}>
              <Col span={3}>项目名称</Col>
              <Col span={6}><Input onChange={() => this.changes(e)}/></Col>
              <Col span={2}><Button type='primary'>搜索</Button></Col>
              <Col span={2} offset={10}>
                <Button type='primary'>
                  <Link to={{pathname:`/menu/addprolist/basic`}}>添加</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.data}
            bordered
            onChange={this.handleTableChange}
          />
        </div>
      )
    }
}
export default Todetail;
