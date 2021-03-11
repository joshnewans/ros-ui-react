
import React, { Component } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'




class ImageStream extends Component {

    constructor(props) {
        super(props);
      }


  render() {

    return (

      <CCard>
        <CCardHeader>
          <strong>Image Stream</strong>
        </CCardHeader>
        <CCardBody>
        <img src={this.props.src}></img>
        </CCardBody>
      </CCard>

    );
  }
}

export { ImageStream };