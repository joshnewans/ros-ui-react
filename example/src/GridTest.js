// import { SimGamepad } from 'ros-ui-react';
import { RealGamepad } from 'ros-ui-react';
import { ImageStream } from 'ros-ui-react';
import './App.css';
import './scss/style.scss';

import React from "react";
// import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default class GridTest extends React.PureComponent {
  static defaultProps = {
    onLayoutChange: function() {},
  };

  // constructor(props) {
  //   super(props);
  // }


  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        onLayoutChange={this.onLayoutChange}
        {...this.props}
        verticalCompact={false}
        autoSize={true}
        cols={48}
        rowHeight={30}
      >
        <div key="b" data-grid={{x: 0, y: 0, w: 16, h: 6}}><RealGamepad /></div>
        <div key="c" data-grid={{x: 16, y: 0, w: 32, h: 22}} style={{overflow: "hidden"}}><ImageStream src="http://192.168.5.180:8080/stream?topic=/custom_ns/camera1/image_raw" /></div>
      </ReactGridLayout>
    );
  }
}