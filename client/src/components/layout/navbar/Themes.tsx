"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Themes: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  function lightTheme(): void {
    setTheme("light");
  }

  function darkTheme(): void {
    setTheme("dark");
  }

  return (
    <div className="flex gap-4">
      {resolvedTheme === "dark" ? (
        <button onClick={lightTheme}>
          <Sun />
        </button>
      ) : (
        <button onClick={darkTheme}>
          <Moon />
        </button>
      )}
    </div>
  );
};

export default Themes;
