export default function CurrentRecipeComponent({ recipe }) {
  if (
    !recipe ||
    !recipe.extendedIngredients ||
    recipe.extendedIngredients.length === 0
  ) {
    return <div className="currentRecipe"></div>; // Return null if recipe or its properties are undefined or empty
  }

  const { title, image, extendedIngredients, plainTextInstructions } = recipe;

  return (
    <div className="currentRecipe">
      <div className="current-title-favorite">
        <p>
          {title && title + ' '}
          <button className="favorite-btn">
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
