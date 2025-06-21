import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import esLocale from 'i18n-iso-countries/langs/es.json';

function setupCountriesISO() {
  try {
    countries.registerLocale(enLocale);
    countries.registerLocale(esLocale);
    return true;
  } catch (err) {
    console.error('Failed to import local countries i18n', err);
    return false;
  }
}

export default setupCountriesISO;
