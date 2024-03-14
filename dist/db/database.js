"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var pg_1 = require("pg");
var env = process.env.NODE_ENV;
var config = require('../config/config')[env];
var dbAccount = {
    user: config.user,
    host: config.host,
    password: config.password,
    database: config.database,
    port: config.port,
};
exports.client = new pg_1.Pool(dbAccount);
var database = {
    client: exports.client,
};
exports.default = database;
//# sourceMappingURL=database.js.map