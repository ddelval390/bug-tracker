import axios from 'axios'

/**
 * Sends an api request to get a list of users by role.
 * @param {string} role - The desired "role" field to filter users by.
 * @returns Server response containing a list of users filtered by role.
 */
const getUsersByRole = async (role) => {
    const response = await axios.get(`/api/users/role/${role}`)
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
 * Sends an api request to retrieve a user's projects.
 * @param {string} userId - The "_id" field of the requested user
 * @param {object} cancelToken - Axios cancel token.
 * @returns Server response containing list of projects where the user is in the team, the assigned dev, or submitter.
 */
const getUserProjects = async (userId, cancelToken) => {
    const response = await axios.get(`/api/users/user/${userId}/projects`,{cancelToken: cancelToken})
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
 * Sends an api request to return relevant tickets to the user.
 * @param {string} userId - The "_id" field of the user.
 * @param {object} cancelToken - Axios cancel token.
 * @returns Server response containing an array of the users tickets.
 */
const getUserTickets = async (userId, cancelToken) => {
    const response = await axios.get(`/api/users/user/${userId}/tickets`, cancelToken)
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
 * Sends an api request to get all users in the database.
 * @param cancelToken - Axios cancel token.
 * @returns Server response returning an array containing user objects of all users.
 */
const getAllUsers = async (cancelToken) => {
    const response = await axios.get(`/api/users`, {cancelToken: cancelToken})
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
 * Sends an api request to retrieve a user object.
 * @param {string} userId - The "_id" field of the user to retrieve.
 * @returns Server response containing the user object
 */
const getUser = async (userId) => {
    const response = await axios.get(`/api/users/user/${userId}`)
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
 * Send an api request that will update a user's values.
 * @param {string} userId - The "_id" field of the user to update
 * @param {object} userUpdates - Object containing new user values
 * @returns 
 */
const updateUser = async (userId, userUpdates) => {
    const response = await axios.patch(`/api/users/user/${userId}`, userUpdates)
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
    getUsersByRole,
    getUserProjects,
    getUserTickets,
    getAllUsers,
    getUser,
    updateUser,
}