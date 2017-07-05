import React from 'react'
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class Checkboxes extends React.Component {
  state = {
    checkedList: this.props.defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };
  render() {
    return (
      <div className="checkboxes">
        <div className="checkboxes_wrap">
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            {this.props.titles}
          </Checkbox>
        </div>
        <CheckboxGroup options={this.props.plainOptions} value={this.state.checkedList} onChange={this.onChange} />
      </div>
    );
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.plainOptions.length),
      checkAll: checkedList.length === this.props.plainOptions.length
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.props.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  }
}
