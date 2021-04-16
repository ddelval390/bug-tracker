import axios from "axios";

const connUser = async (userData) => {
    const response = await axios.post("/auth/conn", userData)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })

    return response
}

const cookieCheck = async () => {
    const response = await axios.get("/auth/initauthcheck")
    .then(res => {
        return res
    })
    .catch(err => {
        console.log("[verify call]")
        console.log(err.response)
        throw err
    });

    return response
}

const logOut = () => {
    const response = axios.get("/auth/logout")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        console.log(err.response);
    })

    return response
}

export {connUser, cookieCheck, logOut}