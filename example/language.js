import { LanguageHandler } from '../lib';

const localeChangeCallback = (locale) => console.log(locale)

const l = new LanguageHandler("en", ["en", "de"], localeChangeCallback);

export default l;
