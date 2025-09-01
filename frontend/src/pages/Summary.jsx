import { useEffect, useState } from 'react';
import API from '../api/axios';
import Card from '../components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Summary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/attendance/summary?days=14').then(({ data }) => {
      const mapped = data.map(d => ({ date: new Date(d.date).toLocaleDateString(), presentPct: Math.round(d.presentPct) }));
      setData(mapped);
    });
  }, []);

  return (
    <div className="container grid">
      <Card title="Attendance Summary" subtitle="Class-wise presence % (last 14 days)">
        {data.length === 0 ? (
          <div className="badge">No data yet. Mark attendance to see the chart.</div>
        ) : (
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="presentPct" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
}
