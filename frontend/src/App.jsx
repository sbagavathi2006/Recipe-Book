import { useState, useEffect } from 'react';
import './App.css';
import SearchFormComponent from './components/SearchFormComponent';
import DisplayResultsComponent from './components/DisplayResultsComponent';
import CurrentRecipeComponent from './components/CurrentRecipeComponent';
import FavoriteRecipesComponent from './components/FavoriteRecipesComponent';
import AddYourOwnRecipeComponent from './components/AddYourOwnRecipeComponent';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [update, setUpdate] = useState(0);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleRecipe = (recipe) => {
    setRecipe(recipe);
  };

  const handleShowAddRecipeForm = (bool) => {
    setShowAddRecipeForm(bool);
  };

  const handleUpdate = (number) => {
    setUpdate(number);
  };

  const handleLoadingSearch = (bool) => {
    setLoadingSearch(bool);
  };

  const handleLoadingRecipe = (bool) => {
    setLoadingRecipe(bool);
  };

  const handleUpdateStatus = (bool) => {
    console.log('click');
    setUpdateStatus(bool);
  };

  useEffect(() => {
    fetch('http://localhost:8080/getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((userData) => {
        setCurrentUser(userData);
        console.log('Current User:', currentUser);
      })
      .catch((error) => {
        console.error('There was a problem fetching the current user:', error);
      });
  }, []);

  return (
    <>
      <div id="recipe-search-component">
        <SearchFormComponent
          setSearchResults={handleSearchResults}
          setLoadingSearch={handleLoadingSearch}
        />
      </div>

      <div className="mainBody">
        <DisplayResultsComponent
          id="display-results-component"
          searchResults={searchResults}
          setRecipe={handleRecipe}
          setShowAddRecipeForm={handleShowAddRecipeForm}
          loadingSearch={loadingSearch}
          setLoadingRecipe={handleLoadingRecipe}
        />

        <CurrentRecipeComponent
          id="current-recipe-component"
          recipe={recipe}
          showAddRecipeForm={showAddRecipeForm}
          setRecipe={handleRecipe}
          setShowAddRecipeForm={handleShowAddRecipeForm}
          setUpdate={handleUpdate}
          loadingRecipe={loadingRecipe}
          updateStatus={updateStatus}
        />

        <div className="rightsideBody">
          <FavoriteRecipesComponent
            id="favorite-recipes-component"
            setRecipe={handleRecipe}
            setShowAddRecipeForm={handleShowAddRecipeForm}
            recipe={recipe}
            showAddRecipeForm={showAddRecipeForm}
            update={update}
            setUpdateStatus={handleUpdateStatus}
          />

          <AddYourOwnRecipeComponent
            id="add-your-own-recipe-component"
            setShowAddRecipeForm={handleShowAddRecipeForm}
            setUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </>
  );
}

export default App;
