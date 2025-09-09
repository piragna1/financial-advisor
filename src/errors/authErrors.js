export const AuthErrors= {
    INVALID_INPUT:{
        code:"INVALID_INPUT",
        message:"Invalid email or password format",
        status:400
    },
    INVALID_CREDENTIALS:{
        code:"INVALID_CREDENTIALS",
        message:"Invalid email or password",
        status:401
    },
    MISSING_CREDENTIALS:{
        code:"MISSING_CREDENTIALS",
        message:"Email or password is missing",
        status:402
    },
    USER_NOT_FOUND:{
        code:"USER_NOT_FOUND",
        message:"User not found",
        status:404,
    },
    USER_EXISTS:{
        code:"USER_ALREADY_EXISTS",
        message:"That user is currently not available",
        status:409,
    }
}