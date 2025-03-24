import { useCallback, useEffect, useRef, useState } from 'react';
import ky from 'ky';

const useNetworkSpeed = (url: string) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [networkSpeed, setNetworkSpeed] = useState<number | null>(null);

  const measureSpeed = useCallback(async () => {
    const startTime = Date.now();

    try {
      const response = await ky(url, { cache: 'no-cache' });
      const blob = await response.blob();

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds

      const fileSize = blob.size * 8; // convert to bits
      const speedKbps = fileSize / duration / 1024; // convert to Kbps

      setNetworkSpeed(speedKbps);
    } catch (error) {
      console.error('Error measuring network speed:', error);
      setNetworkSpeed(null);
    }
  }, [url]);

  useEffect(() => {
    measureSpeed();

    intervalRef.current = setInterval(() => measureSpeed(), 20000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [measureSpeed]);

  return networkSpeed;
};

export default useNetworkSpeed;
