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
}

module.exports = UserController;