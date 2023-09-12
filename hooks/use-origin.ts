import {useEffect, useState} from "react";

export const useOrigin = (): string => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect((): void => {
     setIsMounted(true);
  }, []);

  const origin: string = typeof window !== undefined && window.location.origin ? window.location.origin : "";

  if (!isMounted) {
      return "";
  }

  return origin;
};
