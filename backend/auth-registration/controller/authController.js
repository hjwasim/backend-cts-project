const bcrypt = require("bcryptjs");


//Registration controller
const registration_controller = async (req, res) => {
    try {
        const { email, password, fname, lname } = req.body;

        //validate email
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

//Login controller
const login_controller = async (req, res) => { 
    const { username, password } = req.body
    try {
        // checking User
        const user = {} //TODO
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        let payload = {
            id: user.id,
            username
        }

        const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30s' })
        //TODO
        res.json({ ...payload })

    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    registration_controller,
    login_controller
};
