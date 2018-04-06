
# GraphQL NodeJS and SQLite

**How To Run:**

1. Install NodeJs 
2. Clone this project ( git clone https://github.com/sreekanth-anubolu/graphql-node-sqlite.git )
2. >cd graphql-node-sqlite
3. >npm install
4. >cd database
5. >node dbClient.js (This would create SQLite DB to work with project.)
6. >cd ..
7. >npm run babelTranspile (Transpiles to es5 so that node can run with out any issues)
8. >npm run monitor


**After all the steps**
1. Open Browser
2. Navigate to http://localhost:5000/graphql
3. You would see a GQL Query Editor 

**Sample Queries to Test:**

========== Query 1 =============


{
  Organisations {
    id
    name
    location
  }
}


========== Query 2 =============


{
  Organisations(ids: [1, 2]) {
    id
    name
    location
  }
}


========== Query 3 =============


{
  Skills {
    id
    name
  }
}


========== Query 4 =============


{
	Users(ids: [1]) {
    id
    name
    email
    Organisations{
      id
      name
  		location
    }
    Skills{
      id
      name
    }
  }
}
