import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const ws = Dimensions.get('screen').width / 440;

const FoodComponent = ({food}) => {
  const navigation = useNavigation();

  console.log(food);

  const {userLogin} = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={styles.food_component_container}
      onPress={() => navigation.navigate('FoodDetail', {food})}>
      <ImageBackground
        source={{uri: food.thumbnail}}
        style={styles.food_component_image}>
        <TouchableOpacity style={styles.food_component_favorite}>
          <Image
            source={require('../assets/images/Blue_Heart.png')}
            style={styles.food_favorite_heart_icon}
          />
        </TouchableOpacity>
      </ImageBackground>

      <Text style={styles.food_name}>{food.name}</Text>
      <TouchableOpacity
        style={styles.creator_container}
        onPress={() => navigation.navigate('UserDetails', {user: food.user})}>
        <Image
          source={{uri: food.user.url}}
          style={styles.creator_image}></Image>
        <Text style={styles.creator_name}>{food.user.username}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FoodComponent;

const styles = StyleSheet.create({
  food_component_container: {
    backgroundColor: 'white',
    width: ws * 180,
    height: ws * 230,
    padding: ws * 15,
    borderRadius: ws * 20,
    elevation: 15,
    position: 'relative',
  },
  food_component_image: {
    width: '100%',
    height: ws * 100,
    objectFit: 'cover',
    position: 'relative',
    borderRadius: ws * 20,
  },
  food_component_favorite: {
    backgroundColor: 'white',
    width: ws * 30,
    height: ws * 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ws * 10,
    position: 'absolute',
    top: ws * 10,
    right: ws * 10,
  },
  food_favorite_heart_icon: {
    height: ws * 22,
    width: ws * 22,
    objectFit: 'contain',
  },
  food_name: {
    marginTop: ws * 20,
    fontSize: 18,
    fontWeight: '500',
  },
  creator_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: ws * 20,
    bottom: ws * 15,
  },
  creator_image: {
    width: ws * 30,
    height: ws * 30,
    borderRadius: ws * 30,
    objectFit: 'cover',
  },
  creator_name: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
