const validEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
const User = require("../models/user");

class UserService {

    async createUser(userDetails) {
        const { email, name, password } = userDetails;
        if (email === undefined || email === null || email.trim().length === 0) {
            throw new Error("Email cannot be empty");
        }
        if (!validEmail(email)) {
            throw new Error("Email is not in proper format");
        }
        if (name === undefined || name === null || name.trim().length === 0) {
            throw new Error("First name cannot be empty");
        }
        if (password === undefined || password === null || password.trim().length === 0) {
            throw new Error("Password cannot be empty");
        }
        if (password.trim().length < 6) {
            throw new Error("Password must be of 6 characters");
        }
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail !== null) {
            throw new Error("Email is already in use")
        }
        const user = new User(userDetails);
        await user.save();
        return {
            user
        };
    }

    async loginUser(userDetails) {
        const { email, password } = userDetails;
        if (email === undefined || email === null) {
            throw new Error("Email is required");
        }
        if (password === undefined || password === null) {
            throw new Error("Password is required");
        }
        const user = await this.getUserByEmail(email);
        if (user === null) {
            throw new Error("This email is not associated to any account");
        }
        if (user.password !== password) {
            throw new Error("Password is incorrect");
        }
        return {user}
    }

    async getUserByEmail(email) {
        return User.findOne({ email });
    }

}

module.exports = new UserService;