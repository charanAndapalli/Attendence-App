export default function Toggle({ value, onChange }) {
  const isPresent = value === 'Present';
  return (
    <div className={`toggle ${isPresent ? 'present' : 'absent'}`} onClick={() => onChange(isPresent ? 'Absent' : 'Present')}>
      {isPresent ? 'Present' : 'Absent'}
    </div>
  );
}
