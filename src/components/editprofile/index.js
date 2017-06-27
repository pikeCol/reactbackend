import React from 'react';

class Editprofile extends React.Component{
  render(){
    return(
      <div className="col-sm-4 col-sm-offset-4" style={{
        marginTop:'50px'
      }}>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-3 control-label">姓名</label>
            <div className="col-sm-9">
              <input type="email" className="form-control" id="inputEmail3" placeholder="旧密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-3 control-label">登录账户</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="inputPassword3" placeholder="新密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-3 control-label">角色</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-3 control-label">手机</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-3 control-label">邮箱</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <button type="submit" className="btn btn-primary">确认修改</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default Editprofile;
