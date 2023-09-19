
//search member controller
const search_member_controller = async (req, res) => {
  try {
    const member_id = req.params.member_id;
    console.log(member_id)
    const check_email_query = "select id,fname,lname,email from member where email = ?";
    conn.query(check_email_query, [email], (err, result) => {

    })

  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  search_member_controller,
};
