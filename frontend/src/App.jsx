import { useState } from 'react';
import './App.css';
import RecipeSearchComponent from './components/RecipeSearchComponent';
import Component2 from './components/Component2';

function App() {
  return (
    <>
      <div id="recipe-search-component">
        <RecipeSearchComponent />
      </div>
      <div id="component-2">
        <Component2 />
      </div>
    </>
  );
}

export default App;
