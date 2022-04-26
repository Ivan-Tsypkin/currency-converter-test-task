export const BASE_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=2f1976bd4296319d7d560ffa0adbf850";

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