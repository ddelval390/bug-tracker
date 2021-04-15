import mongoose from 'mongoose';

const ThirdPartyProviderSchema = new mongoose.Schema({
    provider_name: {
        type: String,
        default: null,
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default:null
    }
})

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: 'First Name is required'
    },
    last_name: {
        type: String,
        trim: true,
        required: 'Last Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        // match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: "Password is required"
    },
    third_party_auth: [ThirdPartyProviderSchema],
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model("users", UserSchema);
export default User;