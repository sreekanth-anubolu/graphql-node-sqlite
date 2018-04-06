let sqlite3     = require('sqlite3').verbose();
let fs          = require('fs');

// Setup database:
let dbFile = './database.db';
let dbExists = fs.existsSync(dbFile);

let db;


function createDB() {
    if (!dbExists) {
        console.log("CREATING DB")
        db = new sqlite3.Database('database.db', createTables);
    }
}

function createTables() {
    console.log("CREATING TABLES");
    db.run("CREATE TABLE USER( ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, EMAIL TEXT NOT NULL);", insertUsers);
    db.run("CREATE TABLE ORGANISATION( ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, LOCATION TEXT NOT NULL);", insertOrganiations);
    db.run("CREATE TABLE SKILL ( ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);", insertSkills);
    db.run("CREATE TABLE USER_SKILLS( ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_ID INTEGER NOT NULL, SKILL_ID INTEGER NOT NULL);", insertUserSkills);
    db.run("CREATE TABLE USER_ORGANISATIONS( ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_ID INTEGER NOT NULL, ORGANISATION_ID INTEGER NOT NULL);", insertUserOrganisations);
}

function insertUsers() {
    console.log("INSERTING USERS");
    db.run("INSERT INTO USER(NAME, EMAIL) VALUES('John', 'john@gmail.com');");
    db.run("INSERT INTO USER(NAME, EMAIL) VALUES('Robert', 'robert@gmail.com');");
    db.run("INSERT INTO USER(NAME, EMAIL) VALUES('Rahim', 'rahim@gmail.com');");
    db.run("INSERT INTO USER(NAME, EMAIL) VALUES('Sathyam', 'sathyam@gmail.com');");
    db.run("INSERT INTO USER(NAME, EMAIL) VALUES('Shivam', 'shivam@gmail.com');");
}

function insertOrganiations() {
    console.log("INSERTING ORGANISATIONS");
    db.run("INSERT INTO ORGANISATION(NAME, LOCATION) VALUES('Google', 'Bangalore');");
    db.run("INSERT INTO ORGANISATION(NAME, LOCATION) VALUES('Microsoft', 'Hyderbad');");
    db.run("INSERT INTO ORGANISATION(NAME, LOCATION) VALUES('Uber', 'Delhi');");
    db.run("INSERT INTO ORGANISATION(NAME, LOCATION) VALUES('Amazon', 'Chennai');");
    db.run("INSERT INTO ORGANISATION(NAME, LOCATION) VALUES('Netflix', 'Bangalore');");
}

function insertSkills() {
    console.log("INSERTING SKILLS");
    db.run("INSERT INTO SKILL(NAME) VALUES('C');");
    db.run("INSERT INTO SKILL(NAME) VALUES('C++');");
    db.run("INSERT INTO SKILL(NAME) VALUES('Java');");
    db.run("INSERT INTO SKILL(NAME) VALUES('Python');");
    db.run("INSERT INTO SKILL(NAME) VALUES('C#');");
}

function insertUserSkills() {
    console.log("INSERTING USER SKILLS");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(1, 2);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(1, 3);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(1, 4);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(2, 1);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(2, 3);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(2, 2);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(3, 4);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(3, 1);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(4, 2);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(4, 3);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(5, 1);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(5, 2);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(5, 3);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(5, 4);");
    db.run("INSERT INTO USER_SKILLS(USER_ID, SKILL_ID) VALUES(5, 5);");
}

function insertUserOrganisations() {
    console.log("INSERTING USESR ORGANISATIONS");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(1, 2);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(1, 1);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(2, 5);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(3, 2);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(4, 4);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(5, 3);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(5, 1);");
    db.run("INSERT INTO USER_ORGANISATIONS(USER_ID, ORGANISATION_ID) VALUES(5, 2);");
}

createDB();