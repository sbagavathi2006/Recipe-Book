import React, { useState } from 'react';
import config from '../../config';

export default function RecipeSearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
      console.log(data);
      setSearchResults(data);
      // Handle the retrieved data as needed (e.g., update state, display results)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors (e.g., show error message to the user)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a recipe here"
        />
        <button type="submit">Search</button>
      </form>
      {searchResults && searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <h3>{result.title}</h3>
                <img src={result.image} alt={result.title} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
