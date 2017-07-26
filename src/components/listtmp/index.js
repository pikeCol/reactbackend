import React from 'react';
import { Row, Col, Input, Table,Button  } from 'antd';
const dateFormat = 'YYYY';

import moment from 'moment';
import reqwest from 'reqwest';
import { Redirect, Link } from 'react-router-dom'
import Myalert from '../common/alert'

import globalPemission from '../common/permission'


export default class Listtmp extends React.Component{
  constructor(props){
    super(props)
  }
  state={
    permissions:[],
    pagination: {},
    columns:[{
      title: '模板名称',
      dataIndex: 'name'
    }, {
      title: '创建时间',
      dataIndex: 'updateTime'
    }, {
      title: '操作',
      dataIndex: 'opreate',
      render: (text, record, index) => {
        const {data} = this.state
        let oid = data[index].oid
        console.log(index,oid)
        return(
          <Row type="flex" justify="space-around" align="middle">
            {
              globalPemission.indexOf('editTemp')>=0?
              <Col span={4}>
                <Link to={{pathname:'/menu/listtmp/edit', state:{oid:oid}}}>编辑</Link>
              </Col>
              :''
            }
            {/* <Col span={4}>
              <a onClick={() =>this.delt(index)}>删除</a>
            </Col> */}
          </Row>
        )
      }
    }],
    loading: false,
    data: [],
    oid:'',
    add: false
  }
  delt = (index) => {
    // /template/delete.do
    let {data} = this.state
    reqwest({
      url:'/template/delete.do',
      method: 'POST',
      data: {
        template: data[index].oid
      }
    }).then((result) =>{
      if (result === 200) {
        data.splice(index, 1)
        Myalert.success('success', '删除成功')
        this.fetch({
          rows: 10,
          page: 1,
        })
        this.setState({
          data:[...data]
        })
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const page = { ...this.state.pagination };
    console.log(pagination)
    page.current = pagination.current;
    this.setState({
      pagination: page,
    });
    console.log(this.state.pagination)
    this.fetch({
      rows: pagination.pageSize,
      page: pagination.current,
    });
  }
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      // temlist
      // url:'../../api/temlist.json',
      url:'/template/list.do',
      method:'POST',
      data: {
        rows:10,
        ...params
      }
    }).then((result) => {
      console.log(result)
      const pagination = { ...this.state.pagination };
      if (result.restCode === 200) {
        // pagination.total = result.data.total
        pagination.total = result.data.total;
        let data = result.data.template
        this.setState({
          loading: false,
          data:[...data],
          pagination
        })
        console.log(this.state.pagination)
      }
    });
  }

  componentDidMount () {
    this.fetch({
      rows: 10,
      page: 1,
    })
  }
  addmodule =() =>{
    this.setState({
      add:true
    })
  }
  render(){
    const { size, add } = this.state;
    if (add) {
      return(
        <Redirect to={'/menu/listtmp/add'} />
      )
    }
    return(
      <div style={{paddingTop:'40px'}}>
        <Row style={{paddingBottom:'40px'}}>
          {
            globalPemission.indexOf('addTemp')>=0?
            <Col offset={20}>
              <Button type="primary" onClick={this.addmodule}>添加</Button>
            </Col>
            :''
          }
        </Row>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
         />
      </div>
    )
  }
}
