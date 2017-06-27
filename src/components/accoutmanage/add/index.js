import React from 'react';
import Dot from '../../common/dot'

class Add extends React.Component{
  render(){
    return(
      <div className="col-sm-4 col-sm-offset-4" style={{
        marginTop:'50px'
      }}>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-4 control-label"><Dot />姓名</label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="inputEmail3" placeholder="旧密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label"><Dot />登录账户</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" id="inputPassword3" placeholder="新密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">登录密码</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" id="inputPassword3" placeholder="新密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label"><Dot />账户性质</label>
            <div className="col-sm-8">
              <select className="form-control">
                <option>请选择用户性质</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label"><Dot />角色</label>
            <div className="col-sm-8">
              <select className="form-control">
                <option>请选择角色</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">手机</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">邮箱</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
            </div>
          </div>
          <div className="form-group" style={{position:'relative'}}>
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">是否限制项目</label>
            <span style={{
              position:'absolute',
              bottom:'-22px',
              fontSize: '10px',
              left: '30px'
            }}>带<Dot />为必填项目</span>
            <div className="col-sm-8">
              <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 是
              </label>
              <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 否
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">角色</label>
            <div className="col-sm-8">
              <select className="form-control">
                <option>项目名称</option>
              </select>
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
export default Add;
