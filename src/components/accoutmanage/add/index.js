import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Button, AutoComplete  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import React from 'react';

const residences = [{
  value: '请选择',
  label: '请选择'
},{
  value: '内部角色',
  label: '内部角色'
},{
  value: '外部角色',
  label: '外部角色'
}];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Row >
        <Col span={10} offset={7} style={{paddingTop:'40px'}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                姓名&nbsp;
                <Tooltip title="你的昵称">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录账户"
            hasFeedback
          >
            {getFieldDecorator('text', {
              rules: [{
                required: true, message: '请输入你的账户!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="text" placeholder="登录账户"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: false, message: 'Please input your password!'
              }, {
                validator: this.checkConfirm
              }],
            })(
              <Input type="password" placeholder="初始密码"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账户性质"
          >
            {getFieldDecorator('residence', {
              initialValue: ['请选择'],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }]
            })(
              <Cascader options={residences} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
          >
            {getFieldDecorator('residence', {
              initialValue: ['请选择'],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }]
            })(
              <Cascader options={residences} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: 'Please input your phone number!' }]
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="E-mail"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!'
              }, {
                required: false, message: 'Please input your E-mail!'
              }],
            })(
              <Input />
            )}
          </FormItem>


          {/* <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
          </FormItem> */}
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">保存</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Add extends React.Component{
  render(){
    return(
          <WrappedRegistrationForm />
        )

  }
}





























// import React from 'react';
// import Dot from '../../common/dot'
//
// class Add extends React.Component{
//   render(){
//     return(
//       <div className="col-sm-4 col-sm-offset-4" style={{
//         marginTop:'50px'
//       }}>
//         <form className="form-horizontal">
//           <div className="form-group">
//             <label htmlFor="inputEmail3" className="col-sm-4 control-label"><Dot />姓名</label>
//             <div className="col-sm-8">
//               <input type="email" className="form-control" id="inputEmail3" placeholder="旧密码" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label"><Dot />登录账户</label>
//             <div className="col-sm-8">
//               <input type="password" className="form-control" id="inputPassword3" placeholder="新密码" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label">登录密码</label>
//             <div className="col-sm-8">
//               <input type="password" className="form-control" id="inputPassword3" placeholder="新密码" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label"><Dot />账户性质</label>
//             <div className="col-sm-8">
//               <select className="form-control">
//                 <option>请选择用户性质</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label"><Dot />角色</label>
//             <div className="col-sm-8">
//               <select className="form-control">
//                 <option>请选择角色</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label">手机</label>
//             <div className="col-sm-8">
//               <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label">邮箱</label>
//             <div className="col-sm-8">
//               <input type="password" className="form-control" id="inputPassword3" placeholder="确认密码" />
//             </div>
//           </div>
//           <div className="form-group" style={{position:'relative'}}>
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label">是否限制项目</label>
//             <span style={{
//               position:'absolute',
//               bottom:'-22px',
//               fontSize: '10px',
//               left: '30px'
//             }}>带<Dot />为必填项目</span>
//             <div className="col-sm-8">
//               <label className="radio-inline">
//                 <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 是
//               </label>
//               <label className="radio-inline">
//                 <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 否
//               </label>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="inputPassword3" className="col-sm-4 control-label">角色</label>
//             <div className="col-sm-8">
//               <select className="form-control">
//                 <option>项目名称</option>
//               </select>
//             </div>
//           </div>
//
//           <div className="form-group">
//             <div className="col-sm-offset-3 col-sm-9">
//               <button type="submit" className="btn btn-primary">确认修改</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
// export default Add;
