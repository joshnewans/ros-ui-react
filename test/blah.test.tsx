import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SimGamepad } from '../src/SimGamepad';
import { RealGamepad } from '../src/SimGamepad';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimGamepad />, div);
    ReactDOM.render(<RealGamepad />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
