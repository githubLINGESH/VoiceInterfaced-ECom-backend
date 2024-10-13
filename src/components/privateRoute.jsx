import { useAuth } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userId } = useAuth();

  if (!userId) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login-page" />;
  }

  // If authenticated, render the children (the protected page)
  return children;
};

export default PrivateRoute;
