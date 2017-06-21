import React from 'react'

export default class Logbtn extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <button type="submit" class="btn btn-default">{this.props.names}</button>
    )
  }
}
