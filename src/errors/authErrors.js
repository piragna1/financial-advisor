export const AuthErrors= {
    INVALID_INPUT:{
        code:"INVALID_INPUT",
        message:"Invalid email or password format",
        status:400
    },
    USER_NOT_FOUND:{
        code:"USER_NOT_FOUND",
        message:"User not found",
        status:404,
    },
    INVALID_CREDENTIALS:{
        code:"INVALID_CREDENTIALS",
        message:"Invalid email or password",
        status:401
    },
    USER_EXISTS:{
        code:"USER_ALREADY_EXISTS",
        message:"That user is currently not available",
        status:409,
    }
}