import React from 'react';
import { Button, Row, Col, Icon, Checkbox } from  'antd'
import reqwest from 'reqwest';



// ` http://xx.com/attachment/upload.do
// {
//    "restCode": 200,
//    "desCode": "_successful_",
//    "msg": "",
//    "data": {
//        "isSuccess": true,
//        "msg": "上传成功"
//    }
// }

// http://xx.com/attachment/list.do
// {
//     "restCode": 200,
//     "desCode": "_successful_",
//     "msg": "",
//     "data": {
//         "attachment": [
//             {
//                 "oid": "9a964bcceb2e472a93c5947c449c159d",//附件oid
//                 "id": 1,
//                 "projectOid": "111111",//关联项目名
//                 "fileName": "oooooyeah.pdf",//文件原始名
//                 "fileUrl": "E:\\upload\\13416A36EB178CDEB91F0BE3182AD716.pdf",//附件存放路径
//                 "createBy": null,//文件上传人
//                 "createTime": 1499423930000,//文件上传时间
//                 "updateBy": null,//文件更新人
//                 "updateTime": 1499423930000,//文件更新时间
//                 "delFlag": 0//删除标志位
//             }
//         ]
//     }
// }

function onChange(checkedValues) {
}
class Infos extends React.Component{
  constructor(props) {
    super(props);
  }
  download = () => {
    // /attachment/download.do
    // reqwest({
    //   url: '/attachment/download.do',
    //   data:{
    //     oid: projectOid
    //   }
    // }).then((result) =>{
    //   let projectOid = localStorage.getItem('projectOid')
    //
    // })
  }
  render(){
    return(
      <div>
        <Row className="nav_head " style={{marginBottom:'30px'}}>
          <Col offset={20}>
            <Button type="primary"  style={{
              marginRight:'10px'
            }}> <span onClick={this.download}><Icon type="download" /></span> 下载所选</Button>
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
