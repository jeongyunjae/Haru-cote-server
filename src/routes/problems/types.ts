/**
    @description 하루코테 멤버
   */
export type ProblemPersonType =
  | '윤재'
  | '가윤'
  | '진욱'
  | '지은'
  | '사라'
  | '민지'
  | ''

export type ProblemResDataType = {
  problem_id: number
  title: string
  level: number
  is_solved: boolean
  is_thisWeek: boolean
  person?: ProblemPersonType
}
