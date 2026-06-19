"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import "./ThemeToggleSwitch.css";

const subscribe = () => () => {}; 
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) {
    return <div className="w-12.5 h-6.25" aria-hidden="true" />;
  }

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={resolvedTheme === "dark"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle Dark Mode"
      />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggle;