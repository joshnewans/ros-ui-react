
import React, { Component } from 'react';
import classNames from 'classnames'
import {
  CProgress
} from '@coreui/react'




class AxisBar extends Component {

    constructor(props) {
      super(props);
    }
  
  
  

  
    render() {

  
      return (
        <CProgress
        color="dark"
        value={50 * (this.props.value + 1)}
        showvalue="true"
        className="mb-1"
      />

  
      );
    }
  }
  
  export default AxisBar;