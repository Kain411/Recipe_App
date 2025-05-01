import {useContext, useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import FoodComponent from '../components/FoodComponent';
import axios from 'axios';
import {HostURL} from '../services/Host';
import {SelectList} from 'react-native-dropdown-select-list';
import { RecipeContext } from '../context/RecipeContext';

const ws = Dimensions.get('screen').width / 440;

const Foods = () => {
  const navigation = useNavigation();
  const {userLogin} = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [modeFoods, setModeFoods] = useState([]);

  const [foods, setFoods] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${HostURL}/recipes`);
      setFoods(response.data.recipes);
      setFilteredFoods(response.data.recipes);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error.message);
    }
  };

  // Gọi API khi component load
  useEffect(() => {
    getRecipes();
  }, []);

  const { handleSaveRecipe } = useContext(RecipeContext)
  useEffect(() => {
    handleSaveRecipe(foods)
  }, [foods])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredFoods(foods); // Nếu ô tìm kiếm trống, hiển thị tất cả món ăn
      return;
    }

    const results = [];

    for (const food of foods) {
      if (food.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push(food);
        continue;
      }

      for (const recipe_ingredient of food.recipe_ingredients) {
        if (
          recipe_ingredient.ingredient.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          results.push(food);
          continue;
        }
      }
    }

    setFilteredFoods(results);
  };

  const dataMode = ['normal', 'gym', 'ondiet'];

  useEffect(() => {
    if (modeFoods == []) setFilteredFoods(foods);
    if (modeFoods) {
      const results = foods.filter(food => food.mode === modeFoods); // hoặc điều kiện phù hợp với cấu trúc dữ liệu của bạn
      setFilteredFoods(results);
    } else {
      setFilteredFoods(foods);
    }
  }, [modeFoods]);

  const [choose, setChoose] = useState(false);
  const [ingredientOndiet, setIngredientOndiet] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState('');
  const handleSearchIngredient = () => {
    setIngredientOndiet(prev => [...prev, searchIngredient]);
  };
  const handleOndiet = () => {
    const result = [];
    for (const food of foods) {
      let check = true;
      for (const ingredient of food.recipe_ingredients) {
        for (const ondiet of ingredientOndiet) {
          if (ingredient.ingredient.name.includes(ondiet)) {
            check = false;
            break;
          }
        }
      }
      if (check) {
        result.push(food);
      }
    }
    setChoose(false);
    setFilteredFoods(result);
  };

  return (
    <ScrollView
      style={styles.foods_container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.app_name}>Foods</Text>
      <View style={[styles.center_y, styles.foods_user_tool]}>
        <TouchableOpacity
          style={styles.center_y}
          onPress={() => navigation.navigate('UserDetails', {user: userLogin})}>
          <Image source={{uri: userLogin.url}} style={styles.foods_user_img} />
          <Text style={styles.foods_user_name}>{userLogin.username}</Text>
        </TouchableOpacity>
        <View style={styles.center_y}>
          <TouchableOpacity style={[styles.center, styles.foods_tool_btn]}>
            <Image
              source={require('../assets/images/Bell.png')}
              style={styles.foods_tool_icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.center, styles.foods_tool_btn]} onPress={() => navigation.navigate("Cart")}>
            <Image
              source={require('../assets/images/Cart.png')}
              style={styles.foods_tool_icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thanh tim kiem mon an  */}
      <View style={styles.search_container}>
        <TextInput
          style={styles.search_input}
          placeholder="Nhập tên món ăn..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.search_button} onPress={handleSearch}>
          <Image
            source={require('../assets/images/Search.png')}
            style={styles.search_icon}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.center_y, styles.between]}>
        <SelectList
          data={dataMode}
          setSelected={setModeFoods}
          placeholder="Mode"
          boxStyles={styles.recipe_mode_box}
          dropdownStyles={styles.recipe_mode_dropdown}
          modalDropdown={true}
        />
        <TouchableOpacity
          style={[styles.recipe_mode_btn, styles.center]}
          onPress={() => setChoose(true)}>
          <Text style={{color: 'white'}}>Kiêng</Text>
        </TouchableOpacity>
      </View>

      {/* Sap xep va bo loc  */}
      <View style={styles.food_list}>
        {Array.isArray(filteredFoods) &&
          filteredFoods.map((food, index) => (
            <FoodComponent key={index} food={food} />
          ))}
      </View>

      {choose && (
        <View style={[styles.recipe_choose, styles.center]}>
          <View style={[styles.recipe_choose_main, styles.center_x]}>
            <View style={styles.search_container}>
              <TextInput
                style={styles.search_input}
                placeholder="Nhập tên nguyên liệu..."
                value={searchIngredient}
                onChangeText={text => setSearchIngredient(text)}
              />
              <TouchableOpacity
                style={styles.search_button}
                onPress={handleSearchIngredient}>
                <Image
                  source={require('../assets/images/Search.png')}
                  style={styles.search_icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.recipe_choose_list}>
              {ingredientOndiet.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[styles.center_y, styles.recipe_choose_list_one]}>
                    <Image
                      source={require('../assets/images/Arrow.png')}
                      style={styles.recipe_choose_icon}
                    />
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
            <View style={{flexDirection: 'row', gap: 50}}>
              <TouchableOpacity
                style={[styles.recipe_mode_btn, styles.center]}
                onPress={handleOndiet}>
                <Text style={{color: 'white'}}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.recipe_mode_btn, styles.center]}
                onPress={() => setChoose(false)}>
                <Text style={{color: 'white'}}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Foods;

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center_x: {
    display: 'flex',
    alignItems: 'center',
  },
  center_y: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
    marginBottom: ws * 20,
  },
  foods_container: {
    flex: 1,
    paddingTop: ws * 10,
    paddingHorizontal: ws * 30,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  app_name: {
    fontSize: 25,
    color: '#307F85',
    fontWeight: 'bold',
  },
  foods_user_tool: {
    marginVertical: ws * 20,
    justifyContent: 'space-between',
  },
  foods_user_img: {
    width: ws * 45,
    height: ws * 45,
    borderRadius: ws * 50,
    objectFit: 'cover',
  },
  foods_user_name: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: ws * 20,
  },
  foods_tool_btn: {
    width: ws * 45,
    height: ws * 45,
    marginLeft: ws * 15,
    borderRadius: ws * 40,
    backgroundColor: '#F5F5F5',
  },
  foods_tool_icon: {
    width: ws * 18,
    height: ws * 18,
  },
  search_container: {
    width: ws * 380,
    height: ws * 50,
    position: 'relative',
    marginBottom: ws * 20,
  },
  search_input: {
    flex: 1,
    borderWidth: 1,
    padding: ws * 10,
    borderRadius: ws * 5,
    marginRight: ws * 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: ws * 50,
    paddingLeft: 20,
  },
  search_button: {
    width: ws * 50,
    height: ws * 50,
    borderRadius: ws * 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 10,
  },
  search_icon: {
    width: ws * 18,
    height: ws * 18,
    objectFit: 'contain',
  },
  food_list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ws*15,
  },
  recipe_mode_btn: {
    width: ws * 70,
    height: ws * 45,
    backgroundColor: '#70B9BE',
    borderRadius: 10,
    // color: 'white',
  },
  recipe_choose: {
    width: ws * 440,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: -ws * 10,
    left: -ws * 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99,
  },
  recipe_choose_main: {
    width: ws * 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: ws * 10,
    paddingHorizontal: ws * 20,
  },
  recipe_choose_list: {
    marginVertical: ws * 20,
  },
  recipe_choose_icon: {
    width: ws * 15,
    height: ws * 15,
    objectFit: 'contain',
    marginRight: ws * 10,
  },
  recipe_choose_list_one: {
    marginBottom: ws * 15,
  },
});
