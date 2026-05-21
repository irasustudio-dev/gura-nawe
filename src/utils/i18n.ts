import translations from '../data/translations.json';

type Language = 'kin' | 'eng';

interface Translation {
  [key: string]: string | Translation;
}

const translationData: { [key in Language]: Translation } = {
  kin: translations.kin,
  eng: translations.eng,
};

export function t(key: string, language: Language = 'kin'): string {
  const keys = key.split('.');
  let current: any = translationData[language];

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to English if translation key not found
      current = translationData.eng;
      for (const fallbackKey of keys) {
        if (current && typeof current === 'object' && fallbackKey in current) {
          current = current[fallbackKey];
        } else {
          // Return the key itself if not found
          return key;
        }
      }
      return current;
    }
  }

  return typeof current === 'string' ? current : key;
}
