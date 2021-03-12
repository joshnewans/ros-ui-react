
import React, { Component } from 'react';
import classNames from 'classnames'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CProgress,
  CProgressBar
} from '@coreui/react'
import ROSLIB from 'roslib'
import AxisBar from './AxisBar';






// GAMEPAD HANDLING
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;



class RealGamepad extends Component {

    gamepadScanIntervalId = 0;
    rosSendIntervalId = 0;
  constructor(props) {
    super(props);
    this.controllers = {};
    this.state = {
      a: [],
      axes: [],
      t: 0
    };
    this.ros = new ROSLIB.Ros();
  }

  static defaultProps = {
    deadzone: 0.05
  }





  connecthandler = (e) => {
    this.addgamepad(e.gamepad);
  }


  addgamepad = (gamepad) => {
    this.controllers[gamepad.index] = gamepad;
    console.log("on");
  }


  disconnecthandler = (e) => {
    this.removegamepad(e.gamepad);
  }

  removegamepad = (gamepad) => {
    // var d = document.getElementById("controller" + gamepad.index);
    // document.body.removeChild(d);
    console.log("off");
    delete this.controllers[gamepad.index];
  }

  updateStatus = () => {
    this.scangamepads();
    for (var j = 0; j < this.controllers.length; j++) {
      var controller = this.controllers[j];
      // var d = document.getElementById("controller" + j);
      // var buttons = d.getElementsByClassName("button");
      for (var i = 0; i < controller.buttons.length; i++) {
        // var b = buttons[i];
        var val = controller.buttons[i];
        var pressed = val == 1.0;
        var touched = false;
        if (typeof (val) == "object") {
          pressed = val.pressed;
          if ('touched' in val) {
            touched = val.touched;
          }
          val = val.value;
        }
        var pct = Math.round(val * 100) + "%";
        console.log("b " + String(i) + String(pressed));
      }
    }
  }


  scangamepads = () => {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i] && (gamepads[i].index in this.controllers)) {
        this.controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }





  componentDidMount() {
    console.log("didmount");


    // If there is an error on the backend, an 'error' emit will be emitted.
    this.ros.on('error', function (error) {
      console.log(error);
    });

    // Find out exactly when we made a connection.
    this.ros.on('connection', function () {
      console.log('Connection made!');
    });

    this.ros.on('close', function () {
      console.log('Connection closed.');
    });

    this.ros.connect('ws://192.168.5.180:9090');

    this.topic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/joy',
      messageType: 'sensor_msgs/Joy'
    });


    // Trigger connect/disconnect
    if (haveEvents) {
      window.addEventListener("gamepadconnected", this.connecthandler);
      window.addEventListener("gamepaddisconnected", this.disconnecthandler);
    } else if (haveWebkitEvents) {
      window.addEventListener("webkitgamepadconnected", this.connecthandler);
      window.addEventListener("webkitgamepaddisconnected", this.disconnecthandler);
    } else {
      this.gamepadScanIntervalId = setInterval(this.scangamepads, 500);
    }

    this.rosSendIntervalId = setInterval(this.timerEnd, 20);

  }

  componentWillUnmount () {
    this.ros.close();
    clearInterval(this.gamepadScanIntervalId);
    clearInterval(this.rosSendIntervalId);
  }


  timerEnd = () => {
    this.updateStatus();

    
    let scale = -1. / (1. - this.props.deadzone);

    var joyMsg = {
      header:
      {
        seq: 0,
        stamp: 0,
        frame_id: ""
      },
      axes: [],
      buttons: []
    };

    if (this.controllers[0]) {
      for (var i = 0; i < this.controllers[0].axes.length; i++) {
        joyMsg.axes.push(this.controllers[0].axes[i]*scale);
      }
      for (var i = 0; i < this.controllers[0].buttons.length; i++) {
        joyMsg.buttons.push(this.controllers[0].buttons[i].pressed);
      }
      this.topic.publish(joyMsg);

    }



    if (this.controllers[0]) {
      this.setState((prevState) => ({ t: prevState.t + 1 }));

      var buttonVals = this.controllers[0].buttons.map((item) => item.pressed);
      var axes = this.controllers[0].axes;

      this.setState({ a: buttonVals, axes: axes });



    }
  }





  render() {

    let cols = this.state.a.map((item, index) => <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
      <CButton block color={item > 0 ? "primary" : "secondary"}>{index}</CButton>
    </CCol>);


    let axisDisplays = this.state.axes.map((item, index) => <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
      <AxisBar value={item}/>
    </CCol>);

    return (

      <CCard>
        <CCardHeader>
          <strong>Real Controller</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center">
            {cols}
          </CRow>
          <CRow className="align-items-center mt-3" >
            {axisDisplays}
          </CRow>
        </CCardBody>
      </CCard>

    );
  }
}

export { RealGamepad };