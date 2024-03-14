import { client } from '@src/db/database'
import { addCommaForArray } from '@src/utils/problem.utils'
import axios from 'axios'
import { Context } from 'koa'

export async function getThisWeekProblem(ctx: Context) {
  const getProblems = `SELECT * from problem where is_solved = $1`

  const {
    level1Value,
    level2Value,
    level3Value,
  }: { level1Value?: string; level2Value?: string; level3Value?: string } =
    ctx.request.query

  try {
    let subset: number[] = []
    const res = await client.query(getProblems, [false])

    let test = [Number(level1Value), Number(level2Value), Number(level3Value)]
    test.forEach((count, _i) => {
      const filteringLevel = res.rows
        .filter(({ level }) => level === _i + 1)
        .map(({ problem_id }) => problem_id)
      const shuffled = [...filteringLevel]

      for (let i = shuffled.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[randomIndex]] = [
          shuffled[randomIndex],
          shuffled[i],
        ]
      }
      subset = [...subset, ...shuffled.slice(0, count)]
    })

    const getdata = await axios({
      url: `https://solved.ac/api/v3/problem/lookup?problemIds=${addCommaForArray(
        subset
      )}`,
      method: 'get',
      headers: { Accept: 'application/json' },
    })
    ctx.status = 200
    ctx.body = getdata.data
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.message = 'Server error'
    ctx.body = {
      message: 'server error',
    }
  }
}

export async function postThisWeekProblem(ctx: Context) {}
