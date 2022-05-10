import useSWR from "swr";
import serverGet from "../utils/api/server-get";

export default function useCountry(country) {
  const countryKey = country
    ? `http://127.0.0.1:5000/country/${country}`
    : null;

  const { data: countryStats } = useSWR(countryKey, (url) =>
    serverGet({ url })
  );

  return countryStats;
}
