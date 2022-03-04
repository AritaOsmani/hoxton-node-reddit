import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import { checkLogInFields, checkSignupFields } from './helpers'


const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000;

const db = new Database('./reddit.db', {
    verbose: console.log
})

const getUserToLogIn = db.prepare(`
    SELECT * FROM users WHERE email = ? AND password = ? 
`)

const getUserById = db.prepare(`
    SELECT * FROM users WHERE id =?
`)

const getUserByEmail = db.prepare(`
    SELECT * FROM users WHERE email = ?
`)
const getUserByUsername = db.prepare(`
    SELECT * FROM users WHERE user_name =?
`)
const createUser = db.prepare(`
    INSERT INTO users (user_name,email,password) VALUES (?,?,?)
`)

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const errors = checkLogInFields(req.body);
    if (errors.length === 0) {
        const user = getUserToLogIn.get(email, password)
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({ message: 'Email or password incorrect! Please try again.' })
        }
    } else {
        res.status(404).send(errors)
    }
})


app.post('/signup', (req, res) => {
    const { user_name, email, password } = req.body
    const errors = checkSignupFields(req.body)



    if (errors.length === 0) {
        const checkUserEmail = getUserByEmail.get(email)
        const checkUserUsername = getUserByUsername.get(user_name)

        console.log('email: ', checkUserEmail)
        console.log('username: ', checkUserUsername)
        if (checkUserEmail || checkUserUsername) {
            res.status(400).send('This user already exists!')
        }
        else {
            const user = createUser.run(user_name, email, password)
            if (user.changes !== 0) {
                const newUser = getUserById.get(user.lastInsertRowid)
                res.status(200).send(newUser)
            } else {
                res.status(400).send({ error: 'Something went wrong!' })
            }
        }
    }
    else {
        res.status(400).send(errors)
    }

})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})