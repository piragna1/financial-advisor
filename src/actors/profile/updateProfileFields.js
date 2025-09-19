export function updateProfileFields(profile,updates){
    const allowed = ['firstName', 'lastName', 'birthDate','location','language','avatarUrl','bio'];
    const sanitized = {};
    for (const key of allowed){
        if (key in updates){
            sanitized[key] = updates[key];
        }
    }
    if (Object.keys(sanitized).length === 0)
        throw new Error("No valid fields to update.");
    return {
        ...profile,
        ...sanitized,
        updatedAt:Date.now()
    }
}