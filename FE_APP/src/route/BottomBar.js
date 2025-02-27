import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Home from "../pages/Home";
import Foods from "../pages/Foods";
import Post from "../pages/Post";
import Ingredient from "../pages/Ingredient";
import User from "../pages/User";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ws = Dimensions.get('screen').width / 440

const Tab = createBottomTabNavigator()

const BtnPostBottomBar = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.btnPostBottomBar_container} onPress={onPress}>
            <Image source={require("../assets/images/Post.png")} style={[styles.bottomBar_img, styles.postBottomBar_img]} />
        </TouchableOpacity>
    )
}

const BtnBottomBar = ({focused, src, label}) => {
    return (
        <View style={styles.btnBottomBar_container}>
            <Image source={src} style={{...styles.bottomBar_img, tintColor: focused ? '#307F85' : '#ffffff'}}/>
            <Text style={{color: focused ? '#307F85' : '#ffffff'}}>{label}</Text>
        </View>
    )
}

const BottomBar = ({route}) => {
    return (
        <Tab.Navigator 
            screenOptions={({route}) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: styles.tabBarStyle
            })}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <BtnBottomBar focused={focused} src={require("../assets/images/Home.png")} label={"Trang chủ"} />
                    }
                }}
            />
            <Tab.Screen 
                name="Foods"
                component={Foods}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <BtnBottomBar focused={focused} src={require("../assets/images/Foods.png")} label={"Món ăn"} />
                    }
                }}
            />
            <Tab.Screen 
                name="Post"
                component={Post}
                options={{
                    tabBarButton: (props) => <BtnPostBottomBar {...props} />
                }}
            />
            <Tab.Screen 
                name="Ingredient"
                component={Ingredient}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <BtnBottomBar focused={focused} src={require("../assets/images/Ingredient.png")} label={"Nguyên liệu"} />
                    }
                }}
            />
            <Tab.Screen 
                name="User"
                component={User}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <BtnBottomBar focused={focused} src={require("../assets/images/User.png")} label={"Người dùng"} />
                    }
                }}
            />
           
        </Tab.Navigator>
    )
}

export default BottomBar;

const styles = StyleSheet.create({
    tabBarStyle: {
        width: ws*440,
        height: ws * 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#70B9BE",
    },
    btnBottomBar_container: {
        width: ws*100,
        height: ws*120,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
    },
    btnPostBottomBar_container: {
        backgroundColor: '#D9D9D9',
        top: -ws*40,
        left: 0,
        width: ws*80,
        height: ws*80,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ws*10,
        borderColor: '#ffffff',
    },
    bottomBar_img: {
        width: ws*25,
        height: ws*25,
        objectFit: 'contain'
    },
    postBottomBar_img: {
    }
});
