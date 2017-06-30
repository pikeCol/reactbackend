import React from 'react';
import { Link } from 'react-router-dom'

class Todetail extends React.Component{
  render(){
    return(
      <div>
        <div>
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="exampleInputName2">项目名称</label>
              <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" />
            </div>
            <button type="submit" className="btn btn-default">查找</button>
          </form>
        </div>
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr className="danger">
                <td>项目名称</td>
                <td>主营业务</td>
                <td>注册资本</td>
                <td>实缴资本</td>
                <td>我方投资方</td>
                <td>实投金额</td>
                <td>持有比例</td>
                <td>投资时间</td>
                <td>最新总资产</td>
                <td>最新净资产</td>
                <td>最新实收资本</td>
                <td>最新货币资金</td>
                <td>最新营收</td>
                <td>最新利润</td>
                <td>备注</td>
              </tr>
              <tr>
                <td>
                  <Link to={'/menu/prolist/basic'}>项目名称</Link>
                </td>
                <td>主营业务</td>
                <td>注册资本</td>
                <td>实缴资本</td>
                <td>我方投资方</td>
                <td>实投金额</td>
                <td>持有比例</td>
                <td>投资时间</td>
                <td>最新总资产</td>
                <td>最新净资产</td>
                <td>最新实收资本</td>
                <td>最新货币资金</td>
                <td>最新营收</td>
                <td>最新利润</td>
                <td>备注</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Todetail;
