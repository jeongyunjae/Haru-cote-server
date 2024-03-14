import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as bodyParser from 'koa-bodyparser'

import { client } from '@src/db/database'
import problemRouter from '@src/routes/problem'

const koaBody = require('koa-body')
const morgan = require('koa-morgan')
const Router = require('koa-router')

dotenv.config({ path: path.join(__dirname, '../.env') })

const app = new Koa()
const api = new Router()
const PORT = process.env.PORT || 3080

app.use(bodyParser())

app.proxy = true
app.use(cors())

app.use(api.routes())
app.use(koaBody())

api.use('/api/v1', problemRouter.routes())

client.connect().then(() => console.log('psql db connected'))

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
}

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
