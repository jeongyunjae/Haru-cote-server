"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postThisWeekProblem = exports.getThisWeekProblem = void 0;
var database_1 = require("../../db/database");
var problem_utils_1 = require("../../utils/problem.utils");
var axios_1 = require("axios");
function getThisWeekProblem(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var getProblems, _a, level1Value, level2Value, level3Value, subset_1, res_1, test, getdata, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    getProblems = "SELECT * from problem where is_solved = $1";
                    _a = ctx.request.query, level1Value = _a.level1Value, level2Value = _a.level2Value, level3Value = _a.level3Value;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    subset_1 = [];
                    return [4 /*yield*/, database_1.client.query(getProblems, [false])];
                case 2:
                    res_1 = _b.sent();
                    test = [Number(level1Value), Number(level2Value), Number(level3Value)];
                    test.forEach(function (count, _i) {
                        var _a;
                        var filteringLevel = res_1.rows
                            .filter(function (_a) {
                            var level = _a.level;
                            return level === _i + 1;
                        })
                            .map(function (_a) {
                            var problem_id = _a.problem_id;
                            return problem_id;
                        });
                        var shuffled = __spreadArray([], filteringLevel);
                        for (var i = shuffled.length - 1; i >= 0; i--) {
                            var randomIndex = Math.floor(Math.random() * (i + 1));
                            _a = [
                                shuffled[randomIndex],
                                shuffled[i],
                            ], shuffled[i] = _a[0], shuffled[randomIndex] = _a[1];
                        }
                        subset_1 = __spreadArray(__spreadArray([], subset_1), shuffled.slice(0, count));
                    });
                    return [4 /*yield*/, axios_1.default({
                            url: "https://solved.ac/api/v3/problem/lookup?problemIds=" + problem_utils_1.addCommaForArray(subset_1),
                            method: 'get',
                            headers: { Accept: 'application/json' },
                        })];
                case 3:
                    getdata = _b.sent();
                    ctx.status = 200;
                    ctx.body = getdata.data;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.log(error_1);
                    ctx.status = 500;
                    ctx.message = 'Server error';
                    ctx.body = {
                        message: 'server error',
                    };
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getThisWeekProblem = getThisWeekProblem;
function postThisWeekProblem(ctx) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
exports.postThisWeekProblem = postThisWeekProblem;
//# sourceMappingURL=controll.main.js.map