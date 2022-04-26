export const BASE_URL = "https://www.cbr-xml-daily.ru/latest.js";

function handleResponse(res: Response) {
  if (res.ok) {return res.json()}
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCurrency = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
  })
    .then(res => handleResponse(res))
}