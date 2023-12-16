export default function DisplayResultsComponent({ searchResults }) {
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
                <h3>{result.title}</h3>
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
