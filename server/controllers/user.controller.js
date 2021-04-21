import User from '../models/user.model.js'
import Project from '../models/project.model.js';

const getUsersByRole = async (req, res) => {
    try {
        const list = await User.find({ role: req.params.role }, 'first_name last_name email').exec()
        return res.status(200).json({
            message: "Successfully created a new project!",
            userList: list
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const getUserProjects = async (req, res) => {
    try {
        let projects
        let parsedProjects = []

        const user = await User.findOne({ _id: req.params.userId }, 'first_name last_name email role').exec()
        if (user.role === 'Project Manager') {
            projects = await Project.find({}, { _id: 1, title: 1, description: 1}).exec()
        } else {
            projects = await Project.find({team: {_id: req.params.userId}}, { _id: 1, title: 1, description: 1}).exec()
        }
        return res.status(200).json({
            message: "Successfully returned user projects",
            projects: projects
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const list = await User.find({},'first_name last_name email').exec()
        return res.status(200).json({
            message: "Successfully created a new project!",
            userList: list
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

export default {
    getUsersByRole,
    getUserProjects,
    getAllUsers,
}