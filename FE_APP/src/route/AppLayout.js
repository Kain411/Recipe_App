import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, StatusBar } from "react-native";
import BottomBar from "./BottomBar";
import PostDetails from "../pages/PostDetails";
import UserDetails from "../pages/UserDetails";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContextWrapper from "../context/ContextWrapper";
import ReviewDetails from "../pages/include/ReviewDetails";
import FoodDetail from "../pages/FoodDetail";
import UserUpdated from "../pages/UserUpdated";
import Cart from "../pages/Cart"

const ws = Dimensions.get('screen').width / 440;
const Stack = createStackNavigator();

const AppLayout = () => {
    return (
        <ContextWrapper>
            <NavigationContainer>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="BottomBar" component={BottomBar} />
                    <Stack.Screen name="PostDetails" component={PostDetails} />
                    <Stack.Screen name="UserDetails" component={UserDetails} />
                    <Stack.Screen name="Post" component={Post} />
                    <Stack.Screen name="ReviewDetails" component={ReviewDetails} />
                    <Stack.Screen name="FoodDetail" component={FoodDetail} />
                    <Stack.Screen name="UserUpdated" component={UserUpdated} />
                    <Stack.Screen name="Cart" component={Cart} />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextWrapper>
    );
};

export default AppLayout;
