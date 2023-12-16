export default function CurrentRecipeComponent({recipe}) { 
  return <div className="currentRecipe">
    {/* <p>ingredients</p> */}
    {recipe && recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div>
              <h3>Ingredients List</h3>
              <ul>
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.original}</li>
                ))}
              </ul>
              <p>{recipe.plainTextInstructions}</p>
            </div>
          )}
  </div>;
}
