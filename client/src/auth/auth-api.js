import axios from "axios";

const connUser = async (userData) => {
    await axios.post("/auth/conn", userData)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err.response)
        throw err;
    })


}

const cookieCheck = async () => {
    await axios.get("/auth/initauthcheck")
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log("[verify call]")
        console.log(err.response)
        throw err
    });
}

const logOut = () => {
    axios.get("/auth/logout")
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
        console.log(err.response);
    })
}

export {connUser, cookieCheck, logOut}