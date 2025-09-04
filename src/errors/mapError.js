import { AppError } from "./AppError";

export function mapError(error){
    if (error instanceof AppError){
        return {
            code:error.code,
            message:error.message,
            status:error.status
        }
    }
    return {
        code:'UNEXPECTED_ERROR',
        message:"An unexpected error has ocurred",
        status:500
    }
}