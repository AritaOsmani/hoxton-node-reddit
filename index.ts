import express from 'express'
import cors from 'cors'

import { checkLogInFields, checkPostFields, checkPostVoteFields, checkSignupFields, checkSubredditFields } from './helpers'

import { createPost, createUser, getPostById, getPostCommentsNumber, getPostDownvotes, getPosts, getPostUpvotes, getSubredditById, getSubreddits, getUserByEmail, getUserById, getUserByUsername, getUserToLogIn, getSubredditByName, createSubreddit, getPostByUserIdAndId, getPostUpVoteByUser, createPostDownVote, createPostUpVote, deletePostDownVoteByUser, deletePostUpVoteByUser, getPostDownVoteById, getPostDownVoteByUser, getPostUpVoteById } from './queries'


const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000;



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

app.post('/postUpvote', (req, res) => {
    const { userId, postId } = req.body;
    const errors = checkPostVoteFields(req.body);

    if (errors.length === 0) {
        const userExists = getUserById.get(userId)
        const postExists = getPostById.get(postId)

        if (userExists && postExists) {
            const postUser = getPostByUserIdAndId.get(userId, postId) //check if this post belongs to the current user
            const alreadyVoted = getPostUpVoteByUser.get(userId, postId) //check if this user has already upvoted
            const alreadyDownvoted = getPostDownVoteByUser.get(userId, postId) // check if this user has downvoted the same post
            if (postUser) {
                res.status(400).send({ error: 'This post belongs to the user provided' })
            } else if (alreadyVoted) {
                res.status(400).send('You already upvoted this post!')
            } else if (alreadyDownvoted) {
                //delete the downvote and add the upvote
                const deletePostDownVote = deletePostDownVoteByUser.run(userId, postId)
                const result = createPostUpVote.run(userId, postId)
                const newUpVote = getPostUpVoteById.get(result.lastInsertRowid)
                res.status(200).send(newUpVote)
            } else {
                const result = createPostUpVote.run(userId, postId)
                const newUpVote = getPostUpVoteById.get(result.lastInsertRowid)
                res.status(200).send(newUpVote)
            }

        } else {
            res.status(404).send({ error: 'User or post not found!' })
        }

    } else {
        res.status(400).send(errors)
    }
})

app.post('/postDownvote', (req, res) => {
    const { userId, postId } = req.body
    const errors = checkPostVoteFields(req.body)
    const userExists = getUserById.get(userId)
    const postExists = getPostById.get(postId)

    if (errors.length === 0) {
        if (userExists && postExists) {
            const postUser = getPostByUserIdAndId.get(userId, postId) //check if the post belongs to this user
            const alreadyVoted = getPostDownVoteByUser.get(userId, postId) //check if the user already voted
            const alreadyUpvoted = getPostUpVoteByUser.get(userId, postId) //check if the user has upvoted the same post

            if (postUser) {
                res.status(400).send({ error: 'This post belongs to the user provided' })
            } else if (alreadyVoted) {
                res.status(400).send('You already downvoted this post!')
            } else if (alreadyUpvoted) {
                //delete the upvote and add the downvote
                const deletePostUpVote = deletePostUpVoteByUser.run(userId, postId)
                const result = createPostDownVote.run(userId, postId)
                const newDownVote = getPostDownVoteById.get(result.lastInsertRowid)
                res.status(200).send(newDownVote)
            } else {
                const result = createPostDownVote.run(userId, postId)
                const newDownVote = getPostDownVoteById.get(result.lastInsertRowid)
                res.status(200).send(newDownVote)
            }

        } else {
            res.status(404).send({ error: 'User or post does not exist!' })
        }
    } else {
        res.status(400).send(errors)
    }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})