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



export {
    createProject,
    
}