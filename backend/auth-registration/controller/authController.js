const bcrypt = require("bcryptjs");
const conn = require('../config/db.config');
const jwt = require('jsonwebtoken');

//Registration controller
const registration_controller = async (req, res) => {
    try {
        const { email, password, fname, lname } = req.body;

        //validate email id
        const check_email_query = "select email from member where email = ?";
        conn.query(check_email_query, [email], (err, result) => {
            if (err) {
                throw err
            }
            if (result.length > 0) {
                return res.status(400).json({ message: "Email is already taken." });
            }
            //hash password
            const salt = bcrypt.genSaltSync(10);
            const hashed_password = bcrypt.hashSync(password, salt);

            //saving member into db
            const registration_query = "insert into member (fname,lname,email,password) values (?)"
            const registration_values = [fname, lname, email, hashed_password,];

            conn.query(registration_query, [registration_values], (err, result) => {
                if (err) {
                    return res.status(400).json({ message: "Registration not successfully!" });
                };
                return res.status(201).json({ insertedId: result.insertId, message: "Member registered successfully!" })
            });
        })

    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error" });
    }
};

//Login controller
const login_controller = async (req, res) => {
    try {
        const { userid, password } = req.body

        // checking User
        const check_user_query = "select id, password from member where email = ?";
        conn.query(check_user_query, [userid], (err, result) => {
            if (err) {
                throw err
            }
            // if no users
            if (result.length == 0) {
                return res.status(400).json({ message: 'No user available on this ID' });
            }
            // verify password
            bcrypt.compare(password, result[0].password, (err, pwd_result) => {
                if (err) return res.status(400).json({ message: 'Invalid credentials' })
                if (!pwd_result) return res.status(400).json({ message: 'Invalid credentials' })

                // all ok!
                let payload = {
                    id: result[0].id,
                    userid
                }
                const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '10h' })
                res.json({ ...payload, access_token })
            })
        })
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    registration_controller,
    login_controller
};
