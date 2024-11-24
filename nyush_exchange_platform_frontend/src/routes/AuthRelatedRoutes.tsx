import { useSessionStore } from "stores/useSessionStore"
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";
import LoadingPage from "components/LoadingPage";
export default function AuthRelatedRoutes() {
    const { isLoggedIn, setIsLoggedIn } = useSessionStore();
    const [loading, setLoading] = useState(true); // Track loading state
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${process.env.HOST_NAME}/api/auth/check-login`, 
                    { withCredentials:true}
                );
                if (response.data.message === 'session-alive') {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                
                console.error("Session check failed.");
                setIsLoggedIn(false);
            } finally {
                setLoading(false); // Stop loading after session check
            }
        };

        // Call the session check only if user is not logged in
        if (!isLoggedIn) {
            checkSession();
        }
    }, [isLoggedIn, setIsLoggedIn]);

    if (loading) {
        return <LoadingPage/>;
    }

    if (isLoggedIn) {
        return <Navigate to="/market" replace={true} />;
    }

    return (
        <>
        <Outlet />
        </>
    )
    
}