export default function Table({ columns, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((c) => (
              <td key={c.key}>{c.render ? c.render(row) : row[c.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
