export function validateName(name){
    const errors = [];
    if (!name){
        errors.push('Name is missing')
    }
    else {
        if (name.length < 3 || name.length > 35) {
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
            if (typeof char ==='symbol'){
                errors.push('The name cannot contain symbols!')
                break;
            }
        }
    }
    return errors;
}

console.log(validateName(''))
console.log(validateName())
console.log(validateName('Go'))
console.log(validateName('Gon'))
console.log(validateName('Gon224zalo'))
console.log(validateName('Gonzalo'))
console.log(validateName('Gonzalo$'))
console.log(validateName('Gonzaloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'))