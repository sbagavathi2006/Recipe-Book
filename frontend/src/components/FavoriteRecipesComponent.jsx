import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function FavoriteRecipesComponent({
  setRecipe,
  setShowAddRecipeForm,
  recipe,
  showAddRecipeForm,
  update
}) {
  const [recipeList, setRecipeList] = useState(null);
  const [sortOrderAlpha, setSortOrderAlpha] = useState(0);
  const [sortOrderUser, setSortOrderUser] = useState(0);
  const [currentRecipeList, setCurrentRecipeList] = useState(null);

  const handleSortAlpha = () => {
    const updatedOrder = sortOrderAlpha + 1;
    sortRecipesAlpha(recipeList, updatedOrder);
    setSortOrderAlpha(updatedOrder);
  };

  const handleSortUser = () => {
    const updatedOrder = sortOrderUser + 1;
    sortRecipesUser(recipeList, updatedOrder);
    setSortOrderUser(updatedOrder);
  };

  const handleDeleteRecipe = (recipeToDelete) => {
    fetch('http://localhost:8080/recipe/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeToDelete),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipeList(data);
      })
      .catch((error) => {
        console.error('There was a problem deleting the recipe: ', error);
      });
  };

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:8080/recipe/get', {
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
        .then((data) => {
          setRecipeList(data);
          setCurrentRecipeList(data);
        })
        .catch((error) => {
          console.error('There was a problem fetching the data: ', error);
        });
    }

    fetchData(); // Initial call when the component mounts
  }, [recipe, showAddRecipeForm, update]);

  function sortRecipesAlpha(recipeList, order) {
    const sortedRecipeList = recipeList.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (order % 2 === 0) {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      } else {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    });
    setRecipeList(sortedRecipeList);
  }

  function sortRecipesUser(recipeList, order) {
    if (order % 2 === 0) {
      setRecipeList(currentRecipeList);
    } else {
      const sortedRecipeList = recipeList.filter(
        (recipe) => recipe.userCreated === true
      );
      if (sortedRecipeList.length < 1) {
        setRecipeList(recipeList);
      } else {
        setRecipeList(sortedRecipeList);
      }
    }
  }

return (
  <div className="favoriteRecipes">
    {recipeList && recipeList.length > 0 ? (
      <div>
        <h2>Favorite Recipes</h2>
        <ul className="favoritesList">
          {recipeList.map((recipe, index) => (
            <li key={index} className="favoriteItem">
              <img src={recipe.image} alt={recipe.name} />
              <span
                onClick={() => {
                  setShowAddRecipeForm(false);
                  setRecipe(recipe);
                }}
              >
                {recipe.name}
              </span>
              <div>
                <FontAwesomeIcon
                  icon={faTimes}
                  alt="Delete"
                  onClick={() => {
                    handleDeleteRecipe(recipe);
                    console.log('Just clicked: ' + recipe);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        {recipeList.length > 0 && (
          <div className="sortButtons">
            <button className="sort-button" onClick={handleSortAlpha}>
              {sortOrderAlpha % 2 ? 'Reverse Alphabetically' : 'Sort Alphabetically'}
            </button>
            {recipeList.filter((recipe) => recipe.userCreated === true).length > 0 && (
              <button className="sort-button" onClick={handleSortUser}>
                {sortOrderUser % 2 ? 'All Favorite Recipes' : 'User Created Only'}
              </button>
            )}
          </div>
        )}
      </div>
    ) : (
      <p>No favorite recipes yet...</p>
    )}
  </div>
);

}