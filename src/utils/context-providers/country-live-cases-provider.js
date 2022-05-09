import { useState } from "react";
import { CountryLiveCasesContext } from "../contexts";

export default function CountryLiveCasesProvider({ children }) {
  const [countryLiveCases, setCountryLiveCases] = useState();

  return (
    <CountryLiveCasesContext.Provider
      value={{
        countryLiveCases,
        saveCountryLiveCases: async (liveCases, callBack) => {
          // saves country live cases to internal flask app
          try {
            console.log("Saving to flask db...", liveCases);
          } catch (erro) {
            callBack({ success: false, message: erro.message });
          }
        },
        updateCountryLiveCases: (newCountryLiveCases) => {
          // updating country live case displayed by the search results
          setCountryLiveCases(newCountryLiveCases);
        },
      }}
    >
      {children}
    </CountryLiveCasesContext.Provider>
  );
}
