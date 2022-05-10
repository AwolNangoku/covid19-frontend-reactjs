import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CountryLiveCasesContext } from "../../utils/contexts";
import { CountryStatsTable, ProvinceStatsTable } from "./components";

export default function Home() {
  const navigate = useNavigate();
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
          <label htmlFor="country">Country Covid19 Live Cases:</label>
          <div className="flex space-x-4">
            <input
              className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              type="text"
              id="country"
              placeholder="Seacrh country live Covid19 cases e.g france"
              {...register("country")}
            />
            <button className="w-1/4 bg-sky-600 rounded-full text-white p-2">
              {`${
                isFindingCases
                  ? "Finding Country Live Cases..."
                  : "Find Country Live Cases"
              }`}
            </button>
          </div>
        </div>
      </form>
      <div className="p-5">
        {isFindingCases ? (
          <p>Fetching country live covid cases...</p>
        ) : countryCaseStats ? (
          <div className="place-content-center space-y-3 w-full">
            <CountryStatsTable
              title="Country Live Cases Information:"
              countryLiveCases={countryCaseStats}
            />
            <ProvinceStatsTable
              title="Provinces/States' Live Cases Information:"
              stateLiveCases={countryLiveCases}
            />

            <div className="w-full flex space-x-4">
              <button
                className="bg-sky-600 rounded-full p-2 text-white "
                onClick={() => addCountryLiveCases(countryLiveCases)}
              >
                {`${
                  isSavingLiveCases
                    ? "Saving Country Live Cases..."
                    : "Save Country Live Cases"
                }`}
              </button>
              <button
                className="bg-sky-600 rounded-full p-2 text-white "
                onClick={() => navigate("/countries")}
              >
                View Saved Countries
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
