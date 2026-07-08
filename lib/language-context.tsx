"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { translations, type Language, type TranslationKey } from "./translations";
import { localeFromPathname } from "./i18n";

type LanguageContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => translations.en[k],
});

export const LANG_COOKIE = "clde-lang";
export const LANG_STORAGE = "clde-lang";

function persistLang(next: Language) {
  try {
    // 1 year expiry, lax samesite. `secure` only on HTTPS so localhost still works.
    const oneYear = 60 * 60 * 24 * 365;
    const secure =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? "; secure"
        : "";
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${oneYear}; samesite=lax${secure}`;
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(LANG_STORAGE, next);
  } catch {
    /* ignore */
  }
}

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: ReactNode;
  initialLang?: Language;
}) {
  const pathname = usePathname();

  // The URL is the source of truth for language: "/es/..." is Spanish,
  // everything else English. Deriving it during render (rather than storing it)
  // keeps the nav, footer, and other client chrome correct on every
  // navigation — including soft ones, which don't re-run the server layout.
  const lang: Language = pathname ? localeFromPathname(pathname) : initialLang;

  // Keep <html lang> in sync on client-side navigations.
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    // The URL drives the language; persist the choice so it can inform future
    // visits, but navigation is what actually switches languages.
    persistLang(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key],
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
