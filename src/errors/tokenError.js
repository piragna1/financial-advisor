const TokenErrors = {
    INVALID_HEADER:{
        code:"INVALID_TOKEN",
        message:'Invalid token',
        status:401
    },
    INVALID_PAYLOAD:{
        code:"INVALID_TOKEN",
        message:'Invalid token',
        status:401
    },
    INVALID_SIGNATURE:{
        code:"INVALID_TOKEN_SIGNATURE",
        message:'Invalid token',
        status:401
    },
    EXPIRED_TOKEN:{
        code:"TOKEN_EXPIRED",
        message:'Invalid token',
        status:401
    },
}