import React from 'react';
//
// const temLi=({label})=>(
//
// )

class Rolemanage extends React.Component{
  constructor(){
    super()
    this.state={
      liston:''
    }
  }
  change=(e)=>{
    let t=e.target.value
    this.setState({
      liston:t
    })
  }
  render(){
    return(
      <div>
        <div style={{
          height: '60px',
          borderBottom: '1px solid rgb(211, 211, 211)'
        }}>
            <form className="form-inline" style={{
              paddingTop:'14px'
            }}>
              <div className="form-group col-sm-offset-1">
                <label htmlFor="exampleInputName2">新建角色</label>
                <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail2">角色名称</label>
                <input type="email" className="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com" />
              </div>
            </form>

        </div>
        <div className="col-sm-10 col-sm-offset-1"  style={{paddingLeft:0}}>
          <p>请配置权限</p>
          <div className="col-sm-10 col-sm-offset-1" style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 onClick={this.change}>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> 项目管理列表
                  </label>
                </div>
              </h4>
              <ul style={{
                paddingLeft:'20px'
              }}>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={this.state.liston?'on':'off'}/>查看详情
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />添加
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> 项目模板列表
                  </label>
                </div>
              </h4>
              <ul style={{
                paddingLeft:'20px'
              }}>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />查看详情
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />添加
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> 角色列表
                </label>
              </div>
              </h4>
              <ul style={{
                paddingLeft:'20px'
              }}>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />新建角色
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />编辑角色
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />停用角色
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />删除角色
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> 个人中心
                  </label>
                </div>
              </h4>
              <ul style={{
                paddingLeft:'20px'
              }}>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />修改资料
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />修改密码
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Rolemanage;
