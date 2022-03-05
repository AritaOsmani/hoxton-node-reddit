import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import { checkLogInFields, checkPostFields, checkSignupFields, checkSubredditFields } from './helpers'


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

const getSubredditById = db.prepare(`
    SELECT * FROM subreddits WHERE id = ?
`)

const getPosts = db.prepare(`
    SELECT posts.id,users.user_name,posts.title,posts.content,posts.createdAt, subreddits.name as 'subreddit'
    FROM users JOIN posts ON users.id = posts.userId 
    JOIN subreddits ON subreddits.id = posts.subredditId;
`)

const getPostById = db.prepare(`
    SELECT posts.id,users.user_name,posts.title,posts.content,posts.createdAt, subreddits.name as 'subreddit'
    FROM users JOIN posts ON users.id = posts.userId 
    JOIN subreddits ON subreddits.id = posts.subredditId 
    WHERE posts.id = ?;
`)

const getPostCommentsNumber = db.prepare(`
SELECT COUNT(*) as 'number' FROM comments JOIN posts ON comments.postId = posts.id WHERE posts.id = ?;
`)

const getPostDownvotes = db.prepare(`
    SELECT COUNT(*) as 'down_votes'
    FROM  postsDownvoted JOIN posts ON postsDownvoted.postId = posts.id
    WHERE posts.id = ?
`)
const getPostUpvotes = db.prepare(`
    SELECT COUNT(*) as up_votes
    FROM postsUpvoted JOIN posts ON postsUpvoted.postId = posts.id
    WHERE posts.id = ?
`)
const createPost = db.prepare(`
    INSERT INTO posts (userId,subredditId,title,content,createdAt) VALUES (?,?,?,?,?)
`)

const getSubreddits = db.prepare(`
    SELECT * FROM subreddits;
`)

const getSubredditByName = db.prepare(`
    SELECT * FROM subreddits WHERE name =?
`)

const createSubreddit = db.prepare(`
    INSERT INTO subreddits (name,description,background) VALUES (?,?,?)
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

app.get('/posts', (req, res) => {
    const posts = getPosts.all()

    const upVotesNum = getPostUpvotes.get(1)
    const downVotesNum = getPostDownvotes.get(1)
    for (const post of posts) {
        const commentsNumber = getPostCommentsNumber.get(post.id)
        const upVotesNum = getPostUpvotes.get(post.id)
        const downVotesNum = getPostDownvotes.get(post.id)
        post.comments = commentsNumber.number
        post.votes = upVotesNum.up_votes - downVotesNum.down_votes
    }

    res.status(200).send(posts)
})

app.get(`/posts/:id`, (req, res) => {
    const id = req.params.id;
    const post = getPostById.get(id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.status(404).send({ error: 'Post not found!' })
    }
})

app.post('/posts', (req, res) => {
    const { userId, subredditId, title, content, createdAt } = req.body;
    const errors = checkPostFields(req.body)
    if (errors.length === 0) {
        const user = getUserById.get(userId)
        const subreddit = getSubredditById.get(subredditId)

        if (user && subreddit) {
            const result = createPost.run(userId, subredditId, title, content, createdAt)
            const newPost = getPostById.get(result.lastInsertRowid)
            res.status(200).send(newPost)
        } else {
            res.status(404).send({ error: 'User or subreddit not found!' })
        }
    } else {
        res.status(400).send(errors)
    }
})

app.get('/subreddits', (req, res) => {
    const subreddits = getSubreddits.all()
    res.status(200).send(subreddits)
})

app.get('/subreddits/:id', (req, res) => {
    const id = req.params.id;
    const match = getSubredditById.get(id)

    if (match) {
        res.status(200).send(match)
    } else {
        res.status(404).send({ error: 'Subreddit not found!' })
    }
})

app.post('/subreddits', (req, res) => {
    const { name, description, background } = req.body
    const errors = checkSubredditFields(req.body);

    if (errors.length === 0) {
        const subredditExists = getSubredditByName.get(name)
        if (subredditExists) {
            res.status(400).send({ error: 'This subreddit already exists' })
        } else {
            const result = createSubreddit.run(name, description, background)
            const newSubreddit = getSubredditById.get(result.lastInsertRowid)
            res.status(200).send(newSubreddit)
        }
    } else {
        res.status(400).send(errors)
    }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})