import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ws = Dimensions.get('screen').width / 440

const ImageVideoComponent = ({SubCount}) => {

    const [active, setActive] = useState("Image")

    return (
        <View style={styles.imageVideoComponent_container}>
            <View style={styles.space_between}>
                <View style={styles.center_y}>
                    <TouchableOpacity 
                        style={{...styles.center, ...styles.imageVideoComponent_btn_img, backgroundColor: active==="Image" ? '#ffffff' : '#F5F5F5'}}
                        onPress={() => setActive("Image")}
                    >
                        <Text style={{...styles.imageVideoComponent_btn_content, color: active==="Image" ? '#307F85' : '#000000'}}>Hình ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{...styles.center, ...styles.imageVideoComponent_btn_img, backgroundColor: active==="Video" ? '#ffffff' : '#F5F5F5'}}
                        onPress={() => setActive("Video")}
                    >
                        <Text style={{...styles.imageVideoComponent_btn_content, color: active==="Video" ? '#307F85' : '#000000'}}>Video</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={[styles.center, styles.imageVideoComponent_btn_bin]}
                    onPress={SubCount}
                >
                    <Image source={require("../assets/images/Bin.png")} style={styles.imageVideoComponent_icon_bin} />
                </TouchableOpacity>
            </View>

            <Image source={require("../assets/images/food.jpg")} style={styles.imageVideoComponent_url}/>

            <TextInput style={styles.imageVideoComponent_input_description} multiline={true} placeholder="Mô tả" />
        </View>
    )
}

const Post = () => {

    const navigation = useNavigation()

    const [count, setCount] = useState(1)

    const SubCount = () => {
        setCount(count - 1)
    }

    return (
        <View style={styles.post_container}>
            <TouchableOpacity style={[styles.center, styles.post_btn_send]}>
                <Image source={require("../assets/images/Share.png")} style={styles.post_icon_share} />
            </TouchableOpacity>
            <View style={[styles.center, styles.post_header]}>
                <TouchableOpacity 
                    style={[styles.center, styles.post_btn_back]}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require("../assets/images/Arrow.png")} style={styles.post_icon_back} />
                </TouchableOpacity>
                <Text style={styles.post_header_title}>Bài đăng</Text>
            </View>

            <ScrollView style={styles.post_main}>
                <TextInput style={styles.post_input_caption} multiline={true} placeholder="Nội dung" />

                <Text style={styles.post_img_video}>Hình ảnh / Video</Text>

                {
                    Array.from({length: count}, (_,  index) => {
                        return <ImageVideoComponent key={index} SubCount={SubCount} />
                    })
                }

                <TouchableOpacity 
                    style={[styles.center, styles.post_btn_add]}
                    onPress={() => setCount(count+1)}
                >
                    <Image source={require("../assets/images/Add.png")} style={styles.post_icon_add} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Post;

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    post_container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    post_btn_send: {
        width: ws*60,
        height: ws*60,
        borderRadius: ws*60,
        backgroundColor: '#EBF0F6',
        position: 'absolute',
        top: ws*70,
        right: ws*10,
        zIndex: 999,
    },
    post_icon_share: {
        width: ws*20,
        height: ws*20,
        objectFit: 'contain',
        tintColor: '#70B9BE',
    },
    post_header: {
        width: ws*440,
        height: ws*60,
        backgroundColor: '#70B9BE',
    },
    post_btn_back: {
        width: ws*60,
        height: ws*60,
        borderRadius: ws*60,
        position: 'absolute',
        top: 0,
        left: ws*20,
    },
    post_icon_back: {
        tintColor: '#000000',
    },
    post_header_title: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '500',
    },
    post_main: {
        paddingTop: ws*20,
        paddingHorizontal: ws*30,
    },
    post_input_caption: {
        backgroundColor: '#F5F5F5',
        paddingLeft: ws*20,
        width: '100%',
        height: ws*100,
        textAlignVertical: 'top',
        fontSize: 15,
        borderRadius: ws*15,
    },
    post_img_video: {
        fontSize: 18,
        marginVertical: ws*20,
        color: '#000000',
    },
    imageVideoComponent_container: {
        width: '100%',
        paddingVertical: ws*10,
        paddingHorizontal: ws*20,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        marginBottom: ws*20,
    },
    imageVideoComponent_btn_img: {
        width: ws*80,
        height: ws*40,
        marginRight: ws*10,
        borderRadius: 10,
    },
    imageVideoComponent_btn_content: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
    },
    imageVideoComponent_btn_bin: {
        width: ws*40,
        height: ws*40,
        borderRadius: ws*40,
        backgroundColor: '#FAFAFA',
    },
    imageVideoComponent_icon_bin: {
        width: ws*20,
        height: ws*20,
        objectFit: 'contain',
        tintColor: 'red',
    },
    imageVideoComponent_url: {
        width: '100%',
        height: ws*180,
        marginVertical: ws*10,
    },
    imageVideoComponent_input_description: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingLeft: ws*20,
        borderRadius: 15,
        textAlignVertical: 'top',
    },
    post_btn_add: {
        width: '100%',
        height: ws*50,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        marginBottom: ws*50,
    },
    post_icon_add: {
        width: ws*20,
        height: ws*20,
    },
})