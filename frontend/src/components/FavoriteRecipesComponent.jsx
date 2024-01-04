import { useEffect, useState } from 'react';

export default function FavoriteRecipesComponent({
  setRecipe,
  setShowAddRecipeForm,
  recipe,
  showAddRecipeForm,
}) {
  const [recipeList, setRecipeList] = useState(null);
  const [sortOrder, setSortOrder] = useState(0);

  const handleSort = () => {
    setSortOrder(sortOrder + 1);
    sortRecipes(recipeList);
  };

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:8080/add-recipe/get', {
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
        })
        .catch((error) => {
          console.error('There was a problem fetching the data: ', error);
        });
    }

    fetchData(); // Initial call when the component mounts
  }, [recipe, showAddRecipeForm]);

  function sortRecipes(recipeList) {
    const sortedRecipeList = recipeList.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (sortOrder % 2 === 0) {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
    });
    setRecipeList(sortedRecipeList);
  }

  return (
    <div className="favoriteRecipes">
      {recipeList && recipeList.length > 0 ? (
        <div>
          <h2>Favorite Recipes</h2>
          <ul class="favoritesList">
            {recipeList.map((recipe, index) => (
              <li key={index} class="favoriteItem">
                <img src={recipe.image} />
                <span
                  onClick={() => {
                    setShowAddRecipeForm(false);
                    setRecipe(recipe);
                  }}
                >
                  {recipe.name}
                </span>
              </li>
            ))}
          </ul>
          {recipeList.length > 1 ? (
            <button class="sort-button" onClick={handleSort}>
              Sort Alphabetically
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        <p>No favorite recipes yet...</p>
      )}
    </div>
  );
}
