import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (email) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const renderAvatar = () => {
    if (!user) return null;

    if (user.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="Profile"
          className="rounded-circle border"
          style={{ 
            width: '40px', 
            height: '40px', 
            objectFit: 'cover',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}
        />
      );
    }
    return (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{ 
          width: '40px', 
          height: '40px', 
          fontWeight: '600',
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {getInitials(user.email)}
      </div>
    );
  };

  return (
    <nav className="navbar navbar-light bg-white border-bottom sticky-top">
      <div className="container py-2">
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          style={{ color: '#1976d2' }}
        >
          <span className="fs-4 fw-bold">KaamDhaam</span>
        </Link>
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <div className="d-flex align-items-center">
                {renderAvatar()}
              </div>
              <button 
                className="btn btn-outline-primary px-4"
                onClick={handleLogout}
                style={{ 
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="d-flex gap-2">
              <Link 
                to="/login" 
                className="btn btn-primary px-4"
                style={{ 
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-outline-primary px-4"
                style={{ 
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;