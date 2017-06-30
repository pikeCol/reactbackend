import { Form, Input, Select, Row, Col, Button, AutoComplete,  } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
import React from 'react'


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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

    return (
      <Row >
        <Col span={10} offset={7} style={{paddingTop:'40px'}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
           {...formItemLayout}
           label="旧密码"
           hasFeedback
         >
           {getFieldDecorator('oldpassword', {
             rules: [{
               required: true, message: 'Please input your password!'
             }, {
               validator: this.checkConfirm
             }]
           })(
             <Input type="password" />
           )}
         </FormItem>
          <FormItem
           {...formItemLayout}
           label="新密码"
           hasFeedback
         >
           {getFieldDecorator('newpassword', {
             rules: [{
               required: true, message: 'Please input your password!'
             }, {
               validator: this.checkConfirm
             }]
           })(
             <Input type="password" />
           )}
         </FormItem>
         <FormItem
         {...formItemLayout}
         label="确定密码"
         hasFeedback
       >
         {getFieldDecorator('confirm', {
           rules: [{
             required: true, message: 'Please confirm your password!'
           }, {
             validator: this.checkPassword
           }]
         })(
           <Input type="password" onBlur={this.handleConfirmBlur} />
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

class Editpass extends React.Component{
  render(){
    return(
      <WrappedRegistrationForm />
    )
  }
}
export default Editpass;
