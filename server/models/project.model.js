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



export default mongoose.model('Project', ProjectSchema)