import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Paragraph, Title } from 'react-native-paper';
import { getWeatherByCoords } from './api';

// Definir a interface dos dados de clima que vamos usar
interface WeatherData {
  name: string; // nome da cidade
  main: {
    temp: number; // temperatura atual
    feels_like: number; // sensação térmica
  };
  weather: [
    {
      description: string; // descrição do clima
      icon: string; // ícone do clima
    }
  ];
}

// Definir a interface das props do componente
interface WeatherProps {
  lat: number; // latitude
  lon: number; // longitude
}

// Criar o componente Weather
const Weather: React.FC<WeatherProps> = ({ lat, lon }) => {
  // Criar um estado para armazenar os dados de clima
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Criar um estado para armazenar o status da requisição
  const [loading, setLoading] = useState(true);

  // Criar um estado para armazenar o erro da requisição, se houver
  const [error, setError] = useState('');

  // Criar um efeito para buscar os dados de clima quando o componente for montado
  useEffect(() => {
    // Definir uma função assíncrona para fazer a requisição
    const fetchWeather = async () => {
      try {
        // Chamar a função getWeatherByCoords, passando as coordenadas
        const data = await getWeatherByCoords(lat, lon);

        // Atualizar o estado com os dados recebidos
        setWeather(data);

        // Atualizar o estado do loading para false
        setLoading(false);
      } catch (err) {
        // Se ocorrer um erro, atualizar o estado do erro com a mensagem
        setError(err.message);

        // Atualizar o estado do loading para false
        setLoading(false);
      }
    };

    // Invocar a função assíncrona
    fetchWeather();
  }, [lat, lon]); // Passar as coordenadas como dependências do efeito

  // Retornar o JSX do componente
  return (
    <View style={styles.container}>
      {loading ? ( // Se estiver carregando, mostrar um indicador de atividade
        <ActivityIndicator size="large" color="#00a0ff" />
      ) : error ? ( // Se houver um erro, mostrar uma mensagem de erro
        <Paragraph style={styles.error}>{error}</Paragraph>
      ) : weather ? ( // Se houver dados de clima, mostrar um card com as informações
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{weather.name}</Title>
            <Paragraph style={styles.paragraph}>
              {weather.weather[0].description}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Temperatura: {weather.main.temp} °C
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Sensação térmica: {weather.main.feels_like} °C
            </Paragraph>
          </Card.Content>
          <Card.Cover
            style={styles.cover}
            source={{
              uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`, // Usar o ícone da API como imagem do card
            }}
          />
        </Card>
      ) : null // Se não houver nenhum dos casos anteriores, não mostrar nada
      }
    </View>
  );
};

// Definir os estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '80%',
    height: '50%',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 18,
  },
  cover: {
    height: '50%',
  },
  error: {
    color: '#f00',
    fontSize: 18,
  },
});

// Exportar o componente Weather
export default Weather;
