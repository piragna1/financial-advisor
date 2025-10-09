export function updateFinancialProfileFields(profile,updates){
    const allowed = ['salary'];
    const sanitized = {};
    for (key of allowed){
        if (key in updates){
            sanitized[key] = updates[key];
        }
    };
    if (Object.keys(sanitized) === 0 )
        throw new Error('No valid financial fields to update');

    return {
        ...profile,
        ...sanitized,
        updatedAt:Date.now()
    };
};