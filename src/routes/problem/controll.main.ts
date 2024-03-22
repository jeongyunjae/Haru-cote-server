import { client } from '@src/db/database'
import { addCommaForArray } from '@src/utils/problem.utils'
import axios from 'axios'
import { Context } from 'koa'
import { PostThisWeekProblemsReq, ProblemResDataType } from './types'

export async function getThisWeekProblems(ctx: Context) {
  const getProblems = `SELECT problem_id,title,level,is_solved,is_thisweek,member_id,members."name" as member_name from problem left join members on problem.problem_id = members.id where problem.is_thisweek = $1;`
  try {
    const problemList: ProblemResDataType[] = (
      await client.query(getProblems, [true])
    ).rows

    ctx.status = 200
    ctx.body = problemList
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.message = 'Server error'
    ctx.body = {
      message: 'server error',
    }
  }
}

export async function getThisWeekCandidateProblems(ctx: Context) {
  const getProblems = `SELECT * from problem where is_solved = $1`

  const {
    level1Value,
    level2Value,
    level3Value,
  }: { level1Value?: string; level2Value?: string; level3Value?: string } =
    ctx.request.query

  try {
    let subset: number[] = []
    const problemList: ProblemResDataType[] = (
      await client.query(getProblems, [false])
    ).rows

    let shuffleData = [
      Number(level1Value),
      Number(level2Value),
      Number(level3Value),
    ].forEach((count, _i) => {
      const filteringLevel = problemList
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

    const { data } = await axios({
      url: `https://solved.ac/api/v3/problem/lookup?problemIds=${addCommaForArray(
        subset
      )}`,
      method: 'get',
      headers: { Accept: 'application/json' },
    })
    ctx.status = 200
    ctx.body = data
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.message = 'Server error'
    ctx.body = {
      message: 'server error',
    }
  }
}

export async function postThisWeekProblems(ctx: any) {
  const problems: PostThisWeekProblemsReq[] = ctx.request.body
  try {
    problems.forEach(async ({ problem_id, title }) => {
      const sql = `UPDATE problem SET title = $1, is_thisweek = $2 WHERE problem_id = $3`
      await client.query(sql, [title, true, problem_id])
    })

    ctx.status = 200
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.message = 'Server error'
    ctx.body = {
      message: 'server error',
    }
  }
}
