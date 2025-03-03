class UserModel {
    constructor(id, bg_url, url, username, email, gender, dob, phone, location) {
        this.id = id;
        this.bg_url = bg_url;
        this.url = url;
        this.username =  username;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.phone = phone;
        this.location = location
    }
}

module.exports = UserModel;