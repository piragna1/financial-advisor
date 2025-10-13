export function buildProfileEntity(data){
    if (!data) throw new Error('User is missing.')
    if (!data.userId) throw new Error('User id missing.');
    const {
        userId,
        firstName = 'Dear',
        lastName = 'User',
        birthDate,
        location,
        language='en',
        avatarUrl,
        bio
    } = data;

    const profile = {
        userId,
        ...(firstName && {firstName}),
        ...(lastName && {lastName}),
        ...(birthDate && {birthDate}),
        ...(location && {location}),
        ...(language && {language}),
        ...(avatarUrl && {avatarUrl}),
        ...(bio && {bio})
    };
    return profile;
}