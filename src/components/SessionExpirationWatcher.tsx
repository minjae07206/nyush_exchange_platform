import { useEffect } from "react";
import { useSessionStore } from "stores/useSessionStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SessionExpirationWatcher() {
    const navigate = useNavigate();
    const {sessionExpirationTime, setSessionExpirationTime, setIsLoggedIn} = useSessionStore();
    useEffect(()=>{
        const interval = setInterval(async ()=>{
            if(sessionExpirationTime) {
                const currentTime = Date.now();
                const timeRemaining = sessionExpirationTime - currentTime;
                if (timeRemaining <= 5 * 60 * 1000) {
                    const userWantsToExtend = window.confirm("Your session is about to expire. Extend?");
                    if (userWantsToExtend) {
                        try {
                            const response = await axios.post('http://localhost:3001/api/auth/keep-alive', {
                                withCredentials:true,
                            });
                            if (response.data.message === "session-renewed") {
                                setSessionExpirationTime(Date.now() + response.data.sessionExpirationTime)
                                setIsLoggedIn(true);
                            }
                        } catch(error) {
                            // keep alive failed??
                        }
                        
                    } else {
                        try {
                            await axios.post('http://localhost:3001/api/auth/logout', {
                                withCredentials:true,
                            });
                            setIsLoggedIn(false);
                            navigate('/login');
                        } catch (error) {
                            // logout failed?
                        }
                        return () => clearInterval(interval); // Clear if user declines
                    }
                }
            }
        }, 60000)
    }, [sessionExpirationTime])
    return null;
}