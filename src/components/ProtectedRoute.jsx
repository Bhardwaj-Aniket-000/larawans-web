import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userRole !== 'admin') {
    toast.error('Access denied. Admin privileges required.');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
