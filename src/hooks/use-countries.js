import useSWR from "swr";
import serverGet from "../utils/api/server-get";

export default function useCountries() {
  const countriesKey = `http://127.0.0.1:5000/country`;

  const { data: countryStats } = useSWR(countriesKey, (url) =>
    serverGet({ url })
  );

  return countryStats;
}
