import { toggleTheme, isDarkTheme } from "~/lib/theme";
import Sun from "../icons/Sun";
import Moon from "../icons/Moon";

export default function ThemeSwitcher() {
  return (
    <label class="flex items-center cursor-pointer gap-1 sm:gap-2">
      <Sun />
      <input type="checkbox" class="toggle toggle-xs theme-controller" checked={isDarkTheme()} onChange={toggleTheme} />
      <Moon />
    </label>
  );
}

