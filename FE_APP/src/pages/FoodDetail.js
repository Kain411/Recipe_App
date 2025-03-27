import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  // Share
} from 'react-native';
import ReviewDetails from './include/ReviewDetails';
import RecipeComment from './include/RecipeComment';
import { ReviewContext } from '../context/ReviewContext';
import { AuthContext } from "../context/AuthContext";
import Share from 'react-native-share';
import Mailer from "react-native-mail"
import RNFS from 'react-native-fs';
// import Ingredient from '../components/Ingredient';
// import Instruction from '../components/Instruction';

const ws = Dimensions.get('screen').width / 440;

const FoodDetail = ({ route }) => {
  // const {food} = route.params;
  const navigation = useNavigation()
  const { userLogin } = useContext(AuthContext)
  const { reviews, handleGetAllReviewByRecipeID, handlePostNewReview } = useContext(ReviewContext)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [ratingTemp, setRatingTemp] = useState(0)
  const [display, setDisplay] = useState(false)

  const [recipe, setRecipe] = useState({
    id: "zlMS2uqX3afEbfDeg8Gt"
  })

  useEffect(() => {
    const getReviews = async () => {
      const reviewsRef = await handleGetAllReviewByRecipeID(recipe.id)
      console.log(reviewsRef)
    }
    getReviews()
  }, [handleSubmit])

  const handleSubmit = async () => {
    const result = await handlePostNewReview(userLogin, recipe, comment, rating)
    Alert.alert("Cảnh báo", result.message)
    setRating(0)
    setComment("")
  }


  const [selectedTab, setSelectedTab] = useState('instruction');
  const [option, setOption] = useState(false)

  const [food, setFood] = useState({
    name: "Trung xot ca chua",
    description: "jsvjs",
    carbs: 87,
    url: "https://www.youtube.com/watch?v=kzum5w6AtNQ",
    protein: 90,
    calories: 90,
    fat: 76,
    creator: {
      name: "sknlvs",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.3uHe0VE9RXivI7N0Pb7LRAHaEK&pid=Api&P=0&h=220"
    }
  })

  const onShare = async () => {

    const youtubeId = food.url.split("?v=")[1];
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

    const localFile = `${RNFS.DocumentDirectoryPath}/thumbnail.jpg`;

    try {
      const downloadResult = await RNFS.downloadFile({
        fromUrl: thumbnailUrl,
        toFile: localFile,
      }).promise;

      if (downloadResult.statusCode === 200) {
        await Share.open({
          title: 'Chia sẻ video',
          subject: 'Xem video này!',
          message: `📺 Xem video này trên YouTube: ${youtubeUrl}`,
          urls: [`file://${localFile}`],
        });
        Alert.alert('Thành công', 'Chia sẻ công thức thành công')
      } else {
        Alert.alert('Lỗi', 'Không thể tải ảnh về thiết bị.');
      }
    } catch (error) {
      if (error.message.includes('User did not share')) {
        console.warn('Người dùng đã huỷ chia sẻ.');
      } else {
        console.error('Lỗi khi gửi email:', error);
        Alert.alert('Lỗi', 'Không thể gửi email.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/Arrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setOption(!option)}>
          <Image
            source={require('../assets/images/Option.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Option Share and Favorite */}
      {
        option &&
        <View style={styles.food_detail_option}>
          <TouchableOpacity
            style={[styles.center, styles.center_y, styles.food_detail_option_btn]}
            onPress={onShare}
          >
            <Image source={require("../assets/images/Share.png")} style={styles.food_detail_option_icon} />
            <Text style={styles.food_detail_option_content}>Chia sẻ</Text>
          </TouchableOpacity>
          <View style={styles.food_detail_option_hr}></View>
          <TouchableOpacity style={[styles.center, styles.center_y, styles.food_detail_option_btn]}>
            <Image source={require("../assets/images/Heart.png")} style={styles.food_detail_option_icon} />
            <Text style={styles.food_detail_option_content}>Yêu thích</Text>
          </TouchableOpacity>
        </View>
      }

      {/* Detail */}
      <ScrollView style={styles.food_detail_container}>
        {/* Tên món ăn */}
        <Text style={styles.food_name}>{food.name}</Text>
        <Text style={styles.food_description}>{food.description}</Text>

        {/* Thông tin dinh dưỡng */}

        <View style={styles.nutrition_container}>
          <Text style={styles.nutrition_title}>Thông tin dinh dưỡng</Text>
          <View style={styles.nutrition_item}>
            <Image
              source={require('../assets/images/Carbs.png')}
              style={styles.nutrition_icon}></Image>
            <Text style={styles.nutrition_text}>{food.carbs}g tinh bột</Text>
          </View>
          <View style={styles.nutrition_item}>
            <Image
              source={require('../assets/images/Proteins.png')}
              style={styles.nutrition_icon}></Image>
            <Text style={styles.nutrition_text}>{food.protein}g chất đạm</Text>
          </View>
          <View style={styles.nutrition_item}>
            <Image
              source={require('../assets/images/Calories.png')}
              style={styles.nutrition_icon}></Image>
            <Text style={styles.nutrition_text}>{food.calories}g Kcal</Text>
          </View>
          <View style={styles.nutrition_item}>
            <Image
              source={require('../assets/images/Fats.png')}
              style={styles.nutrition_icon}></Image>
            <Text style={styles.nutrition_text}>{food.fat}g chất béo</Text>
          </View>    
        </View>

        {/* Thanh chọn tab */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'instruction' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('instruction')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'instruction' && styles.activeText,
              ]}>
              Hướng dẫn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'ingredient' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('ingredient')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'ingredient' && styles.activeText,
              ]}>
              Nguyên liệu
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* Nhà sáng tạo */}
        <View style={styles.creatorContainer}>
          <Text style={styles.creatorTitle}>Nhà sáng tạo</Text>
          <View style={styles.infoContainer}>
            <Image
              source={{ uri: food.creator.avatar }}
              style={styles.creator_avatar}
            />
            <View>
              <Text style={styles.creator_name}>{food.creator.name}</Text>
              <Text style={styles.creator_role}>
                Tác giả, Nhà sáng tạo công thức
              </Text>
            </View>
          </View>
        </View>

        {/* Đánh giá */}
        <View style={styles.reviewContainer}></View>
        <RecipeComment reviews={reviews} />
      </ScrollView>
      <View style={styles.recipe_evaluated}>
        <View style={styles.center_y}>
          <Text style={styles.recipe_details_user_comment}>Đánh giá</Text>
          <TouchableOpacity style={styles.center_y} onPress={() => setDisplay(true)}>
            {
              Array.from({ length: rating }, (_, i) => {
                return <Image key={i} source={require('../assets/images/Star_Checked.png')} style={styles.recipe_comment_evaluate_star} />
              })
            }
            {
              Array.from({ length: 5 - rating }, (_, i) => {
                return <Image key={i} source={require("../assets/images/Star_Unchecked.png")} style={styles.recipe_comment_evaluate_star} />
              })
            }
          </TouchableOpacity>
        </View>
        <View style={[styles.center_y, styles.recipe_details_review]}>
          <TextInput
            placeholder="Viết bình luận"
            style={styles.recipe_details_review_input}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            style={[styles.center, styles.recipe_details_btn]}
            onPress={handleSubmit}
          >
            <Text style={styles.recipe_details_btn_content}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        display &&
        <View style={[styles.center, styles.recipe_details_star]} >
          <View style={[styles.center, styles.recipe_details_star_check]}>
            <Text style={styles.recipe_details_star_title}>Mời chọn số sao</Text>
            <View style={[styles.center_y, styles.recipe_details_star_btn]}>
              {
                Array.from({ length: ratingTemp }, (_, i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => setRatingTemp(i + 1)} >
                      <Image source={require('../assets/images/Star_Checked.png')} style={styles.recipe_details_evaluate_star} />
                    </TouchableOpacity>
                  )
                })
              }
              {
                Array.from({ length: 5 - ratingTemp }, (_, i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => setRatingTemp(ratingTemp + i + 1)} >
                      <Image source={require('../assets/images/Star_Unchecked.png')} style={styles.recipe_details_evaluate_star} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <View style={[styles.center_y, styles.recipe_details_star_tool]}>
              <TouchableOpacity
                onPress={() => {
                  setRatingTemp(0)
                  setDisplay(false)
                }}
                style={[styles.center, styles.recipe_details_star_tool_btn]}
              >
                <Text style={styles.recipe_details_star_tool_content}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRating(ratingTemp)
                  setRatingTemp(0)
                  setDisplay(false)
                }}
                style={[styles.center, styles.recipe_details_star_tool_btn]}
              >
                <Text style={{ ...styles.recipe_details_star_tool_content, color: 'red' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </View>
  )
};

export default FoodDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ws * 30,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  header_container: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: ws * 30,
    height: ws * 30,
  },
  icon: {
    width: ws *20,
    height: ws * 20,
    objectFit: 'contain',
  },
  food_detail_container: {
    paddingTop: ws * 10,
    marginBottom: ws * 120
  },
  food_name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  food_description: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    // marginHorizontal: 20,
  },
  nutrition_container: {
    borderRadius: 10,
    // padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  nutrition_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nutrition_item: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutrition_icon: {
    height: ws * 30,
    width: ws * 30,
    borderRadius: 10,
    marginRight: 10,
  },
  nutrition_text: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8EEF2',
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
    // marginHorizontal: 20,
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#002D2E',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  activeText: {
    color: 'white',
  },
  content_container: {
    marginTop: 10,
  },
  separator: {
    width: '90%',
    height: 2,
    alignSelf: 'center',
    backgroundColor: '#EAECEF', // Màu nhạt
    opacity: 0.6, // Làm mờ
    marginVertical: 20,
  },
  creatorContainer: {
    // paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  creatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creator_avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  creator_name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  creator_role: {
    fontSize: 14,
    color: '#69707D',
  },

  //option
  food_detail_option: {
    width: ws * 130,
    position: 'absolute',
    right: ws * 30,
    top: ws * 60,
    borderTopLeftRadius: ws * 15,
    borderBottomLeftRadius: ws * 15,
    borderBottomRightRadius: ws * 15,
    backgroundColor: '#ffffff',
    zIndex: 100,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
  },
  food_detail_option_btn: {
    height: ws * 60,
  },
  food_detail_option_icon: {
    width: ws * 18,
    height: ws * 18,
    marginRight: 10,
    tintColor: '#000000',
  },
  food_detail_option_content: {
    fontSize: 16,
    color: '#000000'
  },
  food_detail_option_hr: {
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
  },

  //comment
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center_y: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipe_evaluated: {
    width: ws * 440,
    height: ws * 120,
    paddingVertical: ws * 10,
    paddingHorizontal: ws * 30,
    borderTopWidth: 1,
    borderColor: '#307F85',
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 99,
  },
  recipe_details_user_comment: {
    fontSize: ws * 18,
    fontWeight: '500',
    marginVertical: ws * 10,
    marginRight: ws * 10
  },
  recipe_comment_evaluate_star: {
    width: ws * 16,
    height: ws * 16,
    marginLeft: ws * 3,
  },
  recipe_details_review: {
    width: ws * 380,
    height: ws * 55,
    backgroundColor: '#D9D9D9',
    position: 'relative',
    borderRadius: 15,
  },
  recipe_details_review_input: {
    flex: 1,
    color: '#000000',
    paddingLeft: ws * 20,
    borderRadius: 15,
  },
  recipe_details_btn: {
    width: ws * 100,
    height: ws * 55,
    backgroundColor: '#307F85',
    borderRadius: 15
  },
  recipe_details_btn_content: {
    color: '#ffffff',
    fontSize: 18,
  },
  recipe_details_star: {
    position: 'absolute',
    top: -ws * 50,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: ws * 440,
    height: Dimensions.get('screen').height,
  },
  recipe_details_star_check: {
    width: ws * 340,
    backgroundColor: '#ffffff',
    paddingVertical: ws * 20,
    borderRadius: 15,
  },
  recipe_details_star_title: {
    fontSize: ws * 18,
    fontWeight: '500'
  },
  recipe_details_star_btn: {
    marginTop: ws * 20,
    justifyContent: 'space-between',
    width: ws * 200,
  },
  recipe_details_evaluate_star: {
    width: ws * 30,
    height: ws * 30,
    objectFit: 'contain'
  },
  recipe_details_star_tool: {
    width: ws * 250,
    justifyContent: 'space-between',
    marginTop: ws * 25,
  },
  recipe_details_star_tool_btn: {
    width: ws * 60,
    height: ws * 30,
  },
  recipe_details_star_tool_content: {
    fontSize: 16,
  },
});
