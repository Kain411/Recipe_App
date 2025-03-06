import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

const ws = Dimensions.get('screen').width / 440

const Login = () => {

    const navigation = useNavigation()
    const { handleLogin } = useContext(AuthContext)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("Vui lòng đăng nhập...")

    const handleChange = (key, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [key]: value
        }))
    }

    const handleSubmit = async () => {
        const response = await handleLogin(user);

        if (response.success) {
            setMessage(response.message)
            navigation.replace("BottomBar")
        }
        else {
            setMessage(response.message)
        }
    }

    return (
        <ImageBackground 
            source={require("../assets/images/Background.png")} 
            style={styles.auth_container}
            resizeMode="cover"
        >
            <Text style={styles.auth_hello}>Xin chào</Text>
            <Text style={styles.auth_hello_content}>{message}</Text>
            <View style={styles.auth_main}>
                <Text style={styles.auth_main_content}>Email:</Text>
                <TextInput  
                    style={styles.auth_main_input}
                    placeholder="Nhập email..."
                    onChangeText={(value) => handleChange("email", value)}
                />
            </View>
            <View style={styles.auth_main}>
                <Text style={styles.auth_main_content}>Mật khẩu:</Text>
                <TextInput  
                    style={styles.auth_main_input}
                    placeholder="Nhập mật khẩu..."
                    secureTextEntry={true}
                    onChangeText={(value) => handleChange("password", value)}
                />
            </View>
            <View style={[styles.center, styles.auth_block]}>
                <TouchableOpacity 
                    style={[styles.center, styles.auth_btn_submit]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.auth_btn_submit_content}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={[styles.center_y, styles.auth_account_navigate]}>
                    <Text style={styles.auth_account}>
                        Bạn chưa có tài khoản?
                    </Text>

                    <TouchableOpacity 
                        style={styles.center_y}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.auth_account_btn}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                    
                <TouchableOpacity style={styles.center_y}>
                    <Text style={styles.auth_account_btn}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Login;

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
    auth_container: {
        flex: 1,
        width: ws*440,
        paddingHorizontal: ws*50,
        objectFit: 'contain'
    },
    auth_hello: {
        marginTop: ws*90,
        fontSize: 40,
        color: '#000000',
    },
    auth_hello_content: {
        color: '#000000',
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: ws*50,
    },
    auth_main: {
        width: '100%',
        marginVertical: ws*20,
    },
    auth_main_content: {
        fontSize: 20,
        color: '#000000',
    },
    auth_main_input: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 20,
        paddingLeft: ws*20,
        fontStyle: 'italic',
        fontSize: 15,
    },
    auth_block: {
        width: '100%',
        marginVertical: ws*30,
    },
    auth_btn_submit: {
        width: ws*150,
        height: ws*60,
        backgroundColor: '#70B9BE',
        borderRadius: 20,
    },
    auth_btn_submit_content: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    auth_account_navigate: {
        marginVertical: 20,
    },
    auth_account: {
        fontSize: 18,
        color: '#000000',
        marginRight: 10,
    },
    auth_account_btn: {
        fontSize: 18,
        color: '#4E8F93',
    },
})