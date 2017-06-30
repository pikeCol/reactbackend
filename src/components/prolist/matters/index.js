import React from 'react';

class Metters extends React.Component{
  render(){
    return(
      <div>
        <div className="nav_head ">
          <button className="btn btn-primary col-sm-offset-9">添加通报事项</button>
        </div>
        <div className="col-sm-offset-1 col-sm-10" style={{
          marginTop:'20px'
        }}>
          <table className="table table-bordered center">
            <tbody>
              <tr className="danger">
                <td>添加日期</td>
                <td>事件内容</td>
              </tr>
              <tr>
                <td>2013</td>
                <td>事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Metters;
