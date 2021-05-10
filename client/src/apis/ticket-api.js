import axios from 'axios'

/**
 * Sends an api request to update a ticket.
 * @param {string} ticketId - The "_id" field of the ticket to update.
 * @param {object} updatedTicket - Object containing the updated values for the ticket
 * @returns Server response
 */
 const updateTicket = async (ticketId, updatedTicket) => {
    const response = await axios.patch(`/api/ticket/${ticketId}`, updatedTicket)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err
        })
    return response
}


/**
 * Sends an api request to submit a ticket to a project.
 * @param {string} projectId - The "_id" field of the project that will recieve the ticket.
 * @param {object} ticket - The ticket object containing the tickets "title", "description", "priority", and "type"
 * @returns Server response
 */
 const createTicket = async (projectId, ticket) => {
    const response = await axios.post(`/api/project/${projectId}/tickets`, ticket)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err
        })

    return response
}

/**
 * Sends an api request to delete a ticket.
 * @param {string} ticketId - The "_id" field of the ticket to be deleted
 * @returns Server response
 */
 const deleteTicket = async (ticketId) => {
    const response = await axios.delete(`/api/ticket/${ticketId}`)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err
        })
    return response
}


/**
 * Sends an api request to retrieve a ticket.
 * @param {string} ticketId - The "_id" field of the project to return.
 * @param {object} cancelToken - Axios cancel token.
 * @returns Server response containing the ticket object.
 */
 const getTicket = async (ticketId, cancelToken) => {
    const response = await axios.get(`/api/ticket/${ticketId}`, {cancelToken: cancelToken})
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err
        })
    return response
}

/**
 * Sends an api request to delete a comment from a ticket.
 * @param {string} commentId - The "_id" field of the comment to be deleted.
 * @param {string} ticketId - The "_id" field of the ticket where the comment is located.
 * @returns Server response
 */
 const deleteComment = async (commentId, ticketId) => {
    const response = await axios.delete(`/api/ticket/${ticketId}/comments/${commentId}`)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err
        })
    return response
}

/**
 * Sends an api request to post a comment on a ticket.
 * @param {string} ticketId - The "_id" field of the ticket to post the comment on.
 * @param {object} comment - Object containing the comment "user" and "text"
 * @returns Server response
 */
const postComment = async (ticketId, comment) => {
    const response = await axios.post(`/api/ticket/${ticketId}/comments`, comment)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err
        })
    return response
}


export {
    createTicket,
    deleteTicket,
    getTicket,
    updateTicket,
    postComment,
    deleteComment,
}
