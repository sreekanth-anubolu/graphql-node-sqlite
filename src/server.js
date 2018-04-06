import { executableSchemaFromModules, loadDocument } from '@creditkarma/graphql-loader';
import cors from 'cors';
import express from 'express';
import graphQLHTTP from 'express-graphql';

import { QueryResolvers } from './resolvers/query-resolver';

const server = {
    "host": "localhost",
    "port": 5000,
    "endpoint": "/graphql"
}

let fs = require('fs');
const DB_PATH = "./database/database.db";
let dbExists = fs.existsSync(DB_PATH);
if (!dbExists) {
  console.log("SQLITE DB IS MISSING - CREATE DB BY RUNNING dbClient.js IN DATABASE DIRECTORY");
  throw new Error("SQLITE DB MISSING")
  process.exit(0);
}

const SIGNAL_SIGTERM = "SIGTERM";
const app = express();

_outputSystemSettings();

const modules = [
  () => loadDocument('./schema/*.graphql').then((document) => ({document, resolvers: QueryResolvers})),
];

executableSchemaFromModules(modules).then(schema => {
  console.log("|  SCHEMA LOAD STATUS: TRUE  |");
  startServer(schema);
});

function _outputSystemSettings() {
  console.log("");
  console.log(" ----------------------------");
  console.log("|    ***  SYSTEM INFO  ***   |");
  console.log(" ----------------------------");
  console.log("|  SERVER PORT: " + server.port + "         |");
  console.log("|  SERVER URL PATH: " + server.endpoint + " |");
}
function startServer(schema) {

  let corsOptions = {
    "origin": '*',
    "methods": "POST,GET",
    "credentials": true
  };

  app.use(server.endpoint, cors(corsOptions),
    graphQLHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(server.port);
  console.log("|  SERVER STATUS: STARTED    |");
  console.log(" ---------------------------- ");

  process.on(SIGNAL_SIGTERM, () => {
    process.exit(0);
  });
}
