import { useState, useEffect } from 'react';

export default function CurrentRecipeComponent({ recipe }) {
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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (
    !recipe ||
    !recipe.extendedIngredients ||
    recipe.extendedIngredients.length === 0
  ) {
    return <div className="currentRecipe"></div>; // Return null if recipe or its properties are undefined or empty
  }

  let { title, image, extendedIngredients, plainTextInstructions } = recipe; // Destructure recipe into its components

  plainTextInstructions = plainTextInstructions.slice(0, 200);

  const [recipeData, setRecipeData] = useState({
    // Build out recipeData object to send to the backend
    name: title,
    description: plainTextInstructions,
    ingredients: extendedIngredients.map((ingredient) => ingredient.original),
    image: image,
  });

  useEffect(() => {
    setRecipeData({
      name: title,
      description: plainTextInstructions,
      ingredients: extendedIngredients.map((ingredient) => ingredient.original),
      image: image,
    });
  }, [title, plainTextInstructions, extendedIngredients, image]);

  return (
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
  );
}
