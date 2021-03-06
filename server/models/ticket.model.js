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
        default: 'open'
    },
    priority: {
        type: String,
        default: 'none',
    },
    type: {
        type: String,
        default: 'bug',
    },
    assignedDev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    history: [{
        property: {
            type: String,
        },
        oldValue: {
            type: String,
        },
        newValue: {
            type: String
        },
        dateChanged: {
            type: Date,
            default: Date.now
        }
    }],
    submissionDate: {
        type: Date,
        default: Date.now
    },
})



export default mongoose.model('Ticket', TicketSchema)