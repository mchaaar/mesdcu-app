import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, FlatList, Alert, Modal, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuthStore } from '../store';
import BurgerMenu from './BurgerMenu';
import { fetchProducts, addSubscription, removeSubscription } from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const getProductIcon = (productName) => {
  switch (productName.toLowerCase()) {
    case 'socialdrive': return 'cloud-sync';
    case 'cloudsafe': return 'cloud-lock';
    case 'marketanalytics': return 'chart-line';
    case 'projecthub': return 'clipboard-text';
    case 'devopspro': return 'server-network';
    case 'salesboost': return 'cart';
    default: return 'cogs';
  }
};

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

  const subscribedProducts = products.filter((item) => item.subscribed === 1);
  const availableProducts = products.filter((item) => item.subscribed === 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardWrapper} onPress={() => openModal(item)}>
      <Card style={[styles.card, item.subscribed ? styles.subscribedCard : styles.unsubscribedCard]}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Icon name={getProductIcon(item.name)} size={50} color="#635bff" style={styles.icon} />
          <Text style={styles.cardDuration}>{extractDuration(item.description)}</Text>
        </View>

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
      <Text style={styles.title}>Your Services</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#635bff" />
      ) : (
        <ScrollView>
          {subscribedProducts.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Your Subscriptions</Text>
              <FlatList
                data={subscribedProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContainer}
              />
            </>
          )}

          {availableProducts.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Available Services</Text>
              <FlatList
                data={availableProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContainer}
              />
            </>
          )}
        </ScrollView>
      )}

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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#635bff', marginVertical: 10, paddingLeft: 10 },
  listContainer: { paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 15 },
  cardWrapper: { flex: 1, marginHorizontal: 5 },

  card: {
    borderRadius: 12,
    padding: 10,
    elevation: 4,
    alignItems: 'center',
    width: '100%',
    minHeight: 200,
  },
  cardContent: { alignItems: 'center', marginBottom: 10 },
  subscribedCard: { backgroundColor: '#e3e7ff' },
  unsubscribedCard: { backgroundColor: '#ffffff' },

  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#32325d', textAlign: 'center', marginBottom: 5 },
  icon: { marginVertical: 10 },
  cardDuration: { fontSize: 12, color: '#525f7f', textAlign: 'center', marginBottom: 5 },

  button: { width: '100%', borderRadius: 6 },
  subscribeButton: { backgroundColor: '#4CAF50' },
  unsubscribeButton: { backgroundColor: '#DC3545' },

  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '85%', maxHeight: '70%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#32325d' },
  modalScroll: { flexGrow: 0, marginBottom: 15 },
  modalDescription: { fontSize: 14, color: '#525f7f', textAlign: 'justify' },
  modalButton: { backgroundColor: '#635bff', alignSelf: 'center' },
});
