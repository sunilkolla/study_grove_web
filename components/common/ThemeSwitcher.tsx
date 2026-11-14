"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

type ThemeSwitcherProps = {
  variant?: "compact" | "segmented";
  className?: string;
};

export function ThemeSwitcher({
  variant = "compact",
  className = "",
}: ThemeSwitcherProps) {
  const { toggleTheme, setTheme, isMidnight } = useTheme();

  if (variant === "segmented") {
    return (
      <div
        className={`flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 p-1 dark:border-[#2e4a73]/70 dark:bg-[#273853] ${className}`}
        role="group"
        aria-label="Theme selector"
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            !isMidnight
              ? "bg-white text-[#0F5132] shadow-sm"
              : "text-emerald-100/70 hover:text-white dark:text-[#a0b9d9] dark:hover:text-white"
          }`}
        >
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>Daylight</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            isMidnight
              ? "border border-[#395e90]/60 bg-[#273853] text-[#f4f7fb] shadow-sm"
              : "text-emerald-100/70 hover:text-white dark:text-[#a0b9d9] dark:hover:text-white"
          }`}
        >
          <Moon className="h-3.5 w-3.5 text-indigo-300" />
          <span>Midnight Study</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
        isMidnight
          ? "text-indigo-300 hover:bg-[#273853] hover:text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-[#a0b9d9] dark:hover:bg-[#273853] dark:hover:text-white"
      } ${className}`}
      title={
        isMidnight ? "Switch to Daylight Mode" : "Switch to Midnight Study"
      }
      aria-label={
        isMidnight ? "Switch to Daylight Mode" : "Switch to Midnight Study"
      }
    >
      {isMidnight ? (
        <Moon className="h-4 w-4 fill-indigo-300/30" />
      ) : (
        <Sun className="h-4 w-4 text-amber-400" />
      )}
    </button>
  );
}