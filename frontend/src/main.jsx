import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const searchRootElement = document.getElementById('root');

if (searchRootElement) {
  createRoot(searchRootElement).render(<App />);
} else {
  console.error("The 'root' element does not exist in the DOM.");
}

// if (rootElement) {
//   createRoot(rootElement).render(<SearchResults />);
// } else {
//   console.error("The 'root' element does not exist in the DOM.");
// }

// if (rootElement) {
//   createRoot(rootElement).render(<FavoriteList />);
// } else {
//   console.error("The 'root' element does not exist in the DOM.");
// }

// if (rootElement) {
//   createRoot(rootElement).render(<CurrentRecipe />);
// } else {
//   console.error("The 'root' element does not exist in the DOM.");
// }

//////////////////////////////////////////////

// This code is necessary to mount the react components when the page is fully loaded.  This allows for proper functionality in the spring boot environment.  For developement you will need to comment it out and use the code below.  When bringing over into IntelliJ you will have to rebuild it(npm run build) and then copy the dist folder(replacing the existing) and updating the JS file in the script source

// import Component1 from './components/SearchForm.jsx';
// import Component2 from './components/Component2';
// import ReactDOM from 'react';

// document.addEventListener('DOMContentLoaded', () => {
//   const component1Mount = document.querySelector(
//     '[data-react-component="component-1-mount"]'
//   );
//   const component2Mount = document.querySelector(
//     '[data-react-component="component-2-mount"]'
//   );

//   if (component1Mount) {
//     ReactDOM.render(<Component1 />, component1Mount);
//   }

//   if (component2Mount) {
//     ReactDOM.render(<Component2 />, component2Mount);
//   }
// });
