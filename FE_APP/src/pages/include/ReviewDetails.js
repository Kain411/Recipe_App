import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import RecipeComment from "./RecipeComment";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ReviewContext } from "../../context/ReviewContext";

const ws = Dimensions.get('screen').width / 440

const ReviewDetails = () => {

    const navigation = useNavigation()
    const { userLogin } = useContext(AuthContext)
    const { handleGetAllReviewByRecipeID, handlePostNewReview } = useContext(ReviewContext)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [ratingTemp, setRatingTemp] = useState(0)
    const [display, setDisplay] = useState(false)

    const [recipe, setRecipe] = useState({
        id: "zlMS2uqX3afEbfDeg8Gt"
    })

    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        const getReviews = async () => {
            const reviewsRef = await handleGetAllReviewByRecipeID(recipe.id)
            console.log(reviewsRef)
            setReviews(reviewsRef.reviews)
        }
        getReviews()
    }, [handleSubmit])

    const handleSubmit = async () => {
        const result = await handlePostNewReview(userLogin, recipe, comment, rating)
        Alert.alert("Cảnh báo", result.message)
        setRating(0)
        setComment("")
    }

    return (
        <View style={styles.recipe_container}>
            <ScrollView style={styles.recipe_body}>
                <RecipeComment reviews={reviews} />
            </ScrollView>
            <View style={styles.recipe_evaluated}>
                <View style={styles.center_y}>
                    <Text style={styles.recipe_details_user_comment}>Đánh giá</Text>
                    <TouchableOpacity style={styles.center_y} onPress={() => setDisplay(true)}>
                        {
                            Array.from({length: rating}, (_, i) => {
                                return <Image key={i} source={require('../../assets/images/Star_Checked.png')} style={styles.recipe_comment_evaluate_star} />
                            })
                        }
                        {
                            Array.from({length: 5-rating}, (_, i) => {
                                return <Image key={i} source={require("../../assets/images/Star_Unchecked.png")} style={styles.recipe_comment_evaluate_star} />
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
                                Array.from({length: ratingTemp}, (_, i) => {
                                    return (
                                        <TouchableOpacity key={i} onPress={() => setRatingTemp(i+1)} >
                                            <Image source={require('../../assets/images/Star_Checked.png')} style={styles.recipe_details_evaluate_star} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            {
                                Array.from({length: 5-ratingTemp}, (_, i) => {
                                    return (
                                        <TouchableOpacity key={i} onPress={() => setRatingTemp(ratingTemp+i+1)} >
                                            <Image source={require('../../assets/images/Star_Unchecked.png')} style={styles.recipe_details_evaluate_star} />
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
                                <Text style={{...styles.recipe_details_star_tool_content, color: 'red'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default ReviewDetails;

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_y: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    recipe_container: {
        flex: 1,
        paddingHorizontal: ws*30,
        backgroundColor: '#ffffff',
        position: 'relative'
    },
    recipe_body: {

    },
    recipe_evaluated: {
        width: ws*440,
        paddingVertical: ws*10,
        paddingHorizontal: ws*30,
        borderTopWidth: 1,
        borderColor: '#307F85',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    recipe_details_user_comment: {
        fontSize: ws*18,
        fontWeight: '500',
        marginVertical: ws*10,
        marginRight: ws*10
    },
    recipe_comment_evaluate_star: {
        width: ws*16,
        height: ws*16,
        marginLeft: ws*3,
    },
    recipe_details_review: {
        width: ws*380,
        height: ws*55,
        backgroundColor: '#D9D9D9',
        position: 'relative',
        borderRadius: 15,
    },
    recipe_details_review_input: {
        flex: 1,
        color: '#000000',
        paddingLeft: ws*20,
        borderRadius: 15,
    },
    recipe_details_btn: {
        width: ws*100,
        height: ws*55,
        backgroundColor: '#307F85',
        borderRadius: 15
    },
    recipe_details_btn_content: {
        color: '#ffffff',
        fontSize: 18,
    },
    recipe_details_star: {
        position: 'absolute',
        top: -ws*50,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        width: ws*440,
        height: Dimensions.get('screen').height,
    },
    recipe_details_star_check: {
        width: ws*340,
        backgroundColor: '#ffffff',
        paddingVertical: ws*20,
        borderRadius: 15,
    },
    recipe_details_star_title: {
        fontSize: ws*18,
        fontWeight: '500'
    },
    recipe_details_star_btn: {
        marginTop: ws*20,
        justifyContent: 'space-between',
        width: ws*200,
    },
    recipe_details_evaluate_star: {
        width: ws*30,
        height: ws*30,
        objectFit: 'contain'
    },
    recipe_details_star_tool: {
        width: ws*250,
        justifyContent: 'space-between',
        marginTop: ws*25,
    },
    recipe_details_star_tool_btn: {
        width: ws*60,
        height: ws*30,
    },
    recipe_details_star_tool_content: {
        fontSize: 16,
    },
})