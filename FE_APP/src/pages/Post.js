import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";

const ws = Dimensions.get('screen').width / 440

const ImageVideoComponent = ({data, index, handleInfo, handleDelete}) => {

    const [display, setDisplay] = useState(true)
    const [textURL, setTextURL] = useState("")

    const handleSaveURL = () => {
        handleInfo(index, "url", textURL)
        setTextURL("")
        setDisplay(false)
    }

    console.log(textURL)

    return (
        <View style={styles.imageVideoComponent_container}>
            <View style={styles.space_between}>
                <View style={styles.center_y}>
                    <TouchableOpacity 
                        style={{...styles.center, ...styles.imageVideoComponent_btn_img, backgroundColor: data.type==="Image" ? '#ffffff' : '#F5F5F5'}}
                        onPress={() => handleInfo(index, "type", "Image")}
                    >
                        <Text style={{...styles.imageVideoComponent_btn_content, color: data.type==="Image" ? '#307F85' : '#000000'}}>Hình ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{...styles.center, ...styles.imageVideoComponent_btn_img, backgroundColor: data.type==="Video" ? '#ffffff' : '#F5F5F5'}}
                        onPress={() => handleInfo(index, "type", "Video")}
                    >
                        <Text style={{...styles.imageVideoComponent_btn_content, color: data.type==="Video" ? '#307F85' : '#000000'}}>Video</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={[styles.center, styles.imageVideoComponent_btn_bin]}
                    onPress={() => handleDelete(index)}
                >
                    <Image source={require("../assets/images/Bin.png")} style={styles.imageVideoComponent_icon_bin} />
                </TouchableOpacity>
            </View>
            {
                display ? 
                <View style={{...styles.center_y, marginTop: ws*10}}>
                    <TextInput 
                        style={[styles.center, styles.imageVideoComponent_input_url]} 
                        multiline={true} 
                        placeholder="Nhập url..." 
                        value={textURL}
                        onChangeText={(text) => setTextURL(text)}
                    /> 
                    <TouchableOpacity 
                        style={[styles.center, styles.imageVideoComponent_btn_addImageVideo]}
                        onPress={handleSaveURL}
                    >
                        <Image source={require("../assets/images/Share.png")} style={styles.imageVideoComponent_urlImageVideo} />
                    </TouchableOpacity>
                </View>
                : null
            }
            <TouchableOpacity 
                style={[styles.center, styles.imageVideoComponent_btn_url]}
                onPress={() => setDisplay(!display)}
            >
                {
                    data.url !== null ?
                    <Image source={{uri: data.url}} style={styles.imageVideoComponent_url}/>
                    : <Image source={require("../assets/images/Button_Add.png")} style={styles.imageVideoComponent_url}/>
                }
            </TouchableOpacity>
            <TextInput 
                style={styles.imageVideoComponent_input_description} 
                multiline={true} 
                placeholder="Mô tả" 
                value={data.caption}
                onChangeText={(text) => handleInfo(index, "caption", text)}
            />
        </View>
    )
}

const Post = () => {

    const navigation = useNavigation()

    const { userLogin } = useContext(AuthContext)
    const { posts, handlePostNewPost } = useContext(PostContext)

    const [caption, setCaption] = useState("")
    const [postDetails, setPostDetails] = useState([{
        type: "Image",
        url: null,
        caption: ""
    }])

    const addImageVideo = () => {
        setPostDetails([
            ...postDetails,
            {
                type: "Image",
                url: null,
                caption: ""
            }
        ])
    }

    const handleInfo = (index, type, info) => {
        const lst = [...postDetails]
        if (type=="type") lst[index].type = info
        if (type=="url") lst[index].url = info
        if (type=="caption") lst[index].caption = info
        setPostDetails(lst)
    }

    const handleDelete = (index) => {
        console.log(index)
        const lst = [...postDetails]
        lst.splice(index, 1)
        setPostDetails(lst)
    }

    const handleSumit = async () => {
        const post = {
            user_id: userLogin.id,
            caption: caption
        }

        const response = await handlePostNewPost(post, postDetails)
        const message = response.message

        Alert.alert("Cảnh báo", message)
        if (message!=="Thành công!") {
            return
        }

        setCaption(""),
        setPostDetails([{
            type: "Image",
            url: null,
            caption: ""
        }])
    }

    return (
        <View style={styles.post_container}>
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
                <TextInput 
                    style={styles.post_input_caption} 
                    multiline={true} 
                    placeholder="Nội dung"
                    value={caption}
                    onChangeText={(text) => setCaption(text)}
                />

                <Text style={styles.post_img_video}>Hình ảnh / Video</Text>

                {
                    postDetails.map((data, index) => {
                        return <ImageVideoComponent key={index} data={data} index={index} handleInfo={handleInfo} handleDelete={handleDelete} />
                    })
                }

                <TouchableOpacity 
                    style={[styles.center, styles.post_btn_add]}
                    onPress={addImageVideo}
                >
                    <Image source={require("../assets/images/Add.png")} style={styles.post_icon_add} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.center, styles.post_btn_save]}
                    onPress={handleSumit}
                >
                    <Text style={styles.post_btn_save_content}>Đăng bài</Text>
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
        flex: 1,
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
    imageVideoComponent_btn_url: {
        width: '100%',
        height: ws*180,
        marginVertical: ws*15,
    },
    imageVideoComponent_url: {
        width: '90%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 15,
    },
    imageVideoComponent_input_url: {
        flex: 1,
        minHeight: ws*45,
        maxHeight: ws*90,
        backgroundColor: '#ffffff',
        paddingLeft: ws*20,
        borderRadius: 15,
        marginRight: 20,
    },
    imageVideoComponent_btn_addImageVideo: {
        width: '20%',
        height: ws*45,
        borderRadius: 15,
        backgroundColor: '#70B9BE',
    },
    imageVideoComponent_urlImageVideo: {
        width: ws*15,
        height: ws*15,
        tintColor: '#ffffff',
    },
    imageVideoComponent_btn_paste: {
        width: ws*55,
        height: ws*35,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        backgroundColor: '#000000',
        position: 'absolute',
        top: ws*30,
        left: ws*20,
        zIndex: 99,
    },
    imageVideoComponent_paste: {
        color: '#ffffff',
        fontWeight: '500',
    },
    imageVideoComponent_input_description: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: ws*20,
        borderRadius: 15,
        textAlignVertical: 'top',
        marginBottom: ws*10,
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
    post_btn_save: {
        width: ws*380,
        height: ws*70,
        borderRadius: 20,
        backgroundColor: '#70B9BE',
        marginBottom: ws*30,
    },
    post_btn_save_content: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})