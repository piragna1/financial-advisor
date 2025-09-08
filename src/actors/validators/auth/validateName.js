export function validateName(name){
    const errors = [];
    if (!name){
        errors.push('Name is missing')
    }
    else {
        if (name.length < 2 || name.length > 35) {
            errors.push('The length of the name is not valid')
        }
        else if (typeof name === 'number'){
            errors.push('The must be a string')
        }
        for (const char of name) {
            if (!isNaN(char)) {
                errors.push('The name cannot contain characters!')
                break;
            }
        }
    }
    return errors;
}