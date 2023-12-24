import {useState, useEffect} from 'React';

export default function FavoriteRecipesComponent() {
    const [recipeList, setRecipeList] = useState(null);

    useEffect() => {
    function handleClick(recipeData) {
        fetch('http://localhost:8080/add-recipe/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        })
          .then((response) => {
            console.log(response.text());
          })
          .catch((error) => {
            console.log(error);
          });
      }

    }, [recipeList];

  return (
    <div className="favoriteRecipes">
      <h2>Favorite Recipes</h2>
      {/* {recipeList.map((recipe, index) => (
        <div>
          <ul>
            <li key={index}>{recipe.title}</li>
          </ul>
        </div>
      ))} */}
    </div>
  );
}
