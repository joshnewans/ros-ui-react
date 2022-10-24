
import React, { Component } from 'react';
import classNames from 'classnames'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import ROSLIB from 'roslib'
import AxisBar from './AxisBar';
import { applyDeadzone } from './JoystickHelpers'
import Gamepads from 'gamepads';


class RealGamepad extends Component {

    gamepadScanIntervalId = 0;
    rosSendIntervalId = 0;
  constructor(props) {
    super(props);
    this.controllers = {};
    this.state = {
      buttons: [],
      axes: [],
      t: 0
    };
    this.ros = new ROSLIB.Ros();
  }

  static defaultProps = {
    deadzone: 0.25
  }



  connecthandler = (e) => {
    this.addgamepad(e.gamepad);
  }


  addgamepad = (gamepad) => {
    this.controllers[gamepad.gamepad.index] = gamepad;
    console.log("Gamepad Connected");
  }


  disconnecthandler = (e) => {
    this.removegamepad(e.gamepad);
  }

  removegamepad = (gamepad) => {
    console.log("Gamepad Disconnected");
    delete this.controllers[gamepad.gamepad.index];
  }

  updateStatus = () => {
    for (const [key, value] of Object.entries(this.controllers)) {
      var controller = this.controllers[key].gamepad;
      for (var i = 0; i < controller.buttons.length; i++) {
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
      }
    }
  }


  componentDidMount() {

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

    this.ros.connect(this.props.rosbridgeAddress);

    this.topic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/joy',
      messageType: 'sensor_msgs/Joy'
    });

    Gamepads.start();

    Gamepads.addEventListener("connect", this.connecthandler);
    Gamepads.addEventListener("disconnect", this.disconnecthandler);

    this.rosSendIntervalId = setInterval(this.timerEnd, 20);

  }

  componentWillUnmount () {
    this.ros.close();
    Gamepads.stop();
    clearInterval(this.rosSendIntervalId);
  }


  timerEnd = () => {
    this.updateStatus();



    var joyMsg = {
      header:
      {
        // seq: 0,
        stamp: [0,0],
        frame_id: ""
      },
      axes: [],
      buttons: []
    };

    if (this.controllers[0]) {
      var controller = this.controllers[0].gamepad;
      for (var i = 0; i < controller.axes.length; i++) {

        joyMsg.axes.push(applyDeadzone(controller.axes[i], this.props.deadzone));
      }
      for (var i = 0; i < controller.buttons.length; i++) {
        joyMsg.buttons.push(controller.buttons[i].pressed ? 1 : 0);
      }
      this.topic.publish(joyMsg);

      var buttonVals = controller.buttons.map((item) => item.pressed);
      var axes = controller.axes;

      this.setState((prevState) => ({ t: prevState.t + 1, buttons: buttonVals, axes: axes }));

    }
  }





  render() {

    let cols = this.state.buttons.map((item, index) => <CCol key={index} col="6" sm="4" md="2" xl className="mb-3 mb-xl-0  d-grid gap-2">
      <CButton block="true" color={item > 0 ? "primary" : "secondary"}>{index}</CButton>
    </CCol>);


    let axisDisplays = this.state.axes.map((item, index) => <CCol key={index} col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
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