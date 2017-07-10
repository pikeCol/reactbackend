<<<<<<< HEAD
import { Table, Input, Popconfirm, Icon } from 'antd';
import React from 'react'

export default class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    // let { isedit } = this.props.isedit
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              {
                this.props.isedit ?
                <Icon
                  type="edit"
                  className="editable-cell-icon"
                  onClick={this.edit}
                />:''
              }
            </div>
        }
      </div>
    );
  }
}


=======
// import { Table, Input, Icon, Button } from 'antd';
>>>>>>> 11642f088613eb1b2eaea993fd237dee0d1a657c
//
// export default class EditableCell extends React.Component {
//   state = {
//     value: this.props.value,
<<<<<<< HEAD
//     editable: this.props.editable || false,
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.editable !== this.state.editable) {
//       this.setState({ editable: nextProps.editable });
//       if (nextProps.editable) {
//         this.cacheValue = this.state.value;
//       }
//     }
//     if (nextProps.status && nextProps.status !== this.props.status) {
//       if (nextProps.status === 'save') {
//         this.props.onChange(this.state.value);
//       } else if (nextProps.status === 'cancel') {
//         this.setState({ value: this.cacheValue });
//         this.props.onChange(this.cacheValue);
//       }
//     }
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     return nextProps.editable !== this.state.editable ||
//            nextState.value !== this.state.value;
//   }
//   handleChange(e) {
//     const value = e.target.value;
//     this.setState({ value });
//   }
=======
//     editable: false,
//   }
//   handleChange = (e) => {
//     const value = e.target.value;
//     this.setState({ value });
//   }
//   check = () => {
//     this.setState({ editable: false });
//     if (this.props.onChange) {
//       this.props.onChange(this.state.value);
//     }
//   }
//   edit = () => {
//     this.setState({ editable: true });
//   }
>>>>>>> 11642f088613eb1b2eaea993fd237dee0d1a657c
//   render() {
//     const { value, editable } = this.state;
//     return (
//       <div>
//         {
//           editable ?
//             <div>
//               <Input
//                 value={value}
//                 onChange={e => this.handleChange(e)}
//               />
//             </div>
//             :
//             <div className="editable-row-text">
//               {value.toString() || ' '}
//             </div>
//         }
//       </div>
//     );
//   }
// }
