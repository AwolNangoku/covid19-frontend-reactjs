export default function ProvinceLiveCases({ title, stateLiveCases }) {
  return (
    <div>
      <h1 className="text-lg font-semibold underline">{title}</h1>
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
          {Object.keys(stateLiveCases || {})
            .slice(1)
            .map((province) => (
              <tr key={province}>
                <td>{province}</td>
                <td>{stateLiveCases[province].confirmed}</td>
                <td>{stateLiveCases[province].deaths}</td>
                <td>{stateLiveCases[province].recovered}</td>
                <td>{stateLiveCases[province].updated}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
