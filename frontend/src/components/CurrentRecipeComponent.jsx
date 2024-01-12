import { useState, useEffect } from 'react';
import PrintButton from './PrintButtonComponent.jsx';

export default function CurrentRecipeComponent({
  recipe,
  showAddRecipeForm,
  setRecipe,
  setShowAddRecipeForm,
  setUpdate,
  loadingRecipe,
}) {
  const [displayedRecipe, setDisplayedRecipe] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  //Shopping Cart List for adding Ingredients
  const handleAddToShoppingList = (ingredient) => {
    if (!shoppingList.includes(ingredient)) {
      setShoppingList([...shoppingList, ingredient]);
      console.log(shoppingList);
    }
  };

  const handleShoppingClick = (shoppingList) => {
    console.log(shoppingList);
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  // Add form recipe
  const [addrecipe, setAddrecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    image: null,
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    ingredients: [],
    image: null,
  });

  const addIngredient = () => {
    // Add a new ingredient object to the list
    setAddrecipe({
      ...addrecipe,
      ingredients: [
        ...addrecipe.ingredients,
        { quantity: ingredientQuantity, name: ingredientName },
      ],
    });

    // Clear the input fields after adding an ingredient
    setIngredientQuantity('');
    setIngredientName('');
  };

  const { name, description, ingredients, image } = addrecipe;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'description') {
      setAddrecipe({ ...addrecipe, [name]: value });
    } else if (name === 'ingredient-quantity') {
      setIngredientQuantity(value);
      // Update the specific property in the addrecipe object
      setAddrecipe({ ...addrecipe, ingredientQuantity: value });
    } else if (name === 'ingredient-name') {
      setIngredientName(value);
      // Update the specific property in the addrecipe object
      setAddrecipe({ ...addrecipe, ingredientName: value });
    }
    // Clear the associated error when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddrecipe({ ...addrecipe, image: reader.result });
        setErrors({ ...errors, image: null });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //Basic client side validations
    let newErrors = {};
    if (!name.trim()) {
      newErrors = { ...newErrors, name: 'Please enter recipe title.' };
    }
    if (!description.trim()) {
      newErrors = {
        ...newErrors,
        description: 'Please enter recipe description.',
      };
    }
    if (!ingredients.length) {
      newErrors = {
        ...newErrors,
        ingredients: 'Please enter recipe ingredients.',
      };
    }
    if (!image) {
      newErrors = { ...newErrors, image: 'Please enter recipe image url.' };
    }
    // If there are errors, update the state and stop the submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // concatenate the quantity and name together to match the recipe format in the database
    const ingredientsToSend = addrecipe.ingredients.map(
      (ingredient) => `${ingredient.quantity} ${ingredient.name}`
    );

    const recipeToAdd = {
      ...addrecipe,
      ingredients: ingredientsToSend,
      userCreated: true,
    };

    try {
      const response = await fetch('http://localhost:8080/recipe/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeToAdd),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSuccessMessage('Recipe added successfully!!');
      setUpdate(1); // Change update state to re-render favorites recipe list

      // Reset the form fields to an empty state
      setAddrecipe({
        name: '',
        description: '',
        ingredients: [],
        image: null,
      });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleClick = (recipeData) => {
    console.log(recipeData);

    const recipeToAdd = {
      ...recipeData,
      userCreated: false,
    };

    fetch('http://localhost:8080/recipe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeToAdd),
    })
      .then((response) => {
        if (!response.ok) {
          throw new error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRecipe(data);
      })
      .catch((error) => {
        console.error('Error adding the recipe: ', error);
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
        wholeIngredient: extendedIngredients.map(
          (ingredientName) => ingredientName.nameClean
        ),
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

  const [comment, setComment] = useState({
    text: '',
    recipeId: '',
    username: '',
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments when the recipe changes
    const fetchComments = async () => {
      if (recipe?.id) {
        try {
          const response = await fetch(
            `http://localhost:8080/comment/recipe/${recipe.id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setComments(data); // Update the state with fetched comments
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    };

    fetchComments();
  }, [recipe]);

  const submitComment = async (e) => {
    e.preventDefault();

    const { text } = comment;

    try {
      const response = await fetch('http://localhost:8080/comment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          recipeId: recipe.id, // Include the recipeId in the comment
          username: comment.username,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the response contains the newly added comment
      const newComment = await response.json();

      // Fetch comments again after submitting a new comment
      setComments([...comments, newComment]);

      // Reset the form fields to an empty state
      setComment({
        text: '',
        recipeId: '',
        username: '',
      });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  if (loadingRecipe) {
    return (
      <div className="currentRecipe">
        <div className="spinnerContainer">
          <div className="spinner"></div>
        </div>
      </div>
    );
  } else if (showAddRecipeForm === true && loadingRecipe === false) {
    return (
      <div className="currentRecipe">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

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
            <div className="error-message">{errors.name}</div>
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
            <div className="error-message">{errors.description}</div>
          </div>
          <br></br>
          <div className="ingredients-input">
            <label htmlFor="recipe-ingredients"> Ingredients : </label>
            {addrecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="input-container">
                <input
                  type="text"
                  className="ingredient-quantity"
                  placeholder="Ingredient Quantity"
                  value={ingredient.quantity}
                  disabled
                />
                <input
                  type="text"
                  className="ingredient-name"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  disabled
                />
              </div>
            ))}
            <div className="input-container">
              <input
                className="ingredient-quantity"
                type="text"
                id="recipe-ingredient-quantity"
                name="ingredient-quantity"
                placeholder="Ingredient Quantity"
                onChange={(e) => setIngredientQuantity(e.target.value)}
                value={ingredientQuantity}
              />
              <input
                className="ingredient-name"
                type="text"
                id="recipe-ingredient-name"
                name="ingredient-name"
                placeholder="Ingredient Name"
                onChange={(e) => setIngredientName(e.target.value)}
                value={ingredientName}
              />
              <button type="button" onClick={addIngredient}>
                Add
              </button>
            </div>
          </div>
          <div className="error-message">{errors.ingredients}</div>
          <br></br>
          <div className="image-div">
            <label htmlFor="recipe-image"> Upload Image : </label>
            <input
              type="file"
              id="recipe-image"
              name="image"
              onChange={(e) => onFileChange(e)}
            />
            <div className="error-message">{errors.image}</div>
          </div>
          <br></br>
          <div className="button-container">
            <button type="submit">Add Recipe</button>
          </div>
        </form>
      </div>
    );
  } else if (!displayedRecipe) {
    return (
      <>
        <div className="currentRecipe">
          <p>Select a recipe to see it here</p>
        </div>
      </>
    );
  } else {
    const { name, description, ingredients, image } = displayedRecipe;

    // Split the description at periods not preceded by a number
    const segments = description.split(/(?<!\d)\.\s*/);

    return (
      <div className="currentRecipe">
        <div className="current-title-favorite">
          <p>
            <button
              className="favorite-btn"
              onClick={() => handleClick(displayedRecipe)}
            >
              <span className="star"></span> Add to Favorites
            </button>
            <button
              className="shopping-btn"
              onClick={() => handleShoppingClick(shoppingList)}
            >
              Shopping List
            </button>
          </p>
        </div>
        <div>
          <div className="current-image-div">
            <img src={image} alt={name} className="current-image" />
          </div>
          <div id="recipeToPrint">
            <h2>{name}</h2>
            <h3>Ingredients:</h3>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <div className="ingredientList">
                    <input
                      type="checkbox"
                      id={`ingredientCheckbox${index}`}
                      onChange={() => handleAddToShoppingList(ingredient)}
                    />
                    <label htmlFor="{`ingredientCheckbox${index}`}">
                      {ingredient}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <br></br>
            <h3>Directions:</h3>
            <p>
              <p>
                {segments.map((segment, index) => (
                  <span key={index}>
                    {segment}
                    <br />
                  </span>
                ))}
              </p>
            </p>
          </div>
          <PrintButton currentRecipeId="recipeToPrint" />
        </div>

        <div className="commentSection">
          <textarea
            name="text"
            placeholder="Add your comments here..."
            value={comment.text}
            onChange={(e) =>
              setComment({
                text: e.target.value,
                recipeId: comment.recipeId, // Preserve the recipeId
                username: comment.username, // Preserve the username
              })
            }
          />
          <button onClick={submitComment}>Post Comment</button>
          {comments
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <div key={comment.id} className="comment">
                <small>
                  {comment.username} -{' '}
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
                <p>{comment.text}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
