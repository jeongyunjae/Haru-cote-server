import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '../../.env') })

module.exports = {
  local: {
    user: process.env.PROD_DB_USER,
    host: process.env.PROD_DB_HOST,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    port: parseInt(process.env.PROD_DB_PORT),
    domain: process.env.PROD_DOMAIN,
  },
  development: {
    user: process.env.PROD_DB_USER,
    host: process.env.PROD_DB_HOST,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    port: parseInt(process.env.PROD_DB_PORT),
    domain: process.env.PROD_DOMAIN,
  },
  production: {
    user: process.env.PROD_DB_USER,
    host: process.env.PROD_DB_HOST,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    port: parseInt(process.env.PROD_DB_PORT),
    domain: process.env.PROD_DOMAIN,
  },
}
