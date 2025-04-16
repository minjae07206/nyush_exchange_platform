import { useSessionStore } from "stores/useSessionStore";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage";
import axios from "axios";
import SessionExpirationWatcher from "components/SessionExpirationWatcher";

export default function AuthenticatedRoutes() {
    const { isLoggedIn, setIsLoggedIn } = useSessionStore();
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST_NAME}/api/auth/check-login`, {
                    withCredentials: true,
                });
                if (response.data.message === 'session-alive') {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false); // Stop loading after session check
            }
        };

        // Only check session if `isLoggedIn` is unknown (false or null)
        if (!isLoggedIn) {
            checkSession();
        } else {
            setLoading(false); // Session already known to be valid
        }
    }, [isLoggedIn, setIsLoggedIn]);

    // Show loading screen or spinner until session check completes
    if (loading) {
        return <LoadingPage/>;
    }

    // Redirect to login if the session is confirmed to be invalid
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <SessionExpirationWatcher  onSessionExpired={() => setIsLoggedIn(false)} />
            <Outlet />
        </>
    );
}
