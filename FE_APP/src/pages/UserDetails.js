import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostComponent from "../components/PostComponent";
import RecipeComponent from "../components/RecipeComponent";

const ws = Dimensions.get('screen').width / 440

const UserDetails = ({ route }) => {

    const navigation = useNavigation()
    const { user } = route.params

    const [click, setClick] = useState(false)
    const [active, setActive] = useState(true)

    const [posts, setPosts] = useState([
        {
            caption: "Lần đầu làm mà thành công ghê",
            created_at: '12/02/2024',
            post_details: [
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
            ]
        },
        {
            caption: "Lần đầu làm mà thành công ghê",
            created_at: '12/02/2024',
            post_details: [
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
            ]
        },
        {
            caption: "Lần đầu làm mà thành công ghê",
            created_at: '12/02/2024',
            post_details: [
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
            ]
        },
        {
            caption: "Lần đầu làm mà thành công ghê",
            created_at: '12/02/2024',
            post_details: [
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
            ]
        },
        {
            caption: "Lần đầu làm mà thành công ghê",
            created_at: '12/02/2024',
            post_details: [
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
            ]
        },
        {
            caption: "Lần đầu làm mà thành công ghê",
            created_at: '12/02/2024',
            post_details: [
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
                {
                    type: "Image",
                    caption: "Cái này ngon",
                    url: "https://tse3.mm.bing.net/th?id=OIP.FiEGdkmGTNJwV3F_-PpIAgHaEq&pid=Api&P=0&h=220",
                },
                {
                    type: "Video",
                    caption: "Công thức này ngon",
                    url: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26",
                },
            ]
        },
    ])

    return (
        <ScrollView style={styles.userDetails_container}>
            <ImageBackground source={{uri: user.bg_url}} style={styles.userDetails_user_bg} >
                <View style={[styles.center_y, styles.space_between, styles.userDetails_btn]}>
                    <TouchableOpacity 
                        style={[styles.center, styles.userDetails_btn_back]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={require("../assets/images/Mark_X.png")} style={styles.userDetails_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.center, styles.userDetails_btn_add]}
                        onPress={() => setClick(!click)}
                    >
                        <Image source={require("../assets/images/Add.png")} style={styles.userDetails_icon} />
                    </TouchableOpacity>
                </View>
                {
                    click ? 
                    <View style={styles.userDetails_btn_add_new}>
                        <TouchableOpacity 
                            style={[styles.center, styles.userDetails_btn_add_new_btn, styles.userDetails_btn_add_new_post]}
                            onPress={() => navigation.navigate("Post")}
                        >
                            <Text style={styles.userDetails_btn_add_new_content}>Bài đăng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.center, styles.userDetails_btn_add_new_btn, styles.userDetails_btn_add_new_recipe]}
                        >
                            <Text style={styles.userDetails_btn_add_new_content}>Công thức</Text>
                        </TouchableOpacity>
                   </View> : null
                }
                <Image source={{uri: user.url}} style={styles.userDetails_user_img} />
            </ImageBackground>

            <View style={styles.userDetails_main}>
                <View style={styles.userDetails_info}>
                    <View style={styles.center_y}>
                        <View style={styles.userDetails_user_info_left}>
                            <View style={[styles.center_y, styles.userDetails_user_info]}>
                                <Image source={require("../assets/images/Name.png")} style={styles.userDetails_user_icon} />
                                <Text style={styles.userDetails_user_content}>{user.username}</Text>
                            </View>
                            <View style={[styles.center_y, styles.userDetails_user_info]}>
                                <Image source={require("../assets/images/Gender.png")} style={styles.userDetails_user_icon} />
                                <Text style={styles.userDetails_user_content}>{user.gender}</Text>
                            </View>
                        </View>
                        <View style={styles.userDetails_user_info_right}>
                            <View style={[styles.center_y, styles.userDetails_user_info]}>
                                <Image source={require("../assets/images/Dob.png")} style={styles.userDetails_user_icon} />
                                <Text style={styles.userDetails_user_content}>{user.dob}</Text>
                            </View>
                            <View style={[styles.center_y, styles.userDetails_user_info]}>
                                <Image source={require("../assets/images/Phone.png")} style={styles.userDetails_user_icon} />
                                <Text style={styles.userDetails_user_content}>{user.phone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.center_y, styles.userDetails_user_info]}>
                        <Image source={require("../assets/images/Location.png")} style={styles.userDetails_user_icon} />
                        <Text style={styles.userDetails_user_content}>{user.location}</Text>
                    </View>
                </View>

                <View style={[styles.center_y, styles.userDetails_btn_navigation]}>
                    <TouchableOpacity 
                        style={{...styles.center, ...styles.userDetails_btn_tool, backgroundColor: active ? '#70B9BE' : '#ffffff'}}
                        onPress={() => setActive(true)}
                    >
                        <Text style={{...styles.userDetails_btn_tool_content, color: active ? '#ffffff' : '#70B9BE'}}>Bài đăng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{...styles.center, ...styles.userDetails_btn_tool, backgroundColor: !active ? '#70B9BE' : '#ffffff'}}
                        onPress={() => setActive(false)}
                    >
                        <Text style={{...styles.userDetails_btn_tool_content, color: !active ? '#ffffff' : '#70B9BE'}}>Công thức</Text>
                    </TouchableOpacity>
                </View>

                {
                    active ? 
                    <View style={styles.userDetails_list}>
                        {
                            posts.map((post, index) => {
                                return (
                                    <PostComponent key={index} user={user} post={post} screen="Home" />
                                )
                            })
                        }
                    </View> 
                    :
                    <View style={styles.userDetails_list}>
                        <RecipeComponent />
                        <RecipeComponent />
                        <RecipeComponent />
                        <RecipeComponent />
                    </View> 
                }
            </View>
        </ScrollView>
    )
}

