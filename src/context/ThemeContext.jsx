import { createContext, useState, useEffect, useMemo, useContext } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const nextTheme = theme === 'dark' ? 'dark' : 'light';

    root.classList.remove('dark', 'light');
    root.classList.add(nextTheme);
    root.style.colorScheme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
