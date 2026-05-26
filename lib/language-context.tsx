"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type TranslationKey } from "./translations";

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
  const [lang, setLangState] = useState<Language>(initialLang);

  // Reconcile with localStorage on mount in case the server didn't see the
  // cookie (first visit, edge cache, etc.). If localStorage says "es" but the
  // server rendered "en", upgrade and re-persist the cookie.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE);
      if ((stored === "en" || stored === "es") && stored !== lang) {
        setLangState(stored);
        persistLang(stored);
        document.documentElement.lang = stored;
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    persistLang(next);
    try {
      document.documentElement.lang = next;
    } catch {
      /* ignore */
    }
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
