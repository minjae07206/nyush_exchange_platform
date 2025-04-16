import { useEffect, useState } from "react";
import { useSessionStore } from "stores/useSessionStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserWantsToExtendPopup from "./userWantsToExtendPopup";

export default function SessionExpirationWatcher() {
  const navigate = useNavigate();
  const {
    sessionExpirationTime,
    serverTimeOffset,
    setSessionExpirationTime,
    setServerTimeOffset,
    setIsLoggedIn,
  } = useSessionStore();

  const [showExtendPrompt, setShowExtendPrompt] = useState(false);

  // Get adjusted time using server offset
  const getAdjustedTime = () => Date.now() - (serverTimeOffset || 0);

  // Immediate logout if session already expired
  useEffect(() => {
    if (sessionExpirationTime && getAdjustedTime() >= sessionExpirationTime) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Visibility change handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (sessionExpirationTime && getAdjustedTime() >= sessionExpirationTime) {
          handleTimeout();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sessionExpirationTime, serverTimeOffset]);

  // Poll every 10s to check if we need to show the extend prompt
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = getAdjustedTime();

      if (sessionExpirationTime && sessionExpirationTime >= currentTime) {
        const timeRemaining = sessionExpirationTime - currentTime;
        console.log("TimeRemaining: ", timeRemaining);

        if (timeRemaining <= 60_000 && !showExtendPrompt) {
          setShowExtendPrompt(true);
        }
      } else if (sessionExpirationTime && currentTime >= sessionExpirationTime) {
        handleTimeout();
      }
    }, 10_000);

    return () => clearInterval(interval);
  }, [sessionExpirationTime, showExtendPrompt, serverTimeOffset]);

  // User chooses to extend session
  const handleExtend = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_NAME}/api/auth/keep-alive`,
        {},
        { withCredentials: true }
      );

      if (response.data.message === "session-renewed") {
        const { sessionExpirationTime, serverNow } = response.data;

        const offset = Date.now() - serverNow;
        setSessionExpirationTime(sessionExpirationTime);
        setServerTimeOffset(offset);
        setIsLoggedIn(true);
        setShowExtendPrompt(false);
      }
    } catch (error) {
      console.error("Failed to extend session", error);
    }
  };

  // Session expired
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
