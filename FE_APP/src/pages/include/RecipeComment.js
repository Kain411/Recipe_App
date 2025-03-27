import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const ws = Dimensions.get('screen').width / 440

const RecipeCommentComponent = ({item}) => {

    return (
        <View style={[styles.center_y, styles.recipe_comment_user]}>
            <Image source={require("../../assets/images/asa.jpg")} style={styles.recipe_comment_user_url} />
            <View>
                <View style={[styles.center_y, styles.recipe_comment_info]}>
                    <Text style={styles.recipe_comment_user_name} numberOfLines={1} ellipsizeMode="tail">Enami Asa</Text>
                    <View style={[styles.center_y, styles.recipe_comment_evaluate]}>
                        {
                            Array.from({length: item.rating}, (_, i) => {
                                return <Image key={i} source={require('../../assets/images/Star_Checked.png')} style={styles.recipe_comment_evaluate_star} />
                            })
                        }
                        {
                            Array.from({length: 5-item.rating}, (_, i) => {
                                return <Image key={i} source={require("../../assets/images/Star_Unchecked.png")} style={styles.recipe_comment_evaluate_star} />
                            })
                        }
                    </View>
                </View>
                <Text style={styles.recipe_comment_content}>{item.comment}</Text>
            </View>
        </View> 
    )
}

const RecipeComment = ({reviews}) => {

    console.log(reviews)

    return (
        <View style={styles.recipe_comment_container}>
            <Text style={styles.recipe_comment_title} >Bình luận đánh giá</Text>
            {
                reviews.map((item, index) => {
                    console.log(item)
                    return <RecipeCommentComponent key={index} item={item} />
                })
            }
        </View>
    )
}

export default RecipeComment;

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
    recipe_comment_container: {
        width: ws*380,
        backgroundColor: '#ffffff',
    },
    recipe_comment_title: {
        fontSize: ws*18,
        fontWeight: '500',
        marginVertical: ws*10,
    },
    recipe_comment_user: {
        paddingVertical: ws*15,
        alignItems: 'flex-start'
    },
    recipe_comment_user_url: {
        width: ws*50,
        height: ws*50,
        borderRadius: ws*50,
        borderWidth: 2,
        borderColor: '#307F85',
        marginRight: ws*15,
    },
    recipe_comment_info: {
        width: ws*310,
    },
    recipe_comment_user_name: {
        fontSize: ws*17,
        fontWeight: '500',
        color: '#000000',
        display: 'flex',
        flexWrap: 'nowrap',
        overflow: 'hidden',
        maxWidth: ws*180
    },
    recipe_comment_evaluate: {
        marginLeft: ws*10
    },
    recipe_comment_evaluate_star: {
        width: ws*16,
        height: ws*16,
        marginLeft: ws*3,
    },
    recipe_comment_content: {
        width: ws*310,
        fontSize: ws*14,
        color: '#000000',
        marginTop: ws*5,
    },
})