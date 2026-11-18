"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

export type Theme = "dark" | "oled" | "light" | "system";
export type ResolvedTheme = "dark" | "oled" | "light";

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "dark",
  storageKey = "dying-theme",
  enableSystem = true,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ["dark", "oled", "light", "system"].includes(stored)) {
        return stored as Theme;
      }
    } catch {
      // Storage access blocked or unavailable
    }
    return defaultTheme;
  });

  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }, []);

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (theme === "system") {
      return getSystemTheme();
    }
    return theme;
  });

  // Synchronize resolvedTheme and DOM data-theme attribute
  useEffect(() => {
    const root = document.documentElement;

    const computeResolved = (currentTheme: Theme): ResolvedTheme => {
      if (currentTheme === "system") {
        return getSystemTheme();
      }
      return currentTheme;
    };

    const newResolved = computeResolved(theme);
    setResolvedTheme(newResolved);
    root.setAttribute("data-theme", newResolved);

    // Also toggle standard Tailwind 'dark' class for backward compatibility
    if (newResolved === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }

    // Media query listener when in system mode
    if (theme === "system" && enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      const handleChange = () => {
        const updated = getSystemTheme();
        setResolvedTheme(updated);
        root.setAttribute("data-theme", updated);
        if (updated === "light") {
          root.classList.remove("dark");
        } else {
          root.classList.add("dark");
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, enableSystem, getSystemTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Storage access blocked
      }
      setThemeState(newTheme);
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme =
      resolvedTheme === "dark" ? "oled" : resolvedTheme === "oled" ? "light" : "dark";
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    // Graceful fallback if rendered outside of ThemeProvider
    return {
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
