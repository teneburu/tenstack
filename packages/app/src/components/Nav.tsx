
import LanguageSwitcher from "./ui/LanguageSwitcher";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import Logo from "~/assets/images/logo.png?w=72&h=41&format=webp&imagetools";

export default function Nav() {
  return (
    <div class="navbar bg-base-100 shadow-sm px-4">
      <div class="w-full flex justify-between items-center">
        {/* Logo section */}
        <div class="flex-none">
          <div class="flex items-center pointer-events-none select-none">
            <img 
              src={Logo}
              alt="logo" 
            />
          </div>
        </div>
        
        {/* Center section */}
        <div/>
        
        {/* Controls section - condensed on small screens */}
        <div class="flex-none">
          <div class="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
