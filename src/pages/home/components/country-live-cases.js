export default function CountryLiveCases({ countryLiveCases }) {
  return (
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
            <td>{countryLiveCases.country}</td>
            <td>{countryLiveCases.continent}</td>
            <td>{countryLiveCases.confirmed}</td>
            <td>{countryLiveCases.deaths}</td>
            <td>{countryLiveCases.recovered}</td>
            <td>{countryLiveCases.population}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
