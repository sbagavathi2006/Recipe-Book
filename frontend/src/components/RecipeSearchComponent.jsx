import React, { useState, useEffect } from 'react';
import config from '../../config';

export default function RecipeSearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = config.API_KEY;
  const maxResults = 1;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${encodeURIComponent(
        searchTerm
      )}&number=${maxResults}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

      setSearchResults(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleClick = async (recipeId) => {

    try {
      setLoading(true);
      const recipeApiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      const recipeResponse = await fetch(recipeApiUrl);

      if (!recipeResponse.ok) {
        throw new Error('Network response was not ok.');
      }

      const recipeData = await recipeResponse.json();

      const htmlInstructionsResponse = recipeData.instructions;
      const plainTextInstructions = extractPlainText(htmlInstructionsResponse);

      setRecipe({...recipeData, plainTextInstructions: plainTextInstructions,});
      console.log(recipeData);
    console.log(plainTextInstructions);
    } catch(error) {
      console.error('There was a problem with the fetch operation:', error);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const extractPlainText = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a recipe here"
        />
        <button type="submit">Search</button>
      </form>
      {searchResults &&
      searchResults.results &&
      searchResults.results.length > 0 ? (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.results.map((result, index) => (
              <li key={index}>
                <h3><a href="#" onClick={() => handleClick(result.id)}>
                {result.title}</a></h3>
                <img src={result.image} alt={result.title} />
              </li>
            ))}
          </ul>
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
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
