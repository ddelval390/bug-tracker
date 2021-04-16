import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Project name is required'
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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