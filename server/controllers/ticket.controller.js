import Ticket from '../models/ticket.model.js'
import io from '../socket.js'

const createTicket = async (req, res) => {
    try {
        if (req.body.priority === '') {
            req.body.priority = 'none'
        }
        if (req.body.type === '') {
            req.body.type = 'bug'
        }
        const ticket = new Ticket(req.body)
        await ticket.save()
        await req.project.tickets.push(ticket)
        await req.project.save()

        const filteredTicket = {
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

const updateAssignedDev = (newUserId, oldUserId, req) => {
    User.findOne({ _id: newUserId }, 'name')
        .then(user => {
            history.newValue = user.name
        })
        .then(() => {
            if (!oldUserId) {
                history.oldValue = 'None'
            } else {
                return User.findOne({ _id: oldUserId }, 'name')
            }
        })
        .then((user) => {
            if (user) {
                history.oldValue = user.name
            }
        })
        .finally(() => {
            req.ticket.history.push({ ...history })
        })
}

const updateTicket = async (req, res) => {
    try {
        const date = Date.now()
        await Object.entries(req.body).map(([key, newValue]) => {
            if (req.ticket[key] !== newValue) {
                const oldValue = req.ticket[key]
                const history = {
                    property: key,
                    dateChanged: date,
                    newValue: newValue,
                    oldValue: oldValue
                }

                if (key === 'assignedDev') {
                    updateAssignedDev(newValue, oldValue, req)
                } else {
                    req.ticket.history.push({ ...history })
                }

                req.ticket[key] = newValue
            }
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

export default {
    createTicket,
    deleteTicket,
    findTicket,
    returnTicket,
    updateTicket,
}