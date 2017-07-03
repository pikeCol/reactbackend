import React from 'react';
import { Button, Row, Col, Icon, Checkbox } from  'antd'
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
class Infos extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <Row className="nav_head " style={{marginBottom:'30px'}}>
          <Col offset={20}>
            <Button type="primary"  style={{
              marginRight:'10px'
            }}> <span><Icon type="download" /></span> 下载所选</Button>
            <Button type="primary"><span><Icon type="upload" /></span>上传资料</Button>
          </Col>
        </Row>
        <Checkbox.Group onChange={onChange}>
        <Row>
          <Col span={4} offset={2}><Checkbox value="A">A</Checkbox></Col>
          <Col span={4} offset={2}><Checkbox value="B">B</Checkbox></Col>
          <Col span={4} offset={2}><Checkbox value="C">C</Checkbox></Col>
          <Col span={4} offset={2}><Checkbox value="D">D</Checkbox></Col>
          <Col span={4} offset={2}><Checkbox value="E">E</Checkbox></Col>
        </Row>
      </Checkbox.Group>
      </div>
    )
  }
}
export default Infos;
