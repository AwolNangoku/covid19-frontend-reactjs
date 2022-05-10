import {
  generatePath,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import useCountries from "../../hooks/use-countries";
import useCountry from "../../hooks/use-country";
import capitalizeString from "../../utils/capitalize-string";
import { CountryStatsTable, ProvinceStatsTable } from "../home/components";

export default function Countries() {
  const { country } = useParams();
  const countryList = useCountries();
  const navigate = useNavigate();
  const selectedCountry = useCountry(country && capitalizeString(country));

  return (
    <div className="flex flex-col space-y-8 p-10 w-full">
      <div className="w-full text-right">
        <button
          className="w-1/4 bg-sky-600 rounded-full text-white p-2"
          onClick={() => navigate("/")}
        >
          Back To Home Page
        </button>
      </div>
      <div className="flex space-x-8">
        <div>
          <h1 className="text-lg font-semibold underline">Saved Countries</h1>
          <ul>
            {countryList?.countries.map(({ id, country }) => (
              <li key={id} className="hover:bg-gray-300">
                <NavLink to={generatePath("/countries/:country", { country })}>
                  {country}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex flex-col space-y-4">
            <CountryStatsTable
              title="Country Saved Cases:"
              countryLiveCases={selectedCountry?.country}
            />
            <ProvinceStatsTable
              title="Provinces/States' Saved Cases:"
              stateLiveCases={selectedCountry?.provinces}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
