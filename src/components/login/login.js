import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import { Redirect } from 'react-router-dom'
import $ from  'jquery'


// let baseurl = 'http://192.168.0.209:8080'

export default class NormalLoginForm extends React.Component {
  state={
    islogin:false,
    picurl:''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let url = '/sys/login.do'
        let that = this
        $.ajax({
      		type:"POST",
      		url: '/sys/login.do',
      		data:{
      			 username:values.username,
      			 password:values.password,
      			 vcode:values.vcode
      		},
      		dataType:"json",
      		success:function(data){
      			if( data.restCode === 200 ){

              // 保存到localstorage
              let storage = window.localStorage
              storage.setItem("accountName",data.data.accountName)
              storage.setItem("oid",data.data.oid)
              storage.setItem("status",data.data.status)
              that.setState({
                islogin:true
              })
            }
      	  }
      	})

      }

    });
  }
  changpic = () =>{
    let {picurl} = this.state
    let url='/sys/vercode.do?d=';
    var timenow = new Date().getTime();
    this.setState({
      picurl:url+timenow
    })
  }
  componentWillMount () {
    let {picurl} = this.state
    let url=  '/sys/vercode.do?d=';
    var timenow = new Date().getTime();
    this.setState({
      picurl:url+timenow
    })
  }

  // 账号验证
  account = (rule, value, callback) => {
    if( value.toString().length < 2) {
      callback('请输入正确的账号')
    }
    callback()
  }
  // 密码验证
  password_validate = (rule, value, callback) => {
    if( value.toString().length < 2) {
      callback('请输入正确的密码')
    }
    callback()
  }
  render() {
    const { picurl } = this.state
    if(this.state.islogin){
      return(
        <Redirect to={'/menu'}  />
      )
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入你的账号!'
            }, {
              validator:this.account
            }]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入你的密码!'
            }, {
              validator:this.password_validate
            }]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <FormItem>
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('vcode', {
                rules: [{
                  required: true, message: '请输入验证码!'
                }]
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12} style={{textAlign:'right'}}>
              <Button size="large" style={{overflow:'hidden',width:'86px',padding:'0'}}>
                <img src={picurl} onClick={this.changpic} />
              </Button>
            </Col>
          </Row>
        </FormItem>

        {/* <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox style={{color:"#fff"}}>Remember me</Checkbox>
          )}
        </FormItem> */}
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    );
  }
}
