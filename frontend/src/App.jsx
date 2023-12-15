import { useState } from 'react';
import './App.css';
import SearchFormComponent from './components/SearchFormComponent';
import DisplayResultsComponent from './components/DisplayResultsComponent';
import CurrentRecipeComponent from './components/CurrentRecipeComponent';
import FavoriteRecipesComponent from './components/FavoriteRecipesComponent';
import AddYourOwnRecipeComponent from './components/AddYourOwnRecipeComponent';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <div id="recipe-search-component">
        <SearchFormComponent setSearchResults={handleSearchResults} />
      </div>

      <div className="mainBody">
        <DisplayResultsComponent
          id="display-results-component"
          searchResults={searchResults}
        />
        <CurrentRecipeComponent id="current-recipe-component" />
        <div className="rightsideBody">
          <FavoriteRecipesComponent id="favorite-recipes-component" />
          <AddYourOwnRecipeComponent id="add-your-own-recipe-component" />
        </div>
      </div>
    </>
  );
}

export default App;
