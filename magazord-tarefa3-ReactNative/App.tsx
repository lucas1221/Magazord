// Importações necessárias
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

// Constantes para cores e estilos comuns
const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
};

// Dados dos produtos
const produtos = [
  { nome: 'Escova de dentes', preco: 'R$10,00', detalhes: 'Detalhes do Produto 1', imagem: 'https://cdn-icons-png.flaticon.com/512/80/80521.png' },
  { nome: 'Computador', preco: 'R$2.000,00', detalhes: 'Detalhes do Produto 2', imagem: 'https://cdn.pixabay.com/photo/2021/04/04/07/49/laptop-svg-6149345_960_720.png' },
  { nome: 'Coca-Cola 2L', preco: 'R$12,00', detalhes: 'Detalhes do Produto 3', imagem: 'https://images-food.ifcshop.com.br/produto/22956_0_20200423185225.jpg' },
  { nome: 'Smartphone Redmi Note 15', preco: 'R$2.500,00', detalhes: 'Detalhes do Produto 4', imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/2048px-Xiaomi_logo_%282021-%29.svg.png' },
  { nome: 'Cadeira', preco: 'R$500,00', detalhes: 'Detalhes do Produto 5', imagem: 'https://www.creativefabrica.com/wp-content/uploads/2020/05/04/1588577072/Adirondack-Chair-black-580x386.jpg' },
];

// Estilos
const styles = StyleSheet.create({
  card: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 30,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  price: {
    fontSize: 18,
    color: COLORS.black,
  },
  detailButton: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  detailButtonText: {
    color: COLORS.black,
  },
});

// Tela da Lista de Produtos
function ListaProdutos({ navigation }) {
  return (
    <FlatList
      data={produtos}
      contentContainerStyle={{ paddingBottom: 20 }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item: produto }) => (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: produto.imagem }} resizeMode="contain" />
          <Card.Content>
            <Title style={styles.title}>{produto.nome}</Title>
            <Paragraph style={styles.price}>{produto.preco}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.detailButton}>
            <Button
              onPress={() => navigation.navigate('DetalhesProduto', { produto })}
              labelStyle={styles.detailButtonText}
            >
              Ver Detalhes
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}

// Tela de Detalhes do Produto
function DetalhesProduto({ route }) {
  const { produto } = route.params;
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: produto.imagem }} resizeMode="contain" />
      <Card.Content>
        <Title style={styles.title}>{produto.nome}</Title>
        <Paragraph style={styles.price}>{produto.preco}</Paragraph>
        <Paragraph>{produto.detalhes}</Paragraph>
      </Card.Content>
    </Card>
  );
}

// Componente principal
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProdutos">
        <Stack.Screen name="ListaProdutos" component={ListaProdutos} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="DetalhesProduto" component={DetalhesProduto} options={{ title: 'Detalhes do Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

