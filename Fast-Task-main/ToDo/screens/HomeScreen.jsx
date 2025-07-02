
import { useState } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, Modal, View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([
    { id: '1', title: 'Item 1', description: 'Descrição do item 1', completed: false },
    { id: '2', title: 'Item 2', description: 'Descrição do item 2', completed: false },
    { id: '3', title: 'Item 3', description: 'Descrição do item 3', completed: false },
    { id: '4', title: 'Item 4', description: 'Descrição do item 4', completed: false },
    { id: '5', title: 'Item 5', description: 'Descrição do item 5', completed: false },
    { id: '6', title: 'Item 6', description: 'Descrição do item 6', completed: false },
    { id: '7', title: 'Item 7', description: 'Descrição do item 7', completed: false },
    { id: '8', title: 'Item 8', description: 'Descrição do item 8', completed: false },
    { id: '9', title: 'Item 9', description: 'Descrição do item 9', completed: false },
    { id: '10', title: 'Item 10', description: 'Descrição do item 10', completed: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const showAlert = (message, onConfirm) => {
    Alert.alert('Confirmação', message, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: onConfirm, style: 'destructive' },
    ]);
  };

  const addItem = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Voce preciso completar todos os campos para continuar',
        [
          { text: 'OK', style: 'default' }
        ]
      );
      return;
    }
    const newId = (data.length + 1).toString();
    const newItem = {
      id: newId,
      title: newTitle,
      description: newDescription,
      completed: false,
    };
    setData([...data, newItem]);
    setModalVisible(false);
    setNewTitle('');
    setNewDescription('');
  };

  const toggleComplete = (id) => {
    setData(data.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    showAlert('Tem certeza que deseja excluir este item?', () => {
      setData(data.filter(item => item.id !== id));
    });
  };

  const deleteAll = () => {
    showAlert('Tem certeza que deseja excluir todos os itens?', () => {
      setData([]);
    });
  };

  const filteredData = () => {
    let filtered = [...data];
    if (filter === 'completed') {
      filtered = filtered.filter(item => item.completed);
    } else if (filter === 'incomplete') {
      filtered = filtered.filter(item => !item.completed);
    }
    if (searchQuery.trim()) {     
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const Item = ({ title, description, id, completed }) => (
    <View style={[styles.item, completed && styles.completedItem]}>
      <View style={styles.itemContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', { title, description })}>
          <Text style={[styles.itemTitle, completed && styles.completedText]}>
            {title}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.itemDescription, completed && styles.completedText]}>
          {description}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.completeButton, completed && styles.completedButton]} onPress={() => toggleComplete(id)}>
          <Text style={styles.completeButtonText}>
            {completed ? 'Desmarcar' : 'Concluído'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.activeFilter]} onPress={() => setFilter('all')}>
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'completed' && styles.activeFilter]} onPress={() => setFilter('completed')}>
          <Text style={styles.filterText}>Completos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'incomplete' && styles.activeFilter]} onPress={() => setFilter('incomplete')}>
          <Text style={styles.filterText}>Incompletos</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar por título..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={filteredData()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item title={item.title} description={item.description} id={item.id} completed={item.completed} />}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.botaoDeleteAll} onPress={deleteAll}>
        <Text style={styles.botaoText}>Excluir Todos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoAdd} onPress={() => setModalVisible(true)}> {/* Corrected to open modal */}
        <Text style={styles.botaoText}>Adicionar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Novo Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite a descrição"
              value={newDescription}
              onChangeText={setNewDescription}
              multiline={true}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#ff4444" />
              <Button title="Adicionar" onPress={addItem} color="#44cc44" />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  searchBar: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedItem: {
    backgroundColor: '#E0E0E0',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  botaoAdd: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 60,
  },
  botaoDeleteAll: {
    backgroundColor: '#FF4444',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 2,
  },
  botaoText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    backgroundColor: '#FAFAFA',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  completedButton: {
    backgroundColor: '#FF4444',
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});