import { useState } from "react";
import serverGet from "../api/server-get";
import capitalizeString from "../capitalize-string";
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
            callBack({ success: true, message: "Country Live Cases Saved.." });
          } catch (erro) {
            callBack({
              success: false,
              message: "Failed Saving Country Live Cases",
            });
          }
        },
        updateCountryLiveCases: async (country, callBack) => {
          // this is making a call to the covid19 service
          try {
            const countryLiveCases = await serverGet({
              url: `cases?country=${capitalizeString(country)}`,
            });
            // updating country live case displayed by the search results
            if (countryLiveCases) {
              setCountryLiveCases(countryLiveCases);
              callBack({
                success: true,
                message: "Successfully retreived Country Live Cases!",
              });
            }
          } catch (erro) {
            callBack({
              success: false,
              message: "Failed Fetching Country Live Cases",
            });
          }
        },
      }}
    >
      {children}
    </CountryLiveCasesContext.Provider>
  );
}
