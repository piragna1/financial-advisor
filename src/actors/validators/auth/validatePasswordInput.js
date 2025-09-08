export function validatePasswordInput(password){
    const errors = {};
    if (!password){ errors.password.push("Password is required."); };
    if (password && typeof password !== "string") { errors.password.push("Password is required and must be a string"); }

    return errors;
}