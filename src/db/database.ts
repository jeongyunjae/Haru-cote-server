import { Pool } from 'pg'
import { PsqlType } from '@src/models/db'

const env = process.env.NODE_ENV
const config = require('../config/config')[env]

const dbAccount: PsqlType = {
  user: config.user,
  host: config.host,
  password: config.password,
  database: config.database,
  port: config.port,
}
export const client = new Pool(dbAccount)
const database = {
  client,
}
export default database
