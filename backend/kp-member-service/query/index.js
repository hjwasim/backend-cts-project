const query = {
    check_email_query: "select email from member where email = ?",
    registration_query: "insert into member (fname,lname,email,password) values (?)",
    check_user_query: "select id, password from member where email = ?",
    check_memberid_query: "select id,fname,lname,email from member where id = ?",
    check_caregiver_query: "select id from member_caregiver where member_id = ? and caregiver_id = ?",
    sim_caregiver_query: "select c.id as caregiver_id, m.fname, m.lname, m.email FROM member m INNER JOIN caregiver c on c.email = m.email where m.id = ? ",
    adv_caregiver_query: "select id,fname,lname,email from caregiver where lower(email) = lower(?) and lower(fname) = lower(?) and lower(lname) = lower(?)",
    create_caregiver_query: "insert into caregiver (fname,lname,email) values (?)",
    assign_caregiver_query: "insert into member_caregiver (member_id,caregiver_id) values (?)"
}

module.exports = query;