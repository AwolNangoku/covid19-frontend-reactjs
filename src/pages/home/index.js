import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CountryLiveCasesContext } from "../../utils/contexts";

export default function Home() {
  const [isFindingCases, setIsFindingCases] = useState();
  const [isSavingLiveCases, setIsSavingLiveCases] = useState();

  const { countryLiveCases, updateCountryLiveCases, saveCountryLiveCases } =
    useContext(CountryLiveCasesContext);
  const countryCaseStats = countryLiveCases?.All;

  const { register, handleSubmit } = useForm();

  const findCountryLiveCases = async ({ country }) => {
    setIsFindingCases(!isFindingCases);
    try {
      await updateCountryLiveCases(country, () => {
        setIsFindingCases(!!isFindingCases);
      });
    } catch (e) {
      console.log("Failed finding resource...", e);
    }
  };

  const addCountryLiveCases = async (countryLiveCaseData) => {
    setIsSavingLiveCases(!isSavingLiveCases);
    try {
      await saveCountryLiveCases(countryLiveCaseData, ({ message }) => {
        console.log(message);
        setIsSavingLiveCases(!!isSavingLiveCases);
      });
    } catch (e) {
      console.log("Failed saving country live cases.", e);
    }
  };

  return (
    <div className="flex flex-col">
      <form className="p-5" onSubmit={handleSubmit(findCountryLiveCases)}>
        <div className="flex flex-col space-y-4">
          <label htmlFor="country">Enter Country:</label>
          <input
            className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            id="country"
            {...register("country")}
          />
          <button className="bg-sky-600 rounded-full">
            {`${
              isFindingCases
                ? "Finding Country Live Cases..."
                : "Find Country Live Cases"
            }`}
          </button>
        </div>
      </form>
      <div className="p-5">
        {isFindingCases ? (
          <p>Fetching country live covid cases...</p>
        ) : countryCaseStats ? (
          <div className="place-content-center space-y-3 w-full">
            <div>
              <h1 className="text-lg font-semibold underline">
                Country Live Cases Information:
              </h1>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Continent</th>
                    <th>Confirmed Cases</th>
                    <th>Number of Deaths</th>
                    <th>Recovered Cases</th>
                    <th>Total Population</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{countryCaseStats.country}</td>
                    <td>{countryCaseStats.continent}</td>
                    <td>{countryCaseStats.confirmed}</td>
                    <td>{countryCaseStats.deaths}</td>
                    <td>{countryCaseStats.recovered}</td>
                    <td>{countryCaseStats.population}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h1 className="text-lg font-semibold underline">
                Provinces/States' Live Cases Information:
              </h1>
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th>Province/State</th>
                    <th>Confirmed Cases</th>
                    <th>Number of Deaths</th>
                    <th>Recovered Cases</th>
                    <th>Updated Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(countryLiveCases || {})
                    .slice(1)
                    .map((province) => (
                      <tr>
                        <td>{province}</td>
                        <td>{countryLiveCases[province].confirmed}</td>
                        <td>{countryLiveCases[province].deaths}</td>
                        <td>{countryLiveCases[province].recovered}</td>
                        <td>{countryLiveCases[province].updated}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => addCountryLiveCases(countryLiveCases)}
              lassName="w-full bg-sky-600 rounded-full"
            >
              {`${
                isSavingLiveCases
                  ? "Saving Country Live Cases..."
                  : "Save Country Live Cases"
              }`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
