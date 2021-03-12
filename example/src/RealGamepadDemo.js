import { RealGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

function RealGamepadDemo() {
  return (
    <div className="App">
      <RealGamepad />
      <ImageStream src="http://192.168.5.180:8080/stream?topic=/custom_ns/camera1/image_raw" />
    </div>
  );
}

export default RealGamepadDemo;
