import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const ws = Dimensions.get('screen').width / 440

const PostDetailsComponent = ({post_details}) => {

    return (
        <View style={styles.postDetailsComponent_container}>
            <Text style={styles.postDetailsComponent_caption}>{post_details.caption}</Text>
            {
                post_details.type === "Image" ?
                <Image source={{uri: post_details.url}} style={styles.postDetailsComponent_url} /> 
                :
                <WebView 
                    style={styles.postDetailsComponent_url}
                    source={{ uri: post_details.video.replace("watch?v=", "embed/") }}
                    allowsFullscreenVideo={true}
                />
            }
        </View>
    )
}

export default PostDetailsComponent;

const styles = StyleSheet.create({
    postDetailsComponent_container: {
        width: ws*380,
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
        paddingVertical: ws*10,
        paddingHorizontal: ws*20,
        borderRadius: ws*15,
    },
    postDetailsComponent_caption: {
        fontSize: 18,
        marginBottom: 20,
    },
    postDetailsComponent_url: {
        width: '100%',
        height: ws*180,
        objectFit: 'cover',
        borderRadius: ws*10,
        marginBottom: ws*10,
    },
})