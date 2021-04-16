import mongoose from 'mongoose'

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    submitter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
    },
    priority: {
        type: String,
    },
    type: {
        type: String,
    },
    assignedDev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    }],
    submissionDate: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date
    },

})



export default mongoose.model('Ticket', TicketSchema)