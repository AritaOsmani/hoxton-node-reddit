export type User = {
    id: number,
    user_name: string,
    email: string,
    password: string
}

export type Subreddit = {
    id: number,
    name: string,
    description: string,
    background: string
}

export type SubredditMember = {
    id: number,
    userId: number,
    subredditId: number,
    date: string
}

export type Post = {
    id: number,
    userId: number,
    subredditId: number,
    title: string,
    content: string,
    createdAt: string
}

export type Comment = {
    id: number,
    userId: number,
    postId: number,
    content: string
}

export type CommentUpvote = {
    id: number,
    userId: number,
    commentId: number
}

export type CommentDownvote = {
    id: number,
    userId: number,
    commentId: number
}

export type PostUpvoted = {
    id: number,
    userId: number,
    postId: number
}

export type PostDownvoted = {
    id: number,
    userId: number,
    postId: number
}

export type UserData = Omit<User, "id">
export type UserLogin = Omit<User, "id" | "user_name">
export type SubredditData = Omit<Subreddit, "id">
export type SubredditMemberData = Omit<SubredditMember, "id">
export type PostData = Omit<Post, "id">
export type CommentData = Omit<Comment, "id">
export type CommentUpvoteData = Omit<CommentUpvote, "id">
export type CommentDownvoteData = Omit<CommentDownvote, "id">
export type PostUpvotedData = Omit<PostUpvoted, "id">
export type PostDownvotedData = Omit<PostDownvoted, "id">