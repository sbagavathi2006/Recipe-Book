import { useState, useEffect } from 'react';

export default function CurrentRecipeComponent({ recipe, showAddRecipeForm }) {
  const [displayedRecipe, setDisplayedRecipe] = useState(null);
  // Code for Add form recipe -Baga
  const [addrecipe, setAddrecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    image: '',
  });

  const { name, description, ingredients, image } = addrecipe;

  const onInputChange = (e) => {
    setAddrecipe({ ...addrecipe, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/add-recipe/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addrecipe),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Recipe added successfully!');
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

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

  useEffect(() => {
    console.log(recipe);
    if (
      recipe?.name &&
      recipe?.image &&
      recipe?.ingredients &&
      recipe?.description
    ) {
      let { name, image, ingredients, description } = recipe;

      // Build out displayedRecipe object to update displayed content
      const updatedDisplayedRecipe = {
        name: name,
        description: description,
        ingredients: ingredients.map((ingredient) => ingredient),
        image: image,
      };

      setDisplayedRecipe(updatedDisplayedRecipe);
    }
  }, [recipe]);

  if (showAddRecipeForm === true) {
    return (
      <div className="currentRecipe">
        <h1>Add Your Own Recipe!!!</h1>
        <form onSubmit={(e) => onSubmit(e)} className="form-group">
          <div>
            <label htmlFor="recipe-name"> Title : </label>
            <input
              type="text"
              id="recipe-name"
              name="name"
              placeholder="Your recipe's title"
              onChange={(e) => onInputChange(e)}
              value={name}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="recipe-description"> Description : </label>
            <textarea
              type="text"
              id="recipe-description"
              name="description"
              placeholder="Your recipe's instructions"
              onChange={(e) => onInputChange(e)}
              value={description}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="recipe-ingredients"> Ingredients : </label>
            <textarea
              type="text"
              id="recipe-ingredients"
              name="ingredients"
              placeholder="Your recipe's ingredients"
              onChange={(e) => onInputChange(e)}
              value={ingredients}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="recipe-image"> Upload Image : </label>
            <input
              type="text"
              id="recipe-image"
              name="image"
              placeholder="Upload your recipe's image"
              onChange={(e) => onInputChange(e)}
              value={name}
            />
          </div>
          <br></br>
          <button type="submit">Add Recipe</button>
          {/* <button type="reset"> Reset Form</button> */}
        </form>
      </div>
    );
  } else if (!displayedRecipe) {
    return (
      <div className="currentRecipe">
        <p>Select a recipe</p>
      </div>
    );
  } else {
    const { name, description, ingredients, image } = displayedRecipe;
    return (
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
}
