import { useEffect, useState } from "react";
import { useSessionStore } from "stores/useSessionStore";
import axios from "axios";
import UserWantsToExtendPopup from "./userWantsToExtendPopup";

export default function SessionExpirationWatcher({
  onSessionExpired,
}: {
  onSessionExpired: () => void;
}) {
  const {
    sessionExpirationTime,
    serverTimeOffset,
    setSessionExpirationTime,
    setServerTimeOffset,
    setIsLoggedIn,
  } = useSessionStore();

  const [showExtendPrompt, setShowExtendPrompt] = useState(false);

  const getAdjustedTime = () => Date.now() - (serverTimeOffset || 0);

  // Initial session expiration check on mount
  useEffect(() => {
    if (sessionExpirationTime && getAdjustedTime() >= sessionExpirationTime) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check session again when tab becomes visible
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

  // Poll to determine when to show the popup or trigger timeout
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = getAdjustedTime();

      if (sessionExpirationTime && sessionExpirationTime >= currentTime) {
        const timeRemaining = sessionExpirationTime - currentTime;

        if (timeRemaining <= 60_000 && !showExtendPrompt) {
          setShowExtendPrompt(true);
        }
      } else if (sessionExpirationTime && currentTime >= sessionExpirationTime) {
        handleTimeout();
      }
    }, 10_000);

    return () => clearInterval(interval);
  }, [sessionExpirationTime, showExtendPrompt, serverTimeOffset]);

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

    setShowExtendPrompt(false);
    onSessionExpired(); // <--- This is the key part!
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
