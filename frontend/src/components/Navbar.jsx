import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <div className="container space-between" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <div className="flex" style={{ gap: 14 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--text)' }}><b>Attendance</b></Link>
          {user && (
            <>
              <Link to="/students" style={{ textDecoration: 'none', color: 'var(--text)' }}>Mark</Link>
              <Link to="/summary" style={{ textDecoration: 'none', color: 'var(--text)' }}>Summary</Link>
            </>
          )}
        </div>
        <div className="flex">
          {user ? (
            <>
              <span className="badge">{user.name} • Class {user.className}</span>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
