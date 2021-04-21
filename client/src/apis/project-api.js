import axios from 'axios';

const createProject = async (projectData) => {
    const response = await axios.post("/api/projects", projectData)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err;
        })

    return response
}

const getProject = async (projectId) => {
    const response = await axios.get(`/api/projects/${projectId}`)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err;
        })

    return response
}

const createTicket = async (projectTitle, ticket) => {
    const response = await axios.post(`/api/projects/${projectTitle}/tickets`, ticket)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err.response)
            throw err;
        })

    return response
}
const updateTeam = async(projectTitle, newTeam) => {
    const response = await axios.post(`/api/projects/${projectTitle}/team`, newTeam)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })

return response
}

const getTicket = async(ticketId) => {
    const response = await axios.get(`/api/projects/ticket/${ticketId}`)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })
    return response
}

const postComment = async(ticketId, comment) => {
    const response = await axios.post(`/api/projects/ticket/${ticketId}/comments`, comment)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })
    return response
}

const updateTicket = async(ticketId, ticket) => {
    const response = await axios.patch(`/api/projects/ticket/${ticketId}`, ticket)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })
    return response
}


export {
    createProject,
    getProject,
    createTicket,
    getTicket,
    updateTicket,
    postComment,
    updateTeam,
}