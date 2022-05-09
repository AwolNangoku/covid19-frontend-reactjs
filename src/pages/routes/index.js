import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountriesPage, HomePage } from "..";
import { CountryLiveCasesProvider } from "../../utils/context-providers";
import NoMatchRoute from "./no-match-route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CountryLiveCasesProvider>
              <HomePage />
            </CountryLiveCasesProvider>
          }
        />

        <Route path="/countries" element={<CountriesPage />} />

        <Route path="*" element={<NoMatchRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
