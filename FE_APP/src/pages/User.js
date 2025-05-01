import {React, useContext} from "react";
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const ws = Dimensions.get("screen").width / 440;

const User = () => {
  const navigation = useNavigation()

  const { userLogin } = useContext(AuthContext)

  return (
    <View style={styles.home_container}>
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

      <View style={styles.statistics}>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate("Favorite")}>
          <Image source={require("../assets/images/heart_user.png")} style={styles.statIcon} />
          <View>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Yêu thích</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate("UserDetails", { user: userLogin })}>
          <Image source={require("../assets/images/news_user.png")} style={styles.statIcon} />
          <View>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Bài đăng</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate("UserDetails", { user: userLogin })}>
          <Image source={require("../assets/images/recipe_user.png")} style={styles.statIcon} />
          <View>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Công thức</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard}>
          <Image source={require("../assets/images/ship_user.png")} style={styles.statIcon} />
          <View>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Vận chuyển</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserUpdated", { userId: userLogin.id })}>
            <Image source={require("../assets/images/updated_user.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require("../assets/images/private.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>Quyền riêng tư và bảo vệ</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default User;

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
    paddingTop: ws * 10,
    paddingHorizontal: ws * 30,
    backgroundColor: '#ffffff'
  },
  app_name: {
    fontSize: 25,
    color: '#307F85',
    fontWeight: 'bold',
    marginTop: ws*20,
  },
  home_user_tool: {
    marginVertical: ws * 20,
    justifyContent: 'space-between'
  },
  home_user_img: {
    width: ws * 45,
    height: ws * 45,
    borderRadius: ws * 50,
    objectFit: 'cover'
  },
  home_user_name: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: ws * 20,
  },
  home_tool_btn: {
    width: ws * 45,
    height: ws * 45,
    marginLeft: ws * 15,
    borderRadius: ws * 40,
    backgroundColor: '#F5F5F5',
  },
  home_tool_icon: {
    width: ws * 18,
    height: ws * 18,
  },
  statistics: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: ws * 30,
  },
  statCard: {
    width: "48%",
    height: ws * 80,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ws * 15,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // elevation: 3,
    marginBottom: ws * 30,
  },
  statIcon: {
    width: ws * 50,
    height: ws * 50,
    marginRight: ws * 20,
  },
  statNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 13,
    color: "#777",
  },
  menuContainer: {
    width: "100%",
    marginTop: ws * 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: ws * 12,
    paddingHorizontal: ws * 15,
    marginBottom: ws * 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  menuIcon: {
    width: ws * 24,
    height: ws * 24,
    marginRight: ws * 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: ws * 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: ws * 15,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});