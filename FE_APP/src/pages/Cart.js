import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, Dimensions
} from 'react-native';
const ws = Dimensions.get("screen").width / 440;

const Cart = ({ navigation }) => {
  // Checkbox images
  const checkedBoxImage = require('../assets/images/Checkbox_Checked.png');
  const uncheckedBoxImage = require('../assets/images/Checkbox_UnChecked.png');

  const [items, setItems] = useState([
    { 
      id: 1, 
      name: 'Cà chua', 
      quantity: 1, 
      price: 5.1, 
      image: require('../assets/images/food.jpg'),
      checked: false 
    },
    { 
      id: 2, 
      name: 'Chanh', 
      quantity: 1, 
      price: 5.1, 
      image: require('../assets/images/food.jpg'),
      checked: true 
    },
    { 
      id: 3, 
      name: 'Khoai tây', 
      quantity: 1, 
      price: 5.1, 
      image: require('../assets/images/food.jpg'),
      checked: true 
    }
  ]);

  const [dishes, setDishes] = useState([
    { 
      id: 1, 
      name: 'Khoai tây chiên', 
      image: require('../assets/images/food.jpg'),
      items: [
        { 
          id: 3, 
          name: 'Khoai tây', 
          quantity: 1, 
          price: 5.1, 
          image: require('../assets/images/food.jpg'),
          checked: true 
        }
      ]
    },
  ]);

  const calculateTotal = () => {
    const productTotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const shippingFee = 1.6;
    return {
      productTotal: productTotal.toFixed(1),
      shippingFee: shippingFee.toFixed(1),
      totalPayment: (productTotal + shippingFee).toFixed(1)
    };
  };

  const toggleItemCheck = (id, type) => {
    if (type === 'item') {
      setItems(items.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderProductSection = (title, data, type) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => toggleItemCheck(item.id, type)}
          >
            <Image 
              source={item.checked ? checkedBoxImage : uncheckedBoxImage} 
              style={styles.checkbox} 
            />
          </TouchableOpacity>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.quantityContainer}>
              <Text>- {item.quantity} kg +</Text>
            </View>
          </View>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      ))}
    </View>
  );

  const total = calculateTotal();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Giỏ hàng</Text>
      </View>
      
      {renderProductSection('Cá Nhân', items, 'item')}
      {renderProductSection('Món ăn', dishes.flatMap(dish => dish.items), 'dish')}

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text>Tổng tiền sản phẩm</Text>
          <Text>${total.productTotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Phí vận chuyển</Text>
          <Text>${total.shippingFee}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Tổng thanh toán</Text>
          <Text style={styles.totalText}>${total.totalPayment}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: ws*16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ws*16
  },
  backButton: {
    marginRight: ws*16
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300'
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sectionContainer: {
    marginBottom: ws*16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: ws*12
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: ws*8
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ws*8,
    paddingVertical: ws*8,
    borderBottomWidth: ws*1,
    borderBottomColor: '#eee'
  },
  checkboxContainer: {
    marginRight: ws*12
  },
  checkbox: {
    width: ws*20,
    height: ws*20,
    resizeMode: 'contain'
  },
  itemImage: {
    width: ws*50,
    height: ws*50,
    marginRight: ws*12,
    borderRadius: 8
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontWeight: 'bold'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemPrice: {
    fontWeight: 'bold'
  },
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: ws*12
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ws*8
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: ws*8
  },
  totalText: {
    fontWeight: 'bold'
  },
  orderButton: {
    backgroundColor: '#70B9BE',
    padding: ws*16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: ws*16
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Cart;