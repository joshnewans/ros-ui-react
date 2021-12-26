import { RealGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

function RealGamepadDemo() {
  return (
    <div className="App">
      <RealGamepad />
      {/* <ImageStream src="http://192.168.5.180:8080/stream?topic=/image_raw/uncompressed" /> */}
      <ImageStream src="http://192.168.5.179:8080/stream?topic=/image_raw/uncompressed" />
      {/* <ImageStream src="http://192.168.5.180:8080/stream?topic=/blob/image_blob" /> */}
    </div>
  );
}

export default RealGamepadDemo;
