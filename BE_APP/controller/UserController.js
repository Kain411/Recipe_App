const { db } = require("../firebase")

const UserModel = require("../model/UserModel");

class UserController {
    constructor() {}

    async getAllUser() {
        try {
            const snapshot = await db.collection('users').get();
            
            const users = [];
            snapshot.forEach((doc) => {
                users.push(new UserModel(
                    doc.id,
                    doc.data().bg_url,
                    doc.data().url,
                    doc.data().username,
                    doc.data().email,
                    doc.data().gender,
                    doc.data().dob,
                    doc.data().phone,
                    doc.data().location,
                ));
            });
            return {
                users: users,
                message: "Danh sách user!"
            };
        } 
        catch (error) {
            console.error(error);
            return {
                users: null,
                message: "Lỗi kết nối!"
            };
        }
    }

    async getUserByID(userID) {
        try {
            const userRef = await db.collection("users").doc(userID).get()

            return {
                user: {
                    id: userRef.id,
                    ...userRef.data()
                },
                message: "Tìm thấy user!"
            };
        }
        catch (error) {
            return {
                user: null,
                message: "Lỗi kết nối!"
            };
        }
    }

    async addNewUser(user) {
        try {
            const userStore = {
                bg_url: "https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg",
                url: "https://www.shutterstock.com/image-vector/profile-line-icon-user-outline-260nw-1283517448.jpg",
                username: "New User",
                email: user.email,
                gender: "",
                dob: "",
                phone: "",
                location: ""
            }

           await db.collection("users").add(userStore);
        }
        catch (error) {
            console.error(error)
        }
    }

    async getUserByEmail(email) {
        try {
           const userRef = db.collection("users");
           const query = await userRef.where("email", "==", email).get()

            if (query.empty) {
                return {
                    user: null,
                    message: "Không tìm thấy thông tin!"
                }
            }

            return {
                user: {
                    id: query.docs[0].id,
                    ...query.docs[0].data()
                },
                message: "Đăng nhập thành công!"
            };
        }
        catch (error) {
            return {
                user: null,
                message: "Lỗi collection!"
            };
        }
    }
    async updateUserByID(userID, userData) {
        try {
            const userRef = db.collection("users").doc(userID);
            const userSnapshot = await userRef.get();
    
            if (!userSnapshot.exists) {
                return { success: false, message: "User không tồn tại!" };
            }
    
            // Kiểm tra username trùng lặp
            if (userData.username !== userSnapshot.data().username) {
                const usernameQuery = await db.collection("users")
                    .where("username", "==", userData.username)
                    .get();
    
                if (!usernameQuery.empty) {
                    return { success: false, message: "Username đã tồn tại!" };
                }
            }
    
            // Kiểm tra email trùng lặp
            if (userData.email !== userSnapshot.data().email) {
                const emailQuery = await db.collection("users")
                    .where("email", "==", userData.email)
                    .get();
    
                if (!emailQuery.empty) {
                    return { success: false, message: "Email đã tồn tại!" };
                }
            }
    
            // Cập nhật thông tin user
            await userRef.update(userData);
            const updatedUser = await userRef.get();
    
            return {
                success: true,
                user: {
                    id: updatedUser.id,
                    ...updatedUser.data()
                },
                message: "Cập nhật user thành công!"
            };
        } catch (error) {
            return { success: false, message: "Lỗi kết nối!" };
        }
    }    
}

module.exports = UserController;