import React, { useState, createContext } from "react";
import Quote from "./components/Quote";
export const QuoteContext = createContext()

const App = () => {
  const [quotes, setQuotes] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QuoteContext.Provider value={[quotes, setQuotes, errorMessage, setErrorMessage, isLoading, setIsLoading]}>
      <Quote/>
    </QuoteContext.Provider>
  );
};

export default App;