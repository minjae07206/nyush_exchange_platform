import { useEffect, useState } from "react";
import { useSessionStore } from "stores/useSessionStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// I don't know why, I get errors when I use upper case letters for the below file.
import UserWantsToExtendPopup from "./userWantsToExtendPopup";

export default function SessionExpirationWatcher() {
  const navigate = useNavigate();
  const {
    sessionExpirationTime,
    setSessionExpirationTime,
    setIsLoggedIn,
  } = useSessionStore();

  const [showExtendPrompt, setShowExtendPrompt] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();

      if (sessionExpirationTime && sessionExpirationTime >= currentTime) {
        const timeRemaining = sessionExpirationTime - currentTime;
        console.log("TimeRemaining: ", timeRemaining);

        // If less than or equal to 1 minute, show prompt
        if (timeRemaining <= 60_000 && !showExtendPrompt) {
          setShowExtendPrompt(true);
        }
      }
    }, 10_000); // check every 10 seconds

    return () => clearInterval(interval);
  }, [sessionExpirationTime, showExtendPrompt]);

  // Called when user confirms they want to extend the session
  const handleExtend = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_NAME}/api/auth/keep-alive`,
        {},
        { withCredentials: true }
      );

      if (response.data.message === "session-renewed") {
        console.log("Session renewed to:", response.data.sessionExpirationTime);
        setSessionExpirationTime(response.data.sessionExpirationTime);
        setIsLoggedIn(true);
        setShowExtendPrompt(false);
      }
    } catch (error) {
      console.error("Failed to extend session", error);
      // Optional: show error to user or redirect
    }
  };

  // Called when user does nothing and countdown finishes
  const handleTimeout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_HOST_NAME}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed", error);
    }
    setIsLoggedIn(false);
    setShowExtendPrompt(false);
    navigate("/login");
  };

  return (
    <>
      {showExtendPrompt && (
        <UserWantsToExtendPopup
          onExtend={handleExtend}
          onTimeout={handleTimeout}
        />
      )}
    </>
  );
}
