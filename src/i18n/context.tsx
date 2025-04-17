import { createContext, useContext, createSignal, createMemo, ParentComponent, createEffect } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { Language, dictionaries } from "./index";

// Define flattened dictionary type with more flexible index signature
type FlattenedDictionary = {
  [key: string]: string | Record<string, any>;
};

// Create flattened dictionaries for the translator
const flattenedDictionaries: Record<Language, FlattenedDictionary> = {
  en: i18n.flatten(dictionaries.en),
  fr: i18n.flatten(dictionaries.fr),
};

// Create context
type I18nContextValue = {
  language: () => Language;
  setLanguage: (lang: Language) => void;
  direction: () => "ltr" | "rtl";
  t: (key: string, params?: Record<string, string>) => string;
  dict: () => Record<string, any>;
};

const I18nContext = createContext<I18nContextValue>();

// Create provider component
export const I18nProvider: ParentComponent = (props) => {
  // Default language based on browser preference, falling back to English
  const getDefaultLanguage = (): Language => {
    // Check if we're in the browser
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === "fr") return "fr";
    }
    return "en";
  };

  const [language, setLanguage] = createSignal<Language>(getDefaultLanguage());
  
  // Get the current dictionary
  const dict = createMemo(() => {
    const lang = language();
    return flattenedDictionaries[lang];
  });
  
  // Get the current direction
  const direction = createMemo(() => {
    const lang = language();
    return dictionaries[lang].direction as "ltr" | "rtl";
  });
  
  // Create a custom translator function that handles template resolution
  const t = (key: string, params?: Record<string, string>): string => {
    const currentDict = dict();
    if (!currentDict) return key;
    
    const value = currentDict[key];
    
    if (typeof value === 'string') {
      return params ? i18n.resolveTemplate(value, params) : value;
    }
    
    return key;
  };
  
  // Update HTML attributes when language changes - defer this to not block LCP
  const updateHtmlAttributes = () => {
    // Use requestAnimationFrame to defer DOM updates 
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.documentElement.setAttribute("lang", language());
        document.documentElement.setAttribute("dir", direction());
      });
    }
  };
  
  // Create effect to update HTML attributes
  createEffect(() => {
    // Use setTimeout with 0ms delay to defer this operation after critical rendering
    setTimeout(updateHtmlAttributes, 0);
  });
  
  const contextValue: I18nContextValue = {
    language,
    setLanguage,
    direction,
    t,
    dict,
  };
  
  return (
    <I18nContext.Provider value={contextValue}>
      {props.children}
    </I18nContext.Provider>
  );
};

// Custom hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}; 