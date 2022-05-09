import useSWR from "swr";
import serverGet from "../utils/api/server-get";

export default function useCountryLiveCasesService(country) {
  const liveCasesKey = `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`;

  const { data: liveCases } = useSWR(liveCasesKey, (url) => serverGet({ url }));

  return liveCases;
}
