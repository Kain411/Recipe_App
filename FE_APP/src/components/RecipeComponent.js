import { useState } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ws = Dimensions.get('screen').width / 440


const RecipeComponent = () => {

    const [favorite, setFavorite] = useState(false)

    const handleClickFavorite = (event) => {
        event.stopPropagation()
        setFavorite(!favorite)
    }

    return (
        <ImageBackground source={require("../assets/images/food.jpg")} style={styles.recipeComponent_bg} resizeMode="cover" imageStyle={{ borderRadius: 15 }}>
            <TouchableOpacity style={styles.recipeComponent_container}>
                <TouchableOpacity 
                    style={[styles.center, styles.recipeComponent_btn_favorite]}
                    onPress={handleClickFavorite}
                >
                    <Image source={require("../assets/images/Heart.png")} style={{...styles.recipeComponent_icon_heart, tintColor: favorite ? '#D9D9D9' : '#FFC7ED'}} />
                </TouchableOpacity>
                <View style={styles.recipeComponent_recipe_user}>
                    <Text style={styles.recipeComponent_recipe_name}>Nem nướng Nha Trang</Text>
                    <Text style={styles.recipeComponent_user_name}>Bởi: Enami Asa</Text>
                </View>
                <View style={[styles.center_y, styles.recipeComponent_time]}>
                    <Image source={require("../assets/images/Hourglass.png")} style={styles.recipeComponent_icon_hourglass} />
                    <Text style={styles.recipeComponent_time_info}>20 phút</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default RecipeComponent;

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_y: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    recipeComponent_bg: {
        width: ws*380,
        height: ws*200,
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: ws*20,
    },
    recipeComponent_container: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        position: 'relative',
    },
    recipeComponent_btn_favorite: {
        width: ws*35,
        height: ws*35,
        borderRadius: ws*35,
        backgroundColor: '#ffffff',
        position: 'absolute',
        top: ws*10,
        right: ws*10,
    },
    recipeComponent_icon_heart: {
        width: ws*15,
        height: ws*15,
        objectFit: 'contain',
    },
    recipeComponent_recipe_user: {
        width: '60%',
        position: 'absolute',
        left: ws*20,
        bottom: ws*20,
    },
    recipeComponent_recipe_name: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    recipeComponent_user_name: {
        fontSize: 15,
        color: '#ffffff',
        fontStyle: 'italic',
    },
    recipeComponent_time: {
        position: 'absolute',
        right: ws*20,
        bottom: ws*20,
    },
    recipeComponent_icon_hourglass: {
        tintColor: '#ffffff',
        width: ws*15,
        height: ws*20,
    },
    recipeComponent_time_info: {
        fontSize: 18,
        color: '#ffffff',
        marginLeft: 10,
        fontWeight: '500',
    },
})