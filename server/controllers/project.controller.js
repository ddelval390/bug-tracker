import Project from '../models/project.model.js';


const createProject = async (req, res) => {
    try {
        const project = new Project(req.body)
        await project.save()
        console.log('this is the project', project)
        return res.status(200).json({
            message: "Successfully created a new project!"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

const getProject = async (req, res) => {
    try {
        const project = new Project(req.body)
        await project.save()
        console.log('this is the project', project)
        return res.status(200).json({
            message: "Successfully created a new project!"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: err
        })
    }
}

export default {
    createProject,
    getProject,
}