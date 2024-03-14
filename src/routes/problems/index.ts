import * as problemCtrlMain from '@src/routes/problems/controll.main'

const Router = require('koa-router')
const problem = new Router()

problem.get('/problems/list', problemCtrlMain.getThisWeekProblems)
problem.get('/problems/candidate', problemCtrlMain.getThisWeekCandidateProblems)
problem.post('/problems/this-week', problemCtrlMain.postThisWeekProblems)

export default problem
