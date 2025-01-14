import { useState, useEffect } from 'react';

const useMounted = (): {
  isMounted: boolean;
} => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
};

export { useMounted };
