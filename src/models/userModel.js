const User = {
  id: String,               // Unique identifier
  name: String,             // Provided at sign-up
  lastName:String,
  email: String,            // Used for login and uniqueness
  passwordHash: String,     // Hashed password for security
  createdAt: Date,          // Timestamp of account creation
};
