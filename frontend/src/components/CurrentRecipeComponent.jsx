import { useState, useEffect } from 'react';

export default function CurrentRecipeComponent({ recipe , showAddRecipeForm }) {

  function handleClick(recipeData) {
    console.log(recipeData);
    fetch('http://localhost:8080/add-recipe/add', {
      method: 'POST',
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

  // Return null if recipe or its properties are undefined or empty
  if (
    !recipe ||
    !recipe.extendedIngredients ||
    recipe.extendedIngredients.length === 0
  ) {
    return <div className="currentRecipe"></div>;
  }

  // Destructure recipe into its components
  let { title, image, extendedIngredients, plainTextInstructions } = recipe;

  // Shortens instructions to fit screen/not throw an error saving to database
  plainTextInstructions = plainTextInstructions.slice(0, 900);

  // Build out recipeData object to send to the backend
  const [recipeData, setRecipeData] = useState({
    name: title,
    description: plainTextInstructions,
    ingredients: extendedIngredients.map((ingredient) => ingredient.original),
    image: image,
  });

  // Rebuilds recipeData any time its items change
  useEffect(() => {
    setRecipeData({
      name: title,
      description: plainTextInstructions,
      ingredients: extendedIngredients.map((ingredient) => ingredient.original),
      image: image,
    });
  }, [title, plainTextInstructions, extendedIngredients, image]);

 
    if(showAddRecipeForm === true){
      return (
      <p>Add recipe form</p>)
    } else {  return (
    <div className="currentRecipe">
      <div className="current-title-favorite">
        <p>
          {title && title + ' '}
          <button
            className="favorite-btn"
            onClick={() => handleClick(recipeData)}
          >
            <span className="star"></span> Add to Favorites
          </button>
        </p>
      </div>
      <div>
        <div className="current-image-div">
          <img src={image} alt={title} className="current-image" />
        </div>
        <div>
          <h3>Ingredients List:</h3>
          <ul>
            {extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>
          <p>{plainTextInstructions}</p>
        </div>
      </div>
    </div>
  );}
}
