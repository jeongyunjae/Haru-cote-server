"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var cors = require("@koa/cors");
var dotenv = require("dotenv");
var path = require("path");
var bodyParser = require("koa-bodyparser");
var database_1 = require("./db/database");
var problem_1 = require("./routes/problem");
var koaBody = require('koa-body');
var morgan = require('koa-morgan');
var Router = require('koa-router');
dotenv.config({ path: path.join(__dirname, '../.env') });
var app = new Koa();
var api = new Router();
var PORT = process.env.PORT || 3080;
app.use(bodyParser());
app.proxy = true;
app.use(cors());
app.use(api.routes());
app.use(koaBody());
api.use('/api/v1', problem_1.default.routes());
database_1.client.connect().then(function () { return console.log('psql db connected'); });
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
}
else {
    app.use(morgan('dev'));
}
app.listen(PORT, function () {
    console.log("server is listening on port " + PORT);
});
//# sourceMappingURL=app.js.map