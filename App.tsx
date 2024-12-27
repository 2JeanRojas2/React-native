import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity, Modal } from 'react-native';

// Definir la interfaz de los héroes porque se rompia en la vista del modal al no estar definidos 
interface Hero {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Los datos de los heroes
const heroes: Hero[] = [
  { id: '1', name: 'Spider-Man', image: 'https://cdn.pixabay.com/photo/2020/09/11/00/06/spiderman-5561671_960_720.jpg', description: 'A superhero with spider-like abilities.' },
  { id: '2', name: 'Iron Man', image: 'https://cdn.pixabay.com/photo/2017/07/15/20/50/iron-man-2507706_960_720.png', description: 'A genius billionaire in a powered armor suit.' },
  { id: '3', name: 'Captain America', image: 'https://cdn.pixabay.com/photo/2020/09/24/20/29/captain-america-5599785_960_720.jpg', description: 'Super soldier with enhanced strength and agility.' },
  { id: '4', name: 'Thor', image: 'https://cdn.pixabay.com/photo/2024/09/10/08/30/mythology-9036492_960_720.png', description: 'God of Thunder with a powerful hammer.' },
];

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null); // Definir el tipo como Hero | null

  // Almacenar y mostrar el heroe seleccionado
  const handlePress = (hero: Hero) => {
    setSelectedHero(hero);  
    setShowModal(true);     
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={heroes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heroName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Image source={{ uri: item.image }} style={styles.heroImage} />
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Ver más</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)} // Cierra el modal 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedHero ? (
              <>
                <Text style={styles.modalTitle}>{selectedHero.name}</Text>
                <Image source={{ uri: selectedHero.image }} style={styles.modalHeroImage} />
                <Text style={styles.modalDescription}>{selectedHero.description}</Text>
              </>
            ) : (
              <Text>Loading...</Text> // Muestra "Cargando..." se rompe si no tiene algo seleccionado esto funciona de fondo supongo
            )}
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View style={styles.closeButton}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, 
  },
  heroName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalHeroImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default App;
