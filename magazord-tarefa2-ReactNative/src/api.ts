import axios from 'axios';

// Coloque aqui a sua chave de API do OpenWeatherMap
const API_KEY = 'f7437dcf0e3734abd1c1621aff1cddd7';

// Criar uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

// Exportar uma função que recebe as coordenadas geográficas e retorna os dados de clima
export const getWeatherByCoords = async (lat: number, lon: number) => {
  // Fazer uma requisição GET para o endpoint /weather, passando os parâmetros necessários
  const response = await api.get('/weather', {
    params: {
      lat, // latitude
      lon, // longitude
      appid: API_KEY, // chave de API
      units: 'metric', // unidades de medida (Celsius)
      lang: 'pt_br', // idioma (português brasileiro)
    },
  });

  // Retornar os dados da resposta
  return response.data;
};
