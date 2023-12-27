import { useState, useEffect } from 'react';

export default function CurrentRecipeComponent({ recipe , showAddRecipeForm }) {
  const [displayedRecipe, setDisplayedRecipe] = useState(null);

  const handleClick = (recipeData) => {
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
  };

  useEffect(() => {
    if (
      recipe?.title &&
      recipe?.image &&
      recipe?.extendedIngredients &&
      recipe?.plainTextInstructions
    ) {
      let { title, image, extendedIngredients, plainTextInstructions } = recipe;

      // Shortens instructions to fit screen/not throw an error saving to database
      plainTextInstructions = plainTextInstructions.slice(0, 900);

      // Build out displayedRecipe object to update displayed content
      const updatedDisplayedRecipe = {
        name: title,
        description: plainTextInstructions,
        ingredients: extendedIngredients.map(
          (ingredient) => ingredient.original
        ),
        image: image,
      };

      setDisplayedRecipe(updatedDisplayedRecipe);
    }
  }, [recipe]);

  if (!displayedRecipe) {
    return <div className="currentRecipe"></div>;
  }

  const { name, description, ingredients, image } = displayedRecipe;


    if(showAddRecipeForm === true){
      return (
      <p>Add recipe form</p>)
    } else {  return (
    <div className="currentRecipe">
      <div className="current-title-favorite">
        <p>
          {name && name + ' '}
          <button
            className="favorite-btn"
            onClick={() => handleClick(displayedRecipe)}
          >
            <span className="star"></span> Add to Favorites
          </button>
        </p>
      </div>
      <div>
        <div className="current-image-div">
          <img src={image} alt={name} className="current-image" />
        </div>
        <div>
          <h3>Ingredients List:</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
