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
    roledatas:[],
    projectdata:[],
    optionsWithDisabled: [
      { label: '是', value: '1' },
      { label: '否', value: '0', disabled: false }
    ],
    optionsWithDisabled2: [
      { label: '是', value: '1' },
      { label: '否', value: '0', disabled: true }
    ]
  }
  componentWillMount () {
    var that = this
    $.ajax({
      type:"POST",
      url: '/role/getRoleList.do',
      success:function(datas){
        if ( datas.restCode == 200 ) {
          const {roledatas} = that.state
          that.setState({
            roledatas:datas.data
          })
        }
      }
    })

    $.ajax({
      type:"POST",
      url: '/project/getAllProjects.do',
      success:function(res){
          const {projectdata} = that.state
          that.setState({
            projectdata:[...res]
          })
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
                oid:that.state._postdata.oid,
                accountName:values.accountName,
                roleOid:values.selectrole,
                name:values.name,
                telephone:values.telephone,
                email:values.email,
                accountType:values.accountType,
                isLimit:values['radio-group'],
                projectList:selectval.join()
              },
              url: '/account/updateAccount.do',
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

  prochange = (e,key) => {
    let {_postdata} = this.state
    _postdata[key] =  e
    this.setState({
      _postdata
    })
  }
  changeradio = (e)=> {
    let {_postdata} = this.state
    console.log( e.target.value )
    _postdata.isLimit = e.target.value
    this.setState({
      _postdata
    })
  }
  mychanges = (e) => {
    console.log(e)
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
    const children=[],allproject=[];
    const {roledatas,projectdata} = this.state

    for (let i of roledatas) {
      children.push(<Option key={i.id.toString()} value={i.oid}>{i.roleName}</Option>)
    }
    for (let j of projectdata) {
      allproject.push(<Option key={j.id.toString()} value={j.oid}>{j.projectName}</Option>)
    }
    getFieldDecorator('accountName', { initialValue: [ ] })

    const { accountName,name,accountPassword, accountType,telephone, email, roleOid, roleName, isLimit, projectList }=this.state._postdata
    console.log(projectList)
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
              { required: true, message: '请选择一个账户性质'}
            ],
            initialValue:`${accountType}`
          })(
            <Select  disabled>
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
            ],
            initialValue:roleOid
          })(
            <Select placeholder="请选择" onChange={this.mychanges}>
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


          {/* accountType 1 如果是外部账户这不能选否 */}
          {
            accountType>0?
            <FormItem
              {...formItemLayout}
              label="是否关联项目"
              >
                {getFieldDecorator('radio-group', {
                  rules : [{required : isLimit>0, message : '请选择项目!'}],
                  initialValue:`${isLimit}`
                })(
                  <RadioGroup onChange={this.changeradio} options={this.state.optionsWithDisabled2} />
                )}
              </FormItem>
              :
              <FormItem
                {...formItemLayout}
                label="是否关联项目"
                >
                  {getFieldDecorator('radio-group', {
                    rules : [{required : isLimit>0, message : '请选择项目!'}],
                    initialValue:`${isLimit}`
                  })(
                    <RadioGroup onChange={this.changeradio} options={this.state.optionsWithDisabled} />
                  )}
                </FormItem>
          }

         {
           this.state._postdata.isLimit>0 ?
           <FormItem
             {...formItemLayout}
             label="请配置关联项目"
             >
               {getFieldDecorator('select-multiple', {
                 rules : [{required : isLimit>0, message : '请选择项目!'}],
                 initialValue:this.state._postdata.projectList?this.state._postdata.projectList.split(','):[]
               })(
                 <Select mode="multiple" placeholder="请选择项目" onChange={(val) =>this.prochange(val,'select-multiple')}>
                   {allproject}
                 </Select>
               )}
             </FormItem>
           :''
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
