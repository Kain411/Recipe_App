import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PostContext } from "../context/PostContext";
import PostComponent from "../components/PostComponent";
import RecipeComponent from "../components/RecipeComponent";
import { FavoriteContext } from "../context/FavoriteContext";
import { AuthContext } from "../context/AuthContext";
import { RecipeContext } from "../context/RecipeContext";

const ws = Dimensions.get('screen').width / 440

const Favorite = () => {

    const navigation = useNavigation()

    const [choose, setChoose] = useState("Post")
    const [postIDs, setPostIDs] = useState([])
    const [recipeIDs, setRecipeIDs] = useState([])

    const { userLogin } = useContext(AuthContext)
    const { posts } = useContext(PostContext)
    const { recipes } = useContext(RecipeContext)
    const { handleGetFavoriteByUserID } = useContext(FavoriteContext)

    useEffect(() => {
        const getFavorite = async () => {
            const resultPost = await handleGetFavoriteByUserID(userLogin.id, "Post")
            const resultRecipe = await handleGetFavoriteByUserID(userLogin.id, "Recipe")

            setPostIDs(resultPost.itemIDs)
            setRecipeIDs(resultRecipe.itemIDs)
        }
        getFavorite()
    }, [])

    return (
        <View style={styles.favorite_container}>
            <View style={[styles.center, styles.favorite_header]}>
                <TouchableOpacity 
                    style={[styles.center, styles.favorite_btn_back]}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require("../assets/images/Arrow.png")} style={styles.favorite_icon_back} />
                </TouchableOpacity>
                <Text style={styles.favorite_header_title}>Yêu thích</Text>
            </View>

            <ScrollView style={styles.favorite_body}>
                {
                    choose=="Post" && posts.map((post, index) => {
                        if (postIDs.includes(post.id)) {
                            return (
                                <PostComponent key={index} post={post} content={"Details"} />
                            )
                        }
                    }) 
                }
                {
                    choose=="Recipe" && recipes.map((recipe, index) => {
                        if (recipeIDs.includes(recipe.id)) {
                            return <RecipeComponent key={index} recipe={recipe} />
                        }
                    })
                }
            </ScrollView>

            <View style={[styles.center_y, styles.favorite_footer]}>
                <TouchableOpacity 
                    onPress={() => setChoose("Post")}
                    style={{
                        ...styles.center, 
                        ...styles.favorite_footer_btn, 
                        backgroundColor: choose=="Post" ? '#70B9BE' : '#D9D9D9',
                        borderTopLeftRadius: ws*20
                    }}
                >
                    <Text style={{...styles.favorite_footer_content, color: choose=="Post" ? '#ffffff' : '#000000'}}>Bài đăng</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setChoose("Recipe")}
                    style={{
                        ...styles.center, 
                        ...styles.favorite_footer_btn, 
                        backgroundColor: choose=="Recipe" ? '#70B9BE': '#D9D9D9',
                        borderTopRightRadius: ws*20
                    }}
                >
                    <Text style={{...styles.favorite_footer_content, color: choose=="Recipe" ? '#ffffff' : '#000000'}}>Công thức</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Favorite;

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
    favorite_container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    favorite_header: {
        width: ws*440,
        height: ws*60,
        backgroundColor: '#70B9BE',
    },
    favorite_btn_back: {
        width: ws*60,
        height: ws*60,
        borderRadius: ws*60,
        position: 'absolute',
        top: 0,
        left: ws*20,
    },
    favorite_icon_back: {
        tintColor: '#000000',
    },
    favorite_header_title: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '500',
    },

    favorite_body: {
        flex: 1,
        paddingTop: ws*20,
        paddingHorizontal: ws*30,
    },

    favorite_footer: {
        width: ws*440,
        height: ws*80,
    },
    favorite_footer_btn: {
        width: '50%',
        height: '100%'
    },
    favorite_footer_content: {
        fontSize: 18,
        fontWeight: '500',
    }
})