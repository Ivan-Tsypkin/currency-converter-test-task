import { Container, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCurrency } from '../utils/currencyApi';
import CurrencyInputBox from './CurrencyInputBox';
import Header from './Header';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const [currencyIn, setCurrencyIn] = useState("");
  const [currencyOut, setCurrencyOut] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [amountInError, setAmountInError] = useState(false);
  const [amountOutError, setAmountOutError] = useState(false);
  const [rates, setRates] = useState<{[key: string]: number}>({});
  const { t } = useTranslation();

  // const localCurrencyIn = localStorage.getItem("currencyIn") || "RUB";
  // const localCurrencyOut = localStorage.getItem("currencyOut") || "USD";

  // Функция рандома валюты
  const getArrayRandomElement = (array: string[]) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  // Регулярка на допуск только чисел с дробью или без
  const onlyFloatNumberRegExp = /^\d*\.?\d*$/g;

  useEffect(() => {
    getCurrency()
      .then(res => {
        setRates({ [res.base]: 1, ...res.rates });
        setCurrencyIn(getArrayRandomElement(Object.keys(res.rates)));
        setCurrencyOut(getArrayRandomElement(Object.keys(res.rates)));
        // setCurrencyIn(localCurrencyIn);
        // setCurrencyOut(localCurrencyOut);
      })
      .catch(error => {
        console.log(error);
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Функция форматирования суммы до сотых
  const format = (number: number) => {
    return number.toFixed(2);
  }

  const handleAmountInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-useless-escape
    if (event.target.value.match(onlyFloatNumberRegExp)) {
      setAmountOut(format(Number(event.target.value) * rates[currencyOut] / rates[currencyIn]));
      setAmountIn(event.target.value);
      setAmountInError(false);
      setAmountOutError(false);
    } else {
      setAmountInError(true);
    }
  }

  const handleAmountOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(onlyFloatNumberRegExp)) {
      setAmountIn(format(Number(event.target.value) * rates[currencyIn] / rates[currencyOut]));
      setAmountOut(event.target.value);
      setAmountInError(false);
      setAmountOutError(false);
    } else {
      setAmountOutError(true);
    }
  }

  const handleCurrencyInChange = (event: SelectChangeEvent, ) => {
    setCurrencyIn(event.target.value);
    setAmountOut(format(Number(amountIn) * rates[currencyOut] / rates[event.target.value]));
    // localStorage.setItem("currencyIn", event.target.value);
  }

  const handleCurrencyOutChange = (event: SelectChangeEvent) => {
    setCurrencyOut(event.target.value);
    setAmountOut(format(Number(amountIn) * rates[event.target.value] / rates[currencyIn]));
    // localStorage.setItem("currencyOut", event.target.value);
  }

  return (
    <div className="App">
      <Header />
      <Container 
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 4,
          p: 4,
          pt: 12,
        }}
      >
        <CurrencyInputBox 
          currencies={Object.keys(rates)}
          amount={Number(amountIn) === 0 ? "" : amountIn}
          currency={currencyIn}
          handleAmountChange={handleAmountInChange}
          handleCurrencyChange={handleCurrencyInChange}
          inputLabel={t("amountInInput")}
          isInputError={amountInError}
        />
        <CurrencyInputBox 
          currencies={Object.keys(rates)}
          amount={Number(amountOut) === 0 ? "" : amountOut}
          currency={currencyOut}
          handleAmountChange={handleAmountOutChange}
          handleCurrencyChange={handleCurrencyOutChange}
          inputLabel={t("amountOutInput")}
          isInputError={amountOutError}
        />
      </Container>
    </div>
  );
}

export default App;
