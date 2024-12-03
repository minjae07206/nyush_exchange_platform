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
                console.log("currenttime", currentTime);
                console.log("SessionExpirationTime:", sessionExpirationTime)
                const timeRemaining = sessionExpirationTime - currentTime;
                console.log("TimeRemainign: ", timeRemaining)
                if ( timeRemaining <= (5 * 6 * 100)) {
                    const userWantsToExtend = window.confirm("Your session is about to expire. Extend?");
                    if (userWantsToExtend) {
                        try {
                            const response = await axios.post(`${process.env.REACT_APP_HOST_NAME}/api/auth/keep-alive`, {
                                withCredentials:true,
                            });
                            if (response.data.message === "session-renewed") {
                                console.log(response.data.sessionExpirationTime)
                                setSessionExpirationTime(response.data.sessionExpirationTime)
                                setIsLoggedIn(true);
                            }
                        } catch(error) {
                            // keep alive failed??
                        }
                        
                    } else {
                        try {
                            await axios.post(`${process.env.REACT_APP_HOST_NAME}/api/auth/logout`, {
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