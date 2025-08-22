import { listUsers } from "../repositories/userRepo";

export async function checkUserUniqueness (email) {
    const users = await listUsers();
    return users.some(u => u.email === email);
}