import Project from '../models/project.model.js'
import io from '../socket.js'


const createProject = async (req, res) => {
    try {
        console.log(req.body)
        const project = new Project(req.body)
        await project.save()

        const filteredProject = {
            _id: project._id,
            title: project.title,
            description: project.description,
        }

        return res.status(200).json({
            message: "Successfully created a new project!",
            project: filteredProject,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        await req.project.remove()
        return res.status(200).json({
            success: 'Successfully deleted this project'
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const findProject = async (req, res, next) => {
    try {
        req.project = await Project.findOne({ _id: req.params.projectId }).exec()
        await req.project
            .populate('team', 'name email')
            .populate('tickets', { _id: 1, title: 1, description: 1, status: 1, type: 1, priority: 1 })
            .execPopulate()
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const returnProject = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Successfully returned a project",
            project: req.project,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}



const updateTeam = async (req, res) => {
    try {
        req.project.team = req.body
        await req.project.save()
        await req.project
            .populate('team')
            .execPopulate()

        io.getIO().to(req.params.projectId).emit('newTeam', req.project.team)
        return res.status(200).json({
            message: "Successfully updated the team",
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}



export default {
    createProject,
    deleteProject,
    findProject,
    returnProject,
    updateTeam,
}