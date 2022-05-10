import { useState } from "react";
import { serverGET, serverPOST } from "../api";
import capitalizeString from "../capitalize-string";
import { CountryLiveCasesContext } from "../contexts";

export default function CountryLiveCasesProvider({ children }) {
  const [countryLiveCases, setCountryLiveCases] = useState();

  return (
    <CountryLiveCasesContext.Provider
      value={{
        countryLiveCases,
        saveCountryLiveCases: async (liveCases, callBack) => {
          // saves country live cases to flask backen covid app
          try {
            await serverPOST({
              url: "http://127.0.0.1:5000/country",
              data: {
                country: liveCases.All,
                provinces: Object.keys(liveCases || {})
                  .slice(1)
                  .map((province) => ({
                    province,
                    confirmed: liveCases[province].confirmed,
                    deaths: liveCases[province].deaths,
                    recovered: liveCases[province].deaths,
                    updated: liveCases[province].updated,
                  })),
              },
            });

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
            const countryLiveCases = await serverGET({
              url: `https://covid-api.mmediagroup.fr/v1/cases?country=${capitalizeString(
                country
              )}`,
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
