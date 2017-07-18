//
// gettable = () =>{
//   const {tablehead} = this.state;
//   let {htmls, datas}=this.state
//   $.each(tablehead,function(index,value){
//     htmls += `<tr><td>${value}</td>`;
//     $.each(datas, function(item, items){
//       htmls += `<td>${items[index]}</td>`;
//     })
//     htmls += `</tr>`
//   })
//   console.log(htmls)
//   return {__html: htmls};
// }
// adddatas =() => {
//   let { datas }=this.state
//   let newdata = {
//     lv1:`<span class="ant-calendar-picker"><div><input readonly="" value="2015" placeholder="请选择日期" class="ant-calendar-picker-input ant-input"><i class="anticon anticon-cross-circle ant-calendar-picker-clear"></i><span class="ant-calendar-picker-icon"></span></div></span>`,
//     lv2:`<span class="ant-calendar-picker"><div><input readonly="" value="06" placeholder="请选择日期" class="ant-calendar-picker-input ant-input"><i class="anticon anticon-cross-circle ant-calendar-picker-clear"></i><span class="ant-calendar-picker-icon"></span></div></span>`,
//     lv3:'总资产',
//     lv4:'净资产',
//     lv5:'实收资本',
//     lv6:'货币资本',
//     lv7:'营收资本',
//     lv8:'净利'
//   }
//   this.setState({
//     datas:[...datas, newdata]
//   })
// }
//





data = result.data.reportDatas
 data.isedit = false
 // 获取表头信息
 let _cols = result.data.templateDetails
 for (let value of _cols) {
    value.title = value.name;
    value.dataIndex=value.valCode
    value.render=this.usrender
    if(value.valCode=='val1') {
      value.render= this.yearender
      console.log(value)
      //  render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
    }
    if(value.valCode=='val2') {
      value.render= this.monrender
    }
  }
this.setState({
  columns:[..._cols],
  data:[...data]
})


yearender=(text, record, index) =>{
  let {editable,addable} = this.state
  let texts = text || '2017'
  return(
    <div>
      {
        this.state.data[index].isedit?
        <Myadd text={texts}/>
        :
         <div>
           {
             editable?
             <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat}/>
             :
             <p>{text}</p>
           }
         </div>
      }
    </div>
  )
}
monrender=(text, record, index) =>{
  let {editable,addable} = this.state
  return(
    <div>
      {
        this.state.data[index].isedit?
        <MonthPicker  defaultValue={moment('1', monthFormat)} format={monthFormat}/>
        :
        <div>
          {
            editable?
            <MonthPicker  defaultValue={moment(text, monthFormat)} format={monthFormat}/>
            :
            <p>{text}</p>
          }
        </div>
      }
    </div>
  )
}
usrender=(text, record, index) =>{
  let {editable,addable} = this.state
  return(
    <div>
      {
        this.state.data[index].isedit?
        <EditableCell
         value={text}
         editable={this.state.data[index].isedit}
         onChange={this.onCellChange(index, this.state.data[index].dataIndex)}
       />
        :
        <p>{text}</p>

      }
    </div>
  )
}



class Myedit extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const text = this.props.text
    const editable = this.props.editable
    return(
      <div>
        {
          editable?
          <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat}/>
          :
          <p>{text}</p>
        }
      </div>
    )
  }
}
