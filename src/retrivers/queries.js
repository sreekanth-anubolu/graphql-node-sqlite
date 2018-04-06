
export const GET_USERS = "SELECT u.*, s.NAME as skillName, s.ID as skillID, o.NAME as orgName, o.ID as orgID, o.LOCATION as orgLocation FROM USER as u " + 
                        "inner join USER_ORGANISATIONS as uo on u.id = uo.user_id " + 
                        "inner join USER_SKILLS as us on u.id=us.user_id  left join SKILL as s on us.skill_id=s.id " +
                        "left join ORGANISATION as o on uo.organisation_id = o.id";
export const GET_ORGANISATIONS = "SELECT * FROM ORGANISATION";
export const GET_SKILLS = "SELECT * FROM SKILL";

