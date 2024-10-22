import { useAuth } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userId, isLoading } = useAuth();

  if (isLoading) {
    // Optionally show a loading spinner or placeholder while checking auth
    return <div>Loading...</div>;
  }

  if (!userId) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login-page" />;
  }

  // If authenticated, render the children (the protected page)
  return children;
};

export default PrivateRoute;
