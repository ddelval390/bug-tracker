import axios from 'axios'

/**
 * Sends an api request to create a new project.
 * @param {object} projectData - An object containing the "title" and "description" of the project.
 * @returns Server response.
 */
const createProject = async (projectData) => {
    const response = await axios.post("/api/project", projectData)
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
    const response = await axios.delete(`/api/project/${projectId}`)
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
 * @param {object} cancelToken - Axios cancel token
 * @returns  Server response containing project data or error
 */
const getProject = async (projectId, cancelToken) => {
    const response = await axios.get(`/api/project/${projectId}`, {cancelToken: cancelToken})
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
    const response = await axios.post(`/api/project/${projectId}/team`, newTeam)
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
    updateTeam,
}