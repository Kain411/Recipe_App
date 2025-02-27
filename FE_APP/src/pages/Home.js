import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostComponent from "../components/PostComponent";

const ws = Dimensions.get('screen').width / 440

const Home = () => {

    const items = Array.from({ length: 100 }, (_, i) => i + 1);

    const [user, setUser] = useState({
        url: "https://tse3.mm.bing.net/th?id=OIP.nbK_NmRYM8FW6-wC07dfKAHaJQ&pid=Api&P=0&h=220",
        username: "Enami Asa",
        gender: 'Nữ',
        phone: '0977496705',
        address: 'Tokyo, Japan'
    })

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
        <ScrollView 
            style={styles.home_container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.app_name}>App Name</Text>
            <View style={[styles.center_y, styles.home_user_tool]}>
                <View style={styles.center_y}>
                    <Image source={{uri: user.url}} style={styles.home_user_img} /> 
                    <Text style={styles.home_user_name}>{user.username}</Text>
                </View>                
                <View style={styles.center_y}>
                    <TouchableOpacity style={[styles.center, styles.home_tool_btn]}>
                        <Image source={require("../assets/images/Bell.png")} style={styles.home_tool_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.center, styles.home_tool_btn]}>
                        <Image source={require("../assets/images/Cart.png")} style={styles.home_tool_icon} />
                    </TouchableOpacity>
                </View>                
            </View>
            {
                posts.map((post, index) => {
                    return (
                        <PostComponent key={index} user={user} post={post} screen="Home" />
                    )
                })
            }
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    center_y: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    home_container: {
        flex: 1,
        paddingTop: ws*10,
        paddingHorizontal: ws*30,
        backgroundColor: '#ffffff'
    },
    app_name: {
        fontSize: 25,
        color: '#307F85',
        fontWeight: 'bold'
    },
    home_user_tool: {
        marginVertical: ws*20,
        justifyContent: 'space-between'
    },
    home_user_img: {
        width: ws*45,
        height: ws*45,
        borderRadius: ws*50,
        objectFit: 'cover'
    },
    home_user_name: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: ws*20,
    },
    home_tool_btn: {
        width: ws*45,
        height: ws*45,
        marginLeft: ws*15,
        borderRadius: ws*40,
        backgroundColor: '#F5F5F5',
    },
    home_tool_icon: {
        width: ws*18,
        height: ws*18,
    }
})