const MONGOURI = process.env.MONGOURI || 'mongodb://localhost:27017/bug-tracker'
const PORT = process.env.PORT || 5000
const SECRET = process.env.SECRET || 'very secret this is'


export {
    MONGOURI,
    PORT,
    SECRET,
}