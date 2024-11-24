import { useSessionStore } from "stores/useSessionStore";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage";
import axios from "axios";
import SessionExpirationWatcher from "components/SessionExpirationWatcher";

export default function AdminRoutes() {
    const { isAdmin, setIsAdmin } = useSessionStore();
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${process.env.HOST_NAME}/api/auth/check-admin`, {
                    withCredentials: true,
                });
                if (response.data.message === 'is admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false); // Stop loading after session check
            }
        };

        // Only check session if `isLoggedIn` is unknown (false or null)
        if (!isAdmin) {
            checkSession();
        } else {
            setLoading(false); // Session already known to be valid
        }
    }, [isAdmin, setIsAdmin]);

    // Show loading screen or spinner until session check completes
    if (loading) {
        return <LoadingPage/>;
    }

    // Redirect to login if the session is confirmed to be invalid
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}