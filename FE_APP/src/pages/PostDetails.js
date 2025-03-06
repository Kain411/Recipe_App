import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CommentComponent from "../components/CommentComponent";
import { useContext, useEffect, useState } from "react";
import PostDetailsComponent from "../components/PostDetailsComponent";
import { CommentContext } from "../context/CommentContext";
import { AuthContext } from "../context/AuthContext";

const ws = Dimensions.get('screen').width / 440

const PostDetails = () => {

    const navigation = useNavigation()

    const post = useRoute().params.post
    const user = post.user
    const postDetails = post.post_details || []

    const { userLogin, handleGetUserByID } = useContext(AuthContext)
    const { handleGetAllCommentByPostID, handlePostNewComment } = useContext(CommentContext)

    const [lstComment, setLstComment] = useState([])
    const [myComment, setMyComment] = useState("") 
    const [alert, setAlert] = useState("")

    useEffect(() => {
        const getComments = async () => {
            const commentRef = await handleGetAllCommentByPostID(post.id)
            const commentDatas = commentRef.comments

            const getUserOfComment = async () => {
                const comments = []

                for (const commentData of commentDatas) {
                    const userID = commentData.user_id

                    const userRef = await handleGetUserByID(userID)
                    const userData = userRef.user

                    const comment = {
                        id: commentData.id,
                        comment: commentData.comment,
                        user: userData
                    }

                    comments.push(comment)
                }
                return comments
            }
            const comments = await getUserOfComment()
            setLstComment(comments)
        }
        getComments()
    }, [])

    const handlePostComment = async () => {
        const response = await handlePostNewComment(userLogin.id, post.id, myComment)
        setAlert(response.message)
        setMyComment("")
        Alert.alert(
            "Cảnh báo", 
            alert,
            [{ text: "OK", onPress: () => setAlert("") }]
        )
    }

    return (
        <View style={styles.postDetails_container}>
            <View style={[styles.center_y, styles.postDetails_header]}>
                <TouchableOpacity 
                    style={[styles.center, styles.postDetails_btn_back]}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require("../assets/images/Arrow.png")} style={styles.postDetails_icon_back} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.center_y, styles.postDetails_user]}
                    onPress={() => navigation.navigate("UserDetails", {user: user})}
                >
                    <Image source={{uri: user.url}} style={styles.postDetails_user_img} />
                    <Text style={styles.postDetails_user_name}>{user.username}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.postDetails_content}>
                <Text style={styles.postDetails_caption}>{post.caption}</Text>
                {
                    postDetails.map((post_details, index) => {
                        return <PostDetailsComponent key={index} post_details={post_details} />
                    })
                }

                <View style={styles.postDetails_hr} />
                <Text style={styles.postDetails_comment}>Bình luận</Text>
                {
                    lstComment.map((comment, index) => {
                        return <CommentComponent key={index} comment={comment} />
                    })
                }
            </ScrollView>
            <View style={styles.postDetails_space_white} />
            <View style={[styles.center_y, styles.postDetails_write_comment]}>
                <TouchableOpacity style={[styles.center, styles.postDetails_btn_write]}>
                    <Image source={require("../assets/images/Group_Icon.png")} style={styles.postDetails_icon_group} />
                </TouchableOpacity>
                <TextInput 
                    value={myComment}
                    onChangeText={(comment) => setMyComment(comment)}
                    style={styles.postDetails_input} 
                    placeholder="Viết bình luận ..." 
                />
                <TouchableOpacity 
                    style={[styles.center, styles.postDetails_btn_write]}
                    onPress={handlePostComment}
                >
                    <Image source={require("../assets/images/Share.png")} style={styles.postDetails_icon_group} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostDetails;

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_y: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postDetails_container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    postDetails_header: {
        width: ws*440,
        height: ws*60,
        backgroundColor: '#70B9BE',
        paddingHorizontal: ws*20,
    },
    postDetails_btn_back: {
        width: ws*40,
        height: ws*40,
        borderRadius: ws*40,
    },
    postDetails_icon_back: {
    },
    postDetails_user: {
        marginLeft: ws*20,
    },
    postDetails_user_img: {
        width: ws*35,
        height: ws*35,
        objectFit: 'cover',
        borderRadius: ws*35,
    },
    postDetails_user_name: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000000',
        marginLeft: ws*15,
    },
    postDetails_content: {
        paddingHorizontal: ws*30,
    },
    postDetails_caption: {
        marginVertical: ws*20,
        fontSize: 18,
    },
    postDetails_hr: {
        width: '100%',
        height: 1,
        backgroundColor: "rgba(112, 185, 190, 0.25)",
    },
    postDetails_comment: {
        fontSize: 18,
        marginVertical: ws*10,
    },
    postDetails_space_white: {
        height: 5,
        backgroundColor: '#ffffff'
    },
    postDetails_write_comment: {
        paddingHorizontal: ws*30,
        width: ws*440,
        height: ws*60,
        borderTopWidth: 1,
        borderColor: '#DEDEDE'
    },
    postDetails_btn_write: {
        width: ws*25,
        height: ws*25,
    },
    postDetails_icon_group: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        tintColor: '#000000',
    },
    postDetails_input: {
        marginHorizontal: ws*20,
        flex: 1,
        backgroundColor: 'rgba(243, 242, 241, 0.8)',
        borderRadius: ws*440,
        paddingLeft: 20,
    }
})