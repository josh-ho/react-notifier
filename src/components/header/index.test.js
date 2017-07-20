import React from 'react';
import ReactDOM from 'react-dom';
import Header from './index.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});

it('goes to the proper link', () => {

});
