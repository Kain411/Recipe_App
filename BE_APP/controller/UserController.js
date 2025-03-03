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
            return users
        } 
        catch (error) {
            console.error(error);
            return [];
        }
    }

    async addNewUser(user) {
        try {
           await db.collection("users").add(user);
           console.log("Success")
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
                user: query.docs[0].data(),
                message: "Đăng nhập thành công!"
            }
        }
        catch (error) {
            console.log(error)
            return {
                user: null,
                message: "Lỗi collection!"
            };
        }
    }
}

module.exports = UserController;