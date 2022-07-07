var i18n = require("i18next");
var Backend = require('i18next-fs-backend');

i18n
  .use(Backend)
  .init({
    lng: 'en',
    ns: 'translation',
    fallbackLng: false,
    initImmediate: false,
    saveMissing: false, // This causes issues when echo'ing, will save random strings echo'd
    saveMissingTo: 'all',
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
      addPath: "./locales/{{lng}}/{{ns}}.missing.json",
      jsonIndent: 2
    },
    debug: false
  });

console.log(`[Lang] Using language "${i18n.language}" (v.${i18n.t('lang.version')})`)