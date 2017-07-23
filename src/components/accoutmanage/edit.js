import { Form, Input, Tooltip, Icon, Select, Row, Col, Button, AutoComplete, Radio   } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import React from 'react';
import { Redirect } from 'react-router-dom'

import Myalert from '../common/alert'

class RegistrationForm extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    redirect:false,
    _postdata:{},
    isconnect:'',
    value:1,
    confirmDirty: false,
    autoCompleteResult: [],
    roledatas:[]
  }
  componentWillMount () {
    var that = this
    $.ajax({
      type:"POST",
      url: '/role/getRoleList.do',
      // url: '../../../api/dds.json',
      success:function(datas){
        if ( datas.restCode == 200 ) {
          const {roledatas} = that.state
          that.setState({
            roledatas:datas.data
          })
        }
      }
    })
  }
  componentWillReceiveProps (nextProps) {
    let _postdata = nextProps.nickname || {}
     this.setState({
       _postdata:_postdata
     })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let that = this
        let selectval = values['select-multiple']||[];
            $.ajax({
              type:"POST",
              data:{
                oid:that.state.oid,
                accountName:values.accountName,
                roleOid:values.roleOid,
                name:values.name,
                telephone:values.telephone,
                email:values.email,
                accountType:values.accountType,
                isLimit:values['radio-group'],
                projectList:selectval.join()
              },
              url: '/account/addAccount.do',
              success:function(datas){
                  if(datas.restCode===200){
                    that.setState({
                      redirect:true,
                    })
                    Myalert.success('success', '创建成功')
                  }
              }
            })
          }
      })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkAccountName = (rule, value, callback) => {
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

  countpro = (value)=>{
    console.log(value)
  }

  changeradio = (e)=> {
    this.setState({
      isconnect:e.target.value
    })
  }

  render() {

    if (this.state.redirect) {
      return(
        <Redirect to={'/menu/accoutmanage'} />
      )
    }

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    console.log(this.state._postdata)
    const children=[];
    const {roledatas} = this.state

    for (let i of roledatas) {
      children.push(<Option value={i.oid}>{i.roleName}</Option>)
    }

    getFieldDecorator('accountName', { initialValue: [ ] })

    const { accountName,name,accountPassword, accountType,telephone, email }=this.state._postdata

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
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 6 },
        sm: { span: 14, offset: 6 }
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
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入你的昵称!', whitespace: true}],
              initialValue:name
            })(
              <Input  />
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
                validator: this.checkAccountName
              }],
              initialValue: accountName,
            })(
              <Input type="text" placeholder="登录账户"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录密码"
            hasFeedback
          >
            {getFieldDecorator('accountPassword', {
              rules: [{
                required: false, message: '请输入你的密码!'
              }, {
                validator: this.checkConfirm
              }],
              initialValue:accountPassword
            })(
              <Input type="password" placeholder="初始密码"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="账户性质"
            hasFeedback
          >
          {getFieldDecorator('accountType', {
            rules: [
              { required: true, message: '请选择一个账户性质' }
            ],
            initialValue:accountType
          })(
            <Select placeholder="请选择" onChange={this.countpro}>
              <Option value="1">外部账户</Option>
              <Option value="0">内部账户</Option>
            </Select>
          )}
        </FormItem>

          <FormItem
            {...formItemLayout}
            label="角色"
            hasFeedback
          >
          {getFieldDecorator('selectrole', {
            rules: [
              { required: true, message: '请选择一个角色性质' }
            ]
          })(
            <Select placeholder="请选择">
              {children}
            </Select>
          )}
        </FormItem>

          <FormItem
            {...formItemLayout}
            label="Phone Number"
          >
            {getFieldDecorator('telephone', {
              rules: [{ required: false, message: 'Please input your phone number!' }],
              initialValue:telephone
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
              initialValue: email
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
             {...formItemLayout}
             label="是否关联项目"
           >
           {getFieldDecorator('radio-group')(
             <RadioGroup onChange={this.changeradio}>
               <Radio value="1">是</Radio>
               <Radio value="0">否</Radio>
             </RadioGroup>
           )}
         </FormItem>

         {
           this.state.isconnect>0?
           <FormItem
             {...formItemLayout2}
             label=""
           >
             {getFieldDecorator('select-multiple')(
               <Select mode="multiple" placeholder="请选择项目">
                 <Option value="12345">12345 人众项目</Option>
                 <Option value="12344">12344 浙银资产</Option>
               </Select>
             )}
           </FormItem>
           :
           <FormItem
             {...formItemLayout}
             label="请配置关联项目"
           >
             {getFieldDecorator('select-multiple')(
               <Select mode="multiple" placeholder="请选择项目">
                 <Option value="12345">12345 人众项目</Option>
                 <Option value="12344">12344 浙银资产</Option>
               </Select>
             )}
           </FormItem>
         }
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
import $ from 'jquery'

export default class Edit extends React.Component{
  state={
    postdata:[]
  }
  componentWillMount () {
    let {postdata} = this.state
    let that = this
    if ( this.props.location.state.oid ){
      let oid = this.props.location.state.oid;
      $.ajax({
        type:"POST",
        url: '/account/getAccountDetail.do',
        data:{
          oid: oid,
        },
        // url: '/getAccountDetail.json',
        success:function(datas){
          postdata = datas.data
          that.setState({
            postdata
          })
        }
      })

    }

  }

  render(){
    const {postdata} = this.state
    // console.log(postdata)
    return(
        <div>
          <WrappedRegistrationForm  nickname={this.state.postdata} />
        </div>
        )

  }
}
