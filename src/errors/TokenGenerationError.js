import { AppError } from "./AppError.js";

export class TokenGenerationError extends AppError {
    constructor({code,message,status},details=''){
        super({code,message,status},details);
    }
}