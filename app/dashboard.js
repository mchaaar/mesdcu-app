import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, FlatList, Image, Alert, Modal, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuthStore } from '../store';
import BurgerMenu from './BurgerMenu';
import { fetchProducts, addSubscription, removeSubscription } from '../api';

export default function DashboardScreen() {
  const { token, user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const productList = await fetchProducts(token);
      productList.sort((a, b) => b.subscribed - a.subscribed);
      setProducts(productList);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadProducts();
  }, [token]);

  const extractDuration = (description) => {
    const match = description.match(/Duration:.*$/);
    return match ? match[0] : "";
  };

  const toggleSubscription = async (product) => {
    try {
      if (product.subscribed === 1) {
        await removeSubscription(token, user.id, product.id);
      } else {
        await addSubscription(token, user.id, product.id);
      }
      loadProducts();
    } catch (error) {
      Alert.alert("Error", "Subscription action failed.");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardWrapper} onPress={() => openModal(item)}>
      <Card style={[styles.card, item.subscribed ? styles.subscribedCard : null]}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Image source={{ uri: item.image_url }} style={styles.cardImage} resizeMode="cover" />
        <Text style={styles.cardDuration}>{extractDuration(item.description)}</Text>
        <Button
          mode="contained"
          style={[styles.button, item.subscribed ? styles.unsubscribeButton : styles.subscribeButton]}
          onPress={() => toggleSubscription(item)}
        >
          {item.subscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BurgerMenu />
      <Text style={styles.title}>Products</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#635bff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal Description Complète */}
      <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalDescription}>{selectedProduct?.description}</Text>
            </ScrollView>
            <Button mode="contained" style={styles.modalButton} onPress={() => setModalVisible(false)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f9fc', padding: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#32325d', textAlign: 'center', marginVertical: 20 },
  listContainer: { paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 15 },
  cardWrapper: { flex: 1, marginHorizontal: 5 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    alignItems: 'center',
  },
  subscribedCard: {
    backgroundColor: '#e0e0e0',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#32325d', textAlign: 'center', marginBottom: 5 },
  cardImage: { width: '100%', height: 80, borderRadius: 6, backgroundColor: '#e1e4e8', marginBottom: 5 },
  cardDuration: { fontSize: 12, color: '#525f7f', textAlign: 'center', marginBottom: 5 },
  button: { width: '100%' },
  subscribeButton: { backgroundColor: '#635bff' },
  unsubscribeButton: { backgroundColor: '#dc3545' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '85%', maxHeight: '70%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#32325d' },
  modalScroll: { flexGrow: 0, marginBottom: 15 },
  modalDescription: { fontSize: 14, color: '#525f7f', textAlign: 'justify' },
  modalButton: { backgroundColor: '#635bff', alignSelf: 'center' },
});
