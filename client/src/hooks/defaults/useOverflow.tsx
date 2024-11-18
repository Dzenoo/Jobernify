"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useOverflow = (name: string) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes(name)) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [pathname]);
};

export default useOverflow;
