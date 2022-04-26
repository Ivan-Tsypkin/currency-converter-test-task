import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          header: "Currency converter",
          amountInInput: "Change",
          amountOutInput: "Get",
          amountErrorText: "Numbers and • only"
        }
      },
      ru: {
        translation: {
          header: "Конвертер валют",
          amountInInput: "Меняю",
          amountOutInput: "Получаю",
          amountErrorText: "Допустимы только цифры и •"
        }
      }
    }
  });

export default i18n;