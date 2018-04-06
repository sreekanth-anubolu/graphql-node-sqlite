const sqlite3 = require('sqlite3').verbose(); 
const DB_PATH = "./database/database.db";

import { GET_ORGANISATIONS, GET_SKILLS, GET_USERS } from "./queries";

// open the database
const db = new sqlite3.Database(DB_PATH);

export function retriveUsers(ids) {
    let query = GET_USERS;
    if (ids.length > 0) {
        query += " WHERE u.ID IN ({q})".replace("{q}", ids.toString());
    }
    let users = {};
    // This is not efficient method to retrive the data. Worked it out to show GraphQL Demo
    return new Promise(function(resolve, reject) {
        db.all(query, [], (err, rows) => {
            if (err) {
                throw err;
                reject({"error": err});
            }
            rows.forEach((row) => {
                let user = users[row.ID];
                if (!user) {
                    user = {}
                }

                const orgs = user["Organisations"]
                const orgID = row["orgID"];
                if (orgs) {
                    if(!orgs[orgID]){
                        orgs[orgID] = {"id": row["orgID"], "name": row["orgName"], "location": row["orgLocation"]}
                    }
                } else {
                    if (orgID) {
                        const org = {};
                        org[orgID] = {"id": row["orgID"], "name": row["orgName"], "location": row["orgLocation"]}
                        user["Organisations"] = org;
                    }
                }

                const skills = user["Skills"]
                const skillID = row["skillID"];
                if (skills) {
                    if(!skills[skillID]) {
                        skills[skillID] = {"id": row["skillID"], "name": row["skillName"]}
                    }
                } else {
                    if (skillID) {
                        const skill = {};
                        skill[skillID] = {"id": row["skillID"], "name": row["skillName"]}
                        user["Skills"] = skill;
                    }
                }
                user["id"] = row["ID"];
                user["name"] = row["NAME"];
                user["email"] = row["EMAIL"];
                users[row.ID] = user;
            });

            users = Object.values(users);
            for (let usr of users) {
                if (usr["Organisations"]) {
                    usr["Organisations"] = Object.values(usr["Organisations"])
                }
                if (usr["Skills"]) {
                    usr["Skills"] = Object.values(usr["Skills"])
                }
            }
            resolve(users);
        });
    });
}

export function retriveOrganisations(ids) {
    let query = GET_ORGANISATIONS;
    if (ids.length > 0) {
        query += " WHERE ID IN ({q})".replace("{q}", ids.toString());
    }
    const organisations = [];
    return new Promise(function(resolve, reject) {
        db.all(query, [], (err, rows) => {
            if (err) {
                throw err;
                reject({"error": err});
            }
            rows.forEach((row) => {
                const organisation = {};
                for(const key in row) {
                    organisation[key.toLowerCase()] = row[key];
                }
                organisations.push(organisation);
            });
            resolve(organisations);
        });
    });
}

export function retriveSkills() {
    const skills = [];
    return new Promise(function(resolve, reject) {
        db.all(GET_SKILLS, [], (err, rows) => {
            if (err) {
                throw err;
                reject({"error": err});
            }
            rows.forEach((row) => {
                const skill = {};
                for(const key in row) {
                    skill[key.toLowerCase()] = row[key];
                }
                skills.push(skill);
            });
            resolve(skills);
        });
    });
}

 