(function () {
  window.I18N_LOCALES = window.I18N_LOCALES || {};
  var activeLocale = 'en';

  function deepGet(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : undefined;
    }, obj);
  }

  function template(str, params) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, function (_, token) {
      return Object.prototype.hasOwnProperty.call(params, token) ? params[token] : '{' + token + '}';
    });
  }

  function t(key, params) {
    var current = deepGet(window.I18N_LOCALES[activeLocale] || {}, key);
    var fallback = deepGet(window.I18N_LOCALES.en || {}, key);
    var value = current || fallback || key;
    return typeof value === 'string' ? template(value, params) : key;
  }

  function applyI18nToDom(root) {
    var target = root || document;
    target.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    target.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
  }

  function setLocale(locale) {
    if (!window.I18N_LOCALES[locale]) return;
    activeLocale = locale;
    window.localStorage.setItem('trimps.locale', locale);
    document.documentElement.lang = locale;
    applyI18nToDom(document);
  }

  function detectLocale() {
    var saved = window.localStorage.getItem('trimps.locale');
    if (saved && window.I18N_LOCALES[saved]) return saved;
    var navLang = (navigator.language || 'en').slice(0, 2);
    return window.I18N_LOCALES[navLang] ? navLang : 'en';
  }

  window.i18n = {
    t: t,
    setLocale: setLocale,
    applyI18nToDom: applyI18nToDom,
    getLocale: function () { return activeLocale; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    setLocale(detectLocale());
  });
})();
