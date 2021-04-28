import axios from 'axios'

/**
 * Sends an api request to create a new project.
 * @param {object} projectData - An object containing the "title" and "description" of the project.
 * @returns Server response.
 */
const createProject = async (projectData) => {
    const response = await axios.post("/api/projects", projectData)
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
 * Sends an api request to delete an existing project by project ID.
 * @param {string} projectId - The "_id" field of project to be deleted.
 * @returns  Server response.
 */
const deleteProject = async (projectId) => {
    const response = await axios.delete(`/api/projects/${projectId}`)
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
 * Sends an api request to return the a json of a project by project ID.
 * @param {string} projectId  - The "_id" field of the project to be returned.
 * @returns  Server response containing project data or error
 */
const getProject = async (projectId) => {
    const response = await axios.get(`/api/projects/${projectId}`)
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
    const response = await axios.post(`/api/projects/${projectId}/tickets`, ticket)
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
    const response = await axios.delete(`/api/projects/ticket/${ticketId}`)
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
 * Sends an api request to update the team of a project
 * @param {string} projectId - The "_id" field of the project to be updated
 * @param {array} newTeam - An array containing the "_id" fields of the users to be set as the new team.
 * @returns Server response
 */
const updateTeam = async (projectId, newTeam) => {
    const response = await axios.post(`/api/projects/${projectId}/team`, newTeam)
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
 * @returns Server response containing the ticket object.
 */
const getTicket = async (ticketId) => {
    const response = await axios.get(`/api/projects/ticket/${ticketId}`)
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
    const response = await axios.delete(`/api/projects/ticket/${ticketId}/comments/${commentId}`)
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
    const response = await axios.post(`/api/projects/ticket/${ticketId}/comments`, comment)
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
 * Sends an api request to update a ticket.
 * @param {string} ticketId - The "_id" field of the ticket to update.
 * @param {object} updatedTicket - Object containing the updated values for the ticket
 * @returns Server response
 */
const updateTicket = async (ticketId, updatedTicket) => {
    const response = await axios.patch(`/api/projects/ticket/${ticketId}`, updatedTicket)
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
    createProject,
    deleteProject,
    getProject,
    createTicket,
    deleteTicket,
    getTicket,
    updateTicket,
    postComment,
    deleteComment,
    updateTeam,
}