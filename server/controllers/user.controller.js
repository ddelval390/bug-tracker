import User from '../models/user.model.js'
import Project from '../models/project.model.js'
import Ticket from '../models/ticket.model.js'
import bcrypt from 'bcryptjs'

const getUsersByRole = async (req, res) => {
    try {
        const list = await User.find({ role: req.params.role }, 'name email').exec()
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
        if (req.user.role === 'Admin') {
            projects = await Project.find({}, { _id: 1, title: 1, description: 1 }).exec()
        } else {
            projects = await Project.find({ team: { _id: req.params.userId } }, { _id: 1, title: 1, description: 1 }).exec()
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

const getUserTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({$or: [{ submitter: req.user._id }, { assignedDev: req.user._id }]},  'title description type priority').exec()
        return res.status(200).json({
            message: "Successfully returned user tickets",
            tickets: tickets
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
        const list = await User.find({}, 'name email role').exec()
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


const findUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const returnUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Successfully returned a user",
            user: req.user,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}


const updateUser = async (req, res) => {
    try {
        console.log('this is the user', req.user)
        console.log('this is the body', req.body)
        Object.entries(req.body).map(([key, value]) => {
            if (key === 'password') {
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(value, salt, (err, hash) => {
                        if (err) throw err
                        req.user[key] = hash
                        req.user.save()
                    })
                })

            } else {
                req.user[key] = value
            }
        })
        await req.user.save()
        return res.status(200).json({
            message: "Successfully updated the user",
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
    getUserTickets,
    getAllUsers,
    findUser,
    returnUser,
    updateUser,
}