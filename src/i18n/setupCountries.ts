function setupCountriesISO() {
    try {
        const registerLocale = require('i18n-iso-countries');
        registerLocale(require("i18n-iso-countries/langs/en.json"));
        registerLocale(require("i18n-iso-countries/langs/es.json"));
        return true;
    } catch(err) {
        console.error('Failed to import local countries i18n');
        return false;
    };
}

export default setupCountriesISO;
