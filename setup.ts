import Database from 'better-sqlite3'
import { commentDownvotes, comments, commentUpvotes, postDownvotes, posts, postUpVotes, subredditMembers, subreddits, users } from './setupData'

const db = new Database('./reddit.db', {
    verbose: console.log
})

const userData = users;
const subredditData = subreddits;
const memebers = subredditMembers;
const postData = posts;
const commentsData = comments;
const commentsUpvoteData = commentUpvotes;
const commentsDownvoteData = commentDownvotes;
const postsUpVoteData = postUpVotes;
const postsDownVoteData = postDownvotes;

const deleteTables = db.exec(`
    DROP TABLE IF EXISTS postsDownvoted;
    DROP TABLE IF EXISTS postsUpvoted;
    DROP TABLE IF EXISTS commentUpvote;
    DROP TABLE IF EXISTS commentDownvote;
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS subredditMembers;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS subreddits;
`)

const createTables = db.exec(`

    CREATE TABLE users (
        id INTEGER,
        user_name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        PRIMARY KEY(id),
        CHECK (user_name <> ''),
        CHECK (email <> ''),
        CHECK (password <> '')
    );

    CREATE TABLE subreddits(
        id INTEGER,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        background TEXT,
        PRIMARY KEY (id)
    );

    CREATE TABLE subredditMembers (
        id INTEGER,
        userId INTEGER NOT NULL,
        subredditId INTEGER NOT NULL,
        date TEXT,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (subredditId) REFERENCES subreddits(id) ON DELETE CASCADE
    );

    CREATE TABLE posts (
        id INTEGER,
        userId INTEGER NOT NULL,
        subredditId INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (subredditId) REFERENCES subreddits(id) ON DELETE CASCADE
    );

    CREATE TABLE comments(
        id INTEGER,
        userId INTEGER NOT NULL,
        postId INTEGER NOT NULL,
        content TEXT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE commentUpvote(
        id INTEGER,
        userId INTEGER NOT NULL,
        commentId INTEGER NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
    );
    CREATE TABLE commentDownvote(
        id INTEGER,
        userId INTEGER NOT NULL,
        commentId INTEGER NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
    );

    CREATE TABLE postsUpvoted(
        id INTEGER,
        userId INTEGER NOT NULL,
        postId INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE postsDownvoted(
        id INTEGER,
        userId INTEGER NOT NULL,
        postId INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    );

`)

const createUsers = db.prepare(`
    INSERT INTO users (user_name,email,password) VALUES (?,?,?)
`)

const createSubreddits = db.prepare(`
    INSERT INTO subreddits (name,description,background) VALUES (?,?,?)
`)
const createSubredditMembers = db.prepare(`
    INSERT INTO subredditMembers (userId,subredditId,date) VALUES (?,?,?)
`)
const createPosts = db.prepare(`
    INSERT INTO posts (userId,subredditId,title,content,createdAt) VALUES (?,?,?,?,?)
`)

const createComments = db.prepare(`
    INSERT INTO comments (userId,postId,content) VALUES (?,?,?)
`)

const createCommentUpVotes = db.prepare(`
    INSERT INTO commentUpvote (userId,commentId) VALUES (?,?)
`)

const createCommentDownVotes = db.prepare(`
    INSERT INTO commentDownvote (userId,commentId) VALUES (?,?)
`)

const createPostUpVotes = db.prepare(`
    INSERT INTO postsUpvoted (userId,postId) VALUES (?,?)
`)

const createPostDownVotes = db.prepare(`
    INSERT INTO postsDownvoted (userId,postId) VALUES (?,?)
`)


for (const user of userData) {
    createUsers.run(user.user_name, user.email, user.password)
}

for (const subreddit of subredditData) {
    createSubreddits.run(subreddit.name, subreddit.description, subreddit.background)
}

for (const member of memebers) {
    createSubredditMembers.run(member.userId, member.subredditId, member.date)
}

for (const post of postData) {
    createPosts.run(post.userId, post.subredditId, post.title, post.content, post.createdAt)
}

for (const comment of commentsData) {
    createComments.run(comment.userId, comment.postId, comment.content)
}

for (const commentUpvote of commentsUpvoteData) {
    createCommentUpVotes.run(commentUpvote.userId, commentUpvote.commentId)
}

for (const commentDownvote of commentsDownvoteData) {
    createCommentDownVotes.run(commentDownvote.userId, commentDownvote.commentId)
}

for (const postUpVote of postsUpVoteData) {
    createPostUpVotes.run(postUpVote.userId, postUpVote.postId)
}

for (const postDownVote of postsDownVoteData) {
    createPostDownVotes.run(postDownVote.userId, postDownVote.postId)
}