import { useState } from 'react';
import './App.css';
import Component1 from './components/Component1';
import Component2 from './components/Component2';

function App() {
  return (
    <>
      <div id="component-1">
        <Component1 />
      </div>
      <div id="component-2">
        <Component2 />
      </div>
    </>
  );
}

export default App;
