import React, { useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Alert, TextInput, Modal } from 'react-native';
import { FAB, Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  appbar: {
    backgroundColor: '#f5f5f5',
    padding: 2,
    marginBottom: 10,
  },
  itemTarefa: {
    backgroundColor: '#fff',
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
  },
  textoTarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3f3f3f',
  },
  descricao: {
    fontSize: 16,
    color: '#7f7f7f',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00a0ff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  botao: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#00a0ff',
  },
  textoBotao: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

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

const ListaTarefas = () => {
  const [tarefas, setTarefas] = useState([
    {id: 1, titulo: "Tarefa 1", descricao: "Descrição da Tarefa 1", concluida: false },
    {id: 2, titulo: "Tarefa 2", descricao: "Descrição da Tarefa 2", concluida: true },
    // ... adicione mais tarefas conforme necessário
  ]);

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

  return (
    <SafeAreaProvider>
    <View style={estilos.container}>
      <Appbar.Header style={estilos.appbar}>
        <Appbar.Content title="Lista de Tarefas" />
      </Appbar.Header>
      <FlatList
        data={tarefas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemTarefa tarefa={item} alternar={() => alternarTarefa(item.id)} excluir={() => excluirTarefa(item.id)} />}
      />
      <FAB
        style={estilos.fab}
        small
        icon="plus"
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








