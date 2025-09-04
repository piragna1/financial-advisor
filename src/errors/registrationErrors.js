export const REGISTRATION_ERRORS = {
    INVALID_INPUT: {
        code:'INVALID_INPUT',
        message:"Invalid input for registration",
        status:422
    },
    USER_EXISTS: {
        code:"USER_EXISTS",
        message:"User already exists",
        status:409
    },
    CREATION_FAILED:{
        code:"CREATION_FAILED",
        message:"An error has ocurred during registration",
        status:500
    }
}