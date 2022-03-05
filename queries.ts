import Database from 'better-sqlite3'

const db = new Database('./reddit.db', {
    verbose: console.log
})

export const getUserToLogIn = db.prepare(`
    SELECT * FROM users WHERE email = ? AND password = ? 
`)

export const getUserById = db.prepare(`
    SELECT * FROM users WHERE id =?
`)

export const getUserByEmail = db.prepare(`
    SELECT * FROM users WHERE email = ?
`)
export const getUserByUsername = db.prepare(`
    SELECT * FROM users WHERE user_name =?
`)
export const createUser = db.prepare(`
    INSERT INTO users (user_name,email,password) VALUES (?,?,?)
`)

export const getSubredditById = db.prepare(`
    SELECT * FROM subreddits WHERE id = ?
`)

export const getPosts = db.prepare(`
    SELECT posts.id,users.user_name,posts.title,posts.content,posts.createdAt, subreddits.name as 'subreddit'
    FROM users JOIN posts ON users.id = posts.userId 
    JOIN subreddits ON subreddits.id = posts.subredditId;
`)

export const getPostById = db.prepare(`
    SELECT posts.id,users.user_name,posts.title,posts.content,posts.createdAt, subreddits.name as 'subreddit'
    FROM users JOIN posts ON users.id = posts.userId 
    JOIN subreddits ON subreddits.id = posts.subredditId 
    WHERE posts.id = ?;
`)

export const getPostByUserIdAndId = db.prepare(`
    SELECT * FROM posts WHERE userId = ? AND id = ?
`)

export const getPostCommentsNumber = db.prepare(`
SELECT COUNT(*) as 'number' FROM comments JOIN posts ON comments.postId = posts.id WHERE posts.id = ?;
`)

export const getPostDownvotes = db.prepare(`
    SELECT COUNT(*) as 'down_votes'
    FROM  postsDownvoted JOIN posts ON postsDownvoted.postId = posts.id
    WHERE posts.id = ?
`)
export const getPostUpvotes = db.prepare(`
    SELECT COUNT(*) as up_votes
    FROM postsUpvoted JOIN posts ON postsUpvoted.postId = posts.id
    WHERE posts.id = ?
`)
export const createPost = db.prepare(`
    INSERT INTO posts (userId,subredditId,title,content,createdAt) VALUES (?,?,?,?,?)
`)

export const getSubreddits = db.prepare(`
    SELECT * FROM subreddits;
`)

export const getSubredditByName = db.prepare(`
    SELECT * FROM subreddits WHERE name =?
`)

export const createSubreddit = db.prepare(`
    INSERT INTO subreddits (name,description,background) VALUES (?,?,?)
`)

export const getPostUpVoteById = db.prepare(`
    SELECT * FROM postsUpvoted WHERE id = ?
`)

export const getPostUpVoteByUser = db.prepare(`
    SELECT * FROM postsUpvoted WHERE userId = ? AND postId = ?
`)
export const getPostDownVoteById = db.prepare(`
    SELECT * FROM postsDownvoted WHERE id = ?
`)
export const getPostDownVoteByUser = db.prepare(`
    SELECT * FROM postsDownvoted WHERE userId = ? AND postId = ?
`)
export const deletePostDownVoteByUser = db.prepare(`
    DELETE FROM postsDownvoted WHERE userId = ? AND postId = ?
`)

export const createPostUpVote = db.prepare(`
    INSERT INTO postsUpvoted  (userId,postId) VALUES (?,?)
`)

export const deletePostUpVoteByUser = db.prepare(`
    DELETE FROM postsUpvoted WHERE userId = ? AND postId = ?
`)

export const createPostDownVote = db.prepare(`
    INSERT INTO postsDownvoted (userId, postId) VALUES (?,?)
`)