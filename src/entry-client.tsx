// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import 'solid-devtools'
import { getInitialTheme } from "~/lib/theme";

// Apply theme to document immediately
(() => {
  try {
    // Use direct attribute access for better performance
    const htmlEl = document.documentElement;
    
    // Get initial theme using the exported function
    const currentTheme = getInitialTheme();
    
    // Set attribute for immediate visual effect
    htmlEl.setAttribute('data-theme', currentTheme);
  } catch (e) {
    // Fallback to winter theme if any errors
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

mount(() => <StartClient />, document.getElementById("app")!);
