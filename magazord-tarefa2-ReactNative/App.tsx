import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Weather from './src/Weather';

// Criar o componente App
const App = () => {
  // Retornar o JSX do componente
  return (
    <SafeAreaProvider>
      <Weather lat={-25.4284} lon={-49.2733} />
    </SafeAreaProvider>
  );
};

// Exportar o componente App
export default App;

