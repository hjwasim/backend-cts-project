export const Validator = (errors) => {
    if (errors["fname"]) {
        if (errors["fname"]?.type === "required") {
            return "First name is Required";
        }
    } else if (errors["lname"]) {
        if (errors["lname"]?.type === "required") {
            return "Last name is Required";
        }
    } else if (errors["userid"]) {
        if (errors["userid"]?.type === "required") {
            return "User ID is Required";
        }
        if (errors["userid"]?.type === "pattern") {
            return "Email address must be a valid address";
        }
    } else if (errors["email"]) {
        if (errors["email"]?.type === "required") {
            return "Email ID is Required";
        }
        if (errors["email"]?.type === "pattern") {
            return "Email address must be a valid address";
        }
    } else if (errors["password"]) {
        if (errors["password"]?.type === "required") {
            return "Password is Required";
        }
        if (errors["password"]?.type === "pattern") {
            return "Password should be minimum 10 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
        }
    }
    return undefined;
};
