import { ProblemMemberType } from '../member/types'

export type ProblemResDataType = {
  problem_id: number
  title?: string
  level: number
  is_solved: boolean
  is_thisWeek: boolean
  member_id?: number
  member_name?: ProblemMemberType
}

export type PostThisWeekProblemsReq = {
  problem_id: number
  title: string
}
