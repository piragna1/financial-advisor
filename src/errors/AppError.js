export class AppError extends Error{
    constructor({code='',message='',status=''},details=''){
        super(message);
        Object.assign(this, {code, status,details})
    }
}

