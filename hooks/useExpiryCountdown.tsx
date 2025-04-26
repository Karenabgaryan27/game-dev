import { useEffect, useState } from "react";

function useExpiryCountdown(ttlSeconds: number): {
  timeLeft: string;
  isNearExpiry: boolean;
  isExpired: boolean;
} {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isNearExpiry, setIsNearExpiry] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const updateCountdown = () => {
      const ttlDate = new Date(ttlSeconds * 1000);
      const now = new Date();
      const diff = ttlDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(intervalId);
        setIsNearExpiry(false); // Reset the near expiry state when time is up
        setIsExpired(true); // Mark as expired
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      setTimeLeft(formattedTime);

      // Convert time left to seconds for comparison
      const remainingSeconds = hours * 3600 + minutes * 60 + seconds;

      // If less than 3 minutes (180 seconds), mark as near expiry
      setIsNearExpiry(remainingSeconds  < 60 * 100);
      setIsExpired(false); // Reset expired state while time is still counting down
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown(); // run immediately

    return () => clearInterval(intervalId);
  }, [ttlSeconds]);

  return { timeLeft, isNearExpiry, isExpired };
}

export default useExpiryCountdown;
