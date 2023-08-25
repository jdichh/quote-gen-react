import React, { useContext, useEffect } from "react";
import { QuoteContext } from "../App";

const Quote = () => {
  const [quotes, setQuotes, errorMessage, setErrorMessage, isLoading, setIsLoading] = useContext(QuoteContext);

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
    return (
      <div className="main">
        <div className="loading-spinner">
          <h1>
            <img src="./loading.svg" alt="Please wait, loading quote." />
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      {errorMessage ? (
        <div className="quote">
          <h1>{errorMessage}</h1>
        </div>
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

export default Quote;