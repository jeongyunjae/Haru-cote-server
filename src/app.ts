import koa from 'koa'
import cors from '@koa/cors'

import * as dotenv from 'dotenv'
import * as path from 'path'

import { client } from '@src/db/database'
import problemRouter from '@src/routes/problem'
import memberRouter from '@src/routes/member'

const morgan = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser') // 모듈 가져오기

dotenv.config({ path: path.join(__dirname, '../.env') })
const PORT = process.env.PORT || 3080

const app = new koa()
app.proxy = true
app.use(cors())

const api = new Router()

app.use(bodyParser())
app.use(api.routes())

app.use((ctx: any) => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body
})

api.use('/api/v1', problemRouter.routes())
api.use('/api/v1', memberRouter.routes())

client.connect().then(() => console.log('psql db connected'))

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
}

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
