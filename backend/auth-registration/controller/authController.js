const bcrypt = require("bcryptjs");

const registration_controller = async (req, res) => {
    try {
        const { email, password, fname, lname } = req.body;

        // Validate email
        let emailTaken = await check_email(email); //TODO
        if (emailTaken)
            return res.status(400).json({ message: "Email is already taken." });

        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(password, salt);

        //storing
        //TODO

    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    registration_controller,
};
