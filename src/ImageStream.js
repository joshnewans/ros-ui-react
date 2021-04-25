
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

      <CCard style={{width: "100%", height: "100%"}}>
      <CCardHeader>
        <strong>Image Stream</strong>
      </CCardHeader>
      <CCardBody>
        <img src={this.props.src} style={{width: "100%", height: "100%", objectFit: "contain"}}></img>
      </CCardBody>
    </CCard>


    

    );
  }
}

export { ImageStream };