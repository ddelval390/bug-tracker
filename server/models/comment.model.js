import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required',
    },
    text: {
        type: String,
        required: 'Comment text is required',
    },
    timePosted: {
        type: Date,
        default: Date.now
    }
})



export default mongoose.model('Comment', CommentSchema)