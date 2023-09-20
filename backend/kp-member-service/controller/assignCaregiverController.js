const conn = require('../config/db.config');
const query = require('../query');

//assign member controller
const assign_member_controller = async (req, res) => {
    try {
        const member_id = req.params.member_id;
        const user_member_id = res.locals.user_member_id
        conn.query(query.check_memberid_query, [member_id], (err, memberid_result) => {
            if (err) {
                throw err
            }
            if (memberid_result.length == 0) {
                return res.status(400).json({ message: "Members not found on this ID." });
            }

            conn.query(query.check_caregiver_query, [user_member_id, member_id], (err, check_caregiver_result) => {
                if (err) {
                    throw err
                }
                if (check_caregiver_result.length > 0) {
                    return res.status(400).json({ message: "Caregiver already assigned!" });
                }

                // create caregiver
                const { id: member_id, fname, lname, email } = memberid_result[0];
                const create_caregiver_values = [fname, lname, email];
                conn.query(query.create_caregiver_query, [create_caregiver_values], (err, caregiver_result) => {
                    if (err) {
                        throw err;
                    }
                    // assign caregiver
                    const caregiver_id = caregiver_result.insertId;
                    const assign_caregiver_values = [user_member_id, caregiver_id];
                    conn.query(query.assign_caregiver_query, [assign_caregiver_values], (err, assign_caregiver_result) => {
                        if (err) {
                            throw err
                        }
                        res.status(201).json({ message: "Caregiver assigned successfully!" })
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