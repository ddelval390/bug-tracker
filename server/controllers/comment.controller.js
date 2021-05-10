import Comment from '../models/comment.model.js'
import io from '../socket.js'

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
        const postedComment = req.ticket.comments.shift()
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
    findComment,
    postComment,
    deleteComment,
}
