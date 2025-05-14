import { useEffect, useState } from "react";

interface Props {
  onExtend: () => void;
  onTimeout: () => void;
}

export default function UserWantsToExtendPopup({ onExtend, onTimeout }: Props) {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center w-96">
        <h2 className="text-xl font-semibold mb-4">Session Expiring</h2>
        <p className="mb-4">Your session will expire in <span className="font-bold">{countdown}</span> seconds.</p>
        <p className="mb-6">Do you want to extend your session?</p>
        <button
          onClick={onExtend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Yes, extend session
        </button>
      </div>
    </div>
  );
}
