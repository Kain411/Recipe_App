import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView, Dimensions, TextInput
} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { HostURL } from "../services/Host"
const ws = Dimensions.get("screen").width / 440;

const Cart = ({ navigation }) => {
  // Checkbox images
  const checkedBoxImage = require('../assets/images/Checkbox_Checked.png');
  const uncheckedBoxImage = require('../assets/images/Checkbox_UnChecked.png');
  const API_URL = `${HostURL}/cart`

  const { userLogin } = useContext(AuthContext)
  const [items, setItems] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log(`${API_URL}/${userLogin.userId}`)
        const response = await fetch(`${API_URL}/${userLogin.id}`);
        const data = await response.json();

        if (data.success) {
          // Map lại dữ liệu cartIngredients -> items
          const formattedItems = data.cart.cartIngredients.map((item) => ({
            cartIngredientId: item.id,
            ingredientId: item.ingredientId,
            name: item.name,
            quantity: item.quantity,
            price: item.price, // Giá của từng đơn vị
            unit: item.unit,
            image: item.url,
            checked: false
          }));

          // Map lại dữ liệu recipes -> dishes
          const formattedDishes = data.cart.recipes.map((recipe, index) => ({
            cartId: data.cart.id,
            id: recipe.id,
            name: recipe.name || `Món ăn ${index + 1}`,
            checked: false,
            image: getYoutubeThumbnail(recipe.url),
            items: recipe.ingredients.map((ingredient, idx) => ({
              cartRecipeId: ingredient.cart_recipe_id,
              ingredientId: ingredient.ingredientId,
              name: ingredient.name,
              quantity: ingredient.quantity,
              price: ingredient.price,
              unit: ingredient.unit,
              image: ingredient.url,
              checked: false
            }))
          }));

          console.log(formattedItems)
          setItems(formattedItems);
          setDishes(formattedDishes);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchCart();
  }, [userLogin.id]);

  const getYoutubeThumbnail = (url) => {
    if (!url.includes("youtube.com/watch?v=")) return null;

    const youtubeId = url.split("v=")[1]?.split("&")[0]; // Cắt thêm để loại bỏ các tham số sau ID nếu có
    if (!youtubeId) return null;

    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  };

  const handleIngredientDelete = async (cartIngredientId) => {
    try {
      const prevItems = [...items];
      setItems(prevItems.filter(item => item.cartIngredientId !== cartIngredientId));
      console.log(`${API_URL}/${userLogin.id}/${cartIngredientId}`)

      const response = await fetch(
        `${API_URL}/${userLogin.id}/${cartIngredientId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(data.message);
        // setItems(prevList => prevList.filter(item => item.id !== cartIngredientId));
      } else {
        Alert.alert("Thông báo", data.message || "Xóa thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa nguyên liệu!");
    }
  };

  const handleCartRecipeDelete = async (cartRecipeId) => {
    try {
      const prevDishes = [...prevDishes];
      // setDishes(prevDishes.items.filter(item => item.cartRecipeId !== cartRecipeId));
      console.log(`${API_URL}/${userLogin.id}/cart-recipe/${cartRecipeId}`)
      setDishes(prevDishes =>
        prevDishes.filter(dish =>
          !dish.items.find(item => item.cartRecipeId === cartRecipeId)
        )
      );

      const response = await fetch(
        `${API_URL}/${userLogin.id}/cart-recipe/${cartRecipeId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(data.message);
      } else {
        Alert.alert("Thông báo", data.message || "Xóa thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa nguyên liệu!");
    }
  };

  const handleRecipeDelete = async (recipeId, cartId) => {
    try {
      // Xoá món ăn ra khỏi state
      setDishes(prevDishes => prevDishes.filter(dish => dish.id !== recipeId));

      // Gọi API backend để xoá trên Firestore hoặc Database
      console.log(`${API_URL}/${userLogin.id}/delete/${recipeId}`)
      const response = await fetch(`${API_URL}/${userLogin.id}/delete/${recipeId}/${cartId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!data.success) {
        Alert.alert("Thông báo", data.message || "Xoá món ăn không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xoá món ăn:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xoá món ăn!");
    }
  };



  const calculateTotal = () => {
    const productTotal = [...items, ...dishes.flatMap(dish => dish.items)]
      .filter(item => item.checked) // Chỉ tính những món đã chọn
      .reduce((sum, item) => sum + item.price, 0);
    return {
      productTotal: productTotal.toFixed(1),
      totalPayment: productTotal.toFixed(1)
    };
  };
  const updateQuantity = async (id, newQuantity, type) => {
    if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
      alert('Số lượng không hợp lệ! Vui lòng nhập số nguyên dương.');
      return;
    }
    if (type === 'item') {
      setItems(prevItems =>
        prevItems.map(item =>
          item.cartIngredientId === id ? { ...item, quantity: newQuantity, price: item.price * newQuantity / item.quantity } : item
        )
      );
      try {
        const response = await fetch(`${API_URL}/update-cart-ingredient/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, quantity: newQuantity })
        });

        const data = await response.json();
        if (!data.success) {
          console.error('Lỗi cập nhật số lượng:', data.message);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API cập nhật:', error);
      }
    } else if (type === 'dish') {
      setDishes(prevDishes =>
        prevDishes.map(dish => ({
          ...dish,
          items: dish.items.map(item =>
            item.cartRecipeId === id ? { ...item, quantity: newQuantity, price: item.price * newQuantity / item.quantity } : item
          )
        }))
      );
      try {
        const response = await fetch(`${API_URL}/update-cart-recipe/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, quantity: newQuantity })
        });

        const data = await response.json();
        if (!data.success) {
          console.error('Lỗi cập nhật số lượng:', data.message);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API cập nhật:', error);
      }
    }
  };
  const toggleItemCheck = (id, type) => {
    if (type === 'item') {
      setItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.cartIngredientId === id ? { ...item, checked: !item.checked } : item
        );
        updateSelectedItems(updatedItems, dishes);
        return updatedItems;
      });
    } else if (type === 'dish') {
      setDishes(prevDishes => {
        const updatedDishes = prevDishes.map(dish => {
          if (dish.id === id) {
            const newCheckedState = !dish.checked;
            return {
              ...dish,
              checked: newCheckedState,
              items: dish.items.map(item => ({
                ...item,
                checked: newCheckedState
              }))
            };
          }
          return dish;
        });
        updateSelectedItems(items, updatedDishes);
        return updatedDishes;
      });
    } else if (type === 'dish-item') {
      setDishes(prevDishes => {
        const updatedDishes = prevDishes.map(dish => {
          const updatedItems = dish.items.map(item => {
            if (item.cartRecipeId === id) {
              return { ...item, checked: !item.checked };
            }
            return item;
          });

          const allChecked = updatedItems.length > 0 && updatedItems.every(item => item.checked);

          return {
            ...dish,
            checked: allChecked,
            items: updatedItems
          };
        });
        updateSelectedItems(items, updatedDishes);
        return updatedDishes;
      });
    }
  };

  // Hàm dùng chung để cập nhật lại selectedItems
  const updateSelectedItems = (currentItems, currentDishes) => {
    const selectedFromItems = currentItems.filter(item => item.checked);
    const selectedFromDishes = currentDishes.flatMap(dish =>
      dish.items.filter(item => item.checked)
    );

    setSelectedItems([...selectedFromItems, ...selectedFromDishes]);
  };



  const QuantityInput = ({ id, unit, quantity, type, onUpdate }) => {
    const [tempValue, setTempValue] = useState(String(quantity));

    const handleBlur = () => {
      const value = Number(tempValue);
      if (!Number.isInteger(value) || value <= 0 || value > 5000) {
        alert('Số lượng không hợp lệ! Vui lòng nhập lại.');
        setTempValue(String(quantity)); // reset lại giá trị ban đầu nếu không hợp lệ
      } else {
        onUpdate(id, value, type);
      }
    };

    return (
      <View style={styles.quantityContainer}>
        <TextInput
          style={[
            styles.quantityInput,
            { width: Math.max(40, tempValue.length * 12) } // đơn giản: mỗi ký tự ~12px
          ]}
          value={tempValue}
          keyboardType="numeric"
          onChangeText={setTempValue}
          onBlur={handleBlur}
        />
        <Text style={styles.unitText}>{unit}</Text>
      </View>
    );
  };
  const renderProductSection = (title, data, type) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map(item => (
        <View key={item.cartIngredientId} style={styles.itemRow}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleItemCheck(item.cartIngredientId, type)}
          >
            <Image
              source={item.checked ? checkedBoxImage : uncheckedBoxImage}
              style={styles.checkbox}
            />
          </TouchableOpacity>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.quantityContainer}>

              <QuantityInput
                id={item.cartIngredientId}
                unit={item.unit}
                quantity={item.quantity}
                type="item"
                onUpdate={updateQuantity}
              />
            </View>
          </View>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <TouchableOpacity onPress={() => handleIngredientDelete(item.cartIngredientId)}>
            <Image source={require("../assets/images/delete.png")} style={styles.deleteIcon} />
          </TouchableOpacity>

        </View>
      ))}
    </View>
  );

  const renderDishesSection = (title, data) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map(dish => (
        <View key={dish.id} >
          <View style={styles.dishContainer}>
            <View style={styles.dishLeft}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleItemCheck(dish.id, 'dish')}
              >
                <Image
                  source={dish.checked ? checkedBoxImage : uncheckedBoxImage}
                  style={styles.checkbox}
                />
              </TouchableOpacity>
              <Image source={{ uri: dish.image }} style={styles.dishImage} />
              <Text style={styles.dishName}>{dish.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRecipeDelete(dish.id, dish.cartId)}>
              <Image source={require("../assets/images/delete.png")} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
          {dish.items.map(item => (
            <View key={item.cartRecipeId} style={styles.itemRow}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleItemCheck(item.cartRecipeId, 'dish-item')}
              >
                <Image
                  source={item.checked ? checkedBoxImage : uncheckedBoxImage}
                  style={styles.checkbox}
                />
              </TouchableOpacity>
              <Image source={{ uri: item.image }} style={styles.itemDishImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <QuantityInput
                  id={item.cartRecipeId}
                  unit={item.unit}
                  quantity={item.quantity}
                  type="dish"
                  onUpdate={updateQuantity}
                />
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <TouchableOpacity onPress={() => handleCartRecipeDelete(item.cartRecipeId)}>
                <Image source={require("../assets/images/delete.png")} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const total = calculateTotal();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/images/Arrow.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      <View style={styles.content}>

      {renderProductSection('Cá Nhân', items, 'item')}
      {/* {renderDishesSection('Món ăn', dishes.flatMap(dish => dish.items), 'dish')} */}

      {renderDishesSection('Món ăn', dishes)}

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text>Tổng tiền sản phẩm</Text>
          <Text>{total.productTotal}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Tạm Tính</Text>
          <Text style={styles.totalText}>{total.totalPayment}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate("OrderConfirm", { userId: userLogin.id, selectedItems: selectedItems })}>
        <Text style={styles.orderButtonText}>Đặt hàng</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content:{
    paddingHorizontal: ws*16
  },
  header: {
    height: ws * 60,
    backgroundColor: '#70B9BE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ws * 18
  },
  backButton: {
    width: ws * 60,
    height: ws * 60,
    borderRadius: ws * 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: ws * 15,
  },
  backIcon: {
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sectionContainer: {
    marginBottom: ws * 16,
    backgroundColor: '#f9f9f9',
    borderRadius: ws * 8,
    padding: ws * 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: ws * 8
  },

  dishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 8,
    paddingTop: ws * 8,
    paddingBottom: ws * 8,
    borderBottomWidth: ws * 1,
    borderBottomColor: '#ddd',

  },

  dishLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dishImage: {
    width: ws * 50,
    height: ws * 50,
    borderRadius: ws * 5,
    marginRight: ws * 10,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ws * 8,
    paddingVertical: ws * 8,
    borderBottomWidth: ws * 1,
    borderBottomColor: '#eee'
  },
  checkboxContainer: {
    marginRight: ws * 12
  },
  checkbox: {
    width: ws * 20,
    height: ws * 20,
    resizeMode: 'contain'
  },
  itemImage: {
    width: ws * 50,
    height: ws * 50,
    marginRight: ws * 12,
    borderRadius: ws * 8
  },
  itemDishImage: {
    width: ws * 40,
    height: ws * 40,
    marginRight: ws * 12,
    borderRadius: ws * 8
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontWeight: 'bold'
  },
  quantityInput: {
    textAlign: "left",
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemPrice: {
    fontWeight: 'bold'
  },
  deleteIcon: {
    width: ws * 15,
    height: ws * 15,
    tintColor: 'red', // hoặc bỏ nếu ảnh có sẵn màu
    marginLeft: ws * 10,
  },
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: ws * 8,
    padding: ws * 12
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ws * 8
  },
  totalRow: {
    borderTopWidth: ws * 1,
    borderTopColor: '#ddd',
    paddingTop: ws * 8
  },
  totalText: {
    fontWeight: 'bold'
  },
  orderButton: {
    backgroundColor: '#70B9BE',
    padding: ws * 16,
    borderRadius: ws * 8,
    alignItems: 'center',
    marginTop: ws * 16,
    marginBottom: ws * 30
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Cart;