export function buildProfileEntity(data){
    if (!data.userId) throw new Error('User id missing.');
    const {userId,firstName,lastName,birthDate,location,language,avatarUrl,bio} = data;
    const profile = {};
    //All fields are optional and have or not a default value.
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (birthDate) profile.birthDate = birthDate;
    if (location) profile.location = location;
    if (language) profile.language = language;
    if (avatarUrl) profile.avatarUrl = avatarUrl;
    if (bio) profile.bio = bio;
    return profile;
}