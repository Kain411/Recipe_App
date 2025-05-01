import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview'
import { FavoriteContext } from "../context/FavoriteContext";
import { AuthContext } from "../context/AuthContext";
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const ws = Dimensions.get('screen').width / 440

const getPostStyle = (count, index) => {
    if (count === 1) return { width: ws*340, height: ws*180 };
    if (count === 2) return index === 0
        ? { width: ws*170, height: ws*180 }
        : { width: ws*170, height: ws*180 };
    if (count === 3) return index === 0 
        ? { width: ws*340, height: ws*180 } 
        : { width: ws*170, height: ws*90 }; 
    if (count === 4) return { width: ws*170, height: ws*90 }; 
    return { width: ws*340, height: ws*180 };
};

const PostComponent = ({post, content}) => {

    const navigation = useNavigation()

    const [favorite, setFavorite] = useState(false)

    const user = post.user
    const postDetails = post.post_details || [];
    const count = postDetails.length;

    console.log(postDetails)

    const { userLogin } = useContext(AuthContext)
    const { handleGetFavoriteByIDs, handlePostFavoriteByIDs, handleDeleteFavoriteByIDs } = useContext(FavoriteContext)

    useEffect(() => {
        const getFavorite = async () => {
            const result = await handleGetFavoriteByIDs(userLogin.id, post.id, "Post")
            setFavorite(result.favorite)
        }
        getFavorite()
    }, [])

    const handleFavorite = async () => {
        if (favorite) await handleDeleteFavoriteByIDs(userLogin.id, post.id, "Post")
        else await handlePostFavoriteByIDs(userLogin.id, post.id, "Post")
        setFavorite(!favorite)
    }

    const onShare = async () => {
        const urls = []

        console.log(postDetails)

        for (const postDetail of postDetails) {
            if (postDetail.type === "Image") {
                const localFile = `${RNFS.DocumentDirectoryPath}/${postDetail.id}.jpg`

                try {
                    const downloadFile = await RNFS.downloadFile({
                        fromUrl: postDetail.url,
                        toFile: localFile
                    }).promise;

                    if (downloadFile.statusCode === 200) {
                        urls.push(`file://${localFile}`)
                    }
                }
                catch (error) {
                    console.error("Lỗi download")
                }
            }
            else {
                console.log("LLL")
                const videoID = postDetail.url.split("?v=")[1];
                const thumbnailURL = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;

                const localFile = `${RNFS.DocumentDirectoryPath}/${postDetail.id}.png`

                try {
                    const downloadFile = await RNFS.downloadFile({
                        fromUrl: thumbnailURL,
                        toFile: localFile
                    }).promise;

                    if (downloadFile.statusCode === 200) {
                        urls.push(`file://${localFile}`)
                    }
                }
                catch (error) {
                    console.error("Lỗi download")
                }
            }
        }

        console.log(urls)

        try {
            await Share.open({
                title: 'Chia sẻ bài đăng',
                subject: 'Xem bài đăng',
                message: 'Chia sẻ bài đăng',
                urls: urls
            })
        }
        catch (error) {
            if (error.message.includes('User did not share')) {
                console.warn('Người dùng đã huỷ chia sẻ.');
            } else {
                console.error('Lỗi khi gửi email:', error);
                Alert.alert('Lỗi', 'Không thể gửi email.');
            }
        }
    };

    return (
        <View style={styles.postComponent_container}>
            {
                content === "Details" ?
                <View>
                    <View style={[styles.center_y, styles.postComponent_user_cancel]} >
                        <TouchableOpacity
                            style={styles.center_y}
                            onPress={() => {
                                if (user) {
                                    navigation.navigate("UserDetails", { user: user });
                                } else {
                                    console.warn("User is undefined");
                                }
                            }}
                        >
                            <Image source={{uri: user?.url}} style={styles.postComponent_user_img} />
                            <Text style={styles.postComponent_user_name}>{user.username}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center, styles.postComponent_btn_cancel]}>
                            <Image source={require("../assets/images/Cancel.png")} style={styles.postComponent_icon_cancel} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.postComponent_caption}>{post.caption}</Text>
                </View> : null
            }
            <View style={styles.postComponent_img_video}>
                {
                    postDetails.map((post_details, index) => {
                        if (count > 4) {
                            if (index < 4) {
                                if (post_details.type === "Image") {
                                    return <Image key={index} source={{ uri: post_details.url }} style={[styles.postComponent_post_img, getPostStyle(4, index)]} />
                                }
                                else {
                                    return <WebView
                                                key={index}
                                                source={{ uri: post_details.url.replace("watch?v=", "embed/") }}
                                                style={[styles.postComponent_post_video, getPostStyle(count, index)]}
                                                allowsFullscreenVideo={true}
                                            />
                                    }
                            } 
                        }
                        else {
                            if (post_details.type === "Image") {
                                return <Image key={index} source={{ uri: post_details.url }} style={[styles.postComponent_post_img, getPostStyle(count, index)]} />
                            }
                            else {
                                return <WebView
                                            key={index}
                                            source={{ uri: post_details.url.replace("watch?v=", "embed/") }}
                                            style={[styles.postComponent_post_video, getPostStyle(count, index)]}
                                            allowsFullscreenVideo={true}
                                        />
                                }
                        }
                    })
                }
            </View>
            <View style={[styles.center_y, styles.postComponent_tool]}>
                <TouchableOpacity 
                    style={[styles.center, styles.postComponent_btn_tool]}
                    onPress={handleFavorite}
                >
                    <View style={styles.center_y}>
                        <Image source={require("../assets/images/Heart.png")} style={[styles.postComponent_icon_tool, styles.postComponent_icon_heart]} />
                        <Text style={{...styles.postComponent_btn_content, color: favorite ? '#D757AE' : '#000000'}}>Yêu thích</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.center, styles.postComponent_btn_tool]}
                    onPress={() => navigation.navigate("PostDetails", {
                        post: post
                    })}
                >
                    <View style={styles.center_y}>
                        <Image source={require("../assets/images/Comment.png")} style={[styles.postComponent_icon_tool, styles.postComponent_icon_comment]} />
                        <Text style={styles.postComponent_btn_content}>Bình luận</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.center, styles.postComponent_btn_tool]}
                    onPress={onShare}
                >
                    <View style={styles.center_y}>
                        <Image source={require("../assets/images/Share.png")} style={[styles.postComponent_icon_tool, styles.postComponent_icon_share]} />
                        <Text style={styles.postComponent_btn_content}>Chia sẻ</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default PostComponent;


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
    postComponent_container: {
        width: ws*380,
        backgroundColor: '#F5F5F5',
        borderRadius: ws*15,
        paddingHorizontal: ws*20,
        marginBottom: ws*20,
        paddingTop: ws*20,
    },
    postComponent_user_cancel: {
        justifyContent: 'space-between',
        marginBottom: ws*20
    },
    postComponent_user_img: {
        width: ws*30,
        height: ws*30,
        borderRadius: ws*30,
        objectFit: 'cover'
    },
    postComponent_user_name: {
        marginLeft: ws*15,
        fontSize: ws*18,
        fontWeight: '500'
    },
    postComponent_btn_cancel: {
        width: ws*30,
        height: ws*30,
    },
    postComponent_icon_cancel: {
        width: ws*25,
        height: ws*25,
        objectFit: 'contain',
    },
    postComponent_caption: {
        marginBottom: ws*20,
        lineHeight: ws*20,
        fontSize: 15,
    },
    postComponent_img_video: {
        width: ws * 340,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        gap: 0,
    },
    postComponent_post_img: {},
    postComponent_post_video: {},
    postComponent_tool: {
        marginVertical: ws*20,
        justifyContent: 'space-between'
    },
    postComponent_btn_tool: {
        width: ws*100,
        height: ws*40,
        backgroundColor: '#ffffff',
        borderRadius: ws*10,
    },
    postComponent_icon_tool: {
        width: ws*15,
        height: ws*15,
        objectFit: 'contain'
    },
    postComponent_btn_content: {
        marginLeft: 5,
        fontSize: 12,
        color: '#000000',
        fontWeight: '400'
    },
    postComponent_icon_heart: {
        tintColor: '#FFC7ED'
    },
    postComponent_icon_comment: {
        tintColor: '#F5F4AA'
    },
    postComponent_icon_share: {
        tintColor: '#FFB266'
    },
})