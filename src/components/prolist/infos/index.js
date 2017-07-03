import React from 'react';
import { Button, Row, Col } from  'antd'

class Infos extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <Row className="nav_head ">
          <Col offset={20}>
            <Button type="primary"  style={{
              marginRight:'10px'
            }}>下载所选</Button>
            <Button type="primary">上传资料</Button>
          </Col>
        </Row>
        <ul className="prolist">
          <li>
            <input type="checkbox" /><span className="glyphicon glyphicon-yen" aria-hidden="true"></span>爱上了放假
          </li>
          <li>
            <input type="checkbox" /><span className="glyphicon glyphicon-yen" aria-hidden="true"></span>爱上了放假
          </li>
          <li>
            <input type="checkbox" /><span className="glyphicon glyphicon-yen" aria-hidden="true"></span>爱上了放假
          </li>
          <li>
            <input type="checkbox" /><span className="glyphicon glyphicon-yen" aria-hidden="true"></span>爱上了放假
          </li>
          <li>
            <input type="checkbox" /><span className="glyphicon glyphicon-yen" aria-hidden="true"></span>爱上了放假
          </li>
        </ul>
      </div>
    )
  }
}
export default Infos;