export default UserDetails;

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
    space_between: {
        justifyContent: 'space-between',
    },
    userDetails_container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    userDetails_user_bg: {
        width: ws*440,
        height: ws*200,
        objectFit: 'cover',
        position: 'relative',
    },
    userDetails_btn: {
        paddingHorizontal: ws*30,
        paddingTop: ws*20,
    },
    userDetails_btn_back: {
        width: ws*30,
        height: ws*30,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    userDetails_icon: {
        width: ws*10,
        height: ws*10,
        tintColor: '#000000'
    },
    userDetails_btn_add: {
        width: ws*60,
        height: ws*30,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    userDetails_btn_add_new: {
        width: ws*120,
        height: ws*120,
        borderRadius: 15,
        position: 'absolute',
        top: ws*20 + ws*30 + 1,
        right: ws*30,
    },
    userDetails_btn_add_new_btn: {
        width: '100%',
        height: '50%',
        backgroundColor: '#ffffff',
    },
    userDetails_btn_add_new_post: {
        borderTopLeftRadius: 15,
        borderWidth: 1,
        borderColor: '#D9D9D9',
    },
    userDetails_btn_add_new_recipe: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderTopWidth: 0,
    },
    userDetails_btn_add_new_content: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500'
    },
    userDetails_user_img: {
        width: ws*120,
        height: ws*120,
        borderRadius: ws*120,
        borderWidth: 10,
        borderColor: '#ffffff',
        position: 'absolute',
        top: ws*200 - ws*90,
        left: ws*220 - ws*60,
    },
    userDetails_main: {
        paddingHorizontal: ws*30,
    },
    userDetails_info: {
        width: ws*380,
        backgroundColor: '#F5F5F5',
        marginTop: ws*35,
        paddingVertical: ws*10,
        borderRadius: 15,
    },
    userDetails_user_info_left: {
        width: '50%',
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    userDetails_user_info_right: {
        width: '50%'
    },
    userDetails_user_info: {
        marginLeft: ws*20,
        marginBottom: ws*8,
    },
    userDetails_user_icon: {
        tintColor: '#000000',
        objectFit: 'contain',
        width: ws*18,
        height: ws*18,
    },
    userDetails_user_content: {
        marginLeft: ws*10,
        fontSize: 16,
        fontWeight: '400',
    },
    userDetails_btn_navigation: {
        marginVertical: ws*20,
        paddingHorizontal: ws*50,
        justifyContent: 'space-between'
    },
    userDetails_btn_tool: {
        width: ws*120,
        height: ws*50,
        borderRadius: 15,
    },
    userDetails_btn_tool_content: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})