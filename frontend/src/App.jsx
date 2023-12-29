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
  const[showAddRecipeForm, setShowAddRecipeForm] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleRecipe = (recipe) => {
    setRecipe(recipe);
  };

  const handleShowAddRecipeForm = (bool) => {
    setShowAddRecipeForm(bool);
  };

  useEffect(() => {
    // Fetch current user when the component mounts
    fetch('http://localhost:8080/get-user', {
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
        setCurrentUser(userData); // Set the retrieved user data in state
      })
      .catch((error) => {
        console.error('There was a problem fetching the current user:', error);
      });
  }, []); // Empty dependency array means this effect runs once (on mount)

  useEffect(() => {
    // This effect runs whenever `currentUser` changes
    console.log('Current user changed:', currentUser);
  }, [currentUser]);
  // .

  return (
    <>
      <div id="recipe-search-component">
        <SearchFormComponent setSearchResults={handleSearchResults} />
      </div>

      <div className="mainBody">
        <DisplayResultsComponent
          id="display-results-component"
          searchResults={searchResults}
          setRecipe={handleRecipe}
          setShowAddRecipeForm={handleShowAddRecipeForm}
        />

          <CurrentRecipeComponent
            id="current-recipe-component"
            recipe={recipe}
            showAddRecipeForm={showAddRecipeForm}
            setRecipe={handleRecipe}
            setShowAddRecipeForm={handleShowAddRecipeForm}
          />

        <div className="rightsideBody">
          <FavoriteRecipesComponent
            id="favorite-recipes-component"
            setRecipe={handleRecipe}
            setShowAddRecipeForm={handleShowAddRecipeForm}
            recipe={recipe}
            showAddRecipeForm={showAddRecipeForm}
          />

          <AddYourOwnRecipeComponent id="add-your-own-recipe-component"
          setShowAddRecipeForm= {handleShowAddRecipeForm}/>
        </div>
      </div>
    </>
  );
}

export default App;
