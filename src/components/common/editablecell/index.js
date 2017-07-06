import { Table, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';


class EditableCell extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let { value } = this.props
    return (
      <div className="editable-cell">
        {
          value ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state)  {
  return {
    value: state.isedit
  };
}

export default connect(
  mapStateToProps
)(EditableCell)

































// export default class EditableCell extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       value: this.props.value,
//       editable: this.props.editable,
//     }
//   }
//
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
//
//   render() {
//     const { value, editable } = this.state;
//     return (
//       <div className="editable-cell">
//         {
//           editable ?
//             <div className="editable-cell-input-wrapper">
//               <Input
//                 value={value}
//                 onChange={this.handleChange}
//                 onPressEnter={this.check}
//               />
//             </div>
//             :
//             <div className="editable-cell-text-wrapper">
//               {value || ' '}
//             </div>
//         }
//       </div>
//     );
//   }
// }
