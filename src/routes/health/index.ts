const Router = require('koa-router')
import type { Context, Next } from 'koa'

const api = new Router()
api.get('/', async (ctx: Context) => {
  ctx.status = 200
})
export default api
