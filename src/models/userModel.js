const User = {
  id: String,               // Unique identifier
  name: String,             // Provided at sign-up
  lastName:String,          // Provided at sign-up
  email: String,            // Used for login and uniqueness
  passwordHash: String,     // Hashed password for security
  createdAt: Date,          // Timestamp of account creation
};
