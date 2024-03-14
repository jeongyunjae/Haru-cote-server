"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var problemCtrlMain = require("./controll.main");
var Router = require('koa-router');
var problem = new Router();
problem.get('/problem/this-week', problemCtrlMain.getThisWeekProblem);
problem.post('/problem/this-week', problemCtrlMain.postThisWeekProblem);
exports.default = problem;
//# sourceMappingURL=index.js.map