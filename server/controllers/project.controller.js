import Project from '../models/project.model.js';
import Ticket from '../models/ticket.model.js'
import Comment from '../models/comment.model.js'

const createProject = async (req, res) => {
    try {
        const project = new Project(req.body)
        await project.save()
        console.log('this is the project', project)
        return res.status(200).json({
            message: "Successfully created a new project!"
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
        req.project = await Project.findOne({ title: req.params.title }).exec()
        await req.project
            .populate('team', { _id: 1, role: 1, first_name: 1, last_name: 1, email: 1 })
            .populate('tickets', { _id: 1, title: 1, description: 1, status: 1, type: 1, priority: 1, submissionDate: 1 })
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


const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body)
        await ticket.save()
        await req.project.tickets.push(ticket)
        await req.project.save()
        console.log('added ticket', req.project)
        return res.status(200).json({
            message: "Successfully created ticket",
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
        console.log('Updated team', req.project)
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

const findTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.ticketId })
        req.ticket = ticket
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const returnTicket = async (req, res) => {
    try {
        await req.ticket
            .populate('submitter')
            .populate('comments')
            .populate({ path: 'comments', populate: { path: 'user', model: 'User', select: { _id: 0, first_name: 1, last_name: 1 } } },)
            .execPopulate()
        return res.status(200).json({
            message: "Successfully found the ticket",
            ticket: req.ticket
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const updateTicket = async (req, res) => {
    try {
        const date = Date.now()
        Object.entries(req.body).map(([key, value]) => {
            if (req.ticket[key] !== value) {
                const history = {
                    property: key,
                    oldValue: req.ticket[key],
                    newValue: value,
                    dateChanged: date,
                }
                req.ticket.history.push({ ...history })
            }

            req.ticket[key] = value


        })
        console.log(req.ticket)
        await req.ticket.save()
        return res.status(200).json({
            message: "Successfully updated the ticket",
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const postComment = async (req, res) => {
    try {
        const comment = new Comment(req.body)
        await comment.save()
        req.ticket.comments.push(comment)
        await req.ticket.save()
        return res.status(200).json({
            message: "Successfully posted comment"
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
    findProject,
    returnProject,
    createTicket,
    findTicket,
    returnTicket,
    updateTicket,
    postComment,
    updateTeam,
}