export default function Input({ label, ...props }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ color: 'var(--muted)', fontSize: 14 }}>{label}</span>
      <input className="input" {...props} />
    </label>
  );
}
