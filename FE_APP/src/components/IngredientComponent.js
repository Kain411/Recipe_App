import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {HostURL} from '../services/Host';
import { AuthContext } from '../context/AuthContext';

const IngredientComponent = ({ingredients, foodID}) => {
  const {userLogin} = useContext(AuthContext);

  const [quantities, setQuantities] = useState(
    ingredients.reduce((acc, item) => ({...acc, [item.id]: item.quantity}), {}),
  );

  const updateQuantity = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: isNaN(Number(value)) ? 1 : Number(value),
    }));
  };

  const increaseQuantity = id => {
    setQuantities(prev => ({...prev, [id]: prev[id] + 1}));
  };

  const decreaseQuantity = id => {
    setQuantities(prev => ({...prev, [id]: Math.max(prev[id] - 1, 1)}));
  };

  const handleAddToCart = async () => {
    const payload = {
      recipeId: foodID,
      ingredients: Object.entries(quantities).map(([id, quantity]) => ({
        ingredientId: id,
        quantity,
      })),
    };

    try {
      const response = await axios.post(
        `${HostURL}/cart/${userLogin.id}/add-recipe-to-cart`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Thêm vào giỏ thành công:', response.data);
      // Thêm alert hoặc toast nếu bạn muốn
    } catch (error) {
      console.error(
        'Lỗi khi gửi dữ liệu:',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nguyên liệu</Text>
      <Text style={styles.subtitle}>{ingredients.length} sản phẩm</Text>

      {/* Danh sách nguyên liệu */}
      <View>
        {ingredients.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{uri: item.ingredient.url}} style={styles.image} />
            <Text style={styles.name}>{item.ingredient.name}</Text>

            {/* Bộ đếm số lượng */}
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id)}
                style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantity}
                value={quantities[item.id].quantity}
                onChangeText={text => updateQuantity(item.id, text)}
                keyboardType="numeric">
                {quantities[item.id]}
              </TextInput>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id)}
                style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Nút thêm vào giỏ hàng */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#70B9BE',
  },
  buttonText: {
    fontSize: 20,
    color: '#70B9BE',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#70B9BE',
    borderRadius: 10,
    width: 40,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#70B9BE',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IngredientComponent;
