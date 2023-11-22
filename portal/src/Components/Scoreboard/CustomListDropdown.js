import React from 'react'
import { USERAPIURL } from '../Constants'
export const CustomDropdown = (props) => (
  <div className="form-group">
    <strong>{props.name}</strong>
    <select
      className="form-control"
      name="{props.name}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
)
export default class CustomListDropDown extends React.Component {
  
  constructor() {
    super()
  
    this.state = {
      collection: [],
      value: ''
    }
  }
  componentDidMount() {
    fetch(`${USERAPIURL}/fetchRounds`)
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res.rounds }))
  }
  onChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event.target.value );
  }
  render() {
    
    return (
      <div className='dropDownContainer'>
        <b>Select a Round: </b>
        <CustomDropdown
          name={this.state.name}
          options={this.state.collection}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
