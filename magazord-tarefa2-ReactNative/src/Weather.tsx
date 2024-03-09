import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ActivityIndicator, Card, Paragraph, Title } from 'react-native-paper';
import { getWeatherByCoords } from './api';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

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

// Criar um objeto com as cores dos gradientes para cada condição climática
const gradients = {
  clear: ['#4c669f', '#3b5998', '#192f6a'],
  clouds: ['#bdc3c7', '#2c3e50'],
  rain: ['#00c6fb', '#005bea'],
  snow: ['#e6dada', '#274046'],
  mist: ['#bdc3c7', '#2c3e50'],
  default: ['#2c3e50', '#bdc3c7'],
};

// Criar um objeto com os nomes dos ícones para cada condição climática
const icons = {
  clear: 'weather-sunny',
  clouds: 'weather-cloudy',
  rain: 'weather-rainy',
  snow: 'weather-snowy',
  mist: 'weather-fog',
  default: 'weather-cloudy',
};

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
      <StatusBar barStyle="light-content" />
      {loading ? ( // Se estiver carregando, mostrar um indicador de atividade
        <ActivityIndicator size="large" color="#fff" />
      ) : error ? ( // Se houver um erro, mostrar uma mensagem de erro
        <Paragraph style={styles.error}>{error}</Paragraph>
      ) : weather ? ( // Se houver dados de clima, mostrar um card com as informações
        <LinearGradient
          colors={
            gradients[weather.weather[0].icon] || gradients.default // Usar as cores do gradiente correspondente ao ícone do clima ou o gradiente padrão
          }
          style={styles.gradient}
        >
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
            <MaterialCommunityIcons // Usar o ícone personalizado para o clima
              name={icons[weather.weather[0].icon] || icons.default}
              size={100}
              color="#fff"
              style={styles.icon}
            />
          </Card>
        </LinearGradient>
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
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  title: {
    fontSize: 24, 
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  icon: {
    alignSelf: 'center',
  },
  error: {
    color: '#f00',
    fontSize: 18,
  },
});

// Exportar o componente Weather
export default Weather;
