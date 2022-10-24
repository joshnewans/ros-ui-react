import { SimGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

function SimGamepadDemo() {
  return (
    <div className="App">
      <ImageStream src="http://localhost:8080/stream?topic=/camera/image_raw" />
      <SimGamepad rosbridgeAddress="ws://localhost:9090"/>
    </div>
  );
}

export default SimGamepadDemo;
