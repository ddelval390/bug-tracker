import Project from '../models/project.model.js'
import Ticket from '../models/ticket.model.js'
import Comment from '../models/comment.model.js'
import io from '../socket.js'


const createProject = async (req, res) => {
    try {
        console.log(req.body)
        const project = new Project(req.body)
        await project.save()

        const filteredProject = {
            _id: project._id,
            title: project.title,
            project: project.description,
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
            .populate('tickets', {_id:1, title:1, description:1, status:1, type:1, priority:1})
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

        const filteredTicket ={
            _id: ticket._id,
            status: ticket.status,
            priority: ticket.priority,
            type: ticket.type,
            title: ticket.title,
            description: ticket.description,
        }

        io.getIO().to(req.params.projectId).emit('newTicket', filteredTicket)
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

const deleteTicket = async (req, res) => {
    try {
        await req.ticket.remove()
        return res.status(200).json({
            message: "Successfully deleted ticket",
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
            .populate({ path: 'comments', populate: { path: 'user', model: 'User', select: { _id: 1, name: 1 } } },)
            .populate('assignedDev')
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
        await req.ticket
            .populate('submitter')
            .populate('comments')
            .populate({ path: 'comments', populate: { path: 'user', model: 'User', select: { _id: 0, name: 1 } } },)
            .populate('assignedDev')
            .execPopulate()
        io.getIO().to(req.params.ticketId).emit('ticketUpdate', req.ticket)
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

const findComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.commentId })
        req.comment = comment
        next()
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
        req.ticket.comments.unshift(comment)
        await req.ticket.save()
        await req.ticket
            .populate('submitter')
            .populate('comments')
            .populate({ path: 'comments', populate: { path: 'user', model: 'User', select: { _id: 1, name: 1 } } },)
            .populate('assignedDev')
            .execPopulate()
        const postedComment  = req.ticket.comments.shift()
        io.getIO().to(req.params.ticketId).emit('newComment', postedComment)
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

const deleteComment = async (req, res) => {
    try {
        req.comment.remove()
        io.getIO().to(req.params.ticketId).emit('deleteComment', req.params.commentId)
        return res.status(200).json({
            success: 'Successfully deleted comment'
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
    createTicket,
    deleteTicket,
    findTicket,
    returnTicket,
    updateTicket,
    findComment,
    postComment,
    deleteComment,
    updateTeam,
}