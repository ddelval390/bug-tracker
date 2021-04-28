import axios from "axios"


/**
 * 
 * Connects existing users and creates new accounts for new users.
 * @param {object} userData - User object containing password, username, and , if creating new user, name
 */
const connUser = async (userData) => {
    const response = await axios.post("/auth/conn", userData)
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
 * Sends an api request to server to validate a user's cookie.  
 */
const authCheck = async () => {
    const response = await axios.get("/auth/authcheck")
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })

    return response
}

/**
 * Sends an api request to logout the user
 * 
 */
const logOut = () => {
    const response = axios.get("/auth/logout")
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
        })

    return response
}

export { connUser, authCheck, logOut }