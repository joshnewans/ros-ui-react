import { SimGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

function SimGamepadDemo() {
  return (
    <div className="App">
      <SimGamepad />
      <ImageStream src="http://192.168.5.180:8080/stream?topic=/custom_ns/camera1/image_raw" />
    </div>
  );
}

export default SimGamepadDemo;
