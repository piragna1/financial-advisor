export const ProfileErrors = {
  CREATE: {
    INVALID_INPUT: {
      code: "PROFILE_CREATE_INVALID_INPUT",
      message: "Profile must be a valid object",
      status: 400
    },
    INVALID_ID: {
      code: "PROFILE_CREATE_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    INVALID_USER_ID: {
      code: "PROFILE_CREATE_INVALID_USER_ID",
      message: "Missing or invalid user ID",
      status: 400
    },
    INVALID_FIRST_NAME: {
      code: "PROFILE_CREATE_INVALID_FIRST_NAME",
      message: "Missing or invalid first name",
      status: 400
    },
    INVALID_LAST_NAME: {
      code: "PROFILE_CREATE_INVALID_LAST_NAME",
      message: "Missing or invalid last name",
      status: 400
    },
    INVALID_BIO: {
      code: "PROFILE_CREATE_INVALID_BIO",
      message: "Missing or invalid bio",
      status: 400
    },
    CREATION_FAILED: {
      code: "PROFILE_CREATE_FAILED",
      message: "An error occurred while creating the profile",
      status: 500
    }
  },
  READ: {
    INVALID_ID: {
      code: "PROFILE_READ_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    NOT_FOUND: {
      code: "PROFILE_READ_NOT_FOUND",
      message: "Profile not found",
      status: 404
    }
  },
  UPDATE: {
    INVALID_INPUT: {
      code: "PROFILE_UPDATE_INVALID_INPUT",
      message: "Update payload must be a valid object",
      status: 400
    },
    INVALID_ID: {
      code: "PROFILE_UPDATE_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    NO_VALID_FIELDS: {
      code: "PROFILE_UPDATE_NO_VALID_FIELDS",
      message: "No valid fields to update",
      status: 422
    },
    NOT_FOUND: {
      code: "PROFILE_UPDATE_NOT_FOUND",
      message: "Profile not found",
      status: 404
    }
  },
  DELETE: {
    INVALID_ID: {
      code: "PROFILE_DELETE_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    NOT_FOUND: {
      code: "PROFILE_DELETE_NOT_FOUND",
      message: "Profile not found",
      status: 404
    }
  },
  USER_NOT_FOUND: {
    code: "PROFILE_USER_NOT_FOUND",
    message: "User not found",
    status: 404
  }
};

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach((val) => {
    if (typeof val === "object" && val !== null && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  });
}

deepFreeze(ProfileErrors);
