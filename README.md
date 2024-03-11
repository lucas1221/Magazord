# Desafio Magazord

Essa é minha implementação para o desafio da Magazord: https://github.com/magazord-plataforma/magazord-dev-app-test

Foram implementados 5 aplicativos em React Native e 2 aplicativos em Flutter

Os aplicativos em *React Native* estão organizados nas seguintes pastas: 
- magazord (Tarefa 1)
- magazord-tarefa2-ReactNative (Tarefa 2)
- magazord-tarefa3-ReactNative (Tarefa 3)
- magazord-tarefa4-ReactNative (Tarefa 4)
- magazord-tarefa5-ReactNative (Tarefa 5)

Os aplicativos em *Flutter* estão organizados nas seguintes pastas: 
- magazord-tarefa1-Flutter (Tarefa 1)
- magazord-tarefa2-Flutter (Tarefa 2)

# Tarefa 1 - Lista de Tarefas

Este é um aplicativo React Native (Ou Flutter) que exibe uma lista de tarefas. Cada tarefa tem um título e uma descrição. O usuário pode marcar uma tarefa como concluída, clicando nela, ou excluir uma tarefa, pressionando e segurando nela. O usuário também pode adicionar uma nova tarefa, usando um botão flutuante que abre um modal com dois campos de texto.

# Tarefa 2 - Integração com API

Este aplicativo React Native (Ou Flutter) faz uma busca e exibe informações sobre o clima com base na localização do usuário. A API utilizada foi a OpenWeatherMap. Exibe a temperatura atual e as condições climáticas em uma tela, além de lidar com erros de rede e apresentar mensagens ao usuário.

# Tarefa 3: Navegação entre Telas

Esse é um aplicativo de catálogo de produtos que possui duas telas: uma lista de produtos e uma tela de detalhes do produto. Na tela de lista, exibe 5 produtos com seus nomes, preços e imagens em miniatura. Ao clicar em um produto, o aplicativo navega para a tela de detalhes do produto, onde informações mais detalhadas sobre o produto são exibidas. As animações são fluidas.

# Tarefa 4: Personalização de Tema

O Aplicativdo da tarefa 1 recebeu a capacidade de personalizar o tema do aplicativo. O usuário deve poder escolher entre pelo menos duas opções de cores diferentes para o esquema de cores do aplicativo. Modos Claro ou Escuro.

# Tarefa 5: Bônus (opcional)

Descrição do Desafio: 
Se você quiser demonstrar suas habilidades avançadas, escolha uma das seguintes opções: 
- a) Implemente armazenamento local para salvar as tarefas concluídas e a preferência de tema do usuário. 
- b) Crie animações fluidas ao alternar entre as telas do aplicativo. 
- c) Integre o aplicativo com uma API de terceiros de sua escolha, como compartilhamento em redes sociais ou geração de QR code.

Os Itens A e B foram escolhidos.

O Aplicativo anterior também recebeu novidades nessa tarefa, foi implementado um armazenamento local para salvar as tarefas concluídas e a preferência de tema do usuário. Além de um componente para exibir o carregamento de dados para os usuários se sentirem mais confortáveis.

O Aplicativo da Tarefa 3 possui animações fluidas ao alternar entre as telas do aplicativo.


## Como executar o código - React Native

Para executar o código, você precisa ter o [Expo](https://docs.expo.dev/get-started/installation/) instalado no seu computador e no seu celular. Siga os passos abaixo:

- Clone este repositório para o seu computador.
- Abra o terminal e navegue até a pasta do projeto.
- É Necessário o Node 18 ou Superior
- É Necessário o uso do Yarn
- Execute o comando `yarn install` para instalar as dependências. Isso é necessário em cada pasta de cada tarefa.
- Execute o comando `expo start` para iniciar o servidor do Expo.
- Abra o aplicativo do Expo Go no seu celular (Pode ser baixado na [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www&pli=1) ou [App Store](https://apps.apple.com/us/app/expo-go/id982107779)) e escaneie o QR code que aparece no terminal ou no navegador.
- Aguarde o aplicativo ser carregado !

## Como executar o código - Flutter

  Em construção 🚧 

## Considerações sobre o Desenvolvimento

- Foi escolhido o React Native para a maior parte dos desafios. 

- Para evitar problemas de compatibilidade e emulação, o Expo foi escolhido por ser mais rápido para deploy dos aplicativos.

- Diversas bibliotecas foram utilizadas para completar o desafio, mas principalmente a [React-Native-Paper](https://reactnativepaper.com/) para um desenvolvimento mais rápido e elegante de UI

- Componentes Nativos do React Native com AsyncStorage e ActivityIndicator para armazenar localmente os dados e exibir um icone de carregamento. 

- `yarn` teve um desempenho melhor do que o `npx`. 

- Algumas vezes fiz em Javascript e outras em Typescript (para mostrar a versatilidade). 

- Pelo curto tempo foi necessário uma implementação direta nos componentes iniciais, mas com o tempo organizarei em pastas e farei uma melhor divisão de componentes e estilos.   
