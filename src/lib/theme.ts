// Theme initialization
import { makePersisted } from "@solid-primitives/storage";
import { createSignal, createEffect } from "solid-js";
import { usePrefersDark } from "@solid-primitives/media";

// Get system preference for dark mode
export const prefersDark = usePrefersDark();

// Create a persisted theme signal with default value
const [theme, setTheme] = makePersisted(createSignal<string>('light'), {
  name: 'theme'
});

export const isDarkTheme = () => theme() === 'dark';

// Apply theme to document
const applyTheme = (newTheme: string): void => {
  document.documentElement.setAttribute('data-theme', newTheme);
  setTheme(newTheme);
};

// Initialize theme immediately
const getInitialTheme = (): string => {
  try {
    const currentTheme = theme();
    if (currentTheme) {
      return currentTheme;
    }
    
    // If no theme is set, use system preference
    return prefersDark() ? 'dark' : 'light';
  } catch (e) {
    // In case of any errors (e.g., in SSR context), return a default
    return 'dark';
  }
};

// Theme toggle function
const toggleTheme = (): string => {
  const currentTheme = theme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  
  return newTheme;
};

// Auto-update theme when system preference changes
createEffect(() => {
  // Only apply system preference if user hasn't manually set a theme
  if (!theme()) {
    const systemTheme = prefersDark() ? 'dark' : 'light';
    applyTheme(systemTheme);
  }
});

export { getInitialTheme, applyTheme, toggleTheme, theme }; 