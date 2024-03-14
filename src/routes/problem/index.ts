import * as problemCtrlMain from '@src/routes/problem/controll.main'

const Router = require('koa-router')
const problem = new Router()

problem.get('/problem/this-week', problemCtrlMain.getThisWeekProblem)
problem.post('/problem/this-week', problemCtrlMain.postThisWeekProblem)

export default problem
