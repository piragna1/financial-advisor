import { listUsers } from "../repositories/userRepo";

export async function checkUserUniqueness (email) {
    const users = listUsers();
    return users.some(u => u.email === email);
}