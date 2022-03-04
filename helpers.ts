import { UserData, UserLogin } from "./types"


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
