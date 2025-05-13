import { useI18n } from "~/i18n/context";
import { Language, dictionaries } from "~/i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  
  // Get all available languages
  const languages = Object.entries(dictionaries).map(([code, data]) => ({
    code: code as Language,
    name: data.name,
  }));
  
  return (
    <div class="dropdown dropdown-end dropdown-hover">
      <button tabindex="0" role="button" class="btn btn-ghost btn-xs gap-1">
        <span class="text-sm underline underline-offset-2">{language()}</span>
      </button>
      <ul tabindex="0" class="menu menu-sm dropdown-content z-[1] p-2 shadow w-fit bg-base-100">
        {languages.map((lang) => (
          <li>
            <button 
              class={language() === lang.code ? "active" : ""}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 