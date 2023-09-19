const conn = require('../config/db.config');

//assign member controller
const assign_member_controller = async (req, res) => {
    try {
        const { member_id, user_id: user_member_id } = req.body;

        const check_memberid_query = "select id,fname,lname,email from member where id = ?";
        conn.query(check_memberid_query, [member_id], (err, memberid_result) => {
            if (err) {
                throw err
            }
            if (memberid_result.length == 0) {
                return res.status(400).json({ message: "Members not found on this ID." });
            }

            const check_caregiver_query = "select id from member_caregiver where member_id = ? and caregiver_id = ?";
            conn.query(check_caregiver_query, [user_member_id, member_id], (err, check_caregiver_result) => {
                if (err) {
                    throw err
                }
                console.log(user_member_id, member_id)
                console.log(check_caregiver_result)
                if (check_caregiver_result.length > 0) {
                    return res.status(400).json({ message: "Caregiver already assigned!" });
                }

                // create caregiver
                const { id: member_id, fname, lname, email } = memberid_result[0];
                const create_caregiver_query = "insert into caregiver (fname,lname,email) values (?)"
                const create_caregiver_values = [fname, lname, email];
                conn.query(create_caregiver_query, [create_caregiver_values], (err, caregiver_result) => {
                    if (err) {
                        throw err;
                    }

                    // assign caregiver
                    const caregiver_id = caregiver_result.insertId;
                    const assign_caregiver_query = "insert into member_caregiver (member_id,caregiver_id) values (?)";
                    const assign_caregiver_values = [user_member_id, caregiver_id];
                    conn.query(assign_caregiver_query, [assign_caregiver_values], (err, assign_caregiver_result) => {
                        if (err) {
                            throw err
                        }
                        return res.status(201).json({ message: "Caregiver assigned successfully!" })
                    })
                })
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    assign_member_controller
}