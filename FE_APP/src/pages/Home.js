import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostComponent from "../components/PostComponent";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { PostContext } from "../context/PostContext";

const ws = Dimensions.get('screen').width / 440

const Home = () => {

    const navigation = useNavigation()

    const { userLogin } = useContext(AuthContext)
    const { posts, handleGetAllPost } = useContext(PostContext)

    useEffect(() => {
        const getHome = async () => {
            const postRef = await handleGetAllPost()
        }
        getHome()
    }, [])

    return (
        <ScrollView 
            style={styles.home_container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.app_name}>App Name</Text>
            <View style={[styles.center_y, styles.home_user_tool]}>
                <TouchableOpacity 
                    style={styles.center_y}
                    onPress={() => navigation.navigate("UserDetails", { user: userLogin })}
                >
                    <Image source={{uri: userLogin.url}} style={styles.home_user_img} /> 
                    <Text style={styles.home_user_name}>{userLogin.username}</Text>
                </TouchableOpacity>                
                <View style={styles.center_y}>
                    <TouchableOpacity style={[styles.center, styles.home_tool_btn]}>
                        <Image source={require("../assets/images/Bell.png")} style={styles.home_tool_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.center, styles.home_tool_btn]} onPress={() => navigation.navigate("Cart")}>
                        <Image source={require("../assets/images/Cart.png")} style={styles.home_tool_icon} />
                    </TouchableOpacity>
                </View>                
            </View>
            {
                posts.map((post, index) => {
                    return (
                        <PostComponent key={index} post={post} content="Details" />    
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
        fontWeight: 'bold',
        marginTop: ws*20,
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