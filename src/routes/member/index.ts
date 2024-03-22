import * as memberCtrlMain from '@src/routes/member/controll.main'

const Router = require('koa-router')
const member = new Router()

member.get('/member/list', memberCtrlMain.getMembers)

export default member
