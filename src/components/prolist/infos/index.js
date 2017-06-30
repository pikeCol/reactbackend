import React from 'react';


class Infos extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <div className="nav_head ">
          <button className="btn-primary btn col-sm-offset-9" style={{
            marginRight:'10px'
          }}>下载所选</button>
          <button className="btn-primary btn">上传资料</button>
        </div>
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
