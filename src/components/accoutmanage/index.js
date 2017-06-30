import React from 'react';
import { Link } from 'react-router-dom'

class Accoutmanage extends React.Component{
  render(){
    return(
      <div>
        <div style={{
          height:'60px',
          borderBottom:'1px solid #d3d3d3'
        }}>
          {/* <a href="/menu/accoutmanage/add" className="btn btn-primary col-sm-offset-10" style={{
            marginTop:'10px'
          }}>添加账户</a> */}
          <div className="btn btn-primary col-sm-offset-10" style={{
            marginTop:'10px'
          }}>
            <Link to={'/menu/accoutmanage/add'}>添加账户</Link>
          </div>
        </div>
        <div className="col-sm-10 col-sm-offset-1">
        <table className="table table-bordered center " style={{
          marginTop:'40px'
        }}>
          <tbody>
            <tr className="danger">
              <td>姓名</td>
              <td>角色</td>
              <td>登录账户</td>
              <td>关联项目</td>
              <td>创建时间</td>
              <td>账户状态</td>
              <td>操作</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>角色</td>
              <td>登录账户</td>
              <td>关联项目</td>
              <td>创建时间</td>
              <td className="text-success">启用</td>
              <td className="operate">
                <a href="#">冻结</a>
                <a href="#">修改</a>
                <a href="#">删除</a>
                <a href="#">重置密码</a>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
export default Accoutmanage;
