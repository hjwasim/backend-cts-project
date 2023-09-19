const login_schema = {
    userid: {
        notEmpty: true,
        errorMessage: "User ID cannot be empty"
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty"
    },
}

const registration_schema = {

    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "The field should contain proper email."
    },
    password: {
        isStrongPassword: {
            minLength: 10,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 10 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    fname: {
        notEmpty: true,
        errorMessage: "First name should not be empty."
    },
    lname: {
        notEmpty: true,
        errorMessage: "Last name should not be empty."
    },
}

module.exports = {
    login_schema, registration_schema
}