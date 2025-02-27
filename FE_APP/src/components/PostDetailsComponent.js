import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";

const ws = Dimensions.get('screen').width / 440

const PostDetailsComponent = ({post_details}) => {

    return (
        <View style={styles.postDetailsComponent_container}>
            <Text style={styles.postDetailsComponent_caption}>{post_details.caption}</Text>
            {
                post_details.type === "Image" ?
                <Image source={require("../assets/images/food.jpg")} style={styles.postDetailsComponent_url} /> 
                :
                <Video 
                    style={styles.postDetailsComponent_url}
                    source={{ uri: "https://www.youtube.com/watch?v=JrNMyzsYr4M&list=PLHkNSPIHGdpZn550zYCz4Rx8gCid7f5T6&index=26" }}
                    controls={true}
                    resizeMode="cover"
                    paused={false}
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