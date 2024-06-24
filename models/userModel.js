import mongoose from 'mongoose'
const userScheme = mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
}, {
    timestamps: true
}
)

const User = mongoose.model('User', userScheme);
export default User;