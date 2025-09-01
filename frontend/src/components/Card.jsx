export default function Card({ title, subtitle, right, children }) {
  return (
    <div className="card">
      <div className="space-between" style={{ marginBottom: 12 }}>
        <div>
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
          {subtitle && <div className="badge" style={{ marginTop: 6 }}>{subtitle}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
