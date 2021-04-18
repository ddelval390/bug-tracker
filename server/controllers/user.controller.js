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
        let parsedProjects = []
        let projects

        const user = await User.findOne({ _id: req.params.userId }, 'first_name last_name email role').exec()
        if (user.role === 'Project Manager') {
            projects = await Project.find({ manager: req.params.userId }, { _id: 0, title: 1, description: 1, manager: 1 }).exec()

            for (let project of projects) {

                await project.populate('manager', { _id: 0, first_name: 1, last_name: 1 }).execPopulate()

                let fullName = project.manager.first_name + ' ' + project.manager.last_name
                let parsedProject = {
                    title: project.title,
                    description: project.description,
                    manager: fullName
                }

                parsedProjects.push(parsedProject)

            }

        }

        return res.status(200).json({
            message: "Successfully returned user projects",
            projects: parsedProjects
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
    getUserProjects
}