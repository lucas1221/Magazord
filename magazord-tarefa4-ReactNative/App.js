import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Alert, TextInput, Modal } from 'react-native';
import { FAB, Appbar, Switch } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import temas from './temas';

const ListaTarefas = () => {
  const [tarefas, setTarefas] = useState([
    {id: 1, titulo: "Tarefa 1", descricao: "Descrição da Tarefa 1", concluida: false },
    {id: 2, titulo: "Tarefa 2", descricao: "Descrição da Tarefa 2", concluida: true },
    {id: 3, titulo: "Tarefa 3", descricao: "Descrição da Tarefa 3", concluida: false },
    {id: 4, titulo: "Tarefa 4", descricao: "Descrição da Tarefa 4", concluida: true },
    {id: 5, titulo: "Tarefa 5", descricao: "Descrição da Tarefa 5", concluida: false },
    {id: 6, titulo: "Tarefa 6", descricao: "Descrição da Tarefa 6", concluida: true },
    {id: 7, titulo: "Tarefa 7", descricao: "Descrição da Tarefa 7", concluida: false },
    //{id: 8, titulo: "Tarefa 8", descricao: "Descrição da Tarefa 8", concluida: true },
    // ... adicione mais tarefas conforme necessário
  ]);
  const ItemTarefa = ({ tarefa, alternar, excluir }) => (
    <TouchableOpacity style={estilos.itemTarefa} onPress={alternar} onLongPress={excluir}>
      <View>
        <Text style={[estilos.titulo, tarefa.concluida && estilos.textoTarefaConcluida]}>
          {tarefa.titulo}
        </Text>
        <Text style={[estilos.descricao, tarefa.concluida && estilos.textoTarefaConcluida]}>
          {tarefa.descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const [temaSelecionado, setTemaSelecionado] = useState('claro'); //Hook para o switch do tema
  const colors = temas[temaSelecionado].cores; // cores do tema

  const [aberto, setAberto] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const alternarTarefa = (id) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  const excluirTarefa = (id) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const adicionarTarefa = () => {
    if (titulo && descricao) {
      const novaTarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        descricao: descricao,
        concluida: false,
      };
      setTarefas([...tarefas, novaTarefa]);
      setTitulo('');
      setDescricao('');
      setAberto(false);
    } else {
      Alert.alert('Campos Vazios', 'Por favor, preencha o título e a descrição da tarefa.');
    }
  };

  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.fundo,
    },
    appbar: {
      backgroundColor: colors.primaria,
      padding: 2,
      marginBottom: 10,
    },
    itemTarefa: {
      backgroundColor: colors.secundaria,
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textoTarefa: {
      fontSize: 16,
      color: colors.texto,
    },
    textoTarefaConcluida: {
      textDecorationLine: 'line-through',
      color: '#aaa',
    },
    titulo: {
      fontWeight: 'bold',
      fontSize: 20,
      color: colors.texto,
    },
    descricao: {
      fontSize: 16,
      color: colors.texto,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: colors.primaria,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: colors.primaria,
    },
    botao: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: colors.primaria,
    },
    textoBotao: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
  });
  
  const handleChangeTheme = (tema) => {
      setTemaSelecionado(tema);
  };

  const toggleSwitch = () => handleChangeTheme(temaSelecionado === 'claro' ? 'escuro' : 'claro'); 

  return (
    <SafeAreaProvider>
      <View style={estilos.container}>
      <Appbar.Header style={estilos.appbar}>
        <Appbar.Content title="Lista de Tarefas" color={colors.titulo} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.titulo, marginRight: 10, fontSize: 18 }}>Mudar tema</Text>
          <Switch
            style={{ marginTop: 4 }}
            value={temaSelecionado === 'claro'}
            onValueChange={toggleSwitch}
            color="#FFFFFF"
          />
        </View>
      </Appbar.Header>

        <FlatList
          data={tarefas}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ItemTarefa tarefa={item} alternar={() => alternarTarefa(item.id)} excluir={() => excluirTarefa(item.id)} />}
        />
        <FAB
          style={estilos.fab}
          icon="plus"
          color="#FFFFFF"
          onPress={() => setAberto(true)}
        />
        <Modal
          visible={aberto}
          transparent={true}
          animationType="slide"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Adicionar Tarefa</Text>
              <TextInput
                style={estilos.input}
                placeholder="Título"
                value={titulo}
                onChangeText={setTitulo}
              />
              <TextInput
                style={estilos.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => setAberto(false)}>
                  <View style={[estilos.botao, { backgroundColor: '#f00' }]}>
                    <Text style={estilos.textoBotao}>Cancelar</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={adicionarTarefa}>
                  <View style={estilos.botao}>
                    <Text style={estilos.textoBotao}>Salvar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

export default ListaTarefas;


