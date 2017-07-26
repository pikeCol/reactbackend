import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Button, AutoComplete, Radio   } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import React from 'react';

import Myalert from '../../common/alert'
import { Redirect } from 'react-router-dom'

class RegistrationForm extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    redirect:false,
    _postdata:{},
    isconnect:'',
    value:1,
    roleOid:'',
    confirmDirty: false,
    autoCompleteResult: [],
    roledatas:[],
    projectdata:[],
    optionsWithDisabled: [
      { label: '是', value: '1' },
      { label: '否', value: '0', disabled: false }
    ]
  }
  componentWillMount () {
    // 獲取角色列表
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let that = this
        let selectval = values['select-multiple']||[];
        const { roleOid } = this.state
        console.log(roleOid)
        $.ajax({
          type:"POST",
          data:{
            accountName:values.accountName
          },
          url: '/account/findAccuntRepeat.do',
          success:function(datas){
              if(datas.restCode===200){
                // 如果账户可用
                $.ajax({
                  type:"POST",
                  data:{
                    oid:that.state.oid,
                    accountName:values.accountName,
                    roleOid:roleOid,
                    name:values.name,
                    telephone:values.phone,
                    email:values.email,
                    accountType:values.accountType,
                    isLimit:values['radio-group'],
                    projectList:selectval.join()
                  },
                  url: '/account/addAccount.do',
                  success:function(datas){
                      if(datas.restCode===200){
                        Myalert.success('success', '创建成功')
                        that.setState({
                          redirect:true
                        })
                      }
                  }
                })

              } else {
                Myalert.error('Error', '账户存在')
              }
          }
        })


      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
    let { optionsWithDisabled } = this.state
    console.log(value)
    if ( value == 1) {
      optionsWithDisabled[1].disabled = true
      this.props.form.setFieldsValue({
         'radio-group': `1`,
       });
    } else {
      optionsWithDisabled[1].disabled = false
    }
    this.setState({
      optionsWithDisabled,
      isconnect:'1'
    })

  }

  changeradio = (e)=> {
    this.setState({
      isconnect:e.target.value
    })
  }
  selectrole = (val) => {
    this.setState({
      roleOid:val
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const children=[],allproject=[];
    const {roledatas, projectdata} = this.state

    for (let i of roledatas) {
      children.push(<Option value={i.oid}>{i.roleName}</Option>)
    }
    for (let j of projectdata) {
      allproject.push(<Option key={j.id} value={j.oid}>{j.projectName}</Option>)
    }

    getFieldDecorator('accountName', { initialValue: [ ] })


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
    if (this.state.redirect) {
      return(
        <Redirect to={'/menu/accoutmanage'}/>
      )
    }

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
              rules: [{ required: true, message: '请输入你的姓名!', whitespace: true}],
              initialValue: ""
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
              initialValue: "",
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
                required: false, message: ''
              }],
              initialValue:""
            })(
              <Input type="password" placeholder="初始密码" disabled/>
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
            initialValue:""
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
            <Select placeholder="请选择" onChange={this.selectrole}>
              {children}
            </Select>
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
              }]
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
             {...formItemLayout}
             label="是否关联项目"
           >
           {getFieldDecorator('radio-group',{
             rules : [{required : this.props.form.getFieldValue('accountType')>0, message : '请选择项目!'}]
           })(
             <RadioGroup onChange={this.changeradio}  options={this.state.optionsWithDisabled} />
           )}
         </FormItem>

         {
           this.state.isconnect>0?
           <FormItem
             {...formItemLayout}
             label="请配置关联项目"
             >
               {getFieldDecorator('select-multiple', {
                 rules : [{required : this.props.form.getFieldValue('accountType')>0, message : '请选择项目!'}]
               })(
                 <Select mode="multiple" placeholder="请选择项目">
                   {allproject}
                 </Select>
               )}
             </FormItem>
           :''
          //  <FormItem
          //    {...formItemLayout2}
          //    label=""
          //  >
          //    {getFieldDecorator('select-multiple')(
          //      <Input disabled/>
          //    )}
          //  </FormItem>
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

export default class Add extends React.Component{
  state={
    postdata:[]
  }
  // componentWillMount () {
  //
  // }

  render(){
    const {postdata} = this.state
    console.log(postdata)
    return(
        <div>
          <WrappedRegistrationForm
            // nickname={this.state.postdata}
           />
        </div>
        )

  }
}
