import React from 'react';
import { Link } from 'react-router-dom'
import reqwest from 'reqwest';

import { Table, Row, Col, Input, Button } from 'antd';
//    /project/getProjects.do 获取列表 page 和 rows
import { Redirect } from 'react-router-dom'
import globalPemission from '../common/permission'


class Todetail extends React.Component{
  constructor(props){
    super(props)
  }
  state = {
      paths:'',
      data: [],
      projectName:'',
      pagination: {},
      loading: false,
      columns:[{
          title: '项目名称',
          width: 100,
          fixed: 'left',
          dataIndex: 'projectName',
          render: (text, record, index) =>{
            let oid = this.state.data[index].oid
            let templateOid = this.state.data[index].templateOid
            return(
              <div className="td_a" onClick={()=>this.setpro(oid, templateOid)}>
                {
                  globalPemission.indexOf("projectListDetail")>=0?
                  <div>
                      <Link to={{pathname:this.state.paths,state:{oid:oid}}}>{text}</Link>
                  </div>
                  :
                  <p>{text}</p>
                }
              </div>
            )
          }
        }, {
          title: '主营业务',
          className: 'column-money',
          dataIndex: 'mainBusiness',
          with:400
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
          dataIndex: 'ourInvestmentTimeString'
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
    }

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
      let oid = localStorage.getItem('oid')
      this.setState({ loading: true });
      reqwest({
        url: '/project/getProjects.do',
        method: 'POST',
        data: {
          projectName: params.projectName || '',
          page: params.page || 1,
          rows: 10,
          accountOid:oid
        },
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
      let { paths } = this.state;
      console.log(globalPemission)
      if ( globalPemission.indexOf('projectDetail')>0) {
        paths = "/menu/prolist/basic"
      } else if ( globalPemission.indexOf('reportDetail')>0) {
        paths = "/menu/prolist/report"
      } else if ( globalPemission.indexOf('importantItem')>0) {
        paths = "/menu/prolist/matters"
      } else if (globalPemission.indexOf('material')>=0) {
        paths = "/menu/prolist/infos"
      }
      // tt = globalPemission.indexOf('material')>=0?"/menu/prolist/infos":"";
      // tt = globalPemission.indexOf('importantItem')>0=?"/menu/prolist/matters":"";
      // tt = globalPemission.indexOf('reportDetail')>0=?"/menu/prolist/report":"";
      // tt = globalPemission.indexOf('projectDetail')>0=?"/menu/prolist/basic":"";
      this.setState({
        paths
      })
      this.fetch();
    }
    changes = (e,key) => {
      console.log(e.target.value)
      this.setState({
        projectName:e.target.value
      })
    }
    search = () => {
      this.fetch({
        projectName:this.state.projectName,
        page:1,
        row:10
      })
    }
    setpro =(oid, templateOid) => {
      localStorage.setItem('projectOid',oid)
      localStorage.setItem('templateOid',templateOid)
    }
    render(){
      const { columns, add } = this.state

      return(
        <div style={{padding:'0 20px'}}>
          <div className="border_line">
            <Row type="flex" align="middle" style={{height:'60px'}}>
              <Col span={3}>项目名称</Col>
              <Col span={6}><Input onChange={(e) => this.changes(e,'projectName')}/></Col>
              <Col span={2}><Button type='primary' onClick={this.search}>搜索</Button></Col>
              <Col span={2} offset={10}>
                {
                globalPemission.indexOf('addProject')>=0?
                  <Button type='primary'>
                    <Link to={{pathname:`/menu/addprolist/basic`}}>添加</Link>
                  </Button>
                  :
                  ''
                }
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.data}
            bordered
            scroll={{ x: '130%' }}
            onChange={this.handleTableChange}
          />
        </div>
      )
    }
}
export default Todetail;
