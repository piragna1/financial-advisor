export const validRegisterInput = {
  email: 'gonzalo@example.com',
  password: 'SuperSecure123!',
  firstName: 'Gonzalo',
  lastName: 'Rodríguez',
};

export const invalidRegisterInputs = {
  missingEmail: {
    password: 'SuperSecure123!',
    firstName: 'Gonzalo',
    lastName: 'Rodríguez',
  },
  shortPassword: {
    email: 'gonzalo@example.com',
    password: '123',
    firstName: 'Gonzalo',
    lastName: 'Rodríguez',
  },
  nameWithNumbers: {
    email: 'gonzalo@example.com',
    password: 'SuperSecure123!',
    firstName: 'G0nzalo',
    lastName: 'Rodríguez2',
  },
  emptyFields: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  },
};
