import { useEffect, useMemo, useState } from 'react';
import API from '../api/axios';
import Card from '../components/Card';
import Table from '../components/Table';
import Toggle from '../components/Toggle';
import Button from '../components/Button';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get('/students').then(({ data }) => setStudents(data));
  }, []);

  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    // default all Present on first load
    if (students.length && Object.keys(statusMap).length === 0) {
      const m = {};
      students.forEach(s => { m[s._id] = 'Present'; });
      setStatusMap(m);
    }
  }, [students]);

  const presentCount = useMemo(() => Object.values(statusMap).filter(v => v === 'Present').length, [statusMap]);

  const columns = [
    { title: 'Roll No', dataIndex: 'rollNumber', key: 'rollNumber' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', key: 'status', render: (row) => (
        <Toggle value={statusMap[row._id] || 'Absent'} onChange={(v) => setStatusMap(prev => ({ ...prev, [row._id]: v }))} />
      )
    }
  ];

  const submit = async () => {
    setSaving(true);
    try {
      const payload = {
        date,
        records: students.map(s => ({ studentId: s._id, status: statusMap[s._id] || 'Absent' }))
      };
      await API.post('/attendance', payload);
      alert('Attendance saved');
    } catch (e) {
      alert('Failed to save');
    } finally { setSaving(false); }
  };

  return (
    <div className="container grid">
      <Card title="Mark Attendance" subtitle={`Date: ${date}`} right={
        <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
      }>
        <div className="space-between" style={{ marginBottom: 12 }}>
          <div className="badge">Total: {students.length}</div>
          <div className="badge">Present: {presentCount}</div>
        </div>
        <Table columns={columns} data={students} />
        <div style={{ marginTop: 12 }}>
          <Button className="primary" onClick={submit} disabled={saving}>{saving ? 'Saving...' : 'Submit Attendance'}</Button>
        </div>
      </Card>
    </div>
  );
}
