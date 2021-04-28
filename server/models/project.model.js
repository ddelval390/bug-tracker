import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Project title is required'
    },
    description: {
        type: String,
        required: 'Project description is required'
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }]
})

ProjectSchema.pre('remove', async function (next) {
 
    if (this.tickets) {
        this.tickets.map((ticket) => {
            ticket.remove()
        })
    }

    if (this.comments) {
        this.comments.map((comment) => {
            comment.remove()
        })
    }
    next()
})

export default mongoose.model('Project', ProjectSchema)