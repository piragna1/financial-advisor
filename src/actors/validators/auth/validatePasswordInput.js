export function validatePasswordInput(password){
    const errors = [];
    if (!password){ errors.push("Password is required."); }
    else{
        if (typeof password !== "string") { errors.push("Password must be a string"); }
        else if (password.length <= 3) errors.push('Password is too short!');
    }
    return errors;
}