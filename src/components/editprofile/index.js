import { Form, Input, Select, Row, Col, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import React from 'react';
import $ from 'jquery'

import Myalert from '../common/alert'


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let oid = window.localStorage.getItem('oid')
    let roleOid = window.localStorage.getItem('roleOid')
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        $.ajax({
          type:"POST",
          url: '/account/updateAccount.do',
          data:{
            oid:oid,
            accountName:values.accountName,
            roleOid:roleOid || null,
            name:values.name|| null,
            telephone:values.telephone|| null,
            email:values.email|| null,
            accountType:values.accountType|| null,
          },
          // url: '/getAccountDetail.json',
          success:function(datas){
            if (datas.restCode===200) {
              Myalert.success('success', '修改成功')
              window.localStorage.setItem('accountName',values.accountName)
            }
            // postdata = datas.data
            // that.setState({
            //   postdata
            // })
          }
        })
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
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    getFieldDecorator('accountName', { initialValue: [ ] })
    getFieldDecorator('_name', { initialValue: [ ] })
    getFieldDecorator('telephone', { initialValue: [ ] })
    getFieldDecorator('email', { initialValue: [ ] })
    getFieldDecorator('rootName', { initialValue: [ ] })
    let accountName = localStorage.getItem('accountName')
    let _name = localStorage.getItem('name')
    let telephone = localStorage.getItem('telephone')
    let email = localStorage.getItem('email')
    let rootName = localStorage.getItem('rootName')
    return (
      <Row >
        <Col span={10} offset={7} style={{paddingTop:'40px'}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                姓名
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
              initialValue:_name
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录账户"
            hasFeedback
          >
            {getFieldDecorator('accountName', {
              rules: [{
                required: true, message: '请输入你的账户!'
              }, {
                validator: this.checkConfirm,
              }],
              initialValue:accountName||"admin1"
            })(
              <Input type="text" placeholder="登录账户" disabled />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
          >
            {getFieldDecorator('roleType', {
              rules: [{ required: true, message: 'Please select your habitual residence!' }],
              initialValue:rootName || ''
            })(
              <Select placeholder="请选择" disabled>
                <Option value="0">外部角色</Option>
                <Option value="1">内部角色</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机"
          >
            {getFieldDecorator('gtelephone	', {
              rules: [{ required: false, message: '请输入你的手机号!' }],
              initialValue:telephone || ''
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
              }],
              initialValue:email
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">确认修改</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class Editprofile extends React.Component{
  render(){
    return(
      <WrappedRegistrationForm />
    )
  }
}
export default Editprofile;
