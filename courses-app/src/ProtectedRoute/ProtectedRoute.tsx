import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
	loggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loggedIn }) => {
	if (!loggedIn) {
		return <Navigate to='login' replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
