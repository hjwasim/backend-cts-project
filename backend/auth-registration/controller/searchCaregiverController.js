const conn = require('../config/db.config');
const query = require('../query');

//search member controller
const simple_search_member_controller = async (req, res) => {
  try {
    const member_id = parseInt(req.params.member_id);
    const user_member_id = res.locals.user_member_id;

    if (user_member_id == member_id) return res.status(400).json({ message: "You cannot search your own member ID." });

    conn.query(query.sim_caregiver_query, [member_id], (err, result) => {
      if (err) {
        throw err
      }
      if (result.length == 0) {
        return res.status(400).json({ message: "No caregivers found on this ID." });
      }
      res.status(201).json({ results: { ...result[0] } })
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

const advance_search_member_controller = async (req, res) => {
  try {
    const { email, fname, lname } = req.body;

    conn.query(query.adv_caregiver_query, [email, fname, lname], (err, result) => {
      if (err) {
        throw err
      }
      if (result.length == 0) {
        return res.status(400).json({ message: "No caregivers found on this ID." });
      }
      res.status(201).json({ results: { ...result[0] } })
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  simple_search_member_controller,
  advance_search_member_controller
};
