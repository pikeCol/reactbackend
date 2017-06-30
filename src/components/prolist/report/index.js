import React from 'react';



class Report extends React.Component{
  render(){
    return(
      <div>
        <div className="nav_head ">
          <div className="col-sm-2 col-sm-offset-1">
            <select className="form-control">
              <option>年</option>
              <option>2011</option>
              <option>2012</option>
              <option>2013</option>
              <option>2014</option>
              <option>2015</option>
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
            </select>
          </div>
          <div className="col-sm-2">
            <select className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <button className="btn btn-primary">刷选</button>
        </div>
        <div style={{paddingTop:'20px'}}>
          <button className="btn btn-primary col-sm-offset-6">导出所选报表</button>
          <button className="btn btn-primary" style={{margin:'0 10px'}}>添加报表</button>
          <button className="btn btn-primary">编辑报表</button>
        </div>
        <div className="col-sm-offset-1 col-sm-10">
          <label>报表性质：</label>月度报表
          <table className="table table-bordered center">
            <tbody>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
              <tr>
                <td>报表年</td>
                <td>2017年</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Report;
