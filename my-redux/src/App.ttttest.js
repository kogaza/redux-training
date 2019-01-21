import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

const addCounter = (list) => {
  list.push(0);
  return list
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();
console.log('All tests passed.');