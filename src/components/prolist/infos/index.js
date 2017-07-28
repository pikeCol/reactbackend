import React from 'react';
import { Button, Row, Col, Icon, Checkbox, Upload, message } from  'antd'
import reqwest from 'reqwest';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

import Myalert from '../../common/alert'

import globalPemission from '../../common/permission'

class Infos extends React.Component{
  constructor(props) {
    super(props);
  }
  state={
    myprops: {
      name: 'file',
      data:{
        method:'POST',
        projectOid:''
      },
      action: '/attachment/upload.do',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
    opt:[],
    value:''
  }

  componentWillMount () {

    // let url = this.props.location.url
    // console.log(this.props)
    let projectOid = localStorage.getItem('projectOid')
    reqwest({
      method:'POST',
      data: {
        projectOid:projectOid
      },
      url:'/attachment/list.do'
      // url:'../../../api/item00.json'
    }).then((result) =>{
      console.log(result)
      if(result.restCode === 200) {
        let {myprops} = this.state
        let projectOid = localStorage.getItem('projectOid')
        myprops.data.projectOid = projectOid
        let data = result.data.attachment
        let { opt } = this.state
        opt = data.map((item) =>
          <Row key={item.id}>
            <Col offset={2}>
              <Radio key={item.oid} value={item.oid}>{item.fileName}</Radio>
            </Col>
          </Row>
        )
        this.setState({
          myprops:myprops,
          opt:opt
        })
      }
    })
  }
  onChange = (val) => {
    this.setState({
      value:val.target.value
    })
    console.log(this.state.value)

  }
  download = () => {

    const {value} = this.state
    if(!value) {
      Myalert.error('Error', '请选择要下载的文件')
      return
    }
    console.log(value)
    let url = document.location.origin+'/attachment/download.do?oid='+value
    console.log(url)
    window.open(url)
  }
  render(){
    return(
      <div>
        <Row className="nav_head " style={{marginBottom:'30px'}}>
          <Col offset={16}>
            {
              globalPemission.indexOf('download')>=0?
              <Button type="primary" onClick={this.download}  style={{
                marginRight:'10px'
              }}> <span ><Icon type="download" /></span> 下载所选
            </Button>:''
            }
            {
              globalPemission.indexOf('upload')>=0?
              <Upload {...this.state.myprops}>
                <Button type="primary"><span><Icon type="upload" /></span>上传资料</Button>
              </Upload>:''
            }
          </Col>
        </Row>
        <RadioGroup onChange={ this.onChange}>
        <Row>
          {
            this.state.opt
          }
        </Row>
      </RadioGroup>
      </div>
    )
  }
}
export default Infos;
