import axios from 'axios';

const getUsersByRole = async (role) => {
    const response = await axios.get(`/api/users/${role}`)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })

    return response
}
const getUserProjects = async (userId) => {
    const response = await axios.get(`/api/users/${userId}/projects`)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })

    return response
}
const getAllUsers = async () => {
    const response = await axios.get(`/api/users`)
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
    getUsersByRole,
    getUserProjects,
    getAllUsers,
}