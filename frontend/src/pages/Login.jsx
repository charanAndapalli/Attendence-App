import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('teacher1');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const ok = await login(username, password);
    if (ok) navigate('/students'); else setError('Invalid credentials');
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <Card title="Teacher Login" subtitle="Use dummy credentials">
        <form onSubmit={handleSubmit} className="grid">
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="badge" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{error}</div>}
          <Button type="submit" className="primary" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        </form>
      </Card>
    </div>
  );
}
