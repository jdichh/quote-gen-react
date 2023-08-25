import React, { useState, useEffect } from "react";

const App = () => {
  const [quotes, setQuotes] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/quotes/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuotes(data[0]);
        setErrorMessage("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error details: ", error);
        setErrorMessage("Failed to generate a quote. Try again later.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main">
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="quote">
          <h1>{quotes.content}</h1>
          <h2>{quotes.author}</h2>
          <button onClick={fetchQuote}>Click</button>
        </div>
      )}
    </div>
  );
};

export default App;