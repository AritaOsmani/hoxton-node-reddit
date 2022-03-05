import { PostData, SubredditData, UserData, UserLogin } from "./types"


export function checkLogInFields(body: UserLogin) {
    const errors = []

    const exampleObject: UserLogin = {
        email: '',
        password: ''
    }

    for (const key in exampleObject) {

        if (typeof body[key as keyof UserLogin] !== typeof exampleObject[key as keyof UserLogin]) {

            errors.push(`${key} is missing or not a ${typeof exampleObject[key as keyof UserLogin]}`)
        }
    }
    return errors;
}

export function checkSignupFields(body: UserData) {
    const errors = []

    const exampleObject: UserData = {
        user_name: '',
        email: '',
        password: ''
    }

    for (const key in exampleObject) {
        if (typeof body[key as keyof UserData] !== typeof exampleObject[key as keyof UserData]) {
            errors.push(`${key} is missing or not a ${typeof exampleObject[key as keyof UserData]}`)
        }
    }

    return errors;
}

export function checkPostFields(body: PostData) {
    const errors = []

    const exampleObject: PostData = {
        userId: 0,
        subredditId: 0,
        title: '',
        content: '',
        createdAt: ''
    }

    for (const key in exampleObject) {
        if (typeof body[key as keyof PostData] !== typeof exampleObject[key as keyof PostData]) {
            errors.push(`${key} missing or not a ${typeof exampleObject[key as keyof PostData]}`)
        }
    }
    return errors
}

export function checkSubredditFields(body: SubredditData) {
    const errors = []
    const exampleObject: SubredditData = {
        name: '',
        description: '',
        background: ''
    }
    for (const key in exampleObject) {
        if (typeof body[key as keyof SubredditData] !== typeof exampleObject[key as keyof SubredditData]) {
            errors.push(`${key} missing or not a ${exampleObject[key as keyof SubredditData]}`)
        }
    }
    return errors;
}