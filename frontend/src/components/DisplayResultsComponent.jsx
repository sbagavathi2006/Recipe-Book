import config from '../../config';

export default function DisplayResultsComponent({ searchResults, setRecipe }) {

  const apiKey = config.API_KEY;

  const handleClick = async (recipeId) => {

    try {

      const recipeApiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      const recipeResponse = await fetch(recipeApiUrl);

      if (!recipeResponse.ok) {
        throw new Error('Network response was not ok.');
      }

      const recipeData = await recipeResponse.json();

      const htmlInstructionsResponse = recipeData.instructions;
      const plainTextInstructions = extractPlainText(htmlInstructionsResponse);

      setRecipe({...recipeData, plainTextInstructions: plainTextInstructions,});
    } catch(error) {
      console.error('There was a problem with the fetch operation:', error);
      setRecipe(null);
    } 
  };

  const extractPlainText = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText;
  };

  return (
    <div className="resultsDisplay">
      {searchResults &&
      searchResults.results &&
      searchResults.results.length > 0 ? (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.results.map((result, index) => (
              <li key={index}>
                <img src={result.image} alt={result.title} />
                <h3><a href="#" onClick={() => handleClick(result.id)}>
                {result.title}</a></h3>
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