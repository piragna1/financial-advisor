export const profile = {
  userId: String,              // FK to User model (uuid)
  firstName: String,
  lastName: String,
  birthDate: String,
  location: String || undefined,
  language: String || 'en',
  avatarUrl: String || undefined,
  bio: String,
  preferences: {
    theme: String || 'light',
    notifications: Boolean || true
  }
}