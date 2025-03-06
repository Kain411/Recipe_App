import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ws = Dimensions.get('screen').width / 440

const CommentComponent = ({comment}) => {

    const navigation = useNavigation()

    return (
        <View style={styles.commentComponent_container}>
            <TouchableOpacity 
                style={styles.commentComponent_btn_img}
                onPress={() => navigation.navigate("UserDetails", {user: comment.user})}
            >
                <Image source={{uri: comment.user.url}} style={styles.postComponent_user_img} />
            </TouchableOpacity>
            <View style={styles.commentComponent_content}>
                <TouchableOpacity 
                    style={styles.commentComponent_user}
                    onPress={() => navigation.navigate("UserDetails", {user: comment.user})}
                >
                    <Text style={styles.commentComponent_user_name}>{comment.user.username}</Text>
                </TouchableOpacity>
                <Text style={styles.commentComponent_comment}>
                    {comment.comment}
                </Text>
            </View>
        </View>
    )
}

export default CommentComponent;

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    commentComponent_container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 25,
    },
    commentComponent_btn_img: {
        width: ws*40,
        height: ws*40,
        borderRadius: ws*40,
    },
    postComponent_user_img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: ws*40,
    },
    commentComponent_content: {
        marginLeft: ws*15,
        width: ws*325 - 5,
        backgroundColor: '#FAFAFA',
        paddingVertical: ws*10,
        paddingHorizontal: ws*15,
        borderRadius: 15,
        elevation: 5,
    },
    commentComponent_user: {

    },
    commentComponent_user_name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
})