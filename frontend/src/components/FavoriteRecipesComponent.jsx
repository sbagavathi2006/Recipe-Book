import { useEffect, useState } from 'react';

export default function FavoriteRecipesComponent({ setRecipe, setShowAddRecipeForm, recipe, showAddRecipeForm }) {
  const [recipeList, setRecipeList] = useState(null);

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

  return (
    <div className="favoriteRecipes">
      <h2>Favorite Recipes</h2>
      {recipeList && recipeList.length > 0 ? (
        <ul>
          {recipeList.map((recipe, index) => (
            <a>
              <li key={index}>
                <span
                  onClick={() => {
                  setShowAddRecipeForm(false);
                    setRecipe(recipe);
                  }}
                >
                  {recipe.name}
                </span>
              </li>
            </a>
          ))}
        </ul>
      ) : (
        <p>No favorite recipes found</p>
      )}
    </div>
  );
}
