import { useEffect, useState } from "react";
import { useSessionStore } from "stores/useSessionStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Avoid capital letters in filenames if your file system is case-sensitive (e.g., Linux/Mac)
import UserWantsToExtendPopup from "./userWantsToExtendPopup";

export default function SessionExpirationWatcher() {
  const navigate = useNavigate();
  const {
    sessionExpirationTime,
    setSessionExpirationTime,
    setIsLoggedIn,
  } = useSessionStore();

  const [showExtendPrompt, setShowExtendPrompt] = useState(false);

  // 🔹 Timeout handler
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

  // 🔹 Extend handler
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
    }
  };

  // 🔹 Check on mount: if already expired, logout
  useEffect(() => {
    const currentTime = Date.now();
    if (sessionExpirationTime && sessionExpirationTime < currentTime) {
      handleTimeout();
    }
  }, []); // run once on mount

  // 🔹 Listen for tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentTime = Date.now();
        if (sessionExpirationTime && sessionExpirationTime < currentTime) {
          handleTimeout();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sessionExpirationTime]);

  // 🔹 Interval check every 10s to maybe show extend prompt
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();

      if (sessionExpirationTime && sessionExpirationTime >= currentTime) {
        const timeRemaining = sessionExpirationTime - currentTime;
        console.log("TimeRemaining: ", timeRemaining);

        if (timeRemaining <= 60_000 && !showExtendPrompt) {
          setShowExtendPrompt(true);
        }
      }

      // Expired but somehow popup wasn't shown or page missed it
      if (sessionExpirationTime && sessionExpirationTime < currentTime) {
        handleTimeout();
      }
    }, 10_000); // every 10 seconds

    return () => clearInterval(interval);
  }, [sessionExpirationTime, showExtendPrompt]);

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
